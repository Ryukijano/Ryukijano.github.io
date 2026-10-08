/**
 * Long-form case studies arrive two ways: in the prerendered page on a direct
 * load, and as /content/<slug>.json on a client-side navigation. Both must
 * show the same article, and the first must hydrate without a mismatch.
 */
import { expect, test } from '@playwright/test';

test('a direct load shows the article and hydrates cleanly', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  await page.goto('/work/quantumforge');
  await expect(page.getByRole('heading', { level: 2, name: 'How it compares' })).toBeVisible();
  await expect(page.locator('.cartouche')).toContainText(/min read/i);
  // The figure the text places sits inside the article, before the scope.
  await expect(page.locator('.plate')).toHaveCount(1);
  await page.waitForLoadState('networkidle');
  expect(errors).toEqual([]);
});

test('a client-side navigation fetches the article', async ({ page }) => {
  await page.goto('/work');
  const fetched = page.waitForResponse((r) => r.url().endsWith('/content/cuda-blackwell-labs.json'));
  await page.locator('.catalog__title', { hasText: 'CUDA Blackwell Labs' }).click();
  expect((await fetched).ok()).toBe(true);
  await expect(page.getByRole('heading', { level: 2, name: 'Memory before compute' })).toBeVisible();
  await expect(page.locator('.plate')).toHaveCount(1);
});

test('a note loads directly and hydrates cleanly', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  await page.goto('/notes/beige-pc');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('A picture is something you build');
  await expect(page.getByRole('heading', { level: 2, name: 'What comes next in a clip' })).toBeVisible();
  await expect(page.locator('.note__kicker')).toContainText('Note 01');
  await expect(page.locator('.note > .pi-label').last()).toContainText(/^Scope · /);
  await page.waitForLoadState('networkidle');
  expect(errors).toEqual([]);
});

test('the home bio opens the note, and a link in the note stays in the app', async ({ page }) => {
  await page.goto('/');
  const fetched = page.waitForResponse((r) => r.url().endsWith('/content/notes/beige-pc.json'));
  await page.getByRole('link', { name: 'That’s me at the beige PC' }).click();
  expect((await fetched).ok()).toBe(true);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('A picture is something you build');
  expect(new URL(page.url()).pathname).toBe('/notes/beige-pc');

  // A case-study link inside the compiled Markdown is a client-side hop:
  // the article arrives as JSON rather than as a full page load.
  const article = page.waitForResponse((r) => r.url().endsWith('/content/cuda-blackwell-labs.json'));
  await page.locator('.note__body').getByRole('link', { name: 'twenty-two small CUDA labs' }).click();
  expect((await article).ok()).toBe(true);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('CUDA Blackwell Labs');
});

test('a project without an article keeps its short account and never fetches one', async ({ page }) => {
  const requests = [];
  page.on('request', (r) => {
    if (r.url().includes('/content/')) requests.push(r.url());
  });
  await page.goto('/work');
  await page.locator('.catalog__title', { hasText: 'Quantum Error Correction' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Quantum Error Correction');
  await expect(page.locator('.print__body-copy p').first()).toContainText('Stim');
  expect(requests).toEqual([]);
});

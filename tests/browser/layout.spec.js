/**
 * Layout assertions at the viewports where this design actually breaks.
 *
 * Two checks per viewport, and both are needed. The 899px breakpoint governs
 * whether the plate overlay or the stacked lane list renders, but the *plate*
 * is sized from viewport height -- so a wide, short window (900x400) used to
 * collapse it to ~36px while leaving three invisible navigation targets live.
 * That failure produces no horizontal overflow at all, so an overflow-only
 * check would have missed the worst layout bug on the site.
 */
import { expect, test } from '@playwright/test';

const VIEWPORTS = [
  { w: 375, h: 667, note: 'iPhone SE' },
  { w: 390, h: 844, note: 'iPhone 14' },
  { w: 640, h: 800, note: 'the 640px touch-target breakpoint' },
  { w: 899, h: 800, note: 'just below the stacked breakpoint' },
  { w: 900, h: 800, note: 'just above it' },
  { w: 900, h: 400, note: 'wide and short -- the plate-collapse case' },
  { w: 1194, h: 834, note: 'iPad Pro landscape, a touch device above 899px' },
  { w: 1280, h: 420, note: 'a docked-devtools window' },
  { w: 1440, h: 900, note: 'laptop' },
];

const ROUTES = ['/', '/work', '/academic', '/persona/ryoushi', '/work/aims-surgical-phase-detection'];

for (const { w, h, note } of VIEWPORTS) {
  test.describe(`${w}x${h} (${note})`, () => {
    for (const route of ROUTES) {
      test(`${route} does not scroll horizontally`, async ({ page }) => {
        await page.setViewportSize({ width: w, height: h });
        await page.goto(route);
        await page.evaluate(() => document.fonts.ready);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth,
        );
        expect(overflow, `${route} overflows by ${overflow}px`).toBeLessThanOrEqual(1);
      });
    }

    test('the plate is either laid out properly or stacked, never a sliver', async ({ page }) => {
      await page.setViewportSize({ width: w, height: h });
      await page.goto('/');
      await page.evaluate(() => document.fonts.ready);

      const sheet = await page.locator('.folio__sheet').boundingBox();
      expect(sheet.width, 'the plate collapsed').toBeGreaterThanOrEqual(280);

      // If the overlay lanes are live, they must be big enough to aim at.
      const lanes = page.locator('.folio__lane');
      if (await lanes.first().isVisible().catch(() => false)) {
        const box = await lanes.first().boundingBox();
        expect(box.width, 'overlay lanes are live but too small to hit').toBeGreaterThanOrEqual(60);
      }
    });
  });
}

test.describe('the plate itself', () => {
  test('loads, and is not stretched', async ({ page }) => {
    await page.goto('/');
    const img = page.locator('.folio__sheet img');
    await expect(img).toHaveJSProperty('complete', true);
    const { natural, box } = await img.evaluate((el) => ({
      natural: el.naturalWidth / el.naturalHeight,
      box: el.getBoundingClientRect().width / el.getBoundingClientRect().height,
    }));
    expect(box).toBeCloseTo(natural, 1);
  });
});

test.describe('keyboard', () => {
  test('the first Tab reaches Skip to content, and it moves focus into #main', async ({ page }) => {
    await page.goto('/work');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
    await page.keyboard.press('Enter');
    // The skip link used to scroll without moving focus, which is a broken
    // skip link -- #main now carries tabIndex={-1}.
    const focused = await page.evaluate(() => document.activeElement?.id);
    expect(focused).toBe('main');
  });

  test('focus lands in the content after a client-side navigation', async ({ page }) => {
    await page.goto('/work');
    await page.getByRole('link', { name: 'Dalton Mills VR Reconstruction' }).click();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Dalton Mills VR Reconstruction');
    // key={path} remounts the tree, so without the effect in App this is BODY
    // and a screen-reader user hears nothing after activating the link.
    expect(await page.evaluate(() => document.activeElement?.id)).toBe('main');
  });

  test('scroll resets on navigation', async ({ page }) => {
    await page.goto('/work');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(100);
    await page.getByRole('link', { name: 'Hopfield Networks & TSP' }).click();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Hopfield Networks & TSP');
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
  });

  test('history back and forward keep the URL and the heading in agreement', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Ryukijano', exact: true }).click();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Ryukijano');
    await page.goBack();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Gyanateet Dutta');
    expect(new URL(page.url()).pathname).toBe('/');
    await page.goForward();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Ryukijano');
    expect(new URL(page.url()).pathname).toBe('/persona/ryukijano');
  });

  test('focus is visible on the plate lanes', async ({ page }) => {
    test.skip(page.viewportSize().width < 900, '.folio__thirds is display:none below 899px');
    await page.goto('/');
    await page.locator('.folio__lane').first().focus();
    await expect(page.locator('.folio__lane').first()).toHaveClass(/is-on/);
  });
});

test.describe('hydration', () => {
  test('mounts without a mismatch or any console error', async ({ page }) => {
    const problems = [];
    page.on('console', (m) => {
      if (m.type() === 'error' || /hydrat/i.test(m.text())) problems.push(m.text());
    });
    page.on('pageerror', (e) => problems.push(String(e)));
    for (const route of ROUTES) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      // a client-side hop proves React took over the prerendered markup
      await page.getByRole('link', { name: 'Work', exact: true }).first().click();
      await expect(page.getByRole('heading', { level: 1 })).toHaveText('Work');
    }
    expect(problems.filter((p) => !/favicon/i.test(p))).toEqual([]);
  });
});

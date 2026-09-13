/**
 * axe-core on the five distinct page types.
 *
 * Types, not all 28 routes: the 21 case studies are one component rendering
 * one data shape, so auditing them all costs three times the runtime for no
 * extra signal. Both viewport projects run, because above and below 899px the
 * home page exposes genuinely different link sets.
 *
 * WCAG 2.1 A + AA only. Not `best-practice`, whose `region` and
 * `landmark-one-main` opinions argue with a hand-built print layout and
 * generate exactly the noise that gets an a11y suite switched off.
 */
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const PAGES = [
  ['home', '/'],
  ['work catalogue', '/work'],
  ['case study', '/work/aims-surgical-phase-detection'],
  ['academic', '/academic'],
  ['persona', '/persona/ryoushi'],
  ['not found', '/nope'],
];

const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

const report = (violations) =>
  violations
    .map(
      (v) =>
        `${v.id} (${v.impact}): ${v.help}\n` +
        v.nodes.map((n) => `      ${n.target.join(' ')}\n      ${n.failureSummary}`).join('\n'),
    )
    .join('\n\n');

for (const [name, path] of PAGES) {
  test(`${name} has no WCAG A/AA violations`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.evaluate(() => document.fonts.ready);

    const { violations } = await new AxeBuilder({ page })
      .withTags(TAGS)
      // Contrast is audited separately: the atmosphere layer overlaps every
      // text node, and axe cannot resolve a background it sees through.
      .disableRules(['color-contrast'])
      .analyze();

    expect(violations, `\n${report(violations)}`).toEqual([]);
  });

  test(`${name} passes contrast with the atmosphere lifted`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    // Without this axe returns `incomplete` -- not a pass, not a failure --
    // for essentially all body text, because .atmo composites over it.
    await page.addStyleTag({ content: '.atmo, .folio__sheet-grain { display: none !important }' });

    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .withRules(['color-contrast'])
      .analyze();

    expect(violations, `\n${report(violations)}`).toEqual([]);
  });
}

test('every page has exactly one h1 and a reachable #main', async ({ page }) => {
  for (const [name, path] of PAGES) {
    await page.goto(path);
    expect(await page.getByRole('heading', { level: 1 }).count(), name).toBe(1);
    expect(await page.locator('#main').count(), name).toBe(1);
    // The skip link's target must be focusable or the skip link is a no-op.
    expect(await page.locator('#main[tabindex="-1"]').count(), name).toBe(1);
  }
});

test('lists keep their list semantics', async ({ page }) => {
  // Tailwind's preflight sets `list-style: none` on every ul, which drops the
  // `list` role in Safari/VoiceOver -- so a reader cannot tell where the
  // publication list starts or how long it is. role="list" restores it.
  for (const path of ['/work', '/academic', '/persona/ryoushi']) {
    await page.goto(path);
    const uls = await page.locator('ul').count();
    const roled = await page.locator('ul[role="list"]').count();
    expect(roled, `${path}: ${uls - roled} of ${uls} <ul> missing role="list"`).toBe(uls);
  }
});

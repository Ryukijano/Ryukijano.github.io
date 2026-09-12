/**
 * Layout assertions at the viewports where this design actually breaks.
 *
 * Two checks per viewport, and both are needed. The 899px breakpoint governs
 * whether the plate overlay or the plate key under the sheet renders, but the *plate*
 * is sized from viewport height -- so a wide, short window (900x400) used to
 * collapse it to ~36px while leaving three invisible navigation targets live.
 * That failure produces no horizontal overflow at all, so an overflow-only
 * check would have missed the worst layout bug on the site.
 */
import { expect, test } from '@playwright/test';

const VIEWPORTS = [
  { w: 320, h: 568, note: 'the narrowest phone still in use; the key wraps rather than overflows' },
  { w: 375, h: 667, note: 'iPhone SE' },
  { w: 390, h: 844, note: 'iPhone 14' },
  { w: 640, h: 800, note: 'the 640px touch-target breakpoint' },
  { w: 899, h: 800, note: 'just below the stacked breakpoint' },
  { w: 900, h: 800, note: 'just above it' },
  { w: 900, h: 400, note: 'wide and short -- the plate-collapse case' },
  { w: 1194, h: 834, note: 'iPad Pro landscape, a touch device above 899px' },
  { w: 1000, h: 700, note: 'inside the band that now stacks by height' },
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

      // Exactly one of the two navigations is live: the overlay on the hung
      // print, the key under a stacked one. Never both, never neither.
      const overlay = await page.locator('.folio__lane').first().isVisible().catch(() => false);
      const key = await page.locator('.folio__key-lane').first().isVisible().catch(() => false);
      expect([overlay, key], 'overlay and key must be mutually exclusive').toContain(true);
      expect(overlay && key, 'both the overlay and the key are showing').toBe(false);

      // Whichever is live must be big enough to aim at.
      if (overlay) {
        const box = await page.locator('.folio__lane').first().boundingBox();
        expect(box.width, 'overlay lanes are live but too small to hit').toBeGreaterThanOrEqual(60);
      }
      if (key) {
        for (const lane of await page.locator('.folio__key-lane').all()) {
          const box = await lane.boundingBox();
          expect(box.height, 'a key lane is under the 44px touch target').toBeGreaterThanOrEqual(44);
          expect(box.width, 'a key lane is too narrow to hit').toBeGreaterThanOrEqual(60);
        }
      }
    });
  });
}

test.describe('the home page fits one screen', () => {
  // The whole conceit is a single hung print. It is sized from a height budget
  // (--folio-plate), and that budget is a constant, so anything added to the
  // title slip eats into it -- adding one line of copy put the page 91px past
  // the fold at every common desktop size. This is the assertion that makes
  // that loud.
  //
  // 1440x800 is the boundary and belongs in this list permanently: the budget
  // is exact there and has zero slack, so it is the first viewport that fails
  // when the slip grows. The 950-1150 widths are here because the first
  // version of this list was five viewports that all happened to wrap the bio
  // identically, which made a constant tuned at one wrap point look verified
  // at five.
  for (const [w, h] of [
    [1440, 800], [950, 840], [1024, 820], [1100, 800], [1150, 840],
    [1440, 900], [1366, 810], [1280, 820], [1600, 1000], [1920, 1080],
  ]) {
    test(`at ${w}x${h}`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: h });
      await page.goto('/');
      await page.evaluate(() => document.fonts.ready);
      const over = await page.evaluate(
        () => document.documentElement.scrollHeight - window.innerHeight,
      );
      expect(over, `the home page scrolls by ${over}px`).toBeLessThanOrEqual(2);
    });
  }
});

test.describe('the stacked breakpoint fences off the band it has to', () => {
  /*
   * Below 800px tall the height budget stops holding: the plate narrows, the
   * bio rewraps, the slip grows, the plate narrows again. The stacked layout
   * is the fence. If its height half is ever dropped back to a width-only
   * query, the hung print returns at these sizes and the page silently scrolls
   * by 40-100px at EVERY width -- which is how it shipped before.
   */
  for (const [w, h] of [[1440, 790], [1280, 760], [960, 740], [1920, 799]]) {
    test(`at ${w}x${h} the print is stacked, not hung`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: h });
      await page.goto('/');
      await page.evaluate(() => document.fonts.ready);

      await expect(page.locator('.folio__thirds')).toBeHidden();
      await expect(page.locator('.folio__key')).toBeVisible();
      // The idea travels with the print: stacked still reads as a pipeline,
      // with the kento marks saying it is a print and not a picture.
      await expect(page.locator('.folio__key-stage')).toHaveText(['Real world', 'Encoding', 'Digital']);
      await expect(page.locator('.folio__key-arrow')).toHaveCount(2);
      await expect(page.locator('.folio__kento--kagi')).toBeVisible();

      // Stacked means the print is sized by the stacked rule, not the hung
      // one: full bleed less the gutters on a phone, capped by height in a
      // wide short window so the name is not a screen down, floored at 20rem
      // so it is never a sliver. This is the number the stylesheet's
      // --folio-stacked clamp produces; the trailing `sizes` branch claims
      // full bleed, which over-describes here -- the safe direction.
      const rem = 16;
      const block = Math.min(w - 4 * rem, Math.max(20 * rem, (h - 17 * rem) * (3923 / 2160) + 2 * rem));
      const expected = block - 2 * rem;
      const sheet = await page.locator('.folio__sheet').boundingBox();
      expect(Math.abs(sheet.width - expected), `sheet is ${sheet.width}px, stacked rule says ${expected}px`).toBeLessThanOrEqual(2);

      // And the whole first screen carries the idea: the name is reachable
      // without scrolling, under the print and its key.
      const name = await page.locator('.folio__name').boundingBox();
      expect(name.y + name.height, 'the name is below the fold in the stacked band').toBeLessThanOrEqual(h);
    });
  }
});

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
    // The slip's handle link: the only link named exactly "Ryukijano" in
    // either layout (the plate lanes and key lanes carry the stage word too).
    await page.locator('.folio__handles').getByRole('link', { name: 'Ryukijano', exact: true }).click();
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

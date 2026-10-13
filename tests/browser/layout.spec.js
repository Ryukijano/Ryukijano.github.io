/**
 * Layout assertions at the viewports where this design actually breaks.
 *
 * Two checks per viewport, and both are needed. The 899×799 fence governs
 * whether the desk is one screen or a column. A wide, short window used to
 * crush the hung print to a sliver while leaving its links live. Overflow
 * alone would not have caught that, so the board test checks which side of
 * the fence the pictures actually landed on.
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

// The CUDA case study is a long-form article with an unbreakable PTX
// mnemonic in it: the likeliest page to overflow a phone. The note's kicker
// is a single flex row that does not wrap. Both motif personas are here:
// yana carries the film strip, ryoushi the surface-code lattice.
const ROUTES = [
  '/',
  '/work',
  '/tools',
  '/figures',
  '/academic',
  '/persona/yana',
  '/persona/ryoushi',
  '/work/aims-surgical-phase-detection',
  '/work/cuda-blackwell-labs',
  '/notes/beige-pc',
];

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

    test('the board is either one screen or a column, never a sliver', async ({ page }) => {
      await page.setViewportSize({ width: w, height: h });
      await page.goto('/');
      await page.evaluate(() => document.fonts.ready);

      const name = await page.locator('.board__name').boundingBox();
      expect(name.width, 'the nameplate collapsed').toBeGreaterThanOrEqual(200);

      const deck = await page.locator('.board__print--deck').boundingBox();
      const note = await page.locator('.board__note').boundingBox();
      const hung = w >= 900 && h >= 800;
      if (hung) {
        expect(note.x, 'the note should sit beside the drawing').toBeGreaterThan(deck.x + deck.width * 0.5);
      } else {
        expect(note.y, 'the note should sit under the drawing').toBeGreaterThan(deck.y + 8);
      }
    });
  });
}

test.describe('the interior atmosphere', () => {
  test('each persona hangs its own motif in the same box', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    for (const [route, motif] of [
      ['/persona/yana', 'film'],
      ['/persona/ryoushi', 'lattice'],
      ['/persona/ryukijano', null],
      ['/academic', null],
      ['/work', null],
    ]) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const atmo = page.locator('.atmo');
      if (motif) {
        await expect(atmo).toHaveAttribute('data-motif', motif);
      } else {
        expect(await atmo.getAttribute('data-motif'), `${route} should keep the default wave`).toBeNull();
      }
      // The motif box never moves: same ink, same opacity, only the mask swaps.
      const box = await page.locator('.atmo__engraving').boundingBox();
      expect(box.width, `${route} motif width`).toBeGreaterThan(0);
      expect(box.width, `${route} motif width`).toBeLessThanOrEqual(25 * 16 + 1);
    }
  });

  test('fibre and motif hide below 900px and never scroll the page', async ({ page }) => {
    for (const [w, h] of [[899, 800], [390, 844]]) {
      await page.setViewportSize({ width: w, height: h });
      for (const route of ['/academic', '/persona/yana', '/persona/ryoushi', '/work']) {
        await page.goto(route);
        await page.evaluate(() => document.fonts.ready);
        await expect(page.locator('.atmo__fibre')).toBeHidden();
        await expect(page.locator('.atmo__engraving')).toBeHidden();
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth,
        );
        expect(overflow, `${route} at ${w}px overflows by ${overflow}px`).toBeLessThanOrEqual(1);
      }
    }
  });

  test('the fibre is clipped out of the sheet on both measures', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    for (const route of ['/academic', '/work']) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const clip = await page.locator('.atmo__fibre').evaluate((el) => getComputedStyle(el).clipPath);
      expect(clip, `${route} fibre lost its clip`).not.toBe('none');
      expect(clip, `${route} fibre clip`).toMatch(/polygon/);
    }
  });
});

test.describe('the engraving stays in the margin', () => {
  test('the engraving paints no pixel inside the work sheet at 1440', async ({ page }) => {
    // Pixel, not geometry: a clip-path leaves the bounding box where it was,
    // so only the rendered sheet says whether the engraving still shows.
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/work');
    await page.evaluate(() => document.fonts.ready);
    const sheet = await page.locator('main.route').boundingBox();
    const clip = { x: Math.round(sheet.x), y: 0, width: Math.round(sheet.width), height: 900 };
    const shown = await page.screenshot({ clip, animations: 'disabled' });
    await page.addStyleTag({ content: '.atmo__engraving { visibility: hidden !important; }' });
    const hidden = await page.screenshot({ clip, animations: 'disabled' });
    expect(Buffer.compare(shown, hidden), 'the engraving paints inside the work sheet').toBe(0);
  });
});

test.describe('the home page fits one screen', () => {
  // Above the fence the desk is one sheet. Adding a line that forces the
  // nameplate or the note to grow past the viewport fails here, loudly.
  //
  // 1440x800 is the short laptop and belongs in this list permanently. The
  // 950-1150 widths are here because a wrap that only happens in that band
  // used to look verified at five wider sizes.
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
   * Below 800px tall the one-screen grid stops being a desk and becomes a
   * crush. The column is the fence. If its height half is dropped, a wide
   * short window keeps the side-by-side sheet and the pictures collide.
   */
  for (const [w, h] of [[1440, 790], [1280, 760], [960, 740], [1920, 799]]) {
    test(`at ${w}x${h} the board is a column, not one screen`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: h });
      await page.goto('/');
      await page.evaluate(() => document.fonts.ready);

      const deck = await page.locator('.board__print--deck').boundingBox();
      const note = await page.locator('.board__note').boundingBox();
      expect(note.y, 'the note is still beside the drawing').toBeGreaterThan(deck.y + deck.height * 0.5);

      await expect(page.getByRole('link', { name: 'Ryukijano', exact: true })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Vision', exact: true })).toBeVisible();
      await expect(page.getByRole('link', { name: 'quantum', exact: true })).toBeVisible();

      const name = await page.locator('h1').boundingBox();
      expect(name.y + name.height, 'the name is below the fold in the stacked band').toBeLessThanOrEqual(h);
    });
  }
});

test.describe('the childhood picture', () => {
  test('loads, and is not stretched', async ({ page }) => {
    await page.goto('/');
    const img = page.locator('.board__print--started img');
    await expect(img).toHaveJSProperty('complete', true);
    const { natural, box } = await img.evaluate((el) => ({
      natural: el.naturalWidth / el.naturalHeight,
      box: el.getBoundingClientRect().width / el.getBoundingClientRect().height,
    }));
    expect(box).toBeCloseTo(natural, 1);
  });
});

test.describe('the desk board reads in both stocks', () => {
  for (const scheme of ['light', 'dark']) {
    for (const [w, h] of [[1440, 900], [390, 844]]) {
      test(`${scheme} at ${w}x${h}`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: scheme });
        await page.setViewportSize({ width: w, height: h });
        await page.goto('/');
        await page.evaluate(() => document.fonts.ready);
        if (scheme === 'dark') {
          await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
        }
        await expect(page.getByRole('heading', { level: 1 })).toHaveText('Gyanateet Dutta');
        await expect(page.getByText('where it started', { exact: true })).toBeVisible();
        await expect(page.getByText('the other deck', { exact: true })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'On my mind' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'open source ftw' })).toBeVisible();
        for (const item of ['Self-supervised vision', 'Quantum algorithms', 'Image-based 3D reconstruction']) {
          await expect(page.getByRole('link', { name: item })).toBeVisible();
        }
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth,
        );
        expect(overflow, `overflows by ${overflow}px`).toBeLessThanOrEqual(1);
        const image = await page.locator('.board').evaluate((el) => getComputedStyle(el).backgroundImage);
        expect(image).toContain('linear-gradient');
      });
    }
  }
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

  test('focus is visible on the nameplate handle', async ({ page }) => {
    await page.goto('/');
    const handle = page.getByRole('link', { name: 'Ryukijano', exact: true });
    await handle.focus();
    await expect(handle).toBeFocused();
    const outline = await handle.evaluate((el) => getComputedStyle(el).outlineStyle);
    expect(outline).toBe('solid');
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

test.describe('theme control', () => {
  test('the wordmark and switch do not collide on a narrow phone', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto('/academic');
    await page.evaluate(() => document.fonts.ready);
    const wordmark = await page.locator('.site-nav__wordmark').boundingBox();
    const links = await page.locator('.site-nav__links').boundingBox();
    const toggle = await page.locator('.site-nav__theme').boundingBox();
    expect(wordmark.y + wordmark.height).toBeLessThanOrEqual(links.y);
    expect(toggle.x + toggle.width).toBeLessThanOrEqual(320);
  });

  test('follows the system preference without a saved choice', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await expect(page.getByRole('button', { name: 'Switch to light mode' })).toBeVisible();
    await page.emulateMedia({ colorScheme: 'light' });
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('persists a manual choice across routes and reloads', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Switch to dark mode' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await page.getByRole('link', { name: 'Academic', exact: true }).first().click();
    await expect(page.getByRole('button', { name: 'Switch to light mode' })).toBeVisible();
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await page.getByRole('button', { name: 'Switch to light mode' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });
});

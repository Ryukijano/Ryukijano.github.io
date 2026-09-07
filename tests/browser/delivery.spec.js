/**
 * How the design arrives. Fast is not the point on its own — the point is that
 * the typography and the plate land intact, and land before the JavaScript.
 */
import { expect, test } from '@playwright/test';

test('nothing is requested from a third-party origin', async ({ page }) => {
  // The fonts used to come from fonts.googleapis.com via fonts.gstatic.com:
  // render-blocking CSS from one origin, then font files from another, two
  // sequential round trips before text could paint in its intended face.
  const external = [];
  page.on('request', (r) => {
    const host = new URL(r.url()).host;
    if (!host.startsWith('127.0.0.1') && !host.startsWith('localhost')) external.push(r.url());
  });
  for (const route of ['/', '/work', '/academic', '/work/aims-surgical-phase-detection']) {
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
  }
  expect(external).toEqual([]);
});

test('all five faces load, and none of the dropped ones are requested', async ({ page }) => {
  const fonts = [];
  page.on('response', (r) => {
    if (r.url().endsWith('.woff2')) fonts.push(r.url().split('/').pop());
  });
  await page.goto('/academic'); // the only page that uses the serif italic
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() =>
    Promise.all([
      document.fonts.load('400 1rem "Source Serif 4"'),
      document.fonts.load('italic 400 1rem "Source Serif 4"'),
      document.fonts.load('400 1rem "IBM Plex Sans"'),
      document.fonts.load('400 1rem "IBM Plex Mono"'),
    ]),
  );
  expect(fonts.sort()).toEqual([
    'ibm-plex-mono-400.woff2',
    'ibm-plex-sans-400.woff2',
    'source-serif-4-italic.woff2',
    'source-serif-4-upright-var.woff2',
  ]);
});

test('the display serif is preloaded, and only it', async ({ page }) => {
  // Preloading all five would put 122 kB of font in front of the plate, which
  // is the LCP element on the home page.
  await page.goto('/');
  const preloaded = await page.$$eval('link[rel="preload"][as="font"]', (ls) =>
    ls.map((l) => l.getAttribute('href')),
  );
  expect(preloaded).toEqual(['/fonts/source-serif-4-upright-var.woff2']);
});

test('the plate is fetched once, as AVIF, at a tier that fits', async ({ page }) => {
  // A preload describing a different source than <picture> accepts downloads
  // the plate twice; a `sizes` that overstates the layout downloads a tier too
  // large. The old sizes claimed 1400px where the truth is 966px.
  const fetched = [];
  page.on('response', (r) => {
    if (/kanagawa-plate/.test(r.url())) fetched.push(r.url().split('/').pop());
  });
  await page.goto('/');
  await page.locator('.folio__sheet img').evaluate(
    (el) => el.complete || new Promise((r) => { el.onload = r; }),
  );
  expect(fetched).toHaveLength(1);
  expect(fetched[0]).toMatch(/\.avif$/);

  const cssWidth = (await page.locator('.folio__sheet').boundingBox()).width;
  const chosen = Number(fetched[0].match(/-(\d+)\.avif/)[1]);
  const needed = cssWidth * (await page.evaluate(() => window.devicePixelRatio));

  // The right assertion is "the narrowest tier that still covers the need",
  // not a fixed ratio: 800w is the ladder's floor, so a viewport needing less
  // than that correctly gets 800w rather than a tier that does not exist.
  const TIERS = [800, 1000, 1200, 1800, 2000, 2600];
  const expected = TIERS.find((t) => t >= needed) ?? TIERS.at(-1);
  expect(chosen, `fetched ${chosen}w for ${Math.round(needed)}px of need`).toBe(expected);
});

test('layout does not shift while the fonts swap', async ({ page }) => {
  // Case-study pages are entirely text, so a fallback with the wrong metrics
  // moves every line. The 'Source Serif Fallback' face overrides size-adjust,
  // ascent and descent to match Source Serif 4.
  await page.goto('/work/aims-surgical-phase-detection');
  const cls = await page.evaluate(
    () =>
      new Promise((resolve) => {
        let total = 0;
        new PerformanceObserver((list) => {
          for (const e of list.getEntries()) if (!e.hadRecentInput) total += e.value;
        }).observe({ type: 'layout-shift', buffered: true });
        setTimeout(() => resolve(total), 1200);
      }),
  );
  expect(cls, `cumulative layout shift was ${cls}`).toBeLessThan(0.02);
});

test('the plate reserves its box before the bytes land', async ({ page }) => {
  // Aborted rather than hung: a request that never settles also never fires
  // `load`, so the navigation would time out instead of testing anything.
  await page.route('**/kanagawa-plate-*', (r) => r.abort());
  await page.goto('/');
  const box = await page.locator('.folio__sheet').boundingBox();
  expect(box.width / box.height).toBeCloseTo(3923 / 2160, 1);
});

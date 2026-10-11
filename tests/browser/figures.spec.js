/**
 * The pinned-figure treatment and the /figures gallery.
 *
 * The tilt, the fastener and the hard offset are asserted as computed style,
 * on both sides of the 640px fence. The gallery's overlap is asserted with
 * bounding boxes: cards may meet at their edges, but no caption or scope
 * line may sit under another card -- or under its own fastener.
 */
import { expect, test } from '@playwright/test';

const boxesOverlap = (a, b, tolerance = 1) =>
  a.x < b.x + b.width - tolerance &&
  b.x < a.x + a.width - tolerance &&
  a.y < b.y + b.height - tolerance &&
  b.y < a.y + a.height - tolerance;

const overlapArea = (a, b) => {
  const w = Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x);
  const h = Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y);
  return w > 0 && h > 0 ? w * h : 0;
};

/** rotation degrees from a computed matrix(), or 0 for none. */
function tiltOf(transform) {
  if (!transform || transform === 'none') return 0;
  const m = transform.match(/matrix\(([^)]+)\)/);
  if (!m) return 0;
  const [a, b] = m[1].split(',').map(Number);
  return (Math.atan2(b, a) * 180) / Math.PI;
}

test.describe('the pinned treatment on a case study', () => {
  test('odd figures lean left under tape, even figures lean right under a pin', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/work/pothole-detection-arxiv');
    await page.evaluate(() => document.fonts.ready);

    const plates = page.locator('.plate--pinned');
    await expect(plates).toHaveCount(4);
    for (let i = 0; i < 4; i += 1) {
      const plate = plates.nth(i);
      const tilt = tiltOf(await plate.evaluate((el) => getComputedStyle(el).transform));
      const shadow = await plate.evaluate((el) => getComputedStyle(el).boxShadow);
      if (i % 2 === 0) {
        expect(tilt, `figure ${i + 1} tilt`).toBeLessThan(-1);
        expect(tilt, `figure ${i + 1} tilt`).toBeGreaterThan(-2);
        await expect(plate.locator('.plate__tape')).toBeVisible();
        await expect(plate.locator('.plate__pin')).toHaveCount(0);
      } else {
        expect(tilt, `figure ${i + 1} tilt`).toBeGreaterThan(1);
        expect(tilt, `figure ${i + 1} tilt`).toBeLessThan(2);
        await expect(plate.locator('.plate__pin')).toBeVisible();
        await expect(plate.locator('.plate__tape')).toHaveCount(0);
      }
      // A hard offset edge: 6px across, 6px down, zero blur.
      expect(shadow, `figure ${i + 1} offset`).toMatch(/6px 6px 0(px|px 0px)?\b/);
    }
  });

  test('at 390px the tilt is off, the fastener stays, the offset shrinks', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/work/pothole-detection-arxiv');
    await page.evaluate(() => document.fonts.ready);

    const plates = page.locator('.plate--pinned');
    await expect(plates).toHaveCount(4);
    for (let i = 0; i < 4; i += 1) {
      const plate = plates.nth(i);
      const transform = await plate.evaluate((el) => getComputedStyle(el).transform);
      const shadow = await plate.evaluate((el) => getComputedStyle(el).boxShadow);
      expect(transform, `figure ${i + 1} untilted`).toBe('none');
      expect(shadow, `figure ${i + 1} offset`).toMatch(/3px 3px 0(px|px 0px)?\b/);
      const fastener = plate.locator('.plate__tape, .plate__pin');
      await expect(fastener, `figure ${i + 1} fastener`).toBeVisible();
      // The fastener never covers the caption it pins.
      const pin = await fastener.boundingBox();
      const slip = await plate.locator('.plate__slip').boundingBox();
      expect(boxesOverlap(pin, slip, 0), `figure ${i + 1} fastener over caption`).toBe(false);
    }
  });
});

test.describe('the gallery', () => {
  test('shows six stills and three studies, each with a caption and a scope', async ({ page }) => {
    await page.goto('/figures');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Pinned figures');

    const cards = page.locator('.gallery .plate--pinned');
    await expect(cards).toHaveCount(9);
    for (let i = 0; i < 9; i += 1) {
      const card = cards.nth(i);
      await expect(card.locator('.plate__slug')).toHaveText(`Fig. ${i + 1}`);
      await expect(card.locator('.plate__slip')).not.toBeEmpty();
      await expect(card.locator('.plate__scope')).not.toBeEmpty();
    }
    // Stills only: no loops, no video, no GIF anywhere on the page.
    await expect(page.locator('.gallery img')).toHaveCount(6);
    for (const img of await page.locator('.gallery img').all()) {
      await expect(img).toHaveAttribute('src', /-poster\.(webp|avif)$|\.webp$/);
    }
    await expect(page.locator('.gallery video, .gallery picture source')).toHaveCount(0);
    const gif = await page.evaluate(() => document.documentElement.innerHTML.includes('.gif'));
    expect(gif).toBe(false);
    // The studies name themselves as studies.
    await expect(page.locator('.gallery svg[role="img"]')).toHaveCount(3);
    const scopes = await page.locator('.gallery .plate__scope').allTextContents();
    expect(scopes.filter((s) => /Not a result/.test(s))).toHaveLength(3);
  });

  test('every case-study card links back to its case study', async ({ page }) => {
    await page.goto('/figures');
    const links = page.locator('.gallery figcaption a[href^="/work/"]');
    await expect(links).toHaveCount(6);
    for (const link of await links.all()) {
      const href = await link.getAttribute('href');
      const response = await page.request.get(href);
      expect(response.ok(), href).toBe(true);
    }
  });

  test('overlap touches card edges only -- captions are never covered', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/figures');
    await page.evaluate(() => document.fonts.ready);

    const cards = await page.locator('.gallery .plate--pinned').all();
    const boxes = [];
    for (const card of cards) boxes.push(await card.boundingBox());

    // The stagger is real: at least one pair of cards meets.
    let meets = false;
    let most = 0;
    for (let i = 0; i < boxes.length; i += 1) {
      for (let j = i + 1; j < boxes.length; j += 1) {
        const area = overlapArea(boxes[i], boxes[j]);
        if (area > 0) {
          meets = true;
          const share = area / Math.min(boxes[i].width * boxes[i].height, boxes[j].width * boxes[j].height);
          most = Math.max(most, share);
        }
      }
    }
    expect(meets, 'no two gallery cards overlap').toBe(true);
    // ...but only just: edges, not faces.
    expect(most, `cards overlap by ${(most * 100).toFixed(1)}%`).toBeLessThan(0.05);

    // No caption or scope line sits under another card.
    const slips = await page.locator('.gallery .plate__slip').all();
    for (let i = 0; i < slips.length; i += 1) {
      const slip = await slips[i].boundingBox();
      for (let j = 0; j < boxes.length; j += 1) {
        if (i === j) continue;
        expect(boxesOverlap(slip, boxes[j], 0), `caption ${i + 1} under card ${j + 1}`).toBe(false);
      }
      const fastener = await cards[i].locator('.plate__tape, .plate__pin').boundingBox();
      expect(boxesOverlap(fastener, slip, 0), `card ${i + 1} fastener over its caption`).toBe(false);
    }
  });

  test('at 390px the cards stack straight with no overlap at all', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/figures');
    await page.evaluate(() => document.fonts.ready);

    const cards = await page.locator('.gallery .plate--pinned').all();
    expect(cards).toHaveLength(9);
    const boxes = [];
    for (const card of cards) {
      boxes.push(await card.boundingBox());
      const transform = await card.evaluate((el) => getComputedStyle(el).transform);
      expect(transform).toBe('none');
    }
    for (let i = 0; i < boxes.length; i += 1) {
      for (let j = i + 1; j < boxes.length; j += 1) {
        expect(boxesOverlap(boxes[i], boxes[j], 0), `cards ${i + 1} and ${j + 1} overlap`).toBe(false);
      }
    }
  });
});

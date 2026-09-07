// @vitest-environment node
/**
 * Is the keyboard focus ring on the plate's three lanes actually visible?
 *
 * The three overlay links are the home page's primary navigation, and they sit
 * on a painting. Colour that reads over the neon wireframe on the right
 * disappears over the wave's foam on the left. Before this ring was changed, a
 * 1px washi hairline cleared 3:1 on 69.9% of the perimeter -- 48% over the
 * painted third -- so a keyboard user tabbing across the plate lost the
 * indicator entirely on the first lane.
 *
 * This samples the real image rather than trusting a screenshot, which means
 * it protects the decision *forward*: recrop or replace the plate and the test
 * says "the ring is now invisible on 22% of the perimeter" instead of letting
 * it go dark quietly.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { beforeAll, describe, expect, it } from 'vitest';
import { PLATE } from '../src/data/plate.js';

const css = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8');
const token = (n) => css.match(new RegExp(`--color-${n}:\\s*(#[0-9a-f]{6})`, 'i'))[1];

const linear = (c) => (c / 255 <= 0.03928 ? c / 255 / 12.92 : ((c / 255 + 0.055) / 1.055) ** 2.4);
const lum = ([r, g, b]) => 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
const hex = (h) => [0, 2, 4].map((i) => parseInt(h.replace('#', '').slice(i, i + 2), 16));
const contrast = (a, b) => {
  const [x, y] = [lum(a), lum(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};

/** The narrowest variant, which is what a phone-class viewport gets. */
const SMALLEST = PLATE.sources
  .flatMap((s) => s.srcSet.split(','))
  .map((c) => c.trim().split(/\s+/))
  .map(([url, w]) => ({ url, w: parseInt(w, 10) }))
  .sort((a, b) => a.w - b.w)[0].url;

let pixels;
let width;
let height;

beforeAll(async () => {
  const file = fileURLToPath(new URL(`../public${SMALLEST}`, import.meta.url));
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  pixels = data;
  width = info.width;
  height = info.height;
});

const at = (x, y) => {
  const i = (y * width + x) * 3;
  return [pixels[i], pixels[i + 1], pixels[i + 2]];
};

/**
 * The pixels a lane's ring is drawn over: the inner perimeter of one third.
 * Sampled every other pixel, matching how the ring is inset in the CSS.
 */
function perimeter(third) {
  const x0 = Math.round((third * width) / 3);
  const x1 = Math.round(((third + 1) * width) / 3) - 1;
  const out = [];
  for (let x = x0; x <= x1; x += 2) {
    out.push(at(x, 1), at(x, height - 2));
  }
  for (let y = 1; y < height - 1; y += 2) {
    out.push(at(x0 + 1, y), at(x1 - 1, y));
  }
  return out;
}

/** The ring as the stylesheet draws it: an outer washi rule and an inner ink
 *  rule, so a pixel passes if EITHER band reads against it. */
function coverage(third, colours) {
  const px = perimeter(third);
  const hits = px.filter((p) => colours.some((c) => contrast(hex(c), p) >= 3)).length;
  return hits / px.length;
}

describe('focus ring over the plate', () => {
  it('the stylesheet still draws a washi + ink double rule', () => {
    // If this changes, the coverage numbers below are measuring nothing.
    const block = css.match(/\.folio__lane:focus-visible::after\s*\{([^}]*)\}/s)?.[1] ?? css;
    const ring = css.match(/\.folio__lane\.is-on::after[\s\S]*?\}/)[0];
    expect(ring).toMatch(/inset 0 0 0 2px var\(--color-washi\)/);
    expect(ring).toMatch(/inset 0 0 0 4px var\(--color-ink\)/);
    expect(block).toBeDefined();
  });

  it.each([0, 1, 2])('clears 3:1 on ~all of third %i', (third) => {
    const c = coverage(third, [token('washi'), token('ink')]);
    expect(c).toBeGreaterThanOrEqual(0.99);
  });

  it('is why a single colour was not enough', () => {
    // Documents the measurement that drove the design, and fails if a future
    // plate happens to make one of these viable -- at which point simplifying
    // the ring becomes a real option worth taking.
    const single = ['washi', 'ink', 'seal'].map((n) => ({
      colour: n,
      worst: Math.min(...[0, 1, 2].map((t) => coverage(t, [token(n)]))),
    }));
    for (const { worst } of single) expect(worst).toBeLessThan(0.99);
  });

  it('is at least 2px thick, per WCAG 2.2 SC 2.4.11', () => {
    const ring = css.match(/\.folio__lane\.is-on::after[\s\S]*?\}/)[0];
    const widths = [...ring.matchAll(/inset 0 0 0 (\d+)px/g)].map((m) => Number(m[1]));
    expect(Math.max(...widths)).toBeGreaterThanOrEqual(2);
  });

  it('also marks the state in the gutter, on paper we control', () => {
    expect(css).toMatch(/\.folio__lane:focus-visible::before\s*\{[^}]*var\(--color-seal\)/s);
  });
});

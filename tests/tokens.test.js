// @vitest-environment node
/**
 * The design tokens, asserted.
 *
 * These test decisions rather than appearance, which is the point: the site is
 * under active redesign, so a suite that goes red when a layout changes would
 * be abandoned within a fortnight. A contrast floor and a scale ratio survive
 * any amount of re-layout, and they catch the failures nothing on screen
 * would — palette changes still have to clear the contrast floors on both
 * stocks. DESIGN.md records why each number is what it is.
 */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const css = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8');

function customProperty(name) {
  const m = css.match(new RegExp(`--${name}:\\s*([^;]+);`));
  if (!m) throw new Error(`--${name} is not defined in src/index.css`);
  return m[1].trim();
}

const srgb = (hex) => {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
};
const linear = (c) => (c / 255 <= 0.03928 ? c / 255 / 12.92 : ((c / 255 + 0.055) / 1.055) ** 2.4);
const luminance = (rgb) => 0.2126 * linear(rgb[0]) + 0.7152 * linear(rgb[1]) + 0.0722 * linear(rgb[2]);

export function contrast(a, b) {
  const [x, y] = [luminance(srgb(a)), luminance(srgb(b))];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

const PALETTE = [
  'washi', 'washi-deep', 'washi-lift',
  'ink', 'ink-muted', 'seal', 'seal-bright',
];

describe('palette', () => {
  it.each(PALETTE)('--color-%s is a six-digit hex', (name) => {
    expect(customProperty(`color-${name}`)).toMatch(/^#[0-9a-f]{6}$/i);
  });

  it('--color-rule is the ink at low alpha, not a separate grey', () => {
    const ink = srgb(customProperty('color-ink'));
    const rule = customProperty('color-rule');
    expect(rule).toMatch(/^rgba\(/);
    const [r, g, b] = rule.match(/[\d.]+/g).map(Number);
    expect([r, g, b]).toEqual(ink);
  });

  // Floors, not exact values, so the palette can be tuned but not broken.
  // Light stock: 11.84 / 13.02 / 5.86 / 6.44 / 6.05 / 6.65.
  it.each([
    ['ink', 'washi', 7],
    ['ink', 'washi-lift', 7],
    ['ink-muted', 'washi', 4.5],
    ['ink-muted', 'washi-lift', 4.5],
    ['seal', 'washi', 4.5],
    ['seal', 'washi-lift', 4.5],
  ])('%s on %s clears %s:1', (fg, bg, floor) => {
    const ratio = contrast(customProperty(`color-${fg}`), customProperty(`color-${bg}`));
    expect(ratio).toBeGreaterThanOrEqual(floor);
  });

  it('warns nobody: seal-bright is decorative only', () => {
    // 4.32 against near-white washi, below AA. Fine on .seal, which is aria-hidden.
    // Asserted so that using it for real text is a deliberate act.
    const uses = [...css.matchAll(/([.#][\w-]+)\s*\{[^}]*--color-seal-bright[^}]*\}/g)];
    expect(uses.map((m) => m[1])).toEqual(['.seal']);
  });
});

describe('type scale', () => {
  // --step--2 is deliberately OFF the scale: 1.25 below --step--1 would be
  // 0.68rem (10.88px), and this step carries tracked uppercase mono labels
  // (.cartouche, .scope__label, .catalog__lane) where that is
  // too small to read. It is held at 0.72rem as a legibility floor.
  const scaled = ['--step--1', '--step-0', '--step-1', '--step-2',
                  '--step-3', '--step-4', '--step-5'];

  it('is a clean 1.25 from --step--1 upward', () => {
    // +/- 0.02, because the tokens are rounded to sensible rem values rather
    // than carrying the exact powers of 1.25.
    const rem = scaled.map((s) => parseFloat(customProperty(s.replace('--', ''))));
    for (let i = 1; i < rem.length; i += 1) {
      const ratio = rem[i] / rem[i - 1];
      expect(ratio, `${scaled[i - 1]} -> ${scaled[i]}`).toBeGreaterThan(1.23);
      expect(ratio, `${scaled[i - 1]} -> ${scaled[i]}`).toBeLessThan(1.27);
    }
  });

  it('holds --step--2 above the scale as a legibility floor', () => {
    const smallest = parseFloat(customProperty('step--2'));
    const next = parseFloat(customProperty('step--1'));
    expect(smallest).toBeGreaterThan(next / 1.25); // above where 1.25 would put it
    expect(smallest * 16).toBeGreaterThanOrEqual(11); // and readable at 11px+
  });

  it('reads text at 17px, so the scale is anchored where the body is', () => {
    expect(parseFloat(customProperty('step-0'))).toBeCloseTo(1.0625, 4);
  });
});

describe('measures', () => {
  it('the reading column is narrower than the sheet', () => {
    // The lede used to be capped at 62ch inside a 40rem sheet the body copy
    // filled, so the introduction was narrower than what it introduced.
    const read = parseFloat(customProperty('measure-read'));
    const sheet = parseFloat(customProperty('measure'));
    const wide = parseFloat(customProperty('measure-wide'));
    expect(read).toBeLessThan(sheet);
    expect(sheet).toBeLessThan(wide);
  });

  it('the nav reads the page measure rather than a fixed width', () => {
    // Otherwise the bar's edge drifts away from the kento mark that declares
    // where the sheet ends -- it was 256px out.
    expect(css).toMatch(/\.site-nav__bar\s*\{[^}]*max-width:\s*var\(--page-measure\)/);
  });
});

/*
 * The home sheet is a desk. The ruling has to be the existing hairline, and
 * the stack fence has to be the same two numbers the layout test walks,
 * or a short window goes back to crushing the pictures.
 */
describe('the desk board describes the stylesheet', () => {
  it('rules the ground with the existing hairline, not a new colour', () => {
    const board = css.match(/\.board\s*\{([^}]*)\}/s)?.[1];
    expect(board, '.board is missing').toBeTruthy();
    expect(board).toMatch(/linear-gradient\([^)]*var\(--color-rule\)/);
    expect(board).not.toMatch(/#[0-9a-f]{3,8}/i);
  });

  it('stacks below the same two fences', async () => {
    const { BOARD_MIN_WIDTH_PX, BOARD_MIN_HEIGHT_PX } = await import('../src/data/board.js');
    const query = css.match(
      /@media \(max-width: (\d+)px\), \(max-height: (\d+)px\) \{/,
    );
    expect(query, 'the stacked breakpoint query moved or changed shape').toBeTruthy();
    expect(Number(query[1])).toBe(BOARD_MIN_WIDTH_PX - 1);
    expect(Number(query[2])).toBe(BOARD_MIN_HEIGHT_PX - 1);
  });

  it('keeps the hung sheet to one viewport', () => {
    const stage = css.match(/\.board__stage\s*\{([^}]*)\}/s)?.[1];
    expect(stage).toMatch(/height:\s*100dvh/);
  });
});

describe('non-negotiables', () => {
  it('sets native controls for both stocks', () => {
    expect(css).toMatch(/color-scheme:\s*light/);
    expect(css).toMatch(/html\[data-theme='dark'\]\s*\{\s*color-scheme:\s*dark/);
  });

  it('keeps dark ink, secondary text and accent readable on both grounds', () => {
    const dark = css.match(/html\[data-theme='dark'\]\s*\{([^}]+)\}/)?.[1];
    expect(dark).toBeTruthy();
    const token = (name) => dark.match(new RegExp(`--color-${name}:\\s*(#[0-9a-f]{6});`, 'i'))?.[1];
    for (const ground of ['washi', 'washi-lift']) {
      expect(contrast(token('ink'), token(ground))).toBeGreaterThanOrEqual(7);
      expect(contrast(token('ink-muted'), token(ground))).toBeGreaterThanOrEqual(4.5);
      expect(contrast(token('seal'), token(ground))).toBeGreaterThanOrEqual(4.5);
    }
    const [r, g, b, alpha] = dark.match(/--color-rule:\s*rgba\(([^)]+)\)/)[1].match(/[\d.]+/g).map(Number);
    expect([r, g, b]).toEqual(srgb(token('ink')));
    expect(alpha).toBe(0.18);
  });

  it('keeps the atmosphere under the text layer', () => {
    // Grain is fibre in the paper; ink prints on top of the fibre.
    const atmo = css.match(/\.atmo\s*\{([^}]*)\}/)[1];
    const body = css.match(/\.print__body\s*\{([^}]*)\}/)[1];
    const z = (block) => Number(block.match(/z-index:\s*(-?\d+)/)?.[1] ?? 0);
    expect(z(atmo)).toBeLessThan(z(body));
  });

  it('spends the accent only on the scope convention and on interaction', () => {
    const blocks = [...css.matchAll(/([^{}]+)\{[^}]*var\(--color-seal\)[^}]*\}/g)];
    const selectors = new Set(
      blocks.flatMap((m) =>
        m[1]
          .replace(/\/\*[\s\S]*?\*\//g, '')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      ),
    );

    const CONVENTION = /^\.(scope__label|folio__mark)$/;
    const INTERACTION = /(:focus-visible|:hover|\.is-active|\.is-on|::selection)/;

    const stray = [...selectors].filter(
      (s) => !CONVENTION.test(s) && !INTERACTION.test(s),
    );
    expect(stray).toEqual([]);
  });
});

describe('interior atmosphere', () => {
  it('lays wash, fibre, motif and grain in that order, under the text', async () => {
    // Siblings without z-index paint in DOM order, so the component's order
    // IS the z-order. Fibre sits under the motif and the grain; .atmo stays
    // under .print__body (asserted above), so all four stay under the ink.
    const { readFileSync } = await import('node:fs');
    const jsx = readFileSync(new URL('../src/components/Atmosphere.jsx', import.meta.url), 'utf8');
    const order = ['atmo__wash', 'atmo__fibre', 'atmo__engraving', 'atmo__grain'].map((c) =>
      jsx.indexOf(c),
    );
    // The wash is conditional (variant !== 'film') but still first when drawn.
    const drawn = order.filter((i) => i !== -1);
    expect(drawn.length).toBeGreaterThanOrEqual(3); // fibre, engraving, grain always
    expect([...drawn].sort((a, b) => a - b)).toEqual(drawn);
    expect(jsx).toMatch(/aria-hidden="true"/); // decorative, never in the tree
  });

  it('keeps the fibre clipped out of the sheet, so contrast cannot regress', () => {
    // A fibre core under a glyph moved muted ink from 5.02 to 4.55:1 at the
    // worst pixel. The evenodd clip on --page-measure is what holds the
    // guarantee; Work (58rem) clips wider through the same variable.
    const fibre = css.match(/\.atmo__fibre\s*\{([^}]*)\}/s)?.[1];
    expect(fibre, '.atmo__fibre is missing').toBeTruthy();
    expect(fibre).toMatch(/clip-path:\s*polygon\(\s*evenodd/);
    expect(fibre).toMatch(/var\(--sheet-l\)/);
    expect(fibre).toMatch(/var\(--sheet-r\)/);
    expect(fibre).toMatch(/--sheet-l:\s*calc\(50% - var\(--page-measure\) \/ 2\)/);
    expect(fibre).toMatch(/--sheet-r:\s*calc\(50% \+ var\(--page-measure\) \/ 2\)/);
  });

  it('clips the engraving out of the sheet with the same polygon as the fibre', () => {
    // The engraving is fixed to the viewport, so its polygon is measured from
    // its own right edge; a percentage of its box would clip it to the wrong place.
    const engraving = css.match(/^\.atmo__engraving\s*\{([^}]*)\}/m)?.[1];
    expect(engraving, '.atmo__engraving has no base rule').toBeTruthy();
    expect(engraving).toMatch(/clip-path:\s*polygon\(\s*evenodd/);
    expect(engraving).toMatch(/--sheet-l:\s*calc\(100% - 50vw - var\(--page-measure\) \/ 2\)/);
    expect(engraving).toMatch(/--sheet-r:\s*calc\(100% - 50vw \+ var\(--page-measure\) \/ 2\)/);
  });

  it('prints fibre and motifs in the stock ink only, with no new colour', () => {
    const fibre = css.match(/\.atmo__fibre\s*\{([^}]*)\}/s)[1];
    expect(fibre).toMatch(/background:\s*var\(--color-ink\)/);
    expect(fibre).not.toMatch(/#[0-9a-f]{3,8}\b/i);
    expect(fibre).not.toMatch(/--color-(?!ink\b)/);
    for (const motif of ['film', 'lattice']) {
      const rule = css.match(
        new RegExp(`\\.atmo\\[data-motif='${motif}'\\][^{]*\\{([^}]*)\\}`, 's'),
      )?.[1];
      expect(rule, `the ${motif} motif rule is missing`).toBeTruthy();
      // Mask swap only: the box, ink and opacity stay on .atmo__engraving.
      expect(rule).toMatch(/mask-image:/);
      expect(rule).not.toMatch(/background|opacity|width|height/i);
    }
  });

  it('gives the lattice slightly less weight on the dark stock', () => {
    // Hatched Z faces carry more ink per pixel than the line motifs.
    const dark = css.match(
      /html\[data-theme='dark'\] \.atmo\[data-motif='lattice'\][^{]*\{([^}]*)\}/s,
    )?.[1];
    expect(dark, 'the lattice dark-stock rule is missing').toBeTruthy();
    const opacity = Number(dark.match(/opacity:\s*([\d.]+)/)?.[1]);
    expect(opacity).toBeLessThan(0.12);
    expect(opacity).toBeGreaterThan(0.07);
  });

  it('hides fibre and motif below 900px, where there is no margin', () => {
    const query = css.match(/@media \(max-width: 899px\)\s*\{([\s\S]*?)\n\}/)?.[1];
    expect(query, 'the 899px hide rule moved').toBeTruthy();
    expect(query).toMatch(/\.atmo__engraving/);
    expect(query).toMatch(/\.atmo__fibre/);
    expect(query).toMatch(/display:\s*none/);
  });
});

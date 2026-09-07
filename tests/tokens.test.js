// @vitest-environment node
/**
 * The design tokens, asserted.
 *
 * These test decisions rather than appearance, which is the point: the site is
 * under active redesign, so a suite that goes red when a layout changes would
 * be abandoned within a fortnight. A contrast floor and a scale ratio survive
 * any amount of re-layout, and they catch the failures nothing on screen
 * would — ink-muted sits 0.52 above AA, so nudging it lighter breaks the floor
 * invisibly. DESIGN.md records why each number is what it is.
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
  // Measured today: 10.14 / 10.81 / 5.02 / 5.35 / 5.18 / 5.52.
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
    // 3.95 against washi-lift, below AA. Fine on .seal, which is aria-hidden.
    // Asserted so that using it for real text is a deliberate act.
    const uses = [...css.matchAll(/([.#][\w-]+)\s*\{[^}]*--color-seal-bright[^}]*\}/g)];
    expect(uses.map((m) => m[1])).toEqual(['.seal']);
  });
});

describe('type scale', () => {
  // --step--2 is deliberately OFF the scale: 1.25 below --step--1 would be
  // 0.68rem (10.88px), and this step carries tracked uppercase mono labels
  // (.cartouche, .limit__label, .catalog__lane, .folio__chip) where that is
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

describe('the plate height budget', () => {
  it('is the same number in the stylesheet and in the sizes attribute', async () => {
    // --folio-plate derives the plate's WIDTH from the viewport height, and
    // `sizes` has to mirror that or the browser picks a tier for a layout that
    // does not exist. Raising one and not the other is a silent over-fetch.
    const { PLATE_HEIGHT_BUDGET_REM } = await import('../src/data/plate.js');
    const inCss = Number(css.match(/calc\(\(100dvh - (\d+(?:\.\d+)?)rem\)/)[1]);
    expect(inCss).toBe(PLATE_HEIGHT_BUDGET_REM);
  });
});

describe('non-negotiables', () => {
  it('declares a light color-scheme: a print has no dark variant', () => {
    expect(css).toMatch(/color-scheme:\s*light/);
  });

  it('keeps the atmosphere under the text layer', () => {
    // Grain is fibre in the paper; ink prints on top of the fibre.
    const atmo = css.match(/\.atmo\s*\{([^}]*)\}/)[1];
    const body = css.match(/\.print__body\s*\{([^}]*)\}/)[1];
    const z = (block) => Number(block.match(/z-index:\s*(-?\d+)/)?.[1] ?? 0);
    expect(z(atmo)).toBeLessThan(z(body));
  });

  it('spends the accent only on the limit convention and on interaction', () => {
    // The rule is not "four selectors" -- it is that the seal marks two
    // things and nothing else: the honesty convention (.limit__label, the
    // marked caption word, the gloss footer) and interaction state (focus,
    // hover, the active nav item, selection). Anything else picking up the
    // accent means it has stopped meaning those two things.
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

    const CONVENTION = /^\.(limit__label|folio__mark|folio__gloss--foot)$/;
    const INTERACTION = /(:focus-visible|:hover|\.is-active|\.is-on|::selection)/;

    const stray = [...selectors].filter(
      (s) => !CONVENTION.test(s) && !INTERACTION.test(s),
    );
    expect(stray).toEqual([]);
  });
});

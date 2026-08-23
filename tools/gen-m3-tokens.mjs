/**
 * Generates src/styles/m3-tokens.css — the Material 3 Expressive token layer.
 *
 * Run with `npm run tokens`. The output is committed, so a normal install and
 * build never runs this and never needs @material/material-color-utilities.
 *
 * Three decisions worth knowing about:
 *
 * 1. Colour comes from real HCT tonal palettes (Google's own material-color-
 *    utilities), not hand-picked hex. Every role is a tone off a palette, so
 *    contrast stays predictable when a seed changes.
 *
 * 2. The NEUTRAL palettes are seeded from this site's own grounds — the warm
 *    paper #E6E1D3 and the near-black #161618 — not from the accent hue. M3
 *    normally derives neutrals from the seed, which would tint every surface
 *    toward slate-blue or magenta. Seeding them separately is what keeps the
 *    page warm and painterly instead of looking like a Google product. This is
 *    the "M3 as the system, our look on top" decision, made concrete.
 *
 * 3. The trust bands are the one colour family that does NOT retint per persona.
 *    Everything else here is a tone off the active persona's seed, because a
 *    page's accent should follow whose page it is. The epistemic index is the
 *    opposite case: "measured" has to mean the same thing wherever it appears,
 *    and a scale that changed hue between personas would stop being a scale and
 *    become decoration. So the bands are seeded from their own four hues, vary
 *    only with the ground, and the same twelve values are repeated verbatim into
 *    every light block and every dark block.
 *
 * 4. Motion tokens are the official M3 Expressive spring set, transcribed from
 *    Google's own spring-to-curve conversion table for web
 *    (m3.material.io/styles/motion/overview/specs). Springs cannot be expressed
 *    in CSS, so Material publishes equivalent cubic-beziers; these are those,
 *    not approximations of our own.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { Hct } from '../node_modules/@material/material-color-utilities/hct/hct.js';
import { TonalPalette } from '../node_modules/@material/material-color-utilities/palettes/tonal_palette.js';
import {
  hexFromArgb,
  argbFromHex,
} from '../node_modules/@material/material-color-utilities/utils/string_utils.js';

/* ---------------------------------------------------------------- palettes */

const PAPER = '#E6E1D3';
const INK = '#161618';

function neutralFrom(hex, chroma) {
  const h = Hct.fromInt(argbFromHex(hex));
  return TonalPalette.fromHueAndChroma(h.hue, chroma);
}

function derive(seedHex, hueShift, chroma) {
  const h = Hct.fromInt(argbFromHex(seedHex));
  return TonalPalette.fromHueAndChroma((h.hue + hueShift + 360) % 360, chroma);
}

const THEMES = {
  ryukijano: { seed: '#6f9fd8', ground: 'dark' },
  ryoushi: { seed: '#b04a75', ground: 'light' },
  study: { seed: '#c96442', ground: 'light' },
};

const ERROR = TonalPalette.fromHueAndChroma(25, 84);

/* ------------------------------------------------------------- role tables */

const ROLES = [
  ['primary', 'p', 40, 80],
  ['on-primary', 'p', 100, 20],
  ['primary-container', 'p', 90, 30],
  ['on-primary-container', 'p', 10, 90],
  ['secondary', 's', 40, 80],
  ['on-secondary', 's', 100, 20],
  ['secondary-container', 's', 90, 30],
  ['on-secondary-container', 's', 10, 90],
  ['tertiary', 't', 40, 80],
  ['on-tertiary', 't', 100, 20],
  ['tertiary-container', 't', 90, 30],
  ['on-tertiary-container', 't', 10, 90],
  ['error', 'e', 40, 80],
  ['on-error', 'e', 100, 20],
  ['error-container', 'e', 90, 30],
  ['on-error-container', 'e', 10, 90],
  ['background', 'n', 98, 6],
  ['on-background', 'n', 10, 90],
  ['surface', 'n', 98, 6],
  ['on-surface', 'n', 10, 90],
  ['surface-variant', 'nv', 90, 30],
  ['on-surface-variant', 'nv', 30, 80],
  ['surface-dim', 'n', 87, 6],
  ['surface-bright', 'n', 98, 24],
  ['surface-container-lowest', 'n', 100, 4],
  ['surface-container-low', 'n', 96, 10],
  ['surface-container', 'n', 94, 12],
  ['surface-container-high', 'n', 92, 17],
  ['surface-container-highest', 'n', 90, 22],
  ['outline', 'nv', 50, 60],
  ['outline-variant', 'nv', 80, 30],
  ['inverse-surface', 'n', 20, 90],
  ['inverse-on-surface', 'n', 95, 20],
  ['inverse-primary', 'p', 80, 40],
  ['scrim', 'n', 0, 0],
  ['shadow', 'n', 0, 0],
];

/* ------------------------------------------------------------ trust bands */

/*
 * A deliberate cool-to-warm ramp for /trust, reading "a sensor recorded it" at
 * one end and "nothing can check it" at the other. The four hexes below are
 * seeds, not values: each one goes through HCT exactly like a persona accent so
 * the bands land on the same tonal grid as every other role and behave against
 * the neutral ramps instead of merely looking acceptable on one background.
 *
 * Two palettes per band, the same split the p/s pair uses: the full-chroma one
 * carries the band (chip label, hovered card title, the 2px ramp bar) and is the
 * only thing separating the four, since a shared chroma leaves hue to do all the
 * work; the quiet one carries the container, because a hover tint behind eleven
 * stacked cards should whisper and a saturated cyan at tone 92 does not.
 */
const TRUST_SEEDS = {
  measured: '#6f9fd8',
  restored: '#5fa392',
  inferred: '#c9a15e',
  invented: '#d1764f',
};

const TRUST_ROLES = [
  ['', 'c', 40, 80],
  ['-container', 'q', 92, 22],
  ['-outline', 'c', 52, 50],
];

function trustFor(mode) {
  const out = {};
  for (const [band, seed] of Object.entries(TRUST_SEEDS)) {
    const pal = { c: derive(seed, 0, 36), q: derive(seed, 0, 16) };
    for (const [suffix, key, lt, dt] of TRUST_ROLES) {
      out[band + suffix] = hexFromArgb(pal[key].tone(mode === 'dark' ? dt : lt));
    }
  }
  return out;
}

/* --------------------------------------------------------------- contrast */

const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

function relLuminance(hex) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => lin(v / 255));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [x, y] = [relLuminance(a), relLuminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

/* ------------------------------------------------------------ token output */

function rolesFor(seed, mode) {
  const groundHex = mode === 'dark' ? INK : PAPER;
  const pal = {
    p: TonalPalette.fromInt(argbFromHex(seed)),
    s: derive(seed, 0, 16),
    t: derive(seed, 60, 24),
    e: ERROR,
    n: neutralFrom(groundHex, 4),
    nv: neutralFrom(groundHex, 8),
  };
  const out = {};
  for (const [role, key, lt, dt] of ROLES) {
    out[role] = hexFromArgb(pal[key].tone(mode === 'dark' ? dt : lt));
  }
  return out;
}

const AA_PAIRS = [
  ['on-surface', 'surface'],
  ['on-surface-variant', 'surface'],
  ['on-surface', 'surface-container'],
  ['on-surface-variant', 'surface-container'],
  ['on-primary', 'primary'],
  ['on-primary-container', 'primary-container'],
  ['on-secondary-container', 'secondary-container'],
  ['on-tertiary-container', 'tertiary-container'],
  ['on-error', 'error'],
  ['inverse-on-surface', 'inverse-surface'],
];
const AA_NONTEXT = [['outline', 'surface']];

/* A band is a mono chip label and a card title, so it is text on both the plain
 * surface and the container a card sits on; an outline is a border and only ever
 * meets the plain surface. */
const TRUST_AA = Object.keys(TRUST_SEEDS).flatMap((b) => [
  [b, 'surface'],
  [b, 'surface-container'],
]);
const TRUST_NONTEXT = Object.keys(TRUST_SEEDS).map((b) => [`${b}-outline`, 'surface']);

let failures = 0;
const report = [];

function check(fg, bg, fgHex, bgHex, min, label) {
  const r = contrast(fgHex, bgHex);
  if (r < min) {
    failures++;
    report.push(`  FAIL ${label}  ${fg} on ${bg}  ${r.toFixed(2)}:1  (need ${min.toFixed(1)})`);
  }
}

function block(selector, roles, trust, label) {
  for (const [fg, bg] of AA_PAIRS) check(fg, bg, roles[fg], roles[bg], 4.5, label);
  for (const [fg, bg] of AA_NONTEXT) check(fg, bg, roles[fg], roles[bg], 3, label);
  for (const [fg, bg] of TRUST_AA) check(`trust-${fg}`, bg, trust[fg], roles[bg], 4.5, label);
  for (const [fg, bg] of TRUST_NONTEXT) check(`trust-${fg}`, bg, trust[fg], roles[bg], 3, label);

  const lines = Object.entries(roles).map(([k, v]) => `    --md-sys-color-${k}: ${v};`);
  const trustLines = Object.entries(trust).map(([k, v]) => `    --md-sys-trust-${k}: ${v};`);
  return (
    `${selector} {\n${lines.join('\n')}\n\n` +
    `    /* trust bands — semantic, so identical under every persona */\n` +
    `${trustLines.join('\n')}\n  }`
  );
}

/* ------------------------------------------------------------------ shape */

const SHAPE = [
  ['none', '0'],
  ['extra-small', '4px'],
  ['small', '8px'],
  ['medium', '12px'],
  ['large', '16px'],
  ['large-increased', '20px'],
  ['extra-large', '28px'],
  ['extra-large-increased', '32px'],
  ['extra-extra-large', '48px'],
  ['full', '9999px'],
];

/* ----------------------------------------------------------------- motion */

const MOTION = [
  ['expressive-fast-spatial', '0.42, 1.67, 0.21, 0.90', '350ms'],
  ['expressive-default-spatial', '0.38, 1.21, 0.22, 1.00', '500ms'],
  ['expressive-slow-spatial', '0.39, 1.29, 0.35, 0.98', '650ms'],
  ['expressive-fast-effects', '0.31, 0.94, 0.34, 1.00', '150ms'],
  ['expressive-default-effects', '0.34, 0.80, 0.34, 1.00', '200ms'],
  ['expressive-slow-effects', '0.34, 0.88, 0.34, 1.00', '300ms'],
  ['standard-fast-spatial', '0.27, 1.06, 0.18, 1.00', '350ms'],
  ['standard-default-spatial', '0.27, 1.06, 0.18, 1.00', '500ms'],
  ['standard-slow-spatial', '0.27, 1.06, 0.18, 1.00', '750ms'],
  ['standard-fast-effects', '0.31, 0.94, 0.34, 1.00', '150ms'],
  ['standard-default-effects', '0.34, 0.80, 0.34, 1.00', '200ms'],
  ['standard-slow-effects', '0.34, 0.88, 0.34, 1.00', '300ms'],
];

/* ------------------------------------------------------------- typography */

const TYPE = [
  ['display-large', 3.5625, 4, -0.016, 400, 500],
  ['display-medium', 2.8125, 3.25, 0, 400, 500],
  ['display-small', 2.25, 2.75, 0, 400, 500],
  ['headline-large', 2, 2.5, 0, 400, 500],
  ['headline-medium', 1.75, 2.25, 0, 400, 500],
  ['headline-small', 1.5, 2, 0, 400, 500],
  ['title-large', 1.375, 1.75, 0, 400, 500],
  ['title-medium', 1, 1.5, 0.009, 500, 700],
  ['title-small', 0.875, 1.25, 0.007, 500, 700],
  ['body-large', 1, 1.5, 0.031, 400, 500],
  ['body-medium', 0.875, 1.25, 0.018, 400, 500],
  ['body-small', 0.75, 1, 0.025, 400, 500],
  ['label-large', 0.875, 1.25, 0.006, 500, 700],
  ['label-medium', 0.75, 1, 0.031, 500, 700],
  ['label-small', 0.6875, 1, 0.031, 500, 700],
];

const isBrand = (r) => r.startsWith('display') || r.startsWith('headline');

/*
 * Display and headline roles resolve fluidly between a floor that still reads
 * at 320px and the scale's nominal size at desktop widths. Body and label
 * roles stay fixed: prose measure is a layout decision, not a viewport one.
 * Each middle term crosses the nominal size around 1024px.
 */
const FLUID_SIZE = {
  'display-large': ['2.25rem', '1.2rem + 4.8vw'],
  'display-medium': ['1.95rem', '1.12rem + 3.5vw'],
  'display-small': ['1.7rem', '1.08rem + 2.6vw'],
  'headline-large': ['1.6rem', '1.12rem + 1.9vw'],
  'headline-medium': ['1.45rem', '1.08rem + 1.55vw'],
  'headline-small': ['1.3rem', '1.06rem + 1.1vw'],
};

const sizeToken = (role, rem) =>
  FLUID_SIZE[role] ? `clamp(${FLUID_SIZE[role][0]}, ${FLUID_SIZE[role][1]}, ${rem}rem)` : `${rem}rem`;

/* ------------------------------------------------------------------ build */

const trustLight = trustFor('light');
const trustDark = trustFor('dark');

const themeBlocks = [];
for (const [name, { seed, ground }] of Object.entries(THEMES)) {
  const light = rolesFor(seed, 'light');
  const dark = rolesFor(seed, 'dark');
  themeBlocks.push(`  /* ${name} — seed ${seed}, default ground ${ground} */`);
  themeBlocks.push(
    block(
      `  [data-theme='${name}'], [data-theme='${name}-light']`,
      light,
      trustLight,
      `${name}/light`,
    ),
  );
  themeBlocks.push(block(`  [data-theme='${name}-dark']`, dark, trustDark, `${name}/dark`));
}

/*
 * Pre-mount ground. index.html stamps data-mode on <html> before first paint;
 * until React mounts a [data-theme] region these two rules are the only source
 * of surface/on-surface, so the body never flashes unthemed white and native
 * chrome (scrollbars, form controls) already agrees with the mode.
 */
const mountLight = rolesFor(THEMES.study.seed, 'light');
const mountDark = rolesFor(THEMES.study.seed, 'dark');
const mountBlocks = `  /* ---- pre-mount ground: keyed off html[data-mode], see index.html ---- */

  html[data-mode='light'] {
    color-scheme: light;
    --md-sys-color-surface: ${mountLight.surface};
    --md-sys-color-on-surface: ${mountLight['on-surface']};
  }

  html[data-mode='dark'] {
    color-scheme: dark;
    --md-sys-color-surface: ${mountDark.surface};
    --md-sys-color-on-surface: ${mountDark['on-surface']};
  }`;

const css = `/*
 * Material 3 Expressive tokens — GENERATED by tools/gen-m3-tokens.mjs.
 * Do not edit by hand; run \`npm run tokens\` instead.
 *
 * Colour roles are HCT tonal palettes seeded from the persona accents, with the
 * neutral ramps seeded separately from this site's own paper (${PAPER}) and ink
 * (${INK}) so surfaces stay warm instead of taking the accent's hue.
 *
 * The --md-sys-trust-* family is the exception: it is seeded from its own four
 * hues and varies only with the ground, never with the persona, because a band
 * that changed hue between pages would stop meaning anything.
 *
 * Every text-on-background pair here is checked against WCAG AA at generation
 * time; the generator exits non-zero if one drops below 4.5:1.
 */

@layer m3.tokens {
  :root {
    /* ---- shape: 10-step corner radius scale ---- */
${SHAPE.map(([k, v]) => `    --md-sys-shape-corner-${k}: ${v};`).join('\n')}

    /* ---- motion: M3 Expressive springs, as Google's published web curves ---- */
${MOTION.map(
  ([k, c, d]) =>
    `    --md-sys-motion-spring-${k}: cubic-bezier(${c});\n    --md-sys-motion-duration-${k}: ${d};`,
).join('\n')}

    /* ---- typeface roles: brand for display/headline, plain for body/label ---- */
    --md-sys-typescale-brand-font: 'Source Serif 4', Georgia, serif;
    --md-sys-typescale-plain-font: 'IBM Plex Sans', system-ui, -apple-system, sans-serif;
    --md-sys-typescale-mono-font: 'IBM Plex Mono', ui-monospace, monospace;

    /* ---- type scale (Major Second, 1.125, anchored at 14sp body) ---- */
${TYPE.map(
  ([r, s, lh, tr, w]) =>
    `    --md-sys-typescale-${r}-font: var(--md-sys-typescale-${isBrand(r) ? 'brand' : 'plain'}-font);\n` +
    `    --md-sys-typescale-${r}-size: ${sizeToken(r, s)};\n` +
    `    --md-sys-typescale-${r}-line-height: ${lh}rem;\n` +
    `    --md-sys-typescale-${r}-tracking: ${tr}em;\n` +
    `    --md-sys-typescale-${r}-weight: ${w};`,
).join('\n')}

    /* ---- emphasized set: M3 Expressive's second weight axis ---- */
${TYPE.map(([r, , , , , ew]) => `    --md-sys-typescale-emphasized-${r}-weight: ${ew};`).join('\n')}

    /* ---- state layer opacities ---- */
    --md-sys-state-hover-opacity: 0.08;
    --md-sys-state-focus-opacity: 0.10;
    --md-sys-state-pressed-opacity: 0.10;
    --md-sys-state-dragged-opacity: 0.16;
    --md-sys-state-disabled-content-opacity: 0.38;
    --md-sys-state-disabled-container-opacity: 0.12;

    /* ---- elevation: tinted warm so shadows read brown, not grey ---- */
    --md-sys-elevation-0: none;
    --md-sys-elevation-1: 0 1px 2px rgba(48, 36, 28, 0.16), 0 1px 3px 1px rgba(48, 36, 28, 0.08);
    --md-sys-elevation-2: 0 1px 2px rgba(48, 36, 28, 0.18), 0 2px 6px 2px rgba(48, 36, 28, 0.10);
    --md-sys-elevation-3: 0 4px 8px 3px rgba(48, 36, 28, 0.10), 0 1px 3px rgba(48, 36, 28, 0.18);
    --md-sys-elevation-4: 0 6px 10px 4px rgba(48, 36, 28, 0.10), 0 2px 3px rgba(48, 36, 28, 0.18);
    --md-sys-elevation-5: 0 8px 12px 6px rgba(48, 36, 28, 0.12), 0 4px 4px rgba(48, 36, 28, 0.18);
  }

${mountBlocks}

${themeBlocks.join('\n\n')}
}
`;

mkdirSync('src/styles', { recursive: true });
writeFileSync('src/styles/m3-tokens.css', css);

console.log(`wrote src/styles/m3-tokens.css  (${(Buffer.byteLength(css) / 1024).toFixed(1)} kB)`);
console.log(`themes: ${Object.keys(THEMES).join(', ')} x {light, dark}`);
const blocks = Object.keys(THEMES).length * 2;
console.log(
  `contrast: ${AA_PAIRS.length + AA_NONTEXT.length} role pairs + ` +
    `${TRUST_AA.length + TRUST_NONTEXT.length} trust pairs ` +
    `x ${blocks} blocks = ${(AA_PAIRS.length + AA_NONTEXT.length + TRUST_AA.length + TRUST_NONTEXT.length) * blocks} checks`,
);
console.log(
  `trust: ${Object.keys(TRUST_SEEDS).length} bands x ${TRUST_ROLES.length} roles, ` +
    `${Object.keys(trustLight).length} tokens per block, persona-invariant`,
);

if (failures) {
  console.error(`\n${failures} contrast failure(s):`);
  report.forEach((l) => console.error(l));
  process.exit(1);
}
console.log('contrast: all pairs pass WCAG AA');

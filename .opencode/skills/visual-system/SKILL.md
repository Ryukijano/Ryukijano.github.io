---
name: visual-system
description: How the Material 3 Expressive token system, themes, dark mode, and the atmosphere layers work in this repo — and how to add or restyle a page without breaking gates. Load before touching src/styles/, any Theme usage, or page shells.
---

# The visual system

## Tokens (generated — never hand-edit `m3-tokens.css`)

- `npm run tokens` runs `tools/gen-m3-tokens.mjs`, which writes
  `src/styles/m3-tokens.css` and enforces WCAG AA on 138 role pairs.
- Themes: `study` (#c96442 terracotta), `ryukijano` (#6f9fd8 slate),
  `ryoushi` (#b04a75 rose) — each generated in light AND dark
  (`[data-theme='study']`, `[data-theme='study-dark']`, …).
- To change a token: edit the generator, run `npm run tokens`. The file
  header says so; a hand edit dies on the next regeneration.
- `fact-check.jsx` fails on raw hex in rendered markup. Component CSS
  (`m3.css`) must use `var()` / `color-mix()` / `currentColor` only.

## Light/dark mode plumbing

- `src/lib/mode.js` owns the storage key `site-mode` (localStorage) with
  `prefers-color-scheme` fallback and live system-change propagation.
- `index.html` has a pre-paint script stamping `html[data-mode]`; it MUST
  agree with `mode.js` (same key, same fallback order).
- `Theme` (in `src/components/m3/index.jsx`) resolves any palette name to
  `${base}-${mode}`; pages declare palettes ("study"), never schemes.
- Pre-mount ground colours for `html[data-mode]` are emitted by the
  token generator.

## Page shell recipe

```jsx
<Theme name="study" style={rootStyle}>   // rootStyle: position:'relative', minHeight:'100vh', background surface
  <Atmosphere />                          // or variant="quiet" for reading pages
  <SiteNav variant="ink" | "paper" (+ overlay on the folio) />
  <main style={{ position: 'relative', zIndex: 1, ... }}>
```

- Atmosphere layers are decorative (`aria-hidden`, pointer-events:none).
  Content must stack above via `position:relative; zIndex:1`.
- Variants: `full` (wash + rings + grain) for index/persona/landing;
  `quiet` (faint wash + grain, no rings) for notes and case studies;
  home folio takes a bare `.atmo > .atmo__grain` only; Academic page
  intentionally has none.
- Rings drift via `@keyframes atmo-drift` (180s) wrapped in
  `@media (prefers-reduced-motion: no-preference) and (min-width: 600px)`.
  New motion goes inside the same media query; `src/base.css` also has a
  global reduced-motion kill switch.

## Type and layout

- Type roles flow through `Text`/`typeStyle` → five CSS custom props per
  role. Display/headline sizes are fluid (`clamp()` set in the generator);
  body/label are fixed.
- Fonts: Source Serif 4 (brand), IBM Plex Sans (plain), IBM Plex Mono
  (figures/labels). No new families.
- Component CSS lives in `src/styles/m3.css` under `@layer m3.components`;
  its header rule: no literal colours, radii, or easings — vars only.

## Identity elements (do not redesign casually)

- Home is the Kanagawa plate (`KanagawaPlate.jsx` + `.folio__*` rules):
  hung print, paper margin, kento marks (hikitsuke tick + kagi L) in the
  gutter, daisen title-slip below. `box-sizing: content-box` on the kento
  marks is load-bearing against the global border-box reset.
- The `/trust` band colours are persona-invariant by design; never theme
  them per persona.

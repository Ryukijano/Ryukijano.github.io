---
name: paper-ink
description: The washi print system this site is built in — the eight ink tokens, the one-accent rule, the type and space scales, and the twelve route shapes including the five new ones (notes, workbench, collection, ledger). Load before adding a page or touching src/index.css.
---

# paper-ink

The site is a print hung on washi paper. Light is reflected, never emitted:
ink sits on paper, the paper has tooth, and the brightest mark on a sheet is
still ink. Before adding anything, ask whether a press could have produced
it — if the answer needs a light source, it is out.

`DESIGN.md` is the decision log and `tests/tokens.test.js` asserts the parts
that matter. Read DESIGN.md before changing `src/index.css`; if a test goes
red, that file says whether the decision was deliberate.

## The invariants

These are asserted in code. Breaking one is a test failure, not a taste
disagreement.

- **One accent, two homes.** `--color-seal` marks the scope-and-evidence
  convention (`.scope__label`, `.folio__mark`) and interaction (focus, hover,
  `.is-active`, `::selection`). Nothing else. The test walks every rule that
  references it and fails on a third kind of selector.
- **`--color-rule` is the ink at 0.18**, never a separate grey.
- **Contrast floors**: ink on washi ≥ 7.0 (AAA), ink-muted and seal ≥ 4.5.
  `--color-ink-muted` sits 0.52 above AA, so nudging the paper or the ink
  breaks it invisibly.
- **`--color-washi-deep` is a ground only.** ink-muted reaches 4.38 on it and
  fails AA. Never set small text there.
- **`--color-seal-bright` is decorative**, used by `.seal` alone, which is
  `aria-hidden`. It is 3.95 on washi-lift. Real text in it is a failure.
- **The type scale is 1.25 from `--step--1` up**, anchored on a 17px body.
  `--step--2` is deliberately off the scale at 0.72rem as a legibility floor
  for tracked uppercase mono.
- **No dark mode.** `color-scheme: light`, permanently. A print has no dark
  variant.
- **Grain is under the text layer**, not over it. Fibre first, ink on top.
- **Nothing decorative is load-bearing.** Kill every texture and the site is
  still the print system it was.

## Type and space

Three families, no others. **Source Serif 4** is the voice — body, display,
headings, everything readable, with the `opsz` axis live. **IBM Plex Sans** is
interface chrome, weight 400 only. **IBM Plex Mono** carries every uppercase
tracked line and every figure, and never runs prose; set
`font-variant-numeric: tabular-nums` wherever a year or a measured value
appears.

Space is six tokens on a 1.6 ratio, `--space-1` 0.25rem to `--space-6` 3.2rem.
Measures: `--measure` 40rem is the sheet, `--measure-wide` 58rem the
catalogue, `--measure-read` 34rem the column of running text. Each page sets
`--page-measure`; the nav reads it so the bar, the text column and the kento
marks land on one edge.

Everything is square. The only radius in the stylesheet is 3px on `.seal`.

## Content rules

British English, first person, `lang="en-GB"`.

**Carry the scope of a claim in the sentence after the claim.** Never in a
footnote, never omitted. A number without its qualification does not ship.
Label anything a reader might over-trust — `Self-reported dates`,
`Unreviewed preprint`, `Teammate-reported` — in the mono label at
`--color-ink-muted`. This restraint is the personality; do not hedge it away
and do not dress it up.

No emoji, no icons, no icon font, no sprite. The kento registration corners
and the seal are the only marks.

## The route shapes

Twelve surfaces, all set by three knobs — stock, screen, gradation. On the
shipped system every one of them is washi with grain; screens, gradations and
the dark stocks are the proposed layer and render nowhere yet.

| surface | what it is |
|---|---|
| Home | the hung print, sized to one screen |
| Work catalogue | one line per project, year bands |
| Case study | opener, prose, then figures as evidence |
| Academic | publications, quiet, grain only |
| Persona | one per lane |
| **Notes — index** | two-line entries under year bands |
| **Notes — a note** | the quietest sheet; reading, not evidence |
| **Workbench** | tools someone can clone and run |
| **Collection** | a theme that crosses lanes without becoming one |
| **Ledger** | competitions, with what each rests on |

The five in bold are new. `references/route-shapes.md` has the markup and the
rules for each. Their CSS is in the paper-ink route shapes block in
`src/index.css`, written against the shipped tokens.

## Adding a page

1. Read `DESIGN.md`, then the relevant entry in `references/route-shapes.md`.
2. Put content in `src/data/` or `src/content/`, never in the component.
3. Set `--page-measure` on the sheet so the nav and the kento marks agree.
4. Use the existing classes. A new class needs a reason that is not "this page
   is different".
5. Every project, note and figure states its own scope.
6. Run `npm test` before `npm run build`. The token test catches what the
   screen will not.

## What not to do

Glow, bloom, blur, smooth gradients, wet reflections, chrome or bevelled type,
elevation, shadows, a fourth keyblock, an icon, an emoji, a hero image above a
title, a vanity metric, a dark mode, or a colour picked by eye rather than
taken from a token.

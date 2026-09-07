# Design system

The written record of decisions that `src/index.css` implements and
`tests/tokens.test.js` enforces. Read this before changing the stylesheet; if a
test fails, this file says whether the decision was deliberate.

## The idea

The site is a print hung on washi paper. Everything follows from that: the
paper is the ground, the ink is one colour, the seal is the only accent, and
the *kento* registration marks live in the paper margin — off the art, the way
they do on a real block print. Interior pages are sheets from the same press,
with the same marks in their own margins.

This is why there is no dark mode (below), why nothing has a blurred shadow,
and why the grain sits *under* the text rather than over it.

## Palette — eight tokens

| token | value | role |
|---|---|---|
| `--color-washi` | `#e6e1d3` | the paper |
| `--color-washi-lift` | `#ece8dc` | a raised slip on the paper |
| `--color-washi-deep` | `#d9d3c2` | the sheet under a plate still loading |
| `--color-ink` | `#1a237e` | the wave's Prussian indigo; all body text |
| `--color-ink-muted` | `#535896` | metadata, captions, secondary text |
| `--color-rule` | `ink` at 0.18 | every hairline |
| `--color-seal` | `#a8301b` | the artist's vermilion — the only accent |
| `--color-seal-bright` | `#c8452c` | the seal chip only |

Measured contrast, and the floors the tests hold:

| pair | ratio | floor |
|---|---|---|
| ink on washi | **10.14** | ≥ 7.0 (AAA) |
| ink on washi-lift | **10.81** | ≥ 7.0 |
| ink-muted on washi | **5.02** | ≥ 4.5 (AA) |
| ink-muted on washi-lift | **5.35** | ≥ 4.5 |
| seal on washi | **5.18** | ≥ 4.5 |
| seal on washi-lift | **5.52** | ≥ 4.5 |

`--color-ink-muted` has only **0.52 of headroom above AA**. It is used for a
lot of small text. Darkening the paper or lightening that ink by even a little
breaks the floor, and nothing on screen would tell you — which is exactly why
it is asserted in code.

`--color-seal-bright` is the one sub-AA pairing (3.95 against washi-lift). It
appears only on `.seal`, which is `aria-hidden` and decorative. If it ever
carries real text, it fails.

### Where the accent is allowed

The seal marks exactly two things:

1. **The honesty convention** — `.limit__label`, the marked word in the plate
   caption (`.folio__mark`), and the gloss footer that names the rule.
2. **Interaction** — focus, hover, the active nav item, text selection.

Nothing else. `tests/tokens.test.js` walks every rule that references
`--color-seal` and fails on any selector that is neither of those, because an
accent that starts appearing elsewhere stops meaning either.

## Type — three families, one scale

- **Source Serif 4** — body and display. The site's voice. Keeps its `opsz`
  axis: 41.6px display against 17px body is real optical work.
- **IBM Plex Sans** — UI and metadata. Weight 400 only.
- **IBM Plex Mono** — kickers, lane chips, tabular years, BibTeX. Never runs
  prose. `font-variant-numeric: tabular-nums` everywhere a year appears.

A 1.25 modular scale on a 17px body, `--step--2` (0.72rem) through `--step-5`
(3.24rem). The tests assert the ratio holds at 1.25 ± 0.02 from `--step--1`
upward, so a one-off size cannot quietly enter the scale.

`--step--2` is deliberately **off** the scale. A true 1.25 step below
`--step--1` is 0.68rem (10.88px), and that step carries tracked uppercase mono
— `.cartouche`, `.limit__label`, `.catalog__lane`, `.folio__chip` — where
10.88px is not readable. It is held at 0.72rem (11.52px) as a legibility
floor, and the tests assert that too, so the exception stays an exception
rather than becoming licence to add more.

Note the layout constants (`--measure`, `--folio-gutter`) are on a 16px root
while the type is on 17px — `html` sets no `font-size`; the 17px comes from
`body`. Worth knowing before adjusting either.

### Measures

- `--measure: 40rem` — the sheet.
- `--measure-wide: 58rem` — the work catalogue.
- `--measure-read: 34rem` — the column of running text.
- `--page-measure` — the current sheet's trim size. Each page sets it, and the
  nav reads it, so the bar's edge, the text column's edge and the kento marks
  agree on one line. They did not always: the nav was on a fixed 72rem while
  the text was 40rem, so it sat 256px outside the mark that declares where the
  sheet ends.

## Space

Six tokens on a 1.6 ratio (`--space-1` 0.25rem … `--space-6` 3.2rem), which
rhymes with the type scale. Before them there were twenty ad-hoc values and
three different section separations on the same page.

## Figures

A case-study figure is hung the way the home page's plate is: an untrimmed
block whose padding is the paper margin, a hairline around the sheet, a mono
`Fig. 1` slug, a caption in the plate's register, and one kento mark in the
margin. It sits **after** the prose, not above the title — the design
deliberately cut hero imagery, and a figure below the text reads as evidence
for what was just claimed rather than as decoration above it.

Every figure states its own limit, in the same voice as `.limit` but quieter,
because it qualifies one image rather than the whole project. This is enforced
by `tests/link-health.test.js`, along with dimensions (so nothing shifts), alt
text, and a 700 kB cap per asset.

`media/README.md` has the shape of the `figure:` field, the ffmpeg invocation,
and — usefully — a list of which images in `media/` are *not* real evidence.

## No dark mode

`html { color-scheme: light }`, deliberately and permanently.

A woodblock print on washi paper has no dark variant. Inverting it makes the
ink glow and the paper become a void, and the result is not a print — it is a
screen imitating one. The declaration also stops scrollbars and `<details>`
markers rendering dark against a cream page on a machine in dark mode.

## Motion

A 240ms opacity fade on the page body only — not the nav, which is fixed
architecture the visitor walks through rather than something that reappears on
every hop. `prefers-reduced-motion` removes it. There is no smooth scrolling:
the only in-page anchor is the skip link, and animating a skip link
desynchronises focus from scroll position.

## Focus

The global ring is `2px solid var(--color-seal)` at a 3px offset.

The three plate lanes are the exception, because they sit on a painting. A 1px
washi line there cleared 3:1 on only **69.9%** of the plate's perimeter — 48%
over the painted wave, where cream on cream disappears. No single palette
colour works (seal 20.7%, ink 35.3%). A **washi + ink double rule clears 100%**,
and at 4px it also satisfies WCAG 2.2 SC 2.4.11 on thickness. A seal rule in
the bottom gutter carries the state where the ground is paper we control.

`tests/focus-ring.test.js` re-measures this against the actual plate file, so
recropping or replacing the image tells you if the ring stopped being visible
instead of letting it go dark silently.

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

The light stock stays washi. The dark stock answers the owner's request for a
night setting: indigo-black paper, warm ink, and the same single vermilion seal.
Neither uses a blurred shadow, and the grain stays *under* the text.

## Palette — eight tokens

| token | value | role |
|---|---|---|
| `--color-washi` | `#f4f2ed` | near-white paper |
| `--color-washi-lift` | `#fffdf7` | the title slip |
| `--color-washi-deep` | `#e9e6df` | the sheet under a plate still loading |
| `--color-ink` | `#1a237e` | the wave's Prussian indigo; all body text |
| `--color-ink-muted` | `#535896` | metadata, captions, secondary text |
| `--color-rule` | `ink` at 0.18 | every hairline |
| `--color-seal` | `#a8301b` | the artist's vermilion — the only accent |
| `--color-seal-bright` | `#c8452c` | the seal chip only |

Measured contrast, and the floors the tests hold:

| pair | ratio | floor |
|---|---|---|
| ink on washi | **11.84** | ≥ 7.0 (AAA) |
| ink on washi-lift | **13.02** | ≥ 7.0 |
| ink-muted on washi | **5.86** | ≥ 4.5 (AA) |
| ink-muted on washi-lift | **6.44** | ≥ 4.5 |
| seal on washi | **6.05** | ≥ 4.5 |
| seal on washi-lift | **6.65** | ≥ 4.5 |

The lighter stock gives muted ink more headroom than the earlier cream paper.
These values are still tested as floors, not as arbitrary targets.

`--color-seal-bright` belongs only on `.seal`, which is `aria-hidden` and
decorative. On near-white washi it clears 4.32:1, below AA; the actual text
accent remains `--color-seal`.

### Where the accent is allowed

The seal marks exactly two things:

1. **Scope and evidence** — `.scope__label` and the marked word in the plate
   caption (`.folio__mark`).
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
— `.cartouche`, `.scope__label`, `.catalog__lane`, `.folio__chip` — where
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

## The hung print, and the one constant

The home page is a single print sized to one screen: the plate's **width** is
derived from the leftover viewport **height**, so the whole composition scales
without ever cropping a lane or scrolling. `--folio-plate` spends `33rem` on
everything that is not the plate — the stage's top padding, the title slip, the
gutters — and gives the rest to the sheet.

That `33rem` is the layout's one hard-coded number, and it is hard-coded because
the constraint is circular: the plate's width comes from the leftover height,
the title slip is exactly as wide as the plate (a *daisen* slip is the width of
the print it labels), and the slip's own height depends on that width because
the bio rewraps. CSS cannot solve it — sizing the plate from a grid row needs
the row's height, which needs the slip's height, which needs the plate's width.

Worse, below a certain size it does not merely fail to settle, it **diverges**:
a shorter viewport gives a narrower plate, which gives a taller slip, which
leaves less height, which narrows the plate again. The constant was `29rem`
with the fence at 720px when the slip was four lines shorter; the names line
and the fuller bio moved the divergence point up, and a budget sweep
(29–34rem against 720–900px) found **33rem exact from 800px up** and no budget
that converges below it.

So the stacked layout is not only the small-screen presentation, it is the fence
around that band: `@media (max-width: 899px), (max-height: 799px)`. Above the
fence the constant is exact; below it the print is stacked and scrolls, which is
what it should do anyway when there is no room to hang anything. In practice
the higher fence changes little: a 768px-tall laptop screen yields a ~680px
browser viewport, which was already stacked.

Three things follow, and all three are asserted:

- `sizes` on the plate has to describe this same layout, breakpoints included,
  or the browser picks a tier for a layout that does not exist. It mirrors the
  query as `and`-only conditions with the stacked case as the trailing default,
  because a media *condition* may not contain a comma and Level 4 `or` only
  landed in Safari 16.4 — and one unparseable source-size drops the whole
  attribute to `100vw`. `tests/tokens.test.js` holds all four numbers (budget,
  both breakpoints, the plate ratio) against the stylesheet.
- `tests/browser/layout.spec.js` asserts the page fits at ten desktop sizes,
  **1440×800 among them** — the boundary, and therefore the first viewport that
  fails when anything is added to the slip.
- The same file asserts the fence engages just below it, because dropping the
  height half of that query would silently return the diverging layout.

## Figures

A case-study figure is hung the way the home page's plate is: an untrimmed
block whose padding is the paper margin, a hairline around the sheet, a mono
`Fig. 1` slug, a caption in the plate's register, and one kento mark in the
margin. It sits **after** the prose, not above the title — the design
deliberately cut hero imagery, and a figure below the text reads as evidence
for what was just claimed rather than as decoration above it.

Every figure states its own scope, in the same voice as `.scope` but quieter,
because it qualifies one image rather than the whole project. This is enforced
by `tests/link-health.test.js`, along with dimensions (so nothing shifts), alt
text, and a 700 kB cap per asset.

The animated figures from the earlier field-note design remain part of the
project record. They are delivered as looping GIFs with still posters.
Reduced-motion mode swaps each GIF for its poster inside the same `<picture>`,
so the alt text survives and the GIF is never fetched. Most explain a method and are labelled
as schematics. The surgical-phase figure is a model diagnostic from selected
ESD frames. Four are computed for the page: the Hopfield tour, Burgers'
equation, the LABS search and the surface-code decode. Each says so in its
scope, and `media/README.md` records how it was made.

`media/README.md` has the shape of the `figure:` field, the encode notes,
and — usefully — a list of which images in `media/` are *not* real evidence.

## Light and dark stocks

The owner chose two stocks after seeing the print on washi: light washi and
dark indigo-black. Dark is a separately inked surface, not `filter: invert()`
or a cyan-on-black dashboard. The print and figure images retain their own
colours. The same engraving sits outside the reading column on both stocks;
it is decorative and is not downloaded from the reference images.

The initial stock follows the operating-system preference. A labelled switch
in the nav stores an explicit choice in local storage and carries it between
routes and reloads. The stock is set before the page paints so prerendered
content does not flash the wrong colour. Each stock sets its own
`color-scheme`, including native scrollbars and disclosure markers. On the
narrowest phones the interior nav splits into a wordmark line and a links
line; the home nav has no wordmark and stays on one line.

Dark stock: background `#101b2b`, raised sheet `#1a2938`, deep ground
`#192333`, text `#efe9dc`, secondary text `#b9c0d0`, accent `#f28d76`.
Text clears 12:1 against the raised sheet; secondary text clears 8:1.
The raised sheet and the ink are tokens, never a CSS inversion of the image.

## Interior atmosphere

Interior pages carry four layers inside `.atmo`, in this order: wash →
fibre → engraving/motif → grain. `.atmo` stays z-index 0 under
`.print__body` (z-index 1): grain is fibre in the sheet, ink prints on top.
The home plate keeps its own wave (`.folio::before`); the motifs below change
only the interior `.atmo__engraving`.

Fibre is a kozo tile (`kozo-fibre.svg`) in two sizes (640px and 448px, the
second offset 233px/151px) so the repeat never lines up down a long page.
Absolute, like the grain, because it is the paper and scrolls with it.
Printed in the stock's own ink (`background: var(--color-ink)` with the SVG
as a mask) at 0.07 on light, 0.065 on dark. No new token, no blur, glow or
shadow.

The fibre is clipped out of the sheet — `clip-path: polygon(evenodd, …)` on
`--page-measure`, the edge the kento marks declare — so it lives only in the
margins. Without the clip, a fibre core under a glyph moved the worst-pixel
contrast of muted ink from 5.02 to 4.55:1 on light and from 7.45 to 6.55:1 on
dark. That is still above AA, but it is a change, and the brief says contrast
must not change. With the clip, the page measures identical to the unfibred
site: light 10.15 / 5.02, dark 11.23 / 7.45 (ink / muted, worst background
pixel in the 640×840 column at 1440×900, text hidden). The clip follows
`--page-measure`, so Work (58rem) clips wider. Below the measure there is no
margin, so phones get no fibre; fibre is also `display: none` below 900px,
with the motif.

Motifs share one box (`min(29vw, 25rem)`, fixed, right, top 5rem, height
`100dvh − 5rem`), one ink (`var(--color-ink)`) and one opacity (0.075 light,
0.12 dark) — except the lattice, which sits at 0.10 on dark. Its hatched Z
faces carry more ink per pixel than the line motifs, and matched their weight
slightly lower. The wave stays the default for Academic, Work, case studies,
notes and Ryukijano; `motif="film"` is a cut strip of five frames with the
endoscope's circular field stop in each, for Gyanateet; `motif="lattice"` is
a distance-5 rotated surface code — data qubits on the vertices, Z plaquettes
hatched, X open, weight-2 boundary half-discs with the checkerboard continued
outward — for Ryoushi. Same technique as the wave throughout:
white-on-transparent SVG as a mask over ink, square caps and joins, no new
colour tokens. Hidden below 900px, where there is no margin to hang them in.

The engraving is clipped out of the sheet by the fibre's polygon, so it never
sits under the reading column or the lane labels. Before the clip, the
engraving on Work (58rem) at 1440px overlapped the sheet by 144px and painted
3,877 sheet pixels; the lane labels sat inside that overlap. Now it paints none
of the sheet at 1440px or 1100px. The box is fixed to the viewport, so the clip
is measured from its right edge rather than as a percentage of its own width.
On a viewport narrower than the sheet it is clipped entirely, because there is
no margin for it. At 920px that leaves 15 pixels on the box's left edge, each
one 8-bit level off the hidden value: the box starts on a fractional pixel, so
its anti-aliased edge shows through the clip. That is the expected outcome, not
a visible engraving. The folio wave (`.folio::before`)
shares the box but has no sheet, so it is not clipped. Opacity and ink are
unchanged. Contrast cannot drop: the engraving is dark ink under dark text, so
removing it from under the text only lightens the ground, and the floors in
`tests/tokens.test.js` still hold on the accessibility pages.

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

## Headings

`.print__name` (a person, on `/academic` and the persona sheets) and
`.print__title` (a project, on `/work/<slug>`) are the same size, `--step-4`,
on purpose. Each sheet carries one `h1` and the two never share a page, so
there is no hierarchy to draw between them. The two class names say what the
heading *is*; the size is one decision, made once.

## The plate key

Hung, the three overlay lanes stay clickable, but the gutter chips and
pipeline arrows stay quiet until hover or focus. Three labelled fields on
first paint read as a form; the slip already carries the names.

Below 900px wide *or* 800px tall the print is stacked — most phones, and any
desktop window with a dock or devtools open. The overlay lanes go, because a
plate that narrow is not something to aim at. What replaces them is a **plate
key** under the sheet: the same three ticks, stage words and handles as the
gutter chips, the same hairline arrows, laid out as a legend in normal flow
(`.folio__key`). Each lane is the tap target, 44px tall, so there is no
separate list repeating the same three links underneath.

The kento marks stay on the stacked print, in the block's bottom margin under
the key. They are the difference between a print and a picture, and the
stacked layout is the one most visitors see.

Stacked, the order is print, key, slip — the figure before its caption, as on
the hung layout. The slip used to come first, which put "the plate reads left
to right" above a plate the reader had not scrolled to.

The stacked print is still sized from height first. On a phone it is full
bleed less the gutters. In a wide, short window — a laptop with a dock, a
docked devtools pane — full bleed would be a 1376px plate with the name a
whole screen down, so `--folio-stacked` caps the block at
`(100dvh − 17rem) × 3923/2160`, floored at 20rem so the sheet is never a
sliver. The trailing branch of `sizes` claims full bleed and therefore
over-describes in that band; it cannot express the cap without a nested
`min()`, and over-fetching is the safe direction.

`tests/browser/layout.spec.js` asserts that exactly one of the overlay and the
key is live at every viewport, that the key's lanes clear 44px, that the three
stage words and two arrows are present in the fence band, that the kagi mark
is visible there, that the sheet's width is what the stacked rule says, and
that the name sits above the fold under the print. A 320px viewport is in the
list because that is where `Real world` has to wrap rather than overflow.

## Open

Decisions not yet made, kept here so they are not mistaken for defects.

**Yana.** Ryukijano and Ryoushi exist online; Yana is the middle of Gyanateet
and has no footprint of its own. `/persona/gyanateet` resolves to the same page
as `/persona/yana`. Whether the vision lane should carry `Gyanateet` instead
is the owner's call.

**Not open:** `--color-seal-bright`. It is decorative on exactly one
`aria-hidden` element; the tests hold it there. On the white stock it is below
AA against the paper, so it must not carry real text.

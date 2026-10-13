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
| `--color-washi-deep` | `#e9e6df` | the sheet under a plate still loading, and the home note |
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
— `.cartouche`, `.scope__label`, `.catalog__lane` — where
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

## The desk board

The home page is a desk on graph paper: a taped nameplate, pinned pictures,
a note, and a square mark. The Kanagawa plate is pinned on that desk, beside
the pixel room. The plate is the painted beat. The pixel drawing is the
pixels beat. Its crops are served from `public/assets/images/`. The social
card still uses `og-plate.jpg`.

The ground is washi, ruled with a 1px line of `--color-rule` on a 1.5rem
cell. No new colour. The nameplate and the picture mounts are
`--color-washi-lift`. The note is `--color-washi-deep`. That token had been
reserved for a loading plate, never for prose, because it is a ground. The
note is the exception, and it is a short list rather than a column of body
copy: it is the only other paper in the palette, so the note can be a
different sheet from the nameplate without a new yellow. Ink on it is what
the home contrast check holds.

The nameplate reads Gyanateet Dutta, then Ryukijano in the italic serif, then
"Vision, quantum & robotics". Vision links to that lane. Quantum links to
Ryoushi, whose subtitle is already "Quantum algorithms". Robotics links to
Gemma-Le, the project tagged Robotics. There is no robotics lane.

"On my mind" lists three lines the site already states. Self-supervised
vision is the ISBI paper, and the link is the AIMS case study. Quantum
algorithms is the Ryoushi subtitle. Image-based 3D reconstruction is a
research interest, word for word, and the link is B3tt3r. "Robot learning"
is not on the note: nothing in `src/data` calls the work that.

"where it started" is the childhood portrait already on the site, and it
opens `/notes/beige-pc`. The home bio is the same sentence the sheet used
to carry, including that link. "the other deck" is an original pixel drawing
of a room and a figure at a desk, in `--color-ink` and `--color-ink-muted`
on the paper, pinned beside the wave plate. No new pigment. Its scope line
says it is a pixel drawing, not a photograph and not a result. The reference
mock was not cropped into the page. Fibre and the clipped wave engraving
show in the margin on a wide screen, and hide below 900px. The graph ruling
stays on the sheet.

"open source ftw" is a square mono label, no radius, linking to the GitHub
profile. It is not a seal and not a pill.

On the hung sheet the cards overlap the way a board does: the deck tucks
over the nameplate, and the note sits on the deck's right edge. Below the
fence the overlap is off and the column stacks. Tape on this page is the
pinned-figure strip with ink stripes mixed from the existing ink and
washi-deep, still a square. Tilt and the hard offset are the pinned-figure
treatment. Tilt turns off at 640px, with the gallery. The offset stays a
zero-blur rule mark.

Above 900px wide **and** 800px tall the board is one screen.
`tests/browser/layout.spec.js` asserts that at ten desktop sizes, **1440×800
among them**. Below either fence the board stacks, in this order: nameplate,
childhood picture, drawing, note, mark. The name stays on the first screen.
The ruling stays at 390px. It is the ground, not the margin engraving, so it
does not hide with the fibre. The home bar is the solid nav, overlaid, so
the ruling never sits under the links.

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
so the alt text survives and the GIF is never fetched on its own — but the
still carries a square play chip, visible only under reduced motion, that
drops the poster source and starts the loop on demand. The still is the
default there, not the only option. Most explain a method and are labelled
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
The home board does not hang that wave. Its ground is the graph ruling, and a
wave under the cards would sit in the type. The motifs below change only the
interior `.atmo__engraving`.

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

The desk-board links sit on paper, so that ring is the indicator.
`tests/focus-ring.test.js` holds the thickness and the seal, and checks the
board does not set `outline: none` on its own links. The washi-and-ink double
rule belonged to the three lanes that used to sit on the Kanagawa plate. Those
lanes are gone with the print, and the measurement that justified the double
rule went with them.

## Headings

`.print__name` (a person, on `/academic` and the persona sheets) and
`.print__title` (a project, on `/work/<slug>`) are the same size, `--step-4`,
on purpose. Each sheet carries one `h1` and the two never share a page, so
there is no hierarchy to draw between them. The two class names say what the
heading *is*; the size is one decision, made once.

## Pinned figures and the gallery

Two directions from the pinned-figure prototypes, both built from the shipped
tokens — no new colour, radius, easing or font. Case-study figures are pinned
to the sheet rather than hung in it; `/figures` gathers them as overlapping
pinned cards with three redrawn studies.

### The pinned-figure treatment

Each figure keeps its block, sheet, caption slip and scope line, and gains a
fastener and a tilt:

- **Alternating rotation**, odd figures −1.4deg, even figures +1.2deg. Within
  ±1–2deg the caption baseline still reads straight.
- **One fastener**, alternating with the tilt: a tape strip (5.5rem × 1.1rem
  of `--color-washi-deep` with a hairline border) or a square pin (a 10px
  square of `--color-ink`). It sits on the card's top edge only, so it can
  never cover a caption or a scope line.
- **A hard offset edge**, `6px 6px 0 var(--color-rule)` with zero blur.
- **At 640px and below the rotation is off.** The tape and pin stay, smaller,
  and the offset drops to 3px — a phone column has no room for a tilt, but
  the card should still read as pinned rather than hung.

The rule this bends is *everything square, hung straight, never a shadow*.
The tilt is decorative and capped at 2deg, off where the column is narrowest;
the offset is a zero-blur hard edge in the rule colour, a print mark rather
than a light source — blur it by one pixel and it becomes the elevation the
system refuses. The fasteners carry no text, so the contrast floors are
untouched. `tests/browser/figures.spec.js` holds the tilt, the fastener, the
offset and the 640px fence.

### The gallery (`/figures`)

Six case-study cards, staggered and overlapping, each reusing its case
study's poster — the still, never a GIF mid-frame — and each keeping its
caption and scope line word for word, with a link back to its case study.
Overlap may touch card edges only: no caption or scope line sits under
another card, which `tests/browser/figures.spec.js` asserts with bounding
boxes rather than by eye. Below the narrow breakpoint the cards stack in one
column with no overlap and no tilt.

Three study cards join them: the red spiral tunnel, the blue wave lines and
the circuit tree, redrawn as flat SVGs in the stock's ink and muted ink —
square caps and joins, no blur, no copied pixels. The picked-out line in each
is `--color-ink-muted`, not the seal: the one-accent rule is asserted in
`tests/tokens.test.js`, and a third home for the seal would fail the suite
rather than bend a guideline. Each study is captioned as a redrawn study
after a pinned reference, and its scope line says it is not a result. The
SVG sources live in `media/` and are inlined so they print in the stock's
own tokens on both papers; `media/README.md` records how each was drawn.

The rule this bends is *a figure sits after the prose that claims it, as
evidence*. The gallery shows figures with no prose around them. It is allowed
for the same reason a collection is: every card keeps the caption and scope
it carries at home, and the card points back to the case study that earns
them — a second path to the same figures, not a replacement. The studies
could be mistaken for results at a glance, which is why their scope lines say
plainly that they are not.

## Open

Decisions not yet made, kept here so they are not mistaken for defects.

**Yana.** Ryukijano and Ryoushi exist online; Yana is the middle of Gyanateet
and has no footprint of its own. `/persona/gyanateet` resolves to the same page
as `/persona/yana`. Whether the vision lane should carry `Gyanateet` instead
is the owner's call.

**Not open:** `--color-seal-bright`. It is decorative on exactly one
`aria-hidden` element; the tests hold it there. On the white stock it is below
AA against the paper, so it must not carry real text.

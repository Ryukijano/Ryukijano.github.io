# Desk board design

Contents: composition, pinning, the two stocks, pictures with their own
colour, the pixel plate, the fences, adding a card, tests that hold it.

Tokens and numbers live in `src/index.css`. This file says which ones to use
and where to look; if it quotes a number, the stylesheet wins.

## Composition

Look at the `.board__stage` rule in `src/index.css` for the grid. The areas
are `name started / pair note / bio mark`. The desk reads in this order, top
left to bottom right, and the tab order matches the DOM: nameplate, childhood
picture, plate, drawing, note, bio, label.

Cards overlap the way a board does:

- the drawing tucks over the plate's edge (`margin-left`);
- the pair rides up under the nameplate (`top`) and a little under the note;
- the childhood print is nudged left over the nameplate (`left`).

These nudges exist only above the fence. Below it the column has no overlap.
New overlap is allowed only if captions, scope lines and links stay clear;
check with bounding boxes, as `tests/browser/layout.spec.js` does for the note and the drawing.

The ground is `.board`: `--color-washi` with two `linear-gradient`s of
`--color-rule` on a 1.5rem cell. A test requires `var(--color-rule)` in
those gradients and no hex in the rule. The wash and grain are hidden on this
page so the ruling stays the ground; fibre and the clipped engraving show in
the margin on a wide screen and are `display: none` below 900px. The ruling is
the ground, so it stays at 390px.

Do not hang a wave under the cards. It would sit in the type.

## Pinning

Shared with `/figures` (see `DESIGN.md`, "The pinned-figure treatment").
Reuse, never fork:

| part | class | rule |
|---|---|---|
| tilt | `.plate--pinned`, `.plate--flip` | alternate the two; both within 2deg; off at 640px |
| hard offset | `.plate--pinned` | zero blur, `--color-rule`; smaller at 640px |
| tape | `.plate__tape` | top edge only; `aria-hidden`; own `left` per card |
| pin | `.plate__pin` | a small ink square; used on `/figures`, not on the desk |

On the desk the tape is `--color-washi-deep` with hard stripes of ink mixed
down with `color-mix`. It is square and carries no text. Do not add a second
fastener to a card, a curl, a fold or a shine.

Hover and focus on a link turn it `--color-seal`; that is the interaction home
and needs no new rule. Never set `outline: none` on a `.board` selector
(`tests/focus-ring.test.js` fails it). At 640px and below, links get a 44px
minimum height.

## Two stocks

Light is washi, dark is indigo-black. Both are set by tokens; the dark stock
is not `filter: invert()`. On the desk that means:

- chrome (mounts, label, nameplate, note, tape, ruling) uses tokens only, so
  it follows the stock for free. A hex or `rgb()` in a `.board` rule is a bug.
- the pixel drawing prints in ink and muted ink, so it flips with the stock;
- the portrait and the plate keep their own colour on both (below).

Check both. A card that looks right in light and has a pale halo in dark
usually has a hard-coded background.

## A picture may carry its own colour

The site's chrome is paper and ink. A pictorial print is the exception, and
it is allowed because it is a picture, not chrome. `DESIGN.md`: print and
figure images retain their own colours.

- Do: let the Kanagawa plate and the childhood portrait keep the pigment
  they were made with, inside a `--color-washi-lift` mount with a hairline.
- Do: keep the mount, caption and tape in tokens, so the colour stays
  *inside* the frame.
- Don't: tint, filter, blend or invert a picture to match the stock.
- Don't: pull a colour out of a picture to use on a border, a heading or the
  label.
- Don't: use the seal to "echo" a red in a print.

A picture needs `alt`, `width` and `height` (nothing shifts), and a caption
that says what it is. Keep each asset small; `link-health` caps figure assets at 700 kB. The
plate is served as AVIF, then WebP, then JPEG from `public/assets/images/`
(`src/data/plate.js`); its `sizes` describe the card, not a full-bleed print.
Set `fetchPriority="high"` on the plate only.

## The pixel plate

`media/desk-plate.svg`, inlined by `board.js` with `?raw` and set in a
`.study-art` box. It is the pixels beat: a room and a figure at a desk, drawn
for the page. Rules:

- viewBox `0 0 96 64`; one unit is one pixel; `shape-rendering="crispEdges"`;
  `preserveAspectRatio="xMidYMid meet"`.
- Only `<rect>` elements of whole-unit size on whole-unit positions. No
  `<path>` curves, no strokes, no blur, no `<defs>`, no `<style>`.
- Only two classes: `ink-fill` and `muted-fill`. No `fill` attribute and no
  colour literal. `.study-art .ink-fill` and `.muted-fill` in `index.css`
  resolve them to `--color-ink` and `--color-ink-muted`, so it prints on both
  stocks. No seal, no third pigment.
- Set `width` and `height` in `board.js` to the viewBox (96 and 64); the
  component derives `--deck-ratio` from them. Change one place, not three.
- It is `aria-hidden` in the page and the figure is captioned. The scope line
  is required: a pixel drawing, not a photograph, not a result.
- Merge runs: one rect per run of the same colour on a row. The file was
  ~500 rects; do not bloat it, and the budget check will tell you if you do.
- Do not crop or trace the reference mock. Draw it.
- If you redraw it, update the line about it in `media/README.md`.

## Fences

| fence | where | what changes |
|---|---|---|
| 900px wide **or** 800px tall | `@media (max-width: 899px), (max-height: 799px)` | one screen becomes a column; overlap off; fibre and engraving off |
| 640px | `@media (max-width: 640px)` | tilt off; offset and tape shrink; 44px targets |

The numbers come from `BOARD_MIN_WIDTH_PX` and `BOARD_MIN_HEIGHT_PX`. Change
them together with the `@media` query, or `tests/tokens.test.js` fails.
In the column the name stays on the first screen at 390px, then the childhood
picture, the drawing, the note, the label.

## Adding a card

1. Add its content to `board.js` (and to `src/data` if it states a fact).
2. Add the markup in `HomePage.jsx` with `plate--pinned`, the next
   alternation of `plate--flip`, and a `plate__tape`.
3. Reuse `.board__card`, `.board__caption`, `.board__scope`. Give it a grid
   area only if the one-screen layout can hold it at 1440x800.
4. Write its caption and scope line (`voice.md`). A card with no scope line
   that a reader could over-trust is unfinished.
5. Add or extend a Playwright check in `tests/browser/layout.spec.js` if it
   changes what must be visible.

## What holds all this

| test | holds |
|---|---|
| `tests/tokens.test.js` | ruling is `--color-rule`, fence numbers agree, stage is `100dvh`, seal has two homes |
| `tests/focus-ring.test.js` | board links keep the seal ring |
| `tests/browser/layout.spec.js` | one screen at ten desktop sizes (1440x800 among them), a column below, the note beside the drawing, both stocks at 1440x900 and 390x844 |
| `tests/browser/figures.spec.js` | tilt, fastener, offset and the 640px fence shared with `/figures` |
| `tests/link-health.test.js` | dimensions, alt text, asset cap, links resolve (needs `dist/`) |

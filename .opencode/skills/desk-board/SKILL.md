---
name: desk-board
description: Design and write the home page desk board of ryukijano.github.io - the taped nameplate, pinned prints, "On my mind" note, square "open source ftw" label, graph-paper sheet and pixel plate - and the site's first-person, scoped British voice. Use when editing src/data/board.js, src/pages/HomePage.jsx, the .board or .plate--pinned CSS, media/desk-plate.svg, the home bio, a caption, a scope line or the note, or when asked to add a print, change the home layout, or write copy for the site.
---

# desk-board

The home page is a desk on graph paper. Everything on it is paper, tape and
ink; nothing is lit. This skill covers building the desk and writing what is
pinned to it. It sits on top of `paper-ink`: read that first for the tokens,
and `DESIGN.md` ("The desk board", "Pinned figures and the gallery") for why.

## Before you touch anything

1. Read `.opencode/skills/paper-ink/SKILL.md`, then `DESIGN.md`.
2. Copy lives in `src/data/board.js`, `src/data/plate.js` and
   `src/data/publications.js` (`HOME_BIO`). `HomePage.jsx` holds none.
3. Styles live in the `desk board (home)` block and the `.plate--pinned`
   block of `src/index.css`. Reuse them. Read tokens from there; never copy a
   number into markup or a new rule.

## Hard rules

- No new colour, radius, easing or font. If you need one, change `DESIGN.md`
  first, then the code. The only radius on the site is 3px on `.seal`.
- The desk has no blurred shadow, no smooth gradient (the ruling and the tape
  stripes are hard-stop lines), no icon, no emoji, no hero above the name.
- `--color-seal` stays on its two homes: scope and evidence, and interaction.
  A desk card never gets a seal border, fill or heading.
- Do not tune a value to pass `tests/tokens.test.js`. If it goes red,
  `DESIGN.md` says whether the decision was deliberate.

## The desk, in one screen

Above 900px wide **and** 800px tall the board is one `100dvh` sheet, in a grid
of `name started / pair note / bio mark`. Below either fence it is a column:
nameplate, childhood picture, drawing, note, mark. The fence numbers are
`BOARD_MIN_WIDTH_PX` and `BOARD_MIN_HEIGHT_PX` in `board.js`; the CSS
`@media` must match them (a test checks it). 1440x800 must stay one screen.

| piece | class | ground | note |
|---|---|---|---|
| nameplate | `.board__name` | `--color-washi-lift` | h1 name, italic handle, then three links |
| prints | `.board__print` | `--color-washi-lift` | mount with hairline; picture inside |
| note | `.board__note` | `--color-washi-deep` | the one place that token carries type |
| label | `.board__mark` | `--color-washi-lift` | square, mono, hairline, no radius |
| bio | `.board__bio` | `--color-washi-lift` | the home sentence, with its link |
| sheet | `.board` | `--color-washi` | ruled with `--color-rule` on a 1.5rem cell |

Every pinned card is `plate--pinned`, alternating with `plate--flip` for the
tilt, and carries one `<span className="plate__tape" aria-hidden="true" />`.
Tape, tilt and the hard offset are the same treatment as `/figures`:

- tilt alternates, capped at 2deg, **off at 640px**;
- the offset is a zero-blur rule-colour edge, **3px at 640px and below**;
- tape sits on the top edge only, so it never covers a caption or scope line;
- each card sets its own tape `left` so no two strips line up.

Overlap may touch card edges only. A caption, scope line or link never sits
under another card; `tests/browser/layout.spec.js` checks with bounding boxes.
Below the fence the overlap, `top` and `left` nudges are all zeroed.

Details, including the two stocks, the pixel plate and how a picture may keep
its own colour: `references/design.md`.

## Writing

British English, first person, `lang="en-GB"`, curly apostrophes as in the
data files. Every claim carries its scope in the next sentence. A number
without its source and scope does not ship. The board has no numbers today;
add none.

| do | don't |
|---|---|
| `A schematic of one wave, from woodblock print through RGB pixels to wireframe.` | `A stunning fusion of art and AI` |
| `A pixel drawing. Not a photograph, and not a result.` | `My dream setup` |
| `Quantum algorithms` (the Ryoushi subtitle, linked to it) | `Robot learning` (nothing in `src/data` says it) |
| `Vision, quantum & robotics`, robotics linking to Gemma-Le | a "robotics lane" - there is none |
| `where it started` (lowercase caption for a pointer) | `Check out my origin story!` |

Refuse, even when asked: "robot learning" unless `src/data` says so; hype
words (cutting-edge, passionate, state-of-the-art, revolutionary); vanity
metrics; emoji; any claim on the desk that the linked page does not already
make. If the owner wants a line the site does not support, put the support in
`src/data` first, or say so and stop.

Voices for the caption, scope line, note and bio, with the repo's real
examples: `references/voice.md`.

## Before you finish

Run in this order; each must pass.

1. `npm run lint`
2. `npm run build` (client, SSR, prerender, budget check). It must come before
   the tests: link-health reads `dist/`.
3. `npm test`
4. `npx playwright test` (at least `tests/browser/layout.spec.js` and
   `tests/browser/figures.spec.js`)
5. Look at the page. Screenshots at **1440x900** and **390x844**, in the light
   stock and the dark. Switch with Playwright's `emulateMedia({ colorScheme })`
   or the nav switch; the dark stock sets `data-theme="dark"`. Check: ruling
   visible, no overflow, tape clear of text, name on the first screen at
   390px, the pixel drawing in ink on both papers, no colour outside the
   plate and the portrait.

If you changed the pictures or the fence, also check 1440x800 and 899x900.

# Post-training sketch fingerprints

Three public sketches, all created 2026-08-23, user `kickingkeys`. Same pins (p5 2.2.0 + p5.brush 2.1.0-beta), same WEBGL 600 scaffold, different **jobs**. Copy the job. Do not copy the hibiscus unless the prompt is a hibiscus.

Editor JSON (needs a browser User-Agent): `https://editor.p5js.org/editor/kickingkeys/projects/<id>`

## Shared scars

- `async function setup()` + `function draw()` + `translate(-width/2, -height/2)` first in `draw()`.
- Comments: `unrolled` on motif/petal/glaze **calls**; `tiny + cheap — safe as a loop` on stipple/pollen/border dots.
- Helpers exist (`drawPetal`, `glazeFlower`, `motifAt`). Compositional units are invoked by repeating the call, not `for (i of n)`.
- Length: 3651 / 3718 / 4357 characters of `sketch.js`.

## 1. Herbarium plate — Example code 1

- URL: https://editor.p5js.org/kickingkeys/sketches/u3UerBiFY
- Job: tea-stained specimen sheet, not a logo flower.
- `noLoop()` at the **end of `draw()`**.
- Paper: `background("#f4e8c1")`.
- Grid: `2H` at weight 0.15, two `for` loops stepping 40px (this is the allowed grid loop).
- Stains: `noStroke`, `fillBleed(0.4, "out")`, `fillTexture(0.85, 0.9)`, five unrolled `circle`s, opacity 25–30.
- Ragged edges: `field("hand")`, four `rect(..., "center")` around the rim, then `noField()`.
- Specimen: olive stem + sepals as `beginShape` polylines; three half-open bud petals (dusty rose / terracotta / overlapping centre); **three fallen petals** near the bottom. Each petal is its own fill/hatch/`beginShape` block.
- Hatch: `hatchStyle("HB", "#2a2a2a", 0.4)` then `hatch(spacing, angle, { rand })` per mass.
- Annotation: `noFill` + `noHatch`, `2H` leader lines with 2px circles, scale bar as five `line`s. No `random()`.
- Brushes: `2H` / `HB` only.

If the prompt is "field note", "pressed plant", "museum plate", start here.

## 2. Ornamental tile — Hill feast

- URL: https://editor.p5js.org/kickingkeys/sketches/2EkeaajQA
- Job: 3×3 repeat, carpet / illumination, gold + teal + rose + crimson on `#fdf9f0`.
- `noLoop()` in `setup()`.
- Nine cells: nine `motifAt(startX + i * spacing, ...)` lines, comment `Grid Arrangement — 3×3, unrolled`.
- Motif: circular teal halo wash → five `drawPetal(0..4)` (here 72° **is** the point) → gold `HB` stamen line → 5-circle stipple loop (`tiny + cheap`).
- Petal: teardrop `beginShape(0.6)` in rose, crimson hatched inner shape, `pen` ink vein.
- Border: unrolled TL/TR/BL/BR corner ticks in `2B` gold; border dots in a cheap `for`.
- `push`/`pop`/`rotate` around each motif. `random()` only inside the stipple.

If the prompt is "repeat", "brocade", "tile", "illumination", start here. Do not use this polar rosette on a naturalistic plate.

## 3. Tropical glaze — Example 2

- URL: https://editor.p5js.org/kickingkeys/sketches/pxoWEbk9C
- Job: wet-on-wet night garden. `background("#051208")` in **setup**, then stacked glazes in `draw`.
- Layer list, all unrolled:
  1. four `bgGlaze` full-canvas `rect`s (opacity 180)
  2. twenty `bloom()` water drops
  3. ten `glow()` large low-opacity circles
  4. fourteen `glazeFlower` in hot pink / orange / indigo under `field("curved")`
  5. three `focalFlower` white-with-red-eye
  6. `noField()`
- Flower: five `petal(i)` calls (`i * 72 + random(-8, 8)`), red/dark eye `circle`, `flowLine` stamen, 6-dot pollen loop.
- `endShape(CLOSE)` here; the other two sketches use `endShape(true)`.
- Placement is `random(width/height)` — this recipe *wants* scatter. Herbarium does not.

If the prompt is "night", "wet", "tropical", "glaze", "underpainting", start here.

## What "worked after training" means

March write-up: the 9-signal reward collapsed to identical 5-petal clip-art; pairwise-vs-pool made code shorter and images more like the love-tier pool. August samples are **still hibiscus-centric** because the pool was. The grammar transferred; the subject prior did not fully. When you draw a new subject, steal grammar, fight the hibiscus prior.

---
name: paint-with-code
description: Write a complete p5.brush sketch in the post-training Qwen 3.5 35B paint-with-code grammar — WEBGL 600 canvas, observed allowlist, unrolled motif calls, herbarium / ornamental tile / tropical glaze recipes. Use when emitting p5.js + p5.brush, painting with code, generative watercolour, or botanical plates. Not for claiming Gyanateet trained this model.
---

# Paint with code (post-training Qwen grammar)

Load **before** writing any p5.brush sketch. Emit a complete `index.html` + `sketch.js`. Do not dump the p5.brush README. Do not invent methods.

This grammar is reverse-engineered from Surya Narreddi, Cameron Franz, and Alex Wang: the March 2026 write-up plus three p5 editor sketches created **2026-08-23**. You are copying how the **policy draws after training**, not Gyanateet's CV. Do not put hibiscus on `/work`. Do not replace the Kanagawa plate.

Signatures: [references/allowlist.md](references/allowlist.md). Recipes: [references/sketch-fingerprints.md](references/sketch-fingerprints.md). Grammar moved onto a new subject: [references/transfer-example.md](references/transfer-example.md). Reward-side method: skill `creative-rl-design`.

## HTML pins (MUST)

Match the August samples (cdnjs p5, jsDelivr brush), not a guessed dist path:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/2.2.0/p5.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/p5.brush@2.1.0-beta"></script>
```

p5.brush needs **WEBGL**. A 2D canvas will not paint.

## Scaffold (MUST)

All three post-training sketches share this shape. `noLoop()` may live in `setup()` (2/3) or at the end of `draw()` (herbarium). Prefer `setup()`.

```js
async function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3); // required for built-in brushes at 600px
  noLoop();
}

function draw() {
  translate(-width / 2, -height / 2); // WEBGL origin is centre
  background("#f4e8c1");              // paper; then paint with brush.*
  // ...
}
```

`background()` is used. Ground can also be stacked `brush.rect` glazes (tropical). Do not skip `scaleBrushes(3)`.

p5 state that the policy used freely: `push`, `pop`, `translate`, `rotate`, `random`, `color`, `lerpColor`, `width`, `height`.

## Allowlist (MUST)

Only these `brush.*` calls. August code is **larger than GEPA's eight-method prompt**; it is still a closed set. Full signatures in the allowlist file.

| Kind | Calls |
| --- | --- |
| Setup | `scaleBrushes`, `set`, `field`, `noField` |
| Stroke | `line`, `flowLine` |
| Fill | `fill`, `noFill`, `noStroke`, `fillBleed`, `fillTexture` |
| Hatch | `hatchStyle`, `hatch`, `noHatch` |
| Geometry | `circle`, `rect`, `beginShape`, `vertex`, `endShape` |

Brushes observed: `"2H"`, `"HB"`, `"2B"`, `"pen"`. Fields observed: `"hand"`, `"curved"`. Do not pick `"watercolor"`, `"rotring"`, `"waves"`, `"zigzag"` unless the human prompt names them — the trained samples did not.

**Forbidden:** `brush.pick`, `load`, `polygon`, `spline`, `arc`, `blob`, `petal`, `wash`, `mass`, `addField`, `wiggle`, extra CDNs. Those names are how pre-RL samples compiled to empty canvases.

## How the trained policy writes (MUST)

1. **Unroll compositional units.** Nine tiles are nine `motifAt(...)` lines. Five petals are `petal(0)` … `petal(4)`. Fourteen glazes are fourteen `glazeFlower(...)` calls. Comments say `unrolled`. A `for` over petals or cells is the clip-art attractor they RL'd away from.
2. **Helpers are fine.** `drawHibiscus`, `drawPetal`, `bgGlaze` exist. The scar is unrolled *calls*, not a ban on functions.
3. **`for` is only cheap dust.** Grid lines, border dots, pollen specks. Hill feast comments this: `tiny + cheap — safe as a loop`. Herbarium also uses `for` for the **ruled grid** (not for flowers).
4. **Fill opacity is 0–255.** `brush.fill("#c68e8c", 45)` is commented `~18%`. Never treat the second arg as 0–100.
5. **`brush.circle(x, y, radius, irregularity)`.** Third arg is **radius**, not diameter. Fourth is 0–1 wobble (or omit).
6. **Layer like a painter.** Paper → stains/glazes → large colour masses (`noStroke`, fill, bleed, texture, hatch) → structure lines (`set` a pencil) → tiny dark accents. `noFill()` + `noHatch()` before leader lines.
7. **Field is a material.** `"hand"` on torn parchment edges. `"curved"` on tropical wet masses. `noField()` on grids, scale bars, and corner ticks.
8. **Ragged, not polar clip-art.** Herbarium petals are jittered polylines; buds stay half-open; something has fallen. Five-petal × 72° is allowed on **ornamental tiles** (Hill feast) and tropical hibiscus, not on a naturalistic plate unless the prompt is a rosette.

## Pick a recipe, then change the subject

| Recipe | Job | Sample |
| --- | --- | --- |
| Herbarium plate | tea stain, grid, leader lines, scale bar, half-open + fallen forms | [Example code 1](https://editor.p5js.org/kickingkeys/sketches/u3UerBiFY) |
| Ornamental tile | 3×3 repeat, gold/teal/rose/crimson, unrolled cells, corner ticks | [Hill feast](https://editor.p5js.org/kickingkeys/sketches/2EkeaajQA) |
| Tropical glaze | `#051208` ground, unrolled blooms/glows/flowers, `field("curved")`, `flowLine` stamen | [Example 2](https://editor.p5js.org/kickingkeys/sketches/pxoWEbk9C) |

Steal the **job**, not the hibiscus. The pool was hibiscus-heavy; post-training samples still are. Fight that prior unless the prompt is a hibiscus.

## Length

Target **under ~2k tokens** of JS (samples are 3.6–4.4k characters). The trained policy compressed 13.5k → <2k tokens. If the file is a novel, you are in the old length-reward regime — cut.

## Done when

- Pins, WEBGL, `scaleBrushes(3)`, and the `draw()` translate match the scaffold.
- Every `brush.*` call is on the allowlist, with the signatures in the allowlist file.
- Motifs are unrolled calls; only dust/grid loops.
- One recipe's layering is visible, not a centred 5-petal icon on white.
- Subject matches the prompt.

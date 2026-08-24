# Observed p5.brush allowlist

Closed set from three post-training sketches created 2026-08-23 (`kickingkeys` on the p5 editor). Broader than GEPA's original "eight methods, no docs" **prompt** — that prompt is how they got compilation; this list is how the **August policy actually draws**. Do not paste the upstream README.

Third argument to `circle` is **radius**. Fill opacity is **0–255** (herbarium comments: `45` ≈ 18%).

## Signatures as used

```js
brush.scaleBrushes(3);                      // setup, 600px canvas

brush.set("2H", "#7a7465", 0.15);           // brushName, hex, weight
brush.field("hand");                        // "hand" | "curved"
brush.noField();

brush.line(x1, y1, x2, y2);
brush.flowLine(x, y, length, angleDeg);     // tropical stamens only
brush.circle(x, y, radius);                 // or (x, y, radius, irregularity 0–1)
brush.rect(x, y, w, h);                     // or (x, y, w, h, "center")

brush.fill("#c68e8c", 45);                  // hex | p5.Color, opacity 0–255
brush.noFill();
brush.noStroke();
brush.fillBleed(0.4, "out");                // strength 0–1; optional "out"|"in"
brush.fillBleed(0.05);                      // strength only is valid
brush.fillTexture(0.85, 0.9);               // texture 0–1, border 0–1

brush.hatchStyle("HB", "#2a2a2a", 0.4);     // brushName, color, weight — NOT "line"
brush.hatch(6, 45, { rand: 0.1 });          // spacing, angleDeg, { rand }
brush.noHatch();

brush.beginShape(0.4);                      // curvature 0–1
brush.vertex(x, y);
brush.endShape(true);                       // close; CLOSE also appears and is truthy
```

## Brushes observed

| Name | Used for |
| --- | --- |
| `2H` | pale grid, leader lines, light structure |
| `HB` | stems, veins, hatch style, herbarium outlines |
| `2B` | gold ornamental border |
| `pen` | fine ink veins, stamens, pollen |

## Fields observed

| Name | Used for |
| --- | --- |
| `hand` | torn parchment edge (then `noField()`) |
| `curved` | tropical wet petal masses (then `noField()`) |

Do not activate `waves`, `zigzag`, `seabed`, `spiral`, `columns` unless the human prompt names a field. The trained samples did not.

## Fill pairing (the usual stack)

```
noStroke
fill(hex, 0–255)
fillBleed(0–1, "out"|"in")     // optional
fillTexture(0–1, 0–1)          // optional
hatchStyle + hatch             // optional; herbarium/tile
circle | rect | beginShape…endShape
noHatch / noFill               // before hairline work
set(pencil) + line
```

## Do not call

Anything not listed. Especially botanical-sounding ghosts (`petal`, `blob`, `watercolour`) and API-dump leftovers (`pick`, `load`, `polygon`, `spline`, `arc`, `wash`, `mass`, `addField`, `wiggle`). Those are how pre-RL samples compiled to empty canvases.

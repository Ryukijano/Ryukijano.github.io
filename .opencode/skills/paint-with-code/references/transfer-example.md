# Transfer example (oak leaf on a plate)

Original teaching sketch. Same grammar as Example code 1, **different subject**. Use this as the pattern when the prompt is not a hibiscus: keep scaffold, allowlist, unroll, layering; change the masses.

Not a sample from the trained policy. Do not ship this on Gyanateet's `/work`.

```js
async function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  brush.scaleBrushes(3);
  noLoop();
}

function draw() {
  translate(-width / 2, -height / 2);
  background("#f4e8c1");

  brush.set("2H", "#7a7465", 0.15);
  for (let x = 40; x <= 560; x += 40) brush.line(x, 40, x, 560);
  for (let y = 40; y <= 560; y += 40) brush.line(40, y, 560, y);

  brush.noStroke();
  brush.fillBleed(0.4, "out");
  brush.fillTexture(0.85, 0.9);
  brush.fill("#9b7b5a", 30);
  brush.circle(120, 140, 70, 0.2);
  brush.circle(470, 430, 90, 0.3);
  brush.circle(400, 100, 40, 0.15);

  brush.fill("#4a3520", 40);
  brush.fillBleed(0.5, "in");
  brush.field("hand");
  brush.rect(300, 8, 600, 16, "center");
  brush.rect(300, 592, 600, 16, "center");
  brush.rect(8, 300, 16, 600, "center");
  brush.rect(592, 300, 16, 600, "center");
  brush.noField();

  brush.hatchStyle("HB", "#2a2a2a", 0.4);
  brush.set("HB", "#333333", 0.4);

  // Petiole — unrolled mass, not a leaf() loop
  brush.fill("#6b705c", 50);
  brush.fillBleed(0.2, "out");
  brush.hatch(6, 45, { rand: 0.1 });
  brush.beginShape(0.1);
  brush.vertex(298, 430);
  brush.vertex(304, 430);
  brush.vertex(308, 520);
  brush.vertex(294, 520);
  brush.endShape(true);

  // Blade (one lobe group)
  brush.fill("#5c6b4a", 55);
  brush.hatch(5, -20, { rand: 0.15 });
  brush.beginShape(0.35);
  brush.vertex(300, 420);
  brush.vertex(210, 360);
  brush.vertex(180, 250);
  brush.vertex(240, 160);
  brush.vertex(300, 200);
  brush.vertex(360, 160);
  brush.vertex(420, 250);
  brush.vertex(390, 360);
  brush.endShape(true);

  // Fallen fragment
  brush.fill("#7a5a3a", 40);
  brush.hatch(4, 30, { rand: 0.2 });
  brush.beginShape(0.5);
  brush.vertex(150, 500);
  brush.vertex(190, 470);
  brush.vertex(230, 510);
  brush.vertex(180, 540);
  brush.endShape(true);

  brush.noFill();
  brush.noHatch();
  brush.set("2H", "#2a2a2a", 0.35);
  brush.line(240, 170, 90, 90);
  brush.circle(90, 90, 2);
  brush.line(90, 90, 55, 90);
  brush.line(60, 540, 160, 540);
  brush.line(60, 535, 60, 545);
  brush.line(160, 535, 160, 545);
}
```

Done when a reader can name the plant without the filename, and the sheet still reads as a plate (grid, stain, leader, bar) rather than a centred icon.

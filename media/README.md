# media/

Source images from earlier versions of the site, kept out of `public/` unless
they appear in a project case study.

Anything in `public/` is copied verbatim into `dist/` and deployed, so an
unreferenced file there is bytes every visitor's CDN edge carries for nothing —
this directory was 94% of a 59 MB deploy. These files are still tracked, so
they remain available as case-study figures (see the `figure:` field in
`src/data/portfolio.js`); they just are not shipped until something references
them.

**To use one:** re-encode it first. `doom_ppo.gif` is 7.8 MB and
`ant_bullet.gif` is 7.4 MB — a multi-megabyte GIF on a case study would undo
the restraint the rest of the site is built on. Palette-reduce, drop the
frame rate, and keep a still poster for `prefers-reduced-motion`, then put
the result in `public/assets/media/`.

`scripts/check-budget.mjs` fails the build if anything in `dist/` is
unreferenced, which is what keeps this boundary honest.

## Deployed demos

Most case studies include a looping GIF. The pothole preprint uses the paper’s
own figures (PNW dashcam samples, the ESRGAN–YOLOv7 pipeline, and LR vs SR
detections) instead of a schematic GIF. ESD and the ViZDoom rollout are
palette-reduced from the cropped captures. Each GIF keeps a WebP/AVIF poster
so reduced-motion visitors see a still.

## Figure format

`/work/deep-rl-and-hugging-face` is one example. The original `doom_ppo.gif`
was 7.8 MB; cropped, palette-reduced and still looping it is under 500 kB,
with a 50 kB AVIF poster so the box is filled when motion is off.

```js
figure: {
  kind: 'image',
  src: '/assets/media/doom-ppo.gif',
  poster: '/assets/media/doom-ppo-poster.avif',   // required for looping GIFs
  width: 240,
  height: 180,                                    // both required: no layout shift
  alt: 'A PPO agent playing Doom: …',
  caption: 'The PPO agent in ViZDoom, eight seconds of one rollout.',
  scope: 'One recorded rollout from a course exercise in ViZDoom.',
}
```

`scope` is not optional, and the tests enforce it. A figure that oversells is
worse than no figure, which is the same stance every project's `Scope:` clause
takes.

A typical encode from a short capture:

```sh
ffmpeg -i in.mp4 -vf "fps=8,scale=640:-1:flags=lanczos,split[s0][s1];\
[s0]palettegen=max_colors=64:stats_mode=diff[p];\
[s1][p]paletteuse=dither=bayer:bayer_scale=5" -loop 0 out.gif
gifsicle -O3 --lossy=40 -o out.gif out.gif
```

Cut the poster from the frame that carries the figure's information. For an
animation that builds up, that is usually the last frame, never an empty
first one: the poster is the whole figure for anyone with motion turned off.
Before shipping a generated loop, look at every frame. Check that the caption
and alt text describe what is actually drawn, and cut camera jumps and
out-of-place objects rather than captioning around them.

## Computed figures

Four figures are computed for the page rather than drawn, so their scope
lines can say exactly what they show. The notes below record how each one was
made. The Ant and the pothole blink are cut from real material.

- **Hopfield tour** (`hopfield-method.gif`). The eleven dots are the original
  illustration's first frame. The tour is a best-improvement 2-opt run (seed
  2792) from a tangle with 32 crossings, taking 7 swaps to the optimum.
  Held–Karp confirms the optimum at 937.8 px.
- **Burgers** (`burgers-shock.gif`, Physics-Informed NN). Exact solution by
  Cole–Hopf with 200-point Gauss–Hermite quadrature, 44 time slices on 481
  points. Peak |u| is 1.0, and the slope at x = 0 already reaches 38 by t ≈
  0.33, just after theory puts the shock, at 1/π ≈ 0.32.
- **LABS** (`labs-barker.gif`, iQuHACK 2026). Tabu search, tenure 6, seed
  2781. Energy goes 302 → 118 → 54 → 30, wanders, then lands on 6 at step 26.
  The final sequence `+++++--++-+-+` has sidelobes 0, 1, 0, 1, … and merit
  factor 14.08.
- **Surface code** (`surface-code-decode.gif`, Quantum Error Correction).
  Distance-5 rotated code, 12 Z checks. Errors on data qubits (1,4), (3,3) and
  (3,4) light 4 checks. The weight-3 matching flips (1,4), (2,3) and (2,4).
  The errors and the correction together are the X plaquette at (2,3), so
  there is no logical error.
- **Ant** (`ant-pybullet.gif`, Deep RL, a capture).
  `media/assets/images/ant_bullet.gif`, cropped past the pillarbox and the
  horizon, first 5 s at 8 fps, 24 flat colours. The source capture is already
  speckled.
- **Pothole** (`pothole-blink.gif`, from the paper). The six panels of Figure
  4 were located from the white gutters. Each ESRGAN panel is drawn into its
  low-res twin's box, so only the boxes move.

The drawn figures use paper, `--color-ink`, `--color-ink-muted` and
`--color-seal` only, with IBM Plex Mono labels, 12 fps, no dithering, a held
final frame, and a paper wipe back to the start.

`assets/media/pinn-method.gif` and `assets/media/syndrome-net-decode.gif`
(with their posters) are the figures that Burgers and the surface code
replaced. They are kept as sources, not shipped.

## What is NOT usable here

Worth knowing before reaching for something:

- `*-demo.png` (gemma-groot, pothole-detection, quantum-variational,
  robotics-manipulation, lora-dreambooth) are **generated placeholder cards** —
  a flat colour with the project name set in bold sans. Not screenshots.
- `neural-network-architecture.png` and `reinforcement-learning-diagram.png`
  are generic textbook illustrations, not work from these projects.
- `diffusion.png` and `nightcity.jpg` are real generated images but their
  provenance is ambiguous — they could belong to the JAX Diffusers sprint or
  the LoRA/DreamBooth work. Attributing them is an editorial call.
- `ant_bullet.gif` is a genuine PyBullet Ant rollout. It now ships, cropped
  and re-encoded, as `ant-pybullet.gif`, the Deep RL case study's second
  figure.

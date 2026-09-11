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
the restraint the rest of the site is built on. Convert to a muted, looping,
`playsinline` `<video>` (WebM + H.264 is typically 5–15× smaller) or pull a
single representative frame, then put the result in
`public/assets/images/`.

`scripts/check-budget.mjs` fails the build if anything in `dist/` is
unreferenced, which is what keeps this boundary honest.

## Deployed demos

Ten case studies currently include figures. Nine animations restored from
the earlier field-note design were converted from GIF to H.264 MP4 with WebP
posters: H-cGQE, Dalton Mills, surgical phase recognition, FET-VAE, Gemma-Le,
pothole detection, NQCC, YQuantum, and quantum error correction. The Deep RL
page uses the separately encoded ViZDoom rollout.

## Figure format

`/work/deep-rl-and-hugging-face` is one example. `doom_ppo.gif` was
7.8 MB; cropped to its actual content, trimmed to eight seconds, denoised and
encoded as H.264 it is **489 kB** — 6% of the GIF — with a 50 kB AVIF poster so
the box is filled before the video decodes.

```js
figure: {
  kind: 'video',                                  // or 'image'
  src: '/assets/media/doom-ppo.mp4',
  poster: '/assets/media/doom-ppo-poster.avif',   // required for video
  width: 320,
  height: 240,                                    // both required: no layout shift
  alt: 'A PPO agent playing Doom: …',
  caption: 'The PPO agent in ViZDoom, eight seconds of one rollout.',
  limit: 'A course-unit agent in a scripted scenario, not a benchmark result.',
}
```

`limit` is not optional, and the tests enforce it. A figure that oversells is
worse than no figure, which is the same stance every project's `Limit:` clause
takes.

The ffmpeg used:

```sh
ffmpeg -t 8 -i in.gif -vf "crop=W:H:X:Y,fps=20,hqdn3d=3:3:6:6" \
  -c:v libx264 -crf 28 -preset slow -an -pix_fmt yuv420p -movflags +faststart out.mp4
```

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
- `ant_bullet.gif` is a genuine PyBullet Ant rollout, and would suit the same
  Deep RL case study as a second figure.

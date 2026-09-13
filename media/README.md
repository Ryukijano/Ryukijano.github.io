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

Ten case studies include looping GIFs. Eight schematic loops come from the
earlier field-note design. ESD and the ViZDoom rollout are palette-reduced
from the cropped captures (the raw ESD GIF is 8 MB at 3223×2424). Each GIF
keeps a WebP/AVIF poster so reduced-motion visitors see a still.

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

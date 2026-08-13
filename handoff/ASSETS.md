# Asset Inventory

## Public Media

- `public/assets/images/profile-avatar.png`: profile/avatar imagery.
- `public/assets/images/hero-wave.jpg`: hero/background media.
- `public/assets/images/nightcity.jpg`: Ryoushi banner background.
- `public/assets/images/doom_ppo.gif`, `ant_bullet.gif`: reinforcement-learning demos.
- `public/assets/images/gemma-groot-demo.png`, `gemma-groot-model-card.png`: VLA project media.
- `public/assets/images/computer_vision.jpg`, `computer-vision-pipeline.png`: computer-vision media.
- `public/assets/images/diffusion.png`, `diffusion-models-diagram.png`: diffusion/ControlNet media.
- `public/assets/images/quantum-*.png`, `quantum-icon.svg`: quantum persona media.
- `public/assets/images/*-diagram.png`, `*-architecture.png`, and `*-demo.png`: project diagrams and demos.

The complete inventory is discoverable with:

```bash
rg --files public/assets public/resumes
```

## URL Rules

Files under `public/` are served from the site root. In React data, reference them as `/assets/images/<filename>` or `/resumes/<filename>`, not as `public/...` or relative filesystem paths.

## Reference Material

The branch contains the source media used by the current implementation. No separate GIF bundle, tarball, or external handoff archive is required to reproduce the current branch. Add future design references under `docs/assets/` or `public/reference/` with a short provenance note before using them in production UI.


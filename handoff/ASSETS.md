# Asset Inventory

## Active Media

- `public/assets/gifs/`: case-study demos including surgical, quantum, robotics, RL, reconstruction, and pipeline GIFs.
- `public/assets/images/esd-comparison.gif`: Surgical Phase Detection comparison animation.
- `public/assets/images/*-poster.png`: static posters for GIF-backed case studies.
- `public/assets/images/profile-avatar.png`: profile imagery.
- `public/assets/images/hero-wave.jpg`: hero/background media.
- `public/assets/images/nightcity.jpg`: Ryoushi visual identity.
- `public/assets/images/quantum-*.png`, `quantum-icon.svg`: quantum persona media.
- `public/resumes/`: resume PDF variants referenced by the existing portfolio content.

The full inventory can be inspected with:

```bash
rg --files public/assets public/resumes
```

## URL Rules

Files under `public/` are served from the site root. In React content, reference them as `/assets/...` or `/resumes/...`, not as `public/...` or filesystem-relative paths.

## Reference Material

The source branch contains the staged rebuild bundle's media, including 22 tracked GIFs and the additional case-study posters. The old `legacy/` asset copies were removed from the active tree because the rebuild verified that the relevant files were duplicated under `public/`; the deletions remain in Git history.

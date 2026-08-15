# Downstream Handoff

This directory is the entry point for another agent continuing the complete routed portfolio rebuild.

## Provenance

- Repository: `Ryukijano/Ryukijano.github.io`
- Destination branch: `feat/portfolio-rebuild`
- Imported canonical source: `feat/site-rebuild` at `2731ce9`
- Default branch: `main`
- Deployment workflow: `.github/workflows/deploy.yml`

The canonical staged rebuild was imported from the verified bundle at `H:\Website revamp with personas\site-rebuild\ryukijano-site.bundle`. The destination branch now contains the routed React implementation, case-study media, Material 3 files, integrity checks, and the existing handoff documentation.

## Read First

1. [ARCHITECTURE.md](ARCHITECTURE.md) for routes, content, and shared components.
2. [ASSETS.md](ASSETS.md) for media paths and case-study GIFs.
3. [VALIDATION.md](VALIDATION.md) for the full verification suite and known gaps.
4. [../plan.md](../plan.md) for remaining product and engineering work.

## Working Rules

- Keep factual project copy aligned with `src/content/` and the checks in `fact-check.jsx`.
- Use shared M3 components and tokens rather than introducing raw colours or one-off visual primitives.
- Reference public media as `/assets/...` or `/resumes/...`, never as filesystem paths.
- Keep the eleven case-study routes rendering and preserve disclosure words such as `schematic`, `illustrative`, and `tbc`.
- Run `npm run lint`, `npm run build`, `npm run smoke`, `npm run facts`, and `npm run tokens` before pushing.

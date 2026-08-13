# Portfolio Rebuild Plan

## Current State

- [x] React + Vite rebuild is present on `feat/portfolio-rebuild`.
- [x] Three persona panes are implemented in `src/App.jsx`.
- [x] Expanded persona views and project cards are implemented.
- [x] Canvas/CSS background effects are included in the source tree.
- [x] Project media, diagrams, profile media, and resume PDFs are committed.
- [x] GitHub Pages fallback generation is implemented in `scripts/copy-404.cjs`.
- [x] Downstream handoff documentation is present under `handoff/`.

## Next Engineering Tasks

- [ ] Decide which resume PDF is the canonical public download and remove or relabel unused variants.
- [ ] Replace placeholder `#` project links with authoritative URLs or remove the links.
- [ ] Replace the default Vite favicon with a portfolio-specific icon.
- [ ] Verify all external claims, project metrics, and publication links before public launch.
- [ ] Decide whether the Pages workflow should deploy from `main` only or from the feature branch during preview work.
- [ ] Run a responsive browser pass at mobile, tablet, and desktop breakpoints after content changes.

## Release Gate

Run `npm ci`, `npm run lint`, and `npm run build`. Inspect `dist/404.html`, test direct navigation to an expanded persona route if routing is added, and confirm every public asset resolves under the configured Vite base path.

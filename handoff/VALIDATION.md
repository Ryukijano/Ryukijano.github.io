# Validation and Known Gaps

## Local Validation

From the repository root:

```bash
npm ci
npm run lint
npm run build
```

Expected build output includes both `dist/index.html` and `dist/404.html`. The latter is created by `scripts/copy-404.cjs` for GitHub Pages fallback behavior.

For visual checks, run `npm run dev` and inspect the landing page at narrow mobile, tablet, and desktop widths. Check pane expansion, hash navigation, project links, resume links, lazy-loaded media, the SoundCloud overlay, and reduced-motion behavior where relevant.

## Known Gaps

- The root package name is still `temp-project` and should be given a project-specific name if package metadata is used publicly.
- `index.html` still uses the default `/vite.svg` favicon.
- Some project entries intentionally use `#` as a placeholder link; these should be resolved before release.
- Multiple resume PDFs are present; the canonical public resume has not been selected.
- The GitHub Pages workflow deploys only from `main`, while this handoff is on `feat/portfolio-rebuild`.
- Content, claims, and external links in `src/App.jsx` should receive a final factual review.

## Risk Notes

Canvas animations run continuously and should be checked on low-power mobile devices. External embeds and links can fail independently of the build. Public asset filenames contain mixed naming conventions, so rename them only with a coordinated update to every reference in `src/App.jsx` and any legacy pages.


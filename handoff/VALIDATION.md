# Validation and Known Gaps

## Local Validation

From the repository root:

```bash
npm ci
npm run lint
npm run build
npm run smoke
npm run facts
npm run tokens
```

The build must produce `dist/index.html` and the GitHub Pages fallback `dist/404.html`. `smoke` server-renders the routes. `facts` checks figures, disclosure vocabulary, banned template leaks, and raw colours. `tokens` regenerates the Material 3 token layer and enforces WCAG AA contrast checks.

For visual checks, run `npm run dev` and inspect `/`, `/academic`, `/work`, `/trust`, and representative `/work/:slug` routes at mobile, tablet, and desktop widths. Check keyboard navigation, deep links, reduced motion, case-study media, and the interactive quantum content.

## Known Gaps

- Dedicated `/persona/ryukijano`, `/persona/gyanateet`, and `/persona/ryoushi` routes are still planned; persona links currently need careful review so they do not fall through to `/work`.
- The homepage triptych needs a real narrow-screen breakpoint; the current fixed horizontal composition does not fully stack on small viewports.
- Decorative canvas effects should be reduced or disabled on small screens and under `prefers-reduced-motion`.
- Some public assets remain duplicated at the root and under `public/assets/images/`; remove duplicates only after checking for external hotlinks.
- The deployment workflow triggers only from `main`.
- Resume choice, external links, and all public claims require a final factual review before release.

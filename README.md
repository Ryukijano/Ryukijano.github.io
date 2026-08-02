# ryukijano.github.io

Portfolio of Gyanateet Dutta — graphics and systems, surgical vision, quantum algorithms.

Live at **https://ryukijano.github.io**

## Stack

- React 19 + Vite 7
- Tailwind 4 (via `@tailwindcss/vite`, no PostCSS config needed)
- framer-motion, lucide-react, three

## Running it

```bash
npm install
npm run dev        # local dev server
npm run build      # production build into dist/
npm run preview    # serve the built output
npm run lint
```

## Deploying

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes `dist/` to GitHub Pages. No manual step.

`vite.config.js` sets `base: '/'`, correct for a user site served from the
domain root. A project site would need `base: '/<repo-name>/'`.

## Layout

```
src/
  App.jsx                 all content + components (see note below)
  main.jsx
  index.css
  components/
    SpaceBackground.jsx
public/
  assets/                 images and gifs
legacy/                   the previous static site, kept for reference only
resume/
```

`App.jsx` currently holds both the `DATA` content object and every component.
It is large. Splitting content into `src/content/` and the shared pieces into
`src/components/` is the obvious next step, and a prerequisite for per-project
routes.

## Known gaps

- **No routing.** The site is one screen and nothing has its own URL, so no
  individual project can be linked, shared, or indexed. Adding
  `react-router-dom` needs a `404.html` mirroring `index.html`, because GitHub
  Pages has no server-side rewrite.
- **Content is gated behind hover.** On desktop, a visitor who does not hover a
  pane sees three names and nothing else.
- **The left pane is coded cream and renders black.** `baseColor` is
  `bg-[#E6E1D3]` with indigo text, but its gradient only reaches solid cream
  50% down a page that never scrolls, so that half never appears.

## Facts worth not breaking

Numbers here are traceable to a source. Check before editing them.

- Pothole detection: precision 0.947, recall 0.826 — Table 3 of
  [arXiv:2401.08588](https://arxiv.org/abs/2401.08588), YOLOv7-tiny-multi +
  ESRGAN on the PNW dataset. Not the own-dataset figures in Table 2.
- Surgical phase recognition: 90.0% porcine, 89.5% human, 25 ms on an NVIDIA A2.
- ORCID is `0009-0008-0480-9241`. A DBLP author page under a similar name
  belongs to someone else and is deliberately not linked.

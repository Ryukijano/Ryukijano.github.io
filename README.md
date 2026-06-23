# ryukijano.github.io

Personal portfolio of **Gyanateet Dutta** (`Ryukijano`) — researcher & engineer working across quantum computing, machine learning, computer vision, and robotics.

Live: https://ryukijano.github.io/

## Design language — "Wave · Field · Lattice"

The site is a three-persona triptych, unified by one design system in three keys:

| Persona | Domain | Motif | Type voice | Accent |
|---|---|---|---|---|
| `Ryukijano` | Graphics / GPU | Wave (ukiyo-e fluid) | Serif (Newsreader) | Indigo on washi |
| `Gyanateet` | AI research | Field (embedding particles) | Grotesk (Inter Tight) | Indigo / violet |
| `Ryoushi` | Quantum (量子) | Lattice (perspective grid) | Mono (JetBrains Mono) | Magenta + cyan |

Design tokens (type voices, brand colors, motion) live in `src/index.css` under `@theme`.

## Tech stack

- **React 19** + **Vite 7**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Framer Motion** for animation
- **Three.js** (optional `SpaceBackground` component)
- **Lucide** icons

## Project structure

```
index.html              # SEO meta, OG/Twitter cards, JSON-LD Person schema, fonts
src/
  main.jsx              # entry
  App.jsx               # all UI: content data, panes, expanded view, canvas backgrounds
  index.css             # design tokens + utilities + reduced-motion guard
  components/
    SpaceBackground.jsx # optional Three.js background
public/
  favicon.svg           # Wave·Field·Lattice brand mark
  robots.txt, sitemap.xml
  resume/               # CV (served by Vite)
  assets/images/        # project + hero media
```

## Commands

```bash
npm install      # install dependencies
npm run dev      # start dev server (http://localhost:5173)
npm run build    # production build to dist/
npm run preview  # preview the production build
npm run lint     # eslint
```

## Deployment

Pushes to `main` build and deploy to GitHub Pages via `.github/workflows/deploy.yml`.
Static assets must live in `public/` to be shipped by the Vite build.

## Accessibility & performance

- All canvas/CSS animations respect `prefers-reduced-motion`.
- Project media is lazy-loaded; heavy media is deferred to hover/expanded views.

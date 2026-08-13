# ryukijano.github.io

Portfolio of Gyanateet Dutta: graphics and systems, surgical vision, and quantum algorithms.

Live at **https://ryukijano.github.io**

## Stack

- React 19 + Vite 7
- React Router 7 for routed pages
- Material 3 Expressive token and component layer
- `framer-motion`, `lucide-react`, and `three`

## Running It

```bash
npm ci
npm run dev
npm run build
npm run preview
```

Additional verification commands:

```bash
npm run lint
npm run smoke
npm run facts
npm run tokens
```

## Routes

- `/`: portfolio introduction and persona entry point
- `/academic`: academic profile and selected work
- `/work`: project index
- `/work/:slug`: individual case studies
- `/trust`: evidence and provenance index for project claims

GitHub Pages has no server-side rewrite. The Vite build therefore produces a compatible `dist/404.html` fallback for deep links.

## Repository Layout

```text
src/routes.jsx                  Browser routing
src/pages/                      Intro, academic, work, trust, and case-study pages
src/content/                    Structured page and case-study content
src/components/                 Shared layout, media, tables, circuit, and M3 primitives
src/styles/                     Material 3 token and component styles
public/assets/gifs/             Case-study GIFs and technical demos
public/assets/images/           Project images, diagrams, and posters
public/resumes/                 Resume PDF variants
fact-check.jsx                  Content integrity checks
ssr-smoke.jsx                   Route render checks
tools/                          M3 token generation and verification helpers
legacy/                         Removed from the active build; retained in Git history
handoff/                        Downstream architecture, asset, and validation notes
```

## Facts Worth Protecting

- Pothole detection: precision `0.947`, recall `0.826`, from Table 3 of [arXiv:2401.08588](https://arxiv.org/abs/2401.08588).
- Surgical phase recognition: `90.0%` porcine accuracy, `89.5%` human accuracy, and `25 ms` inference on an NVIDIA A2.
- ORCID: `0009-0008-0480-9241`.
- The DBLP page previously linked in the legacy site belongs to another author and is deliberately not used.

## Branch and Handoff

This complete rebuild is published on `feat/portfolio-rebuild`. It combines the staged `feat/site-rebuild` implementation with the existing handoff documentation under `handoff/`. The deployment workflow still triggers from `main`; merge this branch into `main` when it is ready to publish.

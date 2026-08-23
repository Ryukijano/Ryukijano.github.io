# ryukijano.github.io

Portfolio of Gyanateet Dutta: graphics and systems, surgical vision, and quantum algorithms.

Live at **https://ryukijano.github.io**

This mix keeps the rebuild house — the dusk triptych, long-form case studies with GIFs, and the `/trust` evidence index — and sets it in civic chrome: a hairline site nav, a dated work table, a Distill-style academic page, and dedicated persona rooms.

## Stack

- React 19 + Vite 7
- React Router 7 for routed pages
- Material 3 Expressive token and component layer
- Source Serif 4 (brand), IBM Plex Sans (plain), IBM Plex Mono (figures and labels)

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
npm run notes
npm run voice
npm run smoke
npm run facts
npm run tokens
```

## Routes

- `/`: triptych introduction and persona entry
- `/academic`: Distill-style academic profile
- `/work`: dated project table
- `/work/:slug`: individual long-form case studies
- `/blog`: field notes on how the learning areas work
- `/blog/:slug`: individual notes (pretraining, SSL, video, post-training, diffusion, QEC, search)
- `/trust`: evidence and provenance index for project claims
- `/persona/ryukijano`, `/persona/gyanateet`, `/persona/ryoushi`: persona rooms
- unknown paths: a real 404 page (not a silent redirect to `/`)

GitHub Pages has no server-side rewrite. The Vite build still copies `dist/index.html` to `dist/404.html` so deep links boot the app; the router then renders the 404 page when the path is unknown.

## Repository Layout

```text
src/routes.jsx                  Browser routing
src/pages/                      Intro, academic, work, notes, trust, persona rooms, 404, and case-study pages
src/content/                    Structured page, blog, and case-study content
src/components/                 Shared layout, media, tables, circuit, and M3 primitives
src/styles/                     Material 3 token and component styles
public/assets/gifs/             Case-study GIFs and technical demos
public/assets/images/           Project images, diagrams, and posters
public/resumes/                 Resume PDF variants
fact-check.jsx                  Content integrity checks
ssr-smoke.jsx                   Route render checks
tools/                          M3 token generation and verification helpers
src/legacy/                     Removed from the active build; retained in Git history
handoff/                        Downstream architecture, asset, and validation notes
```

## Facts Worth Protecting

- Degree: MSc Advanced Computer Science (Artificial Intelligence), University of Leeds, 2023–2024.
- Role: research technician at Leeds from November 2025; AIMS intern (AI in Medicine and Surgery), March–November 2025.
- ISBI 2026 surgical phase recognition: DOI [10.1109/isbi61048.2026.11515812](https://doi.org/10.1109/isbi61048.2026.11515812). The paper reports 89.5% patient and 90.0% porcine accuracy; that is not a clinical deployment. Code: [DINOEndo](https://github.com/Ryukijano/DINOEndo).
- Pothole detection: co-author of [arXiv:2401.08588](https://arxiv.org/abs/2401.08588), not a sole-author paper.
- YQuantum 2025: Quantum Rings virtual track, not the Yale Grand Prize.
- NQCC UK Quantum Hackathon: participant (Team 15, Rolls-Royce challenge), not a placed winner.
- ORCID: `0009-0008-0480-9241`.
- Do not use DBLP `pid/345/4093`; that record belongs to another author.
- Do not list the MSc thesis as a publication; there is no White Rose eTheses record.

## Branch and Handoff

The mix lives on `cursor/mixed-rebuild-a347`. GitHub Pages still deploys from `main`.

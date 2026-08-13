# Ryukijano Portfolio

Personal portfolio for Gyanateet Dutta, presented as three connected personas:

- **Ryukijano**: graphics and systems engineering, GPU computing, and real-time 3D.
- **Gyanateet**: AI research, computer vision, self-supervised learning, and medical imaging.
- **Ryoushi**: quantum algorithms, quantum machine learning, and the Quantum Buddies collective.

The current implementation is a React 19 + Vite single-page application. The landing view uses three responsive persona panes. Each pane can expand into a project-focused view with persona-specific typography, colors, motion, and canvas/CSS backgrounds.

## Development

Requirements: Node.js 20 or newer and npm.

```bash
npm ci
npm run dev
```

The production checks are:

```bash
npm run lint
npm run build
```

`npm run build` generates `dist/` and copies `dist/index.html` to `dist/404.html` for GitHub Pages history-fallback navigation.

## Repository Layout

```text
src/App.jsx                  Main application, persona data, panes, and expanded views
src/index.css                Tailwind entry point and global styles
src/components/              Reusable visual background components
public/assets/images/        Project, profile, diagram, and background media
public/resumes/              Resume PDF variants linked by the application
scripts/copy-404.cjs         GitHub Pages fallback generation
.github/workflows/deploy.yml GitHub Pages deployment workflow
legacy/                      Previous static portfolio implementation
handoff/                     Downstream-agent context and validation notes
```

## GitHub

Repository: <https://github.com/Ryukijano/Ryukijano.github.io>

The handoff work is based on `feat/portfolio-rebuild`. The default deployment workflow currently triggers on pushes to `main`; merge or cherry-pick the branch before expecting a Pages deployment from this work.

## Handoff

Start with [handoff/README.md](handoff/README.md). It records the verified architecture, asset locations, known gaps, and the commands needed to validate a future change. The source branch already contains the rebuilt React implementation and its referenced assets; no external Claude bundle or separate source archive is required for the current branch.

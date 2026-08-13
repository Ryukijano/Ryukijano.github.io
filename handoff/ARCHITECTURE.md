# Architecture

## Runtime

The application is a React 19 + Vite 7 single-page application with browser routing. `src/main.jsx` mounts `src/routes.jsx`, which owns the route table and redirects unknown paths to `/`.

## Routes

- `/`: introduction and persona entry point
- `/academic`: academic profile and selected work
- `/work`: discipline-oriented project index
- `/work/:slug`: eleven individual case studies
- `/trust`: evidence/provenance index that re-sorts the same projects by how much of each claim is recorded versus inferred

## Source Organization

- `src/content/`: structured intro, academic, work, links, trust, and case-study data.
- `src/pages/`: route-level page shells and the case-study shell.
- `src/pages/studies/`: eleven case-study body components.
- `src/components/`: shared sections, media figures, data tables, pull quotes, reveal hooks, circuit lab, and M3 primitives.
- `src/styles/`: generated M3 tokens plus component and layering styles.
- `src/lib/qsim.js`: browser four-qubit simulator used by the interactive quantum material.
- `src/legacy/`: previous single-file implementation retained as reference but not imported by the active app.

## Design System

The active visual system combines warm paper and near-black neutrals with Material 3 Expressive primitives. Fraunces/serif display treatment, Inter-style body text, and JetBrains Mono metadata support the editorial/technical balance. Persona accents remain distinct, while `/trust` uses shared trust-band colours so evidence categories do not change meaning between personas.

## Navigation and Deployment

The app uses `BrowserRouter`. GitHub Pages has no server-side rewrite, so the Vite build creates a `404.html` fallback equivalent to the built entry page. The deployment workflow triggers on `main`; this complete work is currently on `feat/portfolio-rebuild` and must be merged before production deployment.

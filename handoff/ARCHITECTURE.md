# Architecture

## Runtime

The application is a Vite-powered React 19 SPA. `src/main.jsx` mounts `src/App.jsx` into `#root` and imports `src/index.css`, which contains the Tailwind CSS entry point and global styles.

## Application Model

`src/App.jsx` currently owns both content and presentation:

- `DATA` stores the three personas, social links, project descriptions, tags, icons, and media paths.
- `Portfolio` selects the initial persona from the URL hash and renders the three-pane landing view.
- `Pane` renders one persona's landing card and expansion control.
- `ExpandedSection` renders the full project view for a selected persona.
- `FluidWaves`, `EmbeddingSpace`, and `CyberGrid` provide persona-specific landing backgrounds.
- `ExpandedFluidWaves`, `ExpandedEmbeddingSpace`, and `ExpandedCyberGrid` provide expanded-view backgrounds.
- `src/components/SpaceBackground.jsx` contains the reusable ambient space background used by the current rebuild.

The project is intentionally data-driven inside a single component file at present. A future refactor can split persona data, pane components, expanded sections, and canvas backgrounds into separate modules, but should preserve the existing public asset paths and persona IDs: `ryukijano`, `ai`, and `ryoushi`.

## Navigation

The application uses the URL hash for persona selection and expanded state rather than a router. This keeps GitHub Pages hosting simple. If route-based navigation is introduced, retain `scripts/copy-404.cjs` or configure an equivalent Pages fallback.

## Deployment

The workflow installs with `npm ci`, runs `npm run build`, uploads `dist/`, and deploys with GitHub Pages. The workflow trigger is currently `main`; feature branches require merge or a deliberate workflow change before they deploy.


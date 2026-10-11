# ryukijano.github.io — agent guide

The personal site of Gyanateet Dutta. React 19, Vite 7, Tailwind 4, deployed
as a static GitHub Pages user site. Routing is hand-rolled
(`src/lib/navigation.js`) — there is no router dependency.

## Read these first

| file | what it is |
|---|---|
| `DESIGN.md` | the decision log: palette, measured contrast, type, where the accent may appear, why there is no dark mode |
| `.opencode/skills/paper-ink/SKILL.md` | the working rules for building a page in this system |
| `.opencode/skills/paper-ink/references/route-shapes.md` | markup and rules for the notes, workbench, collection and ledger shapes |
| `src/index.css` | the entire design system, one file |

`DESIGN.md` records **why** each number is what it is, and
`tests/tokens.test.js` asserts several of those decisions. If a test goes red,
`DESIGN.md` says whether the decision was deliberate. Never tune a value to
make a test pass.

## The short version

The site is a print on washi paper. Reflected light, never emitted. Eight ink
tokens, one accent, everything square, grain under the text rather than over
it, no dark mode. Three families: Source Serif 4 for anything readable, IBM
Plex Sans for interface chrome at weight 400 only, IBM Plex Mono for tracked
uppercase labels and figures.

Every claim carries its scope in the next sentence. Every project, note and
figure states what its result rests on. That restraint is the personality.

## Layout

```
src/
  data/          portfolio.js, publications.js, plate.js — all the content
  content/       long-form notes and case studies
  lib/           navigation, usePath, Link, routeMeta
  pages/         Home, Work, CaseStudy, Persona, Academic, Notes, Tools, …
  components/    SiteNav, KanagawaPlate, Atmosphere
  index.css      the whole design system, one file
scripts/
  prerender.mjs      renders every route to a real HTML file
  check-budget.mjs   fails the build on bloat or unreferenced assets
media/         source images kept out of the deploy
```

## Commands

```sh
npm install
npm run dev          # localhost:5173
npm test             # design tokens, focus ring, link health, asset budget
npm run build        # client build, SSR build, prerender, budget check
npm run lint
npx playwright test  # layout and accessibility across ten viewports
```

`npm run build` must come before `npm test` in CI, because the link-health
test asserts against `dist/`.

## House rules for agents

- Content goes in `src/data/` or `src/content/`, never inline in a component.
- Use the existing classes. A new one needs a reason that is not "this page is
  different".
- No new colour, radius, easing or font family. If you need one, it is a
  `DESIGN.md` change first and a code change second.
- Prerendering is a correctness fix, not an optimisation: GitHub Pages has no
  rewrites, so deep links have to be real files or they return the wrong
  status to crawlers and unfurlers.
- Do not add analytics, a cookie banner, a dark-mode toggle, or an icon set.

# ryukijano.github.io — agent guide

The personal site of Gyanateet Dutta. React 19, Vite 7, Tailwind 4, deployed
as a static GitHub Pages user site. Routing is hand-rolled
(`src/lib/navigation.js`) — there is no router dependency.

## Read these first

| file | what it is |
|---|---|
| `DESIGN.md` | the decision log: two stocks, contrast, type, accent and theme behaviour |
| `.opencode/skills/paper-ink/SKILL.md` | the working rules for building a page in this system |
| `.opencode/skills/paper-ink/references/route-shapes.md` | markup and rules for the notes, workbench, collection and ledger shapes |
| `src/index.css` | the entire design system, one file |

`DESIGN.md` records **why** each number is what it is, and
`tests/tokens.test.js` asserts several of those decisions. If a test goes red,
`DESIGN.md` says whether the decision was deliberate. Never tune a value to
make a test pass.

## The short version

The site is a print on washi paper. Reflected light, never emitted. Eight ink
tokens per stock, one accent, everything square, grain under the text rather
than over it. The owner requested light washi and dark indigo stocks. Three
families: Source Serif 4 for anything readable, IBM Plex Sans for interface
chrome at weight 400 only, IBM Plex Mono for tracked
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

## Writing a long-form case study

Write `src/content/<project-slug>.md` in plain Markdown and add the slug to
`src/content/index.js`. A line `<!-- figure 2 -->` places the project's second
figure at that point; figures you do not place follow the article. The build
puts the article into the prerendered page and writes
`dist/content/<slug>.json` for client-side navigation, so prose never enters
the JS bundle. Same rules as everywhere: British English, first person, and
every number traceable to a source, with its scope in the next sentence.

## Writing a note

A note is `/notes/<slug>`: the prose in `src/content/notes/<slug>.md`, the
slug in `NOTE_ARTICLES` in `src/content/index.js`, and its title, standfirst,
kicker, date, number and scope line in `src/data/notes.js`. The page is the
note shape in `route-shapes.md`; the build writes `dist/notes/<slug>.html`
and `dist/content/notes/<slug>.json`, and adds it to the sitemap. Notes take
no figures. Internal links in the Markdown navigate in-app; external ones open
with `rel="noopener noreferrer"`.

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
- Do not add analytics, a cookie banner, or an icon set. Keep the existing
  light/dark stock switch legible and keyboard accessible.

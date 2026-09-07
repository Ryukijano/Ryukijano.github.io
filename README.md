# ryukijano.github.io

The personal site of Gyanateet Dutta — graphics and systems, surgical computer
vision, and hybrid quantum–classical algorithms.

Live at **[ryukijano.github.io](https://ryukijano.github.io)**.

## What it is

A print, hung on paper. The home page is one plate — a Hokusai wave in three
states, reading left to right as *the real world, its encoding, the digital
reconstruction* — with the paper's *kento* registration marks sitting in the
margin rather than on the art. Interior pages are sheets from the same press.

Three lanes run through it, and they are three names for one person:

| lane | handle | subject |
|---|---|---|
| Real world | Ryukijano | graphics and systems |
| Encoding | Yana | computer vision |
| Digital | Ryoushi | quantum algorithms |

Every project states its own limit. That is the site's one editorial rule: a
`Limit:` clause or a `note` on each of the 21 entries, saying what the work is
*not* — a hackathon build and not a clinical panel, a sprint checkpoint and not
a methods contribution, a virtual-track win and not the Grand Prize. It is
enforced by a test, not by good intentions.

## Stack

React 19, Vite 7, Tailwind 4, deployed as a static GitHub Pages user site.
Routing is hand-rolled (`src/lib/navigation.js`) — there is no router
dependency, because the site has six route shapes and no dynamic data.

```
src/
  data/          portfolio.js, publications.js, plate.js — all the content
  lib/           navigation, usePath, Link, routeMeta
  pages/         Home, Work, CaseStudy, Persona, Academic
  components/    SiteNav, KanagawaPlate, Atmosphere
  index.css      the whole design system, one file
scripts/
  prerender.mjs      renders every route to a real HTML file
  check-budget.mjs   fails the build on bloat or unreferenced assets
media/         source images kept out of the deploy — see media/README.md
```

## Development

```sh
npm install
npm run dev        # localhost:5173
npm run build      # client build, SSR build, then prerender
npm run preview    # serve dist/
npm test           # design tokens, link health, asset budget
npm run lint
```

`npm run build` does three things in order: builds the client bundle, builds an
SSR bundle from `src/entry-server.js`, then runs `scripts/prerender.mjs` to
write one real HTML file per route with its own `<title>`, description,
canonical and OG tags — plus `sitemap.xml`, `robots.txt`, and a `404.html`
rendered from an unknown route.

**Prerendering is not an optimisation here, it is a correctness fix.** GitHub
Pages has no rewrites, so a single-page app has to serve deep links through
`404.html`. That returns the right body with the wrong *status*, and link
unfurlers and crawlers check status before they parse — so a case-study link
pasted into LinkedIn previewed as the home page. Real files fix it, and make
the pages readable without JavaScript as a side effect.

## Design

`DESIGN.md` records the system: the palette and its measured contrast ratios,
what each of the three typefaces is for, where the single accent is allowed to
appear, and why there is no dark mode. Read it before changing `index.css` —
the tests assert several of those decisions, and they will tell you which ones.

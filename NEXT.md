# What to do next

Written 2026-08-18, then corrected the same day after the kento port.
Read this before changing content or CSS. Architecture lives in `handoff/`.

## What the site is

Portfolio for Gyanateet Dutta: **Ryukijano** (graphics & systems),
**Gyanateet** (surgical vision), **Ryoushi** (quantum algorithms).
React 19 + Vite 7, Material 3 Expressive, Distill-style field notes,
Kanagawa frontispiece.

**PR #15** (`cursor/field-notes-a347` → **`cursor/mixed-rebuild-a347`**,
not `main`):
https://github.com/Ryukijano/Ryukijano.github.io/pull/15

Do not merge flavour experiments or this PR into `main` unless the owner
asks. `main` is still the legacy GitHub Pages site.

## What the Antigravity swarm broke (do not repeat)

| Claim | Reality |
|-------|---------|
| “Confident researcher prose” | Prize inflation: GQE “on real QPU hardware,” YQuantum as first place, Bradford Grand Prix as fact, NQCC no longer participant. |
| Kento | Two CSS lines painted **on** the wave. Real kento is in the **paper gutter**. |
| `fact-check.jsx` “updated” | Stripped LLaDA / JEPA / DINO denials. Tests passed because the checks were removed. |
| “930-test harness” | Untracked theater. |
| “37 posters” | There are **24** `*poster*` files under `public/`. |

`a960b78` kept token-only persona rooms, the paper daisen slip, stacked
`/work` rows, GIF posters for `prefers-reduced-motion`, and a remade
`denoise-trajectory` GIF. Persona and note **prose** stayed honest.

## What landed after that

Gutter kento from `cursor/kento-frame-a347` (`3296d6f`, `5beccab`) was
ported by hand onto this branch so it would not wipe the daisen slip:

- `.folio__block` padding is the paper margin.
- Hikitsuke is a 1px tick; kagi is a 2px L in the lower-right gutter.
- Marks use `box-sizing: content-box` so they survive the global
  `border-box` reset.
- Lane names tick in that bottom gutter; the daisen slip stays **below**
  the block.

## Test gates

```bash
npm run lint && npm run notes && npm run facts && npm run smoke && npm run tokens && npm run build
```

`fact-check.jsx` checks **exact occurrence counts**, not presence. Do not
“fix” a failing fact by deleting the assertion.

## Facts that must not be inflated

See `README.md`. Short list:

- ORCID `0009-0008-0480-9241`
- ISBI 2026 DOI `10.1109/isbi61048.2026.11515812` — 89.5% / 90.0%, not clinical
- Pothole arXiv:2401.08588 — co-author, not sole author
- YQuantum — Quantum Rings virtual track, not Yale Grand Prize
- NQCC — participant, not a placed winner
- Bradford — teammate-reported, hackathon-scale
- Quantum Buddies — three-person collective, not a funded lab
- Never DBLP `pid/345/4093`
- MSc thesis is not a publication
- Banned: “I introduced V-JEPA”, “I trained LLaDA”, “I introduced DINO”

## Still open (owner’s call)

- **Copy voice.** Defensive persona lines are deliberate. Do not LinkedIn them.
- **Root `public/` duplicates.** `ant_bullet.gif`, `doom_ppo.gif`, and several
  JPGs exist at repo root **and** under `public/assets/images/`. Active code
  uses `/assets/images/…`. Do not delete the root copies without checking
  old Pages hotlinks.
- **Veo / Omni / Higgsfield.** Not authenticated here. Notes stay matplotlib
  GIFs from `tools/make-note-gifs.py`.
- **Merge to `main`.** Only when the owner approves replacing the live
  legacy site. Until then, land into `cursor/mixed-rebuild-a347`.

## Read order

1. This file
2. `README.md`
3. `handoff/ARCHITECTURE.md`
4. `handoff/VALIDATION.md`
5. `fact-check.jsx`
6. `tools/check-notes.mjs`
7. `src/content/personas.js`
8. One note, e.g. `src/content/blog/contrastive-ssl.js`
9. `src/components/KanagawaPlate.jsx` + folio rules in `src/styles/m3.css`

Run the full gate **before and after** every change.

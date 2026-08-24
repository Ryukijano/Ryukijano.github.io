---
name: content-authoring
description: How to write a new field note or case study for this site — file shape, required disclosure language, asset conventions, fact registration, and the voice. Load when adding or heavily editing any file in src/content/blog/ or src/content/caseStudies/.
---

# Authoring notes and case studies

## Field notes (`src/content/blog/*.js`)

Required shape (checked by `npm run notes`):

- `slug`, `title`, `area`, `desc`, `lead` — all present.
- Sections MUST include kickers `THE JOB`, `MECHANICS`, `THE DOMAIN`.
- `instance.quote` required. `next: { slug, label }` must point at an
  existing note.
- If `concept` exists, its caption MUST contain one of
  `schematic|illustrative|framing`.
- Assets referenced (`concept.src/poster`, `instance.gif.src`) must exist
  under `public/`.

Voice: first person is allowed but must stay evidential. Openers must not
be project-diary (`/^i built /i` and friends are banned). The standing
disclosures are: figures are "a schematic of X, not a measured Y";
training claims are denied where true ("I have not trained LLaDA" is a
counted string on `/blog/diffusion-objectives`).

Register target: confident, not cocky. See `.opencode/skills/site-gates/`
for the voice rules and `humanizer/SITE-OVERRIDE.md` for precedence.

## Case studies (`src/content/caseStudies/*.js`)

- Shape mirrors existing files: `slug, status, source, year, lane, desc,
  breadcrumb, kicker, title, lead, meta[], hero{src,poster,alt,caption},
  sections{...}, next[]` — copy a sibling file's skeleton.
- Every generated/illustrative figure caption MUST disclose:
  "a schematic of …, not a measured …" or "illustrative, not model
  output" (presence-checked per route in `fact-check.jsx` MUST_WORDS).
- Numbers are facts: before adding or changing any figure, register it in
  `fact-check.jsx` with its exact expected count. Figures without a
  source do not go in.
- `next[]` link targets use `href('Case Study - Name.dc.html')` from
  `../links.js`.

## Assets

- GIFs live in `public/assets/gifs/`, posters (reduced-motion stills) in
  `public/assets/images/` as `<name>-poster.png`.
- `MediaFigure` swaps GIF → poster automatically under
  `prefers-reduced-motion`. Always supply a poster for new GIFs.
- Note GIFs are matplotlib outputs from `tools/make-note-gifs.py`; no
  AI video generation (Veo/Omni/Higgsfield are unauthenticated here).

## Registering new facts

1. Add the claim to the content file with its exact final wording.
2. Add a `[needle, count]` pair to the route's list in `fact-check.jsx`.
3. `npm run facts` — it must pass with the new pair. If it fails, the
   prose is wrong, not the check.

## Tone calibration examples (from the 2026-08-24 pass)

- Good: "sqd found −2.15 eV at the fcc site against a dft reference of
  −2.20 eV, under 5% error, at a depth below 100 gates."
- Preachy (avoid): "Do not read them as clinical or industrial
  deployments." → declarative: "…weekend-scale builds, prototypes rather
  than clinical or industrial deployments."
- Cocky (avoid): "it's also the best thing on the site."
- One hedge per passage; vary the "X, not Y" shape; em-dash ceiling is
  4 per file.

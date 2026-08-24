---
name: site-gates
description: How to change anything on this portfolio without breaking it — branch rules, the full verification gate, fact-check exact-count discipline, and protected strings. Load before editing ANY file in src/ or content.
---

# Working on this repo safely

## Branch and merge rules (MUST)

1. Never commit to `main`. `main` is the live legacy GitHub Pages site;
   the deployment workflow triggers on it.
2. Work lands on the active `cursor/*-a347` branch. As of 2026-08-24 that
   is `cursor/quiet-polish-a347` (stacked on `field-notes-a347`).
3. Never push or open PRs unless the owner asks.

## The gate (MUST run before and after every change session)

```bash
npm run lint && npm run notes && npm run voice && npm run facts && npm run smoke && npm run tokens && npm run build
```

- `facts`   — `fact-check.jsx`: exact occurrence counts + presence checks
              per route, plus raw-hex scan of rendered markup.
- `notes`   — `tools/check-notes.mjs`: note structure, spine kickers,
              disclosure language, asset existence.
- `voice`   — `tools/check-voice.mjs`: banned vocabulary + per-file
              em-dash ceiling (4).
- `tokens`  — regenerates `src/styles/m3-tokens.css` and enforces WCAG AA.
- `smoke`   — SSRs every route; the 404 routes must contain the literal
              phrase "isn't on the site".
- `build`   — must produce `dist/404.html` (copied from index.html).

## The one rule that outranks everything

`fact-check.jsx` checks EXACT occurrence counts, not presence. If a
rewrite drops a counted phrase from 2x to 1x, the build fails. NEVER fix
a failing fact check by deleting the assertion or loosening the check.
Fix the prose so the phrase survives the required number of times.

### Protected-string classes

- Counted figures: `['90.0%', 2]`, `['28.13 dB', 6]`, `['tbc', 3]` …
- Counted prose: `'five you could check'`,
  `'one you could check if you kept the original'`,
  `'mental model, not a theorem'`, `'I have not trained LLaDA'` …
- Presence words: `'schematic'`, `'framing, not measured'`,
  `'self-distillation'`, band names on `/trust`.
- The 404 phrase `"isn't on the site"` (straight apostrophe — the smoke
  regex does not match the curly one).
- `personas.js` statements: facts frozen; delivery may be softened only
  with owner approval (granted 2026-08-24 for imperatives/redundant
  "not still" clauses; every fact kept verbatim).

## Voice rules (enforced additively)

- Banned vocabulary lives in `tools/check-voice.mjs`; extend the list,
  never loosen it.
- Register: confident, not cocky. Dated declarative sentences. One
  honest hedge per passage. No imperatives at the reader. No
  self-superlatives. Defensive disclaimers ("a schematic, not a
  measurement") are load-bearing evidence markers, not AI cadence.
- `.opencode/skills/humanizer/SITE-OVERRIDE.md` governs any use of the
  humanizer skill here: facts outrank the style list.

## Commit style

Sentence-case subject with a period, matching repo history. Body explains
why, names what is locked/untouched. One concern per commit.

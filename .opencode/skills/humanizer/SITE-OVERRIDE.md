# Site override: read before applying this skill to src/content

This repository uses constructions that look like AI cadence but are
load-bearing honesty markers, not style debt.

## Precedence

1. `fact-check.jsx` wins. It checks exact occurrence counts of denials,
   figures, and disclosure phrases. If a rewrite changes any count, the
   rewrite is wrong regardless of what the pattern list below says.
2. The defensive register is deliberate. Statements of the shape
   "participant, not a placed winner", "a schematic, not a measurement",
   "hackathon-scale, not clinical" exist so figures cannot be misread as
   claims. Do not remove or soften them, including ones `facts` does not
   count.
3. `src/content/personas.js` statements are owner-locked prose. Do not
   rewrite them at all.
4. Disclosure vocabulary checked by presence (`schematic`,
   `framing, not measured`, band names on `/trust`) must survive verbatim.

## What the skill IS for here

New prose written by agents: case-study drafts, note drafts, page copy
not yet under a gate. Run the patterns against fresh output, then verify
with:

```bash
npm run facts && npm run voice && npm run notes
```

before considering text landed. See `NEXT.md` at the repo root for the
full gate order and the history of why these needles exist.

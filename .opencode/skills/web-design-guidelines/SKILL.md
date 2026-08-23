---
name: web-design-guidelines
description: Review UI code against Vercel's Web Interface Guidelines — focus states, keyboard, motion, layout, content, performance. Use when asked to "review my UI", audit a component/page, or before shipping visual changes.
---

# Web Interface Guidelines (vendored)

The full rule set lives in `references/guidelines.md`, vendored from
vercel-labs/web-interface-guidelines `AGENTS.md` on 2026-08-23. Read it
first, then audit the target files rule by rule. Report findings tersely
as `file:line — issue`. No preamble.

## Repo-specific overrides

1. Colours MUST come from `src/styles/m3-tokens.css` roles via
   `var()`/`color-mix()`; `fact-check.jsx` fails the build on raw hex in
   rendered markup.
2. Reduced-motion handling is centralised: `src/base.css` (global kill
   switch) and `src/components/useReveal.js` (reveal opt-out). New motion
   must be wrapped in `@media (prefers-reduced-motion: no-preference)`.
3. The atmosphere layers (`src/components/Atmosphere.jsx`) are decorative;
   never let them intercept pointer events or sit above interactive UI.

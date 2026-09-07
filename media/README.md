# media/

Source images from the pre-React site, kept out of `public/` on purpose.

Anything in `public/` is copied verbatim into `dist/` and deployed, so an
unreferenced file there is bytes every visitor's CDN edge carries for nothing —
this directory was 94% of a 59 MB deploy. These files are still tracked, so
they remain available as case-study figures (see the `figure:` field in
`src/data/portfolio.js`); they just are not shipped until something references
them.

**To use one:** re-encode it first. `doom_ppo.gif` is 7.8 MB and
`ant_bullet.gif` is 7.4 MB — a multi-megabyte GIF on a case study would undo
the restraint the rest of the site is built on. Convert to a muted, looping,
`playsinline` `<video>` (WebM + H.264 is typically 5–15× smaller) or pull a
single representative frame, then put the result in
`public/assets/images/`.

`scripts/check-budget.mjs` fails the build if anything in `dist/` is
unreferenced, which is what keeps this boundary honest.

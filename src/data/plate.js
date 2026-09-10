/**
 * The hung print. Shared by HomePage's <picture> and by the prerender step,
 * which emits the <link rel=preload> from this same object — if the two
 * disagreed the browser would download the plate twice.
 */
/*
 * The honest `sizes`. The CSS derives the block's width from the viewport
 * HEIGHT -- min(100% - 3rem, 76rem, (100dvh - 29rem) * 3923/2160 + 2rem) --
 * which `sizes` cannot express directly, so this mirrors it branch for branch.
 * The old value claimed `min(100vw, 1400px)` while the truth on a 1440x900
 * laptop is 966px, so the browser fetched 1800w instead of 1000w.
 *
 * Every condition is `and`-only and every value is a bare calc(): no comma, no
 * `or`, no top-level min(). A media *condition* may not contain a comma, and
 * Level 4 `or` only landed in Safari 16.4 -- and one unparseable source-size
 * invalidates the WHOLE attribute, dropping the browser to 100vw. So the
 * stacked case is the trailing default rather than a leading `or` branch.
 */

/**
 * The height reserved for everything that is not the plate, and the two
 * breakpoints at which the print stops being hung and starts being stacked.
 * All three MUST match src/index.css -- `sizes` describes the layout, so a
 * disagreement makes the browser pick a tier for a layout that does not
 * exist. tests/tokens.test.js asserts each one against the stylesheet.
 */
export const PLATE_HEIGHT_BUDGET_REM = 29;
export const PLATE_MIN_WIDTH_PX = 900;
/*
 * 720px, not the 620px this used to be. Below 720 the layout eats itself: the
 * plate is sized from the leftover height, the title slip is exactly as wide
 * as the plate, and the slip's own height depends on that width because the
 * bio rewraps -- so a shorter viewport gives a narrower plate, which gives a
 * TALLER slip, which leaves less height, which narrows the plate again. It
 * diverges. Measured at 1440w: the bio holds one wrap down to a 465px plate
 * (viewport height 720, page fits exactly); at 715 it rewraps to 367px and the
 * page is 39px over; by 660 it is 99px over at every width from 900 to 1920.
 * Overflow in that band is purely a function of height -- identical across the
 * whole width range -- so 720 is the exact height at which the hung print
 * stops fitting and the stacked layout becomes the correct presentation.
 */
export const PLATE_MIN_HEIGHT_PX = 720;
/**
 * The plate's true aspect ratio, from the master scan. The authority for the
 * rendered box is .folio__sheet's `aspect-ratio`, so this is the same pair of
 * numbers and `sizes` derives its multiplier from them rather than repeating a
 * literal 1.8162 that a recrop would silently falsify.
 */
export const PLATE_ASPECT = [3923, 2160];

const ASPECT = (PLATE_ASPECT[0] / PLATE_ASPECT[1]).toFixed(4);
const HUNG = `(min-width: ${PLATE_MIN_WIDTH_PX}px) and (min-height: ${PLATE_MIN_HEIGHT_PX}px)`;

const PLATE_SIZES =
  // Hung, and wide enough that the height budget is what binds.
  `${HUNG} and (min-aspect-ratio: 4/3) ` +
    `calc((100vh - ${PLATE_HEIGHT_BUDGET_REM}rem) * ${ASPECT}), ` +
  // Hung but tall and narrow: the `100% - 3rem` cap binds instead.
  `${HUNG} calc(100vw - 3rem), ` +
  // Stacked -- either breakpoint. Full bleed less the stage and block gutters.
  // On a phone this is exact. In the wide-and-short band the stylesheet also
  // caps the stacked print by height (--folio-stacked), which this branch
  // cannot express without a nested min(); it over-describes there, and
  // over-fetching is the safe direction -- a soft plate is the one to avoid.
  'calc(100vw - 4rem)';

export const PLATE = {
  // The <img src> floor: a 1200w JPEG rather than the 3923x2160 master, which
  // almost nobody fetched (WebP has been universal since 2020) but which is
  // also what "open image in new tab" hands someone. The master lives in
  // media/ as the encode source.
  src: '/assets/images/kanagawa-plate-1200.jpg',
  width: 1200,
  height: 661,
  sources: [
    {
      // AVIF q70 measured against the current WebP q82 per panel: +2.5 dB on
      // the painted wave, the dither field and the wireframe alike, at 6%
      // fewer bytes. The saving comes from the ladder, not the quality dial --
      // 800w and 1000w tiers exist because 1200w used to be the floor, so a
      // 393@2 phone downloaded 3.3x the pixels it could show.
      type: 'image/avif',
      srcSet:
        '/assets/images/kanagawa-plate-800.avif 800w, ' +
        '/assets/images/kanagawa-plate-1000.avif 1000w, ' +
        '/assets/images/kanagawa-plate-1200.avif 1200w, ' +
        '/assets/images/kanagawa-plate-1800.avif 1800w, ' +
        '/assets/images/kanagawa-plate-2000.avif 2000w, ' +
        '/assets/images/kanagawa-plate-2600.avif 2600w',
      sizes: PLATE_SIZES,
    },
    {
      type: 'image/webp',
      srcSet:
        '/assets/images/kanagawa-plate-1200.webp 1200w, ' +
        '/assets/images/kanagawa-plate-1800.webp 1800w',
      sizes: PLATE_SIZES,
    },
  ],
  alt: 'Kanagawa plate in three states, left to right: the painted wave, its RGB encoding, a neon wireframe.',
  caption:
    'The plate reads left to right: the real world, its encoding, the digital reconstruction. Painted, dithered, wireframed. A schematic of a representation, not a measurement.',
  highlight: 'schematic',
};

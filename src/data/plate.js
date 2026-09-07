/**
 * The hung print. Shared by HomePage's <picture> and by the prerender step,
 * which emits the <link rel=preload> from this same object — if the two
 * disagreed the browser would download the plate twice.
 */
/*
 * The honest `sizes`. The CSS derives the block's width from the viewport
 * HEIGHT -- min(100% - 3rem, 76rem, (100dvh - 23rem) * 3923/2160 + 2rem) --
 * which `sizes` cannot express directly, so this mirrors it with two branches.
 * The old value claimed `min(100vw, 1400px)` while the truth on a 1440x900
 * laptop is 966px, so the browser fetched 1800w instead of 1000w.
 *
 * calc() only, no min(): Safari's source-size parser is the narrow one, and an
 * unparseable source-size is dropped in favour of 100vw -- which is exactly
 * today's behaviour, so the failure mode is safe.
 */
/**
 * The height reserved for everything that is not the plate. MUST match
 * --folio-plate's constant in src/index.css, or `sizes` describes a different
 * layout than the CSS produces and the browser fetches the wrong tier.
 * tests/tokens.test.js asserts the two agree.
 */
export const PLATE_HEIGHT_BUDGET_REM = 29;

const PLATE_SIZES =
  '(max-width: 899px) calc(100vw - 4rem), ' +
  `(min-aspect-ratio: 4/3) calc((100vh - ${PLATE_HEIGHT_BUDGET_REM}rem) * 1.8162), ` +
  'calc(100vw - 3rem)';

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

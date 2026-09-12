// Keep these values aligned with the folio media queries in index.css.
export const PLATE_HEIGHT_BUDGET_REM = 33;
export const PLATE_MIN_WIDTH_PX = 900;
export const PLATE_MIN_HEIGHT_PX = 800;
export const PLATE_ASPECT = [3923, 2160];

const ASPECT = (PLATE_ASPECT[0] / PLATE_ASPECT[1]).toFixed(4);
const HUNG = `(min-width: ${PLATE_MIN_WIDTH_PX}px) and (min-height: ${PLATE_MIN_HEIGHT_PX}px)`;

const PLATE_SIZES =
  `${HUNG} and (min-aspect-ratio: 4/3) ` +
    `calc((100vh - ${PLATE_HEIGHT_BUDGET_REM}rem) * ${ASPECT}), ` +
  `${HUNG} calc(100vw - 3rem), ` +
  'calc(100vw - 4rem)';

export const PLATE = {
  src: '/assets/images/kanagawa-plate-1200.jpg',
  width: 1200,
  height: 661,
  sources: [
    {
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
    'The image moves from a painted scene to an RGB encoding and a wireframe reconstruction. It is a schematic of digital representation.',
  highlight: 'schematic',
};

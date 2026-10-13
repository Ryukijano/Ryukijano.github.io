// The pinned plate on the home desk. Crops are served from public/assets/images.
// Sizes describe that card: about half the desk on a wide screen, and the
// column on a phone. They are not the old full-bleed hung-print sizes.
export const PLATE_ASPECT = [3923, 2160];

const PLATE_SIZES =
  '(min-width: 900px) and (min-height: 800px) 26rem, calc(100vw - 4rem)';

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
    'A schematic of one wave, from woodblock print through RGB pixels to wireframe.',
  highlight: 'schematic',
};

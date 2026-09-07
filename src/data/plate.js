/**
 * The hung print. Shared by HomePage's <picture> and by the prerender step,
 * which emits the <link rel=preload> from this same object — if the two
 * disagreed the browser would download the plate twice.
 */
export const PLATE = {
  src: '/assets/images/kanagawa_latentspace_autoencoder.jpg',
  width: 3923,
  height: 2160,
  sources: [
    {
      type: 'image/webp',
      srcSet:
        '/assets/images/kanagawa-plate-1200.webp 1200w, /assets/images/kanagawa-plate-1800.webp 1800w, /assets/images/kanagawa-plate-2600.webp 2600w',
      sizes: '(max-width: 899px) 100vw, min(100vw, 1400px)',
    },
  ],
  alt: 'Kanagawa plate in three states, left to right: the painted wave, its RGB encoding, a neon wireframe.',
  caption:
    'The plate reads left to right: the real world, its encoding, the digital reconstruction. Painted, dithered, wireframed. A schematic of a representation, not a measurement.',
  highlight: 'schematic',
};

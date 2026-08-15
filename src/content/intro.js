/**
 * Home is one hung plate. Left / centre / right of the image are
 * Engineer / AI / Quantum. Type lives on a paper title-slip pasted
 * at the bottom-left of the print — a Hokusai daisen / AIC wall label,
 * not a column and not a wash.
 */
import academic from './academic.js';
import { personas } from './personas.js';

export const bio = academic.bio;
export const degree = academic.education[0];

export const plate = {
  src: '/assets/images/kanagawa_latentspace_autoencoder.jpg',
  alt: 'Kanagawa plate in three states: painted woodblock, RGB dither, neon wireframe',
  caption:
    'The plate is a schematic of a representation, not a measurement. Painted, dithered, wireframed. The three lanes are framing, not measured results.',
  highlight: 'schematic',
};

export const rooms = [
  {
    id: 'ryukijano',
    lane: 'Engineer',
    title: personas.ryukijano.title,
    to: '/persona/ryukijano',
  },
  {
    id: 'gyanateet',
    lane: 'AI',
    title: personas.gyanateet.title,
    to: '/persona/gyanateet',
  },
  {
    id: 'ryoushi',
    lane: 'Quantum',
    title: personas.ryoushi.title,
    to: '/persona/ryoushi',
  },
];

export default { bio, degree, plate, rooms };

/**
 * Home is an exhibition hang: the Kanagawa plate is the object, type lives
 * in the mat. Left/centre/right of the plate are Engineer / AI / Quantum.
 */
import academic from './academic.js';
import { hero as workHero } from './work.js';
import { personas } from './personas.js';

export const bio = academic.bio;
export const degree = academic.education[0];
export const affiliations = workHero.affiliations.join(' · ');

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
    theme: 'ryukijano',
    lane: 'Engineer',
    panel: 'Painted',
    title: personas.ryukijano.title,
    subtitle: personas.ryukijano.subtitle,
    to: '/persona/ryukijano',
    projects: personas.ryukijano.projects.slice(0, 3),
  },
  {
    id: 'gyanateet',
    theme: 'study',
    lane: 'AI',
    panel: 'Dithered',
    title: personas.gyanateet.title,
    subtitle: personas.gyanateet.subtitle,
    to: '/persona/gyanateet',
    projects: personas.gyanateet.projects.slice(0, 3),
  },
  {
    id: 'ryoushi',
    theme: 'ryoushi',
    lane: 'Quantum',
    panel: 'Wireframe',
    title: personas.ryoushi.title,
    subtitle: personas.ryoushi.subtitle,
    to: '/persona/ryoushi',
    projects: personas.ryoushi.projects.slice(0, 3),
  },
];

export default { bio, degree, affiliations, plate, rooms };

/**
 * Home is the three-lane hall: Engineer / AI / Quantum over one Kanagawa plate.
 * The plate is the page ground once. It is not also a cartouche, a figure, or a
 * header strip.
 */
import academic from './academic.js';
import { hero as workHero } from './work.js';
import { personas } from './personas.js';

export const bio = academic.bio;
export const degree = academic.education[0];
export const affiliations = workHero.affiliations.join(' · ');

export const plate = {
  src: '/assets/images/kanagawa_latentspace_autoencoder.jpg',
  alt: '',
  caption:
    'The plate behind this page is a schematic of a representation, not a measurement. The three lanes are framing, not measured results.',
  highlight: 'schematic',
};

export const rooms = [
  {
    id: 'ryukijano',
    theme: 'ryukijano',
    lane: 'Engineer',
    title: personas.ryukijano.title,
    titleLines: ['Ryu', 'ki', 'jano'],
    subtitle: personas.ryukijano.subtitle,
    to: '/persona/ryukijano',
    projects: personas.ryukijano.projects.slice(0, 3),
  },
  {
    id: 'gyanateet',
    theme: 'study',
    lane: 'AI',
    title: personas.gyanateet.title,
    titleLines: ['G', 'YANA', 'TEET'],
    subtitle: personas.gyanateet.subtitle,
    to: '/persona/gyanateet',
    projects: personas.gyanateet.projects.slice(0, 3),
  },
  {
    id: 'ryoushi',
    theme: 'ryoushi',
    lane: 'Quantum',
    title: personas.ryoushi.title,
    titleLines: ['RY', 'OU', 'SHI'],
    subtitle: personas.ryoushi.subtitle,
    to: '/persona/ryoushi',
    projects: personas.ryoushi.projects.slice(0, 3),
  },
];

export default { bio, degree, affiliations, plate, rooms };

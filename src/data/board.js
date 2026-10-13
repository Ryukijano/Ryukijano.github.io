import deckArt from '../../media/desk-plate.svg?raw';
import { ACADEMIC_PROFILES, HOME_BIO } from './publications.js';

/**
 * The desk is one screen above both fences, and a column below either.
 * Same numbers the hung print used, so a short window still stacks
 * instead of crushing the pictures.
 */
export const BOARD_MIN_WIDTH_PX = 900;
export const BOARD_MIN_HEIGHT_PX = 800;

/**
 * Home-page copy. Each line is already somewhere on the site.
 *
 * Vision is the lane label, and it links to that persona. "quantum" links
 * to Ryoushi, whose subtitle is "Quantum algorithms". "robotics" links to
 * Gemma-Le, the project tagged Robotics — there is no robotics lane.
 *
 * The note does not say "robot learning". Nothing in src/data calls the
 * work that. The third line is a research interest, word for word.
 * Self-supervised vision is the ISBI paper's own description, and the
 * AIMS case study is the page for it. Quantum algorithms is the Ryoushi
 * subtitle.
 */
export const BOARD = {
  name: 'Gyanateet Dutta',
  handle: { text: 'Ryukijano', href: '/persona/ryukijano' },
  subjects: [
    { text: 'Vision', href: '/persona/yana' },
    { text: 'quantum', href: '/persona/ryoushi' },
    { text: 'robotics', href: '/work/gemma-le-vla-policy' },
  ],
  started: {
    href: HOME_BIO.story.href,
    src: '/assets/images/portrait.webp',
    width: 256,
    height: 256,
    alt: 'Gyanateet as a child, at a beige desktop computer',
    caption: 'where it started',
  },
  deck: {
    art: deckArt,
    width: 96,
    height: 64,
    caption: 'the other deck',
    scope: 'A pixel drawing. Not a photograph, and not a result.',
  },
  mind: {
    title: 'On my mind',
    items: [
      { text: 'Self-supervised vision', href: '/work/aims-surgical-phase-detection' },
      { text: 'Quantum algorithms', href: '/persona/ryoushi' },
      { text: 'Image-based 3D reconstruction', href: '/work/b3tt3r-3d-reconstruction' },
    ],
  },
  mark: { text: 'open source ftw', href: ACADEMIC_PROFILES.github },
};

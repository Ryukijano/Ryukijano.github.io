/**
 * Home is a Distill article, not the dusk triptych. Copy that still earns
 * its keep comes from the old intro thesis, the academic bio, and Revamp E.
 */
import academic from './academic.js';
import { hero as workHero, method, matrix } from './work.js';
import trust, { bandIds } from './trust.js';
import fetVae from './caseStudies/fet-vae-surgical-prediction.js';
import shor from './caseStudies/yquantum-shors-algorithm.js';
import cosmos from './caseStudies/cosmos-sentinel.js';
import pothole from './caseStudies/pothole-detection.js';

export const bio = academic.bio;
export const degree = academic.education[0];

export const thesis = {
  title: ['Methods'],
  lead: method.lead,
  caveat: method.caveat,
  hint: method.hint,
};

export const fig1 = {
  caption:
    'Figure 1. One plate, three renderings: painted, dithered, wireframed. Schematic, not a measurement. Hover a column in Figure 2 to pan the crop.',
  highlight: 'schematic',
};

export const fig2 = {
  caption:
    'Figure 2. Five techniques, four fields. Framing, not measured results. Transfer generates hypotheses; it does not guarantee them. A decoder that handles Gaussian sensor noise does not handle correlated, non-Markovian noise on real hardware, and a frozen encoder that crosses porcine and human tissue will not cross imaging modalities.',
  highlight: 'Framing, not measured',
  columns: ['GRAPHICS', 'VISION', 'QUANTUM', 'SCIENCES'],
  defaultRow: 1,
};

function asFig3(caption) {
  return caption.startsWith('Figure 3.') ? caption : `Figure 3. ${caption}`;
}

export const clips = {
  graphics: {
    src: '/assets/gifs/wave-transfer.gif',
    alt: 'Painted wave becoming a dithered field, then a neon wireframe',
    caption:
      'Figure 3. Painted → dithered → wireframe. An invented transfer, not a measured result from the studies.',
    highlight: 'invented',
    mode: 'waves',
  },
  vision: {
    src: fetVae.hero.src,
    alt: fetVae.hero.alt,
    caption: asFig3(fetVae.hero.caption),
    highlight: fetVae.hero.highlight,
    poster: fetVae.hero.poster,
    mode: 'dots',
  },
  quantum: {
    src: shor.hero.src,
    alt: shor.hero.alt,
    caption: asFig3(shor.hero.caption),
    highlight: shor.hero.highlight,
    poster: shor.hero.poster,
    mode: 'lattice',
  },
  sciences: {
    src: cosmos.hero.src,
    alt: cosmos.hero.alt,
    caption: asFig3(cosmos.hero.caption),
    highlight: cosmos.hero.highlight,
    mode: null,
  },
  restored: {
    src: pothole.hero.src,
    alt: pothole.hero.alt,
    caption: asFig3(pothole.hero.caption),
    highlight: pothole.hero.highlight,
    poster: pothole.hero.poster,
    mode: 'dots',
  },
};

export const matrixRows = matrix;
export const methodMeta = method;

export const ramp = bandIds.map((id, i) => ({
  id,
  name: trust.bands.find((b) => b.id === id)?.name ?? id.toUpperCase(),
  gloss: trust.rampGloss[i],
}));

export const index = [
  { label: 'Work', to: '/work', note: 'Eleven notes' },
  { label: 'Academic', to: '/academic', note: 'Papers' },
  { label: 'Ryukijano', to: '/persona/ryukijano', note: 'Graphics & systems' },
  { label: 'Gyanateet', to: '/persona/gyanateet', note: 'Vision & robotics' },
  { label: 'Ryoushi', to: '/persona/ryoushi', note: 'Quantum algorithms' },
  { label: 'GitHub', to: 'https://github.com/Ryukijano', note: 'Code', external: true },
];

export const affiliations = workHero.affiliations.join(' · ');

export const footNote =
  'Gyanateet Dutta · MSc Advanced Computer Science (Artificial Intelligence), University of Leeds · Leeds, UK';

export default {
  bio,
  degree,
  thesis,
  fig1,
  fig2,
  clips,
  matrixRows,
  methodMeta,
  ramp,
  index,
  affiliations,
  footNote,
};

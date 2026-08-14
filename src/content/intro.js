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

export const question =
  'What did the sensor actually record, and what did the model add?';

export const thesis = {
  kicker: '00 / METHOD',
  title: method.title,
  lead: method.lead,
  prose: [
    'Graphics taught me that a renderer is a physics argument you can look at. Surgical video taught me that a confident model is still just a guess. Quantum work is mostly an education in where methods give out. None of the three is decoration for the others. The things that carry between them are the actual work, and they carry both ways.',
  ],
  quote: workHero.quote,
  caveat: method.caveat,
  hint: method.hint,
};

export const fig1 = {
  caption:
    "Figure 1. Hokusai reconstructed in a latent autoencoder — painted, dithered, wireframed. This is a schematic of a representation, not a measurement. Waves / dots / lattice are the three canvas languages from the old triptych, now readings of one picture. Hover a column in Figure 2 to lock a reading.",
  highlight: 'schematic',
};

export const fig2 = {
  caption:
    'Figure 2. Five techniques, four fields. Framing, not measured results. Transfer generates hypotheses; it does not guarantee them. A decoder that handles Gaussian sensor noise does not handle correlated, non-Markovian noise on real hardware, and a frozen encoder that crosses porcine and human tissue will not cross imaging modalities.',
  highlight: 'Framing, not measured',
  columns: ['GRAPHICS', 'VISION', 'QUANTUM', 'SCIENCES'],
  defaultRow: 1,
};

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
    caption: fetVae.hero.caption,
    highlight: fetVae.hero.highlight,
    poster: fetVae.hero.poster,
    mode: 'dots',
  },
  quantum: {
    src: shor.hero.src,
    alt: shor.hero.alt,
    caption: shor.hero.caption,
    highlight: shor.hero.highlight,
    poster: shor.hero.poster,
    mode: 'lattice',
  },
  sciences: {
    src: cosmos.hero.src,
    alt: cosmos.hero.alt,
    caption: cosmos.hero.caption,
    highlight: cosmos.hero.highlight,
    mode: null,
  },
  restored: {
    src: pothole.hero.src,
    alt: pothole.hero.alt,
    caption: pothole.hero.caption,
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
  { label: 'Work', to: '/work', note: 'Eleven dated notes' },
  { label: 'Academic', to: '/academic', note: 'Papers and the record' },
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
  question,
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

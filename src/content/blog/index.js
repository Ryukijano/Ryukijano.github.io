import pretraining from './pretraining.js';
import contrastive from './contrastive-ssl.js';
import predictive from './predictive-ssl.js';
import video from './video-representation.js';
import videoLanguage from './video-language.js';
import postTraining from './post-training.js';
import diffusion from './diffusion-objectives.js';
import agentSkills from './agent-skills.js';
import qecLearning from './qec-learning.js';
import qecSupervision from './qec-supervision.js';
import circuitSearch from './circuit-search.js';

export const notes = [
  pretraining,
  contrastive,
  predictive,
  video,
  videoLanguage,
  postTraining,
  diffusion,
  agentSkills,
  qecLearning,
  qecSupervision,
  circuitSearch,
];

export const notesBySlug = Object.fromEntries(notes.map((note) => [note.slug, note]));

export const curriculum = [
  { slug: 'pretraining', layer: 'Pretraining', changes: 'representations' },
  { slug: 'contrastive-ssl', layer: 'SSL geometry', changes: 'invariance / anti-collapse' },
  { slug: 'predictive-ssl', layer: 'Predictive SSL', changes: 'latent structure' },
  { slug: 'video-representation', layer: 'Video', changes: 'dynamics' },
  { slug: 'video-language', layer: 'Video-language', changes: 'shared semantics' },
  { slug: 'post-training', layer: 'Post-training', changes: 'policy' },
  { slug: 'diffusion-objectives', layer: 'Diffusion', changes: 'generative process' },
  { slug: 'agent-skills', layer: 'Skills', changes: 'external procedure' },
  { slug: 'qec-learning', layer: 'QEC', changes: 'hidden-state inference' },
  { slug: 'qec-supervision', layer: 'QEC labels', changes: 'what the decoder may know' },
  { slug: 'circuit-search', layer: 'Search', changes: 'score-driven structure' },
];

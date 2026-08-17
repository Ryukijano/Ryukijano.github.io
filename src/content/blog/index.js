import pretraining from './pretraining.js';
import contrastive from './contrastive-ssl.js';
import predictive from './predictive-ssl.js';
import video from './video-representation.js';
import videoLanguage from './video-language.js';
import postTraining from './post-training.js';
import diffusion from './diffusion-objectives.js';
import agentSkills from './agent-skills.js';

export const notes = [
  pretraining,
  contrastive,
  predictive,
  video,
  videoLanguage,
  postTraining,
  diffusion,
  agentSkills,
];

export const notesBySlug = Object.fromEntries(notes.map((note) => [note.slug, note]));

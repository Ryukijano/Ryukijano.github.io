import conditionalGqe from './conditional-gqe.js';
import cosmosSentinel from './cosmos-sentinel.js';
import daltonMills from './dalton-mills.js';
import fetVae from './fet-vae-surgical-prediction.js';
import gemmaLe from './gemma-le-vla.js';
import gotJepa from './got-jepa-tool-tracking.js';
import nqcc from './nqcc-rolls-royce.js';
import pothole from './pothole-detection.js';
import surgicalPhase from './surgical-phase-detection.js';
import syndromeNet from './syndrome-net.js';
import yquantum from './yquantum-shors-algorithm.js';

/**
 * Index-row defaults, keyed by slug. Individual study files may already carry
 * featured / year / lane / desc / name; missing fields are filled here so
 * /work can render before those files are patched.
 */
const INDEX_DEFAULTS = {
  'conditional-gqe': {
    featured: true,
    featuredOrder: 1,
    year: 2026,
    lane: 'Quantum',
    desc: 'transformer proposes the ansatz',
    name: 'Conditional-GQE',
  },
  'yquantum-shors-algorithm': {
    featured: true,
    featuredOrder: 2,
    year: 2025,
    lane: 'Quantum',
    desc: 'Quantum Rings virtual track, not Yale Grand Prize',
    name: "YQuantum Shor's",
  },
  'surgical-phase-detection': {
    featured: true,
    featuredOrder: 3,
    year: 2026,
    lane: 'Vision',
    desc: 'ISBI 2026 surgical phase',
    name: 'Surgical phase detection',
  },
  'fet-vae-surgical-prediction': {
    featured: true,
    featuredOrder: 4,
    year: 2024,
    lane: 'Vision',
    desc: 'MSc video prediction (not a publication)',
    name: 'FET-VAE',
  },
  'dalton-mills': {
    featured: true,
    featuredOrder: 5,
    year: 2024,
    lane: 'Graphics',
    desc: 'mill rebuilt from ten photographs',
    name: 'Dalton Mills',
  },
  'syndrome-net': {
    featured: true,
    featuredOrder: 6,
    year: 2026,
    lane: 'Quantum',
    desc: 'QEC workbench',
    name: 'Syndrome-Net',
  },
  'pothole-detection': {
    featured: true,
    featuredOrder: 7,
    year: 2024,
    lane: 'Vision',
    desc: 'co-author, arXiv:2401.08588',
    name: 'Pothole detection',
  },
  'nqcc-rolls-royce': {
    featured: true,
    featuredOrder: 8,
    year: 2025,
    lane: 'Quantum',
    desc: 'NQCC participant, not a placed winner',
    name: 'NQCC Rolls-Royce',
  },
  'cosmos-sentinel': {
    featured: false,
    year: 2026,
    lane: 'Vision',
    desc: 'near-miss analysis with a world model',
    name: 'Cosmos Sentinel',
  },
  'gemma-le-vla': {
    featured: false,
    year: 2025,
    lane: 'Vision',
    desc: 'compact VLA policy for manipulation',
    name: 'Gemma-Le',
  },
  'got-jepa-tool-tracking': {
    featured: false,
    year: 2026,
    lane: 'Vision',
    desc: 'instrument tracking through smoke, in progress',
    name: 'GOT-JEPA tool tracking',
  },
};

function withIndexMeta(study) {
  const fallback = INDEX_DEFAULTS[study.slug] ?? {};
  return {
    ...study,
    featured: study.featured ?? fallback.featured ?? false,
    featuredOrder: study.featuredOrder ?? fallback.featuredOrder,
    year: study.year ?? fallback.year,
    lane: study.lane ?? fallback.lane,
    // Index one-liners in INDEX_DEFAULTS win: they carry the honesty notes
    // the /work table is for (virtual track, not a publication, participant).
    desc: fallback.desc ?? study.desc,
    name: fallback.name ?? study.name ?? study.title,
  };
}

/**
 * Ordered the way "Academic.dc.html" lists them under "selected work".
 * `status: 'full'` means the body prose is ported; `'stub'` means only the
 * hero, meta and lead figure are, and the source file still has the rest.
 */
export const caseStudies = [
  conditionalGqe,
  daltonMills,
  surgicalPhase,
  syndromeNet,
  cosmosSentinel,
  gotJepa,
  fetVae,
  pothole,
  gemmaLe,
  nqcc,
  yquantum,
].map(withIndexMeta);

export const bySlug = Object.fromEntries(caseStudies.map((s) => [s.slug, s]));

export const getStudy = (slug) => bySlug[slug] ?? null;

export const featuredStudies = caseStudies
  .filter((s) => s.featured)
  .sort((a, b) => a.featuredOrder - b.featuredOrder);

export const alsoStudies = caseStudies
  .filter((s) => !s.featured)
  .sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

export default caseStudies;

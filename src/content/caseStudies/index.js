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
];

export const bySlug = Object.fromEntries(caseStudies.map((s) => [s.slug, s]));

export const getStudy = (slug) => bySlug[slug] ?? null;

export default caseStudies;

/**
 * The prototypes link to each other by filename ("Case Study - Dalton
 * Mills.dc.html"). This is the single place that maps those filenames onto
 * routes, so the content modules can keep quoting the prototypes' own link
 * targets and nothing has to be rewritten by hand twice.
 */
export const routeFor = {
  'Intro.dc.html': '/',
  'Academic.dc.html': '/academic',
  'Revamp E - Method Transfer.dc.html': '/work',

  'Case Study - Conditional GQE.dc.html': '/work/conditional-gqe',
  'Case Study - Cosmos Sentinel.dc.html': '/work/cosmos-sentinel',
  'Case Study - Dalton Mills.dc.html': '/work/dalton-mills',
  'Case Study - FET-VAE Surgical Prediction.dc.html': '/work/fet-vae-surgical-prediction',
  'Case Study - GOT-JEPA Tool Tracking.dc.html': '/work/got-jepa-tool-tracking',
  'Case Study - Gemma-Le VLA.dc.html': '/work/gemma-le-vla',
  'Case Study - NQCC Rolls-Royce Challenge.dc.html': '/work/nqcc-rolls-royce',
  'Case Study - Pothole Detection.dc.html': '/work/pothole-detection',
  'Case Study - Surgical Phase Detection.dc.html': '/work/surgical-phase-detection',
  'Case Study - Syndrome-Net.dc.html': '/work/syndrome-net',
  'Case Study - YQuantum Shors Algorithm.dc.html': '/work/yquantum-shors-algorithm',

  // TODO: the two persona pages have prototypes but no route yet. They fall
  // through to /work so no link dead-ends; give them their own routes when
  // "Persona - Ryukijano.dc.html" and "Persona - Ryoushi.dc.html" are ported.
  'Persona - Ryukijano.dc.html': '/work',
  'Persona - Ryoushi.dc.html': '/work',
};

/** Resolve a prototype filename or an absolute URL to something linkable. */
export function href(target) {
  if (!target) return '/';
  if (/^https?:/.test(target) || target.startsWith('mailto:') || target.startsWith('#')) {
    return target;
  }
  return routeFor[target] ?? '/work';
}

export const isExternal = (target) => /^https?:/.test(target);

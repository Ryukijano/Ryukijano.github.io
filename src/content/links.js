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
  'Index - What We Trust.dc.html': '/trust',
  // "What It Knows" is a near-identical earlier prototype of the same page and
  // is not being ported separately — "What We Trust" is the canonical one. It
  // points at /trust so a link quoting the older filename lands on the page it
  // meant rather than falling through to the /work default.
  'Index - What It Knows.dc.html': '/trust',

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

  'Persona - Ryukijano.dc.html': '/persona/ryukijano',
  'Persona - Gyanateet.dc.html': '/persona/gyanateet',
  'Persona - Ryoushi.dc.html': '/persona/ryoushi',
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

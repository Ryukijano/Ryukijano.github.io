/**
 * STUB — hero, meta and the two lead figures, taken from
 * "Case Study - NQCC Rolls-Royce Challenge.dc.html".
 *
 * Note: that prototype uses the sticky-header layout; its header reads
 * "GYANATEET · QUANTUM", and `breadcrumb` carries the second half.
 *
 * TODO: port the numbered sections from that file. The schema matches
 * conditional-gqe.js, so this is mechanical.
 */
import { href } from '../links.js';

const study = {
  slug: 'nqcc-rolls-royce',
  status: 'stub',
  source: 'Case Study - NQCC Rolls-Royce Challenge.dc.html',

  breadcrumb: 'QUANTUM',
  kicker: 'NQCC UK QUANTUM HACKATHON 2025 · TEAM 15',
  title: 'Hydrogen on nickel, on a device that is still noisy',
  lead: 'A Rolls-Royce materials challenge run with VQE and sample-based quantum diagonalisation — and a week spent finding out how much circuit depth the hardware would actually tolerate before the answer stopped meaning anything.',

  meta: [
    { k: 'YEAR', v: '2025' },
    { k: 'EVENT', v: 'NQCC UK Quantum Hackathon' },
    { k: 'TEAM', v: 'Team 15' },
    { k: 'PARTNER', v: 'Rolls-Royce' },
    { k: 'STACK', v: 'Qiskit · VQE · SQD' },
  ],

  hero: {
    src: '/assets/gifs/sqd-krylov.gif',
    alt: 'Animated schematic of the SQD pipeline: initial reference state, Krylov subspace via Trotterized time evolution, bitstring sampling, Hamming-weight configuration recovery, subspace diagonalisation',
    caption:
      "The SQD pipeline as it runs in the team's own code — Krylov states built by Trotterized time evolution, sampled in the computational basis, filtered by Hamming weight to keep configurations covering >95% of the probability mass, then diagonalised in that subspace. Ground-state energy (−2.15 eV) and the DFT/depth figures are the repository's reported results; the bitstring histogram and excited-state levels are illustrative, not the team's raw sample counts.",
    highlight:
      "Ground-state energy (−2.15 eV) and the DFT/depth figures are the repository's reported results; the bitstring histogram and excited-state levels are illustrative, not the team's raw sample counts.",
  },

  // Second figure, directly under the hero in the prototype.
  // TODO: render this once the body sections land.
  secondFigure: {
    src: '/assets/gifs/sqd-vqe-dft-energy.gif',
    alt: 'SQD versus DFT ground-state energy across the four adsorption sites: fcc, hcp, bridge, atop',
    caption:
      "Site-by-site comparison, all four numbers real: fcc −2.18 eV vs DFT −2.20 eV (0.9% error), hcp −2.06 vs −2.09 (1.4%), bridge −1.94 vs −1.98 (2.0%), atop −1.71 vs −1.76 (2.8%) — from the team's SQD_vs_SVD_Summary.md, which runs about 0.03 eV lower than the headline fcc figure above (a different sampling run of the same stochastic algorithm — the repo reports both).",
    highlight:
      'fcc −2.18 eV vs DFT −2.20 eV (0.9% error), hcp −2.06 vs −2.09 (1.4%), bridge −1.94 vs −1.98 (2.0%), atop −1.71 vs −1.76 (2.8%)',
  },

  next: [
    {
      kicker: 'NEXT PROJECT',
      title: 'A self-supervised vision transformer for surgical phase recognition',
      desc: 'DINOv2 and V-JEPA2 against a supervised baseline, at 25 ms per inference.',
      to: href('Case Study - Surgical Phase Detection.dc.html'),
    },
  ],
};

export default study;

/**
 * Fully ported from "Case Study - NQCC Rolls-Royce Challenge.dc.html".
 * Prose, both figures, the method table and the links are that file's, verbatim.
 *
 * That prototype uses the sticky-header layout; its header reads
 * "GYANATEET · QUANTUM", and `breadcrumb` carries the second half.
 */
import { href } from '../links.js';

const study = {
  slug: 'nqcc-rolls-royce',
  status: 'full',
  source: 'Case Study - NQCC Rolls-Royce Challenge.dc.html',

  year: 2025,
  lane: 'Quantum',
  desc: 'VQE and sample-based diagonalisation on hydrogen–nickel adsorption',
  featured: true,
  featuredOrder: 8,

  breadcrumb: 'QUANTUM',
  kicker: 'NQCC UK QUANTUM HACKATHON 2025 · TEAM 15',
  title: 'Hydrogen on nickel, on a device that is still noisy',
  lead: 'A Rolls-Royce materials challenge run with VQE and sample-based quantum diagonalisation — and a week spent finding out how much circuit depth the hardware would actually tolerate before the answer stopped meaning anything.',

  meta: [
    { k: 'YEAR', v: '2025' },
    { k: 'EVENT', v: 'NQCC UK Quantum Hackathon' },
    { k: 'TEAM', v: 'Team 15 / participant' },
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
    poster: '/assets/images/sqd-pipeline-poster.png',
  },

  heroPair: [
    {
      src: '/assets/gifs/sqd-krylov.gif',
      alt: 'Animated schematic of the SQD pipeline: initial reference state, Krylov subspace via Trotterized time evolution, bitstring sampling, Hamming-weight configuration recovery, subspace diagonalisation',
      caption:
        "The SQD pipeline as it runs in the team's own code — Krylov states built by Trotterized time evolution, sampled in the computational basis, filtered by Hamming weight to keep configurations covering >95% of the probability mass, then diagonalised in that subspace. Ground-state energy (−2.15 eV) and the DFT/depth figures are the repository's reported results; the bitstring histogram and excited-state levels are illustrative, not the team's raw sample counts.",
      highlight:
        "Ground-state energy (−2.15 eV) and the DFT/depth figures are the repository's reported results; the bitstring histogram and excited-state levels are illustrative, not the team's raw sample counts.",
      poster: '/assets/images/sqd-pipeline-poster.png',
    },
    {
      src: '/assets/gifs/sqd-vqe-dft-energy.gif',
      alt: 'SQD versus DFT ground-state energy across the four adsorption sites: fcc, hcp, bridge, atop',
      caption:
        "Site-by-site comparison, all four numbers real: fcc −2.18 eV vs DFT −2.20 eV (0.9% error), hcp −2.06 vs −2.09 (1.4%), bridge −1.94 vs −1.98 (2.0%), atop −1.71 vs −1.76 (2.8%) — from the team's SQD_vs_SVD_Summary.md, which runs about 0.03 eV lower than the headline fcc figure above (a different sampling run of the same stochastic algorithm — the repo reports both).",
      highlight:
        'fcc −2.18 eV vs DFT −2.20 eV (0.9% error), hcp −2.06 vs −2.09 (1.4%), bridge −1.94 vs −1.98 (2.0%), atop −1.71 vs −1.76 (2.8%)',
      poster: '/assets/images/sqd-vqe-dft-energy-poster.png',
    },
  ],

  sections: {
    problem: {
      num: '01',
      kicker: 'PROBLEM',
      h2: 'A catalysis question with an industrial deadline behind it',
      body: [
        'Hydrogen adsorbing onto a nickel surface is not an academic toy. It sits underneath hydrogen storage, embrittlement, and catalyst design — all of which matter to an engine manufacturer. It is also exactly the kind of strongly-correlated surface chemistry where density functional theory has to make a choice of functional, and where the choice changes the answer.',
        "That is the honest case for putting it on a quantum device: not speed, but a method whose error is structured differently from DFT's. The challenge, set by Rolls-Royce through the NQCC, was to see how far that gets you on hardware available in 2025.",
      ],
    },

    method: {
      num: '02',
      kicker: 'METHOD',
      h2: 'VQE for the variational search, SQD to clean up after it',
      body: 'The surface is reduced to a cluster model and mapped to a qubit Hamiltonian, then attacked from two directions. VQE optimises a parameterised ansatz against the energy expectation, with a classical optimiser in the loop. Sample-based quantum diagonalisation then takes the measured configurations the device actually produced and diagonalises the Hamiltonian in that subspace — which turns noisy samples into a variational bound rather than discarding them.',
      steps: [
        {
          stage: 'MODEL',
          name: 'Cluster Hamiltonian',
          role: 'The nickel surface and adsorbed hydrogen reduced to a tractable cluster, then mapped to qubits — the step that decides everything downstream.',
        },
        {
          stage: 'ANSATZ',
          name: 'Depth-limited circuit',
          role: 'Hardware-native gates and as few entangling layers as the problem tolerates. Depth, not qubit count, was the binding constraint.',
        },
        {
          stage: 'SOLVE',
          name: 'VQE',
          role: 'Variational energy minimisation with a classical optimiser outside the loop and measurement grouping to keep shot counts sane.',
        },
        {
          stage: 'REFINE',
          name: 'SQD',
          role: 'Diagonalise the Hamiltonian in the subspace spanned by the configurations the device actually sampled — accuracy recovered without added depth.',
        },
      ],
      closing:
        'Almost all of the engineering went into depth. Every two-qubit gate is a decoherence event waiting to happen, so the ansatz was cut back repeatedly — fewer entangling layers, hardware-native gate choices, measurement grouping to reduce the number of circuit executions per energy evaluation. The version that ran usefully was considerably shallower than the version that was theoretically better.',
    },

    finding: {
      num: '03',
      kicker: 'FINDING',
      h2: 'The useful result was where the method stops paying',
      body: [
        'Benchmarked against DFT, the hybrid pipeline reproduced the qualitative adsorption behaviour on the reduced cluster — and the point at which noise overwhelmed the variational signal was identifiable and reportable. That boundary is the deliverable. An industrial partner deciding whether to invest in quantum chemistry needs to know where the crossover currently sits far more than they need another optimistic extrapolation.',
        "SQD was the part that surprised me. Treating the device's noisy output as a sampled subspace rather than as a failed measurement recovers a real amount of accuracy for no extra circuit depth, which on NISQ hardware is the only currency that matters.",
        'For the record, read directly from the repository: SQD found −2.15 eV at the fcc site against a DFT reference of −2.20 eV — under 5% error — with circuit depth held below 100 gates; VQE landed at −2.08 eV on the same site. The 4-qubit system is fully implemented; an 8-qubit version is scaffolded; a 127+ qubit architecture is designed on paper, not run. Site ordering held across all four adsorption geometries: fcc binds hardest, then hcp, then bridge, then atop.',
      ],
    },

    // No h2 in the prototype: a lead line and then the record.
    inContext: {
      num: '04',
      kicker: 'IN CONTEXT',
      body: 'The same year, with Quantum Buddies and other teams:',
      record: [
        {
          place: '1ST',
          event: 'YQuantum 2025, Yale',
          desc: "A generalized Shor's-algorithm implementation for quantum ring topologies. Quantum Rings virtual track, not the Yale Grand Prize.",
        },
        {
          place: 'GRAND PRIX',
          event: 'Bradford Quantum Hackathon 2025',
          desc: 'Teammate-reported Grand Prix and first in the Medicine track — hackathon-scale. QD-HMC with a Quixer quantum transformer for genomic sequence prediction, around 90% against a ~80% classical MCMC baseline.',
        },
        {
          place: 'FINALIST',
          event: 'City of London Quantum Hackathon 2025',
          desc: 'Quantum Circuit Born Machines for financial time-series forecasting, with quantum-walk MCMC compared against classical MCMC.',
        },
      ],
    },

    // No h2 in the prototype either: the section is the link grid.
    resources: {
      num: '05',
      kicker: 'RESOURCES',
      links: [
        {
          kind: 'CODE',
          label: 'Team 15 repository',
          meta: 'github.com',
          url: 'https://github.com/Ryukijano/NQCC_UK_Quantum_Hackathon_2025',
        },
        {
          kind: 'COLLECTIVE',
          label: 'Quantum Buddies',
          meta: 'quantum-buddies.github.io',
          url: 'https://quantum-buddies.github.io',
        },
        {
          kind: 'PROFILE',
          label: 'Devpost',
          meta: 'devpost.com',
          url: 'https://devpost.com/Ryukijano',
        },
      ],
    },
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

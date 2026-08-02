/**
 * STUB — hero, meta and lead figure only, taken from
 * "Case Study - YQuantum Shors Algorithm.dc.html".
 *
 * Note: that prototype uses the sticky-header layout; its header reads
 * "GYANATEET · QUANTUM", and `breadcrumb` carries the second half.
 *
 * TODO: port the numbered sections from that file. The schema matches
 * conditional-gqe.js, so this is mechanical.
 */
import { href } from '../links.js';

const study = {
  slug: 'yquantum-shors-algorithm',
  status: 'stub',
  source: 'Case Study - YQuantum Shors Algorithm.dc.html',

  breadcrumb: 'QUANTUM',
  kicker: 'YQUANTUM 2025 · YALE · TEAM QUANTUM BITS',
  title: "Shor's algorithm, built from basic gates",
  lead: 'A from-scratch period-finding implementation on the Quantum Rings SDK — quantum phase estimation, a hand-built modular adder and multiplier, and the exact qubit count where an account permission wall stopped the scaling attempt.',

  meta: [
    { k: 'YEAR', v: '2025' },
    { k: 'EVENT', v: 'YQuantum 2025 (Yale)' },
    { k: 'TEAM', v: 'Quantum bits' },
    { k: 'RESULT', v: '1st — Virtual Participants' },
    { k: 'STACK', v: 'QuantumRingsLib · QPE · IQFT' },
  ],

  hero: {
    src: '/assets/gifs/shor-algorithm.gif',
    alt: "Shor's algorithm pipeline: classical GCD pre-check, quantum phase estimation via controlled modular exponentiation, inverse QFT, continued fractions, and the N=143 scaling attempt",
    caption:
      "The pipeline as it runs in the team's own notebook — classical GCD pre-check, QPE via controlled modular exponentiation (repeated squaring on hand-built quantum arithmetic), inverse QFT, then continued fractions to recover the period. N=15, a=7, 2048 shots and the 21-qubit register split (8 phase + 4 target + 9 ancilla) are the repository's reported run, and 15 = 3 × 5 is the actual reported result; the phase-clock spikes are a schematic of where QPE concentrates probability, not a plotted measurement histogram. The N=143 attempt (41 qubits) is real and reported as unresolved — a Quantum Rings backend permission error, not a completed result.",
    highlight:
      "N=15, a=7, 2048 shots and the 21-qubit register split (8 phase + 4 target + 9 ancilla) are the repository's reported run, and 15 = 3 × 5 is the actual reported result; the phase-clock spikes are a schematic of where QPE concentrates probability, not a plotted measurement histogram. The N=143 attempt (41 qubits) is real and reported as unresolved — a Quantum Rings backend permission error, not a completed result.",
  },

  next: [
    {
      kicker: 'NEXT PROJECT',
      title: 'NQCC UK Quantum Hackathon — Rolls-Royce challenge',
      desc: 'VQE and sample-based quantum diagonalisation on hydrogen-nickel adsorption, with the same team.',
      to: href('Case Study - NQCC Rolls-Royce Challenge.dc.html'),
    },
  ],
};

export default study;

/**
 * Fully ported from "Case Study - YQuantum Shors Algorithm.dc.html".
 * Prose, step rows, hackathon record and links are that file's, verbatim.
 *
 * Note: that prototype uses the sticky-header layout; its header reads
 * "GYANATEET · QUANTUM", and `breadcrumb` carries the second half.
 */
import { href } from '../links.js';

const study = {
  slug: 'yquantum-shors-algorithm',
  status: 'full',
  source: 'Case Study - YQuantum Shors Algorithm.dc.html',

  year: 2025,
  lane: 'Quantum',
  desc: "Period-finding from basic gates on the Quantum Rings SDK",
  featured: true,
  featuredOrder: 2,

  breadcrumb: 'QUANTUM',
  kicker: 'YQuantum 2025 · Yale · Team Quantum Bits',
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

  sections: {
    problem: {
      num: '01',
      kicker: 'PROBLEM',
      h2: 'Factoring by finding a period',
      body: [
        "Factoring a semiprime N is classically hard in the sense that matters: the best known classical algorithms scale sub-exponentially, not polynomially. Shor's algorithm reduces factoring to period-finding — finding the period r of f(x) = a^x mod N for a random a — and solves that period-finding step in polynomial time using quantum phase estimation. Classical pre- and post-processing sandwich the quantum core.",
        'The YQuantum 2025 hackathon (Yale) set this as a build-it-yourself problem against the Quantum Rings SDK (QuantumRingsLib v0.9.0, scarlet_quantum_rings simulator backend) rather than a library call — the point was to construct the quantum arithmetic, not import it.',
      ],
      // the prototype sets this one token in <code> inside that second paragraph
      bodyCode: 'scarlet_quantum_rings',
    },

    method: {
      num: '02',
      kicker: 'METHOD',
      body: 'Every gate in the modular arithmetic was built up from H, CX, CP, T, Tdg and SWAP — no borrowed adder or multiplier. That decision is most of the engineering effort in the repository.',
      // headerless stage/name/role rows, rendered by StepRows in the page file
      steps: [
        {
          stage: 'CLASSICAL',
          name: 'GCD pre-check',
          role: 'Verify a and N share no common factor before spending any quantum resources on a trivial case.',
        },
        {
          stage: 'BUILD',
          name: 'Quantum arithmetic from scratch',
          role: 'QFT/IQFT, decomposed Toffolis, a QFT-based modular adder with explicit reduction logic, and an accumulator-based modular multiplier on top of it.',
        },
        {
          stage: 'SOLVE',
          name: 'QPE + repeated squaring',
          role: 'The phase register drives controlled applications of a^(2^j) mod N onto the target register, one modular multiplication per phase qubit.',
        },
        {
          stage: 'EXTRACT',
          name: 'IQFT, measurement, continued fractions',
          role: 'The measured phase resolves to k/r; continued fractions recover r, then gcd(a^(r/2) ± 1, N) gives the factors.',
        },
      ],
      closing:
        'The modular adder is QFT-based, with explicit modular reduction: subtract N, check the MSB with a multi-controlled X onto a flag ancilla, conditionally add N back, then uncompute the flag. The modular multiplier wraps that adder in an accumulator loop, one controlled addition per bit of the multiplicand, then a controlled swap into the target register and uncomputation of the accumulator. CCX is decomposed from H/T/Tdg/CX; CCCX and multi-controlled X from CCX and CX. Gate count and circuit depth grow roughly as O(n³) or worse as n increases, and qubit count scales as roughly 4n + 1.',
    },

    finding: {
      num: '03',
      kicker: 'FINDING',
      h2: '15 = 3 × 5, and then a wall at 41 qubits',
      body: [
        'With N=15, a=7 and 2048 shots, the circuit measured a phase that continued fractions resolved to period r=4. From there, gcd(7² − 1, 15) = 3 and gcd(7² + 1, 15) = 5 — the correct factorization, on hardware built entirely from basic gates. The run used 21 qubits total: an 8-qubit phase register (2n), a 4-qubit target register (n), and a 9-qubit ancilla register (2n+1).',
        'The framework was configured to attempt N=143 (L=8, requiring 41 qubits) and did not complete it — the backend returned an access error ("the user is not enabled or has access to fewer qubits than requested"), not a computational failure. That is the honest boundary to report: the algorithm\'s gate-count scaling is polynomial in theory, but qubit count and account-level access were the practical limits actually hit, and neither was resolved during the hackathon window.',
      ],
    },

    inContext: {
      num: '04',
      kicker: 'IN CONTEXT',
      body: 'The same year, with Quantum Buddies and other teams:',
      // headerless place/event/desc rows, rendered by RecordRows in the page file
      record: [
        {
          place: '1ST',
          event: 'YQuantum 2025, Yale',
          desc: "This entry — a generalized Shor's-algorithm implementation on the Quantum Rings SDK. Quantum Rings virtual track, not the Yale Grand Prize.",
        },
        {
          place: 'TEAM 15',
          event: 'NQCC UK Quantum Hackathon 2025',
          desc: 'Rolls-Royce materials challenge: VQE and sample-based quantum diagonalisation on hydrogen-nickel adsorption.',
        },
        {
          place: 'GRAND PRIX',
          event: 'Bradford Quantum Hackathon 2025',
          desc: 'Teammate-reported Grand Prix and first in the Medicine track — hackathon-scale. QD-HMC with a Quixer quantum transformer for genomic sequence prediction.',
        },
      ],
    },

    resources: {
      num: '05',
      kicker: 'RESOURCES',
      links: [
        {
          kind: 'CODE',
          label: 'Quantum-bits-YQuantum-2025',
          meta: 'github.com',
          url: 'https://github.com/Quantum-Buddies/Quantum-bits-YQuantum-2025',
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
      title: 'NQCC UK Quantum Hackathon — Rolls-Royce challenge',
      desc: 'VQE and sample-based quantum diagonalisation on hydrogen-nickel adsorption, with the same team.',
      to: href('Case Study - NQCC Rolls-Royce Challenge.dc.html'),
    },
  ],
};

export default study;

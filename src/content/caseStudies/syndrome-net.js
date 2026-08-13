/**
 * Fully ported from "Case Study - Syndrome-Net.dc.html".
 * Prose, figures, table and links are that file's, verbatim.
 */
import { href } from '../links.js';

const study = {
  slug: 'syndrome-net',
  status: 'full',
  source: 'Case Study - Syndrome-Net.dc.html',

  year: 2026,
  lane: 'Quantum',
  desc: 'Workbench for designing and testing quantum error-correction schemes',
  featured: true,
  featuredOrder: 6,

  breadcrumb: 'QUANTUM ERROR CORRECTION',
  kicker: 'SURFACE · COLOUR · qLDPC · BOSONIC',
  title: 'Catching the errors you are never allowed to look at',
  lead: 'A quantum computer cannot be checked for mistakes directly — reading a qubit destroys what it was holding. Error correction works from fingerprints instead. This is a workbench for designing those schemes, testing how well they hold, and being honest about what the test actually ran on.',

  meta: [
    { k: 'YEAR', v: '2026' },
    { k: 'ROLE', v: 'Author' },
    { k: 'STATUS', v: 'Active' },
    { k: 'TASK', v: 'Error correction research' },
    { k: 'STACK', v: 'Stim · RL · GPU kernels' },
  ],

  hero: {
    src: '/assets/gifs/syndrome-net-decode.gif',
    alt: 'A grid of qubits where an error travels invisibly along several links, the detectors at either end light up in response, and the decoder draws its best guess at what connected them — while alongside, each accelerator is tried in turn and rejected until one actually runs',
    caption:
      'The error itself is never observed. Only the detectors at its ends fire, and the repair is inferred from those two points alone. This is a schematic — the fault positions and the machine it settles on are illustrative, not a real run.',
    highlight: 'schematic',
  },

  sections: {
    constraint: {
      num: '01',
      kicker: 'THE CONSTRAINT',
      h2: 'Everything about this is measured indirectly',
      body: [
        'Qubits fail constantly, and you cannot inspect one to find out — looking at it collapses the very state you were protecting. So error correction spreads a single piece of information across many physical qubits and watches a set of side-channels that report whether neighbours disagree, without revealing what any of them holds. Those alarms are all you ever see. From them you have to infer what went wrong and undo it.',
        'Which means the entire field is a guessing game with a scoring function, and the only way to know whether a scheme works is to simulate it at scale — millions of noisy runs, counting how often the guess was wrong. That simulation is the expensive part, so everyone reaches for GPU acceleration. And that is where a quiet failure gets dangerous: when an accelerator does not load, the run does not stop. It falls back, finishes, and hands you numbers that look exactly like the fast ones.',
      ],
    },

    method: {
      num: '02',
      kicker: 'METHOD',
      h2: 'Every result says what produced it',
      body: 'The fix is unglamorous and it is the reason the rest of the work is trustworthy. Nothing is allowed to be quietly substituted. When a fast path is unavailable the run still proceeds, but the result it produces carries a note saying so — which machine did the work, what was tried first, why it was rejected. A number and its provenance travel together, so a result from six months ago can still be interrogated.',
      buildList: [
        'Build the circuit for a chosen code and a chosen noise level, then run it many thousands of times',
        'Watch only the alarms, never the qubits — the decoder gets exactly what a real machine would give it',
        'Guess the underlying fault, apply the repair, and check afterwards whether the protected information survived',
        'Sweep the noise level until the scheme stops helping; that crossing point is what makes a code worth building',
        'Record which machine ran each sweep, and refuse to report a speed that cannot be traced back to hardware',
        'Let an agent propose the settings, so the search is not limited to the parameters a human thought to try',
      ],
      closing:
        'This is a rule the project enforces on itself automatically rather than by discipline. Remove the provenance from any one path and the build refuses to pass — which matters, because the failure it prevents is invisible by construction. Nothing looks wrong when a result loses track of where it came from; it just quietly stops being evidence.',
    },

    scope: {
      num: '03',
      kicker: 'SCOPE',
      h2: 'Several ways to hide a qubit',
      body: 'There is no settled answer to how you should arrange physical qubits to protect a logical one. The competing schemes trade differently: some tolerate more noise, some need fewer qubits, some are easier to actually build. Comparing them fairly means running each through the same harness and scoring it the same way, which is most of what this is for.',
      tableHead: ['FAMILY', 'TRADE-OFF', 'NOTES'],
      tableRows: [
        {
          name: 'Surface code',
          cells: [
            'tolerant, hungry',
            'the default everyone builds against — forgiving of noise, expensive in qubits',
          ],
        },
        {
          name: 'Colour code',
          cells: ['leaner', 'fewer qubits for the same protection, but harder to decode correctly'],
        },
        {
          name: 'Colour code (hex)',
          cells: ['buildable', 'a lattice shaped for how hardware is actually laid out'],
        },
        {
          name: 'qLDPC',
          cells: [
            'efficient, awkward',
            'far better qubit economics; needs connections real chips struggle to provide',
          ],
        },
        {
          name: 'Bosonic',
          cells: [
            'different bet',
            'protect inside a single oscillator rather than across many qubits',
          ],
        },
      ],
      tableCaption:
        'Colour-code work follows Lee & Brown (arXiv:2503.09704) and Entropica Loom (arXiv:2404.08663); the dynamic-code notes track Morvan et al. 2025.',
      closing:
        'Three different jobs get handed to learned agents, and they are not the same job. One reads the alarms and guesses the fault. One tunes the machine while it runs, chasing an operating point that drifts. One searches for a better arrangement of qubits than the ones people have written down. Only the last two are genuinely open-ended, and the framework does not pretend a single agent covers all three.',
    },

    limits: {
      num: '04',
      kicker: 'LIMITS',
      h2: 'Calling it learning does not make it learning',
      body: [
        'The decoding agent sees one set of alarms, makes one guess, and is told whether it was right. Nothing carries forward. That is a classification problem dressed in the language of an agent learning from consequences — there is no sequence to reason about, no earlier choice that shapes a later one. It can be trained this way and it works, but there is no particular reason to expect it to beat simply showing a network many labelled examples of the same thing.',
        'Where the framing earns itself is the other two jobs, because there an action genuinely changes what happens next. Tuning a drifting machine and searching for new code layouts are both problems where consequences accumulate. That is the comparison worth running, and it is not the one people usually reach for.',
        'No performance is claimed here. The point at which a code starts helping rather than hurting is the number that decides whether any of this is worth building, and it is not reported — not because the sweeps cannot be run, but because they have not been published, and it would be exactly the wrong thing to infer from the fact that the code executes.',
        'There is also a gap in the honesty guarantee itself. The system will tell you when a fast path did not engage. It does not verify that a fast path produces the same answer as the slow one when it does — and a silently wrong accelerator is a worse failure than a silently absent one.',
      ],
    },

    artefacts: {
      num: '05',
      kicker: 'ARTEFACTS',
      h2: 'Code and references',
      links: [
        {
          kind: 'CODE',
          label: 'syndrome-net',
          meta: 'framework + RL training',
          url: 'https://github.com/Ryukijano/syndrome-net',
        },
        {
          kind: 'CODE',
          label: 'quantumforge',
          meta: 'Rust/PyO3 kernels',
          url: 'https://github.com/Ryukijano/quantumforge',
        },
        {
          kind: 'PRIOR',
          label: 'arXiv:2503.09704',
          meta: 'Lee & Brown, colour codes',
          url: 'https://arxiv.org/abs/2503.09704',
        },
        {
          kind: 'PRIOR',
          label: 'arXiv:2404.08663',
          meta: 'Entropica Loom',
          url: 'https://arxiv.org/abs/2404.08663',
        },
      ],
      closing:
        'There is a dashboard for working interactively — draw a circuit, watch the alarms light up across a run, sweep the noise level and see where the code stops helping, start a training run and watch it learn. The GPU acceleration lives alongside the rest of the project rather than as an external dependency, so it is always available to test against.',
    },
  },

  next: [
    {
      kicker: 'NEXT CASE STUDY',
      title: 'Conditional-GQE',
      to: href('Case Study - Conditional GQE.dc.html'),
    },
    {
      kicker: 'NEXT CASE STUDY',
      title: 'NQCC Rolls-Royce challenge',
      to: href('Case Study - NQCC Rolls-Royce Challenge.dc.html'),
    },
    { kicker: 'BACK', title: 'All projects', to: href('Revamp E - Method Transfer.dc.html') },
  ],
};

export default study;

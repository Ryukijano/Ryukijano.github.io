/**
 * Fully ported from "Case Study - Conditional GQE.dc.html".
 * Prose, figures, table and links are that file's, verbatim.
 */
import { href } from '../links.js';

const study = {
  slug: 'conditional-gqe',
  status: 'full',
  source: 'Case Study - Conditional GQE.dc.html',

  year: 2026,
  lane: 'Quantum',
  desc: 'Learns circuit shape from the molecule, then a classical optimiser fine-tunes',
  featured: true,
  featuredOrder: 1,

  breadcrumb: 'QUANTUM ALGORITHMS',
  kicker: 'GIC 2026 · MITSUBISHI CHEMICAL GROUP & AIST',
  title: 'A transformer that designs the circuit, not the chemistry',
  lead:
    "To work out a molecule's energy on a quantum computer you first have to guess the shape of the circuit — and someone has to guess it by hand, per molecule. This learns to propose the shape from the molecule itself, and leaves the fine-tuning to a classical optimiser that is better at it.",

  meta: [
    { k: 'YEAR', v: '2026' },
    { k: 'ROLE', v: 'Quantum Buddies' },
    { k: 'VENUE', v: 'GIC 2026 challenge' },
    { k: 'TASK', v: 'Designing the circuit' },
    { k: 'STACK', v: 'CUDA-Q · PyTorch · MAP-Elites' },
  ],

  hero: {
    src: '/assets/gifs/gic2026_journey_loop.gif',
    alt: 'The full pipeline in sequence: a molecule becomes a graph, features are extracted, a policy proposes circuits, collapse is avoided, and the energy descends toward the exact reference before hardware validation',
    caption:
      "The whole loop end to end — molecule to graph, graph to proposed circuit, circuit to energy, and back again as a learning signal. Diagrams on this page are the project's own.",
  },

  sections: {
    constraint: {
      num: '01',
      kicker: 'THE CONSTRAINT',
      h2: 'Guessed by hand, and wrong in both directions',
      body: [
        'The circuit has to be short enough that a real quantum computer can finish it before noise destroys the answer, and rich enough to actually reach the state you are looking for. The short ones tend to land on featureless plateaus where the optimiser has no direction to move in. The rich ones are long enough that the machine falls apart before finishing. Someone picks between these by hand, once, per molecule.',
        'The challenge this was built for has thirty-five molecules in it, from hydrogen up through benzene and iodine compounds. Hand-tuning a circuit for each one does not scale, and that is the real argument for teaching a model to do the guessing — not that it guesses better, but that it guesses at all without a chemist in the loop.',
      ],
      figure: {
        src: '/assets/gifs/vqe_vs_gqe.gif',
        alt: 'Two approaches side by side. The conventional method stalls at the starting energy and never improves. The learned method descends past the chemical-accuracy threshold toward the exact reference',
        caption:
          "The failure this is built against: on larger molecules the conventional approach stalls at the energy it started from and stays there. The absolute values shown are the project's own; the slide does not name which molecule they belong to, so they are not repeated as a claim elsewhere on this page.",
      },
    },

    method: {
      num: '02',
      kicker: 'METHOD',
      h2: 'Let each part do what it is good at',
      body: 'The design decision is a division of labour. The model chooses which operations appear and in what order — a discrete, combinatorial choice, which is the kind of thing language models are good at. It does not try to choose how far each one turns. Earlier attempts folded those continuous angles into the vocabulary as fixed steps, which both bloats the vocabulary and puts a floor under how precise an answer can be. Here they are left to an ordinary numerical optimiser afterwards, which does that job far better.',
      // the prototype italicises "which" inside that first sentence
      emphasis: 'which',
      buildList: [
        'The molecule goes in as a structure — atoms with their charge and bonding character, bonds with their order and length, and the size of the problem overall',
        'The physics of the specific system is fed in alongside it, so one model can serve many molecules',
        'The available operations are drawn from chemistry rather than convenience, and the useless ones are excluded up front',
        'The model learns by comparing a batch of its own attempts against each other rather than against a fixed target',
        'A library of structurally different working circuits is kept, so finding one answer does not stop the search',
        'A classical optimiser then dials in the continuous settings — roughly during training, precisely at the end',
        'A batch whose candidates all score the same is thrown away rather than learned from, since there is nothing in it to learn',
      ],
      figure: {
        src: '/assets/gifs/transformer_architecture.gif',
        alt: 'A decoder emits an operator sequence one token at a time, each generated token feeding back in to condition the next',
        caption:
          'Circuits are written the way a sentence is — one operator at a time, each choice conditioning the next. Sixteen candidate circuits are drawn per molecule, and the sampler is prevented from producing an all-diagonal one.',
      },
      closing:
        'The thing that separates this from earlier work is that it is told what molecule it is looking at. Comparable systems train one model per molecule and start over when the geometry changes. Here the molecular structure — which atoms, bonded how, how far apart, whether they sit in a ring — is fed in as context, so one model is meant to serve many molecules. Whether that actually transfers to a molecule it has never seen is the obvious test, and it has not been run.',
    },

    learning: {
      num: '02b',
      kicker: 'HOW IT LEARNS',
      h2: 'Judge each circuit against its own siblings',
      body: 'There is no correct circuit to copy, so the model cannot be shown answers. Instead it produces a batch of candidates for the same molecule and they are scored relative to each other — better than the batch average is rewarded, worse is discouraged. Learning comes from the spread within the batch rather than from any external target.',
      figure: {
        src: '/assets/gifs/rl_training_loop.gif',
        alt: 'Candidate circuits scored above and below the batch mean, then fed through a replay buffer that mixes older samples back into training and decays that mixture over time',
        caption:
          'Scores are normalised against the batch, and a buffer keeps good circuits in rotation — heavily at first, then tapering to nothing as the policy improves on its own.',
      },
      closing:
        'One guard in that loop matters more than the rest, and it is the same failure the limits section describes. If every candidate in a batch scores identically, the spread is zero and the update is meaningless — worse, it is numerically unstable, since the scores are divided by their own spread. So a batch whose scores agree to within a hair is discarded rather than learned from. That single check is what stops a collapsed batch from quietly poisoning the run.',
    },

    results: {
      num: '03',
      kicker: 'RESULTS',
      h2: 'Six numbers, and none of them measure the same thing',
      body: 'These are not six attempts at one quantity. One is how far off the energy was. One is two simulators disagreeing with each other. One is how cleanly real hardware executed the circuit, which says nothing about whether the energy was right. Two are timings for methods used precisely because the exact calculation is impossible at that size. Averaging them into an accuracy score would be meaningless.',
      tableHead: ['SYSTEM', 'QUBITS', 'FIGURE', 'WHAT IT ACTUALLY TELLS YOU'],
      tableRows: [
        {
          name: 'Methyl iodide (CH₃I)',
          cells: [
            '8q',
            '0.63 mHa',
            'how far the energy landed from the classical answer — comfortably inside chemical accuracy, and far ahead of both baselines',
          ],
        },
        {
          name: 'Hydrogen (H₂)',
          cells: [
            '4q',
            '1.48 mHa',
            'two simulators disagreeing with each other — a consistency check, not a measure of correctness',
          ],
        },
        {
          name: 'IQM Emerald QPU',
          cells: [
            '8q',
            '87.5%',
            'how cleanly real hardware ran the circuit — says nothing about whether the energy was right',
          ],
        },
        {
          name: 'Iodobenzene (FMO2)',
          cells: [
            '12q ← 8q',
            '11.3 mHa',
            'the cost of splitting a molecule up and adding it back together — a third fewer qubits, at a real price',
          ],
        },
        {
          name: 'Ethylene (C₂H₄)',
          cells: [
            '28q',
            '~300 s',
            'an approximation used because exact simulation no longer fits in memory; accuracy is a dial you choose',
          ],
        },
        {
          name: 'Benzene (C₆H₆)',
          cells: [
            '40q',
            '~19 s',
            'a sampled estimate at a size where exact calculation is impossible — a timing, not a correctness claim',
          ],
        },
      ],
      tableCaption:
        'Chemical accuracy — the threshold below which an answer is useful to a chemist — is 1.6 mHa. Where a reference is called exact it means exact within the simplified system being modelled, not exact for the real molecule. The methyl iodide figure comes from a controlled comparison on a smaller version of that system than the full challenge instance.',
      tableCaptionHighlight: 'within the simplified system being modelled',
      figure: {
        src: '/assets/gifs/hpc_qpu_workflow.gif',
        alt: 'Jobs dispatched to several quantum processors, their results retrieved asynchronously and merged into a single energy rather than blocking on any one queue',
        caption:
          'Hardware runs are fired off and collected later rather than waited on. Real quantum processors sit behind queues measured in hours, so anything that blocks on one is a pipeline that mostly does nothing.',
      },
      closing:
        'The fragment result is the one that means something practically. Rather than running a whole molecule at once, it is broken into overlapping pieces, each piece run separately, and the total reassembled from the parts — recovering a twelve-qubit answer from circuits a third smaller. That matters because circuit width is the binding constraint on real hardware. The reassembly is not free and the page reports what it costs: the pieces do not quite add up to the whole, and the gap is larger than the accuracy target. That the gap is non-zero is the point — it means the decomposition is doing real work rather than quietly recomputing the original.',
    },

    limits: {
      num: '04',
      kicker: 'LIMITS',
      h2: 'It finds the loophole before it finds the chemistry',
      body: [
        'Left alone, the model discovers a class of operations that are technically valid and do nothing. They leave the starting state untouched, so the energy never moves, so every attempt scores identically — and once every attempt scores the same, there is nothing to learn from. Training does not crash. It flatlines while looking entirely healthy, which is worse. This is the first thing that happens, every time, and it is a known trap in this whole family of methods.',
        'Four defences, stacked, because none holds alone. The menu of available operations is built so the useless ones are not in it. The model is stopped from producing a circuit made entirely of them. The scoring explicitly penalises circuits whose parts do not interact. And if a whole batch scores identically anyway, that batch is discarded instead of being learned from — a last line of defence against exactly the flatline described above. On top of all that, a diversity archive keeps a library of structurally different circuits that work, so finding one good answer does not end the search.',
        'Where it stops. The central claim — one model, many molecules — is untested on molecules it has not seen. That is the whole point of the design and the experiment that would demonstrate it has not been run, so nothing here shows the approach generalising rather than memorising. The headline accuracy figures are individual cases, not a pass rate across the full set. The hardware number says the circuit executed cleanly, not that the answer was right; no claim is made that chemical accuracy has been reached on a real machine. And past roughly twenty-eight qubits nothing here is exact — the memory required to simulate honestly runs out, and the larger results are approximations whose quality depends on choices that are themselves being estimated.',
      ],
    },

    checkIt: {
      num: '⌥',
      kicker: 'CHECK IT',
      h2: "Don't take my word for it",
      body: 'Everything below runs in this page — a real four-qubit simulator, a real energy, a real gradient computed by finite difference. Click any operator to swap it. Then press optimise and watch what happens.',
      caption:
        'The Hamiltonian here is a toy — its coefficients are chosen, not taken from a molecule. That does not weaken the demonstration: the vanishing gradient is a property of diagonal operators acting on a computational basis state, and holds for any Hamiltonian whatsoever.',
      captionHighlight: 'toy',
    },

    artefacts: {
      num: '05',
      kicker: 'ARTEFACTS',
      h2: 'Code, weights, hardware',
      links: [
        {
          kind: 'CODE',
          label: 'Conditional_GQE',
          meta: 'Quantum Buddies',
          url: 'https://github.com/Quantum-Buddies/Conditional_GQE',
        },
        {
          kind: 'WEIGHTS',
          label: 'h-cgqe-gic2026',
          meta: 'Hugging Face',
          url: 'https://huggingface.co/Ryukijano/h-cgqe-gic2026',
        },
        {
          kind: 'PRIOR',
          label: 'arXiv:2401.09253',
          meta: 'GPT-QE, Nakaji et al.',
          url: 'https://arxiv.org/abs/2401.09253',
        },
        {
          kind: 'PRIOR',
          label: 'arXiv:2603.24298',
          meta: 'SpinGQE, Mindbeam AI',
          url: 'https://arxiv.org/abs/2603.24298',
        },
      ],
      closing:
        "Built with Quantum Buddies for the Mitsubishi Chemical Group and AIST Quantum Challenge, GIC 2026. Training, circuit generation and angle optimisation all run on conventional GPUs before anything is sent to hardware; the quantum processors are reached through qBraid, across Rigetti, IonQ and IQM. Diagrams on this page are the project's own. Prior art the work positions against: GPT-QE (Nakaji et al., arXiv:2401.09253) and SpinGQE (Mindbeam AI, arXiv:2603.24298).",
    },
  },

  next: [
    {
      kicker: 'NEXT CASE STUDY',
      title: 'NQCC Rolls-Royce challenge',
      to: href('Case Study - NQCC Rolls-Royce Challenge.dc.html'),
    },
    {
      kicker: 'NEXT CASE STUDY',
      title: "Generalised Shor's algorithm",
      to: href('Case Study - YQuantum Shors Algorithm.dc.html'),
    },
    {
      kicker: 'BACK',
      title: 'All projects',
      to: href('Revamp E - Method Transfer.dc.html'),
    },
  ],
};

export default study;

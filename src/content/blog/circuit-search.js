export default {
  slug: 'circuit-search',
  written: 'Aug 2026',
  area: 'Search',
  title: 'Energy as a reward',
  desc: 'Hybrid search and RL on circuits: a prior proposes, a score keeps or kills.',
  lead:
    'Some domains do not hand you a demonstration of the right circuit. They hand you a score — an energy, a residual — and a generator that can propose another candidate. After cloning actions on a small VLA, this is how I actually spent a prior on molecules: propose a structure, read an energy, keep or kill. Same clone-versus-search cut as post-training, with a Hamiltonian instead of a preference model.',
  concept: {
    src: '/assets/gifs/notes/sft-then-rl.gif',
    poster: '/assets/images/notes/sft-then-rl-poster.png',
    alt: 'Schematic of a search loop reading a score',
    caption:
      'Schematic of search: a prior proposes, a score updates. Framing, not measured. Here the score is an energy, not a chatbot judge.',
    highlight: ['Schematic', 'Framing, not measured'],
  },
  taxonomy: {
    title: 'WHAT IS BEING SEARCHED',
    caption: 'GQE literature (Nakaji et al., conditional-GQE at RSC) is prior art the challenge sits on. I am not a coauthor of those papers.',
    branches: [
      { name: 'Clone a circuit', items: ['SFT on known ansatze', 'rarely the point'] },
      { name: 'Score a circuit', items: ['energy', 'residual', 'logical fail'] },
      { name: 'Search', items: ['RL on generators', 'evolutionary', 'Bayesian'] },
    ],
  },
  sections: [
    {
      kicker: 'THE JOB',
      heading: 'Propose structure, then read physics',
      body: [
        'A variational circuit family is a prior over programs. Measuring an energy is a score. The learning problem is: update the generator so later proposals score better. That can be gradient on continuous parameters (VQE), or a discrete search over gate strings (GQE-shaped generators, RL, evolutionary strategies).',
        'The clone-versus-search cut still holds. You almost never have a dataset of “correct” circuits for a new molecule. You have a Hamiltonian. So you search.',
      ],
    },
    {
      kicker: 'MECHANICS',
      heading: 'The score is expensive and noisy',
      body: [
        'Each candidate may be a quantum circuit on a simulator or a device, or a classical surrogate. Shot noise, barren plateaus, and compiler rewrites are the environment. Reward shaping — energy versus residual versus a classification of “this looks like a known ansatz” — changes which circuits survive.',
        'Hybrid loops mix a cheap classical proposal with an expensive quantum or DFT read. Which part of the score you can afford per step is the constraint.',
      ],
    },
    {
      kicker: 'THE DOMAIN',
      heading: 'The scores I actually ran',
      body: [
        'Conditional GQE proposes an ansatz because there is no dataset of correct circuits for a new molecule — only an energy. I am not a coauthor of Nakaji et al., or of the GQE papers that challenge sits on. NQCC was hydrogen-on-nickel, VQE and sample-based diagonalisation, run as a participant.',
        'Shor was period-finding at N=15, 2048 shots, on a simulator. That score is whether the hand-built arithmetic factored 15, not a Hamiltonian. It is not cryptographically relevant factoring.',
      ],
    },
  ],
  instance: {
    quote:
      'Conditional GQE is search under an energy. NQCC was a hydrogen-on-nickel score I ran as a participant. Shor was hand-built period-finding at N=15, 2048 shots — a constructed circuit, not a search loop.',
    attribution: 'SEARCH, NOT A LEADERBOARD',
    workSlug: 'conditional-gqe',
    workLabel: 'Conditional GQE',
    also: { workSlug: 'nqcc-rolls-royce', workLabel: 'NQCC / Rolls-Royce' },
    gif: {
      src: '/assets/gifs/rl_training_loop.gif',
      alt: 'Generator reading a reward in a training loop',
      caption:
        'An instance of a search loop on circuit generation. Schematic of the job, not a challenge win.',
      highlight: 'schematic',
    },
  },
};

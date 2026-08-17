export default {
  slug: 'qec-supervision',
  written: 'Aug 2026',
  area: 'QEC',
  title: 'What the decoder is allowed to know',
  desc: 'Supervised recovery, learning noise from syndromes, and why hardware withholds the label.',
  lead:
    'Once error correction is a mapping from syndrome to recovery, the next cut is the supervision. Do you train against the true error, because a simulator gave it to you. Do you only see syndromes and have to infer a noise model. Do you only see whether the logical qubit lived. Those are three datasets pretending to be one field.',
  taxonomy: {
    title: 'WHAT YOU ARE SHOWN',
    caption:
      'Schematic of three supervision regimes. NVIDIA-style neural pre-decoders that feed matching are supervised machines in this taxonomy. I have read that line. I did not ship it.',
    branches: [
      { name: 'Supervised', items: ['true error from Stim', 'paired recovery', 'neural pre-decoder'] },
      { name: 'Noise from s', items: ['infer Pauli weights', 'unsupervised-ish likelihood'] },
      { name: 'Logical reward', items: ['survived or not', 'RL / search on shots'] },
    ],
  },
  sections: [
    {
      kicker: 'THE JOB',
      heading: 'Pick the information the update is allowed to use',
      body: [
        'Supervised decoding is imitation of a teacher that saw the noise channel. In simulation that teacher is cheap: Stim sampled the Paulis. A network can regress a matching, a heat map of fault locations, or a residual to hand to MWPM. That is a standard structured-prediction setup with a simulator leaking the label.',
        'Unsupervised and weakly supervised variants try to stop leaking. One line estimates noise weights from syndrome statistics alone. Another treats logical failure as a sparse reward and searches. Both are closer to what a fridge will give you. Both are easier to fool.',
      ],
    },
    {
      kicker: 'MECHANICS',
      heading: 'Leakage is the whole method',
      body: [
        'If your training set includes the true error, you are answering: how well can a model imitate an oracle that hardware will never be. That is still useful — as a pre-decoder, as a proposal, as a way to study capacity. It is not the same paper as “we learned the channel from s.”',
        'If you only have syndromes, identifiability is the mechanic. Many noise models explain the same click pattern. Regularisers, code structure, and assumed independence are doing as much work as the network. If you only have logical fail/succeed, you are back in the post-training map: a score, then search.',
      ],
    },
    {
      kicker: 'THE DOMAIN',
      heading: 'Simulation is not the fridge',
      body: [
        'Almost every published neural decoder is trained on a noise model. Transfer to a device is a domain shift: leakage, crosstalk, time-varying calibration. A workbench that records which simulator and which decoder ran is the minimum honesty. A blog post that says “unsupervised QEC” without saying what was withheld is not.',
        'Ising-style physical decoders and 3D-CNN pre-decoders are landscape I have read because they rhyme with a matching graph. They are not my architecture.',
      ],
    },
  ],
  instance: {
    quote:
      'The workbench can emit supervised labels because it sampled the noise. That is a gift. On a device I would not have it. Keeping those two regimes in different columns is the whole note.',
    attribution: 'THE LABEL IS A SIMULATOR PRIVILEGE',
    workSlug: 'syndrome-net',
    workLabel: 'Syndrome-Net',
  },
  next: { slug: 'circuit-search', label: 'Search on circuits' },
};

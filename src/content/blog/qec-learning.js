export default {
  slug: 'qec-learning',
  written: 'Aug 2026',
  area: 'QEC',
  title: 'Error correction is a learning problem',
  desc: 'Syndromes in, a recovery out: structured prediction you cannot look at the state to grade.',
  lead:
    'A quantum memory cannot be inspected without destroying it. Error correction therefore never sees the error. It sees a syndrome — a pattern of detector clicks — and has to emit a recovery. That is structured prediction under a brutal constraint: the label you care about is hidden, and the score arrives only after you have already acted.',
  concept: {
    src: '/assets/gifs/notes/qec-pipeline.gif',
    poster: '/assets/images/notes/qec-pipeline-poster.png',
    alt: 'Schematic pipeline from hidden error through syndrome to inferred recovery',
    caption:
      'Schematic: observation stays hidden; detectors fire; a decoder infers a recovery. Framing, not measured — not a device run.',
    highlight: ['Schematic', 'Framing, not measured'],
  },
  taxonomy: {
    title: 'THE PIPE',
    caption: 'Each arrow is a different job. Collapsing them into “QEC” hides which one you are learning.',
    branches: [
      { name: 'Hide', items: ['physical qubits', 'noise you cannot look at'] },
      { name: 'Detect', items: ['stabilisers', 'syndrome'] },
      { name: 'Infer', items: ['error hypothesis', 'latent fault'] },
      { name: 'Act', items: ['recovery', 'decoder output'] },
    ],
  },
  equations: [
    {
      label: 'What the decoder actually gets',
      expr: 'error  ↛  decoder,     syndrome(s)  →  recovery',
    },
  ],
  sections: [
    {
      kicker: 'THE JOB',
      heading: 'Guess the fault from the alarms',
      body: [
        'Classical error correction can often reread a bit. Quantum error correction cannot. You spread one logical qubit across many physical ones and watch side-channels that report whether neighbours disagree, without revealing what any neighbour holds. Those alarms are the syndrome. The decoder maps syndrome to recovery. If the guess was wrong, the logical state has already flipped.',
        'That mapping is a learning problem whether or not you put a neural net on it. Matching graphs, tensor networks, and lookup tables are decoders. So are convolutional nets and transformers. The objective is: given s, emit a recovery whose residual error is trivial on the code space.',
      ],
    },
    {
      kicker: 'MECHANICS',
      heading: 'The label is delayed and partial',
      body: [
        'Supervised decoding needs a ground-truth error or a paired recovery, usually from simulation: you sampled the noise, so you know what happened. On hardware you do not. You only know whether a logical observable survived a round. That is closer to a reward than to a dense label.',
        'Scale is the other mechanic. A useful decoder is tested on millions of noisy shots because logical error rates are small. GPU paths, fallbacks, and provenance are part of the learning system: a number without the machine that produced it is not evidence. That is engineering. It is also why this is a domain and not a toy XOR.',
      ],
    },
    {
      kicker: 'THE DOMAIN',
      heading: 'Codes as different structured-prediction graphs',
      body: [
        'Surface, colour, qLDPC, bosonic — they change the syndrome graph, the noise, and what a cheap decoder even is. Comparing them fairly means the same harness and the same scoring, not a new architecture per paper title.',
        'The workbench I keep is for that comparison. It is not a claim that I invented matching-graph decoding, and it is not NVIDIA’s Ising decoder.',
      ],
    },
  ],
  instance: {
    quote:
      'Syndrome-Net is a workbench: build a code, sample noise, give the decoder only the alarms, record which machine ran the sweep. The GIF is a schematic of that pipe, not a logical-error curve from a fridge.',
    attribution: 'STRUCTURED PREDICTION WITH THE STATE HIDDEN',
    workSlug: 'syndrome-net',
    workLabel: 'Syndrome-Net',
    gif: {
      src: '/assets/gifs/syndrome-net-decode.gif',
      alt: 'Detectors lighting and a decoder guessing a path between them',
      caption:
        'An instance of syndrome-to-recovery. The fault positions are schematic, not a real run.',
      highlight: 'schematic',
    },
  },
  next: { slug: 'qec-supervision', label: 'Supervised vs unsupervised QEC' },
};

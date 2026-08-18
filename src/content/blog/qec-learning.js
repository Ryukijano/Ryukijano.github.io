export default {
  slug: 'qec-learning',
  written: 'Aug 2026',
  area: 'QEC',
  title: 'Error correction is a learning problem',
  desc: 'Syndromes in, a recovery out: structured prediction you cannot look at the state to grade.',
  lead:
    'A quantum memory cannot be inspected without destroying it. Error correction therefore never sees the error. It sees a syndrome — a pattern of detector clicks — and has to emit a recovery. That is structured prediction with the state hidden: the label you care about is not in the input, and the score arrives only after you have already acted.',
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
        'Classical bits can be copied and measured in place. A quantum memory cannot: you measure stabilisers that commute with the logicals, never the data in the computational basis. Those alarms are the syndrome. The decoder maps detectors to a recovery. Logical failure is a residual that is invisible to the stabilisers but flips a logical observable — not every wrong physical guess.',
        'That mapping is a learning problem whether or not you put a neural net on it. Matching graphs, tensor networks, and lookup tables are decoders. So are convolutional nets and transformers. The objective is: given s, emit a recovery whose residual error is trivial on the code space.',
      ],
    },
    {
      kicker: 'MECHANICS',
      heading: 'The label is delayed and partial',
      body: [
        'Supervised decoding needs a ground-truth error or a paired recovery, usually from simulation: you sampled the noise, so you know what happened. On hardware you see detectors, then a logical measurement at the end of the shot. The decoder never sees the hidden error; the score is whether, after the recovery, the residual is trivial on the codespace — not whether every physical fault was named. That is closer to a reward than to a dense label.',
        'Scale is the other mechanic. A useful decoder is tested on millions of noisy shots because logical error rates are small. GPU paths, fallbacks, and provenance are part of the learning system: a number without the machine that produced it is not evidence.',
      ],
    },
    {
      kicker: 'THE DOMAIN',
      heading: 'I already had the problem of not looking at the state',
      body: [
        'Surgical video is structured prediction on what the camera will give you, not on a true state you can open and read. QEC is that job with the observation cut further back: the decoder sees a syndrome, never the error, and emits a recovery. Syndrome-Net is the workbench I built once that constraint showed up again. Code families change the syndrome graph; they do not change the job.',
        'Matching graphs, tensor networks, lookup tables, convolutional nets are different decoders for the same mapping. Comparing them fairly means the same harness and the same scoring; that is what the workbench is for. I have read NVIDIA’s neural pre-decoders that feed matching. I did not train them, and they are not this workbench.',
      ],
    },
  ],
  instance: {
    quote:
      'Syndrome-Net is a workbench: build a code, sample noise, give the decoder only the syndrome, emit a recovery, record which machine ran the sweep. The GIF is a schematic of that pipe, not a logical-error curve from a fridge.',
    attribution: 'STRUCTURED PREDICTION WITH THE STATE HIDDEN',
    workSlug: 'syndrome-net',
    workLabel: 'Syndrome-Net',
    gif: {
      src: '/assets/gifs/syndrome-net-decode.gif',
      poster: '/assets/images/syndrome-net-decode-poster.png',
      alt: 'Detectors lighting and a decoder guessing a path between them',
      caption:
        'An instance of syndrome-to-recovery. The fault positions are schematic, not a real run.',
      highlight: 'schematic',
    },
  },
  next: { slug: 'qec-supervision', label: 'Supervised vs unsupervised QEC' },
};

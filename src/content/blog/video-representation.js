export default {
  slug: 'video-representation',
  written: 'Aug 2026',
  area: 'Video',
  title: 'Video is not a bag of frames',
  desc: 'Temporal structure, and three different questions you can ask of one camera.',
  lead:
    'A still encoder sees a rectangle. A video encoder has to decide whether time is a stack of rectangles, a sequence of tokens, or a latent that already contains motion. That decision is the representation.',
  concept: {
    src: '/assets/gifs/notes/video-temporal.gif',
    poster: '/assets/images/notes/video-temporal-poster.png',
    alt: 'Schematic comparing shuffled frames with an ordered temporal encoder',
    caption:
      'Schematic: a bag of shuffled frames against an ordered stream through a temporal encoder. Framing, not measured.',
    highlight: ['Schematic', 'Framing, not measured'],
  },
  sections: [
    {
      kicker: 'THE JOB',
      heading: 'Say what “understanding” is before you train',
      body: [
        'People say video understanding as if it were one benchmark. It is at least three jobs that happen to share a camera. A phase label is a coarse narrative: what step of a procedure is this. A track is an identity through occlusion. A future frame is a physical guess. The same footage can host all three. The losses cannot.',
        'A bag-of-frames baseline encodes each still, then pools. It can work when the label is visible in a single good frame. It fails when the label is an order of events, a tool that left the image, or a motion that never appears in one still.',
      ],
    },
    {
      kicker: 'MECHANICS',
      heading: 'Temporal heads versus video-native pretraining',
      body: [
        'One stack freezes a still encoder and trains a small temporal model on the resulting sequence — an MS-TCN, a transformer over frame tokens, even an HMM if you are old enough. The visual geometry is borrowed. Time is the only thing the labelled set has to teach.',
        'The other stack pretrains on video: masked tubelets, latent prediction across time, contrastive clips. Then the temporal structure is already in the encoder, and the head can be even smaller, or the encoder can be probed. The cost is video-scale compute. The temptation is to call the first stack “a video model” because the input is an mp4.',
      ],
    },
    {
      kicker: 'THE DOMAIN',
      heading: 'One theatre, three learning problems',
      body: [
        'Endoscopic footage is a useful domain because it is long, repetitive, and poorly labelled. Phase recognition asks for a narrative. Tool tracking asks for identity. Prediction asks for dynamics. If you write three project diaries you will miss that they are one camera under three objectives.',
        'Transfer between them is not free. A phase head does not give you tracks. A predictive latent does not give you a clinical phase. The representation is whatever leftover geometry those objectives left in the weights.',
      ],
    },
  ],
  instance: {
    quote:
      'Phase, track, and next-frame are three domains on similar surgical video. The case studies keep the numbers. This note is only the claim that they are different jobs.',
    attribution: 'ONE CAMERA, THREE OBJECTIVES',
    workSlug: 'surgical-phase-detection',
    workLabel: 'Phase recognition',
    also: { workSlug: 'got-jepa-tool-tracking', workLabel: 'Tool tracking' },
    gif: {
      src: '/assets/gifs/gotjepa-occlusion.gif',
      alt: 'Tool tracks continuing through occlusion in laparoscopic video',
      caption:
        'An instance of identity through occlusion — a tracking job, not a phase label. The motion is an example of the domain, schematic of the objective rather than a published leaderboard.',
      highlight: 'schematic',
    },
  },
};

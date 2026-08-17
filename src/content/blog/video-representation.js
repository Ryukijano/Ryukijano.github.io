export default {
  slug: 'video-representation',
  written: 'Aug 2026',
  area: 'Video',
  title: 'Video is not a bag of frames',
  desc: 'Temporal structure, and three different questions you can ask of one camera.',
  lead:
    'A still encoder sees a rectangle. Video is that rectangle asked to keep order, keep an identity after the tool leaves the frame, or guess what happens next. The camera can be shared. The losses cannot.',
  concept: {
    src: '/assets/gifs/notes/video-temporal.gif',
    poster: '/assets/images/notes/video-temporal-poster.png',
    alt: 'Schematic comparing shuffled frames with an ordered temporal encoder',
    caption:
      'Schematic: a bag of shuffled frames against an ordered stream through a temporal encoder. Framing, not measured.',
    highlight: ['Schematic', 'Framing, not measured'],
  },
  taxonomy: {
    title: 'SAME CAMERA',
    caption: 'Three objectives. One stream. The losses cannot be shared just because the pixels can.',
    branches: [
      { name: 'Phase', items: ['what stage?', 'coarse narrative'] },
      { name: 'Tracking', items: ['where is this entity?', 'identity through occlusion'] },
      { name: 'Prediction', items: ['what happens next?', 'dynamics'] },
    ],
  },
  equations: [
    { label: 'Bag of frames', expr: 'f(x_t)  →  pool { f(x_t) }' },
    { label: 'Temporal encoder', expr: 'f(x_1:T)  →  z_1:T  →  h_temporal' },
  ],
  sections: [
    {
      kicker: 'THE JOB',
      heading: 'Three jobs that share a camera',
      body: [
        'Video is at least three jobs that happen to share a camera. A phase label is a coarse narrative: what step of a procedure is this. A track is an identity through occlusion. A future frame is a guess about upcoming pixels, not a phase name and not a physics engine. The same footage can host all three. The losses cannot.',
        'A bag-of-frames baseline encodes each still, then pools. It can work when the label is visible in a single good frame. It fails when the label is an order of events, a tool that left the image, or a motion that never appears in one still.',
      ],
    },
    {
      kicker: 'MECHANICS',
      heading: 'Temporal heads versus video-native pretraining',
      body: [
        'One stack freezes a still encoder and trains a small temporal model on the resulting sequence — an MS-TCN, or a transformer over frame tokens. The visual geometry is borrowed. Time is the only thing the labelled set has to teach.',
        'The other stack pretrains on video: masked tubelets, or latent prediction across time. Then some temporal structure is already in the encoder. The cost is video-scale compute, and a larger encoder may still want the same small head; what changes is transfer and latency, not a free shrinking of the labelled model. The temptation is to call the first stack “a video model” because the input is an mp4.',
      ],
    },
    {
      kicker: 'THE DOMAIN',
      heading: 'One theatre, three learning problems',
      body: [
        'Endoscopic footage is long, poorly labelled, and already a time series. Phase recognition asks for a coarse narrative: which step of ESD is this. Tracking asks which grasper is which after smoke. Prediction asks for the next frames of a suture. One theatre, three learning problems. The labelled set that can support one of them will not automatically support the others.',
        'Transfer is not free. A frozen still encoder plus a tiny temporal head can name a phase that sits in a good frame. It does not follow a tool that left, and a VAE that paints t+20 does not output a clinical phase. The representation is whatever geometry that job left in the weights.',
      ],
    },
  ],
  instance: {
    quote:
      'Phase, track, and next-frame are three jobs on similar surgical video. The thesis paid for twenty frames of a suture. The intern year paid for a phase. The tracker pays for identity through smoke. The case studies keep the numbers.',
    attribution: 'ONE CAMERA, THREE OBJECTIVES',
    workSlug: 'surgical-phase-detection',
    workLabel: 'Phase recognition',
    also: { workSlug: 'got-jepa-tool-tracking', workLabel: 'GOT-JEPA tool tracking' },
    gif: {
      src: '/assets/gifs/gotjepa-occlusion.gif',
      alt: 'Tool tracks continuing through occlusion in laparoscopic video',
      caption:
        'An instance of identity through occlusion — a tracking job, not a phase label. The motion is an example of the domain, schematic of the objective rather than a published leaderboard.',
      highlight: 'schematic',
    },
  },
  next: { slug: 'video-language', label: 'Video-language' },
};

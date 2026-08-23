export default {
  slug: 'contrastive-ssl',
  written: 'Aug 2026',
  area: 'SSL geometry',
  title: 'Two views, and the thing that must not collapse',
  desc: 'Contrastive learning and self-distillation are sibling ways to grow a geometry without labels.',
  lead:
    'A representation is a geometry you can reuse, not a class name. Contrastive methods grow it with InfoNCE: the positive pair is identified against in-batch (SimCLR) or queued (MoCo) negatives, not shoved across a margin. Self-distillation methods match a student to a teacher without a negative batch. Collapse is the shared failure, and DINO belongs to the second family.',
  concept: {
    src: '/assets/gifs/notes/ssl-family.gif',
    poster: '/assets/images/notes/ssl-family-poster.png',
    alt: 'Schematic splitting contrastive negatives from teacher–student self-distillation',
    caption:
      'Schematic of two SSL families, not one method with aliases. Contrastive uses negatives; self-distillation uses a teacher. Framing, not measured.',
    highlight: ['Schematic', 'Framing, not measured'],
  },
  taxonomy: {
    title: 'FAMILY',
    caption: 'DINO is self-distillation without labels, with a momentum teacher; not InfoNCE with extra crops.',
    branches: [
      { name: 'Contrastive', items: ['InfoNCE', 'SimCLR', 'MoCo'] },
      { name: 'Self-distillation', items: ['BYOL', 'SimSiam', 'DINO'] },
    ],
  },
  equations: [
    {
      label: 'InfoNCE',
      expr: 'L = −log[ exp(sim(z_i^(1), z_i^(2))/τ) / Σ_j exp(sim(z_i^(1), z_j)/τ) ]',
    },
  ],
  sections: [
    {
      kicker: 'THE JOB',
      heading: 'Arrange points so views of one instance sit together',
      body: [
        'A classifier outputs a name. A representation outputs a vector you can reuse: retrieval, a linear probe, a detection head, a temporal model. You manufacture positives (crops, colour jitter, adjacent frames) and you ask the encoder to treat those as the same object.',
        'Contrastive methods identify the positive among negatives with InfoNCE: SimCLR on the batch, MoCo on a queue. BYOL and SimSiam drop negatives and predict a teacher representation; DINO matches a student softmax to a centred, sharpened teacher. The job is still a geometry. The anti-collapse device is not.',
      ],
    },
    {
      kicker: 'MECHANICS',
      heading: 'Collapse is the default',
      body: [
        'If every vector is the same constant, agreement is free. In DINO the same cheap trick is a uniform softmax, or one prototype that wins every image. Collapse is the encoder discovering that the cheapest way to make two views agree is to ignore the image. Contrastive methods fight it with negatives, a large batch (SimCLR) or a queue (MoCo), plus a projection head you throw away at probe time. SimSiam needs a stop-gradient and a predictor; BYOL adds a momentum teacher, still with a predictor; DINO uses a momentum teacher plus centring and sharpening, and does not need a predictor.',
        'Augmentations define the invariance you are buying. Crop hard and you buy object-ish features. Blur and colour-jitter and you buy shape over palette.',
      ],
    },
    {
      kicker: 'THE DOMAIN',
      heading: 'What counts as a view when the scene is a procedure',
      body: [
        'On web photos, a view is a crop and a colour jitter. On a procedure that assumption is a claim about the camera: that a hook and a patch of mucosa still sit in the same geometry after glare, zoom, and a crop that might drop the instrument. If the invariance deletes the tool, the space will be faithful to a world nobody operates in.',
        'A frozen DINOv2 encoder on endoscopic video is that geometry spent on a new camera, not a new method. Downstream phase heads and detectors do not have to be distilled. A YOLO trained on potholes is a labelled detector. Mixing those jobs in one sentence is how a supervised paper gets misread as pretraining.',
      ],
    },
  ],
  instance: {
    quote:
      'DINOv2 features are what I actually used on endoscopic video: two unlabelled adaptation stages, then a frozen encoder plus a head. That is self-distillation spent on a new camera, not SimCLR, and not a paper that introduced DINO. The domain question is whether teacher–student features still separate a hook from tissue when the camera is wet and close.',
    attribution: 'SELF-DISTILLATION ON SURGICAL VIDEO',
    workSlug: 'surgical-phase-detection',
    workLabel: 'Surgical phase recognition',
  },
  next: { slug: 'predictive-ssl', label: 'Predictive SSL' },
};

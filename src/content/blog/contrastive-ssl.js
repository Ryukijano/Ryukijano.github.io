export default {
  slug: 'contrastive-ssl',
  written: 'Aug 2026',
  area: 'SSL geometry',
  title: 'Two views, and the thing that must not collapse',
  desc: 'Contrastive learning and self-distillation are sibling ways to grow a geometry without labels.',
  lead:
    'A representation is a geometry, not a class name. Two large families grow that geometry without y: contrastive methods that push negatives apart, and self-distillation methods that match a teacher without a negative batch. Collapse is the shared failure. DINO lives in the second family.',
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
    caption: 'DINO is self-distillation without labels, with a momentum teacher — not InfoNCE with extra crops.',
    branches: [
      { name: 'Contrastive', items: ['InfoNCE', 'SimCLR', 'MoCo'] },
      { name: 'Self-distillation', items: ['BYOL', 'SimSiam', 'DINO'] },
    ],
  },
  equations: [
    {
      label: 'Contrastive geometry',
      expr: 'sim(z_i^(1), z_i^(2))  ≫  sim(z_i, z_j)',
    },
  ],
  sections: [
    {
      kicker: 'THE JOB',
      heading: 'Arrange points so views of one instance sit together',
      body: [
        'A classifier outputs a name. A representation outputs a vector you can reuse: retrieval, a linear probe, a detection head, a temporal model. You manufacture positives — crops, colour jitter, adjacent frames — and you ask the encoder to treat those as the same object.',
        'Contrastive methods (InfoNCE, SimCLR, MoCo) also manufacture negatives, usually the rest of the batch, and maximise a margin between positive pairs and those negatives. Self-distillation methods (BYOL, SimSiam, DINO) drop the explicit negative set and match a student to a teacher distribution instead. The job is still a geometry. The anti-collapse device is not.',
      ],
    },
    {
      kicker: 'MECHANICS',
      heading: 'Collapse is the default',
      body: [
        'If every vector is the same constant, agreement is free. Collapse is the encoder discovering that the cheapest way to make two views agree is to ignore the image. Contrastive methods fight it with negatives, large batches, and a projection head you throw away. Distillation methods fight it with stop-gradients, momentum teachers, sharpening, and centering. Those are not decorations. They are why the space is not a point.',
        'Augmentations define the invariance you are buying. Crop hard and you buy object-ish features. Blur and colour-jitter and you buy shape over palette. Use two frames as views and you start buying a little time. Use a bad invariance — a resize that crops out the instrument — and the geometry will be faithful to a world you do not operate in.',
      ],
    },
    {
      kicker: 'THE DOMAIN',
      heading: 'What counts as a view when the scene is a procedure',
      body: [
        'On web photos, a view is a crop. On a procedure, a view might be two timestamps, two cameras, or two renderings of the same anatomy. The assumption that the instance is stable across the augmentation is a scientific claim about the domain, not a hyperparameter.',
        'Downstream detectors and phase heads do not have to be contrastive or distilled. A YOLO trained on potholes is a labelled detector. Mixing those jobs in one sentence is how people convince themselves they pretrained when they only supervised.',
      ],
    },
  ],
  instance: {
    quote:
      'DINO is the self-distillation literature I actually used as a frozen visual encoder on endoscopic video. Using those features is not introducing DINO, and it is not training SimCLR. The domain question is whether the geometry still separates instruments from tissue.',
    attribution: 'SELF-DISTILLATION IN A DOMAIN, NOT A PRODUCT POST',
    workSlug: 'surgical-phase-detection',
    workLabel: 'Surgical phase recognition',
  },
  next: { slug: 'predictive-ssl', label: 'Predictive SSL' },
};

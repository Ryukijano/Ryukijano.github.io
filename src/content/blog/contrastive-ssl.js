export default {
  slug: 'contrastive-ssl',
  written: 'Aug 2026',
  area: 'Contrastive SSL',
  title: 'Two views, and the thing that must not collapse',
  desc: 'Instance discrimination, self-distillation, and what a representation is.',
  lead:
    'Contrastive learning is a rule for arranging points in a space: two views of the same thing should sit closer than two views of different things. That sentence is the whole method. The rest is how you stop the space from cheating.',
  concept: {
    src: '/assets/gifs/notes/contrastive-views.gif',
    poster: '/assets/images/notes/contrastive-views-poster.png',
    alt: 'Schematic of two augmented views pulling together in embedding space against a negative',
    caption:
      'Schematic of a contrastive batch: two views of one instance, a negative from another, arrows in embedding space. Framing, not measured — no loss curve is being reported.',
    highlight: ['Schematic', 'Framing, not measured'],
  },
  sections: [
    {
      kicker: 'THE JOB',
      heading: 'A representation is a geometry, not a class name',
      body: [
        'A classifier outputs a name. A representation outputs a vector you can reuse: retrieval, a linear probe, a detection head, a temporal model. Contrastive pretraining is one way to grow that vector without names. You manufacture positives (crops, colour jitter, adjacent frames) and negatives (the rest of the batch), and you ask the encoder to know the difference.',
        'The family includes InfoNCE, SimCLR, MoCo, and the student–teacher self-distillation line that DINO sits in. The last of those often drops explicit negatives and uses a teacher distribution instead. The job is still the same: keep instances apart, keep views of an instance together.',
      ],
    },
    {
      kicker: 'MECHANICS',
      heading: 'Collapse is the default',
      body: [
        'If every vector is the same constant, the contrastive loss can still look calm depending on how you normalise. Collapse is the encoder discovering that the cheapest way to make two views agree is to ignore the image. Stop-gradients, momentum teachers, sharpening, centering, large batches, and careful augmentations are all anti-collapse devices. They are not decorations.',
        'Augmentations define the invariance you are buying. Crop hard and you buy object-ish features. Blur and colour-jitter and you buy shape over palette. Use two frames as views and you start buying a little time. Use a bad invariance (random resize that crops out the instrument) and the geometry will be faithful to a world you do not operate in.',
      ],
    },
    {
      kicker: 'THE DOMAIN',
      heading: 'What counts as a view when the scene is a procedure',
      body: [
        'On web photos, a view is a crop. On a procedure, a view might be two timestamps, two cameras, or two renderings of the same anatomy. The contrastive assumption — that the instance is stable across the augmentation — is a scientific claim about the domain, not a hyperparameter.',
        'Downstream detectors and phase heads do not have to be contrastive. A YOLO trained on potholes is a labelled detector. It can sit on top of a representation, or not. Mixing those jobs in one sentence is how people convince themselves they pretrained when they only supervised.',
      ],
    },
  ],
  instance: {
    quote:
      'The student–teacher visual SSL family is the literature DINO lives in. Using those features on endoscopic video is not the same as introducing the method. The geometry was grown elsewhere; the domain is whether it still separates instruments from tissue.',
    attribution: 'CONTRASTIVE FAMILY, NOT A PRODUCT POST',
    workSlug: 'surgical-phase-detection',
    workLabel: 'Surgical phase recognition',
  },
};

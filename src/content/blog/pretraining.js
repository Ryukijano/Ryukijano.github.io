export default {
  slug: 'pretraining',
  written: 'Aug 2026',
  area: 'Pretraining',
  title: 'Pretraining is a different job from the label',
  desc: 'A pretext at scale is not the same job as a small labelled set.',
  lead:
    'A labelled dataset answers a question you already know how to ask. Pretraining answers a cheaper question, at a scale the labelled set will never reach, and hopes the resulting weights are useful for questions you have not asked yet.',
  taxonomy: {
    title: 'HOW THE CHECKPOINT IS USED',
    caption: 'Three jobs that share a filename. Not a quality ranking.',
    branches: [
      { name: 'Frozen', items: ['encoder as features', 'only the head sees y'] },
      { name: 'Continued', items: ['keep a pretext on in-domain x', 'then a head'] },
      { name: 'From scratch', items: ['no useful pretext', 'labels teach appearance too'] },
    ],
  },
  equations: [
    { label: 'Supervised', expr: '(x, y)  →  f_θ' },
    { label: 'Pretraining', expr: 'x  →  pretext signal  →  f_θ' },
  ],
  sections: [
    {
      kicker: 'THE JOB',
      heading: 'Make a representation before you need the answer',
      body: [
        'Supervised training starts with the task. You collect (x, y) pairs, you minimise a loss that mentions y, and the model is only as good as the labelling protocol. That is the right job when y is cheap and the distribution is closed. It is the wrong job when y is a surgical phase, a rare failure, or a preference someone has not written down.',
        'Pretraining starts with a pretext: a question you can ask of raw x. Predict a masked patch. Agree two views of the same image. Next-frame in latent space. The pretext is not the product. It is a way to spend unlabelled compute on a representation you will later freeze, finetune, or throw a small head on.',
      ],
    },
    {
      kicker: 'MECHANICS',
      heading: 'Frozen, continued, or from scratch',
      body: [
        'Three uses of a pretrained encoder are easy to confuse because they share a checkpoint filename. Frozen: the encoder is a feature extractor; only a head sees your labels. Continued pretraining: you keep the pretext, or a close cousin, on in-domain unlabelled video or text, then attach the head. From scratch: you never had a pretext, or you discarded it, and the labelled set has to teach appearance and the task at once.',
        'The mistake is treating those as a quality ranking. Frozen is correct when the labelled set is small and the pretext already saw related appearance. Continued pretraining is correct when the domain shift is visual, not just the label taxonomy. From scratch is correct when the pretext distribution is a lie about your camera. None of that is a vibe. It is a statement about which job you are still paying for.',
      ],
    },
    {
      kicker: 'THE DOMAIN',
      heading: 'Where labels are sparse and the camera is not ImageNet',
      body: [
        'Natural-image pretraining assumes a world of objects that sit still enough to crop. Endoscopic video, warehouse video, and robot cameras violate that in different ways: specular highlights, smoke, tools that occupy the same pixels as tissue, temporal structure that a still encoder was never asked to represent.',
        'The labelled set in those domains is usually a few dozen procedures, annotated by people who have a day job. That is enough to train a head. It is rarely enough to train a visual system. So the domain arrives after an encoder already exists, and the engineering question is how much of that encoder you are allowed to touch.',
      ],
    },
  ],
  instance: {
    quote:
      'Surgical phase recognition is a small labelled problem sitting on top of a large unlabelled appearance problem. The paper is about the head. The weights that made the head cheap came from a pretext I did not invent.',
    attribution: 'A DOMAIN THAT ARRIVES AFTER AN ENCODER',
    workSlug: 'surgical-phase-detection',
    workLabel: 'Surgical phase recognition',
    gif: {
      src: '/assets/images/esd-comparison.gif',
      alt: 'Endoscopic frames beside self-supervised attention maps along a sequence',
      caption:
        'An instance of the domain, not a pretext recipe: frames from endoscopic submucosal dissection beside encoder diagnostics. The maps are schematic of where a frozen visual encoder looks, not a measured clinical result.',
      highlight: 'schematic',
    },
  },
  next: { slug: 'contrastive-ssl', label: 'Contrastive SSL' },
};

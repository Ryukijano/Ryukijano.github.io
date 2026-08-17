export default {
  slug: 'pretraining',
  written: 'Aug 2026',
  area: 'Pretraining',
  title: 'Pretraining is a different job from the label',
  desc: 'A pretext at scale is not the same job as a small labelled set.',
  lead:
    'A labelled dataset answers a question you already know how to ask. Pretraining answers a cheaper question of raw frames, at a scale the labelled set will never reach, and leaves weights that can be frozen when the expensive labels finally arrive.',
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
        'Supervised training starts with the task. You collect (x, y) pairs, you minimise a loss that mentions y, and the model is only as good as the labelling protocol. That works when y is cheap. It does not work when y is a surgical phase marked by someone whose other job is the operation.',
        'Pretraining starts with a pretext: a question you can ask of raw x. Predict a masked patch. Agree two views of the same image. Next-frame in latent space. The pretext is not the product. It is a way to spend unlabelled compute on a representation you will later freeze, fine-tune, or throw a small head on.',
      ],
    },
    {
      kicker: 'MECHANICS',
      heading: 'Frozen, continued, or from scratch',
      body: [
        'Three uses of a pretrained encoder are easy to confuse because they share a checkpoint filename. Frozen: the encoder is a feature extractor; only a head sees your labels. Continued pretraining: you keep the pretext, or a close cousin, on in-domain unlabelled video or text, then attach the head. From scratch: you never had a pretext, or you discarded it, and the labelled set has to teach appearance and the task at once.',
        'The mistake is treating those as a quality ranking, or as mutually exclusive. A run can continue a pretext on in-domain unlabelled video and then freeze the encoder for a small labelled head; that is two payments, not a promotion. Frozen is what you do when the labelled set is small and the pretext already saw related appearance. From scratch is what you try when you think the pretext is a lie about your camera. On scarce surgical video it is often still worse than starting from ordinary photographs.',
      ],
    },
    {
      kicker: 'THE DOMAIN',
      heading: 'Where labels are sparse and the camera is not ImageNet',
      body: [
        'Web-image pretraining is built on objects that sit still enough to crop. Endoscopic submucosal dissection is a different camera: wet mucosa, specular glare, smoke, a tool occupying the same pixels as tissue. The phase you care about is a rounding error in a long tape. Nothing in that list is an ImageNet class.',
        'The labelled set is a few dozen procedures, marked by people whose other job is the operation. On the porcine tape, marking is 0.57% of frames. That is enough to train a head. It is not enough to train a visual system. So the domain arrives after an encoder already exists, and the question that gets asked in the lab is how much of that encoder a hospital GPU is allowed to touch.',
      ],
    },
  ],
  instance: {
    quote:
      'DINO-Endo is a small labelled head on DINOv2 features I adapted without labels, then froze. The paper is about the head. I did not invent that pretext, and I did not train Meta’s V-JEPA 2.',
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

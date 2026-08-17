export default {
  slug: 'predictive-ssl',
  written: 'Aug 2026',
  area: 'Predictive SSL',
  title: 'What should be here',
  desc: 'Three different fill-in jobs: reconstruct pixels, predict latents, learn a stochastic code.',
  lead:
    'Not every pretext is “these two observations correspond.” A second staircase asks what should occupy a hole: a missing patch, a future clip, a occluded tool. The hole can be filled in pixels, in a representation, or through a generative latent. Those are not one family with three logos.',
  concept: {
    src: '/assets/gifs/notes/latent-predict.gif',
    poster: '/assets/images/notes/latent-predict-poster.png',
    alt: 'Schematic of masked tokens predicted in latent space rather than decoded to pixels',
    caption:
      'Schematic of latent prediction (JEPA-shaped): a mask, a predictor, no pixel decoder. Framing, not measured. Reconstruction and VAEs are siblings in the taxonomy below, not this loop.',
    highlight: ['Schematic', 'Framing, not measured'],
  },
  taxonomy: {
    title: 'THREE CONTRACTS',
    caption: 'Three contracts, not one method with three logos.',
    branches: [
      { name: 'Reconstruct pixels', items: ['MAE', 'masked video', 'next-frame RGB'] },
      { name: 'Predict representations', items: ['I-JEPA', 'V-JEPA', 'latent targets'] },
      { name: 'Stochastic latents', items: ['VAE', 'KL bottleneck', 'sampleable code'] },
    ],
  },
  equations: [
    {
      label: 'Latent prediction (JEPA-shaped)',
      expr: 'z_c = f(x_context),   ẑ_t = g(z_c),   L ≈ ||ẑ_t − f̄(x_target)||²',
    },
  ],
  sections: [
    {
      kicker: 'THE JOB',
      heading: 'Fill a hole without being handed y',
      body: [
        'Instance discrimination says which observations belong together. Predictive jobs say: given what I can see, what should be there. Masked autoencoders reconstruct pixels or tokens. Joint-embedding predictive architectures predict a representation of the missing piece from a representation of the context, and they refuse to decode back to RGB. VAEs reconstruct through a bottleneck and spend a KL term so that bottleneck is a distribution you can sample.',
        'The last of those is an unsupervised latent-variable generative model. It often sits next to self-supervised representation learning in a survey. It is not I-JEPA with a decoder glued on. Pixel reconstruction pays for texture you may not want. Latent prediction pays for whatever the target encoder kept. A VAE pays for a sampleable code.',
      ],
    },
    {
      kicker: 'MECHANICS',
      heading: 'The target decides what the model may ignore',
      body: [
        'If the target is RGB, the loss sees lighting, compression, and specular glare. If the target is a frozen vision transformer, you predict that geometry. If the target is another video encoder, you predict time. I-JEPA made the representation-as-target move on stills. V-JEPA takes it into video: a world representation you can later condition for prediction and, in other labs, planning. I have used the idea as a tracking and prediction domain. I did not train Meta’s V-JEPA 2 run.',
        'A VAE’s extra axis is sampling. That is useful when the domain is generation or when you want a compact sequence code. Mixing it into “the JEPA family” hides the KL term, which is the whole point of the model.',
      ],
    },
    {
      kicker: 'THE DOMAIN',
      heading: 'Occlusion and the next twenty frames',
      body: [
        'Surgical video is a natural hole-filling domain: the camera is already a time series, and tools disappear behind tissue. Next-frame RGB asks whether the present is enough to paint the near future. Occlusion tracking asks whether a latent predictor can hold an identity when the pixels go away. Those are different contracts on similar footage.',
        'They are not phase recognition, and they are not a claim that a lab notebook is a JEPA paper.',
      ],
    },
  ],
  instance: {
    quote:
      'Next-frame work I ran goes through a VAE-style bottleneck — reconstruct, with a stochastic code. Occlusion tracking is closer to latent prediction. Neither is “we published JEPA.”',
    attribution: 'TWO CONTRACTS ON ONE CAMERA',
    workSlug: 'fet-vae-surgical-prediction',
    workLabel: 'FET-VAE surgical prediction',
    also: { workSlug: 'got-jepa-tool-tracking', workLabel: 'GOT-JEPA tool tracking' },
    gif: {
      src: '/assets/gifs/fetvae-prediction.gif',
      alt: 'Predicted future frames of a suturing sequence from a video model',
      caption:
        'An instance of next-frame reconstruction on suturing video. Schematic of a reconstructive job, not a latent-JEPA result and not a leaderboard.',
      highlight: 'schematic',
    },
  },
  next: { slug: 'video-representation', label: 'Video representation' },
};

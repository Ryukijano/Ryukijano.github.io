export default {
  slug: 'predictive-ssl',
  written: 'Aug 2026',
  area: 'Predictive SSL',
  title: 'What should be here',
  desc: 'Three different fill-in jobs: reconstruct pixels, predict latents, learn a stochastic code.',
  lead:
    'Not every pretext is “these two observations correspond.” A predictive pretext asks what should occupy a hole: the next frames of a suture, a tool behind smoke. Fill that hole in pixels, in a representation, or through a generative latent, and you have three contracts, not one method with three logos.',
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
      expr: 'z_c = f(x_context),   ẑ_t = g(z_c, pos_target),   L ≈ ||ẑ_t − f̄(x_target)||_p',
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
        'If the target is RGB, the loss sees lighting, compression, and specular glare. If it is an EMA target encoder, you predict that latent. I-JEPA did that on stills with an L2; V-JEPA does it on video with an L1. A frozen off-the-shelf ViT as target is a different recipe. Meta’s V-JEPA 2 later post-trains an action-conditioned world model for planning. I did not train Meta’s V-JEPA 2 run.',
        'A VAE’s extra axis is a KL bottleneck so the code is a distribution you can sample, plus a decoder back to pixels. Mixing it into “the JEPA family” hides both. In a reconstructive VAE the KL is the variational term in the ELBO; in practice it is often downweighted, but it is still what makes the code a distribution rather than masked pixels or a JEPA latent.',
      ],
    },
    {
      kicker: 'THE DOMAIN',
      heading: 'Occlusion and the next twenty frames',
      body: [
        'Suturing video is a hole in time: close camera, a needle, a background that barely moves, twenty frames to paint. Next-frame RGB asks whether a stochastic code can reconstruct that near future in pixels. That is a VAE-shaped contract. It is not latent prediction.',
        'Keyhole surgery is a different hole. Tools disappear behind smoke and blood, and the labelled frames are the easy ones: an annotator watching the plume cannot tell either. Holding an identity when the pixels go away is closer to predicting a representation of the missing piece. Two contracts, similar theatres. They are not phase recognition.',
      ],
    },
  ],
  instance: {
    quote:
      'Next-frame work I ran on suturing goes through a VAE-style bottleneck: reconstruct, with a stochastic code, decode to pixels. Occlusion tracking on laparoscopic tools is closer to latent prediction. Neither is “we published JEPA.”',
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

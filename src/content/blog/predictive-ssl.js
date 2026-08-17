export default {
  slug: 'predictive-ssl',
  written: 'Aug 2026',
  area: 'Predictive SSL',
  title: 'Masking, prediction, reconstruction',
  desc: 'Self-supervision past instance discrimination: latents, not always pixels.',
  lead:
    'Not every pretext is “this view matches that view.” A second family asks the model to fill something in: a masked patch, a future latent, a next frame. The filled-in thing might be pixels. It might be a vector. That choice is the method.',
  concept: {
    src: '/assets/gifs/notes/latent-predict.gif',
    poster: '/assets/images/notes/latent-predict-poster.png',
    alt: 'Schematic of masked tokens predicted in latent space rather than decoded to pixels',
    caption:
      'Schematic of predictive self-supervision in latent space: a mask, a predictor, no pixel decoder. Framing, not measured.',
    highlight: ['Schematic', 'Framing, not measured'],
  },
  sections: [
    {
      kicker: 'THE JOB',
      heading: 'Predict the missing piece without being handed y',
      body: [
        'Masked autoencoders reconstruct pixels or tokens. Joint-embedding predictive architectures (the JEPA family) predict a latent of the missing piece from a latent of the context, and they refuse to decode back to RGB. VAEs reconstruct through a bottleneck and spend a KL term to keep that bottleneck a distribution.',
        'These are all self-supervised. They are not all contrastive. Instance discrimination says “which item is this.” Predictive SSL says “what should be here.” You can combine them. You should not pretend they are one loss.',
      ],
    },
    {
      kicker: 'MECHANICS',
      heading: 'Latent targets change what the model is allowed to ignore',
      body: [
        'Pixel reconstruction pays for texture, compression artefacts, and lighting that may not matter to the downstream head. Latent prediction pays for whatever the target encoder kept. If the target is a frozen vision transformer, you are predicting a particular geometry. If the target is another video encoder, you are predicting time.',
        'VAEs add a second axis: a continuous latent you can sample. That is useful when the domain is generation or when you want a compact code for a sequence. It is a different contract from JEPA. Calling both “self-supervised video” is true and unhelpful, like calling a boat and a bridge “not swimming.”',
      ],
    },
    {
      kicker: 'THE DOMAIN',
      heading: 'Occlusion and the next twenty frames',
      body: [
        'Surgical video is a natural predictive domain because the camera is already a time series and because tools disappear behind tissue. Next-frame prediction asks whether the code of the present is enough to imagine the near future. Occlusion tracking asks whether a latent predictor can hold an identity when the pixels go away.',
        'Those are learning problems on similar footage. They are not the same labelled task as phase recognition, and they are not a claim that a lab notebook is a JEPA paper.',
      ],
    },
  ],
  instance: {
    quote:
      'Next-frame prediction and occlusion tracking are two predictive jobs on endoscopic video. One reconstructs through a VAE-style bottleneck. One holds identity through a latent predictor. Neither is “we published JEPA.”',
    attribution: 'PREDICTIVE JOBS, NOT A METHOD NAME',
    workSlug: 'fet-vae-surgical-prediction',
    workLabel: 'FET-VAE surgical prediction',
    also: { workSlug: 'got-jepa-tool-tracking', workLabel: 'GOT-JEPA tool tracking' },
    gif: {
      src: '/assets/gifs/fetvae-prediction.gif',
      alt: 'Predicted future frames of a suturing sequence from a video model',
      caption:
        'An instance of next-frame prediction on suturing video. The loop is an example of a predictive objective in a real domain, not a leaderboard claim. Treat the motion as schematic of the job.',
      highlight: 'schematic',
    },
  },
};

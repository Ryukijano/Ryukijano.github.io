export default {
  slug: 'diffusion-objectives',
  written: 'Aug 2026',
  area: 'Diffusion',
  title: 'Denoising is an objective, not a medium',
  desc: 'Noise as a teacher for pixels, actions, and — as reading — tokens.',
  lead:
    'Diffusion models learn to invert a noising process. The interesting part is not the pretty sampler. It is that the same objective can sit on images, on robot actions, and, in papers I have read and not trained, on language tokens.',
  concept: {
    src: '/assets/gifs/notes/denoise-trajectory.gif',
    poster: '/assets/images/notes/denoise-trajectory-poster.png',
    alt: 'Schematic of a noisy sample becoming a structured action or token vector',
    caption:
      'Schematic of a denoising trajectory: noise on the left, structure on the right, labelled for pixels or actions versus tokens as reading. Framing, not measured.',
    highlight: ['Schematic', 'Framing, not measured'],
  },
  sections: [
    {
      kicker: 'THE JOB',
      heading: 'Start from noise and recover the sample',
      body: [
        'You pick a forward process that turns data into noise — usually Gaussian, sometimes a discrete corruption. You train a network to reverse a step of that process. At sample time you start from noise and walk back. The loss is a denoising score, an epsilon-prediction, a velocity, a flow. The names change. The job does not: predict how to undo noise.',
        'Autoregression predicts the next token. Diffusion predicts a cleaner version of a whole object. That is why people reach for it when the object is a continuous trajectory, a picture, or a set of tokens they want to revise rather than emit left to right.',
      ],
    },
    {
      kicker: 'MECHANICS',
      heading: 'The medium is whoever owns the noise schedule',
      body: [
        'On pixels, the object is an image. On actions, the object is a horizon of controls — ScaleDP-style heads, diffusion policy, flow matching. The conditioner is whatever you still have: a visual encoder, a language token, a proprioceptive state. On language, diffusion language models (LLaDA, Dream, and cousins) noise tokens and learn to denoise them. I have not trained a diffusion language model. I have read the objective and recognised the shape.',
        'Sampler tricks — DDIM, guidance, few-step distillation — change the walk, not the contract. If your training loss is still a next-token log-prob, you are not doing diffusion no matter how much noise you overlay in a figure.',
      ],
    },
    {
      kicker: 'THE DOMAIN',
      heading: 'When a trajectory is a better object than a word',
      body: [
        'Robot action chunks are continuous and multimodal: two ways to grasp can both be right. A Gaussian denoiser is a natural density on that space. Language is discrete and already has a strong autoregressive prior, which is why diffusion-on-tokens is still an experiment for most labs rather than a default.',
        'The domain error is to see a diffusion head on a VLA and conclude that the system is a generative image model, or to see a blog post about diffusion LMs and conclude that a LoRA on Gemma was one.',
      ],
    },
  ],
  instance: {
    quote:
      'The action head on a small VLA is a denoising objective on trajectories. That is diffusion as a policy, not as a language model. I have not trained LLaDA, Dream, or any other diffusion LM.',
    attribution: 'ACTIONS, NOT TOKENS',
    workSlug: 'gemma-le-vla',
    workLabel: 'Gemma-Le VLA',
    gif: {
      src: '/assets/gifs/vla-diffusion.gif',
      alt: 'Diffusion-style action generation on a small vision-language-action policy',
      caption:
        'An instance of denoising on actions. Illustrative of the objective on a tabletop policy, not a diffusion-language result.',
      highlight: 'Illustrative',
    },
  },
};

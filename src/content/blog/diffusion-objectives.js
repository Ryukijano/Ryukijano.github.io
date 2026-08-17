export default {
  slug: 'diffusion-objectives',
  written: 'Aug 2026',
  area: 'Diffusion',
  title: 'Denoising is a family, not a medium',
  desc: 'The object being noised can be pixels, actions, or tokens. The reverse losses are cousins, not identical.',
  lead:
    'People hear diffusion and see an image sampler. The useful cut is: a forward process corrupts a structured object, a network learns a reverse step, and at sample time you walk back from noise. The object can be an image, a robot trajectory, or — in papers I have read and not trained — language tokens. The reverse losses are a family: score matching, DDPM epsilon-prediction, flow matching, discrete corruption. They are not one equation with four logos.',
  concept: {
    src: '/assets/gifs/notes/denoise-trajectory.gif',
    poster: '/assets/images/notes/denoise-trajectory-poster.png',
    alt: 'Schematic of a noisy sample becoming a structured action or token vector',
    caption:
      'Schematic of a reverse walk: noise on the left, structure on the right, labelled for pixels or actions versus tokens as reading. Framing, not measured. Not a claim that DDPM equals flow matching.',
    highlight: ['Schematic', 'Framing, not measured'],
  },
  taxonomy: {
    title: 'REVERSE LOSSES',
    caption: 'Same cartoon (corrupt, then undo). Different mathematics.',
    branches: [
      { name: 'Score matching', items: ['∇ log p_t', 'continuous density'] },
      { name: 'DDPM / epsilon', items: ['predict noise', 'fixed Gaussian schedule'] },
      { name: 'Flow matching', items: ['velocity / transport', 'straight paths'] },
      { name: 'Discrete diffusion', items: ['mask or replace tokens', 'LLaDA-shaped'] },
    ],
  },
  equations: [
    {
      label: 'Forward corruption (cartoon)',
      expr: 'x_0  →  x_t  →  noise',
    },
  ],
  sections: [
    {
      kicker: 'THE JOB',
      heading: 'Undo a corruption of a whole object',
      body: [
        'Autoregression predicts the next token. Diffusion-shaped models predict a cleaner version of a whole object. That is why people reach for them when the object is a continuous trajectory, a picture, or a set of tokens they want to revise rather than emit left to right.',
        'Sampler tricks — DDIM, guidance, few-step distillation — change the walk, not the contract. If your training loss is still a next-token log-prob, you are not in this family no matter how much noise you overlay in a figure.',
      ],
    },
    {
      kicker: 'MECHANICS',
      heading: 'The medium is whoever owns the forward process',
      body: [
        'On pixels, the object is an image. On actions, the object is a horizon of controls: diffusion policy, ScaleDP-style heads, flow matching on trajectories. The conditioner is whatever you still have — a visual encoder, a language token, proprioception. On language, discrete diffusion (LLaDA, Dream, and cousins) corrupts tokens and learns to denoise them. I have not trained a diffusion language model. I have read the objective and recognised the shape.',
        'Score matching, epsilon-prediction, and flow matching share the cartoon and disagree about the vector the network should emit. Discrete diffusion disagrees about the state space. Keep the family; keep the seams.',
      ],
    },
    {
      kicker: 'THE DOMAIN',
      heading: 'When a trajectory is a better object than a word',
      body: [
        'Robot action chunks are continuous and multimodal: two ways to grasp can both be right. A denoiser on that space is a natural density. Language is discrete and already has a strong autoregressive prior, which is why token diffusion is still an experiment for most labs rather than a default.',
        'The domain error is to see a diffusion head on a VLA and conclude that the system is a generative image model, or to see a blog post about diffusion LMs and conclude that a LoRA on Gemma was one.',
      ],
    },
  ],
  instance: {
    quote:
      'The action head on a small VLA is a reverse process on trajectories. That is diffusion as a policy, not as a language model. I have not trained LLaDA, Dream, or any other diffusion LM.',
    attribution: 'ACTIONS, NOT TOKENS',
    workSlug: 'gemma-le-vla',
    workLabel: 'Gemma-Le VLA',
    gif: {
      src: '/assets/gifs/vla-diffusion.gif',
      alt: 'Diffusion-style action generation on a small vision-language-action policy',
      caption:
        'An instance of a reverse process on actions. Illustrative of the family on a tabletop policy, not a diffusion-language result.',
      highlight: 'Illustrative',
    },
  },
  next: { slug: 'agent-skills', label: 'Skills' },
};

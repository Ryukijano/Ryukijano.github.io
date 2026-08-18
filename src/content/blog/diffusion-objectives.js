export default {
  slug: 'diffusion-objectives',
  written: 'Aug 2026',
  area: 'Diffusion',
  title: 'Denoising is a family, not a medium',
  desc: 'The object being noised can be pixels, actions, or tokens. The reverse losses are cousins, not identical.',
  lead:
    'A forward process corrupts a structured object, a network learns a reverse step, and at sample time you walk back from noise. The object can be an image, a robot trajectory, or — in papers I have read and not trained — language tokens. The reverse losses are a family: score matching, DDPM epsilon-prediction, flow matching, discrete corruption.',
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
    caption: 'Corrupt, then undo. Different mathematics.',
    branches: [
      { name: 'Score matching', items: ['∇ log p_t', 'continuous density'] },
      { name: 'DDPM / epsilon', items: ['predict noise', 'fixed Gaussian schedule'] },
      { name: 'Flow matching', items: ['velocity / transport', 'optional straight (OT) paths'] },
      { name: 'Discrete diffusion', items: ['mask or replace tokens', 'LLaDA-shaped'] },
    ],
  },
  equations: [
    {
      label: 'Forward corruption',
      expr: 'x_0  →  x_t  →  noise',
    },
  ],
  sections: [
    {
      kicker: 'THE JOB',
      heading: 'Undo a corruption of a whole object',
      body: [
        'Autoregression predicts the next token. Diffusion-shaped models predict a cleaner version of a whole object. They fit when the object is a continuous trajectory, a picture, or a set of tokens you want to revise rather than emit left to right.',
        'DDIM changes the walk. Classifier-free guidance tilts the distribution. Few-step distillation often changes the training loss. None of that turns a next-token log-prob into this family.',
      ],
    },
    {
      kicker: 'MECHANICS',
      heading: 'The medium is whoever owns the forward process',
      body: [
        'On pixels, the object is an image. On actions, the object is a horizon of controls: diffusion policy, ScaleDP-style heads, flow matching on trajectories. The conditioner is whatever you still have — a visual encoder, a language token, proprioception. On language, masked diffusion (LLaDA and cousins) replaces tokens with a mask and learns to unmask them.',
        'Denoising score matching and DDPM ε-prediction are two parameterisations of a Gaussian reverse process. Flow matching instead regresses a velocity along a chosen path. Discrete diffusion changes the state space.',
      ],
    },
    {
      kicker: 'THE DOMAIN',
      heading: 'The object was frames. Then it was a chunk of controls.',
      body: [
        'Before the small VLA, the object I trained on was theatre video: frames for phase, tracks, next-frame. On Gemma-Le the object is an eight-step action chunk. Two grasps can both be right; the mean of them is not. ScaleDP denoises that chunk, conditioned on SigLIP and Gemma. A reverse process on that space can represent several ways to grasp. Diffusion Policy and ScaleDP do it by denoising; flow matching does it with a velocity field.',
        'Language tokens are a different object — discrete, already owned by autoregression. Discrete diffusion (LLaDA, Dream, and cousins) is that reverse process on text. I have not trained a diffusion language model. A LoRA on Gemma with a diffusion action head is not one.',
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
      poster: '/assets/images/vla-diffusion-poster.png',
      alt: 'Diffusion-style action generation on a small vision-language-action policy',
      caption:
        'An instance of a reverse process on actions. Illustrative of the family on a tabletop policy, not a diffusion-language result.',
      highlight: 'Illustrative',
    },
  },
  next: { slug: 'agent-skills', label: 'Skills' },
};

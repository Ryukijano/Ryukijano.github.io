export default {
  slug: 'post-training',
  written: 'Aug 2026',
  area: 'Post-training',
  title: 'SFT clones; RL searches',
  desc: 'Pretrained weights as substrate, then cloning, then a reward.',
  lead:
    'Pretraining grows a prior. Post-training spends that prior on a job a pretext will not name: follow instructions, match a demonstration, raise a reward. Supervised fine-tuning and reinforcement learning are two different spends.',
  concept: {
    src: '/assets/gifs/notes/sft-then-rl.gif',
    poster: '/assets/images/notes/sft-then-rl-poster.png',
    alt: 'Schematic of supervised cloning arrows beside a reinforcement learning loop',
    caption:
      'Schematic of two post-training jobs: SFT as cloning demonstrations, RL as a loop through reward. Framing, not measured.',
    highlight: ['Schematic', 'Framing, not measured'],
  },
  sections: [
    {
      kicker: 'THE JOB',
      heading: 'The substrate is already trained',
      body: [
        'If you still need a visual encoder or a language model to know what a cup is, you are not post-training. You are pretraining with extra steps. Post-training assumes a useful prior and asks for a behavioural change: answer like this, grasp like that, propose circuits that lower this energy.',
        'SFT is cloning. You have (context, target) pairs — instructions and answers, observations and actions — and you maximise the likelihood of the target. RL is search. You have a reward, or a preference, and you update the policy so that sampled behaviour scores higher. People stack them because cloning is a better initialisation for search than a raw prior, and search can reach places no demonstration sat.',
      ],
    },
    {
      kicker: 'MECHANICS',
      heading: 'Likelihood is not reward',
      body: [
        'SFT cannot prefer a rare good action over a common mediocre one except by how often it appears in the dataset. If the demonstrations are biased, the clone is biased. LoRA and other adapters are an implementation detail: they change how many weights you touch, not the objective.',
        'RL needs a reward that the domain actually has. Token-level KL penalties, advantage estimates, on-policy rollouts, and environment resets are the machinery. In language, the “environment” is often a judge model. In robotics, it is a simulator or a robot. In circuit search, it is an energy. Calling all of that “RLHF” is a brand, not a diagnosis.',
      ],
    },
    {
      kicker: 'THE DOMAIN',
      heading: 'Where you have demonstrations, and where you only have a score',
      body: [
        'A small VLA usually meets SFT first: trajectories from a human or a script. A generator of quantum circuits may meet RL first, or a hybrid of imitation and a reward on energy, because the demonstration set is not the point — the energy is.',
        'Those domains do not share a codebase. They share a shape: frozen or lightly updated priors, then a second objective. Papers that compare SFT to RL as if one were universally better are answering a different question than “which job do I still need to pay for.”',
      ],
    },
  ],
  instance: {
    quote:
      'LoRA on a VLA is cloning. A loop that proposes circuits and reads an energy is search. I have run both shapes. I have not written a general theory of post-training, and I am not a coauthor of the SFT-versus-RL papers you should actually cite for that.',
    attribution: 'TWO SPENDS OF A PRIOR',
    workSlug: 'gemma-le-vla',
    workLabel: 'Gemma-Le VLA',
    also: { workSlug: 'conditional-gqe', workLabel: 'Conditional GQE' },
    gif: {
      src: '/assets/gifs/rl_training_loop.gif',
      alt: 'Training loop diagram for a generator reading a reward',
      caption:
        'An instance of an RL-shaped post-training loop on circuit search. Read it as a schematic of the job (policy, reward, update), not as a measured language-model result.',
      highlight: 'schematic',
    },
  },
};

export default {
  slug: 'post-training',
  written: 'Aug 2026',
  area: 'Post-training',
  title: 'SFT clones; RL searches',
  desc: 'A mental model for spending a prior: copy demonstrations, or search under a score.',
  lead:
    'Pretraining grows a prior. Post-training spends that prior on a job a pretext will not name. “SFT clones; RL searches” is a mental model, not a theorem. The literature also has preference optimisation, rejection sampling, offline RL, and GRPO-style on-policy updates. The slogan is still the right first cut: SFT is cloning. RL is search.',
  concept: {
    src: '/assets/gifs/notes/sft-then-rl.gif',
    poster: '/assets/images/notes/sft-then-rl-poster.png',
    alt: 'Schematic of supervised cloning arrows beside a reinforcement learning loop',
    caption:
      'Schematic of two post-training spends: cloning demonstrations versus looping through a score. Framing, not measured. Preference methods sit between them in the taxonomy.',
    highlight: ['Schematic', 'Framing, not measured'],
  },
  taxonomy: {
    title: 'HOW THE PRIOR GETS SPENT',
    caption: 'InstructGPT’s stack is the canonical cartoon: demonstrations, SFT, preference comparisons, a reward model, then PPO. Many later recipes skip or swap a rung.',
    branches: [
      { name: 'Clone', items: ['SFT', 'behaviour cloning', 'LoRA on demonstrations'] },
      { name: 'Filter', items: ['rejection sampling', 'best-of-n'] },
      { name: 'Prefer', items: ['DPO', 'IPO', 'reward model + RLHF'] },
      { name: 'Search', items: ['on-policy RL', 'PPO', 'GRPO', 'offline RL'] },
    ],
  },
  equations: [
    { label: 'SFT as cloning', expr: 'max_θ  E_{(x,y)~D} [ log p_θ(y | x) ]' },
    { label: 'RL as search', expr: 'max_θ  E_{τ ~ π_θ} [ R(τ) ]' },
  ],
  sections: [
    {
      kicker: 'THE JOB',
      heading: 'The substrate is already trained',
      body: [
        'If you still need a visual encoder or a language model to know what a cup is, you are not post-training. You are pretraining with extra steps. Post-training assumes a useful prior and asks for a behavioural change: answer like this, grasp like that, propose circuits that lower this energy.',
        'SFT maximises the likelihood of target tokens or actions given a context. That is cloning. RL updates a policy so that sampled behaviour scores higher under a reward, a preference model, or a group-relative advantage (GRPO and cousins). People stack them because a clone is a better initialisation for search than a raw prior, and search can reach places no demonstration sat. Preference optimisation (DPO and family) often skips an explicit RL loop and still is not SFT: the data are comparisons, not clones.',
      ],
    },
    {
      kicker: 'MECHANICS',
      heading: 'Likelihood is not reward',
      body: [
        'SFT cannot prefer a rare good action over a common mediocre one except by how often it appears in the dataset. If the demonstrations are biased, the clone is biased. LoRA changes how many weights you touch, not the objective.',
        'Search needs a score the domain actually has. In language the “environment” is often a judge or a group of samples. In robotics it is a simulator or a robot. In circuit search it is an energy. Calling every one of those “RLHF” is a brand, not a diagnosis. Offline RL and rejection sampling are other ways to spend a score without on-policy rollouts. They belong on the map. They do not erase the clone-versus-search cut.',
      ],
    },
    {
      kicker: 'THE DOMAIN',
      heading: 'Where you have demonstrations, and where you only have a score',
      body: [
        'A small VLA usually meets SFT first: trajectories from a human or a script. A generator of quantum circuits may meet search first, because the demonstration set is not the point — the energy is.',
        'Those domains do not share a codebase. They share a question: how do you turn a useful prior into better task-specific behaviour. Papers that crown SFT or RL as universally better are answering a different question than which job you still need to pay for.',
      ],
    },
  ],
  instance: {
    quote:
      'LoRA on a VLA is cloning. A loop that proposes circuits and reads an energy is search. I have run both shapes. I have not written a general theory of post-training, and I am not a coauthor of InstructGPT, DPO, or GRPO.',
    attribution: 'TWO SPENDS OF A PRIOR',
    workSlug: 'gemma-le-vla',
    workLabel: 'Gemma-Le VLA',
    also: { workSlug: 'conditional-gqe', workLabel: 'Conditional GQE' },
    gif: {
      src: '/assets/gifs/rl_training_loop.gif',
      alt: 'Training loop diagram for a generator reading a reward',
      caption:
        'An instance of a search-shaped post-training loop on circuit generation. Schematic of the job (policy, score, update), not a measured language-model result.',
      highlight: 'schematic',
    },
  },
  next: { slug: 'diffusion-objectives', label: 'Diffusion' },
};

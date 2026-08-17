export default {
  slug: 'post-training',
  written: 'Aug 2026',
  area: 'Post-training',
  title: 'SFT clones; RL searches',
  desc: 'A mental model for spending a prior: copy demonstrations, or search under a score.',
  lead:
    'Pretraining grows a prior. Post-training spends that prior on a job a pretext will not name. “SFT clones; RL searches” is a mental model, not a theorem. Preference optimisation (DPO, IPO) and filters (rejection sampling, best-of-n) sit between those two spends. GRPO-style updates are on-policy search: they still need a reward and only replace the critic with a group baseline. SFT is cloning. RL is search.',
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
    caption:
      'InstructGPT’s stack is one recipe: demonstrations, SFT, preference comparisons, a reward model, then PPO. Many later recipes skip or swap a rung.',
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
        'SFT maximises the likelihood of target tokens or actions given a context. That is cloning. RL updates a policy so sampled behaviour scores higher under a reward — possibly from a preference model — with GRPO estimating advantage from a group of siblings rather than a value network. DPO skips the reward-model-plus-PPO loop. It is still not SFT: the data are comparisons, not clones.',
      ],
    },
    {
      kicker: 'MECHANICS',
      heading: 'Likelihood is not reward',
      body: [
        'SFT cannot prefer a rare good action over a common mediocre one except by how often it appears in the dataset. If the demonstrations are messy, the clone is messy. LoRA changes how many weights you touch, not the objective. A diffusion head trained on teleoperated chunks is still cloning: the score is agreement with the demonstration, not a reward from the world.',
        'Search starts when a score exists that no demonstration named — an energy, a judge, a verifiable reward. Offline RL and rejection sampling spend a score without on-policy rollouts. They belong on the map. They do not erase the clone-versus-search cut.',
      ],
    },
    {
      kicker: 'THE DOMAIN',
      heading: 'Where you have demonstrations, and where you only have a score',
      body: [
        'A small VLA usually meets cloning first. The data are teleoperated episodes: a pause while the operator thinks, a recovery the policy will copy as if it were the task. LoRA changes how many language weights you touch. It does not change the objective.',
        'A generator of quantum circuits may meet search first, because there is no correct ansatz to copy. The score is an energy. The model proposes a batch, compares siblings, and will discover diagonal operators that do nothing while training looks healthy.',
      ],
    },
  ],
  instance: {
    quote:
      'LoRA on a VLA is cloning: it copies teleop. A loop that proposes circuits and reads an energy is search. I have run both shapes. I have not written a general theory of post-training, and I am not a coauthor of InstructGPT, DPO, or GRPO.',
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

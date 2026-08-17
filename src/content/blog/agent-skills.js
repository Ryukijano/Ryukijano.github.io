export default {
  slug: 'agent-skills',
  written: 'Aug 2026',
  area: 'Agents',
  title: 'Skills are not SFT',
  desc: 'Procedures you hand an agent are a different object from weights.',
  lead:
    'Post-training changes weights. A skill file changes the procedure the agent is allowed to follow this turn. Mixing those up is how people convince themselves they finetuned a model when they wrote a README.',
  taxonomy: {
    title: 'WHERE THE CAPABILITY LIVES',
    caption: 'Weights encode generalised behaviour. Skills encode procedures you can edit without a checkpoint.',
    branches: [
      { name: 'Weights', items: ['SFT', 'RL', 'learned behaviour'] },
      { name: 'Procedure', items: ['skill', 'MCP tool', 'runbook'] },
    ],
  },
  sections: [
    {
      kicker: 'THE JOB',
      heading: 'Tell the agent how this lab works',
      body: [
        'A language model, even a post-trained one, does not know your cluster’s queue, your MOT eval script, or which GIF is banned on the home page. You can SFT that knowledge into weights if you have a dataset of (context, correct tool call). You can also write it down as a skill: a short document plus optional scripts that the agent reads when the task matches.',
        'MCP and skills are cousins. MCP exposes tools. Skills expose playbooks. Neither is a pretext. Neither is a reward model. They are how a general agent borrows a specialist’s runbook without a new checkpoint.',
      ],
    },
    {
      kicker: 'MECHANICS',
      heading: 'When to write a skill instead of collecting traces',
      body: [
        'SFT is right when the behaviour is frequent, stable, and worth baking in. A skill is right when the behaviour is local, changes weekly, or must not leak into other tasks. If you SFT “always launch this exact sbatch,” you will fight the next cluster. If you skill it, you edit a file.',
        'The failure mode is a skill that tries to be a paper: ten pages, no trigger, no command the agent can actually run. The other failure mode is an MCP tool with no skill, so the agent can call the tool and still does not know when it should.',
      ],
    },
    {
      kicker: 'THE DOMAIN',
      heading: 'A lab that is mostly queues and video',
      body: [
        'Surgical MOT, HPC jobs, and a desktop that has to screenshot a plate are domains where the costly mistake is procedural: wrong split, wrong GPU, wrong asset path. A personal skill pack is a way to keep those procedures next to the repo. It is not a claim that I invented Agent Skills, MCP, or Cursor.',
        'The honest test is whether a cold agent, given the skill, can run the eval you meant. If it still has to guess the dataset root, you wrote prose, not a skill.',
      ],
    },
  ],
  instance: {
    quote:
      'I keep a skill library for MOT and HPC so the agent does not forget the lab. That is a runbook. It is not post-training, and it is not a paper.',
    attribution: 'PROCEDURES, NOT WEIGHTS',
    external: {
      href: 'https://github.com/Ryukijano/agent-skills',
      label: 'Ryukijano/agent-skills',
    },
  },
  next: { slug: 'qec-learning', label: 'QEC as a learning problem' },
};

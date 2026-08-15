/**
 * Fully ported from "Case Study - Gemma-Le VLA.dc.html".
 * Prose, figures, stack table and links are that file's, verbatim.
 *
 * That prototype uses the sticky-header layout; its header reads
 * "GYANATEET · ROBOTICS", and `breadcrumb` carries the second half.
 */
import { href } from '../links.js';

const study = {
  slug: 'gemma-le-vla',
  status: 'full',
  source: 'Case Study - Gemma-Le VLA.dc.html',

  year: 2025,
  lane: 'Robotics',
  desc: 'SigLIP, Gemma 3 and a diffusion action head in LeRobot',
  featured: false,

  breadcrumb: 'ROBOTICS',
  kicker: 'GEMMA-LE / GEMMA-GR00T · OPEN WEIGHTS, 5B',
  title: 'A compact vision-language-action policy for manipulation',
  lead: 'SigLIP for vision, Gemma 3 for language, and a ScaleDP diffusion head that denoises eight-step action chunks — assembled in LeRobot on three L40s. Every backbone is a stock Hugging Face checkpoint, which is the point: the NV Eagle components it replaces were not.',

  meta: [
    { k: 'YEAR', v: '2025' },
    { k: 'ROLE', v: 'Solo build' },
    { k: 'DOMAIN', v: 'Robotic manipulation' },
    { k: 'METHOD', v: 'Imitation learning' },
    { k: 'STACK', v: 'LeRobot · SigLIP · Gemma 3 · ScaleDP' },
    { k: 'HARDWARE', v: '3× NVIDIA L40, SLURM' },
  ],

  hero: {
    src: '/assets/gifs/vla-diffusion.gif',
    alt: 'Gemma-Le architecture with the action head denoising across 50 diffusion steps',
    caption:
      "Signal path and the action head's denoising schedule. Multimodal inputs reach the transformer core, the fused 768-dim conditioning vector reaches the diffusion head, and the head walks an action chunk from noise to trajectory over 50 steps. Architecture diagram is the project's own; the denoising curve is illustrative.",
    highlight: "Architecture diagram is the project's own; the denoising curve is illustrative.",
  },

  figurePair: [
    {
      src: '/assets/images/gemma-groot-arch.png',
      alt: 'Gemma-GR00T block diagram',
      caption: "Block diagram of SigLIP, Gemma 3 and the ScaleDP head. Architecture diagram is the project's own.",
      highlight: "Architecture diagram is the project's own",
    },
    {
      src: '/assets/images/gemma-groot-demo.png',
      alt: 'Gemma-Le policy rollout on a manipulation task',
      caption:
        'A policy rollout still on a manipulation task. The pose is illustrative of the embodiment, not a published success rate.',
      highlight: 'illustrative',
    },
  ],

  sections: {
    problem: {
      num: '01',
      kicker: 'PROBLEM',
      h2: 'The good VLAs are too big to iterate on',
      body: [
        'Vision-language-action models put a pretrained multimodal backbone in front of a robot so it can follow a written instruction instead of a scripted trajectory. That part works. The problem is scale: the models that demonstrate it convincingly are large enough that fine-tuning them requires a cluster, which puts the interesting experiments — new tasks, new embodiments, new action representations — out of reach of anyone without one.',
        'The other constraint is the control loop. A policy that predicts one action per forward pass has to keep up with the robot in real time, and language-model inference is not fast at that granularity.',
      ],
    },

    engineering: {
      num: '02',
      kicker: 'ENGINEERING',
      h2: 'Three parts, each doing only its own job',
      body:
        "The design is deliberately unclever: keep the pretrained perception and language components frozen or lightly tuned, and put the learning where the embodiment actually differs — in the action head. Everything is composed inside LeRobot, so the dataset format, the training loop and the evaluation harness are the community's rather than mine.",
      stack: [
        {
          stage: 'PERCEPTION',
          name: 'SigLIP so400m-patch14-384',
          role: 'Encodes the camera observation. Contrastively pretrained on image-text pairs with a sigmoid loss, which gives a visual space already aligned to language. Frozen.',
        },
        {
          stage: 'REASONING',
          name: 'Gemma 3 4b-it',
          role: 'Reads the instruction alongside the visual tokens. Adapted with LoRA at rank 16 on the q, k, v and o projections rather than full fine-tuning, so the base weights stay put.',
        },
        {
          stage: 'FUSION',
          name: 'conditioning_dim 768',
          role: 'SigLIP and Gemma features fuse into a single 768-dimensional conditioning vector. This is the only interface the action head sees.',
        },
        {
          stage: 'ACTION',
          name: 'ScaleDP · 12L · d=320 · h=8 · ff=1280',
          role: 'A diffusion transformer that denoises action noise over 50 steps with a temporal context of 8. Predicts a chunk, not one step. This is where the embodiment-specific learning happens.',
        },
        {
          stage: 'HARNESS',
          name: 'LeRobot',
          role: 'Dataset format, training loop and evaluation, vendored as a fork. Replaces the NV Eagle components the GR00T stack shipped with, so every backbone is a standard Hugging Face checkpoint.',
        },
      ],
      closing:
        'The diffusion head is the part that earns its place. Rather than regressing a single action, it denoises a whole chunk of the trajectory at once — which smooths the multimodality problem that plagues behaviour cloning (two valid ways to grasp the same object averaging into one invalid one) and amortises the backbone forward pass across several control steps.',
      buildList: [
        'Action chunking at chunk_size 8 — one backbone pass covers eight control steps, so the language model is not in the inner loop',
        'LoRA rank 16 on q/k/v/o keeps Gemma 3 adaptable without a full fine-tune; SigLIP stays frozen outright',
        '50 diffusion steps in the head, trained to predict action noise rather than regress the action directly',
        'Behaviour cloning on teleoperated episodes in the LeRobot format — robot_sim.PickNPlace, batch size 3, 200k steps',
        'Three L40s under SLURM; full training wants 48GB of VRAM, which set the size of every component above',
      ],
    },

    learned: {
      num: '03',
      kicker: 'WHAT I LEARNED',
      h2: 'Most of the difficulty is in the data, not the model',
      body: [
        'The architecture came together faster than the demonstrations did. Imitation learning inherits every inconsistency in the teleoperated episodes — a slightly different approach angle, a pause while the operator thinks, a recovery that the policy learns as if it were part of the task. Cleaning and re-recording episodes moved success rates more than any change to the head.',
        'The second lesson was about frozen backbones, and it matches what I found in the surgical work: a strong self-supervised encoder left frozen is usually better than a mediocre one fine-tuned, and it makes every subsequent experiment cheaper to run.',
        'The weights are public because the useful thing here is not a benchmark number — it is a VLA small enough that someone else can retrain it on their own arm in an afternoon.',
      ],
    },

    // No h2 in the prototype: this section is the link grid and nothing else.
    resources: {
      num: '04',
      kicker: 'RESOURCES',
      links: [
        {
          kind: 'WEIGHTS',
          label: 'gemma-groot',
          meta: 'huggingface.co',
          url: 'https://huggingface.co/Ryukijano/gemma-groot',
        },
        {
          kind: 'CODE',
          label: 'Ryukijano/Gemma-Grook',
          meta: 'github.com',
          url: 'https://github.com/Ryukijano/Gemma-Grook',
        },
        {
          kind: 'RELATED',
          label: 'vjepa-nested-agent-l40',
          meta: 'huggingface.co',
          url: 'https://huggingface.co/Ryukijano/vjepa-nested-agent-l40',
        },
        {
          kind: 'PROFILE',
          label: 'Hugging Face',
          meta: 'huggingface.co',
          url: 'https://huggingface.co/Ryukijano',
        },
      ],
    },
  },

  next: [
    {
      kicker: 'NEXT PROJECT',
      title: 'Hydrogen on nickel, on a noisy device',
      desc: 'VQE and sample-based quantum diagonalisation against a Rolls-Royce materials problem at the NQCC UK Quantum Hackathon.',
      to: href('Case Study - NQCC Rolls-Royce Challenge.dc.html'),
    },
  ],
};

export default study;

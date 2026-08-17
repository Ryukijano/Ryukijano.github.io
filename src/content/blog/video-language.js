export default {
  slug: 'video-language',
  written: 'Aug 2026',
  area: 'Video-language',
  title: 'Pixels, words, and sometimes an action',
  desc: 'Captioning, video-language models, and vision-language-action as different contracts.',
  lead:
    'Video-language is the problem of putting a sequence of frames and a sequence of tokens into one space so that a sentence can retrieve a clip, a clip can produce a sentence, or both can condition a motor command. Those are not the same product.',
  sections: [
    {
      kicker: 'THE JOB',
      heading: 'Alignment is a contract about what may be said',
      body: [
        'Captioning asks a decoder for words given pixels. Retrieval asks that a video embedding and a text embedding sit close when they describe the same event. A video-language model (VLM) usually does both, plus instruction following: given a clip and a prompt, emit an answer. Vision-language-action (VLA) adds a third stream — actions — so the output is not only language.',
        'The literature in surgery has started to grow VLMs for questions about procedures. That is landscape. It is not a substitute for saying which contract you actually implemented: a captioner, a composed pipeline of specialist models, or a policy that emits actions.',
      ],
    },
    {
      kicker: 'MECHANICS',
      heading: 'One backbone versus a pipe of specialists',
      body: [
        'A unified VLM encodes video tokens and text tokens in one transformer. A composed system runs a detector, a tracker, a world-model, a language model, and glues them with prompts or latents. The unified model is cleaner to describe. The pipe is often what you can ship with open weights and a weekend.',
        'A VLA is not a VLM with a USB arm. The action head has its own objective — often a diffusion or flow matching loss on trajectories — and the language stream is a conditioner. If you only SFT the language tower, you have a talker. If you only train the action head, you have a policy that may not listen.',
      ],
    },
    {
      kicker: 'THE DOMAIN',
      heading: 'Language that has to survive the camera',
      body: [
        'In driving and surgery, the useful sentence is often short and the cost of a wrong one is not a BLEU point. A demo pipeline that chains perception to a video model to a caption is still video-language: it is just video-language as systems glue rather than as a single pretrained objective.',
        'Robotics makes the glue visible because the label is a trajectory. A small VLA on a tabletop is a domain where vision, language, and action have to share a clock. It is not a foundation model, and it is not a detection paper from 2024 with a different title.',
      ],
    },
  ],
  instance: {
    quote:
      'A composed video-language demo and a small VLA are two domains for the same family of questions: how text meets pixels, and whether the output is a sentence or a motion. Neither is a lab-scale VLM paper.',
    attribution: 'ALIGNMENT, THEN ACTION',
    workSlug: 'cosmos-sentinel',
    workLabel: 'Cosmos-sentinel pipeline',
    also: { workSlug: 'gemma-le-vla', workLabel: 'Gemma-Le VLA' },
    gif: {
      src: '/assets/gifs/cosmos-sentinel-pipeline.gif',
      alt: 'Schematic pipeline chaining perception, a video model, and language',
      caption:
        'An instance of composed video-language: specialist models in a pipe. The diagram is schematic of the contract, not a measured VLM benchmark.',
      highlight: 'schematic',
    },
  },
};

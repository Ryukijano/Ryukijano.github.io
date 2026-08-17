export default {
  slug: 'video-language',
  written: 'Aug 2026',
  area: 'Video-language',
  title: 'Pixels, words, and sometimes an action',
  desc: 'Captioning, video-language models, and vision-language-action as different contracts.',
  lead:
    'Video-language is the problem of putting frames next to tokens so a clip can produce a sentence, or so both can condition a motor command. One contract emits words. The other emits an action. A VLA is not a VLM with a USB arm.',
  taxonomy: {
    title: 'WHAT THE MODEL MUST PRODUCE',
    caption: 'A VLA is not a VLM with a USB arm. The action distribution is its own learning problem.',
    branches: [
      { name: 'Caption / retrieve', items: ['pixels → words', 'clip ↔ sentence'] },
      { name: 'VLM', items: ['video + text → text'] },
      { name: 'VLA', items: ['video + text → action'] },
      { name: 'Composed pipe', items: ['perception → world model → LLM → text or action'] },
    ],
  },
  equations: [
    { label: 'VLM', expr: 'video + text  →  text' },
    { label: 'VLA', expr: 'video + text  →  action' },
  ],
  sections: [
    {
      kicker: 'THE JOB',
      heading: 'Alignment is a contract about what may be said',
      body: [
        'Captioning asks for words given pixels. Retrieval asks that a clip embedding and a sentence embedding sit close. A generative video-language model (VLM) answers a prompt about a clip. Those are different contracts that share a name. Vision-language-action (VLA) adds a third stream — actions — so the output is not only language.',
        'Name the contract you actually implemented: a captioner, a composed pipeline of specialist models, or a policy that emits actions.',
      ],
    },
    {
      kicker: 'MECHANICS',
      heading: 'One backbone versus a pipe of specialists',
      body: [
        'A unified VLM puts visual tokens into a language model, often through a frozen encoder and a projector. A composed system hands a cheap watcher a long tape, then a few seconds to a model that can explain them, then optionally a world model that invents an alternative.',
        'A VLA is not a VLM with a USB arm. The action stream is its own learning problem: tokenised actions under next-token loss, or a diffusion or flow-matching head on chunks. If you only SFT the language tower, you have a talker. If you only train the action head, you have a policy that may not listen.',
      ],
    },
    {
      kicker: 'THE DOMAIN',
      heading: 'Language that has to survive the camera',
      body: [
        'Most of a dashcam hour is a car staying in its lane. A model expensive enough to explain a near-miss cannot be pointed at all of it. Something cheap watches the tape; a few seconds get a sentence. That pipe is still video-language: glue between specialist models, not one pretrained objective. The invented alternative, if you generate it, looks like footage and is not.',
        'On a tabletop the label is a trajectory. Vision, language, and action have to share a clock. Gemma-Le is LoRA on a language tower and a ScaleDP denoiser on eight-step chunks, not flow matching. It is not a 2024 detector with a different title.',
      ],
    },
  ],
  instance: {
    quote:
      'A dashcam pipe that spots a near-miss and writes a sentence is video-language as systems glue. A small VLA that emits an action chunk from a written instruction is a different contract: the output is a motion, not a caption.',
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
  next: { slug: 'post-training', label: 'Post-training' },
};

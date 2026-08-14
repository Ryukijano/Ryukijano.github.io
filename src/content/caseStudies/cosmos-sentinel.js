/**
 * Fully ported from "Case Study - Cosmos Sentinel.dc.html".
 * Prose, figures, table and links are that file's, verbatim.
 */
import { href } from '../links.js';

const study = {
  slug: 'cosmos-sentinel',
  status: 'full',
  source: 'Case Study - Cosmos Sentinel.dc.html',

  year: 2026,
  lane: 'Video',
  desc: 'Near-miss clips from dashcam footage, then an invented alternative',
  featured: false,

  breadcrumb: 'VIDEO REASONING',
  kicker: 'DEMO PIPELINE · BADAS + COSMOS · ZEROGPU',
  title: 'Three models, and only one of them is asked to be right',
  lead: "Give it dashcam footage and it finds the seconds where something nearly went wrong, explains what happened in those seconds, then shows you the version where it didn't. That last part is invented, and it is the part people will believe.",

  meta: [
    { k: 'YEAR', v: '2026' },
    { k: 'ROLE', v: 'Author' },
    { k: 'STATUS', v: 'Demo · Space paused' },
    { k: 'TASK', v: 'Near-miss analysis' },
    { k: 'STACK', v: 'V-JEPA2 · Cosmos · Gradio' },
  ],

  hero: {
    src: '/assets/gifs/cosmos-sentinel-pipeline.gif',
    alt: 'A risk trace runs across a dashcam clip and spikes; those few seconds are cut out and sent onward, a larger model fills in what happened, and two short film strips play out the ending that was recorded and the one that was invented',
    caption:
      'The risk trace decides which seconds get read; only those seconds reach the model that explains them; and the explanation is what the final scene is built from. This is a schematic — the curve, the findings and the frames are illustrative, not model output.',
    highlight: 'schematic',
    gutter: true,
  },

  sections: {
    constraint: {
      num: '01',
      kicker: 'THE CONSTRAINT',
      h2: 'Most of the footage is nothing happening',
      body: [
        'A model good enough to explain a near-miss is far too expensive to point at an hour of ordinary driving. Almost all of that hour is a car staying in its lane, and a large model would spend nearly all of its effort confirming that nothing happened. The moments worth understanding are a rounding error in the footage, and nobody has marked them.',
        'So something cheap watches the whole thing first, and it is deliberately ignorant. It has no idea what a cyclist is or what a wet road means. It answers one question — is this about to go badly — and it answers it continuously. When it says yes, it hands over a few seconds of video to something that can actually explain them. Cheap and narrow decides where to look; expensive and broad decides what it means.',
      ],
    },

    method: {
      num: '02',
      kicker: 'METHOD',
      h2: 'Narrow, then deep, then imagined',
      body: 'Each stage hands the next one less, and something different in kind. A long recording becomes a moment. That moment becomes a description — how serious, who was involved, what the conditions were — kept deliberately structured rather than written out, because the last stage has to act on it rather than read it. Then the description becomes a scene that never existed.',
      buildList: [
        'Something small and fast watches the entire recording and flags when things look about to go wrong',
        'Only the seconds around that flag are cut out and passed on — everything else is discarded',
        'A far larger model reads those seconds, with the wider context available, and reports what happened as fields rather than a paragraph',
        'A world model then plays the scene forward twice — once as it went, once as it might have gone',
        'Every run leaves behind enough visual evidence for a person to disagree with it',
      ],
      closing:
        'Everything it decides, it shows its working for — where in the frame it was looking, how the risk rose and fell, what it drew a box around. A score on its own is not something anyone can argue with, and the only claim this pipeline makes is that a person can check it.',
    },

    deployment: {
      num: '03',
      kicker: 'DEPLOYMENT',
      h2: 'What survives being put somewhere public',
      body: 'Running this on a shared, free GPU is a different problem from running it on your own machine. The models weigh more than thirty gigabytes, and the clock starts the moment you are given hardware — spend that window downloading and it ends before anything is computed. Most of the deployment work is about arriving with the weights already there.',
      tableHead: ['PIECE', 'HOSTED', 'WHY'],
      tableRows: [
        {
          name: 'Risk spotter',
          cells: ['runs', 'small enough to finish inside a borrowed slice of GPU time'],
        },
        {
          name: 'The explainer',
          cells: ['runs', 'kept on disk between restarts so it never re-downloads'],
        },
        {
          name: 'The imaginer',
          cells: [
            'skipped',
            'its dependencies will not install in that environment — left out rather than faked',
          ],
        },
        {
          name: 'The weights',
          cells: ['30 GB+', 'has to already be there when the clock starts, or nothing runs'],
        },
      ],
      tableCaption:
        'The public demo runs two of the three stages. The imagining step is left out there rather than bodged into working, so what you can try online finds and explains the moment but does not generate the alternative. The full thing needs your own GPU.',
      tableCaptionHighlight: 'two of the three stages',
    },

    limits: {
      num: '04',
      kicker: 'LIMITS',
      h2: 'The convincing part is the invented part',
      body: [
        'The last stage produces video of something that did not happen. It is a guess about how traffic usually behaves, shaped by a description written by one model about a clip picked out by another. Nothing anywhere in that chain knows how heavy the car was, how wet the road was, or how fast that particular driver would have reacted. It comes out looking like footage, and it is not.',
        'That matters because of what such a video invites. Put it in front of an insurer or a review board and it stops being a hypothesis and becomes a claim about what should have happened — a weight it cannot carry. It is a way of showing someone an idea, not a way of settling whether the idea was right.',
        'The mistakes also only travel one way. If the cheap model looks in the wrong place, the expensive one never sees the incident — and it will describe whatever it was handed with complete confidence. These are not three opinions that can check each other. The second and third only ever see what the first chose, so when all three agree that is not corroboration, it is inheritance.',
        'None of this has been measured. There is no test set, no accuracy figure, nothing held back to check against. The argument it makes is about how to spend attention, and that argument stands or falls on reasoning rather than evidence.',
      ],
    },

    artefacts: {
      num: '05',
      kicker: 'ARTEFACTS',
      h2: 'Code, demo, models',
      links: [
        {
          kind: 'CODE',
          label: 'Cosmos-Sentinel',
          meta: 'pipeline + Gradio app',
          url: 'https://github.com/Ryukijano/Cosmos-Sentinel',
        },
        {
          kind: 'DEMO',
          label: 'Cosmos Sentinel',
          meta: 'Hugging Face Space',
          url: 'https://huggingface.co/spaces/Ryukijano/Cosmos_Sentinel',
        },
        {
          kind: 'MODEL',
          label: 'Cosmos Reason 2',
          meta: 'NVIDIA',
          url: 'https://github.com/nvidia-cosmos/cosmos-reason2',
        },
        {
          kind: 'MODEL',
          label: 'Cosmos Predict 2.5',
          meta: 'NVIDIA',
          url: 'https://github.com/nvidia-cosmos/cosmos-predict2.5',
        },
      ],
      closing:
        "The demo is currently paused and needs a restart before it will run. The models are access-gated, so a Hugging Face token is required either way. Built on NVIDIA's Cosmos Reason 2 and Cosmos Predict 2.5, with BADAS handling collision prediction over a V-JEPA2 backbone.",
    },
  },

  next: [
    {
      kicker: 'NEXT CASE STUDY',
      title: 'GOT-JEPA tool tracking',
      to: href('Case Study - GOT-JEPA Tool Tracking.dc.html'),
    },
    {
      kicker: 'NEXT CASE STUDY',
      title: 'FET-VAE frame prediction',
      to: href('Case Study - FET-VAE Surgical Prediction.dc.html'),
    },
    { kicker: 'BACK', title: 'All projects', to: href('Revamp E - Method Transfer.dc.html') },
  ],
};

export default study;

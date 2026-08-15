/**
 * Fully ported from "Case Study - GOT-JEPA Tool Tracking.dc.html".
 * Prose, table and links are that file's, verbatim.
 */
import { href } from '../links.js';

const study = {
  slug: 'got-jepa-tool-tracking',
  status: 'full',
  source: 'Case Study - GOT-JEPA Tool Tracking.dc.html',

  year: 2026,
  lane: 'Vision',
  desc: 'Instrument tracking that keeps identity through smoke and occlusion',
  featured: false,

  breadcrumb: 'SURGICAL VISION',
  kicker: 'IN PROGRESS · DGX SPARK · CHOLECTRACK20',
  title: 'Instrument tracking through smoke and occlusion',
  lead: 'Keyhole surgery is watched through one camera in a cavity full of smoke and blood. Software that follows the instruments loses them constantly — and a system that forgets which grasper is which the moment the view clouds is no use to anyone in theatre.',

  meta: [
    { k: 'YEAR', v: '2026' },
    { k: 'ROLE', v: 'Author' },
    { k: 'STATUS', v: 'In progress' },
    { k: 'TASK', v: 'Following instruments' },
    { k: 'STACK', v: 'DINOv2 · DETR · JEPA · PyTorch' },
  ],

  hero: {
    src: '/assets/gifs/gotjepa-occlusion.gif',
    alt: 'Two views of the same instrument sweeping across the field. One stays clear; smoke rolls across the other until the tool is barely visible. The box on the obscured view turns dashed but keeps the same track number, while a bar below shows the two descriptions drifting apart and then locking back together',
    caption:
      'One copy watches clearly, the other watches through smoke, and both must describe the same instrument the same way. When the view goes, the identity is carried rather than re-detected. This is a schematic — the scene, the obscuration and the values are illustrative, not model output.',
    highlight: 'schematic',
    gutter: true,
  },

  sections: {
    constraint: {
      num: '01',
      kicker: 'THE CONSTRAINT',
      h2: 'Nobody labels the frames where it gets hard',
      body: [
        'There are ten surgeries with every instrument marked in every frame. That is enough to teach a system what a grasper looks like, and nothing like enough to teach it what to do when the grasper vanishes behind a plume for two seconds and comes back. The obscured frames are exactly where labels run out, for the obvious reason: a human annotator watching that footage cannot tell either.',
        'There are another seventy-three surgeries available with no labels at all, which is the obvious place to look for more data. The trap is that the two collections overlap — a good fraction of the unlabelled footage is the same operations as the labelled test set. Train on it carelessly and the system has effectively seen the exam paper, and every number afterwards is worthless. Working out which videos to exclude, and enforcing it, is unglamorous and it is the difference between a result and a nice-looking mistake.',
      ],
    },

    method: {
      num: '02',
      kicker: 'METHOD',
      h2: 'Show one copy the mess, grade it against the clean view',
      body: 'The trick for getting a system to believe in objects it cannot see is to make two copies of it and give them different views of the same instant. One gets the clean frame. The other gets that frame with smoke rolled across it, blood on the lens, glare, blur. Both are asked to describe the instrument — and the one working blind is graded on whether its description matches the one that could see. Do that enough times and the description stops depending on the view.',
      buildList: [
        'A general-purpose vision model, left untouched, provides the raw understanding of each frame',
        'A detection head proposes a fixed number of instruments per frame across seven tool types',
        'Each tracked instrument gets its own running description, plus a fingerprint used to recognise it when it returns',
        'A manager decides which detections continue an existing track, which start a new one, and which have left',
        'The blind copy is trained to agree with the sighted one, with a guard against both collapsing into saying nothing',
        'How often to obscure the view is tuned deliberately — too gentle and it learns nothing, too harsh and it gives up',
      ],
      closing:
        'The order cannot be shortcut. The copy doing the grading has to already be good, because the other one is being trained to agree with it — grade against something that has learned nothing and both will happily converge on nonsense while every chart looks healthy. So the stages are gated on each other rather than run as one job, which is slower and is the only way it works.',
    },

    state: {
      num: '03',
      kicker: 'STATE',
      h2: 'Where this actually is',
      body: 'This is work in progress and the page says so rather than picking the one finished piece and implying the rest. As of June 2026 the detection experiments are done and interesting; the tracking that depends on them is not.',
      tableHead: ['PIECE', 'STATUS', 'DETAIL'],
      tableRows: [
        {
          name: 'Detector comparison',
          cells: [
            'complete',
            'eight versions compared; pretraining mattered far more than architecture',
          ],
        },
        {
          name: 'Backbone pretraining',
          cells: ['complete', 'a small encoder trained from scratch on surgical footage'],
        },
        {
          name: 'Learning to detect',
          cells: [
            'paused',
            'a quarter through; the measurement bug is fixed, the run needs restarting',
          ],
        },
        {
          name: 'Temporal pretraining',
          cells: ['collapsed', 'degenerated partway through; a fix is in but unproven'],
        },
        {
          name: 'Learning permanence',
          cells: ['blocked', 'cannot start until the detector it grades against is good enough'],
        },
      ],
      tableCaption:
        'The tracking scores written into this project are targets to clear, not results achieved. Neither has been reached. Nothing on this page should be read as a tracking result.',
      tableCaptionHighlight: 'targets to clear',
      closing:
        'The one finished study compared eight versions of the detector and found something worth keeping: what mattered was not the architecture. Starting from weights learned on ordinary photographs, rather than from scratch, was worth roughly three quarters of the final performance — more than any structural change tested. Surgical video is scarce enough that where you start dominates what you build.',
    },

    limits: {
      num: '04',
      kicker: 'LIMITS',
      h2: 'The failures that cost the most were the quiet ones',
      body: [
        'One long pretraining run degenerated partway through — the model drifted away from everything useful it had started with. There is a standard remedy for that and it has been applied, but it has not been proven yet because the run has not been restarted. The self-supervised stage sits behind that, and behind the earlier stage, which is itself paused part-way.',
        'The most expensive bug reported a validation error of exactly zero for an entire run. Nothing crashed. Glanced at quickly, a zero looks like the model doing extremely well, and it took a while to recognise it as the measurement simply not happening. Alongside it: instrument identities off by one, multi-GPU crashes traced to how the cards talk to each other, training that would not resume on a different number of GPUs. None of these are research. All of them are days.',
        'What has not been shown. The labels generated automatically for the unlabelled surgeries are wrong a meaningful fraction of the time, and the hope that this noise acts as useful roughening rather than something the model simply memorises is an assumption, not a finding. The smoke is synthetic — drawn by a function, not produced by cautery — and there is no evidence yet that learning to see through fake smoke transfers to the real thing. The later refinements, which add explicit reasoning about visibility and depth, are only worth their cost once the basic tracking works, and it does not yet.',
      ],
    },

    artefacts: {
      num: '05',
      kicker: 'ARTEFACTS',
      h2: 'Code, datasets, prior art',
      links: [
        {
          kind: 'CODE',
          label: 'Gyanateet_tracking',
          meta: 'primary pipeline',
          url: 'https://github.com/Ryukijano/Gyanateet_tracking',
        },
        {
          kind: 'CODE',
          label: 'Cholec_Vjepa-2',
          meta: 'sibling line',
          url: 'https://github.com/Ryukijano/Cholec_Vjepa-2',
        },
        {
          kind: 'DATA',
          label: 'CholecTrack20',
          meta: 'arXiv:2312.07352',
          url: 'https://arxiv.org/abs/2312.07352',
        },
        {
          kind: 'PRIOR',
          label: 'GOT-JEPA',
          meta: 'arXiv:2602.14771',
          url: 'https://arxiv.org/abs/2602.14771',
        },
        {
          kind: 'PRIOR',
          label: 'DINOv2',
          meta: 'arXiv:2304.07193',
          url: 'https://arxiv.org/abs/2304.07193',
        },
      ],
      closing:
        'Trained on a desktop AI machine and on a university GPU cluster. A second repository carries a parallel line of attack on the same footage — a different way of recognising an instrument when it reappears — run alongside this one rather than instead of it.',
    },
  },

  next: [
    {
      kicker: 'NEXT CASE STUDY',
      title: 'Surgical phase recognition',
      to: href('Case Study - Surgical Phase Detection.dc.html'),
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

/**
 * Fully ported from "Case Study - Pothole Detection.dc.html".
 * Prose, table and links are that file's, verbatim.
 *
 * That prototype uses the sticky-header layout; its header reads
 * "GYANATEET · AI RESEARCH", and `breadcrumb` carries the second half.
 */
import { href } from '../links.js';

const study = {
  slug: 'pothole-detection',
  status: 'full',
  source: 'Case Study - Pothole Detection.dc.html',

  year: 2024,
  lane: 'Vision',
  desc: 'ESRGAN restoration in front of YOLOv7 for dashcam road defects',
  featured: true,
  featuredOrder: 7,

  breadcrumb: 'AI RESEARCH',
  kicker: 'ARXIV 2401.08588 · PUBLISHED JANUARY 2024',
  title: 'Improved pothole detection using YOLOv7 and ESRGAN',
  lead: 'Detecting road defects from cheap cameras by putting super-resolution in front of the detector. A GAN upscales low-quality dashcam frames, then YOLOv7 detects on the upscaled image — so a low-resolution sensor can stand in for expensive capture hardware.',

  meta: [
    { k: 'YEAR', v: '2023–24' },
    { k: 'ROLE', v: 'Co-author' },
    { k: 'VENUE', v: 'arXiv 2401.08588' },
    { k: 'TASK', v: 'Road-defect detection' },
    { k: 'STACK', v: 'YOLOv7 · ESRGAN · SRGAN' },
  ],

  hero: {
    src: '/assets/gifs/pothole-sr.gif',
    alt: 'Pipeline schematic: a low-resolution road frame is degraded, upscaled by ESRGAN, then a YOLOv7 detection box appears over the pothole',
    caption:
      'The pipeline in order: a dashcam frame is decimated to a fraction of its resolution, ESRGAN restores it ×4, then YOLOv7 runs detection on the restored frame. This is a schematic of the pipeline on procedural road texture — not a figure from the paper and not measured output.',
    highlight: 'schematic of the pipeline on procedural road texture',
  },

  heroPair: [
    {
      src: '/assets/gifs/pothole-sr.gif',
      alt: 'Pipeline schematic: a low-resolution road frame is degraded, upscaled by ESRGAN, then a YOLOv7 detection box appears over the pothole',
      caption:
        'The pipeline in order: a dashcam frame is decimated to a fraction of its resolution, ESRGAN restores it ×4, then YOLOv7 runs detection on the restored frame. This is a schematic of the pipeline on procedural road texture — not a figure from the paper and not measured output.',
      highlight: 'schematic of the pipeline on procedural road texture',
    },
    {
      src: '/assets/images/pothole-detection-demo.png',
      alt: 'A restored dashcam still with a detection box on a road defect',
      caption:
        "A restored frame from the project's own demo still. Illustrative of what the restored input looks like, not a measured mAP figure from the paper.",
      highlight: 'Illustrative',
    },
  ],

  sections: {
    constraint: {
      num: '01',
      kicker: 'THE CONSTRAINT',
      h2: 'The camera is the budget',
      body: [
        'Automated road-defect survey is a hardware problem before it is a model problem. LIDAR rigs and high-resolution survey cameras detect potholes well and cost more than the councils that need them can spend at fleet scale. The cameras that already exist — dashcams, phone mounts, bus and bin-lorry cameras — are cheap, numerous and low quality.',
        'So the question the paper asks is narrow and practical: can a detector reach usable accuracy on deliberately degraded input if you restore the input first? That reframes the spend from sensors to compute, which scales differently.',
      ],
    },

    method: {
      num: '02',
      kicker: 'METHOD',
      h2: 'Restore, then detect',
      body: 'The ordering is the contribution. Super-resolution runs as a preprocessing stage, not as a post-hoc cleanup: the generator hallucinates plausible high-frequency detail — asphalt grain, the crumbled lip of a pothole, the shadow line at its edge — and the detector then has edges to key on that were not present in the degraded frame.',
      buildList: [
        'SRGAN / ESRGAN generator upscales the degraded frame before any detection runs',
        'YOLOv7 as the detector — single-stage, so the added SR cost is the only new latency',
        'Same low-quality frames run through each detector twice: directly, and after ESRGAN restoration',
        'Repeated across three YOLOv7 variants — standard, multi-resolution, tiny — to check whether the gain holds as the model shrinks',
        'Dataset published as Ryukijano/Pothole-detection-Yolov8 on the Hugging Face Hub',
      ],
      closing:
        "The paper's own Table 2 tabulates two conditions — low-quality frames detected directly, and the same frames after ESRGAN restoration — repeated across three YOLOv7 variants (standard, multi-resolution, tiny). There is no separately-reported high-quality baseline number; the abstract frames the project as bridging low- and high-quality performance, but what's actually measured is the before/after-restoration pair.",
    },

    results: {
      num: '03',
      kicker: 'RESULTS',
      h2: 'Where the numbers go',
      body: 'Six rows below: three YOLOv7 variants, each run on low-quality frames directly and again after ESRGAN restoration. Numbers are Table 2 of the published paper, own dataset — 1265/401/118 train/val/test split, 800p native downsampled to 360p for the degraded condition.',
      tableHead: ['ARM', 'ACCURACY', 'SPEED', 'INPUT'],
      tableColumns: '1.5fr 1fr 1fr 1fr',
      tableRows: [
        { name: 'YOLOv7x — low-quality', cells: ['0.73 mAP@.5', '53 ms', 'degraded'] },
        { name: 'YOLOv7x + ESRGAN', cells: ['0.85 mAP@.5', '69 ms', 'upscaled'] },
        { name: 'YOLOv7 multi-res — low-quality', cells: ['0.69 mAP@.5', '12 ms', 'degraded'] },
        { name: 'YOLOv7 multi-res + ESRGAN', cells: ['0.81 mAP@.5', '18 ms', 'upscaled'] },
        { name: 'YOLOv7 tiny — low-quality', cells: ['0.73 mAP@.5', '6 ms', 'degraded'] },
        { name: 'YOLOv7 tiny + ESRGAN', cells: ['0.78 mAP@.5', '9 ms', 'upscaled'] },
      ],
      // No coloured span in the prototype at this point, so no highlight.
      tableCaption:
        "mAP@0.5 rises with restoration in every variant (+12, +12, +5 points) — but so does per-frame inference time (+16ms, +6ms, +3ms), since the GAN forward pass is extra compute, not free. The paper's faster-and-more-accurate claim (Table 3) compares this pipeline against other papers' methods on a separate benchmark dataset, not against its own low-quality baseline.",
    },

    limits: {
      num: '04',
      kicker: 'LIMITS',
      h2: 'What a GAN invents, a detector can believe',
      body: [
        'Super-resolution is generative. The detail ESRGAN adds is plausible, not recovered — it is a prior over what asphalt looks like, applied to a frame that no longer contains the information. That is fine when the prior matches the road and a liability when it does not: wet tarmac, night frames, tar-sealed cracks that resemble a rim, shadows that resemble a pit. The failure mode is a confident detection on invented texture.',
        "The honest boundary is that this trades sensor cost for a second model whose errors are correlated with the detector's. A false pothole that survives both stages looks exactly like a true one downstream. Deployment needs the SR stage held to a separate check — ground-truth spot audits on a sample of flagged frames — rather than trusted because the box has high confidence.",
        'There is also a compute question that scale decides. Running a GAN on every frame is not free, and at fleet volume the SR pass may cost more than the camera upgrade it replaced. The argument holds where cameras are already deployed and cannot be swapped.',
      ],
    },

    artefacts: {
      num: '05',
      kicker: 'ARTEFACTS',
      h2: 'Paper, code, data, deployment',
      links: [
        {
          kind: 'PAPER',
          label: 'arXiv:2401.08588',
          meta: 'abstract and PDF',
          url: 'https://arxiv.org/abs/2401.08588',
        },
        {
          kind: 'CODE',
          label: 'ESRGAN_AND_YOLOV7',
          meta: 'implementation',
          url: 'https://github.com/Ryukijano/ESRGAN_AND_YOLOV7',
        },
        {
          kind: 'DATA',
          label: 'Pothole-detection-Yolov8',
          meta: 'Hugging Face dataset',
          url: 'https://huggingface.co/datasets/Ryukijano/Pothole-detection-Yolov8',
        },
        {
          kind: 'DEPLOY',
          label: 'Roboflow endpoint',
          meta: 'hosted inference',
          url: 'https://app.roboflow.com/hackthethong/pothole-detection-gmnid/deploy/4',
        },
      ],
      closing:
        'Authors: Nirmal Kumar Rout, Gyanateet Dutta, Varun Sinha, Arghadeep Dey, Subhrangshu Mukherjee, Gopal Gupta. Submitted November 2023, posted to arXiv January 2024. The implementation was also the final-year project.',
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
      title: 'Gemma-Le VLA policy',
      to: href('Case Study - Gemma-Le VLA.dc.html'),
    },
    { kicker: 'BACK', title: 'All projects', to: href('Revamp E - Method Transfer.dc.html') },
  ],
};

export default study;

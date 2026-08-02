/**
 * STUB — hero, meta and lead figure only, taken from
 * "Case Study - Pothole Detection.dc.html".
 *
 * Note: that prototype uses the sticky-header layout; its header reads
 * "GYANATEET · AI RESEARCH", and `breadcrumb` carries the second half.
 *
 * TODO: port the numbered sections from that file. The schema matches
 * conditional-gqe.js, so this is mechanical.
 */
import { href } from '../links.js';

const study = {
  slug: 'pothole-detection',
  status: 'stub',
  source: 'Case Study - Pothole Detection.dc.html',

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

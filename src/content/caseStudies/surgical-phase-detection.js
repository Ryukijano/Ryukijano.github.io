/**
 * STUB — hero, meta and lead figure only, taken from
 * "Case Study - Surgical Phase Detection.dc.html".
 *
 * Note: that prototype uses the sticky-header layout; its header reads
 * "GYANATEET · AI RESEARCH", and `breadcrumb` carries the second half.
 *
 * TODO: port the numbered sections and the credits block from that file.
 * The schema matches conditional-gqe.js, so this is mechanical.
 */
import { href } from '../links.js';

const study = {
  slug: 'surgical-phase-detection',
  status: 'stub',
  source: 'Case Study - Surgical Phase Detection.dc.html',

  breadcrumb: 'AI RESEARCH',
  kicker: 'DINO-ENDO · PUBLISHED AT ISBI 2026',
  title: 'A self-supervised vision transformer for surgical phase recognition',
  lead: 'Phase recognition in endoscopic submucosal dissection built on self-supervised encoders instead of supervised CNNs — DINOv2 for per-frame features, V-JEPA2 for learned temporal structure — with a frozen backbone and a 0.099M-parameter temporal head.',

  meta: [
    { k: 'YEAR', v: '2025–26' },
    { k: 'ROLE', v: 'Lead author' },
    { k: 'GROUP', v: 'AI in Medicine & Surgery, Leeds' },
    { k: 'DATA', v: 'LTHT · CUHK' },
    { k: 'STACK', v: 'PyTorch · DINOv2 · V-JEPA2 · MS-TCN' },
  ],

  hero: {
    // note: this asset lives under images/, not gifs/, in the prototype
    src: '/assets/images/esd-comparison.gif',
    alt: 'Per-frame DINOv2 patch-norm and centre-similarity attention maps across an ESD sequence',
    caption:
      'Backbone diagnostics across an ESD sequence — the raw endoscopic frame beside its DINOv2 patch-norm and centre-similarity maps, at increasing patch resolution. The attention concentrates on the instrument and dissection plane without any phase labels.',
  },

  next: [
    {
      kicker: 'NEXT PROJECT',
      title: 'Gemma-Le: a vision-language-action policy',
      desc: 'SigLIP vision encoding, Gemma 3 reasoning, and a ScaleDP diffusion action head for robotic manipulation.',
      to: href('Case Study - Gemma-Le VLA.dc.html'),
    },
  ],
};

export default study;

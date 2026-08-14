/**
 * Fully ported from "Case Study - Surgical Phase Detection.dc.html".
 * Prose, stats, table and links are that file's, verbatim.
 *
 * Note: that prototype uses the sticky-header layout; its header reads
 * "GYANATEET · AI RESEARCH", and `breadcrumb` carries the second half.
 */
import { href } from '../links.js';

const study = {
  slug: 'surgical-phase-detection',
  status: 'full',
  source: 'Case Study - Surgical Phase Detection.dc.html',

  year: 2026,
  lane: 'Vision',
  desc: 'Frozen self-supervised encoders for endoscopic phase recognition',
  featured: true,
  featuredOrder: 3,

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

  sections: {
    problem: {
      num: '01',
      kicker: 'PROBLEM',
      h2: 'Annotation is the bottleneck, not architecture',
      body: [
        'ESD is a long, high-skill procedure, and phase recognition needs frame-level labels that only clinicians can produce. The prevailing approach — a supervised ResNet-50 paired with a multi-stage temporal convolutional network — inherits both problems: it needs a large annotated corpus, and its CNN features struggle to separate the fine visual cues that distinguish one phase from the next.',
        'The phases themselves are also badly imbalanced. In the porcine dataset, dissection accounts for 64% of frames and marking for 0.57%.',
      ],
    },

    engineering: {
      num: '02',
      kicker: 'ENGINEERING',
      h2: 'Two self-supervised encoders, one frozen-backbone recipe',
      body: [
        'The premise is that phase recognition should not need a supervised feature extractor at all. Both encoders in the study are trained without labels: DINOv2 ViT-S/14 on single frames, and V-JEPA2 ViT-L, which learns by predicting masked regions in latent space across time rather than in pixels — temporal structure comes out of the encoder instead of being reconstructed by the decoder.',
        'DINOv2 is adapted in two unlabelled stages — 120,000 frames of porcine video, then 150,000 frames of human endoscopy from Leeds Teaching Hospitals. Both backbones are then frozen and only the temporal decoder is trained on the labelled subset, so the two are compared on identical downstream conditions.',
      ],
      // the prototype renders these as a plain <ul>; BuildList is the site's
      // shared visual language for the same kind of list. Text is verbatim.
      buildList: [
        'Frozen DINOv2 ViT-S/14 backbone — 21.8M parameters, only 0.3M of them trainable',
        'V-JEPA2 ViT-L evaluated as the temporal-encoder arm — latent masked prediction across frames, 303.9M parameters, also frozen',
        'Two-stage unlabelled pretraining: porcine video first, then human endoscopy',
        '4-stage MS-TCN with a dimension-4 transformer head — 0.099M parameters',
        'Focal loss (γ=2.0) with inverse-frequency class weighting for the 0.57% marking phase',
      ],
      closing:
        'The bet: if the features are strong enough, the temporal model can be almost trivially small. It was — a 4-stage TCN with a dimension-4 transformer head, 0.099M trainable parameters, beat both the 2-stage and the 8-stage variants.',
    },

    results: {
      num: '03',
      kicker: 'RESULTS',
      // no <h2> in the prototype: the section opens on the stats row
      stats: [
        { value: '90.0%', label: 'DINOv2 ViT-S on porcine — top of the encoders tested' },
        { value: '89.5%', label: 'On LTHT human data; the AI-Endo ResNet baseline sits ~20 points below' },
        { value: '14×', label: 'Parameter gap: V-JEPA2 ViT-L at 303.9M against ViT-S at 21.8M' },
        { value: '25 ms', label: 'ViT-S inference on an NVIDIA A2; V-JEPA2 costs over 3× that' },
      ],
      tableHead: ['ENCODER', 'PARAMS', 'PORCINE', 'HUMAN', 'Δ P→H'],
      tableRows: [
        { name: 'AI-Endo (ResNet-50, supervised)', cells: ['—', '—', '−20 pts', '—'] },
        { name: 'DINOv2 ViT-S/14 (frozen)', cells: ['21.8M', '90.0%', '89.5%', '−12.5'] },
        { name: 'V-JEPA2 ViT-L (frozen)', cells: ['303.9M', 'tbc', 'tbc', 'best'] },
      ],
      tableCaption:
        'All rows share the same 4-stage MS-TCN decoder; Δ P→H is the accuracy drop when training on porcine and testing on human. The AI-Endo baseline is recorded only as a relative figure — roughly 20 points below DINOv2 on the human set. Cells marked tbc are pending the V-JEPA2 accuracy and latency figures from the published paper.',
      tableCaptionHighlight: 'tbc',
      closing: [
        'Both self-supervised encoders beat the supervised AI-Endo ResNet baseline, which is the result the study was set up to test. Between the two, they trade: DINOv2 ViT-S wins in-domain accuracy and runs at 25 ms on an A2, while V-JEPA2 ViT-L transfers better across the porcine → human gap — its video-level objective holds up where per-frame features drift. It costs 303.9M parameters against 21.8M, and roughly three times the latency, to do it.',
        'So the small encoder ships today, on the hardware a hospital actually has. That constraint is a hardware fact, not an architectural verdict — on Blackwell-class and later Vera Rubin accelerators a frozen ViT-L video encoder at these frame rates stops being the expensive option, and the temporal-encoder route becomes the default rather than the ablation.',
        'Decoder size followed the same pattern: porcine → human transfer drops the 4-stage head by 12.5 points versus 17.0 for the 8-stage.',
      ],
    },

    resources: {
      num: '04',
      kicker: 'RESOURCES',
      links: [
        {
          kind: 'CODE',
          label: 'DINOEndo',
          meta: 'GitHub README only',
          url: 'https://github.com/Ryukijano/DINOEndo',
        },
        {
          kind: 'WEIGHTS',
          label: 'dino-endo-phase-models',
          meta: 'Hugging Face',
          url: 'https://huggingface.co/Ryukijano/dino-endo-phase-models',
        },
        {
          kind: 'WEIGHTS',
          label: 'ai-endo-phase-models',
          meta: 'Hugging Face',
          url: 'https://huggingface.co/Ryukijano/ai-endo-phase-models',
        },
        {
          kind: 'WEIGHTS',
          label: 'vjepa2-phase-models',
          meta: 'Hugging Face',
          url: 'https://huggingface.co/Ryukijano/vjepa2-phase-models',
        },
        {
          kind: 'PROFILE',
          label: 'ORCID record',
          meta: 'orcid.org',
          url: 'https://orcid.org/0009-0008-0480-9241',
        },
        {
          kind: 'INDEX',
          label: 'All publications',
          meta: 'this site',
          url: href('Academic.dc.html'),
        },
      ],
    },

    credits: {
      // unnumbered in the prototype, and no heading
      kicker: 'CREDITS',
      body: 'With Aya Hammad (York), Thomas Archer and Noor Mohammed (Leeds Teaching Hospitals NHS Trust), Qi Dou (CUHK), and Sharib Ali (Leeds). Supported by the Worldwide Universities Network Research Development Fund 2024. Porcine data used under CUHK ethics approval 22-145-MIS; LTHT data fully anonymised and consented.',
    },
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

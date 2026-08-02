/**
 * Fully ported from "Case Study - FET-VAE Surgical Prediction.dc.html".
 * Prose, tables and links are that file's, verbatim.
 *
 * Note: that prototype uses the sticky-header layout rather than the
 * breadcrumb-nav layout, and its header reads "GYANATEET · AI RESEARCH".
 * `breadcrumb` below carries the second half of that string.
 */
import { href } from '../links.js';

const study = {
  slug: 'fet-vae-surgical-prediction',
  status: 'full',
  source: 'Case Study - FET-VAE Surgical Prediction.dc.html',

  breadcrumb: 'AI RESEARCH',
  kicker: 'MSC THESIS · UNIVERSITY OF LEEDS',
  title: 'Predicting the next twenty frames of a suture',
  lead: 'A VAE-Transformer hybrid that splits surgical video into content, motion and gesture before rolling it forward — built for the JIGSAWS Suturing dataset, where the frames are small and the motion is precise.',

  meta: [
    { k: 'PROGRAMME', v: 'MSc, University of Leeds' },
    { k: 'DATASET', v: 'JIGSAWS Suturing' },
    { k: 'PSNR (t=20)', v: '28.13 dB' },
    { k: 'SSIM (t=20)', v: '0.927' },
    { k: 'SPEED', v: '22 FPS' },
  ],

  hero: {
    src: '/assets/gifs/fetvae-prediction.gif',
    alt: 'FET-VAE pipeline: Swin Transformer content encoding, RAFT-Small motion encoding, ternary latent space, autoregressive rollout, and t=20 metrics',
    caption:
      "The architecture as described in the repository — a Swin Transformer content encoder and a RAFT-Small motion encoder feed a ternary latent (content, motion, gesture), which an autoregressive transformer rolls forward and a ViT-based decoder renders back to pixels. PSNR 28.13 dB, SSIM 0.927, LPIPS 0.062 and 22 FPS at a 20-frame rollout on the JIGSAWS test set are the repository's reported numbers; the per-frame quality-decay curve shown is illustrative, not plotted from real per-frame data — only the t=20 endpoint is real. A separate record (this project's MSc thesis listing) reports +2.36 dB PSNR as an improvement over a baseline, which is a different framing than the 28.13 dB absolute figure here — I haven't been able to confirm the baseline value that connects the two, so both are stated separately rather than merged.",
    highlight:
      "PSNR 28.13 dB, SSIM 0.927, LPIPS 0.062 and 22 FPS at a 20-frame rollout on the JIGSAWS test set are the repository's reported numbers; the per-frame quality-decay curve shown is illustrative, not plotted from real per-frame data — only the t=20 endpoint is real. A separate record (this project's MSc thesis listing) reports +2.36 dB PSNR as an improvement over a baseline, which is a different framing than the 28.13 dB absolute figure here — I haven't been able to confirm the baseline value that connects the two, so both are stated separately rather than merged.",
  },

  sections: {
    problem: {
      num: '01',
      kicker: 'PROBLEM',
      h2: 'Surgical video is small, precise, and repetitive',
      body: [
        'Predicting future frames of a surgical video is a narrower problem than general video prediction: the camera is close, the motion is a hand and a needle, and the background barely moves. That structure is an opportunity — content and motion can be modelled separately instead of jointly — but only if the split is done at the right granularity.',
        'JIGSAWS Suturing supplies the training data: short sequences at 64×64 or 128×128 resolution, normalised to [-1, 1], one frame every other frame of the original capture.',
      ],
    },

    method: {
      num: '02',
      kicker: 'METHOD',
      // no <h2> in the prototype: the section opens on the body paragraph
      body: "FET-VAE — Flow-Enhanced Ternary VAE — separates what a frame shows from how it's moving before either reaches the temporal model.",
      // the prototype renders these four stages as a headerless panel; the
      // column labels are the design system's, the cell text is the source's.
      tableHead: ['STAGE', 'COMPONENT', 'ROLE'],
      tableRows: [
        {
          name: 'ENCODE',
          cells: [
            'Swin Transformer + RAFT-Small',
            'Content encoder (Swin Transformer) and motion encoder (RAFT-Small optical flow) run on the same input frame, in parallel.',
          ],
        },
        {
          name: 'LATENT',
          cells: [
            'Ternary latent space',
            'Content (128d), motion (64d) and a gesture/label channel (3d) concatenate into one 195-dimensional latent per frame.',
          ],
        },
        {
          name: 'ROLL FORWARD',
          cells: [
            'Autoregressive transformer',
            '4 heads, 4 layers, max sequence length 20 — carries the latent forward in time, frame by frame.',
          ],
        },
        {
          name: 'DECODE',
          cells: [
            'ViT-based decoder',
            'Renders each predicted latent back to a frame for comparison against ground truth.',
          ],
        },
      ],
      closing:
        'The latent is genuinely ternary — content (128d), motion (64d) and a small gesture/label channel (3d) — concatenated into a single 195-dimensional vector per frame. An autoregressive transformer (4 heads, 4 layers, max sequence length 20) carries that vector forward in time; a ViT-based decoder turns each predicted latent back into a frame. Training used a KL weight (beta) of 1e-4 and a flow-consistency weight (lambda_flow) of 0.1, both small relative to the reconstruction term — the flow and KL terms are regularisers here, not the primary objective.',
    },

    finding: {
      num: '03',
      kicker: 'FINDING',
      h2: 'Twenty frames out, still real-time',
      body: [
        "At a 20-frame rollout on the JIGSAWS test set: PSNR 28.13 dB, SSIM 0.927, LPIPS 0.062, and inference at 22 FPS. The FPS figure is the one that matters for a surgical-assist context — a prediction model that can't keep pace with the video feed isn't useful regardless of its reconstruction quality, and 22 FPS keeps this one inside real-time territory for most endoscopic capture rates.",
        'One thing I want to be precise about rather than paper over: this project\'s publication record elsewhere on this site describes the result as "+2.36 dB PSNR over baseline," a relative improvement figure. The repository\'s own README reports 28.13 dB as an absolute value at t=20. Both could be true — 28.13 dB may be exactly what a ~25.8 dB baseline plus 2.36 dB looks like — but I don\'t have the baseline number in front of me to confirm that arithmetic, so I\'m reporting both figures on their own terms instead of quietly merging them into one.',
      ],
    },

    inContext: {
      num: '04',
      kicker: 'IN CONTEXT',
      // no <h2> in the prototype
      body: 'The other surgical-video work on this site, for comparison:',
      // again a headerless panel in the source; only the column labels are new.
      tableHead: ['WHERE', 'WORK', 'WHAT IT IS'],
      tableRows: [
        {
          name: 'ISBI 2026',
          cells: [
            'Surgical phase recognition',
            'DINOv2 ViT-S/14 and V-JEPA2 ViT-L as frozen encoders, 90.0% porcine / 89.5% human at 25 ms on an NVIDIA A2 — classification, not prediction.',
          ],
        },
        {
          name: 'MSC THESIS',
          cells: [
            'FET-VAE (this project)',
            'Video prediction rather than classification — the goal is the next frame, not the current phase label.',
          ],
        },
      ],
    },

    resources: {
      num: '05',
      kicker: 'RESOURCES',
      links: [
        {
          kind: 'CODE',
          label: 'vae-surgical-prediction',
          meta: 'github.com',
          url: 'https://github.com/Ryukijano/vae-surgical-prediction',
        },
        {
          kind: 'DATASET',
          label: 'JIGSAWS Suturing',
          meta: 'cirl.lcsr.jhu.edu',
          url: 'https://cirl.lcsr.jhu.edu/research/hmm/datasets/jigsaws_release/',
        },
      ],
    },
  },

  next: [
    {
      kicker: 'NEXT PROJECT',
      title: 'A self-supervised vision transformer for surgical phase recognition',
      desc: 'DINOv2 and V-JEPA2 against a supervised baseline, at 25 ms per inference.',
      to: href('Case Study - Surgical Phase Detection.dc.html'),
    },
  ],
};

export default study;

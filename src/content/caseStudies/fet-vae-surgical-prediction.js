/**
 * STUB — hero, meta and lead figure only, taken from
 * "Case Study - FET-VAE Surgical Prediction.dc.html".
 *
 * Note: that prototype uses the sticky-header layout rather than the
 * breadcrumb-nav layout, and its header reads "GYANATEET · AI RESEARCH".
 * `breadcrumb` below carries the second half of that string.
 *
 * TODO: port the numbered sections from that file. The schema matches
 * conditional-gqe.js, so this is mechanical.
 */
import { href } from '../links.js';

const study = {
  slug: 'fet-vae-surgical-prediction',
  status: 'stub',
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

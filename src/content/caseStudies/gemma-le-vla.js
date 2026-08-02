/**
 * STUB — hero, meta and lead figure only, taken from
 * "Case Study - Gemma-Le VLA.dc.html".
 *
 * Note: that prototype uses the sticky-header layout; its header reads
 * "GYANATEET · ROBOTICS", and `breadcrumb` carries the second half.
 *
 * TODO: port the numbered sections from that file, including the two-up
 * gemma-groot-arch.png / gemma-groot-demo.png figure pair that follows the
 * hero. The schema matches conditional-gqe.js, so this is mechanical.
 */
import { href } from '../links.js';

const study = {
  slug: 'gemma-le-vla',
  status: 'stub',
  source: 'Case Study - Gemma-Le VLA.dc.html',

  breadcrumb: 'ROBOTICS',
  kicker: 'GEMMA-LE / GEMMA-GR00T · OPEN WEIGHTS, 5B',
  title: 'A compact vision-language-action policy for manipulation',
  lead: 'SigLIP for vision, Gemma 3 for language, and a ScaleDP diffusion head that denoises eight-step action chunks — assembled in LeRobot on three L40s. Every backbone is a stock Hugging Face checkpoint, which is the point: the NV Eagle components it replaces were not.',

  meta: [
    { k: 'YEAR', v: '2025' },
    { k: 'ROLE', v: 'Solo build' },
    { k: 'DOMAIN', v: 'Robotic manipulation' },
    { k: 'METHOD', v: 'Imitation learning' },
    { k: 'STACK', v: 'LeRobot · SigLIP · Gemma 3 · ScaleDP' },
    { k: 'HARDWARE', v: '3× NVIDIA L40, SLURM' },
  ],

  hero: {
    src: '/assets/gifs/vla-diffusion.gif',
    alt: 'Gemma-Le architecture with the action head denoising across 50 diffusion steps',
    caption:
      "Signal path and the action head's denoising schedule. Multimodal inputs reach the transformer core, the fused 768-dim conditioning vector reaches the diffusion head, and the head walks an action chunk from noise to trajectory over 50 steps. Architecture diagram is the project's own; the denoising curve is illustrative.",
    highlight: "Architecture diagram is the project's own; the denoising curve is illustrative.",
  },

  next: [
    {
      kicker: 'NEXT PROJECT',
      title: 'Hydrogen on nickel, on a noisy device',
      desc: 'VQE and sample-based quantum diagonalisation against a Rolls-Royce materials problem at the NQCC UK Quantum Hackathon.',
      to: href('Case Study - NQCC Rolls-Royce Challenge.dc.html'),
    },
  ],
};

export default study;

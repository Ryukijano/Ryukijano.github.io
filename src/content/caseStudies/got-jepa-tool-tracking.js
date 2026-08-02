/**
 * STUB — hero, meta and lead figure only, taken from
 * "Case Study - GOT-JEPA Tool Tracking.dc.html".
 *
 * TODO: port the numbered sections from that file. The schema matches
 * conditional-gqe.js, so this is mechanical.
 */
import { href } from '../links.js';

const study = {
  slug: 'got-jepa-tool-tracking',
  status: 'stub',
  source: 'Case Study - GOT-JEPA Tool Tracking.dc.html',

  breadcrumb: 'SURGICAL VISION',
  kicker: 'IN PROGRESS · DGX SPARK · CHOLECTRACK20',
  title: 'Teaching a tracker that the instrument still exists behind the smoke',
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

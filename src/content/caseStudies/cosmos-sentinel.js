/**
 * STUB — hero, meta and lead figure only, taken from
 * "Case Study - Cosmos Sentinel.dc.html".
 *
 * TODO: port the numbered sections (constraint / method / results / limits /
 * artefacts) from that file. The schema matches conditional-gqe.js, so this is
 * mechanical: add a `sections` object here and a body component under
 * src/pages/studies/.
 */
import { href } from '../links.js';

const study = {
  slug: 'cosmos-sentinel',
  status: 'stub',
  source: 'Case Study - Cosmos Sentinel.dc.html',

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

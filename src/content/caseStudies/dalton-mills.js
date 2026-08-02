/**
 * STUB — hero, meta, lead figure and the one pull quote, taken from
 * "Case Study - Dalton Mills.dc.html".
 *
 * TODO: port the numbered sections from that file. The schema matches
 * conditional-gqe.js, so this is mechanical.
 */
import { href } from '../links.js';

const study = {
  slug: 'dalton-mills',
  status: 'stub',
  source: 'Case Study - Dalton Mills.dc.html',

  breadcrumb: 'HERITAGE & XR',
  kicker: 'HELIX XR · UNIVERSITY OF LEEDS · SCIENCE MUSEUM GROUP',
  title: 'Ten photographs of a building that burned down',
  lead: 'Dalton Mills was a Grade II* listed mill in Keighley until a fire destroyed it in 2022. What survives is a handful of photographs. This is a walkable reconstruction built from ten of them — and an argument about which parts of it anyone is entitled to believe.',

  meta: [
    { k: 'YEAR', v: '2024–25' },
    { k: 'ROLE', v: 'Team of four' },
    { k: 'SUBJECT', v: 'Dalton Mills, Keighley' },
    { k: 'SOURCE DATA', v: 'Ten photographs' },
    { k: 'STACK', v: 'Unreal Engine · deep learning · VR' },
  ],

  hero: {
    src: '/assets/gifs/dalton-mills-reconstruction.gif',
    alt: "A mill facade rebuilt as a cloud of points. Ten camera positions sit along the base. Surfaces the photographs covered fill in one colour; the chimney's far side and the receding flank fill in another, marked as never photographed",
    caption:
      "Ten camera positions, and a facade rebuilt from them. What the photographs actually cover is one thing; the far side of the chimney and the receding flank are another. This is a schematic — camera placement and coverage are illustrative, not the project's own capture data.",
    highlight: 'schematic',
  },

  // Rendered by PullQuote; sits between sections 02 and 03 in the prototype.
  pullQuote: {
    quote:
      '“This project pushed limits on using AI techniques for historical accuracy, as AI can be inaccurate, which meant that we needed to closely stick to the records. I had to balance out creative freedom when creating 3D objects with making them as historically accurate as possible with the records we have.”',
    attribution: 'GYANATEET DUTTA · HELIX CASE STUDIES, JANUARY 2025',
  },

  next: [
    {
      kicker: 'NEXT CASE STUDY',
      title: 'Pothole detection',
      to: href('Case Study - Pothole Detection.dc.html'),
    },
    {
      kicker: 'NEXT CASE STUDY',
      title: 'Cosmos Sentinel',
      to: href('Case Study - Cosmos Sentinel.dc.html'),
    },
    { kicker: 'BACK', title: 'All projects', to: href('Revamp E - Method Transfer.dc.html') },
  ],
};

export default study;

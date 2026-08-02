/**
 * STUB — hero, meta and lead figure only, taken from
 * "Case Study - Syndrome-Net.dc.html".
 *
 * TODO: port the numbered sections from that file. The schema matches
 * conditional-gqe.js, so this is mechanical.
 */
import { href } from '../links.js';

const study = {
  slug: 'syndrome-net',
  status: 'stub',
  source: 'Case Study - Syndrome-Net.dc.html',

  breadcrumb: 'QUANTUM ERROR CORRECTION',
  kicker: 'SURFACE · COLOUR · qLDPC · BOSONIC',
  title: 'Catching the errors you are never allowed to look at',
  lead: 'A quantum computer cannot be checked for mistakes directly — reading a qubit destroys what it was holding. Error correction works from fingerprints instead. This is a workbench for designing those schemes, testing how well they hold, and being honest about what the test actually ran on.',

  meta: [
    { k: 'YEAR', v: '2026' },
    { k: 'ROLE', v: 'Author' },
    { k: 'STATUS', v: 'Active' },
    { k: 'TASK', v: 'Error correction research' },
    { k: 'STACK', v: 'Stim · RL · GPU kernels' },
  ],

  hero: {
    src: '/assets/gifs/syndrome-net-decode.gif',
    alt: 'A grid of qubits where an error travels invisibly along several links, the detectors at either end light up in response, and the decoder draws its best guess at what connected them — while alongside, each accelerator is tried in turn and rejected until one actually runs',
    caption:
      'The error itself is never observed. Only the detectors at its ends fire, and the repair is inferred from those two points alone. This is a schematic — the fault positions and the machine it settles on are illustrative, not a real run.',
    highlight: 'schematic',
  },

  next: [
    {
      kicker: 'NEXT CASE STUDY',
      title: 'Conditional-GQE',
      to: href('Case Study - Conditional GQE.dc.html'),
    },
    {
      kicker: 'NEXT CASE STUDY',
      title: 'NQCC Rolls-Royce challenge',
      to: href('Case Study - NQCC Rolls-Royce Challenge.dc.html'),
    },
    { kicker: 'BACK', title: 'All projects', to: href('Revamp E - Method Transfer.dc.html') },
  ],
};

export default study;

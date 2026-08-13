/** Extracted from "Intro.dc.html". */
import { href } from './links.js';
import { intro as palette } from '../components/tokens.js';

export const panes = [
  {
    id: 'ryukijano',
    accent: palette.ryukijano,
    to: '/persona/ryukijano',
    tags: 'CUDA · UNREAL · THREE.JS · PHOTOGRAMMETRY',
    lines: ['Ryu', 'ki', 'jano'],
    role: 'Graphics & systems',
    desc: 'Real-time rendering, GPU work, and rebuilding things that no longer exist.',
    font: 'var(--md-sys-typescale-brand-font)',
    weight: 300,
    tracking: '-0.03em',
  },
  {
    id: 'gyanateet',
    accent: palette.gyanateet,
    to: '/persona/gyanateet',
    tags: 'PYTORCH · DINOV2 · V-JEPA2 · JAX',
    lines: ['G', 'YANA', 'TEET'],
    role: 'Vision & robotics',
    desc: 'Self-supervised video for surgery, and policies that act on what they see.',
    font: 'var(--md-sys-typescale-plain-font)',
    weight: 600,
    tracking: '-0.035em',
  },
  {
    id: 'ryoushi',
    accent: palette.ryoushi,
    to: '/persona/ryoushi',
    tags: 'QISKIT · CUDA-Q · VQE · ERROR CORRECTION',
    lines: ['RY', 'OU', 'SHI'],
    role: 'Quantum algorithms',
    desc: 'Circuit design, error correction, and being careful about what counts as an advantage.',
    font: 'var(--md-sys-typescale-mono-font)',
    weight: 500,
    tracking: '0.02em',
  },
];

export const seamLabels = ['ML FOR SCIENCES', 'ML FOR SCIENCES'];

export const thesis = {
  kicker: 'Three rooms',
  lead: 'The overlap is where it gets interesting.',
  prose: [
    'Graphics taught me that a renderer is a physics argument you can look at. Surgical video taught me that a confident model is still just a guess. Quantum work is mostly an education in where methods give out. None of the three is decoration for the others. The things that carry between them are the actual work, and they carry both ways.',
    'One question runs through most of it. What did the sensor actually record, and what did the model add? A super-resolved road, a mill rebuilt from ten photos, a crash that never happened, tissue inferred behind smoke. Different projects, same problem, and you usually can’t tell by looking.',
  ],
};

export const strands = [
  {
    num: '01',
    title: 'Graphics & systems',
    meta: 'CUDA · Unreal · reconstruction',
    to: '/persona/ryukijano',
  },
  {
    num: '02',
    title: 'Vision & robotics',
    meta: 'surgical video · VLA policies',
    to: '/persona/gyanateet',
  },
  {
    num: '03',
    title: 'Quantum algorithms',
    meta: 'circuit design · error correction',
    to: '/persona/ryoushi',
  },
  {
    num: '04',
    title: 'Machine learning for sciences',
    meta: 'where the other three overlap',
    to: href('Revamp E - Method Transfer.dc.html'),
  },
];

export const doors = [
  {
    kick: 'Work',
    title: 'Selected work',
    desc: 'Eleven write-ups, each with a section on what it can’t do.',
    to: href('Revamp E - Method Transfer.dc.html'),
  },
  {
    kick: 'Academic',
    title: 'Research & writing',
    desc: 'Papers, projects, and how I got here.',
    to: href('Academic.dc.html'),
  },
  {
    kick: 'Code',
    title: 'GitHub',
    desc: 'About a hundred repos, wildly varying seriousness.',
    to: 'https://github.com/Ryukijano',
  },
];

export const footNote =
  'Gyanateet Dutta · MSc Advanced Computer Science (Artificial Intelligence), University of Leeds · Leeds, UK';

export default { panes, seamLabels, thesis, strands, doors, footNote };

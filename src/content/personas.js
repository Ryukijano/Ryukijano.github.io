/**
 * Persona rooms. Statements carry the anti-slop facts with softened
 * delivery (2026-08-22): dates do the work, redundant "I am not still"
 * clauses removed, imperatives replaced by declaratives. No prize, title,
 * or affiliation changed. One locked still plus the small GIF that belongs
 * to that lane — not a triptych.
 */
import dalton from './caseStudies/dalton-mills.js';
import fetVae from './caseStudies/fet-vae-surgical-prediction.js';
import shor from './caseStudies/yquantum-shors-algorithm.js';

export const personas = {
  ryukijano: {
    id: 'ryukijano',
    title: 'Ryukijano',
    subtitle: 'Graphics & systems',
    statement:
      'I work on graphics and systems: photogrammetry into Unreal, CUDA C++, physics-informed nets. Sep–Dec 2024 I was with Science Museum Group and Leeds HELIX XR on Dalton Mills. Since Nov 2025 my paid work is medical computer vision at Leeds (NDA), which lives in the vision lane.',
    paneClass: 'pane-ryukijano',
    figures: [
      {
        src: '/assets/images/kanagawa_latentspace_autoencoder.jpg',
        alt: "Hokusai's wave reconstructed by a latent autoencoder: painted, dithered, wireframed",
        caption: 'Hokusai reconstructed in a latent autoencoder. A schematic of a representation, not a measurement.',
        highlight: 'schematic',
      },
      {
        src: dalton.hero.src,
        alt: dalton.hero.alt,
        caption: dalton.hero.caption,
        highlight: dalton.hero.highlight,
        poster: dalton.hero.poster,
      },
    ],
    projects: [
      { year: 2024, title: 'Dalton Mills', to: '/work/dalton-mills' },
      {
        title: 'PINNs',
        to: 'https://github.com/Ryukijano/Physics-Based-DeepLearning',
        note: 'CUDA notebooks for Navier–Stokes and Burgers-type PDEs. Methods notes, not a validated CFD code.',
      },
      {
        title: 'B3tt3r',
        to: 'https://github.com/Ryukijano/B3tt3r',
        note: 'Mast3r + Spann3r for stereo reconstruction from image pairs.',
      },
      {
        title: 'CUDAQuest',
        to: 'https://github.com/Ryukijano/QuantumVice-M25-CUDAQuest',
        note: 'CUDA C++ and CUDA-Q / cuQuantum kernel drills.',
      },
      {
        title: 'Multiview diffusion',
        to: 'https://huggingface.co/spaces/Ryukijano/Multiview_diffusion_3d',
        note: '2024 Gradio space. No write-up on this site.',
      },
    ],
  },
  gyanateet: {
    id: 'gyanateet',
    title: 'Gyanateet',
    subtitle: 'Vision & robotics',
    statement:
      'I finished the MSc Advanced Computer Science (Artificial Intelligence) at the University of Leeds in 2023–2024. Mar–Nov 2025 I interned with AIMS (AI in Medicine and Surgery) on ESD workflow / DINOv2. Since Nov 2025 I have been a research technician at Leeds on medical computer vision under NDA. The public record is the ISBI paper and the thesis repo.',
    paneClass: 'pane-gyanateet',
    figures: [
      {
        src: '/assets/images/computer_vision.jpg',
        alt: 'Endoscopic still from the vision lane',
        caption: 'A still from the vision lane — not a figure from the ISBI paper.',
      },
      {
        src: fetVae.hero.src,
        alt: fetVae.hero.alt,
        caption: fetVae.hero.caption,
        highlight: fetVae.hero.highlight,
        poster: fetVae.hero.poster,
      },
    ],
    projects: [
      { year: 2026, title: 'Surgical phase detection', to: '/work/surgical-phase-detection' },
      { year: 2024, title: 'FET-VAE surgical prediction', to: '/work/fet-vae-surgical-prediction' },
      {
        year: 2024,
        title: 'Pothole detection',
        to: '/work/pothole-detection',
        note: 'Co-author. arXiv:2401.08588.',
      },
      { year: 2026, title: 'GOT-JEPA tool tracking', to: '/work/got-jepa-tool-tracking' },
      { year: 2025, title: 'Gemma-Le', to: '/work/gemma-le-vla' },
    ],
  },
  ryoushi: {
    id: 'ryoushi',
    title: 'Ryoushi',
    subtitle: 'Quantum algorithms',
    statement:
      'I work on hybrid quantum–classical experiments in Qiskit, PennyLane, and cuQuantum. Quantum Buddies is a three-person collective, not a funded lab. Bradford, YQuantum, NQCC, and City of London were weekend-scale builds, prototypes rather than clinical or industrial deployments.',
    paneClass: 'pane-ryoushi',
    figures: [
      {
        src: '/assets/images/nightcity.jpg',
        alt: 'Night city still used as the quantum-lane lock',
        caption: 'A lock still for this lane; it is not a hardware result.',
      },
      {
        src: shor.hero.src,
        alt: shor.hero.alt,
        caption: shor.hero.caption,
        highlight: shor.hero.highlight,
        poster: shor.hero.poster,
      },
    ],
    projects: [
      { year: 2026, title: 'Conditional-GQE', to: '/work/conditional-gqe' },
      {
        year: 2025,
        title: 'YQuantum virtual track',
        to: '/work/yquantum-shors-algorithm',
        note: 'Quantum Rings virtual track with Alisa Petrusinskaia / Quantum Bits. Not the Yale Grand Prize.',
      },
      { year: 2026, title: 'Syndrome-Net', to: '/work/syndrome-net' },
      {
        year: 2025,
        title: 'NQCC Rolls-Royce',
        to: '/work/nqcc-rolls-royce',
        note: 'Participant. Hydrogen-on-nickel, Edinburgh Jul 2025. Not a placed winner.',
      },
      {
        year: 2025,
        title: 'Bradford Quantum Hackathon',
        to: 'https://www.linkedin.com/posts/gyanateet-dutta-386215192_quantumcomputing-quantummachinelearning-activity-7399278953322151936-ZAmz',
        note: 'Teammate-reported prizes. Hackathon-scale, not clinical.',
      },
    ],
  },
};

export function getPersona(id) {
  return personas[id] ?? null;
}

export default personas;

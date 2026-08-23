/**
 * Extracted from "Revamp E - Method Transfer.dc.html" — the hero, the
 * technique matrix, and the four strands with their project lists.
 *
 * TODO: that prototype also carries a papers section, a weights-and-demos
 * section, an "elsewhere" link directory and a SoundCloud embed. None of those
 * are ported yet; the papers and software lists already exist in
 * src/content/academic.js and could be shared rather than duplicated.
 */
import { href } from './links.js';

export const hero = {
  kicker: 'MSC ADVANCED COMPUTER SCIENCE (ARTIFICIAL INTELLIGENCE), UNIVERSITY OF LEEDS',
  name: ['Gyanateet', 'Dutta'],
  roles: [
    'GRAPHICS & SYSTEMS',
    'VISION & ROBOTICS',
    'QUANTUM ALGORITHMS',
    'ML FOR SCIENCES',
  ],
  lead: 'Quantum computing, machine learning for sciences, computer vision and robotics.',
  affiliations: [
    'Research technician · University of Leeds',
    'Qiskit Advocate',
    'Quantum Buddies, co-founder',
  ],
};

export const method = {
  num: '00',
  kicker: 'SHARED METHODS',
  title: ['Five techniques,', 'four fields'],
  lead: 'Recovering surgical phase from endoscopic video and recovering a physical error from stabiliser measurements are the same job: discrete state out of a noisy, correlated signal. The four columns below run on the same five techniques.',
  hint: 'Hover a row to follow one technique across all four.',
  headLabel: 'TECHNIQUE',
  caveat:
    'Transfer generates hypotheses, it does not guarantee them. A decoder that handles Gaussian sensor noise does not handle correlated, non-Markovian noise on real hardware, and a frozen encoder that crosses porcine and human tissue will not cross imaging modalities. The overlap says what to try first.',
};

// rows are techniques, columns the four fields. Framing, not measured results.
export const matrix = [
  {
    method: 'Frozen backbone, small trained head',
    note: 'Buy the representation, train what is cheap.',
    cells: [
      'Pretrained 3D priors, light per-scene fit',
      'DINOv2 ViT-S/14 and V-JEPA2 ViT-L frozen, 0.099M MS-TCN trained',
      'Fixed code, learned decoder over syndromes',
      'Frozen video encoder into a brain-response head',
    ],
  },
  {
    method: 'Discrete state from a noisy signal',
    note: 'The load-bearing overlap.',
    cells: [
      'Camera pose from unstructured image sets',
      'Surgical phase from endoscopic video',
      'Physical error from stabiliser measurements',
      'Stimulus class from cortical response',
    ],
  },
  {
    method: 'Known physics in the loss',
    note: 'What can be written down does not need to be learned.'
    cells: [
      'Fluid and rigid-body constraints in simulation',
      'Temporal consistency across adjacent frames',
      'Hamiltonian as the VQE objective',
      'Navier-Stokes residual in a PINN',
    ],
  },
  {
    method: 'Monte-Carlo estimation',
    note: 'Intractable integral, so sample it.',
    cells: [
      'Path tracing for global illumination',
      'Denoising diffusion sampling',
      'Sampled expectations, SQD subspaces',
      'Stochastic plasma transport',
    ],
  },
  {
    method: 'Kernel-level parallelism',
    note: 'One GPU, four workloads.',
    cells: [
      'CUDA C++ rasterisers and solvers',
      'Mixed-precision transformer training',
      'cuQuantum and CUDA-Q statevector simulation',
      'SLURM sweeps on Leeds HPC',
    ],
  },
];

export const strands = [
  {
    id: 'graphics',
    num: '01',
    field: 'GRAPHICS & SYSTEMS',
    title: 'Ryukijano',
    subtitle: 'Real-time rendering, GPU compute',
    accentIndex: 0,
    page: href('Persona - Ryukijano.dc.html'),
    desc: 'Real-time 3D pipelines, GPU-accelerated simulation and photogrammetric reconstruction. Heritage capture with the University of Leeds HELIX XR facilities, rebuilt in Unreal Engine 5.',
    limit:
      'Limits: NeRF and Gaussian reconstructions hold under controlled capture. Hand-held footage of a dark mill interior does not: pose estimation degrades before the radiance field has anything to lock onto.',
    tags: ['CUDA C++', 'UNREAL ENGINE 5', 'THREE.JS', 'ISAAC SIM', 'BLENDER'],
    projects: [
      {
        title: 'Dalton Mills VR Reconstruction',
        desc: 'A burned-down mill, rebuilt from ten photographs',
        to: href('Case Study - Dalton Mills.dc.html'),
        media: '/assets/gifs/dalton-mills-reconstruction.gif',
        isGif: true,
      },
      {
        title: 'Kanagawa Latent-Space Autoencoder',
        desc: 'Painted → dithered → wireframe',
        to: 'https://huggingface.co/Ryukijano',
        media: '/assets/gifs/wave-transfer.gif',
        isGif: true,
      },
      {
        title: 'CUDAQuest Kernels',
        desc: 'Daily CUDA C++ / cuQuantum',
        to: 'https://github.com/Ryukijano/QuantumVice-M25-CUDAQuest',
        // TODO: the prototype points at public/Java_Hero__1_.jpg, which is not
        // in public/assets/. Left without media until the file is located.
        media: null,
        isGif: false,
      },
    ],
  },
  {
    id: 'vision',
    num: '02',
    field: 'VISION & ROBOTICS',
    title: 'Gyanateet',
    subtitle: 'Self-supervised video, VLA policies',
    accentIndex: 1,
    page: null,
    desc: 'MSc Advanced Computer Science (Artificial Intelligence) at Leeds. Self-supervised vision transformers for surgical video, and vision-language-action policies for robotic manipulation. Moving to self-supervised temporal encoders is the point of the work, which is why both DINOv2 and V-JEPA2 are in it.',
    limit:
      'Limits: the 4-stage MS-TCN head drops 12.5 points porcine → human, the 8-stage drops 17.0. More temporal capacity overfits the source domain instead of generalising across it.',
    tags: ['PYTORCH', 'DINOV2', 'V-JEPA2', 'SIGLIP', 'SCALEDP'],
    projects: [
      {
        title: 'Surgical Phase Recognition',
        desc: 'DINOv2 ViT-S/14 + V-JEPA2 ViT-L · ISBI 2026',
        to: href('Case Study - Surgical Phase Detection.dc.html'),
        media: '/assets/images/computer_vision.jpg',
        isGif: false,
      },
      {
        title: 'GOT-JEPA Tool Tracking',
        desc: 'Teacher–student SSL for occlusion · in progress',
        to: href('Case Study - GOT-JEPA Tool Tracking.dc.html'),
        media: '/assets/gifs/gotjepa-occlusion.gif',
        isGif: true,
      },
      {
        title: 'Gemma-Le / Gemma-GR00T',
        desc: 'SigLIP + Gemma 3 + ScaleDP, 5B',
        to: href('Case Study - Gemma-Le VLA.dc.html'),
        media: '/assets/gifs/vla-diffusion.gif',
        isGif: true,
      },
      {
        title: 'Pothole Detection',
        desc: 'ESRGAN super-resolution ahead of YOLOv7',
        to: href('Case Study - Pothole Detection.dc.html'),
        media: '/assets/gifs/pothole-sr.gif',
        isGif: true,
      },
    ],
  },
  {
    id: 'quantum',
    num: '03',
    field: 'QUANTUM ALGORITHMS',
    title: 'Ryoushi',
    subtitle: 'VQE, QAOA, error correction',
    accentIndex: 2,
    page: href('Persona - Ryoushi.dc.html'),
    desc: 'Co-founder of Quantum Buddies. VQE, QAOA, quantum walks and error correction. YQuantum 2025 Quantum Rings virtual track with Quantum Bits. Bradford prizes are teammate-reported. NQCC participant. Finalist at City of London 2025.',
    limit:
      'Limits: none of this beats a classical solver at useful scale. VQE on the Rolls-Royce challenge is a method demonstration on a small active space; the claim is that the ansatz converges, not that it wins.',
    tags: ['QISKIT', 'PENNYLANE', 'CUDA-Q', 'TKET', 'VQE / QAOA'],
    projects: [
      {
        title: 'YQuantum 2025 (Yale)',
        desc: "Quantum Rings virtual track, generalized Shor's",
        to: href('Case Study - YQuantum Shors Algorithm.dc.html'),
        media: '/assets/gifs/shor-algorithm.gif',
        isGif: true,
      },
      {
        title: 'Conditional-GQE',
        desc: 'GNN + transformer designs the ansatz · GIC 2026',
        to: href('Case Study - Conditional GQE.dc.html'),
        media: '/assets/gifs/gqe-diagonal-collapse.gif',
        isGif: true,
      },
      {
        title: 'NQCC UK Quantum Hackathon',
        desc: 'Rolls-Royce challenge: VQE + SQD',
        to: href('Case Study - NQCC Rolls-Royce Challenge.dc.html'),
        media: '/assets/gifs/sqd-krylov.gif',
        isGif: true,
      },
      {
        title: 'Syndrome-Net',
        desc: 'QEC decoding, RL control, backend contracts',
        to: href('Case Study - Syndrome-Net.dc.html'),
        media: '/assets/gifs/syndrome-net-decode.gif',
        isGif: true,
      },
    ],
  },
  {
    id: 'sciences',
    num: '04',
    field: 'ML FOR SCIENCES',
    title: 'Machine learning for sciences',
    subtitle: 'Physics, fusion, neuro',
    accentIndex: 3,
    page: null,
    desc: 'Where the other three stop being separate. Physics-informed networks for Navier-Stokes, plasma transport with TORAX, and decoding brain activity from video, text and images.',
    limit:
      'Limits: a PINN converges on the forward problem and stalls on stiff, multi-scale regimes. Neural surrogates are useful inside the training envelope and unreliable a step outside it, which is why the physics stays in the loss.',
    tags: ['JAX', 'TORAX', 'PINNS', 'SCIPY', 'SLURM'],
    projects: [
      {
        title: 'Physics-Informed Neural Networks',
        desc: 'CUDA solvers, Navier-Stokes',
        to: 'https://github.com/Ryukijano/Physics-Based-DeepLearning',
        media: '/assets/images/neural-network-architecture.png',
        isGif: false,
      },
      {
        title: 'TRIBE-V2',
        desc: 'Brain activity maps from video, text, image',
        to: 'https://huggingface.co/spaces/Ryukijano/TRIBE-V2-DEMO',
        media: '/assets/images/computer_vision.jpg',
        isGif: false,
      },
      {
        title: 'Cosmos Sentinel',
        desc: 'Gate, reason, predict: BADAS + Cosmos on ZeroGPU',
        to: href('Case Study - Cosmos Sentinel.dc.html'),
        media: '/assets/gifs/cosmos-sentinel-pipeline.gif',
        isGif: true,
      },
    ],
  },
];

export const footer = [
  '© 2026 GYANATEET DUTTA',
  'LEEDS, UK',
  'GYANATEET@GMAIL.COM',
];

export default { hero, method, matrix, strands, footer };

// --- Content Data ---
export const DATA = {
  ryukijano: {
    id: 'ryukijano',
    title: "Ryukijano",
    subtitle: "Graphics & systems",
    desc: "Graphics and systems projects in Unreal Engine, CUDA C++, scientific computing, and reinforcement learning.",
    fullDesc: "My graphics and systems work includes photogrammetry in Unreal Engine, CUDA C++, and physics-informed neural networks. From September to December 2024, I worked with the Science Museum Group and Leeds HELIX XR on the Dalton Mills reconstruction.",
    tags: ["CUDA", "C++", "Three.js", "Unreal Engine", "PyTorch"],
    socials: [
      { link: "https://www.twitch.tv/ryukijano13", label: "Twitch" },
      { link: "https://www.youtube.com/channel/UCf1XZKm0A_LoZj6Y22fIfcg", label: "YouTube" },
      { link: "https://soundcloud.com/user-294342891/sets/running-wild-1", label: "SoundCloud" },
      { link: "https://github.com/Ryukijano", label: "GitHub" },
    ],
    projects: [
      { 
        title: "Dalton Mills VR Reconstruction", 
        desc: "A VR reconstruction of Dalton Mills after the 2022 fire, built in Unreal Engine 5 with Leeds HELIX XR.", 
        fullDesc: "From September to December 2024, I worked with the Science Museum Group and University of Leeds HELIX XR on a VR reconstruction of Dalton Mills in Keighley, which was destroyed by fire in 2022. I collaborated with Alex Neish, Yuan Gao, and Simon Popple. The PCVR reconstruction used photogrammetry and NeRF methods on a small collection of photographs.",
        link: "https://digitaleducation.leeds.ac.uk/2025/01/08/reconstructing-dalton-mills-vr-and-ai-in-cultural-preservation/", 
        year: 2024,
        featured: true,
        featuredOrder: 5,
        role: 'Collaborator, Science Museum Group / Leeds HELIX XR',
        note: 'Geometric fidelity follows the surviving photograph set; no pre-fire laser scan exists for comparison.',
        figure: {
          kind: 'video',
          src: '/assets/media/dalton-mills.mp4',
          poster: '/assets/media/dalton-mills-poster.webp',
          width: 640,
          height: 360,
          alt: 'A point-cloud mill facade with ten camera positions and colour-coded photographed and unphotographed surfaces.',
          caption: 'A reconstruction schematic showing the input viewpoints and the surfaces they cover.',
          scope: 'Camera positions and coverage are illustrative.',
        },
        tags: ["Unreal Engine 5", "NeRF", "Photogrammetry", "VR"]
      },
      { 
        title: "AWS AI/ML Scholar", 
        desc: "AWS AI/ML Scholar, 2022–2023. I trained PPO agents in DeepRacer and finished in the top 15% of the scholarship league.", 
        fullDesc: "I was an AWS AI/ML Scholar from July 2022 to June 2023 and placed in the top 15% of the DeepRacer scholarship league. I trained PPO agents in the AWS simulator. Scope: Evaluated in the AWS DeepRacer scholarship-league simulator.",
        link: "https://www.linkedin.com/in/gyanateet-dutta-386215192/", 
        year: 2023,
        tags: ["AWS", "DeepRacer", "PPO", "Reinforcement Learning"]
      },
      { 
        title: "Physics-Informed Neural Networks", 
        desc: "CUDA notebooks for Navier–Stokes and Burgers-type equations, with physics-informed neural network experiments.", 
        fullDesc: "This repository contains GPU implementations of PDE solvers and physics-informed neural networks for Navier–Stokes, Burgers, and related nonlinear equations, using CUDA C++ and PyTorch. Scope: Method-exploration notebooks; validation against CFD reference solvers is future work.",
        link: "https://github.com/Ryukijano/Physics-Based-DeepLearning", 
        tags: ["CUDA", "PINNs", "CFD", "Scientific Computing"]
      },
      {
        title: "B3tt3r: 3D Reconstruction",
        desc: "Stereo reconstruction from image pairs, combining Mast3r and Spann3r.",
        fullDesc: "I combined Mast3r and Spann3r for stereo matching, depth estimation, and mesh reconstruction from image pairs. Scope: A working integration of the two models; benchmarking against the source papers is future work.",
        link: "https://github.com/Ryukijano/B3tt3r",
        tags: ["3D Vision", "Stereo Matching", "Python", "Deep Learning"]
      },
      {
        title: "CUDA Kernel Development",
        desc: "A practice log of CUDA C++ kernels and CUDA-Q / cuQuantum exercises.",
        fullDesc: "QuantumVice-M25-CUDAQuest is a practice log of CUDA C++ kernels and CUDA-Q and cuQuantum exercises. Scope: A practice log of individual kernel exercises.",
        link: "https://github.com/Ryukijano/QuantumVice-M25-CUDAQuest",
        tags: ["CUDA", "cuQuantum", "GPU Computing", "C++"]
      }
    ]
  },
  ai: {
    id: 'ai',
    title: "Gyanateet",
    subtitle: "Computer vision",
    desc: "MSc Advanced Computer Science (Artificial Intelligence), Leeds, 2023–2024. Surgical video and self-supervised transformers. Research technician at Leeds since Nov 2025 (NDA).",
    fullDesc: "I completed the MSc Advanced Computer Science (Artificial Intelligence) at the University of Leeds in 2024. From March to November 2025, I worked with AIMS (AI in Medicine and Surgery) on DINOv2 models for ESD workflow recognition. I have been a research technician at Leeds since November 2025, working on medical computer vision under NDA.",
    tags: ["PyTorch", "JAX", "Computer Vision", "Hugging Face", "TensorFlow"],
    socials: [
      { link: "https://orcid.org/0009-0008-0480-9241", label: "ORCID" },
      { link: "https://doi.org/10.1109/isbi61048.2026.11515812", label: "ISBI 2026" },
      { link: "https://wandb.ai/ryukijano", label: "W&B" },
      { link: "https://www.linkedin.com/in/gyanateet-dutta-386215192/", label: "LinkedIn" },
    ],
    projects: [
      { 
        title: "AIMS: Surgical Phase Detection", 
        desc: "DINOv2 models for endoscopic surgical workflow at AIMS, later an ISBI 2026 paper.", 
        fullDesc: "From March to November 2025 I was a computer-vision intern with AIMS (AI in Medicine and Surgery) at Leeds. I trained DINOv2 models for endoscopic submucosal dissection workflow, later published as the ISBI 2026 paper “Self-Supervised Vision Transformer for Surgical Phase Recognition in Endoscopic Submucosal Dissection” (DOI 10.1109/isbi61048.2026.11515812). That paper reports 89.5% accuracy on the patient set and 90.0% on porcine.",
        link: "https://github.com/Ryukijano/DINOEndo", 
        year: 2025,
        featured: true,
        featuredOrder: 3,
        role: 'Research intern, AIMS (AI in Medicine and Surgery)',
        note: 'The reported results are from the ISBI 2026 patient and porcine test sets.',
        links: [
          { href: 'https://doi.org/10.1109/isbi61048.2026.11515812', label: 'Paper' },
          { href: 'https://github.com/Ryukijano/DINOEndo', label: 'Code' },
        ],
        figure: {
          kind: 'video',
          src: '/assets/media/esd-comparison.mp4',
          poster: '/assets/media/esd-comparison-poster.webp',
          width: 1280,
          height: 962,
          alt: 'Endoscopic frames beside DINOv2 patch-norm and centre-similarity maps through an ESD sequence.',
          caption: 'DINOv2 feature diagnostics across an endoscopic submucosal dissection sequence.',
          scope: 'Selected frames from one ESD sequence.',
        },
        tags: ["DINOv2", "V-JEPA", "Medical AI", "Self-Supervised Learning"]
      },
      { 
        title: "Gemma-Le: VLA Policy", 
        desc: "A compact vision-language-action policy in a LeRobot fork, with checkpoints on the Hub.", 
        fullDesc: "I implemented a compact vision-language-action policy in a LeRobot fork, using SigLIP for vision, Gemma 3 with LoRA for language, and ScaleDP for action generation. The checkpoints were trained on the robot_sim.PickNPlace simulation dataset in LeRobot format. Scope: Evaluated on simulated pick-and-place data.",
        link: "https://huggingface.co/Ryukijano/gemma-groot", 
        figure: {
          kind: 'video',
          src: '/assets/media/vla-diffusion.mp4',
          poster: '/assets/media/vla-diffusion-poster.webp',
          width: 520,
          height: 292,
          alt: 'Gemma-Le architecture with an action trajectory being denoised over 50 diffusion steps.',
          caption: 'The signal path from multimodal inputs to the ScaleDP action head.',
          scope: 'Architecture visualisation with an illustrative denoising trajectory.',
        },
        tags: ["Robotics", "VLA", "Gemma 3", "Diffusion Policy"]
      },
      { 
        title: "MSc Thesis: Surgical Video Prediction", 
        desc: "A VAE–Transformer for surgical video prediction: +2.36 dB PSNR over the chosen baselines, at 22 FPS.", 
        fullDesc: "My MSc project developed a VAE–Transformer model for surgical video prediction. In my experiments, it improved PSNR by 2.36 dB over the selected baselines and ran at 22 FPS with FP16 mixed precision. The code is available on GitHub.",
        link: "https://github.com/Ryukijano/vae-surgical-prediction", 
        year: 2025,
        featured: true,
        featuredOrder: 4,
        role: 'MSc student, University of Leeds',
        note: 'Measurements are the project’s own, on the JIGSAWS test set; longer-horizon drift and downstream workflow effects fall outside the study. The thesis is not deposited in White Rose eTheses.',
        figure: {
          kind: 'video',
          src: '/assets/media/fetvae-prediction.mp4',
          poster: '/assets/media/fetvae-prediction-poster.webp',
          width: 520,
          height: 292,
          alt: 'FET-VAE pipeline with content and motion encoders, a ternary latent space, autoregressive rollout, and video reconstruction.',
          caption: 'The FET-VAE architecture used for autoregressive surgical-video prediction.',
          scope: 'Architecture schematic with an illustrative quality-decay curve.',
        },
        tags: ["VAE", "Transformer", "Video Prediction", "Medical AI"]
      },
      { 
        title: "JAX Diffusers Sprint", 
        desc: "Eighth globally in the 2023 Hugging Face JAX Diffusers sprint, with a ControlNet trained on TPU v4.", 
        fullDesc: "In the 2023 Hugging Face JAX Diffusers community sprint I finished eighth globally with a ControlNet for anime-realism, trained on TPU v4.",
        link: "https://github.com/Ryukijano/CatCon-Controlnet-WD-1-5-b2", 
        year: 2023,
        featured: true,
        featuredOrder: 6,
        role: 'Competitor, Hugging Face JAX Diffusers sprint',
        note: 'The 8th-place finish comes from my own record of the sprint leaderboard; the sprint published no results table, and the model was not FID-evaluated.',
        tags: ["JAX", "TPU v4", "ControlNet", "Diffusion Models"]
      },
      {
        title: "Pothole Detection (arXiv)",
        desc: "Co-author of a YOLOv7 + ESRGAN preprint: 94.7% precision and 82.6% recall on the PNW table.",
        fullDesc: "I co-authored “Improved Pothole Detection Using YOLOv7 and ESRGAN” (arXiv:2401.08588), submitted in November 2023. Table 3 reports 0.947 precision and 0.826 recall for YOLOv7-tiny with ESRGAN on PNW dashcam frames.",
        link: "https://arxiv.org/abs/2401.08588",
        year: 2024,
        featured: true,
        featuredOrder: 7,
        role: 'Co-author',
        note: 'Evaluation used labelled dashcam images from the PNW dataset.',
        figure: {
          kind: 'video',
          src: '/assets/media/pothole-sr.mp4',
          poster: '/assets/media/pothole-sr-poster.webp',
          width: 520,
          height: 292,
          alt: 'A low-resolution road frame being upscaled by ESRGAN before YOLOv7 marks a pothole.',
          caption: 'The super-resolution and detection pipeline used in the pothole study.',
          scope: 'Drawn on procedural road texture to illustrate the pipeline.',
        },
        tags: ["YOLOv7", "ESRGAN", "Computer Vision", "Published"]
      },
      {
        title: "Hopfield Networks & TSP",
        desc: "A 2022 sole-author arXiv note on Hopfield networks and simulated annealing for TSP.",
        fullDesc: "I wrote “Solving The Travelling Salesmen Problem using HNN and HNN-SA algorithms” (arXiv:2202.13746) in February 2022. The study compares Hopfield neural networks and simulated annealing on TSP instances. Scope: Student experiments on selected TSP instances.",
        link: "https://arxiv.org/abs/2202.13746",
        year: 2022,
        tags: ["Hopfield Networks", "Optimization", "TSP", "Published"]
      },
      {
        title: "LGM: 3D Model Generation",
        desc: "A Hugging Face Space that wraps LGM for image-to-3D.",
        fullDesc: "I built a Hugging Face Space for LGM (Large Gaussian Model) that generates a Gaussian-splat 3D representation from one image. Scope: Interface and deployment work around the existing LGM model.",
        link: "https://huggingface.co/spaces/Ryukijano/LGM",
        tags: ["3D Generation", "Gaussian Splatting", "Hugging Face", "Image-to-3D"]
      },
      {
        title: "Deep RL & Hugging Face",
        desc: "PPO, DQN, Doom, and PyBullet agents from the Hugging Face Deep RL course.",
        fullDesc: "This repository contains PPO, DQN, and related implementations from the Hugging Face Deep RL course, including experiments in Doom and PyBullet. Scope: Course exercises using established algorithms.",
        link: "https://github.com/Ryukijano/Deep-Reinforcement-Learning-and-Hugging-Face",
        figure: {
          kind: 'video',
          src: '/assets/media/doom-ppo.mp4',
          poster: '/assets/media/doom-ppo-poster.avif',
          width: 320,
          height: 240,
          alt: 'A PPO agent playing Doom: the view swings across a canyon while the HUD tracks health and ammunition.',
          caption: 'The PPO agent in ViZDoom, eight seconds of one rollout.',
          scope: 'One recorded rollout from a course exercise in ViZDoom.',
        },
        tags: ["Deep RL", "PPO", "DQN", "Hugging Face"]
      },
    ]
  },
  ryoushi: {
    id: 'ryoushi',
    title: "Ryoushi",
    subtitle: "Quantum algorithms",
    desc: "Hybrid quantum–classical experiments and hackathon notes. I co-run Quantum Buddies with Sid Iliyasu and Dat Chi Le.",
    fullDesc: "I work on hybrid quantum–classical algorithms in Qiskit, PennyLane, and cuQuantum. I co-founded Quantum Buddies with Sid Iliyasu and Dat Chi Le; our work includes shared repositories and hackathon projects.",
    tags: ["Qiskit", "PennyLane", "Quantum ML", "Python", "CuQuantum"],
    socials: [
      { link: "https://quantum-buddies.github.io", label: "Quantum Buddies" },
      { link: "https://devpost.com/Ryukijano", label: "Devpost" },
      { link: "https://github.com/Quantum-Buddies", label: "QBuddies GitHub" },
    ],
    projects: [
      {
        title: "H-cGQE: Conditional GQE",
        desc: "A GNN, Transformer, and QD-GRPO pipeline for molecular quantum-circuit design, built for GIC 2026.",
        fullDesc: "For the Mitsubishi Chemical Group and AIST track of the 2026 Global Industry Challenge, Ryoushi / Quantum Buddies developed H-cGQE for molecular quantum-circuit design. A chemical graph neural network and Transformer propose operator sequences, QD-GRPO supplies the learning signal, and L-BFGS-B optimises the continuous angles. The implementation uses CUDA-Q simulation with selected quantum-hardware checks.",
        link: "https://github.com/Quantum-Buddies/Conditional_GQE",
        links: [
          { href: "https://github.com/Quantum-Buddies/Conditional_GQE", label: "Code" },
          { href: "https://huggingface.co/Ryukijano/h-cgqe-gic2026", label: "Models" },
        ],
        year: 2026,
        featured: true,
        featuredOrder: 1,
        role: "Team member, Ryoushi / Quantum Buddies",
        note: "The reported 0.63 mHa result is from a controlled 8-qubit methyl-iodide active-space comparison. The reference is CASCI/FCI within that active space; held-out molecule generalisation remains open.",
        figure: {
          kind: "video",
          src: "/assets/media/h-cgqe-gic2026.mp4",
          poster: "/assets/media/h-cgqe-gic2026-poster.webp",
          width: 800,
          height: 450,
          alt: "An H-cGQE pipeline in which a molecule becomes a graph, a policy proposes circuits, energy supplies a learning signal, and selected circuits proceed to hardware checks.",
          caption: "The H-cGQE workflow from molecular graph construction to circuit generation, optimisation, and validation.",
          scope: "Project-authored architecture animation.",
        },
        tags: ["GIC 2026", "CUDA-Q", "GNN", "Transformer", "QD-GRPO"],
      },
      {
        title: "Quantum Buddies",
        desc: "A three-person collective I co-founded in 2025, for shared repositories and hackathon work.",
        fullDesc: "I co-founded Quantum Buddies in 2025 with Sid Iliyasu and Dat Chi Le. We maintain shared repositories and collaborate on hackathon projects in quantum machine learning, error correction, genomics, and market simulation. Scope: Three-person independent collective.",
        link: "https://quantum-buddies.github.io",
        isBanner: true,
        year: 2025,
        tags: ["Quantum ML", "Research", "Open Source", "Collaboration"]
      },
      { 
        title: "Bradford Quantum Hackathon 2025", 
        desc: "At Bradford Quantum 2025, Quantum Buddies used lambeq and Quixer to tell promoters from non-promoters on GRCh38.", 
        fullDesc: "At the Bradford Quantum Hackathon in November 2025, Quantum Buddies used lambeq and Quixer to classify promoter and non-promoter sequences from GRCh38. My teammates reported wins in the Grand Prix and healthcare/BYO track.",
        link: "https://quantumbradford2025.com/", 
        year: 2025,
        featured: true,
        featuredOrder: 1,
        role: 'Competitor, team Ryoushi / Quantum Buddies',
        note: 'Built and evaluated during the hackathon; prize results as reported by teammates.',
        tags: ["Genomics", "lambeq", "Quixer"]
      },
      { 
        title: "YQuantum 2025 (Yale)", 
        desc: "Quantum Rings virtual-track win at YQuantum 2025, with Alisa Petrusinskaia, on a generalised Shor implementation.", 
        fullDesc: "At YQuantum 2025, I worked with Alisa Petrusinskaia as team Quantum Bits. We won the Quantum Rings virtual track with a generalised implementation of Shor’s algorithm using modular exponentiation, quantum phase estimation, and the inverse QFT.",
        link: "https://github.com/Ryukijano/Quantum-bits-YQuantum-2025", 
        year: 2025,
        featured: true,
        featuredOrder: 2,
        role: 'Competitor, team Quantum Bits',
        note: 'Awarded in the Quantum Rings virtual track.',
        figure: {
          kind: 'video',
          src: '/assets/media/shor-algorithm.mp4',
          poster: '/assets/media/shor-algorithm-poster.webp',
          width: 520,
          height: 300,
          alt: 'Shor algorithm stages from a classical GCD check through quantum phase estimation and continued fractions.',
          caption: 'The period-finding pipeline implemented for the Quantum Rings challenge.',
          scope: 'Phase peaks are schematic.',
        },
        tags: ["Quantum Rings", "Shor's Algorithm", "Yale"]
      },
      { 
        title: "NQCC UK Quantum Hackathon", 
        desc: "Participant on the Rolls-Royce hydrogen-on-nickel challenge at the 2025 NQCC UK Quantum Hackathon.", 
        fullDesc: "In July 2025 I joined team Superposition Impossible at the NQCC UK Quantum Hackathon in Edinburgh. We worked the Rolls-Royce challenge: VQE and sample-based quantum diagonalisation for hydrogen on nickel, with notes on circuit depth for NISQ hardware.",
        link: "https://github.com/Ryukijano/Team_15_NQCC_UK_Quantum_Hackathon_2025_new", 
        year: 2025,
        featured: true,
        featuredOrder: 8,
        role: 'Competitor, Rolls-Royce challenge',
        note: 'Entered as a participant on the Rolls-Royce challenge.',
        figure: {
          kind: 'video',
          src: '/assets/media/sqd-krylov.mp4',
          poster: '/assets/media/sqd-krylov-poster.webp',
          width: 520,
          height: 300,
          alt: 'SQD pipeline from Krylov-state construction through sampling, configuration recovery, and subspace diagonalisation.',
          caption: 'The sample-based quantum diagonalisation pipeline used by the team.',
          scope: 'Animated schematic with illustrative bitstrings and energy levels.',
        },
        tags: ["NQCC", "VQE", "SQD", "Rolls-Royce", "Materials Science"]
      },
      { 
        title: "City of London Quantum Hackathon", 
        desc: "Finalist at the City of London quantum hackathon, with QCBM and quantum-walk MCMC for market simulation.", 
        fullDesc: "Quantum Buddies reached the final of the City of London Lord Mayor’s Quantum Hackathon in October 2025. We developed differentiable QCBMs and quantum-walk MCMC methods for market simulation. Scope: Hackathon prototype evaluated as a simulation.",
        link: "https://news.cityoflondon.gov.uk/quantum-meets-finance-hackathon-sparks-next-generation-solutions-in-the-city/", 
        year: 2025,
        tags: ["Finalist", "QCBM", "Finance", "Quantum Walk MCMC"]
      },
      {
        title: "Quantum Continuous Thought Machines",
        desc: "A hybrid quantum–classical recurrent sketch under Quantum Buddies.",
        fullDesc: "This repository explores a recurrent hybrid architecture that combines parameterised quantum circuits with a continuous-state loop. Scope: Early-stage implementation; publication and benchmarking are future work.",
        link: "https://github.com/Ryukijano/quantum-continuous-thought-machines",
        tags: ["QCTM", "Hybrid Quantum", "Recurrent Networks", "Reasoning"]
      },
      {
        title: "Quantum Error Correction",
        desc: "Surface-code experiments in Stim.",
        fullDesc: "These experiments use Stim to study stabiliser circuits, surface codes, and decoding. Scope: Simulator experiments with established codes.",
        link: "https://github.com/Ryukijano/quantum-error-correction",
        figure: {
          kind: 'video',
          src: '/assets/media/syndrome-net-decode.mp4',
          poster: '/assets/media/syndrome-net-decode-poster.webp',
          width: 640,
          height: 360,
          alt: 'A surface-code error path activates detectors before a decoder draws a proposed correction.',
          caption: 'How a decoder infers a correction from the detector events at each end of an error path.',
          scope: 'An illustrative fault path and decoder response.',
        },
        tags: ["QEC", "Surface Code", "Stim", "Error Correction"]
      },
      {
        title: "Qiskit on Qubit",
        desc: "Qiskit notebooks on algorithms, variational circuits, and a little QML.",
        fullDesc: "A collection of Qiskit notebooks covering quantum algorithms, variational circuits, and quantum machine learning. Scope: Personal study notes and tutorials.",
        link: "https://github.com/Ryukijano/Qiskit_on_Qubit",
        tags: ["Qiskit", "Quantum Algorithms", "IBM Quantum", "Tutorials"]
      },
    ]
  }
};

export const CV_URL = '/resume/Gyanateet_Dutta_Resume_updated.pdf';

export const PERSONA_BY_SLUG = {
  ryukijano: 'ryukijano',
  gyanateet: 'ai',
  yana: 'ai',
  ryoushi: 'ryoushi',
};

export const LANES = [
  { id: 'ryukijano', slug: 'ryukijano', label: 'Systems', stage: 'Real world', kicker: 'Ryukijano', handle: 'Ryukijano' },
  { id: 'ai', slug: 'yana', label: 'Vision', stage: 'Encoding', kicker: 'Gyanateet', handle: 'Yana' },
  { id: 'ryoushi', slug: 'ryoushi', label: 'Quantum', stage: 'Digital', kicker: 'Ryoushi', handle: 'Ryoushi' },
];

export function projectSlug(title) {
  return title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function allProjects() {
  return LANES.flatMap((lane) =>
    DATA[lane.id].projects.map((project) => ({
      ...project,
      slug: projectSlug(project.title),
      laneId: lane.id,
      laneLabel: lane.label,
      laneKicker: lane.kicker,
      personaSlug: lane.slug,
    })),
  );
}

export function findProject(slug) {
  return allProjects().find((project) => project.slug === slug) ?? null;
}

export function projectYear(project) {
  return typeof project?.year === 'number' && Number.isFinite(project.year)
    ? project.year
    : null;
}

export function projectLane(project) {
  if (typeof project?.lane === 'string' && project.lane.trim()) return project.lane;
  if (typeof project?.laneLabel === 'string' && project.laneLabel.trim()) return project.laneLabel;
  return '';
}

export function isFeatured(project) {
  return project?.featured === true;
}

export function featuredOrder(project) {
  return typeof project?.featuredOrder === 'number' && Number.isFinite(project.featuredOrder)
    ? project.featuredOrder
    : Number.POSITIVE_INFINITY;
}

export function withinYear(a, b) {
  const rank = Number(isFeatured(b)) - Number(isFeatured(a));
  if (rank !== 0) return rank;
  const order = featuredOrder(a) - featuredOrder(b);
  if (Number.isFinite(order) && order !== 0) return order;
  return String(a.title).localeCompare(String(b.title));
}

export function byYearDescWhenPresent(a, b) {
  const yearA = projectYear(a);
  const yearB = projectYear(b);
  if (yearA == null && yearB == null) return 0;
  if (yearA == null) return 1;
  if (yearB == null) return -1;
  return yearB - yearA;
}

export function relatedProjects(project, limit = 5) {
  return allProjects()
    .filter((item) => item.slug !== project.slug && item.laneId === project.laneId)
    .sort((a, b) => byYearDescWhenPresent(a, b) || withinYear(a, b))
    .slice(0, limit);
}

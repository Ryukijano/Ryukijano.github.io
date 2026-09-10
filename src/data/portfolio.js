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
        desc: "SfM / NeRF into Unreal 5 for a mill that burned in 2022. HELIX XR, Sep–Dec 2024.", 
        fullDesc: "From September to December 2024, I worked with the Science Museum Group and University of Leeds HELIX XR on a VR reconstruction of Dalton Mills in Keighley, which was destroyed by fire in 2022. I collaborated with Alex Neish, Yuan Gao, and Simon Popple. The PCVR reconstruction used photogrammetry and NeRF methods on a small collection of photographs.",
        link: "https://digitaleducation.leeds.ac.uk/2025/01/08/reconstructing-dalton-mills-vr-and-ai-in-cultural-preservation/", 
        year: 2024,
        featured: true,
        featuredOrder: 5,
        role: 'Collaborator, Science Museum Group / Leeds HELIX XR',
        note: 'Geometric fidelity is limited by that photo set; there is no pre-fire laser scan to check against.',
        figure: {
          kind: 'video',
          src: '/assets/media/dalton-mills.mp4',
          poster: '/assets/media/dalton-mills-poster.webp',
          width: 640,
          height: 360,
          alt: 'A point-cloud mill facade with ten camera positions and colour-coded photographed and unphotographed surfaces.',
          caption: 'A reconstruction schematic showing the input viewpoints and the surfaces they cover.',
          limit: 'Camera positions and coverage are illustrative rather than project capture data.',
        },
        tags: ["Unreal Engine 5", "NeRF", "Photogrammetry", "VR"]
      },
      { 
        title: "AWS AI/ML Scholar", 
        desc: "AWS AI/ML Scholar, Jul 2022–Jun 2023. DeepRacer top 15%.", 
        fullDesc: "I was an AWS AI/ML Scholar from July 2022 to June 2023 and placed in the top 15% of the DeepRacer scholarship league. I trained PPO agents in the AWS simulator. Limit: Results are from the scholarship league simulator.",
        link: "https://www.linkedin.com/in/gyanateet-dutta-386215192/", 
        year: 2023,
        tags: ["AWS", "DeepRacer", "PPO", "Reinforcement Learning"]
      },
      { 
        title: "Physics-Informed Neural Networks", 
        desc: "CUDA notebooks for Navier–Stokes and Burgers-type PDEs, plus PINN experiments.", 
        fullDesc: "This repository contains GPU implementations of PDE solvers and physics-informed neural networks for Navier–Stokes, Burgers, and related nonlinear equations, using CUDA C++ and PyTorch. Limit: Experimental notebooks without CFD validation.",
        link: "https://github.com/Ryukijano/Physics-Based-DeepLearning", 
        tags: ["CUDA", "PINNs", "CFD", "Scientific Computing"]
      },
      {
        title: "B3tt3r: 3D Reconstruction",
        desc: "Mast3r + Spann3r glued together for stereo reconstruction from image pairs.",
        fullDesc: "I combined Mast3r and Spann3r for stereo matching, depth estimation, and mesh reconstruction from image pairs. Limit: No reconstruction benchmark against the source papers.",
        link: "https://github.com/Ryukijano/B3tt3r",
        tags: ["3D Vision", "Stereo Matching", "Python", "Deep Learning"]
      },
      {
        title: "CUDA Kernel Development",
        desc: "Daily CUDA C++ and CUDA-Q / cuQuantum kernel drills.",
        fullDesc: "QuantumVice-M25-CUDAQuest is a practice log of CUDA C++ kernels and CUDA-Q and cuQuantum exercises. Limit: Individual exercises rather than a reusable library.",
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
        desc: "AIMS intern, Mar–Nov 2025. DINOv2 on ESD workflow. ISBI 2026 paper.", 
        fullDesc: "Computer Vision Research Intern, AIMS (AI in Medicine and Surgery), University of Leeds, Mar–Nov 2025. ESD phase recognition with DINOv2 (DINO-Endo). ISBI 2026 paper: “Self-Supervised Vision Transformer for Surgical Phase Recognition in Endoscopic Submucosal Dissection”, DOI 10.1109/isbi61048.2026.11515812. That paper reports 89.5% accuracy on the patient set and 90.0% on porcine.",
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
          limit: 'Selected frames from one sequence rather than aggregate model evaluation.',
        },
        tags: ["DINOv2", "V-JEPA", "Medical AI", "Self-Supervised Learning"]
      },
      { 
        title: "Gemma-Le: VLA Policy", 
        desc: "SigLIP + Gemma 3 + ScaleDP VLA in a LeRobot fork. Hub checkpoints.", 
        fullDesc: "I implemented a compact vision-language-action policy in a LeRobot fork, using SigLIP for vision, Gemma 3 with LoRA for language, and ScaleDP for action generation. The checkpoints were trained on the robot_sim.PickNPlace simulation dataset in LeRobot format. Limit: Evaluated on simulated pick-and-place data.",
        link: "https://huggingface.co/Ryukijano/gemma-groot", 
        figure: {
          kind: 'video',
          src: '/assets/media/vla-diffusion.mp4',
          poster: '/assets/media/vla-diffusion-poster.webp',
          width: 520,
          height: 292,
          alt: 'Gemma-Le architecture with an action trajectory being denoised over 50 diffusion steps.',
          caption: 'The signal path from multimodal inputs to the ScaleDP action head.',
          limit: 'Architecture visualisation; the trajectory does not represent a measured policy success rate.',
        },
        tags: ["Robotics", "VLA", "Gemma 3", "Diffusion Policy"]
      },
      { 
        title: "MSc Thesis: Surgical Video Prediction", 
        desc: "MSc surgical video prediction. +2.36 dB PSNR, 22 FPS. Not on White Rose.", 
        fullDesc: "My MSc project developed a VAE–Transformer model for surgical video prediction. In my experiments, it improved PSNR by 2.36 dB over the selected baselines and ran at 22 FPS with FP16 mixed precision. The code is available on GitHub.",
        link: "https://github.com/Ryukijano/vae-surgical-prediction", 
        year: 2025,
        featured: true,
        featuredOrder: 4,
        role: 'MSc student, University of Leeds',
        note: 'Not deposited in White Rose eTheses. I did not measure longer-horizon drift or a downstream workflow effect.',
        figure: {
          kind: 'video',
          src: '/assets/media/fetvae-prediction.mp4',
          poster: '/assets/media/fetvae-prediction-poster.webp',
          width: 520,
          height: 292,
          alt: 'FET-VAE pipeline with content and motion encoders, a ternary latent space, autoregressive rollout, and video reconstruction.',
          caption: 'The FET-VAE architecture used for autoregressive surgical-video prediction.',
          limit: 'Architecture schematic with an illustrative quality-decay curve.',
        },
        tags: ["VAE", "Transformer", "Video Prediction", "Medical AI"]
      },
      { 
        title: "JAX Diffusers Sprint", 
        desc: "8th globally, Hugging Face JAX Diffusers sprint 2023. ControlNet anime-realism on TPU v4.", 
        fullDesc: "Hugging Face JAX Diffusers community sprint, 2023. I finished 8th globally with a ControlNet for anime-realism, trained on TPU v4. No FID score, no paper.",
        link: "https://github.com/Ryukijano/CatCon-Controlnet-WD-1-5-b2", 
        year: 2023,
        featured: true,
        featuredOrder: 6,
        role: 'Competitor, Hugging Face JAX Diffusers sprint',
        note: 'No FID evaluation or paper. The 8th-place result is based on my records; I could not find a published results table.',
        tags: ["JAX", "TPU v4", "ControlNet", "Diffusion Models"]
      },
      {
        title: "Pothole Detection (arXiv)",
        desc: "Co-author. YOLOv7 + ESRGAN preprint: 94.7% precision, 82.6% recall on the PNW table.",
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
          limit: 'Procedural road texture illustrating the method rather than output from the paper.',
        },
        tags: ["YOLOv7", "ESRGAN", "Computer Vision", "Published"]
      },
      {
        title: "Hopfield Networks & TSP",
        desc: "Sole-author arXiv, 2022. HNN and HNN-SA on TSP.",
        fullDesc: "I wrote “Solving The Travelling Salesmen Problem using HNN and HNN-SA algorithms” (arXiv:2202.13746) in February 2022. The study compares Hopfield neural networks and simulated annealing on TSP instances. Limit: Student experiments on selected TSP instances.",
        link: "https://arxiv.org/abs/2202.13746",
        year: 2022,
        tags: ["Hopfield Networks", "Optimization", "TSP", "Published"]
      },
      {
        title: "LGM: 3D Model Generation",
        desc: "Hugging Face Space wrapping LGM image-to-3D.",
        fullDesc: "I built a Hugging Face Space for LGM (Large Gaussian Model) that generates a Gaussian-splat 3D representation from one image. Limit: Interface and deployment work around the existing LGM model.",
        link: "https://huggingface.co/spaces/Ryukijano/LGM",
        tags: ["3D Generation", "Gaussian Splatting", "Hugging Face", "Image-to-3D"]
      },
      {
        title: "Deep RL & Hugging Face",
        desc: "Hugging Face Deep RL course agents: PPO, DQN, Doom, PyBullet.",
        fullDesc: "This repository contains PPO, DQN, and related implementations from the Hugging Face Deep RL course, including experiments in Doom and PyBullet. Limit: Course exercises using established algorithms.",
        link: "https://github.com/Ryukijano/Deep-Reinforcement-Learning-and-Hugging-Face",
        figure: {
          kind: 'video',
          src: '/assets/media/doom-ppo.mp4',
          poster: '/assets/media/doom-ppo-poster.avif',
          width: 320,
          height: 240,
          alt: 'A PPO agent playing Doom: the view swings across a canyon while the HUD tracks health and ammunition.',
          caption: 'The PPO agent in ViZDoom, eight seconds of one rollout.',
          limit: 'One rollout from a course exercise in a scripted scenario.',
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
        title: "Quantum Buddies",
        desc: "Small collective, 2025. Shared repos and hackathon builds.",
        fullDesc: "I co-founded Quantum Buddies in 2025 with Sid Iliyasu and Dat Chi Le. We maintain shared repositories and collaborate on hackathon projects in quantum machine learning, error correction, genomics, and market simulation. Limit: Three-person independent collective.",
        link: "https://quantum-buddies.github.io",
        isBanner: true,
        year: 2025,
        tags: ["Quantum ML", "Research", "Open Source", "Collaboration"]
      },
      { 
        title: "Bradford Quantum Hackathon 2025", 
        desc: "Nov 2025, team Ryoushi / Quantum Buddies. lambeq + Quixer, promoter vs non-promoter on GRCh38.", 
        fullDesc: "At the Bradford Quantum Hackathon in November 2025, Quantum Buddies used lambeq and Quixer to classify promoter and non-promoter sequences from GRCh38. My teammates reported wins in the Grand Prix and healthcare/BYO track.",
        link: "https://quantumbradford2025.com/", 
        year: 2025,
        featured: true,
        featuredOrder: 1,
        role: 'Competitor, team Ryoushi / Quantum Buddies',
        note: 'Prize results are based on teammate reports. The classifier was developed during the hackathon.',
        tags: ["Genomics", "lambeq", "Quixer"]
      },
      { 
        title: "YQuantum 2025 (Yale)", 
        desc: "Apr 2025, Yale. Quantum Rings virtual-track win with Alisa Petrusinskaia (Quantum Bits).", 
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
          limit: 'Phase peaks are schematic and do not reproduce a measurement histogram.',
        },
        tags: ["Quantum Rings", "Shor's Algorithm", "Yale"]
      },
      { 
        title: "NQCC UK Quantum Hackathon", 
        desc: "Participant, Jul 2025 Edinburgh. Rolls-Royce hydrogen-on-nickel. Team Superposition Impossible.", 
        fullDesc: "NQCC UK Quantum Hackathon, Edinburgh, Jul 2025. Team Superposition Impossible. Rolls-Royce challenge: VQE + SQD for hydrogen on nickel. Circuit-depth notes for NISQ, some DFT comparison talk. I was a participant.",
        link: "https://github.com/Ryukijano/Team_15_NQCC_UK_Quantum_Hackathon_2025_new", 
        year: 2025,
        featured: true,
        featuredOrder: 8,
        role: 'Competitor, Rolls-Royce challenge',
        note: 'Participant. Not listed among the official 1st–3rd place teams.',
        figure: {
          kind: 'video',
          src: '/assets/media/sqd-krylov.mp4',
          poster: '/assets/media/sqd-krylov-poster.webp',
          width: 520,
          height: 300,
          alt: 'SQD pipeline from Krylov-state construction through sampling, configuration recovery, and subspace diagonalisation.',
          caption: 'The sample-based quantum diagonalisation pipeline used by the team.',
          limit: 'Animated schematic with illustrative bitstrings and energy levels.',
        },
        tags: ["NQCC", "VQE", "SQD", "Rolls-Royce", "Materials Science"]
      },
      { 
        title: "City of London Quantum Hackathon", 
        desc: "Finalist, Oct 2025. QCBM and quantum-walk MCMC for market simulation.", 
        fullDesc: "Quantum Buddies reached the final of the City of London Lord Mayor’s Quantum Hackathon in October 2025. We developed differentiable QCBMs and quantum-walk MCMC methods for market simulation. Limit: Hackathon prototype evaluated as a simulation.",
        link: "https://news.cityoflondon.gov.uk/quantum-meets-finance-hackathon-sparks-next-generation-solutions-in-the-city/", 
        year: 2025,
        tags: ["Finalist", "QCBM", "Finance", "Quantum Walk MCMC"]
      },
      {
        title: "Quantum Continuous Thought Machines",
        desc: "Hybrid quantum–classical recurrent sketch under Quantum Buddies.",
        fullDesc: "This repository explores a recurrent hybrid architecture that combines parameterised quantum circuits with a continuous-state loop. Limit: Early implementation without a publication or benchmark.",
        link: "https://github.com/Ryukijano/quantum-continuous-thought-machines",
        tags: ["QCTM", "Hybrid Quantum", "Recurrent Networks", "Reasoning"]
      },
      {
        title: "Quantum Error Correction",
        desc: "Surface-code experiments in Stim.",
        fullDesc: "These experiments use Stim to study stabiliser circuits, surface codes, and decoding. Limit: Simulator experiments with established codes.",
        link: "https://github.com/Ryukijano/quantum-error-correction",
        figure: {
          kind: 'video',
          src: '/assets/media/syndrome-net-decode.mp4',
          poster: '/assets/media/syndrome-net-decode-poster.webp',
          width: 640,
          height: 360,
          alt: 'A surface-code error path activates detectors before a decoder draws a proposed correction.',
          caption: 'How a decoder infers a correction from the detector events at each end of an error path.',
          limit: 'Illustrative fault path and decoder response rather than a recorded run.',
        },
        tags: ["QEC", "Surface Code", "Stim", "Error Correction"]
      },
      {
        title: "Qiskit on Qubit",
        desc: "Qiskit notebooks: algorithms, variational circuits, a bit of QML.",
        fullDesc: "A collection of Qiskit notebooks covering quantum algorithms, variational circuits, and quantum machine learning. Limit: Personal study notes and tutorials.",
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

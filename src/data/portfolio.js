// --- Content Data ---
export const DATA = {
  ryukijano: {
    id: 'ryukijano',
    title: "Ryukijano",
    subtitle: "Graphics & systems",
    desc: "I build VR scenes, CUDA kernels, and the occasional RL agent. Dalton Mills, Unreal, physics notebooks — not a product studio.",
    fullDesc: "I work on graphics and systems: photogrammetry into Unreal, CUDA C++, physics-informed nets. Sep–Dec 2024 I was with Science Museum Group and Leeds HELIX XR on Dalton Mills. That brief ended; I am not still on a heritage contract. Since Nov 2025 my paid work is medical computer vision at Leeds (NDA), which lives in the vision lane.",
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
        fullDesc: "Sep–Dec 2024 I worked with Science Museum Group and University of Leeds HELIX XR on a VR reconstruction of Dalton Mills in Keighley, destroyed by fire in 2022. Collaborators: Alex Neish, Yuan Gao, Simon Popple. The case study went up in Jan 2025. Photogrammetry and NeRF-style reconstruction from a small photo set; geometric fidelity is limited by that set. PCVR, not a standalone headset build.",
        link: "https://digitaleducation.leeds.ac.uk/2025/01/08/reconstructing-dalton-mills-vr-and-ai-in-cultural-preservation/", 
        year: 2024,
        featured: true,
        featuredOrder: 5,
        role: 'Collaborator, Science Museum Group / Leeds HELIX XR',
        note: 'Geometric fidelity is limited by that photo set; there is no pre-fire laser scan to check against.',
        tags: ["Unreal Engine 5", "NeRF", "Photogrammetry", "VR"]
      },
      { 
        title: "AWS AI/ML Scholar", 
        desc: "AWS AI/ML Scholar, Jul 2022–Jun 2023. DeepRacer top 15%.", 
        fullDesc: "I was an AWS AI/ML Scholar from Jul 2022 to Jun 2023. DeepRacer put me in the top 15% of that league. PPO agents in the AWS simulator. Limit: a scholarship-league sim, not a hardware car programme.",
        link: "https://www.linkedin.com/in/gyanateet-dutta-386215192/", 
        year: 2023,
        tags: ["AWS", "DeepRacer", "PPO", "Reinforcement Learning"]
      },
      { 
        title: "Physics-Informed Neural Networks", 
        desc: "CUDA notebooks for Navier–Stokes and Burgers-type PDEs, plus PINN experiments.", 
        fullDesc: "I keep a repo of GPU-side PDE solvers and physics-informed nets: Navier–Stokes, Burgers, a few other nonlinear PDEs. CUDA C++ and PyTorch. Limit: a methods notebook, not a validated CFD code.",
        link: "https://github.com/Ryukijano/Physics-Based-DeepLearning", 
        tags: ["CUDA", "PINNs", "CFD", "Scientific Computing"]
      },
      {
        title: "B3tt3r: 3D Reconstruction",
        desc: "Mast3r + Spann3r glued together for stereo reconstruction from image pairs.",
        fullDesc: "I combined Mast3r and Spann3r for 3D reconstruction from image pairs — stereo matching and depth, then a mesh. Limit: no reconstruction benchmark against the source papers.",
        link: "https://github.com/Ryukijano/B3tt3r",
        tags: ["3D Vision", "Stereo Matching", "Python", "Deep Learning"]
      },
      {
        title: "CUDA Kernel Development",
        desc: "Daily CUDA C++ and CUDA-Q / cuQuantum kernel drills.",
        fullDesc: "QuantumVice-M25-CUDAQuest is a practice log: classical CUDA C++ kernels and CUDA-Q / cuQuantum exercises. Limit: drills, not a library.",
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
    fullDesc: "I finished the MSc Advanced Computer Science (Artificial Intelligence) at the University of Leeds in 2023–2024; I am not still enrolled. Mar–Nov 2025 I interned with AIMS (AI in Medicine and Surgery) on ESD workflow / DINOv2. Since Nov 2025 I have been a research technician at Leeds on medical computer vision under NDA. The public record is the ISBI paper and the thesis repo.",
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
        note: 'Those numbers are from the ISBI 2026 test splits, not a Trust-wide clinical evaluation.',
        links: [
          { href: 'https://doi.org/10.1109/isbi61048.2026.11515812', label: 'Paper' },
          { href: 'https://github.com/Ryukijano/DINOEndo', label: 'Code' },
        ],
        tags: ["DINOv2", "V-JEPA", "Medical AI", "Self-Supervised Learning"]
      },
      { 
        title: "Gemma-Le: VLA Policy", 
        desc: "SigLIP + Gemma 3 + ScaleDP VLA in a LeRobot fork. Hub checkpoints.", 
        fullDesc: "I wired a compact vision-language-action policy in a LeRobot fork: SigLIP for vision, Gemma 3 with LoRA for language, ScaleDP as the action head. Checkpoints trained on LeRobot-format sim data (robot_sim.PickNPlace). Limit: imitation on a simulated pick-and-place set, not a robot I deployed.",
        link: "https://huggingface.co/Ryukijano/gemma-groot", 
        tags: ["Robotics", "VLA", "Gemma 3", "Diffusion Policy"]
      },
      { 
        title: "MSc Thesis: Surgical Video Prediction", 
        desc: "MSc surgical video prediction. +2.36 dB PSNR, 22 FPS. Not on White Rose.", 
        fullDesc: "MSc work on surgical video prediction: a VAE–Transformer hybrid. This site previously claimed +2.36 dB PSNR over baselines and 22 FPS with FP16 mixed precision; I am leaving those as the project’s own measurements. Not deposited in White Rose eTheses. Code is on GitHub.",
        link: "https://github.com/Ryukijano/vae-surgical-prediction", 
        year: 2025,
        featured: true,
        featuredOrder: 4,
        role: 'MSc student, University of Leeds',
        note: 'Not deposited in White Rose eTheses. I did not measure longer-horizon drift or a downstream workflow effect.',
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
        note: 'No FID score and no paper. A sprint checkpoint, not a methods contribution.',
        tags: ["JAX", "TPU v4", "ControlNet", "Diffusion Models"]
      },
      {
        title: "Pothole Detection (arXiv)",
        desc: "Co-author. YOLOv7 + ESRGAN preprint: 94.7% precision, 82.6% recall on the PNW table.",
        fullDesc: "I am a co-author, not the sole author. Official title: “Improved Pothole Detection Using YOLOv7 and ESRGAN”, arXiv:2401.08588, submitted Nov 2023. Authors: N. K. Rout, G. Dutta, V. Sinha, A. Dey, S. Mukherjee, G. Gupta. Table 3 on the preprint: YOLOv7 tiny multi + ESRGAN, precision 0.947, recall 0.826 on PNW frames. Dashcam images, no LIDAR.",
        link: "https://arxiv.org/abs/2401.08588",
        year: 2024,
        featured: true,
        featuredOrder: 7,
        role: 'Co-author',
        note: 'A labelled-image study, not a deployed fleet evaluation.',
        tags: ["YOLOv7", "ESRGAN", "Computer Vision", "Published"]
      },
      {
        title: "Hopfield Networks & TSP",
        desc: "Sole-author arXiv, 2022. HNN and HNN-SA on TSP.",
        fullDesc: "Sole author. Official title: “Solving The Travelling Salesmen Problem using HNN and HNN-SA algorithms”, arXiv:2202.13746, Feb 2022. Hopfield nets versus simulated annealing on TSP instances. Limit: a student case study, not a complexity-theory result and not a quantum paper.",
        link: "https://arxiv.org/abs/2202.13746",
        year: 2022,
        tags: ["Hopfield Networks", "Optimization", "TSP", "Published"]
      },
      {
        title: "LGM: 3D Model Generation",
        desc: "Hugging Face Space wrapping LGM image-to-3D.",
        fullDesc: "I hosted an LGM (Large Gaussian Model) demo on Hugging Face Spaces: one image in, Gaussian-splat 3D out. Limit: a wrapper around an existing model, not a new generator.",
        link: "https://huggingface.co/spaces/Ryukijano/LGM",
        tags: ["3D Generation", "Gaussian Splatting", "Hugging Face", "Image-to-3D"]
      },
      {
        title: "Deep RL & Hugging Face",
        desc: "Hugging Face Deep RL course agents: PPO, DQN, Doom, PyBullet.",
        fullDesc: "Implementations from the Hugging Face Deep RL course: PPO, DQN, and related algorithms, pushed to the Hub. Doom and PyBullet among the environments. Limit: course units, not an original RL paper.",
        link: "https://github.com/Ryukijano/Deep-Reinforcement-Learning-and-Hugging-Face",
        figure: {
          kind: 'video',
          src: '/assets/media/doom-ppo.mp4',
          poster: '/assets/media/doom-ppo-poster.avif',
          width: 320,
          height: 240,
          alt: 'A PPO agent playing Doom: the view swings across a canyon while the HUD tracks health and ammunition.',
          caption: 'The PPO agent in ViZDoom, eight seconds of one rollout.',
          // The same honesty the .limit aside carries. A figure that oversells
          // is worse than no figure.
          limit: 'A course-unit agent in a scripted scenario, not a benchmark result.',
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
    fullDesc: "I work on hybrid quantum–classical experiments in Qiskit, PennyLane, and cuQuantum. Quantum Buddies is a three-person collective, not a funded lab. Bradford, YQuantum, NQCC, and City of London were weekend-scale builds. Do not read them as clinical or industrial deployments.",
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
        fullDesc: "I co-founded Quantum Buddies in 2025 with Sid Iliyasu (Imperial) and Dat Chi Le (Sheffield). We share repos and enter hackathons: QCTM sketches, Stim/QEC notes, Bradford genomics, City of London market simulation. Limit: a three-person collective, not an institute.",
        link: "https://quantum-buddies.github.io",
        isBanner: true,
        year: 2025,
        tags: ["Quantum ML", "Research", "Open Source", "Collaboration"]
      },
      { 
        title: "Bradford Quantum Hackathon 2025", 
        desc: "Nov 2025, team Ryoushi / Quantum Buddies. lambeq + Quixer, promoter vs non-promoter on GRCh38.", 
        fullDesc: "Bradford Quantum Hackathon, Nov 2025. Team Ryoushi / Quantum Buddies (Sid Iliyasu, Dat Chi Le, me). LinkedIn project: lambeq + Quixer, binary promoter vs non-promoter on GRCh38. Teammate posts claim Grand Prix and the healthcare / BYO track; I am repeating that as teammate-reported, not as an independent results table.",
        link: "https://quantumbradford2025.com/", 
        year: 2025,
        featured: true,
        featuredOrder: 1,
        role: 'Competitor, team Ryoushi / Quantum Buddies',
        note: 'Prizes are teammate-reported. Hackathon-scale, not a clinical genome panel.',
        tags: ["Genomics", "lambeq", "Quixer"]
      },
      { 
        title: "YQuantum 2025 (Yale)", 
        desc: "Apr 2025, Yale. Quantum Rings virtual-track win with Alisa Petrusinskaia (Quantum Bits).", 
        fullDesc: "YQuantum 2025 at Yale, April. Team Quantum Bits with Alisa Petrusinskaia. We won the Quantum Rings virtual track with a generalized Shor implementation on Quantum Rings — not the Yale Grand Prize. Modular exponentiation, QPE, inverse QFT on their simulator.",
        link: "https://github.com/Ryukijano/Quantum-bits-YQuantum-2025", 
        year: 2025,
        featured: true,
        featuredOrder: 2,
        role: 'Competitor, team Quantum Bits',
        note: 'Quantum Rings virtual track, not the Yale Grand Prize.',
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
        tags: ["NQCC", "VQE", "SQD", "Rolls-Royce", "Materials Science"]
      },
      { 
        title: "City of London Quantum Hackathon", 
        desc: "Finalist, Oct 2025. QCBM and quantum-walk MCMC for market simulation.", 
        fullDesc: "City of London Lord Mayor’s Quantum Hackathon, finalist Oct 2025 (Mansion House). Team Quantum Buddies. Differentiable QCBMs and quantum-walk MCMC for market simulation. WarwiQC won the event; we were a finalist. Limit: a finance demo, not a trading system.",
        link: "https://news.cityoflondon.gov.uk/quantum-meets-finance-hackathon-sparks-next-generation-solutions-in-the-city/", 
        year: 2025,
        tags: ["Finalist", "QCBM", "Finance", "Quantum Walk MCMC"]
      },
      {
        title: "Quantum Continuous Thought Machines",
        desc: "Hybrid quantum–classical recurrent sketch under Quantum Buddies.",
        fullDesc: "Early code for Quantum Continuous Thought Machines: a hybrid recurrent sketch mixing quantum circuits with a continuous-thought-style loop. Lives in the Quantum Buddies pile. Limit: a repo named after an idea, not a published architecture.",
        link: "https://github.com/Ryukijano/quantum-continuous-thought-machines",
        tags: ["QCTM", "Hybrid Quantum", "Recurrent Networks", "Reasoning"]
      },
      {
        title: "Quantum Error Correction",
        desc: "Surface-code experiments in Stim.",
        fullDesc: "Stabilizer-circuit and surface-code notes using Stim. Decoding experiments, not a new code family. Limit: simulator work, not a hardware QEC stack.",
        link: "https://github.com/Ryukijano/quantum-error-correction",
        tags: ["QEC", "Surface Code", "Stim", "Error Correction"]
      },
      {
        title: "Qiskit on Qubit",
        desc: "Qiskit notebooks: algorithms, variational circuits, a bit of QML.",
        fullDesc: "A folder of IBM Qiskit notebooks I use for algorithms, variational circuits, and quantum ML sketches. Limit: tutorials, not a textbook.",
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

/**
 * Project metadata, in one place. These used to be copy-pasted verbatim into
 * both WorkPage and CaseStudyPage, so the year in a catalogue heading and the
 * year in a case-study cartouche came from independent code.
 */

/** An explicit year or nothing. There is deliberately no prose fallback: the
 *  old regex scraped `\b(?:19|20)\d{2}\b` out of description text, fired for
 *  none of the 21 projects, and would have filed a project under a year
 *  mentioned in a sentence ("a mill that burned in 2022"). */
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

/** Featured first, then by explicit rank, then alphabetically.
 *  The Number.isFinite guard matters: two unfeatured projects both default to
 *  +Infinity, and `Infinity - Infinity` is NaN, which passed the old
 *  `order !== 0` check and made the localeCompare tie-break unreachable. */
export function withinYear(a, b) {
  const rank = Number(isFeatured(b)) - Number(isFeatured(a));
  if (rank !== 0) return rank;
  const order = featuredOrder(a) - featuredOrder(b);
  if (Number.isFinite(order) && order !== 0) return order;
  return String(a.title).localeCompare(String(b.title));
}

/** Dated projects newest first, undated ones last. */
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

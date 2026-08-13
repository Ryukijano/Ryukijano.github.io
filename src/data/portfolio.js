import { Github, Globe, Database, Cpu, Terminal, BookOpen, Box, Zap, Grid, Code, Layers, Trophy, Microscope, Flame, Activity, Linkedin, Users } from 'lucide-react';

// --- Content Data ---
export const DATA = {
  ryukijano: {
    id: 'ryukijano',
    title: "Ryukijano",
    subtitle: "Graphics & Systems Engineer",
    desc: "Building real-time 3D pipelines, GPU-accelerated simulations, and autonomous RL agents. From heritage preservation to physics solvers.",
    fullDesc: "Creative technologist specializing in real-time graphics, GPU computing, and interactive experiences. Currently working on cultural heritage preservation using cutting-edge AI and VR technologies at the Science Museum Group and University of Leeds HELIX XR facilities.",
    tags: ["CUDA", "C++", "Three.js", "Unreal Engine", "PyTorch"],
    socials: [
      { icon: Globe, link: "https://www.twitch.tv/ryukijano13", label: "Twitch" },
      { icon: Globe, link: "https://www.youtube.com/channel/UCf1XZKm0A_LoZj6Y22fIfcg", label: "YouTube" },
      { icon: Activity, link: "https://soundcloud.com/user-294342891/sets/running-wild-1", label: "SoundCloud" },
      { icon: Github, link: "https://github.com/Ryukijano", label: "GitHub" },
    ],
    projects: [
      { 
        title: "Dalton Mills VR Reconstruction", 
        desc: "Real-time 3D heritage reconstruction using SfM & NeRF integrated into Unreal Engine 5.", 
        fullDesc: "Collaborated with the Science Museum Group and University of Leeds HELIX XR facilities to reconstruct Dalton Mills, a historic building in Keighley destroyed by fire in 2022. Using deep learning techniques, we replicated 3D scanning and photogrammetry processing, generating an accurate 3D model from limited photographic data. This project highlights how virtual experiences can preserve and interpret cultural heritage.",
        link: "https://digitaleducation.leeds.ac.uk/2025/01/08/reconstructing-dalton-mills-vr-and-ai-in-cultural-preservation/", 
        icon: Box,
        media: { type: 'image', src: '/assets/images/Offrenda_Final_2000x1200__1_.jpg' },
        tags: ["Unreal Engine 5", "NeRF", "Photogrammetry", "VR"]
      },
      { 
        title: "AWS AI/ML Scholar", 
        desc: "Top 15% global performance in Deep Racer reinforcement learning on AWS infrastructure.", 
        fullDesc: "Selected as an AWS AI/ML Scholar, achieving top 15% global performance in the AWS DeepRacer competition. Developed and trained reinforcement learning agents using PPO algorithms on AWS cloud infrastructure, optimizing for autonomous racing in simulated environments.",
        link: "#", 
        icon: Trophy,
        media: { type: 'image', src: '/assets/images/doom_ppo.gif' },
        tags: ["AWS", "DeepRacer", "PPO", "Reinforcement Learning"]
      },
      { 
        title: "Physics-Informed Neural Networks", 
        desc: "GPU-accelerated CUDA solvers for Navier-Stokes and nonlinear PDEs.", 
        fullDesc: "Developed GPU-accelerated solvers using CUDA for physics simulations including Navier-Stokes equations, Burgers' equation, and other nonlinear PDEs. Implemented Physics-Informed Neural Networks (PINNs) for scientific computing applications.",
        link: "https://github.com/Ryukijano/Physics-Based-DeepLearning", 
        icon: Flame,
        media: { type: 'image', src: '/assets/images/Java_Hero__1_.jpg' },
        tags: ["CUDA", "PINNs", "CFD", "Scientific Computing"]
      },
      {
        title: "B3tt3r: 3D Reconstruction",
        desc: "Combining Mast3r and Spann3r for enhanced 3D reconstruction.",
        fullDesc: "A novel 3D reconstruction paradigm combining Mast3r and Spann3r models to achieve better results. Implements state-of-the-art stereo matching and depth estimation for robust 3D scene reconstruction from image pairs.",
        link: "https://github.com/Ryukijano/B3tt3r",
        icon: Box,
        media: { type: 'image', src: '/assets/images/IMG20231231141400.jpg' },
        tags: ["3D Vision", "Stereo Matching", "Python", "Deep Learning"]
      },
      {
        title: "CUDA Kernel Development",
        desc: "Daily CUDA C++ and CUDA-Q/cuQuantum kernel development.",
        fullDesc: "QuantumVice-M25-CUDAQuest: A journey exploring accelerated computing for ML, STEM, and Quantum Computing. Daily CUDA C++ (classical) and CUDA-Q/cuQuantum (quantum) kernel development exercises.",
        link: "https://github.com/Ryukijano/QuantumVice-M25-CUDAQuest",
        icon: Terminal,
        media: { type: 'image', src: '/assets/images/command-line__2_.jpg' },
        tags: ["CUDA", "cuQuantum", "GPU Computing", "C++"]
      }
    ]
  },
  ai: {
    id: 'ai',
    title: "Gyanateet",
    subtitle: "AI Researcher & Computer Scientist",
    desc: "MSc CS & AI @ Leeds. Focused on self-supervised learning, vision transformers, and medical image analysis.",
    fullDesc: "AI researcher pursuing Master's in Computer Science & AI at University of Leeds. Research interests span self-supervised learning, vision transformers, medical image analysis, and generative AI. Published researcher with work in computer vision and optimization.",
    tags: ["PyTorch", "JAX", "Computer Vision", "Hugging Face", "TensorFlow"],
    socials: [
      { icon: BookOpen, link: "https://orcid.org/0009-0008-0480-9241", label: "ORCID" },
      { icon: Layers, link: "https://dblp.org/pid/345/4093.html", label: "DBLP" },
      { icon: Activity, link: "https://wandb.ai/ryukijano", label: "W&B" },
      { icon: Linkedin, link: "https://www.linkedin.com/in/gyanateet-dutta-386215192/", label: "LinkedIn" },
    ],
    projects: [
      { 
        title: "AIMS: Surgical Phase Detection", 
        desc: "Self-supervised DINO & V-JEPA for surgical workflow analysis at NHS/LTHT.", 
        fullDesc: "Research internship at AIMS Group (AI in Medical Systems), University of Leeds. Developed surgical phase detection systems using self-supervised learning with DINO, DINOv2, and V-JEPA vision transformers. Achieved >90% accuracy on surgical workflow classification with minimal annotations, enabling skill assessment and surgeon training applications at Leeds Teaching Hospitals NHS Trust (LTHT).",
        link: "https://github.com/Ryukijano/DINOEndo", 
        icon: Microscope,
        media: { type: 'image', src: '/assets/images/computer_vision.jpg' },
        tags: ["DINOv2", "V-JEPA", "Medical AI", "Self-Supervised Learning"]
      },
      { 
        title: "Gemma-Le: VLA Policy", 
        desc: "Vision-Language-Action model for robotics with SigLIP + Gemma 3.", 
        fullDesc: "Developed a compact Vision-Language-Action (VLA) policy for robotic manipulation using LeRobot framework. Integrates SigLIP for vision encoding, Gemma 3 for language reasoning, and ScaleDP diffusion head for action prediction. Enables imitation learning for robotic tasks.",
        link: "https://huggingface.co/Ryukijano/gemma-groot", 
        icon: Cpu,
        media: { type: 'image', src: '/assets/images/gemma-groot-demo.png' },
        tags: ["Robotics", "VLA", "Gemma 3", "Diffusion Policy"]
      },
      { 
        title: "MSc Thesis: Surgical Video Prediction", 
        desc: "VAE-Transformer hybrid achieving +2.36 dB PSNR improvement.", 
        fullDesc: "Master's thesis on surgical video prediction using a novel VAE-Transformer hybrid architecture. Achieved +2.36 dB PSNR improvement over baselines with FP16 mixed-precision training for efficiency. Real-time inference at 22 FPS enables practical surgical workflow applications.",
        link: "https://github.com/Ryukijano/vae-surgical-prediction", 
        icon: Layers,
        media: { type: 'image', src: '/assets/images/neural-network-architecture.png' },
        tags: ["VAE", "Transformer", "Video Prediction", "Medical AI"]
      },
      { 
        title: "JAX Diffusers Sprint", 
        desc: "8th Place Global 2023. ControlNet on TPU v4 for anime-realism.", 
        fullDesc: "Achieved 8th place globally in the Hugging Face JAX Diffusers community competition. Developed an advanced ControlNet model for anime-realism art style generation using the JAX framework, optimized for Google TPU v4 MXUs. Demonstrated efficient training and inference on cloud TPU infrastructure.",
        link: "https://github.com/Ryukijano/CatCon-Controlnet-WD-1-5-b2", 
        icon: Database,
        media: { type: 'image', src: '/assets/images/diffusion.png' },
        tags: ["JAX", "TPU v4", "ControlNet", "Diffusion Models"]
      },
      {
        title: "Pothole Detection (arXiv)",
        desc: "YOLOv7 + ESRGAN: 94.7% precision, 82.6% recall without LIDAR.",
        fullDesc: "Published research proposing a novel algorithm combining YOLOv7 with ESRGAN super-resolution for improved pothole detection using low-resolution cameras. Achieves 94.7% precision and 82.6% recall without expensive LIDAR sensors, enabling practical road infrastructure monitoring applications.",
        link: "https://arxiv.org/abs/2401.08588",
        icon: Globe,
        media: { type: 'image', src: '/assets/images/Feature_Community__1_.jpg' },
        tags: ["YOLOv7", "ESRGAN", "Computer Vision", "Published"]
      },
      {
        title: "Hopfield Networks & TSP",
        desc: "Comparative study of HNN and Simulated Annealing for optimization.",
        fullDesc: "Published research presenting a comprehensive study on the Travelling Salesman Problem (TSP), addressing it with Hopfield Neural Networks and comparing performance to Simulated Annealing. Contributes to computational complexity research and quantum optimization algorithms.",
        link: "https://arxiv.org/abs/2202.13746",
        icon: Terminal,
        media: { type: 'image', src: '/assets/images/reinforcement-learning-diagram.png' },
        tags: ["Hopfield Networks", "Optimization", "TSP", "Published"]
      },
      {
        title: "LGM: 3D Model Generation",
        desc: "Generate 3D models from single images using Large Gaussian Model.",
        fullDesc: "Hugging Face Space implementing LGM (Large Gaussian Model) for generating 3D models from single images. Uses Gaussian splatting techniques for high-quality 3D reconstruction from 2D inputs.",
        link: "https://huggingface.co/spaces/Ryukijano/LGM",
        icon: Box,
        media: { type: 'image', src: '/assets/images/diffusion.png' },
        tags: ["3D Generation", "Gaussian Splatting", "Hugging Face", "Image-to-3D"]
      },
      {
        title: "Deep RL & Hugging Face",
        desc: "Reinforcement learning implementations with Hugging Face integration.",
        fullDesc: "Collection of deep reinforcement learning implementations integrated with Hugging Face ecosystem. Includes PPO, DQN, and other RL algorithms applied to various environments including Doom and robotic control tasks.",
        link: "https://github.com/Ryukijano/Deep-Reinforcement-Learning-and-Hugging-Face",
        icon: Cpu,
        media: { type: 'image', src: '/assets/images/ant_bullet.gif' },
        tags: ["Deep RL", "PPO", "DQN", "Hugging Face"]
      },
    ]
  },
  ryoushi: {
    id: 'ryoushi',
    title: "Ryoushi",
    subtitle: "Quantum Algorithm Researcher",
    desc: "Hybrid quantum-classical algorithms. Hackathon winner. Co-founder of Quantum Buddies research collective.",
    fullDesc: "Quantum computing researcher and co-founder of Quantum Buddies, a research collective dedicated to advancing quantum machine learning, quantum attention mechanisms, and hybrid quantum-classical algorithms. Multiple hackathon winner with expertise in VQE, QAOA, quantum walks, and quantum error correction.",
    tags: ["Qiskit", "PennyLane", "Quantum ML", "Python", "CuQuantum"],
    bannerImage: "/assets/images/nightcity.jpg",
    socials: [
      { icon: Users, link: "https://quantum-buddies.github.io", label: "Quantum Buddies" },
      { icon: Code, link: "https://devpost.com/Ryukijano", label: "Devpost" },
      { icon: Github, link: "https://github.com/Quantum-Buddies", label: "QBuddies GitHub" },
    ],
    projects: [
      {
        title: "Quantum Buddies",
        desc: "Research collective pioneering quantum ML, attention mechanisms, and QCTM.",
        fullDesc: "Co-founded Quantum Buddies, a research organization dedicated to advancing quantum computing and its applications. Our projects include: Quasar (Quantum Attention for Scientific Discovery with Q-UDiT architecture), Quantum Continuous Thought Machines (hybrid quantum-classical recurrent networks), Quantum Breast Cancer Classification (VQA-based medical diagnosis), and contributions to multiple quantum hackathons worldwide.",
        link: "https://quantum-buddies.github.io",
        icon: Users,
        isBanner: true,
        bannerSrc: "/assets/images/nightcity.jpg",
        tags: ["Quantum ML", "Research", "Open Source", "Collaboration"]
      },
      { 
        title: "Bradford Quantum Hackathon 2025", 
        desc: "Grand Prix & 1st Place Medicine. Genomic sequence prediction.", 
        fullDesc: "Won Grand Prix Prize and 1st Place in Medicine category at the Bradford Quantum Hackathon 2025. Developed a Quantum-Enhanced Genomic Sequence Prediction pipeline combining QD-HMC (Quantum-Driven Hamiltonian Monte Carlo) with Quixer quantum transformer architecture. Achieved ~90% accuracy vs ~80% classical MCMC baseline on NCBI genomic datasets for personalized medicine applications.",
        link: "#", 
        icon: Trophy,
        media: { type: 'image', src: '/assets/images/CULTURE_III__2_.jpg' },
        tags: ["Grand Prix", "Genomics", "QD-HMC", "Quixer"]
      },
      { 
        title: "YQuantum 2025 (Yale)", 
        desc: "1st Place. Generalized Shor's Algorithm for Quantum Rings.", 
        fullDesc: "Won 1st Place at the YQuantum Hackathon 2025 at Yale University. Developed a generalized implementation of Shor's Algorithm optimized for quantum ring topologies, demonstrating novel approaches to quantum factorization on near-term quantum hardware.",
        link: "https://github.com/Quantum-Buddies/Quantum-bits-YQuantum-2025", 
        icon: Trophy,
        media: { type: 'image', src: '/assets/images/Feature_Github_Hero_Accessibility.jpg' },
        tags: ["1st Place", "Shor's Algorithm", "Yale", "Quantum Rings"]
      },
      { 
        title: "NQCC UK Quantum Hackathon", 
        desc: "Rolls-Royce Challenge: VQE+SQD for hydrogen-nickel surface simulation.", 
        fullDesc: "Participated in the National Quantum Computing Centre (NQCC) UK Quantum Hackathon 2025 on the Rolls-Royce industrial challenge. Developed VQE (Variational Quantum Eigensolver) combined with SQD (Sample-based Quantum Diagonalization) for simulating hydrogen adsorption on nickel surfaces. Focused on circuit depth optimization for NISQ devices and DFT comparison studies.",
        link: "https://github.com/Ryukijano/Team_15_NQCC_UK_Quantum_Hackathon_2025_new", 
        icon: Zap,
        media: { type: 'image', src: '/assets/images/kanagawa_latentspace_autoencoder.jpg' },
        tags: ["NQCC", "VQE", "SQD", "Rolls-Royce", "Materials Science"]
      },
      { 
        title: "City of London Quantum Hackathon", 
        desc: "Finalist. QCBM for financial time-series forecasting.", 
        fullDesc: "Finalist at the City of London Quantum Hackathon 2025. Developed Quantum Circuit Born Machines (QCBM) for financial time-series modeling and forecasting. Implemented Quantum Walk MCMC algorithms and compared performance against classical MCMC baselines for stock price prediction.",
        link: "#", 
        icon: Grid,
        media: { type: 'image', src: '/assets/images/quantum-variational-demo.png' },
        tags: ["Finalist", "QCBM", "Finance", "Quantum Walk MCMC"]
      },
      {
        title: "Quantum Continuous Thought Machines",
        desc: "Hybrid quantum-classical recurrent networks for reasoning.",
        fullDesc: "Research on Quantum Continuous Thought Machines (QCTM) - a novel architecture combining quantum computing with continuous thought processes for enhanced reasoning capabilities. Part of the Quantum Buddies research collective.",
        link: "https://github.com/Ryukijano/quantum-continuous-thought-machines",
        icon: Cpu,
        media: { type: 'image', src: '/assets/images/neural-network-architecture.png' },
        tags: ["QCTM", "Hybrid Quantum", "Recurrent Networks", "Reasoning"]
      },
      {
        title: "Quantum Error Correction",
        desc: "Surface code QEC implementations with Stim simulator.",
        fullDesc: "Implementations of quantum error correction protocols including surface codes. Uses Stim simulator for efficient simulation of stabilizer circuits and error correction decoding strategies.",
        link: "https://github.com/Ryukijano/quantum-error-correction",
        icon: Terminal,
        media: { type: 'image', src: '/assets/images/command-line__2_.jpg' },
        tags: ["QEC", "Surface Code", "Stim", "Error Correction"]
      },
      {
        title: "Qiskit on Qubit",
        desc: "Quantum computing tutorials and implementations with Qiskit.",
        fullDesc: "Collection of quantum computing implementations and tutorials using IBM Qiskit. Covers various quantum algorithms, variational circuits, and quantum machine learning applications.",
        link: "https://github.com/Ryukijano/Qiskit_on_Qubit",
        icon: Code,
        media: { type: 'image', src: '/assets/images/Java_Hero__1_.jpg' },
        tags: ["Qiskit", "Quantum Algorithms", "IBM Quantum", "Tutorials"]
      },
    ]
  }
};

export const CV_URL = '/resume/Gyanateet_Dutta_Resume_updated.pdf';

export const PERSONA_BY_SLUG = {
  ryukijano: 'ryukijano',
  gyanateet: 'ai',
  ryoushi: 'ryoushi',
};

export const LANES = [
  { id: 'ryukijano', slug: 'ryukijano', label: 'Systems', kicker: 'Ryukijano' },
  { id: 'ai', slug: 'gyanateet', label: 'Vision', kicker: 'Gyanateet' },
  { id: 'ryoushi', slug: 'ryoushi', label: 'Quantum', kicker: 'Ryoushi' },
];

export const SIGNAL = [
  { value: 'Grand Prix', label: 'Bradford Quantum · Medicine' },
  { value: '1st', label: 'YQuantum · Yale' },
  { value: '8th', label: 'JAX Diffusers global' },
  { value: '+2.36 dB', label: 'Thesis PSNR lift' },
  { value: '>90%', label: 'Surgical phase accuracy' },
  { value: '2', label: 'arXiv papers' },
];

export function allProjects() {
  return LANES.flatMap((lane) =>
    DATA[lane.id].projects.map((project) => ({
      ...project,
      laneId: lane.id,
      laneLabel: lane.label,
      laneKicker: lane.kicker,
      personaSlug: lane.slug,
    })),
  );
}

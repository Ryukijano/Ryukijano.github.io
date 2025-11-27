import React, { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, Database, Cpu, Globe, Terminal, BookOpen, Box, Zap, Grid, Code, Layers, Trophy, Microscope, Flame, Activity, Linkedin, Users, X, Download, ArrowLeft, ChevronRight } from 'lucide-react';

// --- Content Data ---
const DATA = {
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

const Portfolio = () => {
  const [activePane, setActivePane] = useState(null); // 'left', 'center', 'right', or null
  const [expandedSection, setExpandedSection] = useState(null); // 'ryukijano', 'ai', 'ryoushi', or null
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    checkMobile();
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // If a section is expanded, show the expanded view
  if (expandedSection) {
    const sectionData = expandedSection === 'ryukijano' ? DATA.ryukijano : 
                        expandedSection === 'ai' ? DATA.ai : DATA.ryoushi;
    return <ExpandedSection data={sectionData} onClose={() => setExpandedSection(null)} />;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-black overflow-hidden font-sans selection:bg-white selection:text-black">
      
      {/* Hero Background - Absolutely positioned behind everything */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Main hero image with mask */}
        <div className="absolute inset-0">
          <img 
            src="/assets/images/1500x500.jpg" 
            alt="Kanagawa Wave to Digital Transformation" 
            className="w-full h-[40vh] md:h-[50vh] object-cover object-top opacity-60"
            style={{
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
            }}
          />
        </div>
        {/* Chromatic aberration / glitch layers */}
        <div className="absolute inset-0 mix-blend-screen opacity-30">
          <img 
            src="/assets/images/1500x500.jpg" 
            alt="" 
            className="w-full h-[40vh] md:h-[50vh] object-cover object-top"
            style={{
              filter: 'hue-rotate(90deg) saturate(2)',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 80%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 80%)',
              transform: 'translateX(3px)',
            }}
          />
        </div>
        <div className="absolute inset-0 mix-blend-multiply opacity-20">
          <img 
            src="/assets/images/1500x500.jpg" 
            alt="" 
            className="w-full h-[40vh] md:h-[50vh] object-cover object-top"
            style={{
              filter: 'hue-rotate(-60deg) saturate(1.5)',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0) 90%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0) 90%)',
              transform: 'translateX(-3px)',
            }}
          />
        </div>
        {/* Noise overlay for texture */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* --- Resume Button - Fixed position --- */}
      <a 
        href="/resume/Gyanateet_Dutta_Resume_updated.pdf" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md text-black rounded-full shadow-lg hover:bg-white hover:scale-105 transition-all duration-300 font-medium text-sm"
      >
        <Download size={16} />
        Resume
      </a>

      {/* --- LEFT PANE: RYUKIJANO --- */}
      <Pane 
        id="left"
        activePane={activePane}
        setActivePane={setActivePane}
        onExpand={() => setExpandedSection('ryukijano')}
        baseColor="bg-[#E6E1D3]" // Paper/Cream
        textColor="text-[#1a237e]" // Indigo
        accentColor="bg-[#1a237e]"
        titleLines={['Ryu', 'ki', 'jano']}
        subtitle={DATA.ryukijano.subtitle}
        desc={DATA.ryukijano.desc}
        tags={DATA.ryukijano.tags}
        projects={DATA.ryukijano.projects}
        socials={DATA.ryukijano.socials}
        isMobile={isMobile}
        fontTitle="font-serif"
        fontBody="font-serif"
      >
        <FluidWaves />
      </Pane>

      {/* --- CENTER PANE: GYANATEET --- */}
      <Pane 
        id="center"
        activePane={activePane}
        setActivePane={setActivePane}
        onExpand={() => setExpandedSection('ai')}
        baseColor="bg-[#2a2a2a]" 
        textColor="text-white"
        accentColor="bg-indigo-500"
        titleLines={['G', 'YANA', 'TEET']}
        subtitle={DATA.ai.subtitle}
        desc={DATA.ai.desc}
        tags={DATA.ai.tags}
        projects={DATA.ai.projects}
        socials={DATA.ai.socials}
        isMobile={isMobile}
        fontTitle="font-sans"
        fontBody="font-sans"
      >
        <EmbeddingSpace />
      </Pane>

      {/* --- RIGHT PANE: RYOUSHI --- */}
      <Pane 
        id="right"
        activePane={activePane}
        setActivePane={setActivePane}
        onExpand={() => setExpandedSection('ryoushi')}
        baseColor="bg-[#050505]" 
        textColor="text-[#FF2E63]" 
        accentColor="bg-[#FF2E63]"
        titleLines={['RY', 'OU', 'SHI']}
        subtitle={DATA.ryoushi.subtitle}
        desc={DATA.ryoushi.desc}
        tags={DATA.ryoushi.tags}
        projects={DATA.ryoushi.projects}
        socials={DATA.ryoushi.socials}
        isMobile={isMobile}
        fontTitle="font-mono"
        fontBody="font-mono"
      >
        <CyberGrid />
      </Pane>

    </div>
  );
};

// --- Reusable Pane Component ---
const Pane = ({ 
  id, activePane, setActivePane, onExpand, children, 
  baseColor, textColor, accentColor, 
  titleLines, subtitle, desc, tags, projects, socials, 
  isMobile, fontTitle, fontBody 
}) => {
  let widthClass = "md:w-1/3";
  if (!isMobile) {
    if (activePane === id) widthClass = "md:w-[60%]";
    else if (activePane !== null) widthClass = "md:w-[20%]";
  }
  
  // Determine background gradient - more transparent at top to show hero image
  let gradientStyle = {};
  if (id === 'left') {
    gradientStyle = { background: 'linear-gradient(transparent 0%, rgba(230, 225, 211, 0.4) 15%, rgba(230, 225, 211, 0.85) 35%, rgb(230, 225, 211) 50%)' };
  }
  if (id === 'center') {
    gradientStyle = { background: 'linear-gradient(transparent 0%, rgba(26, 26, 26, 0.5) 15%, rgba(26, 26, 26, 0.9) 35%, rgb(26, 26, 26) 50%)' };
  }
  if (id === 'right') {
    // More transparent at top to show CyberGrid wireframe
    gradientStyle = { background: 'linear-gradient(transparent 0%, transparent 20%, rgba(5, 5, 5, 0.3) 35%, rgba(5, 5, 5, 0.6) 50%, rgba(5, 5, 5, 0.85) 65%, rgb(5, 5, 5) 80%)' };
  }

  const [showSoundCloud, setShowSoundCloud] = useState(true);

  return (
    <div 
      onMouseEnter={() => setActivePane(id)}
      onMouseLeave={() => setActivePane(null)}
      className={`
        relative h-min md:h-full min-h-[33vh] ${widthClass} ${textColor}
        transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
        overflow-hidden border-b md:border-b-0 md:border-r border-white/5
        group cursor-default
      `}
      style={gradientStyle}
    >
      {children}
      
      {/* Soundcloud Widget (Ryukijano only) */}
      {id === 'left' && (
        <div className="absolute bottom-4 left-4 z-30 w-[90%] md:w-[300px] pointer-events-auto transition-opacity duration-300"
             style={{ opacity: showSoundCloud ? 1 : 0, pointerEvents: showSoundCloud ? 'auto' : 'none' }}>
           <div className="bg-white/80 backdrop-blur-md rounded-xl overflow-hidden shadow-lg border border-[#1a237e]/10 relative">
             <iframe 
               width="100%" 
               height="100" 
               scrolling="no" 
               frameBorder="no" 
               allow="autoplay" 
               src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/user-294342891/know-me-project-1&color=%231a237e&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
             ></iframe>
             <button 
               onClick={() => setShowSoundCloud(false)}
               className="absolute top-1 right-1 bg-white rounded-full p-1 text-[#1a237e] hover:bg-[#1a237e] hover:text-white transition-colors z-40 shadow-sm"
             >
               <X size={12} />
             </button>
           </div>
        </div>
      )}
      {id === 'left' && !showSoundCloud && (
        <button 
          onClick={() => setShowSoundCloud(true)}
          className="absolute bottom-4 left-4 z-30 bg-white/80 backdrop-blur-md p-2 rounded-full text-[#1a237e] shadow-lg hover:scale-110 transition-transform"
        >
          <Activity size={20} />
        </button>
      )}

      <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between pointer-events-none">
        {/* Content wrapper - no backdrop, let background show through */}
        <div className="space-y-4 pointer-events-auto">
          
          {/* Tags - always visible */}
          <div className={`flex flex-wrap gap-2 mb-2 transition-opacity duration-500 ${activePane && activePane !== id ? 'opacity-0' : 'opacity-100'}`}>
             {tags.map(tag => (
               <span key={tag} className={`
                 px-2 py-1 rounded-sm text-[10px] font-mono tracking-widest uppercase 
                 ${id === 'left' ? 'bg-[#1a237e] text-white' : ''}
                 ${id === 'center' ? 'bg-indigo-600 text-white' : ''}
                 ${id === 'right' ? 'bg-[#FF2E63] text-white' : ''}
                 shadow-sm
               `}>
                 {tag}
               </span>
             ))}
          </div>

          {/* Title - always visible */}
          <h2 className={`text-5xl md:text-7xl font-bold tracking-tighter leading-none ${fontTitle}
            ${id === 'center' ? 'text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50' : ''}
            ${id === 'right' ? 'uppercase' : ''}
          `}
          style={id === 'right' ? { textShadow: '2px 2px 0px #FF2E63' } : {}}
          >
            {titleLines.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h2>

          {/* Subtitle & Description - ONLY visible on hover */}
          {activePane === id && (
            <div className="animate-fadeIn">
              <p className={`text-sm md:text-base font-medium uppercase tracking-wider mb-2 opacity-70 ${fontBody}`}>
                {subtitle}
              </p>
              <p className={`text-base md:text-lg opacity-70 max-w-md leading-relaxed ${fontBody} ${id === 'left' ? 'italic' : ''}`}>
                {desc}
              </p>
              
              {/* Social Links - only on hover */}
              <div className="flex gap-4 mt-6">
                {socials.map((social, idx) => (
                  <a 
                    key={idx} 
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      transition-transform hover:scale-110
                      ${id === 'left' ? 'text-[#1a237e] hover:text-[#1a237e]/70' : ''}
                      ${id === 'center' ? 'text-white hover:text-indigo-400' : ''}
                      ${id === 'right' ? 'text-[#FF2E63] hover:text-white' : ''}
                    `}
                    title={social.label}
                  >
                    <social.icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Project List - Only visible when active or mobile */}
        <div className={`space-y-6 transition-all duration-500 pointer-events-auto 
          ${activePane === id || isMobile ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 md:hidden'}
        `}>
           <div className={`h-px w-full mb-4 
             ${id === 'left' ? 'bg-[#1a237e]/20' : ''}
             ${id === 'center' ? 'bg-white/20' : ''}
             ${id === 'right' ? 'bg-[#FF2E63]/30' : ''}
           `}></div>
           <ProjectList items={projects.slice(0, 3)} theme={id === 'left' ? 'light' : id === 'center' ? 'dark' : 'neon'} />
           
           {/* View All Button */}
           <button
             onClick={onExpand}
             className={`
               w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 
               transition-all duration-300 font-medium text-sm
               ${id === 'left' ? 'bg-[#1a237e]/10 hover:bg-[#1a237e]/20 text-[#1a237e] border border-[#1a237e]/20' : ''}
               ${id === 'center' ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20' : ''}
               ${id === 'right' ? 'bg-[#FF2E63]/10 hover:bg-[#FF2E63]/20 text-[#FF2E63] border border-[#FF2E63]/30 hover:shadow-[0_0_15px_rgba(255,46,99,0.2)]' : ''}
             `}
           >
             View All Projects <ChevronRight size={16} />
           </button>
        </div>
      </div>
      
      {/* Overlay to dim inactive panes */}
      <div className={`absolute inset-0 bg-black/40 pointer-events-none transition-opacity duration-500 ${activePane && activePane !== id && !isMobile ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  );
};

const ProjectList = ({ items, theme }) => {
  return (
    <div className="grid gap-4 pb-20 md:pb-0"> {/* Padding bottom for scroll/mobile */}
      {items.map((project, idx) => (
        <a 
          key={idx} 
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            group flex items-start gap-4 p-4 rounded-lg transition-all duration-300 cursor-pointer relative overflow-hidden
            ${theme === 'light' ? 'hover:bg-[#1a237e]/5 border border-transparent hover:border-[#1a237e]/20' : ''}
            ${theme === 'dark' ? 'hover:bg-white/10 border border-transparent hover:border-white/20' : ''}
            ${theme === 'neon' ? 'hover:bg-[#FF2E63]/10 border border-transparent hover:border-[#FF2E63]/50 hover:shadow-[0_0_15px_rgba(255,46,99,0.2)]' : ''}
          `}
        >
          {/* Background Image Fade In on Hover */}
          {project.media && project.media.type === 'image' && (
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-cover bg-center z-0"
                 style={{ backgroundImage: `url(${project.media.src})` }} 
            />
          )}

          <div className={`mt-1 relative z-10 ${theme === 'neon' ? 'text-[#FF2E63]' : 'opacity-70'}`}>
            <project.icon size={20} />
          </div>
          <div className="relative z-10">
            <h4 className="font-bold text-lg flex items-center gap-2">
              {project.title} 
              <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </h4>
            <p className={`text-sm leading-relaxed ${theme === 'neon' ? 'text-white/70' : 'opacity-70'}`}>
              {project.desc}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}

// --- Expanded Section Component ---
const ExpandedSection = ({ data, onClose }) => {
  const config = {
    ryukijano: {
      bg: 'bg-[#E6E1D3]',
      text: 'text-[#1a237e]',
      accent: 'bg-[#1a237e]',
      accentText: 'text-[#1a237e]',
      font: 'font-serif',
      cardBg: 'bg-white/60',
      headerBg: 'bg-[#E6E1D3]/90',
    },
    ai: {
      bg: 'bg-[#0a0a0a]',
      text: 'text-white',
      accent: 'bg-indigo-500',
      accentText: 'text-indigo-400',
      font: 'font-sans',
      cardBg: 'bg-white/5',
      headerBg: 'bg-[#0a0a0a]/90',
    },
    ryoushi: {
      bg: 'bg-[#050505]',
      text: 'text-[#FF2E63]',
      accent: 'bg-[#FF2E63]',
      accentText: 'text-[#FF2E63]',
      font: 'font-mono',
      cardBg: 'bg-black/40',
      headerBg: 'bg-[#050505]/90',
    }
  };

  const c = config[data.id];

  return (
    <div className={`min-h-screen ${c.bg} ${c.text} overflow-auto relative`}>
      
      {/* === BACKGROUND LAYERS === */}
      
      {/* Ryukijano: Kanagawa Wave + Fluid Waves */}
      {data.id === 'ryukijano' && (
        <>
          {/* Hero wave image at top */}
          <div className="fixed top-0 left-0 right-0 h-[50vh] z-0 overflow-hidden">
            <img 
              src="/assets/images/1500x500.jpg" 
              alt="" 
              className="w-full h-full object-cover object-top opacity-40"
              style={{
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0) 100%)',
              }}
            />
          </div>
          {/* Fluid wave canvas */}
          <ExpandedFluidWaves />
        </>
      )}
      
      {/* Gyanateet: Pixel/Embedding Space */}
      {data.id === 'ai' && (
        <>
          {/* Hero image at top with digital treatment */}
          <div className="fixed top-0 left-0 right-0 h-[50vh] z-0 overflow-hidden">
            <img 
              src="/assets/images/1500x500.jpg" 
              alt="" 
              className="w-full h-full object-cover object-top opacity-30"
              style={{
                filter: 'hue-rotate(180deg) saturate(0.5)',
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
              }}
            />
          </div>
          {/* Embedding space particles */}
          <ExpandedEmbeddingSpace />
        </>
      )}
      
      {/* Ryoushi: Nightcity + CyberGrid */}
      {data.id === 'ryoushi' && (
        <>
          {/* Nightcity background */}
          <div 
            className="fixed inset-0 z-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(/assets/images/nightcity.jpg)`,
              opacity: 0.35,
            }}
          />
          {/* Cyber grid overlay */}
          <ExpandedCyberGrid />
          {/* Neon glow gradient */}
          <div className="fixed inset-0 z-[1] pointer-events-none bg-gradient-to-t from-[#FF2E63]/20 via-transparent to-transparent" />
        </>
      )}
      
      {/* === HEADER === */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl ${c.headerBg} border-b border-current/10`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={onClose}
            className={`flex items-center gap-2 hover:opacity-70 transition-opacity ${c.font}`}
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Portfolio</span>
          </button>
          <a 
            href="/resume/Gyanateet_Dutta_Resume_updated.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${c.accent} text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-lg`}
          >
            <Download size={16} />
            Resume
          </a>
        </div>
      </header>

      {/* === HERO SECTION === */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-16">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {data.tags.map(tag => (
            <span key={tag} className={`px-3 py-1 rounded-full text-xs ${c.font} uppercase tracking-wider ${c.accent} text-white shadow-md`}>
              {tag}
            </span>
          ))}
        </div>
        
        {/* Title */}
        <h1 className={`text-6xl md:text-9xl font-bold mb-4 ${c.font} tracking-tight
          ${data.id === 'ryoushi' ? 'uppercase' : ''}
          ${data.id === 'ai' ? 'text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50' : ''}
        `}
        style={data.id === 'ryoushi' ? { textShadow: '3px 3px 0px #FF2E63, 6px 6px 20px rgba(255,46,99,0.3)' } : {}}
        >
          {data.title}
        </h1>
        
        {/* Subtitle */}
        <p className={`text-2xl md:text-3xl opacity-70 mb-6 ${c.font} ${data.id === 'ryukijano' ? 'italic' : ''}`}>
          {data.subtitle}
        </p>
        
        {/* Description */}
        <p className={`text-lg max-w-3xl opacity-80 leading-relaxed ${c.font}`}>
          {data.fullDesc || data.desc}
        </p>
        
        {/* Social Links */}
        <div className="flex flex-wrap gap-4 mt-8">
          {data.socials.map((social, idx) => (
            <a 
              key={idx} 
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg border border-current/20 
                hover:bg-current/10 transition-all duration-300 ${c.font}
                ${data.id === 'ryoushi' ? 'hover:shadow-[0_0_15px_rgba(255,46,99,0.3)] hover:border-[#FF2E63]/50' : ''}
              `}
            >
              <social.icon size={18} />
              <span className="text-sm font-medium">{social.label}</span>
            </a>
          ))}
        </div>
      </section>

      {/* === PROJECTS GRID === */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <h2 className={`text-3xl font-bold mb-8 ${c.font} ${data.id === 'ryoushi' ? 'uppercase tracking-wider' : ''}`}>
          {data.id === 'ryoushi' ? '// Projects & Achievements' : 'Projects & Achievements'}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {data.projects.map((project, idx) => (
            <a
              key={idx}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                group relative overflow-hidden rounded-xl border transition-all duration-300
                ${c.cardBg} backdrop-blur-md
                ${data.id === 'ryukijano' ? 'border-[#1a237e]/20 hover:border-[#1a237e]/40 hover:shadow-xl' : ''}
                ${data.id === 'ai' ? 'border-white/10 hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]' : ''}
                ${data.id === 'ryoushi' ? 'border-[#FF2E63]/20 hover:border-[#FF2E63]/60 hover:shadow-[0_0_30px_rgba(255,46,99,0.3)]' : ''}
              `}
            >
              {/* Project Image */}
              {(project.media || project.isBanner) && (
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={project.media?.src || project.bannerSrc} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Overlay gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${
                    data.id === 'ryukijano' ? 'from-[#E6E1D3] via-transparent' :
                    data.id === 'ai' ? 'from-[#0a0a0a] via-transparent' :
                    'from-black via-transparent'
                  } to-transparent opacity-60`} />
                </div>
              )}
              
              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${c.accent}/20`}>
                    <project.icon size={20} />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold flex items-center gap-2 ${c.font}`}>
                      {project.title}
                      <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                  </div>
                </div>
                <p className={`opacity-70 mb-4 leading-relaxed text-sm ${data.id === 'ai' ? 'text-gray-300' : ''}`}>
                  {project.fullDesc || project.desc}
                </p>
                {project.tags && (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className={`px-2 py-1 text-xs rounded ${c.font} tracking-wide
                        ${data.id === 'ryukijano' ? 'bg-[#1a237e]/10 text-[#1a237e]' : ''}
                        ${data.id === 'ai' ? 'bg-indigo-500/20 text-indigo-300' : ''}
                        ${data.id === 'ryoushi' ? 'bg-[#FF2E63]/20 text-[#FF2E63]' : ''}
                      `}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className={`relative z-10 border-t border-current/10 py-8 ${c.font}`}>
        <div className="max-w-6xl mx-auto px-6 text-center opacity-60">
          <p>&copy; 2025 Gyanateet Dutta. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

// --- Expanded Page Background Components ---

const ExpandedFluidWaves = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frameId;
    let time = 0;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.008;
      // Draw multiple wave layers
      for (let layer = 0; layer < 5; layer++) {
        ctx.beginPath();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = `rgba(26, 35, 126, ${0.03 + layer * 0.015})`;
        for (let x = 0; x < canvas.width; x += 3) {
          const y = Math.sin(x * 0.003 + time + layer * 0.5) * 80 
                  + Math.sin(x * 0.007 + time * 0.7) * 40 
                  + canvas.height * (0.3 + layer * 0.12);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      frameId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
    };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full opacity-60 pointer-events-none z-[1]" />;
};

const ExpandedEmbeddingSpace = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frameId;
    let time = 0;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    const gridSize = 24;
    const draw = () => {
      time += 0.012;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const flowX = x * 0.004 - time * 0.04;
          const flowY = y * 0.004 + time * 0.02;
          const noise = Math.sin(flowX) * Math.cos(flowY) + Math.sin(flowX * 1.3 + flowY * 1.3) * 0.3;
          let probability = 0.08 + noise * 0.06;
          // Fade towards bottom
          const normalizedY = y / canvas.height;
          if (normalizedY > 0.7) probability *= 1 - (normalizedY - 0.7) / 0.3;
          if (Math.random() < probability * 0.5) {
            const colorNoise = Math.sin(flowX * 0.2 + flowY * 0.2 + time * 0.01);
            let r, g, b;
            if (colorNoise > 0.3) { r = 100; g = 220; b = 255; }
            else if (colorNoise > -0.3) { r = 140; g = 140; b = 255; }
            else { r = 180; g = 120; b = 255; }
            const alpha = 0.2 + Math.random() * 0.15;
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.3)`;
            const size = gridSize * (0.3 + Math.random() * 0.3);
            ctx.fillRect(x, y, size, size);
            ctx.shadowBlur = 0;
          }
        }
      }
      frameId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
    };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full opacity-50 pointer-events-none z-[1]" />;
};

const ExpandedCyberGrid = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      {/* Animated Grid */}
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)]">
        <div className="absolute inset-[-100%] w-[300%] h-[300%] animate-grid-move-expanded opacity-20"
             style={{
               backgroundImage: `
                 linear-gradient(to right, rgba(255, 46, 99, 0.4) 1px, transparent 1px),
                 linear-gradient(to bottom, rgba(255, 46, 99, 0.4) 1px, transparent 1px)
               `,
               backgroundSize: '80px 80px',
               transform: 'perspective(600px) rotateX(55deg) translateY(-100px) translateZ(-300px)',
             }}
        />
      </div>
      {/* Scan lines */}
      <div className="absolute inset-0 opacity-5"
           style={{
             backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,46,99,0.1) 2px, rgba(255,46,99,0.1) 4px)',
           }}
      />
      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#FF2E63] rounded-full animate-ping opacity-60" />
      <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse" />
      <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-[#FF2E63] rounded-full animate-ping opacity-40" style={{ animationDelay: '1s' }} />
      
      <style>{`
        @keyframes grid-move-expanded {
          0% { transform: perspective(600px) rotateX(55deg) translateY(0) translateZ(-300px); }
          100% { transform: perspective(600px) rotateX(55deg) translateY(80px) translateZ(-300px); }
        }
        .animate-grid-move-expanded {
          animation: grid-move-expanded 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

// --- Background Components ---

const FluidWaves = () => {
  // Fluid Canvas Wave Animation for the Left Pane
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frameId;
    let time = 0;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;
      const lines = 3;
      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = `rgba(26, 35, 126, ${0.1 + i * 0.05})`; 
        for (let x = 0; x < canvas.width; x += 5) {
          const y = Math.sin(x * 0.005 + time + i) * 50 
                  + Math.sin(x * 0.01 + time * 0.5) * 20 
                  + canvas.height * (0.6 + i * 0.1); 
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      frameId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
    };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50 pointer-events-none" />;
};

const EmbeddingSpace = () => {
  // Clear Embedding Space - Sparse floating particles that let background show through
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frameId;
    let time = 0;
    
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    
    // Sparse grid for clear visibility
    const gridSize = 20; 
    
    const draw = () => {
      time += 0.015; // Very slow, ambient movement
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Loop through grid
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          
          const normalizedX = x / canvas.width;
          const normalizedY = y / canvas.height;
          
          // FLOW: Very slow drift
          const flowX = x * 0.005 - time * 0.05;
          const flowY = y * 0.005 + time * 0.02;
          
          const noise1 = Math.sin(flowX) * Math.cos(flowY);
          const noise2 = Math.sin(flowX * 1.2 + flowY * 1.2) * 0.3;
          const totalNoise = noise1 + noise2;
          
          // PROBABILITY MAP - Very sparse, concentrated in middle-bottom
          let probability = 0;
          
          // Concentrate particles in lower half (where text isn't)
          if (normalizedY > 0.4) {
            probability = 0.15 + totalNoise * 0.1;
          } else {
            probability = 0.05; // Very sparse at top where text is
          }
          
          // Fade towards edges
          if (normalizedX > 0.9 || normalizedX < 0.1) probability *= 0.3;

          // Threshold check to draw pixel
          if (Math.random() < probability * 0.4) {
             
             // COLORS: Soft, glowing data points
             let r, g, b;
             
             const colorNoise = Math.sin(flowX * 0.2 + flowY * 0.2 + time * 0.01);
             
             if (colorNoise > 0.4) {
               // Soft Cyan
               r = 100; g = 220; b = 255;
             } else if (colorNoise > 0) {
               // Soft Blue
               r = 120; g = 150; b = 255;
             } else if (colorNoise > -0.4) {
               // Soft Purple
               r = 180; g = 130; b = 255;
             } else {
               // Soft Indigo
               r = 140; g = 140; b = 220;
             }
             
             // Very soft alpha
             let alpha = 0.25 + Math.random() * 0.2;
             
             ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
             
             // Small, soft particles
             const size = gridSize * (0.3 + Math.random() * 0.3);
             
             // Subtle glow
             ctx.shadowBlur = 12;
             ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.4)`;
             ctx.fillRect(x, y, size, size);
             ctx.shadowBlur = 0;
          }
        }
      }
      
      frameId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
       window.removeEventListener('resize', resize);
       cancelAnimationFrame(frameId);
    }
  }, []);
  
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50 pointer-events-none z-[1]" />;
};

const CyberGrid = () => {
  // Moving Grid Animation for Right Pane - NO solid background to allow transparency
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {/* Main Grid - More visible, no mask blocking it */}
      <div className="absolute inset-0">
        {/* Animated Grid Container - Higher opacity for visibility */}
        <div className="absolute inset-[-100%] w-[300%] h-[300%] animate-grid-move opacity-60"
             style={{
               backgroundImage: `
                 linear-gradient(to right, rgba(255, 46, 99, 0.5) 1px, transparent 1px),
                 linear-gradient(to bottom, rgba(255, 46, 99, 0.5) 1px, transparent 1px)
               `,
               backgroundSize: '50px 50px',
               transform: 'perspective(400px) rotateX(65deg) translateY(-50px) translateZ(-100px)',
             }}
        />
      </div>
      
      {/* Secondary grid layer for depth */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-[-50%] w-[200%] h-[200%] animate-grid-move-slow"
             style={{
               backgroundImage: `
                 linear-gradient(to right, rgba(0, 255, 255, 0.3) 1px, transparent 1px),
                 linear-gradient(to bottom, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
               `,
               backgroundSize: '80px 80px',
               transform: 'perspective(600px) rotateX(55deg) translateY(-100px) translateZ(-300px)',
             }}
        />
      </div>
      
      {/* Scanlines effect */}
      <div className="absolute inset-0 opacity-10"
           style={{
             backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,46,99,0.15) 2px, rgba(255,46,99,0.15) 4px)',
           }}
      />
      
      {/* Glowing Horizon Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#FF2E63]/20 to-transparent" />
      
      {/* Floating Particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#FF2E63] rounded-full animate-ping opacity-70" />
      <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
      <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-[#FF2E63] rounded-full animate-ping opacity-50" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-1/3 left-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      
      <style>{`
        @keyframes grid-move {
          0% { transform: perspective(400px) rotateX(65deg) translateY(0) translateZ(-100px); }
          100% { transform: perspective(400px) rotateX(65deg) translateY(50px) translateZ(-100px); }
        }
        @keyframes grid-move-slow {
          0% { transform: perspective(600px) rotateX(55deg) translateY(0) translateZ(-300px); }
          100% { transform: perspective(600px) rotateX(55deg) translateY(80px) translateZ(-300px); }
        }
        .animate-grid-move {
          animation: grid-move 1.5s linear infinite;
        }
        .animate-grid-move-slow {
          animation: grid-move-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
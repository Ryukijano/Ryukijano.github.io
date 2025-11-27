import React, { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, Database, Cpu, Globe, Terminal, BookOpen, Box, Zap, Grid, Code, Layers, Trophy, Microscope, Flame, ArrowLeft, Mail, FileText, Linkedin, Twitter, Cloud, Activity, Smile, Monitor, X, Play, Image as ImageIcon, Users, Tv, FileCode, Youtube, Music } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// --- Content Data ---

const DATA = {
  ryukijano: {
    id: 'ryukijano',
    title: "Ryukijano",
    subtitle: "Graphics & Systems Engineer",
    desc: "Building real-time 3D pipelines, GPU-accelerated simulations, and autonomous RL agents. From heritage preservation to physics solvers.",
    tags: ["CUDA", "C++", "Three.js", "Unreal Engine", "PyTorch"],
    socials: [
      { icon: Tv, link: "https://www.twitch.tv/ryukijano13", label: "Twitch" },
      { icon: Youtube, link: "https://www.youtube.com/channel/UCf1XZKm0A_LoZj6Y22fIfcg", label: "YouTube" },
      { icon: Music, link: "https://soundcloud.com/user-294342891/sets/running-wild-1", label: "SoundCloud" },
      { icon: Github, link: "https://github.com/Ryukijano", label: "GitHub" },
    ],
    projects: [
      { 
        title: "Reinforcement Learning Agents", 
        desc: "PPO & A2C implementations for CartPole, FrozenLake, VizDoom. Published on HuggingFace Hub.", 
        link: "https://huggingface.co/Ryukijano", 
        icon: Cpu,
        media: { type: 'image', src: '/assets/images/doom_ppo.gif' }
      },
      { 
        title: "B3tt3r: 3D Reconstruction", 
        desc: "Combining Mast3r and Spann3r models for improved 3D point cloud reconstruction with refined accuracy.", 
        link: "https://github.com/Ryukijano/B3tt3r", 
        icon: Box,
        media: { type: 'image', src: '/assets/images/Offrenda_Final_2000x1200__1_.jpg' }
      },
      { 
        title: "AWS DeepRacer Scholar", 
        desc: "Top 15% global. Trained autonomous racing agents using reward shaping and PPO.", 
        link: "#", 
        icon: Trophy,
        media: { type: 'image', src: '/assets/images/ant_bullet.gif' }
      },
      { 
        title: "Physics-Based Deep Learning", 
        desc: "Differentiable fluid simulations, Burgers' equation solvers, and Gaussian splatting using Φ-Flow.", 
        link: "https://github.com/Ryukijano/Physics-Based-DeepLearning", 
        icon: Flame,
        media: { type: 'image', src: '/assets/images/command-line__2_.jpg' }
      },
    ]
  },
  ai: {
    id: 'ai',
    title: "Gyanateet",
    subtitle: "AI Researcher & Computer Scientist",
    desc: "MSc CS & AI @ Leeds. Focused on self-supervised learning, vision transformers, and medical image analysis.",
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
        desc: "Self-supervised DINO & V-JEPA for surgical workflow analysis at NHS/LTHT. 90% accuracy with minimal annotations for skill assessment & surgeon training.", 
        link: "#", 
        icon: Microscope,
        media: { type: 'image', src: '/assets/images/computer_vision.jpg' }
      },
      { 
        title: "MSc Thesis: Surgical Video Prediction", 
        desc: "VAE-Transformer hybrid achieving +2.36 dB PSNR. FP16 mixed-precision, 22 FPS inference.", 
        link: "#", 
        icon: Layers,
        media: { type: 'image', src: '/assets/images/neural-network-architecture.png' }
      },
      { 
        title: "Gemma-Le: VLA Policy", 
        desc: "Vision-Language-Action model for robotics. SigLIP + Gemma 3 + ScaleDP diffusion head for imitation learning.", 
        link: "https://huggingface.co/Ryukijano/gemma-groot", 
        icon: Cpu,
        media: { type: 'image', src: '/assets/images/gemma-groot-demo.png' }
      },
      { 
        title: "JAX Diffusers Sprint", 
        desc: "8th Place Global 2023. ControlNet fine-tuning on TPU v4 for anime-realism style transfer.", 
        link: "#", 
        icon: Database,
        media: { type: 'image', src: '/assets/images/diffusion.png' }
      },
      {
        title: "Pothole Detection (arXiv)",
        desc: "YOLOv7 + ESRGAN super-resolution. 94.7% precision, 82.6% recall without LIDAR.",
        link: "https://arxiv.org/abs/2401.08588",
        icon: Globe,
        media: { type: 'image', src: '/assets/images/Feature_Community__1_.jpg' }
      },
      {
        title: "Hopfield Networks & TSP",
        desc: "Comparative study of HNN and Simulated Annealing for combinatorial optimization.",
        link: "https://arxiv.org/abs/2202.13746",
        icon: Terminal,
        media: { type: 'image', src: '/assets/images/reinforcement-learning-diagram.png' }
      },
    ]
  },
  ryoushi: {
    id: 'ryoushi',
    title: "Ryoushi",
    subtitle: "Quantum Algorithm Researcher",
    desc: "Hybrid quantum-classical algorithms. Hackathon winner. Co-founder of Quantum Buddies research collective.",
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
        desc: "Research collective. Quantum Attention mechanisms, QCTM, Quantum Diffusion, QEC with Stim.",
        link: "https://quantum-buddies.github.io",
        icon: Users,
        isBanner: true,
        bannerSrc: "/assets/images/nightcity.jpg"
      },
      { 
        title: "Bradford Hackathon 2025", 
        desc: "Grand Prix & 1st Place Medicine. QD-HMC + Quixer for genomic sequence prediction (~90% vs ~80% classical).", 
        link: "#", 
        icon: Trophy,
        media: { type: 'image', src: '/assets/images/CULTURE_III__2_.jpg' }
      },
      { 
        title: "Yale Quantum Hackathon 2025", 
        desc: "1st Place. Generalized Shor's Algorithm for Quantum Rings.", 
        link: "#", 
        icon: Trophy,
        media: { type: 'image', src: '/assets/images/Feature_Github_Hero_Accessibility.jpg' }
      },
      { 
        title: "NQCC x Rolls-Royce", 
        desc: "VQE+SQD simulation of Hydrogen adsorption on Nickel surfaces. Circuit depth optimization for NISQ.", 
        link: "#", 
        icon: Zap,
        media: { type: 'image', src: '/assets/images/kanagawa_latentspace_autoencoder.jpg' }
      },
      { 
        title: "City of London Finalist", 
        desc: "QCBM for financial time-series. Quantum Walk MCMC vs classical MCMC comparison.", 
        link: "#", 
        icon: Grid,
        media: { type: 'image', src: '/assets/images/quantum-variational-demo.png' }
      },
    ]
  }
};

const Portfolio = () => {
  const [activePane, setActivePane] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showSoundCloud, setShowSoundCloud] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    checkMobile();
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden font-sans selection:bg-white selection:text-black">
      
      {/* Hero Background - Full visibility at top, fading into panes */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Main hero image - high visibility */}
        <img 
          src="/assets/images/1500x500.jpg" 
          alt="Kanagawa Wave to Digital Transformation" 
          className="w-full h-[35vh] md:h-[40vh] object-cover object-center"
        />
        {/* Smooth fade to black at bottom of image */}
        <div 
          className="absolute top-0 left-0 right-0 h-[35vh] md:h-[40vh]"
          style={{
            background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.7) 85%, black 100%)',
          }}
        />
      </div>

      {/* Three Pane Layout - Positioned to overlap with hero */}
      <div className="relative z-10 flex flex-col md:flex-row h-full overflow-hidden">
      
      {/* --- LEFT PANE: RYUKIJANO --- */}
      <Pane 
        id="left"
        activePane={activePane}
        setActivePane={setActivePane}
        baseColor="bg-[#E6E1D3]" 
        textColor="text-[#1a237e]" 
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
        
        {/* SoundCloud Widget (Bottom Left Absolute) */}
        <AnimatePresence>
          {showSoundCloud && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-4 left-4 z-30 w-[90%] md:w-[300px] pointer-events-auto"
            >
              <div className="bg-white/80 backdrop-blur-md rounded-xl overflow-hidden shadow-lg border border-[#1a237e]/10">
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
                  className="absolute top-1 right-1 bg-white rounded-full p-1 text-[#1a237e] hover:bg-[#1a237e] hover:text-white transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Pane>

      {/* --- CENTER PANE: GYANATEET --- */}
      <Pane 
        id="center"
        activePane={activePane}
        setActivePane={setActivePane}
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
    </div>
  );
};

const Pane = ({ 
  id, activePane, setActivePane, children, 
  baseColor, textColor, titleLines, subtitle, desc, tags, projects, socials,
  isMobile, fontTitle, fontBody 
}) => {
  
  let widthClass = "md:w-1/3";
  if (!isMobile) {
    if (activePane === id) widthClass = "md:w-[60%]";
    else if (activePane !== null) widthClass = "md:w-[20%]";
  }

  const isActive = activePane === id || isMobile;

  // Gradient backgrounds - transparent at top, solid at bottom
  const gradientStyles = {
    left: 'linear-gradient(to bottom, transparent 0%, rgba(230,225,211,0.4) 15%, rgba(230,225,211,0.85) 35%, rgba(230,225,211,1) 50%)',
    center: 'linear-gradient(to bottom, transparent 0%, rgba(26,26,26,0.5) 15%, rgba(26,26,26,0.9) 35%, rgba(26,26,26,1) 50%)', 
    right: 'linear-gradient(to bottom, transparent 0%, rgba(5,5,5,0.4) 15%, rgba(5,5,5,0.85) 35%, rgba(5,5,5,1) 50%)',
  };

  return (
    <div 
      onMouseEnter={() => !isMobile && setActivePane(id)}
      onMouseLeave={() => !isMobile && setActivePane(null)}
      onClick={() => isMobile && setActivePane(activePane === id ? null : id)}
      className={`
        relative h-min md:h-full min-h-[33vh] ${widthClass} ${textColor}
        transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
        overflow-hidden border-b md:border-b-0 md:border-r border-white/5
        group cursor-default flex flex-col
      `}
      style={{ background: gradientStyles[id] }}
    >
      {children}
      
      {/* Overlay to dim inactive panes */}
      <div className={`absolute inset-0 bg-black/50 pointer-events-none transition-opacity duration-500 ${activePane && activePane !== id && !isMobile ? 'opacity-100' : 'opacity-0'}`} />

      <div className="relative z-10 p-6 md:p-10 h-full flex flex-col justify-between pointer-events-none overflow-y-auto no-scrollbar">
        
        {/* Header Section */}
        <div className="space-y-4 pointer-events-auto mt-8 md:mt-0">
           {/* Tags - with solid backgrounds for readability */}
           <div className="flex flex-wrap gap-2 mb-4">
             {tags.map(tag => (
               <span key={tag} className={`
                 px-3 py-1.5 rounded text-[11px] font-bold tracking-wider uppercase backdrop-blur-md
                 ${id === 'left' ? 'bg-[#1a237e]/90 text-white border border-[#1a237e]' : ''}
                 ${id === 'center' ? 'bg-indigo-600/90 text-white border border-indigo-500' : ''}
                 ${id === 'right' ? 'bg-[#FF2E63]/90 text-white border border-[#FF2E63] shadow-[0_0_10px_rgba(255,46,99,0.5)]' : ''}
               `}>
                 {tag}
               </span>
             ))}
          </div>

          {/* Big Vertical Title */}
          <h2 className={`text-6xl md:text-8xl ${fontTitle} font-bold tracking-tighter leading-[0.9] mb-4`}>
            {titleLines.map((line, i) => (
              <span key={i} className="block" style={baseColor.includes('050505') ? { textShadow: '3px 3px 0px #FF2E63' } : {}}>
                {line}
              </span>
            ))}
          </h2>
          
          {/* Subtitle & Desc */}
          <div className={`transition-all duration-500 ${isActive ? 'opacity-100 max-h-[500px]' : 'opacity-80 md:max-h-0 overflow-hidden'}`}>
             <p className={`text-lg md:text-xl ${fontBody} italic opacity-80 max-w-sm mb-4`}>
              {subtitle}
            </p>
            <p className={`text-base md:text-lg ${fontBody} opacity-70 max-w-md leading-relaxed`}>
              {desc}
            </p>

            {/* Socials */}
            {socials && (
              <div className="flex gap-4 mt-6">
                {socials.map((social, idx) => (
                  <a 
                    key={idx} 
                    href={social.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    title={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Projects Section (Shows on hover/active) */}
        <div className={`
          mt-8 space-y-6 transition-all duration-700 pointer-events-auto
          ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 md:hidden'}
        `}>
           <div className={`h-px w-full mb-8 ${baseColor.includes('E6E1D3') ? 'bg-[#1a237e]/20' : 'bg-white/20'}`}></div>
           <ProjectList items={projects} theme={id} />
           <div className="h-24 md:h-0"></div> {/* Spacer for mobile */}
        </div>

      </div>
    </div>
  );
};

const ProjectList = ({ items, theme }) => {
  return (
    <div className="grid gap-4">
      {items.map((project, idx) => (
        project.isBanner ? (
           <a 
            key={idx} 
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative w-full h-32 md:h-40 rounded-lg overflow-hidden group border border-[#FF2E63]/30 hover:border-[#FF2E63]/60 transition-all hover:shadow-[0_0_30px_rgba(255,46,99,0.3)]"
          >
            <img 
              src={project.bannerSrc || "/assets/images/nightcity.jpg"} 
              alt="Banner" 
              className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/60 transition-colors" />
            <div className="absolute bottom-4 left-4 text-white">
               <h4 className="font-bold text-xl flex items-center gap-2" style={{ textShadow: '0 0 10px rgba(255,46,99,0.8)' }}>
                {project.title} <ExternalLink size={14} />
               </h4>
               <p className="text-xs font-mono text-[#FF2E63]">{project.desc}</p>
            </div>
          </a>
        ) : (
          <div 
            key={idx} 
            className={`
              group flex flex-col md:flex-row gap-4 p-4 rounded-lg transition-all duration-300 cursor-pointer relative overflow-hidden
              ${theme === 'left' ? 'hover:bg-[#1a237e]/5 border border-transparent hover:border-[#1a237e]/20' : ''}
              ${theme === 'center' ? 'hover:bg-white/10 border border-transparent hover:border-white/20' : ''}
              ${theme === 'right' ? 'hover:bg-[#FF2E63]/10 border border-transparent hover:border-[#FF2E63]/50' : ''}
            `}
          >
             {/* Hover Media Preview (Background) */}
             {project.media && (
               <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                  <img src={project.media.src} alt="preview" className="w-full h-full object-cover opacity-10" />
               </div>
             )}

            <div className={`mt-1 z-10 ${theme === 'right' ? 'text-[#FF2E63]' : 'opacity-70'}`}>
              <project.icon size={20} />
            </div>
            <div className="z-10 flex-1">
              <h4 className="font-bold text-lg flex items-center gap-2">
                <a href={project.link} target={project.link !== '#' ? '_blank' : '_self'} rel="noreferrer" className="hover:underline decoration-1 underline-offset-4">
                  {project.title}
                </a>
                {project.link !== '#' && <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
              </h4>
              <p className={`text-sm leading-relaxed ${theme === 'right' ? 'text-white/70' : 'opacity-70'}`}>
                {project.desc}
              </p>
            </div>
            
            {/* Thumbnail for Desktop */}
            {project.media && (
              <div className="hidden md:block w-24 h-16 rounded overflow-hidden border border-white/10 z-10">
                <img src={project.media.src} alt="thumb" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
              </div>
            )}
          </div>
        )
      ))}
    </div>
  );
}

// --- Background Components ---

const FluidWaves = () => {
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
      time += 0.003;
      
      // More organic, flowing waves
      const lines = 6;
      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1 + i * 0.3;
        // Gradient from indigo to a warmer tone
        const alpha = 0.03 + i * 0.02;
        ctx.strokeStyle = `rgba(26, 35, 126, ${alpha})`; 
        
        for (let x = 0; x < canvas.width; x += 8) {
          const baseY = canvas.height * (0.4 + i * 0.08);
          const y = Math.sin(x * 0.002 + time + i * 0.5) * (40 + i * 10) 
                  + Math.sin(x * 0.005 + time * 0.7 + i) * (20 + i * 5)
                  + Math.cos(x * 0.003 + time * 0.3) * 15
                  + baseY;
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
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-100 pointer-events-none z-[1]" />;
};

const EmbeddingSpace = () => {
  // Embedding Space / Latent Space visualization
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frameId;
    
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    
    // Particles representing data points in embedding space
    // More particles, smaller, simulating high-dimensional projection
    const numParticles = 150;
    const particles = [];
    const clusters = [
      { x: 0.3, y: 0.4, color: 'rgba(99, 102, 241, 0.8)' }, // Indigo
      { x: 0.7, y: 0.3, color: 'rgba(236, 72, 153, 0.8)' }, // Pink
      { x: 0.5, y: 0.7, color: 'rgba(34, 211, 238, 0.8)' }, // Cyan
      { x: 0.2, y: 0.8, color: 'rgba(167, 139, 250, 0.8)' }, // Purple
      { x: 0.8, y: 0.6, color: 'rgba(52, 211, 153, 0.8)' }, // Emerald
    ];
    
    for (let i = 0; i < numParticles; i++) {
      const cluster = clusters[Math.floor(Math.random() * clusters.length)];
      // Spread particles out more for a "space" feel
      particles.push({
        x: cluster.x * canvas.width + (Math.random() - 0.5) * 300,
        y: cluster.y * canvas.height + (Math.random() - 0.5) * 300,
        z: Math.random() * 2, // Simulated depth
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: 1.5 + Math.random() * 2,
        color: cluster.color,
        cluster: cluster,
      });
    }
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Sort by Z for pseudo-depth
      particles.sort((a, b) => a.z - b.z);

      // Draw connections (simulating manifold structure)
      ctx.lineWidth = 0.3;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        // Only connect to a few neighbors to avoid clutter
        let connections = 0;
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 60 && connections < 3) {
            const alpha = (1 - dist / 60) * 0.3;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            connections++;
          }
        }
      }
      
      // Update and draw particles
      for (const p of particles) {
        // Drift
        p.x += p.vx;
        p.y += p.vy;
        
        // Wrap around edges softly
        if (p.x < -50) p.x = canvas.width + 50;
        if (p.x > canvas.width + 50) p.x = -50;
        if (p.y < -50) p.y = canvas.height + 50;
        if (p.y > canvas.height + 50) p.y = -50;
        
        // Draw particle
        // Size affected by Z
        const scale = 0.5 + p.z * 0.5;
        const opacity = 0.3 + p.z * 0.4;
        
        ctx.fillStyle = p.color.replace('0.8)', `${opacity})`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * scale, 0, Math.PI * 2);
        ctx.fill();
        
        // Subtle glow
        if (p.z > 1.5) {
            const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4 * scale);
            glow.addColorStop(0, p.color.replace('0.8)', '0.2)'));
            glow.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius * 4 * scale, 0, Math.PI * 2);
            ctx.fill();
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
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80 pointer-events-none z-[1]" />;
};

const CyberGrid = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {/* Perspective grid */}
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_90%_90%_at_50%_60%,#000_40%,transparent_100%)]">
        <div className="absolute inset-[-100%] w-[300%] h-[300%] animate-grid-move opacity-25"
             style={{
               backgroundImage: `
                 linear-gradient(to right, rgba(255, 46, 99, 0.4) 1px, transparent 1px),
                 linear-gradient(to bottom, rgba(255, 46, 99, 0.4) 1px, transparent 1px)
               `,
               backgroundSize: '50px 50px',
               transform: 'perspective(400px) rotateX(65deg) translateY(-50px) translateZ(-150px)',
             }}
        />
      </div>
      
      {/* Scanlines */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,46,99,0.1) 2px, rgba(255,46,99,0.1) 4px)',
        }}
      />
      
      {/* Glowing horizon */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#FF2E63]/15 via-[#FF2E63]/5 to-transparent" />
      
      {/* Floating particles */}
      <div className="absolute top-[20%] left-[20%] w-1.5 h-1.5 bg-[#FF2E63] rounded-full animate-ping opacity-60" />
      <div className="absolute top-[40%] right-[25%] w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-50" />
      <div className="absolute top-[60%] left-[40%] w-2 h-2 bg-[#FF2E63]/50 rounded-full animate-bounce opacity-40" style={{ animationDuration: '3s' }} />
      <div className="absolute top-[30%] right-[40%] w-1 h-1 bg-purple-500 rounded-full animate-ping opacity-30" style={{ animationDelay: '1s' }} />
      
      {/* Glitch line effect */}
      <div className="absolute left-0 right-0 h-[2px] bg-[#FF2E63]/30 animate-glitch-line" style={{ top: '30%' }} />
      
      <style>{`
        @keyframes grid-move {
          0% { transform: perspective(400px) rotateX(65deg) translateY(0) translateZ(-150px); }
          100% { transform: perspective(400px) rotateX(65deg) translateY(50px) translateZ(-150px); }
        }
        .animate-grid-move { animation: grid-move 3s linear infinite; }
        
        @keyframes glitch-line {
          0%, 100% { opacity: 0; transform: translateY(0); }
          10% { opacity: 1; }
          20% { opacity: 0; transform: translateY(100px); }
          30% { opacity: 0.5; transform: translateY(200px); }
          40% { opacity: 0; }
        }
        .animate-glitch-line { animation: glitch-line 8s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Portfolio;

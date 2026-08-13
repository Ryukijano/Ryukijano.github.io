import React, { useState, useEffect, useRef } from 'react';
import { Activity, X } from 'lucide-react';
import { DATA, findProject, projectSlug } from './data/portfolio';
import { resolveRoute, navigate } from './lib/navigation';
import { usePath } from './lib/usePath';
import Link from './lib/Link';
import SiteNav from './components/SiteNav';
import AcademicPage from './pages/AcademicPage';
import WorkPage from './pages/WorkPage';
import PersonaPage from './pages/PersonaPage';
import CaseStudyPage from './pages/CaseStudyPage';

function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#11110e] px-6 text-[#E6E1D3]">
      <p className="max-w-md text-center text-[17px]">This path isn't on the site.</p>
      <nav className="mt-6 flex items-center gap-3 font-serif text-[15px]">
        <Link href="/" className="underline decoration-[#E6E1D3]/30 underline-offset-4 hover:decoration-[#E6E1D3]">
          Personal
        </Link>
        <span aria-hidden="true">·</span>
        <Link href="/work" className="underline decoration-[#E6E1D3]/30 underline-offset-4 hover:decoration-[#E6E1D3]">
          Work
        </Link>
        <span aria-hidden="true">·</span>
        <Link href="/academic" className="underline decoration-[#E6E1D3]/30 underline-offset-4 hover:decoration-[#E6E1D3]">
          Academic
        </Link>
      </nav>
    </main>
  );
}

const Portfolio = () => {
  const path = usePath();
  const route = resolveRoute(path);

  switch (route.kind) {
    case 'academic':
      return <AcademicPage />;
    case 'work':
      return <WorkPage />;
    case 'case-study': {
      const project = findProject(route.slug);
      return <CaseStudyPage project={project} />;
    }
    case 'persona':
      return DATA[route.persona] ? <PersonaPage data={DATA[route.persona]} /> : <NotFoundPage />;
    case 'home':
      return <PersonalIndex />;
    case 'unknown':
      return <NotFoundPage />;
    default: {
      const _exhaustive = route.kind;
      return <NotFoundPage />;
    }
  }
};

const PersonalIndex = () => {
  const [activePane, setActivePane] = useState(null); // 'left', 'center', 'right', or null
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 900);
    };
    window.addEventListener('resize', checkDevice);
    checkDevice();
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return (
    <div className="relative flex min-h-screen min-[900px]:h-screen w-full flex-col overflow-x-hidden bg-black font-sans selection:bg-white selection:text-black">
      <SiteNav variant="ink" />

      {/* Hero sits behind the three rooms on wide layouts only. */}
      <div className="hero-effects pointer-events-none absolute inset-x-0 top-12 z-0">
        <img 
          src="/assets/images/1500x500.jpg" 
          alt="" 
          className="h-[40vh] w-full object-cover object-top opacity-60 min-[900px]:h-[50vh]"
          style={{
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-0 w-full flex-1 flex-col min-[900px]:flex-row">
      {/* --- LEFT PANE: RYUKIJANO --- */}
      <Pane 
        id="left"
        activePane={activePane}
        setActivePane={setActivePane}
        onExpand={() => navigate('/persona/ryukijano')}
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
        onExpand={() => navigate('/persona/gyanateet')}
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
        onExpand={() => navigate('/persona/ryoushi')}
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

// --- Reusable Pane Component ---
const Pane = ({ 
  id, activePane, setActivePane, onExpand, children, 
  baseColor: _baseColor, textColor, accentColor: _accentColor, 
  titleLines, subtitle, desc, tags, projects, socials, 
  isMobile, fontTitle, fontBody 
}) => {
  let widthClass = "min-[900px]:w-1/3";
  if (!isMobile && typeof window !== 'undefined' && window.innerWidth >= 900) {
    if (activePane === id) widthClass = "min-[900px]:w-[60%]";
    else if (activePane !== null) widthClass = "min-[900px]:w-[20%]";
  }
  
  let paneWash = 'pane-ryukijano';
  if (id === 'center') paneWash = 'pane-gyanateet';
  if (id === 'right') paneWash = 'pane-ryoushi';

  const [showSoundCloud, setShowSoundCloud] = useState(true);
  
  // On mobile, clicking the pane toggles active state (for touch devices)
  const handlePaneClick = (e) => {
    // Don't toggle if clicking a link or button
    if (e.target.closest('a') || e.target.closest('button')) return;
    if (isMobile) {
      setActivePane(activePane === id ? null : id);
    }
  };

  // Check if content should be visible (always on mobile, or when active on desktop)
  const isContentVisible = isMobile || activePane === id;

  return (
    <div 
      onMouseEnter={() => !isMobile && setActivePane(id)}
      onMouseLeave={() => !isMobile && setActivePane(null)}
      onClick={handlePaneClick}
      className={`
        relative min-h-[50vh] sm:min-h-[40vh] min-[900px]:min-h-0 min-[900px]:h-full ${widthClass} ${paneWash} ${textColor}
        transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
        overflow-y-auto overflow-x-hidden border-b min-[900px]:border-b-0 min-[900px]:border-r border-white/5
        group cursor-default
      `}
    >
      {children}
      
      {/* Soundcloud Widget (Ryukijano only) - Always visible, overlayed on top */}
      {id === 'left' && (
        <div className={`absolute bottom-4 left-4 z-[100] w-[calc(100%-2rem)] sm:w-[280px] lg:w-[300px] pointer-events-auto transition-all duration-300 ${isMobile ? 'hidden sm:block' : ''}`}
             style={{ opacity: showSoundCloud ? 1 : 0, pointerEvents: showSoundCloud ? 'auto' : 'none' }}>
           <div className="relative overflow-hidden border border-[#1a237e]/20 bg-white">
             <iframe 
               width="100%" 
               height="80" 
               scrolling="no" 
               frameBorder="no" 
               allow="autoplay" 
               src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/user-294342891/know-me-project-1&color=%231a237e&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
             ></iframe>
             <button 
               onClick={() => setShowSoundCloud(false)}
               className="absolute top-1 right-1 bg-white rounded-full p-1 text-[#1a237e] hover:bg-[#1a237e] hover:text-white transition-colors z-[101] shadow-sm"
             >
               <X size={12} />
             </button>
           </div>
        </div>
      )}
      {id === 'left' && !showSoundCloud && (
        <button 
          onClick={() => setShowSoundCloud(true)}
          className="absolute bottom-4 left-4 z-[100] bg-white/90 p-2.5 rounded-full text-[#1a237e] hidden sm:block border border-[#1a237e]/20"
        >
          <Activity size={20} />
        </button>
      )}

      <div className={`relative z-10 flex h-full flex-col justify-between p-4 pointer-events-none sm:p-6 min-[900px]:p-12 ${id === 'left' ? 'pb-28' : ''}`}>
        {/* Content wrapper - no backdrop, let background show through */}
        <div className="space-y-3 sm:space-y-4 pointer-events-auto">
          
          {/* Tags - always visible but smaller on mobile */}
          <p className={`text-[8px] sm:text-[10px] font-mono mb-2 transition-opacity duration-500 ${activePane && activePane !== id && !isMobile ? 'opacity-0' : 'opacity-70'}`}>
            {tags.slice(0, isMobile ? 3 : tags.length).join(', ')}
          </p>

          {/* Title - responsive sizes */}
          <h2 className={`text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter leading-none ${fontTitle}
            ${id === 'center' ? 'text-white' : ''}
            ${id === 'right' ? 'uppercase' : ''}
          `}
          style={id === 'right' ? { textShadow: '2px 2px 0px #FF2E63' } : {}}
          >
            {titleLines.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h2>

          {/* Subtitle - always visible */}
          <p className={`text-xs sm:text-sm min-[900px]:text-base font-medium opacity-70 ${fontBody}`}>
            {subtitle}
          </p>
          
          {/* Description & Social Links - only on hover/mobile */}
          {isContentVisible && (
            <div className="animate-fadeIn mt-2 sm:mt-3">
              <p className={`text-sm sm:text-base lg:text-lg opacity-70 max-w-md leading-relaxed ${fontBody} ${id === 'left' ? 'italic' : ''} line-clamp-3 sm:line-clamp-none`}>
                {desc}
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-6">
                {socials.map((social, idx) => (
                  <a 
                    key={idx} 
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      ${id === 'left' ? 'text-[#1a237e] hover:text-[#1a237e]/70' : ''}
                      ${id === 'center' ? 'text-white hover:text-indigo-400' : ''}
                      ${id === 'right' ? 'text-[#FF2E63] hover:text-white' : ''}
                    `}
                    title={social.label}
                  >
                    <social.icon size={isMobile ? 20 : 24} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Project List - Only visible on hover/mobile */}
        {isContentVisible && (
          <div className={`space-y-4 sm:space-y-6 transition-all duration-500 pointer-events-auto mt-4 sm:mt-6 animate-fadeIn`}>
             <div className={`h-px w-full mb-2 sm:mb-4 
               ${id === 'left' ? 'bg-[#1a237e]/20' : ''}
               ${id === 'center' ? 'bg-white/20' : ''}
               ${id === 'right' ? 'bg-[#FF2E63]/30' : ''}
             `}></div>
             <ProjectList
               items={[...projects]
                 .sort((a, b) => Number(b.featured === true) - Number(a.featured === true))
                 .slice(0, isMobile ? 2 : 3)}
             />
             
             <button
               type="button"
               onClick={onExpand}
               className={`mt-6 inline-block font-serif text-[15px] underline underline-offset-4 ${
                 id === 'left' ? 'text-[#1a237e] decoration-[#1a237e]/30 hover:decoration-[#1a237e]' : ''
               } ${
                 id === 'center' ? 'text-white/80 decoration-white/30 hover:decoration-white' : ''
               } ${
                 id === 'right' ? 'text-[#FF2E63] decoration-[#FF2E63]/40 hover:decoration-[#FF2E63]' : ''
               }`}
             >
               All notes
             </button>
          </div>
        )}
      </div>
      
      {/* Overlay to dim inactive panes - only on desktop */}
      <div className={`absolute inset-0 bg-black/40 pointer-events-none transition-opacity duration-500 hidden lg:block ${activePane && activePane !== id ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  );
};

const ProjectList = ({ items }) => {
  return (
    <div className="grid gap-2 sm:gap-4 pb-4 sm:pb-0">
      {items.map((project, idx) => (
        <a 
          key={idx} 
          href={`/work/${projectSlug(project.title)}`}
          onClick={(event) => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
              return;
            }
            event.preventDefault();
            navigate(`/work/${projectSlug(project.title)}`);
          }}
          className="block"
        >
          <h4 className="font-bold text-sm sm:text-lg truncate">{project.title}</h4>
          <p className="text-xs sm:text-sm leading-relaxed line-clamp-1 opacity-70">
            {project.desc}
          </p>
        </a>
      ))}
    </div>
  );
}

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
             
             if (colorNoise > 0.2) {
               r = 120; g = 150; b = 255;
             } else if (colorNoise > -0.4) {
               r = 180; g = 130; b = 255;
             } else {
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
      
      {/* Scanlines effect */}
      <div className="absolute inset-0 opacity-10"
           style={{
             backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,46,99,0.15) 2px, rgba(255,46,99,0.15) 4px)',
           }}
      />
      
      {/* Glowing Horizon Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#FF2E63]/20 to-transparent" />
      
      <style>{`
        @keyframes grid-move {
          0% { transform: perspective(400px) rotateX(65deg) translateY(0) translateZ(-100px); }
          100% { transform: perspective(400px) rotateX(65deg) translateY(50px) translateZ(-100px); }
        }
        .animate-grid-move {
          animation: grid-move 1.5s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;

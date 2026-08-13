import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Activity, X, Download, ArrowLeft, ChevronRight } from 'lucide-react';
import { DATA, CV_URL, findProject, projectSlug } from './data/portfolio';
import { resolveRoute, navigate } from './lib/navigation';
import { usePath } from './lib/usePath';
import SiteNav from './components/SiteNav';
import AcademicPage from './pages/AcademicPage';
import WorkPage from './pages/WorkPage';
import PersonaPage from './pages/PersonaPage';
import CaseStudyPage from './pages/CaseStudyPage';

function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-white">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-white/40">404</p>
      <h1 className="mt-4 text-5xl font-extrabold tracking-tight">Lost the thread.</h1>
      <p className="mt-4 max-w-md text-center text-white/60">That route is not a page yet. The personal index and the academic record are live.</p>
      <div className="mt-8 flex gap-3 font-mono text-xs uppercase tracking-widest">
        <button type="button" onClick={() => navigate('/')} className="rounded-full bg-white px-5 py-2.5 text-black">
          Personal
        </button>
        <button type="button" onClick={() => navigate('/academic')} className="rounded-full border border-white/30 px-5 py-2.5">
          Academic
        </button>
      </div>
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
      return project ? <CaseStudyPage project={project} /> : <NotFoundPage />;
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
    <div className="flex flex-col lg:flex-row min-h-screen lg:h-screen w-full bg-black overflow-x-hidden font-sans selection:bg-white selection:text-black">
      <SiteNav tone="dark" current="personal" />
      
      {/* Hero Background - Absolutely positioned behind everything */}
      <div className="hero-effects absolute inset-0 z-0 pointer-events-none">
        {/* Main hero image with mask */}
        <div className="absolute inset-0">
          <img 
            src="/assets/images/1500x500.jpg" 
            alt="Kanagawa Wave to Digital Transformation" 
            className="w-full h-[30vh] sm:h-[40vh] lg:h-[50vh] object-cover object-top opacity-60"
            style={{
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
            }}
          />
        </div>
        {/* Chromatic aberration / glitch layers */}
        <div className="absolute inset-0 mix-blend-screen opacity-30 hidden sm:block">
          <img 
            src="/assets/images/1500x500.jpg" 
            alt="" 
            className="w-full h-[30vh] sm:h-[40vh] lg:h-[50vh] object-cover object-top"
            style={{
              filter: 'hue-rotate(90deg) saturate(2)',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 80%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 80%)',
              transform: 'translateX(3px)',
            }}
          />
        </div>
        <div className="absolute inset-0 mix-blend-multiply opacity-20 hidden sm:block">
          <img 
            src="/assets/images/1500x500.jpg" 
            alt="" 
            className="w-full h-[30vh] sm:h-[40vh] lg:h-[50vh] object-cover object-top"
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
  );
};

// --- Reusable Pane Component ---
const Pane = ({ 
  id, activePane, setActivePane, onExpand, children, 
  baseColor: _baseColor, textColor, accentColor: _accentColor, 
  titleLines, subtitle, desc, tags, projects, socials, 
  isMobile, fontTitle, fontBody 
}) => {
  // On mobile/tablet, all panes are full width and stacked
  // On desktop (lg+), use the hover expansion behavior
  let widthClass = "lg:w-1/3";
  if (!isMobile && typeof window !== 'undefined' && window.innerWidth >= 1024) {
    if (activePane === id) widthClass = "lg:w-[60%]";
    else if (activePane !== null) widthClass = "lg:w-[20%]";
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
        relative min-h-[50vh] sm:min-h-[40vh] lg:min-h-0 lg:h-full ${widthClass} ${textColor}
        transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
        overflow-y-auto overflow-x-hidden border-b lg:border-b-0 lg:border-r border-white/5
        group cursor-default
      `}
      style={gradientStyle}
    >
      {children}
      
      {/* Soundcloud Widget (Ryukijano only) - Always visible, overlayed on top */}
      {id === 'left' && (
        <div className={`absolute bottom-4 left-4 z-[100] w-[calc(100%-2rem)] sm:w-[280px] lg:w-[300px] pointer-events-auto transition-all duration-300 ${isMobile ? 'hidden sm:block' : ''}`}
             style={{ opacity: showSoundCloud ? 1 : 0, pointerEvents: showSoundCloud ? 'auto' : 'none' }}>
           <div className="bg-white/90 backdrop-blur-xl rounded-xl overflow-hidden shadow-2xl border border-[#1a237e]/20 relative">
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
          className="absolute bottom-4 left-4 z-[100] bg-white/90 backdrop-blur-xl p-2.5 rounded-full text-[#1a237e] shadow-2xl hover:scale-110 transition-transform hidden sm:block border border-[#1a237e]/20"
        >
          <Activity size={20} />
        </button>
      )}

      <div className="relative z-10 p-4 sm:p-6 lg:p-12 h-full flex flex-col justify-between pointer-events-none">
        {/* Content wrapper - no backdrop, let background show through */}
        <div className="space-y-3 sm:space-y-4 pointer-events-auto">
          
          {/* Tags - always visible but smaller on mobile */}
          <div className={`flex flex-wrap gap-1.5 sm:gap-2 mb-2 transition-opacity duration-500 ${activePane && activePane !== id && !isMobile ? 'opacity-0' : 'opacity-100'}`}>
             {tags.slice(0, isMobile ? 3 : tags.length).map(tag => (
               <span key={tag} className={`
                 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-sm text-[8px] sm:text-[10px] font-mono tracking-widest uppercase 
                 ${id === 'left' ? 'bg-[#1a237e] text-white' : ''}
                 ${id === 'center' ? 'bg-indigo-600 text-white' : ''}
                 ${id === 'right' ? 'bg-[#FF2E63] text-white' : ''}
                 shadow-sm
               `}>
                 {tag}
               </span>
             ))}
             {isMobile && tags.length > 3 && (
               <span className={`px-1.5 py-0.5 rounded-sm text-[8px] font-mono opacity-60`}>
                 +{tags.length - 3}
               </span>
             )}
          </div>

          {/* Title - responsive sizes */}
          <h2 className={`text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter leading-none ${fontTitle}
            ${id === 'center' ? 'text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50' : ''}
            ${id === 'right' ? 'uppercase' : ''}
          `}
          style={id === 'right' ? { textShadow: '2px 2px 0px #FF2E63' } : {}}
          >
            {titleLines.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h2>

          {/* Subtitle - always visible */}
          <p className={`text-xs sm:text-sm lg:text-base font-medium uppercase tracking-wider opacity-70 ${fontBody}`}>
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
                      transition-transform hover:scale-110 active:scale-95
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
             <ProjectList items={projects.slice(0, isMobile ? 2 : 3)} theme={id === 'left' ? 'light' : id === 'center' ? 'dark' : 'neon'} isMobile={isMobile} />
             
             {/* View All Button */}
             <button
               onClick={onExpand}
               className={`
                 w-full py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg flex items-center justify-center gap-2 
                 transition-all duration-300 font-medium text-xs sm:text-sm
                 active:scale-[0.98]
                 ${id === 'left' ? 'bg-[#1a237e]/10 hover:bg-[#1a237e]/20 text-[#1a237e] border border-[#1a237e]/20' : ''}
                 ${id === 'center' ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20' : ''}
                 ${id === 'right' ? 'bg-[#FF2E63]/10 hover:bg-[#FF2E63]/20 text-[#FF2E63] border border-[#FF2E63]/30 hover:shadow-[0_0_15px_rgba(255,46,99,0.2)]' : ''}
               `}
             >
               View All Projects <ChevronRight size={isMobile ? 14 : 16} />
             </button>
          </div>
        )}
      </div>
      
      {/* Overlay to dim inactive panes - only on desktop */}
      <div className={`absolute inset-0 bg-black/40 pointer-events-none transition-opacity duration-500 hidden lg:block ${activePane && activePane !== id ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  );
};

const ProjectList = ({ items, theme, isMobile }) => {
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
          className={`
            group flex items-start gap-2 sm:gap-4 p-2.5 sm:p-4 rounded-lg transition-all duration-300 cursor-pointer relative overflow-hidden
            active:scale-[0.98]
            ${theme === 'light' ? 'hover:bg-[#1a237e]/5 active:bg-[#1a237e]/10 border border-transparent hover:border-[#1a237e]/20' : ''}
            ${theme === 'dark' ? 'hover:bg-white/10 active:bg-white/15 border border-transparent hover:border-white/20' : ''}
            ${theme === 'neon' ? 'hover:bg-[#FF2E63]/10 active:bg-[#FF2E63]/15 border border-transparent hover:border-[#FF2E63]/50 hover:shadow-[0_0_15px_rgba(255,46,99,0.2)]' : ''}
          `}
        >
          {/* Background Image Fade In on Hover - hidden on mobile */}
          {!isMobile && project.media && project.media.type === 'image' && (
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-cover bg-center z-0"
                 style={{ backgroundImage: `url(${project.media.src})` }} 
            />
          )}

          <div className={`mt-0.5 sm:mt-1 relative z-10 flex-shrink-0 ${theme === 'neon' ? 'text-[#FF2E63]' : 'opacity-70'}`}>
            <project.icon size={isMobile ? 16 : 20} />
          </div>
          <div className="relative z-10 min-w-0 flex-1">
            <h4 className="font-bold text-sm sm:text-lg flex items-center gap-2 truncate">
              <span className="truncate">{project.title}</span>
              <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 sm:w-3 sm:h-3" />
            </h4>
            <p className={`text-xs sm:text-sm leading-relaxed line-clamp-2 ${theme === 'neon' ? 'text-white/70' : 'opacity-70'}`}>
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <button 
            onClick={onClose}
            className={`flex items-center gap-1.5 sm:gap-2 hover:opacity-70 active:opacity-50 transition-opacity ${c.font}`}
          >
            <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
            <span className="font-medium text-sm sm:text-base">Back</span>
          </button>
          <a 
            href={CV_URL} 
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full ${c.accent} text-white text-xs sm:text-sm font-medium hover:opacity-90 active:opacity-80 transition-opacity shadow-lg`}
          >
            <Download size={14} className="sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Resume</span>
            <span className="xs:hidden">CV</span>
          </a>
        </div>
      </header>

      {/* === HERO SECTION === */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-12 lg:pb-16">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
          {data.tags.map(tag => (
            <span key={tag} className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs ${c.font} uppercase tracking-wider ${c.accent} text-white shadow-md`}>
              {tag}
            </span>
          ))}
        </div>
        
        {/* Title */}
        <h1 className={`text-4xl sm:text-6xl lg:text-9xl font-bold mb-2 sm:mb-4 ${c.font} tracking-tight
          ${data.id === 'ryoushi' ? 'uppercase' : ''}
          ${data.id === 'ai' ? 'text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50' : ''}
        `}
        style={data.id === 'ryoushi' ? { textShadow: '2px 2px 0px #FF2E63, 4px 4px 15px rgba(255,46,99,0.3)' } : {}}
        >
          {data.title}
        </h1>
        
        {/* Subtitle */}
        <p className={`text-lg sm:text-2xl lg:text-3xl opacity-70 mb-4 sm:mb-6 ${c.font} ${data.id === 'ryukijano' ? 'italic' : ''}`}>
          {data.subtitle}
        </p>
        
        {/* Description */}
        <p className={`text-sm sm:text-base lg:text-lg max-w-3xl opacity-80 leading-relaxed ${c.font}`}>
          {data.fullDesc || data.desc}
        </p>
        
        {/* Social Links */}
        <div className="flex flex-wrap gap-2 sm:gap-4 mt-6 sm:mt-8">
          {data.socials.map((social, idx) => (
            <a 
              key={idx} 
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-current/20 
                hover:bg-current/10 active:bg-current/20 transition-all duration-300 ${c.font}
                ${data.id === 'ryoushi' ? 'hover:shadow-[0_0_15px_rgba(255,46,99,0.3)] hover:border-[#FF2E63]/50' : ''}
              `}
            >
              <social.icon size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="text-xs sm:text-sm font-medium">{social.label}</span>
            </a>
          ))}
        </div>
      </section>

      {/* === PROJECTS GRID === */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 lg:mb-8 ${c.font} ${data.id === 'ryoushi' ? 'uppercase tracking-wider' : ''}`}>
          {data.id === 'ryoushi' ? '// Projects' : 'Projects & Achievements'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {data.projects.map((project, idx) => (
            <a
              key={idx}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                group relative overflow-hidden rounded-lg sm:rounded-xl border transition-all duration-300
                ${c.cardBg} backdrop-blur-md active:scale-[0.98]
                ${data.id === 'ryukijano' ? 'border-[#1a237e]/20 hover:border-[#1a237e]/40 hover:shadow-xl' : ''}
                ${data.id === 'ai' ? 'border-white/10 hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]' : ''}
                ${data.id === 'ryoushi' ? 'border-[#FF2E63]/20 hover:border-[#FF2E63]/60 hover:shadow-[0_0_30px_rgba(255,46,99,0.3)]' : ''}
              `}
            >
              {/* Project Image */}
              {(project.media || project.isBanner) && (
                <div className="h-32 sm:h-40 lg:h-48 overflow-hidden relative">
                  <img 
                    src={project.media?.src || project.bannerSrc} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
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
              <div className="p-3 sm:p-4 lg:p-6">
                <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className={`p-1.5 sm:p-2 rounded-lg ${c.accent}/20 flex-shrink-0`}>
                    <project.icon size={16} className="sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className={`text-base sm:text-lg lg:text-xl font-bold flex items-center gap-2 ${c.font}`}>
                      <span className="truncate">{project.title}</span>
                      <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 sm:w-3.5 sm:h-3.5" />
                    </h3>
                  </div>
                </div>
                <p className={`opacity-70 mb-3 sm:mb-4 leading-relaxed text-xs sm:text-sm line-clamp-3 sm:line-clamp-none ${data.id === 'ai' ? 'text-gray-300' : ''}`}>
                  {project.fullDesc || project.desc}
                </p>
                {project.tags && (
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.tags.slice(0, 4).map(tag => (
                      <span key={tag} className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded ${c.font} tracking-wide
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
      <footer className={`relative z-10 border-t border-current/10 py-6 sm:py-8 ${c.font}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center opacity-60">
          <p className="text-xs sm:text-sm">&copy; 2025 Gyanateet Dutta. All rights reserved.</p>
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

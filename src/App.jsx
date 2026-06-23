import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { DATA } from './data/portfolio';
import Pane from './components/Pane';
import ExpandedSection from './components/ExpandedSection';
import { FluidWaves, EmbeddingSpace, CyberGrid } from './components/backgrounds';

const Portfolio = () => {
  const [activePane, setActivePane] = useState(null); // 'left', 'center', 'right', or null
  const [expandedSection, setExpandedSection] = useState(null); // 'ryukijano', 'ai', 'ryoushi', or null
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', checkDevice);
    checkDevice();
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // If a section is expanded, show the expanded view
  if (expandedSection) {
    const sectionData = expandedSection === 'ryukijano' ? DATA.ryukijano : 
                        expandedSection === 'ai' ? DATA.ai : DATA.ryoushi;
    return <ExpandedSection data={sectionData} onClose={() => setExpandedSection(null)} />;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen lg:h-screen w-full bg-black overflow-x-hidden font-sans selection:bg-white selection:text-black">
      
      {/* Hero Background - Absolutely positioned behind everything */}
      <div className="absolute inset-0 z-0 pointer-events-none">
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

      {/* --- Resume Button - Fixed position --- */}
      <a 
        href="/resume/Gyanateet_Dutta_Resume_updated.pdf" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50 flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/90 backdrop-blur-md text-black rounded-full shadow-lg hover:bg-white hover:scale-105 transition-all duration-300 font-medium text-xs sm:text-sm"
      >
        <Download size={14} className="sm:w-4 sm:h-4" />
        <span className="hidden xs:inline">Resume</span>
        <span className="xs:hidden">CV</span>
      </a>

      {/* --- LEFT PANE: RYUKIJANO --- */}
      <Pane 
        id="left"
        activePane={activePane}
        setActivePane={setActivePane}
        onExpand={() => setExpandedSection('ryukijano')}
        baseColor="bg-washi" // Paper/Cream
        textColor="text-indigo-ink" // Indigo
        accentColor="bg-indigo-ink"
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
        textColor="text-magenta" 
        accentColor="bg-magenta"
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

export default Portfolio;

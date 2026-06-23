import { ArrowLeft, Download, ExternalLink } from 'lucide-react';
import { ExpandedFluidWaves, ExpandedEmbeddingSpace, ExpandedCyberGrid } from './backgrounds';

// --- Expanded Section Component ---
const ExpandedSection = ({ data, onClose }) => {
  const config = {
    ryukijano: {
      bg: 'bg-washi',
      text: 'text-indigo-ink',
      accent: 'bg-indigo-ink',
      accentText: 'text-indigo-ink',
      font: 'font-serif',
      cardBg: 'bg-white/60',
      headerBg: 'bg-washi/90',
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
      text: 'text-magenta',
      accent: 'bg-magenta',
      accentText: 'text-magenta',
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
          <div className="fixed inset-0 z-[1] pointer-events-none bg-gradient-to-t from-magenta/20 via-transparent to-transparent" />
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
            href="/resume/Gyanateet_Dutta_Resume_updated.pdf" 
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
                ${data.id === 'ryoushi' ? 'hover:shadow-[0_0_15px_rgba(255,46,99,0.3)] hover:border-magenta/50' : ''}
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
                ${data.id === 'ryukijano' ? 'border-indigo-ink/20 hover:border-indigo-ink/40 hover:shadow-xl' : ''}
                ${data.id === 'ai' ? 'border-white/10 hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]' : ''}
                ${data.id === 'ryoushi' ? 'border-magenta/20 hover:border-magenta/60 hover:shadow-[0_0_30px_rgba(255,46,99,0.3)]' : ''}
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
                    data.id === 'ryukijano' ? 'from-washi via-transparent' :
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
                        ${data.id === 'ryukijano' ? 'bg-indigo-ink/10 text-indigo-ink' : ''}
                        ${data.id === 'ai' ? 'bg-indigo-500/20 text-indigo-300' : ''}
                        ${data.id === 'ryoushi' ? 'bg-magenta/20 text-magenta' : ''}
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

export default ExpandedSection;

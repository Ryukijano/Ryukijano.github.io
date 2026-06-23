import { useState } from 'react';
import { X, Activity, ChevronRight } from 'lucide-react';
import ProjectList from './ProjectList';

// --- Reusable Pane Component ---
const Pane = ({ 
  id, activePane, setActivePane, onExpand, children, 
  textColor, 
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
           <div className="bg-white/90 backdrop-blur-xl rounded-xl overflow-hidden shadow-2xl border border-indigo-ink/20 relative">
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
               className="absolute top-1 right-1 bg-white rounded-full p-1 text-indigo-ink hover:bg-indigo-ink hover:text-white transition-colors z-[101] shadow-sm"
             >
               <X size={12} />
             </button>
           </div>
        </div>
      )}
      {id === 'left' && !showSoundCloud && (
        <button 
          onClick={() => setShowSoundCloud(true)}
          className="absolute bottom-4 left-4 z-[100] bg-white/90 backdrop-blur-xl p-2.5 rounded-full text-indigo-ink shadow-2xl hover:scale-110 transition-transform hidden sm:block border border-indigo-ink/20"
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
                 ${id === 'left' ? 'bg-indigo-ink text-white' : ''}
                 ${id === 'center' ? 'bg-indigo-600 text-white' : ''}
                 ${id === 'right' ? 'bg-magenta text-white' : ''}
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
                      ${id === 'left' ? 'text-indigo-ink hover:text-indigo-ink/70' : ''}
                      ${id === 'center' ? 'text-white hover:text-indigo-400' : ''}
                      ${id === 'right' ? 'text-magenta hover:text-white' : ''}
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
               ${id === 'left' ? 'bg-indigo-ink/20' : ''}
               ${id === 'center' ? 'bg-white/20' : ''}
               ${id === 'right' ? 'bg-magenta/30' : ''}
             `}></div>
             <ProjectList items={projects.slice(0, isMobile ? 2 : 3)} theme={id === 'left' ? 'light' : id === 'center' ? 'dark' : 'neon'} isMobile={isMobile} />
             
             {/* View All Button */}
             <button
               onClick={onExpand}
               className={`
                 w-full py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg flex items-center justify-center gap-2 
                 transition-all duration-300 font-medium text-xs sm:text-sm
                 active:scale-[0.98]
                 ${id === 'left' ? 'bg-indigo-ink/10 hover:bg-indigo-ink/20 text-indigo-ink border border-indigo-ink/20' : ''}
                 ${id === 'center' ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20' : ''}
                 ${id === 'right' ? 'bg-magenta/10 hover:bg-magenta/20 text-magenta border border-magenta/30 hover:shadow-[0_0_15px_rgba(255,46,99,0.2)]' : ''}
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

export default Pane;

import { ExternalLink } from 'lucide-react';

const ProjectList = ({ items, theme, isMobile }) => {
  return (
    <div className="grid gap-2 sm:gap-4 pb-4 sm:pb-0">
      {items.map((project, idx) => (
        <a 
          key={idx} 
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            group flex items-start gap-2 sm:gap-4 p-2.5 sm:p-4 rounded-lg transition-all duration-300 cursor-pointer relative overflow-hidden
            active:scale-[0.98]
            ${theme === 'light' ? 'hover:bg-indigo-ink/5 active:bg-indigo-ink/10 border border-transparent hover:border-indigo-ink/20' : ''}
            ${theme === 'dark' ? 'hover:bg-white/10 active:bg-white/15 border border-transparent hover:border-white/20' : ''}
            ${theme === 'neon' ? 'hover:bg-magenta/10 active:bg-magenta/15 border border-transparent hover:border-magenta/50 hover:shadow-[0_0_15px_rgba(255,46,99,0.2)]' : ''}
          `}
        >
          {/* Background Image Fade In on Hover - hidden on mobile */}
          {!isMobile && project.media && project.media.type === 'image' && (
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-cover bg-center z-0"
                 style={{ backgroundImage: `url(${project.media.src})` }} 
            />
          )}

          <div className={`mt-0.5 sm:mt-1 relative z-10 flex-shrink-0 ${theme === 'neon' ? 'text-magenta' : 'opacity-70'}`}>
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

export default ProjectList;

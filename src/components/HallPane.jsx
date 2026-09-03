import { useState } from 'react';
import { Activity, X } from 'lucide-react';
import { projectSlug } from '../data/portfolio';
import { navigate } from '../lib/navigation';

function ProjectList({ items, room }) {
  return (
    <div className="hall-pane__projects">
      {items.map((project) => (
        <a
          key={project.title}
          href={`/work/${projectSlug(project.title)}`}
          className={`hall-pane__project hall-pane__project--${room}`}
          onClick={(event) => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
              return;
            }
            event.preventDefault();
            navigate(`/work/${projectSlug(project.title)}`);
          }}
        >
          <h4>{project.title}</h4>
          <p>{project.desc}</p>
        </a>
      ))}
    </div>
  );
}

export default function HallPane({
  id,
  room,
  kicker,
  activePane,
  setActivePane,
  onExpand,
  titleLines,
  subtitle,
  desc,
  tags,
  projects,
  socials,
  isMobile,
  children,
}) {
  let widthClass = 'min-[900px]:w-1/3';
  if (!isMobile && typeof window !== 'undefined' && window.innerWidth >= 900) {
    if (activePane === id) widthClass = 'min-[900px]:w-[58%]';
    else if (activePane !== null) widthClass = 'min-[900px]:w-[21%]';
  }

  const [showSoundCloud, setShowSoundCloud] = useState(true);
  const isContentVisible = isMobile || activePane === id;
  const dimmed = Boolean(activePane && activePane !== id && !isMobile);

  const handlePaneClick = (event) => {
    if (event.target.closest('a') || event.target.closest('button')) return;
    if (isMobile) {
      setActivePane(activePane === id ? null : id);
    }
  };

  return (
    <section
      onMouseEnter={() => !isMobile && setActivePane(id)}
      onMouseLeave={() => !isMobile && setActivePane(null)}
      onClick={handlePaneClick}
      className={`hall-pane hall-pane--${room} ${widthClass} ${dimmed ? 'is-dim' : ''}`}
      aria-label={`${kicker}: ${titleLines.join('')}`}
    >
      {children}

      {id === 'left' && showSoundCloud ? (
        <div className="hall-player">
          <iframe
            title="SoundCloud player"
            width="100%"
            height="80"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/user-294342891/know-me-project-1&color=%231a237e&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
          />
          <button
            type="button"
            className="hall-player__hide"
            onClick={() => setShowSoundCloud(false)}
            aria-label="Hide player"
          >
            <X size={14} />
          </button>
        </div>
      ) : null}
      {id === 'left' && !showSoundCloud ? (
        <button
          type="button"
          className="hall-player__show"
          onClick={() => setShowSoundCloud(true)}
          aria-label="Show player"
        >
          <Activity size={18} />
        </button>
      ) : null}

      <div className={`hall-pane__inner ${id === 'left' ? 'has-player' : ''}`}>
        <div>
          <p className={`hall-pane__kicker ${dimmed ? 'is-quiet' : ''}`}>{kicker}</p>
          <p className={`hall-pane__tags ${dimmed ? 'is-quiet' : ''}`}>
            {tags.slice(0, isMobile ? 3 : tags.length).join(' · ')}
          </p>
          <h2 className={`hall-pane__title hall-pane__title--${room}`}>
            {titleLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <p className="hall-pane__subtitle">{subtitle}</p>

          {isContentVisible ? (
            <div className="animate-fadeIn">
              <p className={`hall-pane__desc hall-pane__desc--${room}`}>{desc}</p>
              <div className="hall-pane__socials">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.label}
                    aria-label={social.label}
                  >
                    <social.icon size={isMobile ? 18 : 20} />
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {isContentVisible ? (
          <div className="animate-fadeIn hall-pane__lower">
            <ProjectList
              room={room}
              items={[...projects]
                .sort((a, b) => Number(b.featured === true) - Number(a.featured === true))
                .slice(0, isMobile ? 2 : 3)}
            />
            <button type="button" onClick={onExpand} className="hall-pane__more">
              All notes
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

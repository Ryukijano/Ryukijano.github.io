import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Text, Theme } from '../components/m3/index.jsx';
import SiteNav from '../components/SiteNav.jsx';
import KanagawaPlate from '../components/KanagawaPlate.jsx';
import { Caption } from '../components/MediaFigure.jsx';
import content from '../content/intro.js';

function isHttp(to) {
  return /^https?:/.test(to);
}

function ProjectLink({ project }) {
  if (isHttp(project.to)) {
    return (
      <a href={project.to} target="_blank" rel="noopener noreferrer">
        {project.title}
      </a>
    );
  }
  return <Link to={project.to}>{project.title}</Link>;
}

function laneClass(id, active) {
  return ['folio__lane', `folio__lane--${id}`, active === id ? 'is-on' : '']
    .filter(Boolean)
    .join(' ');
}

/** / — exhibition hang: print intact, Engineer / AI / Quantum in the mat. */
export default function Intro() {
  const [lane, setLane] = useState(null);

  useEffect(() => {
    document.title = 'Gyanateet Dutta';
  }, []);

  return (
    <Theme name="study" className="folio">
      <SiteNav variant="paper" />

      <main className="folio__stage">
        <header className="folio__colophon">
          <Text as="h1" role="headline-medium">
            {content.bio.name}
          </Text>
          <Text as="p" role="title-small">
            {content.bio.role}
          </Text>
          {content.degree ? (
            <Text as="p" role="body-medium">
              {content.degree.title}, {content.degree.org}, {content.degree.years}
            </Text>
          ) : null}
          <Text as="p" role="body-large">
            {content.bio.statement}
          </Text>
          <p className="folio__meta">{content.affiliations}</p>
        </header>

        <figure className="folio__print">
          <KanagawaPlate src={content.plate.src} alt={content.plate.alt}>
            <div className="folio__thirds">
              {content.rooms.map((room) => (
                <Link
                  key={room.id}
                  to={room.to}
                  className={laneClass(room.id, lane)}
                  onMouseEnter={() => setLane(room.id)}
                  onMouseLeave={() => setLane(null)}
                  onFocus={() => setLane(room.id)}
                  onBlur={() => setLane(null)}
                >
                  <span className="folio__chip">
                    {room.lane}
                    <span className="folio__chip-panel">{room.panel}</span>
                  </span>
                </Link>
              ))}
            </div>
          </KanagawaPlate>
        </figure>

        <nav className="folio__rail" aria-label="Lanes">
          {content.rooms.map((room) => (
            <Theme
              key={room.id}
              name={room.theme}
              as="article"
              className={laneClass(room.id, lane)}
              onMouseEnter={() => setLane(room.id)}
              onMouseLeave={() => setLane(null)}
            >
              <p className="folio__kicker">{room.lane}</p>
              <Text as="h2" role="title-large">
                <Link to={room.to}>{room.title}</Link>
              </Text>
              <Text as="p" role="body-medium">
                {room.subtitle}
              </Text>
              <ul className="folio__projects">
                {room.projects.map((project) => (
                  <li key={project.title}>
                    {project.year ? <span className="folio__year">{project.year}</span> : null}
                    <ProjectLink project={project} />
                  </li>
                ))}
              </ul>
            </Theme>
          ))}
        </nav>

        <footer className="folio__note">
          <figure>
            <Caption text={content.plate.caption} highlight={content.plate.highlight} />
          </figure>
        </footer>
      </main>
    </Theme>
  );
}

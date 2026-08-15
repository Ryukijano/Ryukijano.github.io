import { useEffect } from 'react';
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

function Room({ room }) {
  return (
    <Theme name={room.theme} as="article" className={`hall__room hall__room--${room.id}`}>
      <p className="hall__lane">{room.lane}</p>
      <h2 className="hall__name">
        <Link to={room.to} aria-label={room.title}>
          {room.titleLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </Link>
      </h2>
      <Text as="p" role="title-medium">
        {room.subtitle}
      </Text>
      <ul className="hall__projects">
        {room.projects.map((project) => (
          <li key={project.title}>
            {project.year ? <span className="hall__year">{project.year}</span> : null}
            <ProjectLink project={project} />
          </li>
        ))}
      </ul>
      <Link to={room.to} className="hall__open">
        Open {room.title}
      </Link>
    </Theme>
  );
}

/** / — three-lane hall over one Kanagawa plate. */
export default function Intro() {
  useEffect(() => {
    document.title = 'Gyanateet Dutta';
  }, []);

  return (
    <Theme name="study" className="hall">
      <KanagawaPlate />
      <SiteNav variant="veil" overlay />

      <main className="hall__stage">
        <header className="hall__mast">
          {content.degree ? (
            <Text as="p" role="body-large">
              {content.degree.title}, {content.degree.org}, {content.degree.years}
            </Text>
          ) : null}
          <Text as="p" role="body-large">
            {content.bio.statement}
          </Text>
          <p className="hall__meta">{content.affiliations}</p>
        </header>

        <div className="hall__rooms">
          {content.rooms.map((room) => (
            <Room key={room.id} room={room} />
          ))}
        </div>

        <footer className="hall__foot">
          <figure>
            <Caption text={content.plate.caption} highlight={content.plate.highlight} />
          </figure>
        </footer>
      </main>
    </Theme>
  );
}

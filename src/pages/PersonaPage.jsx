import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { parseStyle } from '../lib/style.js';
import { Text, Theme } from '../components/m3/index.jsx';
import SiteNav from '../components/SiteNav.jsx';
import { FigurePair } from '../components/MediaFigure.jsx';
import { getPersona } from '../content/personas.js';
import NotFound from './NotFound.jsx';

const SERIF = '--m3-font:var(--md-sys-typescale-brand-font)';
const MONO = '--m3-font:var(--md-sys-typescale-mono-font);font-variant-numeric:tabular-nums';
const MUTED = 'color:var(--md-sys-color-on-surface-variant)';
const INK = 'color:var(--md-sys-color-on-surface)';

const linkStyle = parseStyle(
  'color:var(--md-sys-color-primary);text-decoration:none;' +
    'border-bottom:1px solid color-mix(in srgb, var(--md-sys-color-primary) 35%, transparent)',
);

function isHttp(to) {
  return /^https?:/.test(to);
}

function ProjectTitle({ project }) {
  if (isHttp(project.to)) {
    return (
      <a href={project.to} target="_blank" rel="noopener noreferrer" style={linkStyle}>
        {project.title}
      </a>
    );
  }
  return (
    <Link to={project.to} style={linkStyle}>
      {project.title}
    </Link>
  );
}

export default function PersonaPage() {
  const { id } = useParams();
  const data = getPersona(id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (data) document.title = `${data.title} — Gyanateet Dutta`;
  }, [data]);

  if (!data) return <NotFound />;

  return (
    <Theme
      name={data.id === 'gyanateet' ? 'study' : data.id}
      className={data.paneClass}
      style={parseStyle(
        'min-height:100vh;' +
          'font-family:var(--md-sys-typescale-brand-font);-webkit-font-smoothing:antialiased',
      )}
    >
      <SiteNav variant="paper" />
      <main style={parseStyle('max-width:42rem;margin:0 auto;padding:4rem 1.5rem 6rem')}>
        <Text as="h1" role="headline-large" style={parseStyle(`${INK};margin:0`)}>
          {data.title}
        </Text>
        <Text as="p" role="title-medium" style={parseStyle(`${SERIF};${INK};margin:0.75rem 0 0`)}>
          {data.subtitle}
        </Text>
        <Text as="p" role="body-large" style={parseStyle(`${SERIF};${INK};margin:1.5rem 0 0;line-height:1.65`)}>
          {data.statement}
        </Text>

        {data.figures?.length ? (
          <FigurePair figures={data.figures} style={{ margin: '2.5rem 0 0' }} />
        ) : null}

        <ul style={parseStyle('list-style:none;margin:3rem 0 0;padding:0')}>
          {data.projects.map((project) => (
            <li
              key={project.title}
              style={parseStyle('display:flex;gap:1.5rem;margin:0.85rem 0 0;align-items:baseline')}
            >
              <Text
                as="span"
                role="label-large"
                style={parseStyle(`${MONO};${MUTED};flex:none;width:3rem`)}
              >
                {project.year ?? ''}
              </Text>
              <div>
                <Text as="span" role="body-large" style={parseStyle(`${SERIF};${INK}`)}>
                  <ProjectTitle project={project} />
                </Text>
                {project.note ? (
                  <Text
                    as="p"
                    role="body-medium"
                    style={parseStyle(`${SERIF};${MUTED};margin:0.25rem 0 0;line-height:1.55`)}
                  >
                    {project.note}
                  </Text>
                ) : null}
              </div>
            </li>
          ))}
        </ul>

        <p style={parseStyle(`${SERIF};margin:3rem 0 0`)}>
          <Link to="/work" style={linkStyle}>
            Work
          </Link>
          <span aria-hidden="true"> · </span>
          <Link to="/" style={linkStyle}>
            Home
          </Link>
        </p>
      </main>
    </Theme>
  );
}

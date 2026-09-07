import Atmosphere from '../components/Atmosphere';
import SiteNav from '../components/SiteNav';
import { LANES, projectSlug } from '../data/portfolio';
import Link from '../lib/Link';

const SOUND = {
  ryukijano: {
    label: 'Know Me (Project 1)',
    href: 'https://soundcloud.com/user-294342891/know-me-project-1',
  },
};

function byYearDescWhenPresent(a, b) {
  const yearA = typeof a.year === 'number' && Number.isFinite(a.year) ? a.year : null;
  const yearB = typeof b.year === 'number' && Number.isFinite(b.year) ? b.year : null;
  if (yearA == null && yearB == null) return 0;
  if (yearA == null) return 1;
  if (yearB == null) return -1;
  return yearB - yearA;
}

export default function PersonaPage({ data }) {
  const projects = data.projects.slice().sort(byYearDescWhenPresent);
  const sound = SOUND[data.id];
  const handle = LANES.find((lane) => lane.id === data.id)?.handle;
  const kicker = handle && handle !== data.title ? `${handle} · ${data.subtitle}` : data.subtitle;


  return (
    <div className="print">
      <Atmosphere variant="quiet" />
      <SiteNav />

      <main id="main" tabIndex={-1} className="route print__body print__body--narrow">
        <p className="print__kicker">{kicker}</p>
        <h1 className="print__name" style={{ marginTop: '0.75rem' }}>
          {data.title}
        </h1>
        <p className="print__lede">{data.fullDesc}</p>

        {data.socials?.length ? (
          <p className="print__links">
            {data.socials.map((social, index) => (
              <span key={social.label}>
                {index > 0 ? <span aria-hidden="true"> · </span> : null}
                <a href={social.link} target="_blank" rel="noopener noreferrer">
                  {social.label}
                </a>
              </span>
            ))}
          </p>
        ) : null}

        {sound ? (
          <p className="print__note">
            Sound:{' '}
            <a href={sound.href} target="_blank" rel="noopener noreferrer">
              {sound.label}
            </a>{' '}
            on SoundCloud.
          </p>
        ) : null}

        <section className="print__section">
          <h2>Projects</h2>
          <ul role="list" className="print__timeline">
            {projects.map((project) => (
              <li key={project.title}>
                <span>{project.year ?? '—'}</span>
                <Link href={`/work/${projectSlug(project.title)}`}>{project.title}</Link>
              </li>
            ))}
          </ul>
        </section>

        <p className="print__foot">
          <Link href="/work">Work</Link>
          <span aria-hidden="true"> · </span>
          <Link href="/">Home</Link>
        </p>
      </main>
    </div>
  );
}

import { useEffect } from 'react';
import Atmosphere from '../components/Atmosphere';
import SiteNav from '../components/SiteNav';
import { allProjects } from '../data/portfolio';
import Link from '../lib/Link';

function projectYear(project) {
  if (typeof project?.year === 'number' && Number.isFinite(project.year)) {
    return project.year;
  }

  const blob = [project?.title, project?.desc, project?.fullDesc, project?.note]
    .filter(Boolean)
    .join(' ');
  const matches = blob.match(/\b(?:19|20)\d{2}\b/g);
  if (!matches) return null;
  return Math.max(...matches.map(Number));
}

function projectLane(project) {
  if (typeof project?.lane === 'string' && project.lane.trim()) return project.lane;
  if (typeof project?.laneLabel === 'string' && project.laneLabel.trim()) return project.laneLabel;
  return '';
}

function isFeatured(project) {
  return project?.featured === true;
}

function featuredOrder(project) {
  return typeof project?.featuredOrder === 'number' && Number.isFinite(project.featuredOrder)
    ? project.featuredOrder
    : Number.POSITIVE_INFINITY;
}

function byYearDesc(a, b) {
  return (projectYear(b) ?? -Infinity) - (projectYear(a) ?? -Infinity);
}

function byFeatured(a, b) {
  return featuredOrder(a) - featuredOrder(b);
}

export function WorkInkNotFound() {
  return (
    <div className="print print--ink">
      <Atmosphere variant="quiet" />
      <SiteNav variant="ink" />
      <main className="print__body print__body--narrow">
        <p className="print__kicker">404</p>
        <h1 className="print__title">This note is not here.</h1>
        <nav className="print__foot" aria-label="Other pages">
          <Link href="/work">Work</Link>
          <span aria-hidden="true"> · </span>
          <Link href="/academic">Academic</Link>
          <span aria-hidden="true"> · </span>
          <Link href="/">Personal</Link>
        </nav>
      </main>
    </div>
  );
}

export default function WorkPage() {
  const projects = allProjects().slice().sort(byYearDesc);
  const featured = projects.filter(isFeatured).slice().sort(byFeatured);
  const also = projects.filter((project) => !isFeatured(project)).slice().sort(byYearDesc);

  const years = projects.map(projectYear).filter((year) => year != null);
  const span = years.length > 0 ? `${Math.min(...years)}–${Math.max(...years)}` : null;
  const lanes = [...new Set(projects.map(projectLane).filter(Boolean))];

  const facts = [
    { term: 'Notes', detail: String(projects.length) },
    span ? { term: 'Span', detail: span } : null,
    lanes.length > 0 ? { term: 'Lanes', detail: lanes.join(', ') } : { term: 'Record', detail: 'Academic is separate' },
  ].filter(Boolean);

  useEffect(() => {
    document.title = 'Work · Gyanateet Dutta';
  }, []);

  return (
    <div className="print print--ink">
      <Atmosphere variant="quiet" />
      <SiteNav variant="ink" />

      <main className="print__body print__body--wide">
        <header className="print__header">
          <h1 className="print__title">Work</h1>
          <p className="print__lede print__lede--muted">
            Dated notes on things I built. The academic record is separate.
          </p>
          <dl className="print__facts">
            {facts.slice(0, 3).map((fact) => (
              <div key={fact.term}>
                <dt>{fact.term}</dt>
                <dd>{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </header>

        {featured.length > 0 ? (
          <section className="print__section" aria-label="Featured work">
            <ul className="work-table">
              {featured.map((project) => {
                const year = projectYear(project);
                const lane = projectLane(project);
                const desc = project.desc || '';

                return (
                  <li key={project.slug} className="work-table__row">
                    <span className="work-table__year">{year ?? '—'}</span>
                    <Link href={`/work/${project.slug}`} className="work-table__title">
                      {project.title}
                    </Link>
                    <span className="work-table__lane">{lane}</span>
                    <p className="work-table__desc">{desc}</p>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        {also.length > 0 ? (
          <section className="print__section">
            <h2 className="print__also">Also</h2>
            <ul className="work-also">
              {also.map((project) => {
                const year = projectYear(project);
                return (
                  <li key={project.slug}>
                    <span>{year != null ? year : ''}</span>
                    <Link href={`/work/${project.slug}`}>{project.title}</Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        <nav className="print__foot" aria-label="Other pages">
          <Link href="/academic">Academic</Link>
          <span aria-hidden="true"> · </span>
          <Link href="/">Personal</Link>
        </nav>
      </main>
    </div>
  );
}

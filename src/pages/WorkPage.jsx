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

function withinYear(a, b) {
  const rank = Number(isFeatured(b)) - Number(isFeatured(a));
  if (rank !== 0) return rank;
  const order = featuredOrder(a) - featuredOrder(b);
  if (order !== 0) return order;
  return String(a.title).localeCompare(String(b.title));
}

export function WorkInkNotFound() {
  return (
    <div className="print">
      <Atmosphere variant="quiet" />
      <SiteNav />
      <main id="main" className="print__body print__body--narrow">
        <p className="print__kicker">404</p>
        <h1 className="print__title" style={{ marginTop: '0.75rem' }}>
          This note is not here.
        </h1>
        <nav className="print__foot" aria-label="Other pages">
          <Link href="/work">Work</Link>
          <span aria-hidden="true"> · </span>
          <Link href="/academic">Academic</Link>
          <span aria-hidden="true"> · </span>
          <Link href="/">Home</Link>
        </nav>
      </main>
    </div>
  );
}

export default function WorkPage() {
  const projects = allProjects();
  const dated = projects.filter((project) => projectYear(project) != null);
  const undated = projects
    .filter((project) => projectYear(project) == null)
    .sort((a, b) => String(a.title).localeCompare(String(b.title)));

  const years = [...new Set(dated.map(projectYear))].sort((a, b) => b - a);
  const span = years.length > 0 ? `${years[years.length - 1]}–${years[0]}` : null;

  useEffect(() => {
    document.title = 'Work · Gyanateet Dutta';
  }, []);

  return (
    <div className="print">
      <Atmosphere variant="quiet" />
      <SiteNav />

      <main id="main" className="print__body print__body--wide">
        <header>
          {span ? <p className="print__kicker">{span}</p> : null}
          <h1 className="print__title" style={{ marginTop: span ? '0.75rem' : 0 }}>
            Work
          </h1>
          <p className="print__lede print__lede--muted">
            Dated notes on things I built. The academic record is separate.
          </p>
        </header>

        {years.map((year) => {
          const rows = dated.filter((project) => projectYear(project) === year).sort(withinYear);
          return (
            <section key={year} aria-label={`Work from ${year}`}>
              <h2 className="catalog__year">{year}</h2>
              <ul className="catalog__rows">
                {rows.map((project) => (
                  <li key={project.slug} className={`catalog__row${isFeatured(project) ? ' is-featured' : ''}`}>
                    <Link href={`/work/${project.slug}`} className="catalog__title">
                      {project.title}
                    </Link>
                    <span className="catalog__lane">{projectLane(project)}</span>
                    <p className="catalog__desc">{project.desc}</p>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        {undated.length > 0 ? (
          <section className="print__section">
            <h2 className="print__also">Also</h2>
            <ul className="work-also">
              {undated.map((project) => (
                <li key={project.slug}>
                  <span />
                  <Link href={`/work/${project.slug}`}>{project.title}</Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <nav className="print__foot" aria-label="Other pages">
          <Link href="/academic">Academic</Link>
          <span aria-hidden="true"> · </span>
          <Link href="/">Home</Link>
        </nav>
      </main>
    </div>
  );
}

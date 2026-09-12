import Atmosphere from '../components/Atmosphere';
import SiteFooter from '../components/SiteFooter';
import SiteNav from '../components/SiteNav';
import { allProjects, isFeatured, projectLane, projectYear, withinYear } from '../data/portfolio';
import Link from '../lib/Link';

export function WorkInkNotFound() {
  return (
    <div className="print">
      <Atmosphere variant="quiet" />
      <SiteNav />
      <main id="main" tabIndex={-1} className="route print__body print__body--narrow">
        <p className="print__kicker">404</p>
        <h1 className="print__title" style={{ marginTop: '0.75rem' }}>
          Page not found
        </h1>
        <nav className="print__foot" aria-label="Other pages">
          <Link href="/work">Work</Link>
          <span aria-hidden="true"> · </span>
          <Link href="/academic">Academic</Link>
          <span aria-hidden="true"> · </span>
          <Link href="/">Home</Link>
        </nav>
      </main>
      <SiteFooter />
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


  return (
    <div className="print">
      <Atmosphere variant="quiet" />
      <SiteNav />

      <main id="main" tabIndex={-1} className="route print__body print__body--wide">
        <header>
          {span ? <p className="print__kicker">{span}</p> : null}
          <h1 className="print__title" style={{ marginTop: span ? '0.75rem' : 0 }}>
            Work
          </h1>
          <p className="print__lede print__lede--muted">
            Selected projects in graphics, computer vision, and quantum computing.
          </p>
        </header>

        {years.map((year) => {
          const rows = dated.filter((project) => projectYear(project) === year).sort(withinYear);
          return (
            <section key={year} aria-label={`Work from ${year}`}>
              <h2 className="catalog__year">{year}</h2>
              <ul role="list" className="catalog__rows">
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
            <ul role="list" className="work-also">
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
      <SiteFooter />
    </div>
  );
}

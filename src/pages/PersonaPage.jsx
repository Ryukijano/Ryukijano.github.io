import { useEffect } from 'react';
import Atmosphere from '../components/Atmosphere';
import SiteNav from '../components/SiteNav';
import { projectSlug } from '../data/portfolio';
import Link from '../lib/Link';

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

  useEffect(() => {
    document.title = `${data.title} · Gyanateet Dutta`;
  }, [data.title]);

  return (
    <div className="print print--paper">
      <Atmosphere variant="quiet" />
      <SiteNav variant="paper" />

      <main className="print__body print__body--narrow">
        <p className="print__kicker">{data.subtitle}</p>
        <h1 className="print__name">{data.title}</h1>
        <p className="print__lede">{data.fullDesc}</p>

        <section className="print__section">
          <h2>Projects</h2>
          <ul className="print__timeline">
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

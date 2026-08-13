import SiteNav from '../components/SiteNav';
import { allProjects } from '../data/portfolio';
import Link from '../lib/Link';

const MUTED = '#9a9588';
const RULE = 'rgba(230, 225, 211, 0.16)';

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
  const yearDiff = byYearDesc(a, b);
  if (yearDiff !== 0) return yearDiff;
  return featuredOrder(a) - featuredOrder(b);
}

export function WorkInkNotFound() {
  return (
    <main className="min-h-screen bg-[#11110e] text-[#E6E1D3]">
      <SiteNav variant="ink" />
      <div className="mx-auto max-w-[42rem] px-6 pb-16 pt-24">
        <p className="font-mono text-sm tabular-nums" style={{ color: MUTED }}>
          404
        </p>
        <h1 className="mt-4 font-serif text-3xl leading-snug text-[#E6E1D3]">
          This note is not here.
        </h1>
        <p className="mt-4 font-sans text-sm" style={{ color: MUTED }}>
          <Link href="/work" className="underline decoration-[#E6E1D3]/30 hover:text-[#E6E1D3]">
            Work
          </Link>
          <span className="mx-2">·</span>
          <Link href="/academic" className="underline decoration-[#E6E1D3]/30 hover:text-[#E6E1D3]">
            Academic
          </Link>
          <span className="mx-2">·</span>
          <Link href="/" className="underline decoration-[#E6E1D3]/30 hover:text-[#E6E1D3]">
            Personal
          </Link>
        </p>
      </div>
    </main>
  );
}

export default function WorkPage() {
  const projects = allProjects().slice().sort(byYearDesc);
  const featured = projects.filter(isFeatured).slice().sort(byFeatured);
  const also = projects.filter((project) => !isFeatured(project)).slice().sort(byYearDesc);

  const years = projects.map(projectYear).filter((year) => year != null);
  const span =
    years.length > 0 ? `${Math.min(...years)}–${Math.max(...years)}` : null;
  const lanes = [...new Set(projects.map(projectLane).filter(Boolean))];

  const facts = [
    { term: 'Notes', detail: String(projects.length) },
    span ? { term: 'Span', detail: span } : null,
    lanes.length > 0 ? { term: 'Lanes', detail: lanes.join(', ') } : { term: 'Record', detail: 'Academic is separate' },
  ].filter(Boolean);

  return (
    <main className="min-h-screen bg-[#11110e] text-[#E6E1D3]">
      <SiteNav variant="ink" />

      <div className="mx-auto max-w-5xl px-6 pb-20 pt-24">
        <header>
          <h1 className="font-serif text-4xl leading-tight text-[#E6E1D3] sm:text-5xl">Work</h1>
          <p
            className="mt-4 max-w-xl font-sans text-[15px] leading-relaxed"
            style={{ color: MUTED }}
          >
            Dated notes on things I built. The academic record is separate.
          </p>

          <dl
            className="mt-8 flex flex-wrap gap-x-10 gap-y-2 font-sans text-[12px]"
            style={{ color: MUTED }}
          >
            {facts.slice(0, 3).map((fact) => (
              <div key={fact.term} className="flex gap-2">
                <dt>{fact.term}</dt>
                <dd>{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </header>

        {featured.length > 0 ? (
          <section className="mt-14" aria-label="Featured work">
            <ul>
              {featured.map((project) => {
                const year = projectYear(project);
                const lane = projectLane(project);
                const desc = project.desc || '';

                return (
                  <li
                    key={project.slug}
                    className="border-b py-4 first:border-t"
                    style={{ borderColor: RULE }}
                  >
                    <div className="grid grid-cols-[3.25rem_minmax(0,1fr)] items-baseline gap-x-4 gap-y-1 sm:grid-cols-[3.5rem_minmax(10rem,1.15fr)_6.5rem_minmax(0,1.5fr)]">
                      <span
                        className="font-mono text-[13px] tabular-nums"
                        style={{ color: MUTED }}
                      >
                        {year ?? ''}
                      </span>
                      <div className="min-w-0 sm:contents">
                        <Link
                          href={`/work/${project.slug}`}
                          className="font-serif text-[1.05rem] leading-snug text-[#E6E1D3] hover:underline"
                        >
                          {project.title}
                        </Link>
                        <span
                          className="mt-0.5 block font-sans text-[12px] sm:mt-0"
                          style={{ color: MUTED }}
                        >
                          {lane}
                        </span>
                        <p
                          className="mt-0.5 truncate font-sans text-[13px] sm:mt-0"
                          style={{ color: MUTED }}
                        >
                          {desc}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        {also.length > 0 ? (
          <section className="mt-16">
            <h2 className="font-serif text-lg text-[#E6E1D3]">Also</h2>
            <ul className="mt-4 space-y-2">
              {also.map((project) => {
                const year = projectYear(project);
                return (
                  <li
                    key={project.slug}
                    className="font-sans text-[13px]"
                    style={{ color: MUTED }}
                  >
                    {year != null ? (
                      <span className="mr-3 inline-block w-10 font-mono tabular-nums">
                        {year}
                      </span>
                    ) : (
                      <span className="mr-3 inline-block w-10" />
                    )}
                    <Link href={`/work/${project.slug}`} className="hover:text-[#E6E1D3] hover:underline">
                      {project.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        <nav
          className="mt-20 font-sans text-sm"
          style={{ color: MUTED }}
          aria-label="Other pages"
        >
          <Link href="/academic" className="hover:text-[#E6E1D3] hover:underline">
            Academic
          </Link>
          <span className="mx-2">·</span>
          <Link href="/" className="hover:text-[#E6E1D3] hover:underline">
            Personal
          </Link>
        </nav>
      </div>
    </main>
  );
}

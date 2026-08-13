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

  return (
    <div className="min-h-screen bg-[#E6E1D3] font-serif text-[#1a237e]">
      <SiteNav variant="paper" />

      <main className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-4xl leading-tight">{data.title}</h1>
        <p className="mt-6 leading-relaxed">{data.fullDesc}</p>

        <section className="mt-14">
          <h2 className="text-xl">Projects</h2>
          <ul className="mt-4 space-y-3">
            {projects.map((project) => (
              <li key={project.title} className="flex gap-6">
                {project.year ? <span className="w-12 shrink-0">{project.year}</span> : null}
                <Link
                  href={`/work/${projectSlug(project.title)}`}
                  className="underline-offset-4 hover:underline"
                >
                  {project.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-14">
          <Link href="/work" className="underline-offset-4 hover:underline">
            Work
          </Link>
          <span aria-hidden="true"> · </span>
          <Link href="/" className="underline-offset-4 hover:underline">
            Home
          </Link>
        </p>
      </main>
    </div>
  );
}

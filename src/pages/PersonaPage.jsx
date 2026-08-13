import SiteNav from '../components/SiteNav';
import { LANES, projectSlug } from '../data/portfolio';
import Link from '../lib/Link';

export default function PersonaPage({ data }) {
  const lane = LANES.find((item) => item.id === data.id);

  return (
    <main className="min-h-screen bg-[#E6E1D3] text-[#161618]">
      <SiteNav tone="paper" current="personal" />
      <div className="px-5 pb-24 pt-24 sm:px-10 lg:px-20">
        <nav className="flex flex-wrap items-center justify-between gap-4 border-b border-black/20 pb-5" aria-label="Personal">
          <Link href="/" className="font-mono text-sm uppercase tracking-widest">
            Index
          </Link>
          <div className="flex gap-4 font-mono text-xs uppercase tracking-widest">
            <Link href="/work">Work</Link>
            <Link href="/academic">Academic</Link>
          </div>
        </nav>
        <section className="mx-auto max-w-5xl py-16 sm:py-24">
          <p className="font-mono text-xs uppercase tracking-[0.25em] opacity-60">
            Persona / {lane?.label ?? data.id}
          </p>
          <h1 className="mt-4 max-w-4xl text-6xl font-bold leading-[0.9] sm:text-8xl">{data.title}</h1>
          <p className="mt-6 max-w-2xl text-2xl opacity-80">{data.subtitle}</p>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed">{data.fullDesc}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {data.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-black/30 px-3 py-1 font-mono text-xs">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            {data.socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest opacity-70 hover:opacity-100"
                >
                  <Icon size={14} />
                  {social.label}
                </a>
              );
            })}
          </div>
          <h2 className="mt-20 text-3xl font-bold">Selected projects</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {data.projects.map((project) => (
              <Link
                key={project.title}
                href={`/work/${projectSlug(project.title)}`}
                className="rounded-2xl border border-black/20 bg-white/30 p-6 transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="mt-2 opacity-75">{project.desc}</p>
              </Link>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link href="/work" className="rounded-full bg-black px-5 py-3 text-white">
              View all work
            </Link>
            <Link href="/academic" className="rounded-full border border-black px-5 py-3">
              Academic page
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

import SiteNav from '../components/SiteNav';
import { relatedProjects } from '../data/portfolio';
import Link from '../lib/Link';

export default function CaseStudyPage({ project }) {
  const mediaSrc = project.media?.src || project.bannerSrc;
  const external = project.link && project.link !== '#';
  const related = relatedProjects(project);
  const Icon = project.icon;

  return (
    <main className="min-h-screen bg-[#07070a] text-[#f4f0e6]">
      <SiteNav tone="dark" current="work" />

      <article className="mx-auto max-w-5xl px-5 pb-24 pt-24 sm:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#22d3ee]">
          Case study · {project.laneLabel} · {project.laneKicker}
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl">
          {project.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-white/65">{project.desc}</p>

        {mediaSrc ? (
          <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-black">
            <img src={mediaSrc} alt={project.title} className="max-h-[28rem] w-full object-cover" />
          </div>
        ) : null}

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.7fr)]">
          <div>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/40">What this is</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">{project.fullDesc || project.desc}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {external ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-black"
                >
                  {project.link.includes('arxiv.org') ? 'Paper' : project.link.includes('github.com') ? 'Code' : 'Write-up'}
                </a>
              ) : null}
              <Link
                href="/work"
                className="rounded-full border border-white/20 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-white/80"
              >
                All work
              </Link>
              <Link
                href={`/persona/${project.personaSlug}`}
                className="rounded-full border border-white/20 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-white/80"
              >
                {project.laneKicker}
              </Link>
            </div>
          </div>

          <aside className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-center gap-3">
              {Icon ? (
                <div className="rounded-lg bg-white/10 p-2">
                  <Icon size={18} />
                </div>
              ) : null}
              <p className="font-mono text-[11px] uppercase tracking-widest text-white/45">Stack and tags</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {(project.tags || []).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </aside>
        </div>

        {related.length > 0 ? (
          <section className="mt-20">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/40">More in {project.laneLabel}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/work/${item.slug}`}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-1 hover:border-white/30"
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#22d3ee]">{item.laneLabel}</p>
                  <h3 className="mt-2 text-lg font-bold leading-tight">{item.title}</h3>
                  <p className="mt-2 text-sm text-white/55">{item.desc}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </main>
  );
}

import { useMemo, useState } from 'react';
import SiteNav from '../components/SiteNav';
import { LANES, SIGNAL, allProjects } from '../data/portfolio';
import Link from '../lib/Link';

const FILTERS = [{ id: 'all', label: 'All' }, ...LANES.map((lane) => ({ id: lane.id, label: lane.label }))];

export default function WorkPage() {
  const [filter, setFilter] = useState('all');
  const projects = useMemo(() => {
    const list = allProjects();
    if (filter === 'all') return list;
    return list.filter((project) => project.laneId === filter);
  }, [filter]);

  return (
    <main className="min-h-screen bg-[#07070a] text-[#f4f0e6]">
      <SiteNav tone="dark" current="work" />

      <header className="border-b border-white/10 px-5 pb-12 pt-24 sm:px-10 lg:px-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/40">Personal / Work</p>
        <h1 className="mt-4 max-w-5xl font-sans text-6xl font-extrabold leading-[0.86] tracking-tight sm:text-8xl">
          Build log.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/65">
          Systems, vision, and quantum — the same person, three lanes. This is the dense index. Academic writing lives on the other page.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-full border border-white/20 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-white/80 hover:bg-white hover:text-black"
          >
            Index
          </Link>
          <Link
            href="/academic"
            className="rounded-full bg-white px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-black"
          >
            Academic page
          </Link>
        </div>
      </header>

      <section className="grid grid-cols-2 border-b border-white/10 sm:grid-cols-3 lg:grid-cols-6">
        {SIGNAL.map((item) => (
          <div key={item.label} className="border-r border-white/10 px-4 py-5 last:border-r-0 sm:px-5">
            <p className="font-mono text-lg font-semibold text-[#ff2e63] sm:text-xl">{item.value}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/40">{item.label}</p>
          </div>
        ))}
      </section>

      <div className="flex flex-wrap gap-2 px-5 py-6 sm:px-10 lg:px-16">
        {FILTERS.map((item) => {
          const active = filter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={`rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors ${
                active ? 'bg-white text-black' : 'border border-white/20 text-white/60 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <section className="grid gap-4 px-5 pb-24 sm:grid-cols-2 sm:px-10 lg:grid-cols-3 lg:px-16">
        {projects.map((project) => {
          const href = project.link && project.link !== '#' ? project.link : `/persona/${project.personaSlug}`;
          const mediaSrc = project.media?.src || project.bannerSrc;
          const external = href.startsWith('http');
          const CardTag = external ? 'a' : Link;
          const extra = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

          return (
            <CardTag
              key={`${project.laneId}-${project.title}`}
              href={href}
              {...extra}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:-translate-y-1 hover:border-white/30"
            >
              {mediaSrc ? (
                <div className="h-40 overflow-hidden bg-black">
                  <img
                    src={mediaSrc}
                    alt=""
                    className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                  />
                </div>
              ) : null}
              <div className="p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22d3ee]">
                  {project.laneLabel} · {project.laneKicker}
                </p>
                <h2 className="mt-2 text-xl font-bold leading-tight">{project.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{project.desc}</p>
              </div>
            </CardTag>
          );
        })}
      </section>
    </main>
  );
}

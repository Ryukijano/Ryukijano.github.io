import { useState } from 'react';
import SiteNav from '../components/SiteNav';
import { CV_URL } from '../data/portfolio';
import {
  ACADEMIC_BIO,
  ACADEMIC_PROFILES,
  EDUCATION,
  PUBLICATIONS,
  RESEARCH_INTERESTS,
  RESEARCH_TIMELINE,
} from '../data/publications';
import Link from '../lib/Link';

function PublicationEntry({ pub }) {
  const [showBibtex, setShowBibtex] = useState(false);

  return (
    <article className="border-b border-black/10 py-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/40">
            {pub.type} · {pub.year}
          </p>
          <h3 className="mt-2 font-serif text-xl leading-snug text-black sm:text-2xl">{pub.title}</h3>
          <p className="mt-2 font-mono text-sm text-black/50">
            {pub.authors.join(', ')} · {pub.venue}
          </p>
          {pub.note ? <p className="mt-2 text-sm italic text-black/70">{pub.note}</p> : null}
          <div className="mt-3 flex flex-wrap gap-2">
            {pub.tags.map((tag) => (
              <span
                key={tag}
                className="border border-black/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-black/45"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex shrink-0 flex-row gap-3 font-mono text-[11px] uppercase tracking-widest text-black/55 sm:flex-col sm:items-end sm:gap-1">
          {pub.pdfUrl ? (
            <a href={pub.pdfUrl} target="_blank" rel="noopener noreferrer" className="hover:text-black">
              PDF
            </a>
          ) : null}
          {pub.codeUrl ? (
            <a href={pub.codeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-black">
              Code
            </a>
          ) : null}
          <button type="button" onClick={() => setShowBibtex((open) => !open)} className="text-left hover:text-black">
            BibTeX
          </button>
        </div>
      </div>
      {showBibtex ? (
        <pre className="mt-4 overflow-x-auto whitespace-pre-wrap bg-black/[0.04] p-4 font-mono text-xs text-black/80">
          {pub.bibtex}
        </pre>
      ) : null}
    </article>
  );
}

export default function AcademicPage() {
  return (
    <main className="academic-page min-h-screen bg-[#f4f0e6] text-[#16140f]">
      <SiteNav tone="paper" current="academic" />

      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-24 pt-24 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-20 lg:px-12">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-black/40">Academic</p>
          <h1 className="mt-4 font-serif text-5xl leading-[0.92] sm:text-6xl">{ACADEMIC_BIO.name}</h1>
          <p className="mt-4 font-mono text-sm text-black/55">{ACADEMIC_BIO.role}</p>
          <p className="mt-8 max-w-md text-base leading-relaxed text-black/75">{ACADEMIC_BIO.statement}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-black px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-white"
            >
              Curriculum vitae
            </a>
            <Link
              href="/"
              className="rounded-full border border-black/25 px-5 py-2.5 font-mono text-xs uppercase tracking-widest"
            >
              Personal site
            </Link>
          </div>

          <ul className="mt-10 space-y-2 font-mono text-xs uppercase tracking-widest text-black/50">
            {ACADEMIC_PROFILES.orcid ? (
              <li>
                <a href={ACADEMIC_PROFILES.orcid} target="_blank" rel="noopener noreferrer" className="hover:text-black">
                  ORCID
                </a>
              </li>
            ) : null}
            {ACADEMIC_PROFILES.dblp ? (
              <li>
                <a href={ACADEMIC_PROFILES.dblp} target="_blank" rel="noopener noreferrer" className="hover:text-black">
                  DBLP
                </a>
              </li>
            ) : null}
            {ACADEMIC_PROFILES.github ? (
              <li>
                <a href={ACADEMIC_PROFILES.github} target="_blank" rel="noopener noreferrer" className="hover:text-black">
                  GitHub
                </a>
              </li>
            ) : null}
            {ACADEMIC_PROFILES.linkedin ? (
              <li>
                <a href={ACADEMIC_PROFILES.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-black">
                  LinkedIn
                </a>
              </li>
            ) : null}
            {ACADEMIC_PROFILES.wandb ? (
              <li>
                <a href={ACADEMIC_PROFILES.wandb} target="_blank" rel="noopener noreferrer" className="hover:text-black">
                  Weights & Biases
                </a>
              </li>
            ) : null}
          </ul>
        </aside>

        <div>
          <section>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.28em] text-black/40">Research interests</h2>
            <ul className="mt-5 space-y-2">
              {RESEARCH_INTERESTS.map((item) => (
                <li key={item} className="border-l border-black/20 pl-4 font-serif text-lg leading-snug">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-16">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.28em] text-black/40">Education</h2>
            {EDUCATION.map((entry) => (
              <div key={entry.title} className="mt-5 border-b border-black/10 pb-6">
                <p className="font-mono text-xs text-black/40">{entry.years}</p>
                <h3 className="mt-1 font-serif text-xl">{entry.title}</h3>
                <p className="mt-1 font-mono text-sm text-black/50">{entry.org}</p>
                <p className="mt-2 text-sm italic text-black/70">{entry.note}</p>
              </div>
            ))}
          </section>

          <section className="mt-16">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.28em] text-black/40">Publications</h2>
            <div className="mt-2">
              {PUBLICATIONS.map((pub) => (
                <PublicationEntry key={pub.title} pub={pub} />
              ))}
            </div>
          </section>

          <section className="mt-16">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.28em] text-black/40">Research timeline</h2>
            <div className="mt-4">
              {RESEARCH_TIMELINE.map((entry) => (
                <div key={`${entry.year}-${entry.title}`} className="flex gap-6 border-b border-black/10 py-5">
                  <div className="w-14 shrink-0 font-mono text-sm text-black/40">{entry.year}</div>
                  <div>
                    <h3 className="font-serif text-lg">{entry.title}</h3>
                    <p className="font-mono text-sm text-black/50">{entry.org}</p>
                    <p className="mt-1 text-sm italic text-black/70">{entry.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

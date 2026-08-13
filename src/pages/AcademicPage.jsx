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

function CopyBibtex({ text }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button type="button" onClick={copy} className="mt-2 underline-offset-4 hover:underline">
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

function PublicationEntry({ pub }) {
  const doiHref = pub.doi ? `https://doi.org/${pub.doi}` : null;

  return (
    <li className="-indent-8 mt-5 pl-8 leading-relaxed">
      {pub.authors.join(', ')}. {pub.title}. <em>{pub.venue}</em>, {pub.year}.
      {pub.pdfUrl ? (
        <>
          {' '}
          <a href={pub.pdfUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
            [pdf]
          </a>
        </>
      ) : null}
      {doiHref ? (
        <>
          {' '}
          <a href={doiHref} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
            [doi]
          </a>
        </>
      ) : null}
      {pub.codeUrl ? (
        <>
          {' '}
          <a href={pub.codeUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
            [code]
          </a>
        </>
      ) : null}
      {pub.note ? <div className="mt-1 indent-0">{pub.note}</div> : null}
      <div className="mt-1 indent-0">
        <details>
          <summary className="cursor-pointer underline-offset-4 hover:underline">BibTeX</summary>
          <pre className="mt-2 overflow-x-auto whitespace-pre-wrap text-sm opacity-80">{pub.bibtex}</pre>
          <CopyBibtex text={pub.bibtex} />
        </details>
      </div>
    </li>
  );
}

const HEADER_LINKS = [
  { href: CV_URL, label: 'CV', external: true },
  { href: '/work', label: 'Work', external: false },
  { href: ACADEMIC_PROFILES.orcid, label: 'ORCID', external: true },
  { href: ACADEMIC_PROFILES.github, label: 'GitHub', external: true },
].filter((item) => item.href);

export default function AcademicPage() {
  const degree = EDUCATION[0];

  return (
    <div className="min-h-screen bg-[#E6E1D3] font-serif text-[#1a237e]">
      <SiteNav variant="paper" />

      <main className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-4xl leading-tight">{ACADEMIC_BIO.name}</h1>
        <p className="mt-3">{ACADEMIC_BIO.role}</p>
        {degree ? (
          <p className="mt-1">
            {degree.title}, {degree.org}, {degree.years}
          </p>
        ) : null}
        <p className="mt-6 leading-relaxed">{ACADEMIC_BIO.statement}</p>

        <p className="mt-6">
          {HEADER_LINKS.map((item, index) => {
            const className = 'underline-offset-4 hover:underline';
            const link = item.external ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
                {item.label}
              </a>
            ) : (
              <Link href={item.href} className={className}>
                {item.label}
              </Link>
            );

            return (
              <span key={item.label}>
                {index > 0 ? <span aria-hidden="true"> · </span> : null}
                {link}
              </span>
            );
          })}
        </p>

        <section className="mt-14">
          <h2 className="text-xl">Research interests</h2>
          <p className="mt-4 leading-relaxed">{RESEARCH_INTERESTS.join(', ')}.</p>
        </section>

        <section className="mt-14">
          <h2 className="text-xl">Education</h2>
          <ul className="mt-4 space-y-6">
            {EDUCATION.map((entry) => (
              <li key={entry.title}>
                <div>{entry.title}</div>
                <div>{entry.org}</div>
                <div>{entry.years}</div>
                {entry.note ? <div>{entry.note}</div> : null}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-xl">Selected publications</h2>
          <ul className="mt-2 list-none">
            {PUBLICATIONS.map((pub) => (
              <PublicationEntry key={pub.title} pub={pub} />
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-xl">Timeline</h2>
          <ul className="mt-4 space-y-2">
            {RESEARCH_TIMELINE.map((entry) => (
              <li key={`${entry.year}-${entry.title}`} className="flex gap-6">
                <span className="w-12 shrink-0">{entry.year}</span>
                <span>
                  {entry.title}
                  {entry.org ? <>, {entry.org}</> : null}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

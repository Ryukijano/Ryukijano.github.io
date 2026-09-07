import { useState } from 'react';
import Atmosphere from '../components/Atmosphere';
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
    <button type="button" onClick={copy} className="print__ghost">
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

function PublicationEntry({ pub }) {
  const doiHref = pub.doi ? `https://doi.org/${pub.doi}` : null;

  return (
    <li className="print__pub">
      {pub.authors.join(', ')}. {pub.title}. <em>{pub.venue}</em>, {pub.year}.
      {pub.pdfUrl ? (
        <>
          {' '}
          <a href={pub.pdfUrl} target="_blank" rel="noopener noreferrer">
            [pdf]
          </a>
        </>
      ) : null}
      {doiHref ? (
        <>
          {' '}
          <a href={doiHref} target="_blank" rel="noopener noreferrer">
            [doi]
          </a>
        </>
      ) : null}
      {pub.codeUrl ? (
        <>
          {' '}
          <a href={pub.codeUrl} target="_blank" rel="noopener noreferrer">
            [code]
          </a>
        </>
      ) : null}
      {pub.note ? <div className="print__pub-note">{pub.note}</div> : null}
      <div className="print__pub-note">
        <details>
          <summary>BibTeX</summary>
          <pre>{pub.bibtex}</pre>
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
    <div className="print">
      <Atmosphere variant="quiet" />
      <SiteNav />

      <main id="main" tabIndex={-1} className="route print__body print__body--narrow">
        <h1 className="print__name">{ACADEMIC_BIO.name}</h1>
        <p className="print__role">{ACADEMIC_BIO.role}</p>
        {degree ? (
          <p className="print__role">
            {degree.title}, {degree.org}, {degree.years}
          </p>
        ) : null}
        <p className="print__lede">{ACADEMIC_BIO.statement}</p>

        <p className="print__links">
          {HEADER_LINKS.map((item, index) => {
            const link = item.external ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                {item.label}
              </a>
            ) : (
              <Link href={item.href}>{item.label}</Link>
            );

            return (
              <span key={item.label}>
                {index > 0 ? <span aria-hidden="true"> · </span> : null}
                {link}
              </span>
            );
          })}
        </p>

        <section className="print__section">
          <h2>Research interests</h2>
          <p>{RESEARCH_INTERESTS.join(', ')}.</p>
        </section>

        <section className="print__section">
          <h2>Education</h2>
          <ul role="list" className="print__stack">
            {EDUCATION.map((entry) => (
              <li key={entry.title}>
                <div>{entry.title}</div>
                <div>{entry.org}</div>
                <div>{entry.years}</div>
                {entry.note ? <div className="print__note">{entry.note}</div> : null}
              </li>
            ))}
          </ul>
        </section>

        <section className="print__section">
          <h2>Selected publications</h2>
          <ul role="list" className="print__pubs">
            {PUBLICATIONS.map((pub) => (
              <PublicationEntry key={pub.title} pub={pub} />
            ))}
          </ul>
        </section>

        <section className="print__section">
          <h2>Timeline</h2>
          <ul role="list" className="print__timeline">
            {RESEARCH_TIMELINE.map((entry) => (
              <li key={`${entry.year}-${entry.title}`}>
                <span>{entry.year}</span>
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

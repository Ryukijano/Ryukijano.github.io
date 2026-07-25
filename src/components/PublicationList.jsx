import { useState } from 'react';
import { PUBLICATIONS, RESEARCH_TIMELINE, ACADEMIC_PROFILES } from '../data/publications';

// --- Publication List: BibTeX-style academic index ---
const PublicationEntry = ({ pub }) => {
  const [showBibtex, setShowBibtex] = useState(false);

  return (
    <div className="border-b border-black/10 py-6 group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-serif text-black leading-snug">{pub.title}</h3>
          <p className="text-sm font-mono text-black/50 mt-1">
            {pub.authors.join(', ')} &middot; {pub.venue} &middot; {pub.year}
          </p>
          <div className="flex gap-2 mt-2 flex-wrap">
            {pub.tags.map((tag) => (
              <span key={tag} className="text-[10px] uppercase tracking-wider text-black/40 border border-black/10 px-2 py-0.5">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 text-xs font-mono uppercase tracking-wider whitespace-nowrap">
          {pub.pdfUrl && (
            <a href={pub.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-black/60 hover:text-black transition-colors">
              PDF
            </a>
          )}
          {pub.codeUrl && (
            <a href={pub.codeUrl} target="_blank" rel="noopener noreferrer" className="text-black/60 hover:text-black transition-colors">
              Code
            </a>
          )}
          <button onClick={() => setShowBibtex((s) => !s)} className="text-black/60 hover:text-black transition-colors">
            BibTeX
          </button>
        </div>
      </div>
      {showBibtex && (
        <pre className="mt-4 bg-black/5 p-4 text-xs font-mono overflow-x-auto whitespace-pre-wrap">
          {pub.bibtex}
        </pre>
      )}
    </div>
  );
};

const TimelineEntry = ({ entry }) => (
  <div className="flex gap-6 py-4 border-b border-black/10">
    <div className="w-16 shrink-0 font-mono text-sm text-black/40">{entry.year}</div>
    <div>
      <h4 className="font-serif text-base text-black">{entry.title}</h4>
      <p className="text-sm font-mono text-black/50">{entry.org}</p>
      <p className="text-sm text-black/70 mt-1 italic">{entry.desc}</p>
    </div>
  </div>
);

const PublicationList = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <section>
        <h2 className="text-xs uppercase tracking-widest text-black/40 mb-6">Publications</h2>
        {PUBLICATIONS.map((pub) => (
          <PublicationEntry key={pub.title} pub={pub} />
        ))}
      </section>

      <section className="mt-16">
        <h2 className="text-xs uppercase tracking-widest text-black/40 mb-6">Research Timeline</h2>
        {RESEARCH_TIMELINE.map((entry) => (
          <TimelineEntry key={`${entry.year}-${entry.title}`} entry={entry} />
        ))}
      </section>

      <section className="mt-16 flex gap-6 font-mono text-xs uppercase tracking-wider text-black/50">
        {ACADEMIC_PROFILES.orcid && (
          <a href={ACADEMIC_PROFILES.orcid} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">ORCID</a>
        )}
        {ACADEMIC_PROFILES.dblp && (
          <a href={ACADEMIC_PROFILES.dblp} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">DBLP</a>
        )}
        {ACADEMIC_PROFILES.linkedin && (
          <a href={ACADEMIC_PROFILES.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">LinkedIn</a>
        )}
      </section>
    </div>
  );
};

export default PublicationList;

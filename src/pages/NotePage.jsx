import Atmosphere from '../components/Atmosphere';
import SiteFooter from '../components/SiteFooter';
import SiteNav from '../components/SiteNav';
import Link from '../lib/Link';
import { useNote } from '../lib/article';
import { navigate } from '../lib/navigation';
import NotFoundPage from './NotFoundPage';

/** Links inside the compiled Markdown are plain anchors; route the internal ones the way <Link> does. */
function followInternal(event) {
  const anchor = event.target.closest?.('a[href^="/"]');
  if (!anchor) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
  event.preventDefault();
  navigate(anchor.getAttribute('href'));
}

/**
 * A note: the quietest sheet, for reading rather than evidence. The markup is
 * the note shape in .opencode/skills/paper-ink/references/route-shapes.md.
 */
export default function NotePage({ note }) {
  const article = useNote(note?.slug);

  if (!note) return <NotFoundPage />;

  return (
    <div className="print">
      <Atmosphere variant="quiet" />
      <SiteNav />

      <article id="main" tabIndex={-1} className="route print__body note">
        <p className="print__crumb">
          <Link href="/">Home</Link>
        </p>

        <div className="note__kicker pi-label">
          <span>{note.kicker}</span>
          <span className="tick" aria-hidden="true" />
          <span>{note.date}</span>
          <span style={{ marginLeft: 'auto' }}>Note {String(note.number).padStart(2, '0')}</span>
        </div>

        <h1 className="print__title" style={{ marginTop: 'var(--space-3)' }}>
          {note.title}
        </h1>
        <p className="note__standfirst">{note.standfirst}</p>
        <hr />

        {/* While the text is loading on a client-side navigation (undefined),
            nothing, so the sheet never shows a placeholder and then swaps it. */}
        {article ? (
          <div
            className="note__body article"
            onClick={followInternal}
            dangerouslySetInnerHTML={{ __html: article.chunks.join('') }}
          />
        ) : null}

        <p className="pi-label">Scope · {note.scope}</p>
      </article>
      <SiteFooter />
    </div>
  );
}

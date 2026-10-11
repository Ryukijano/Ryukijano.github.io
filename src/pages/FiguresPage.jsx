import Atmosphere from '../components/Atmosphere';
import PinnedFigure from '../components/PinnedFigure';
import SiteFooter from '../components/SiteFooter';
import SiteNav from '../components/SiteNav';
import { GALLERY_CASE_STUDIES, GALLERY_STUDIES } from '../data/figures';
import { findProject, projectFigures } from '../data/portfolio';
import Link from '../lib/Link';

function caseCard([slug, n]) {
  const project = findProject(slug);
  const figure = project ? projectFigures(project)[n - 1] : null;
  if (!project || !figure) return null;
  // The still, never the loop: a gallery of GIFs would move on its own.
  const still = { ...figure, src: figure.poster ?? figure.src, poster: undefined, sources: [] };
  return { key: `${slug}-${n}`, figure: still, from: { href: `/work/${project.slug}`, label: project.title } };
}

export default function FiguresPage() {
  const cases = GALLERY_CASE_STUDIES.map(caseCard).filter(Boolean);
  const cards = [
    ...cases.map((card) => ({ ...card, art: null })),
    ...GALLERY_STUDIES.map((study) => ({ key: study.id, figure: study, art: study.art, from: null })),
  ];

  return (
    <div className="print print--wide">
      <Atmosphere variant="quiet" />
      <SiteNav />

      <main id="main" tabIndex={-1} className="route print__body print__body--wide">
        <p className="print__crumb">
          <Link href="/work">Work</Link>
        </p>
        <header>
          <p className="print__kicker">Pinned pictures</p>
          <h1 className="print__title" style={{ marginTop: '0.75rem' }}>
            Pinned figures
          </h1>
          <p className="print__lede print__lede--muted">
            The same figures, pinned to the sheet instead of hung in it. Six come from the
            case studies with their captions and scopes untouched; three are studies I
            redrew after pinned references, and they are not results.
          </p>
        </header>

        <div className="gallery">
          {cards.map((card, i) => (
            <PinnedFigure
              key={card.key}
              figure={card.figure}
              art={card.art}
              index={i + 1}
              from={card.from}
            />
          ))}
        </div>

        <p className="pi-label" style={{ marginTop: 'var(--space-6)' }}>
          Six figures kept with their captions and scopes. Three studies, drawn from geometry.
        </p>

        <nav className="print__foot" aria-label="Other pages">
          <Link href="/work">Work</Link>
          <span aria-hidden="true"> · </span>
          <Link href="/tools">Tools</Link>
          <span aria-hidden="true"> · </span>
          <Link href="/academic">Academic</Link>
          <span aria-hidden="true"> · </span>
          <Link href="/">Home</Link>
        </nav>
      </main>
      <SiteFooter />
    </div>
  );
}

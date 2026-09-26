import Atmosphere from '../components/Atmosphere';
import SiteNav from '../components/SiteNav';
import Link from '../lib/Link';

/**
 * The one not-found sheet. 404.html is prerendered from it, and a missing
 * project slug renders it too, so what GitHub Pages serves for /work/<typo>
 * is the same markup React hydrates.
 */
export default function NotFoundPage() {
  return (
    <div className="print">
      <Atmosphere variant="quiet" />
      <SiteNav />
      <main id="main" tabIndex={-1} className="route print__body print__body--narrow">
        <p className="print__kicker">404</p>
        <h1 className="print__title" style={{ marginTop: '0.75rem' }}>
          This path isn&apos;t on the site.
        </h1>
        <nav className="print__foot" aria-label="Other pages">
          <Link href="/">Home</Link>
          <span aria-hidden="true"> · </span>
          <Link href="/work">Work</Link>
          <span aria-hidden="true"> · </span>
          <Link href="/academic">Academic</Link>
        </nav>
      </main>
    </div>
  );
}

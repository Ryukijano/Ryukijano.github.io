import { CV_URL } from '../data/portfolio';
import Link from '../lib/Link';
import { usePath } from '../lib/usePath';

export default function SiteNav({ overlay = false, hideWordmark = false }) {
  const path = usePath();
  const workActive = path === '/work' || path.startsWith('/work/');
  const academicActive = path === '/academic';

  return (
    <nav aria-label="Site" className={`site-nav${overlay ? ' site-nav--veil' : ''}`}>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="site-nav__bar">
        {hideWordmark ? (
          <span aria-hidden="true" />
        ) : (
          <Link href="/" className="site-nav__wordmark">
            Gyanateet Dutta
          </Link>
        )}
        <div className="site-nav__links">
          <Link href="/work" aria-current={workActive ? 'page' : undefined} className={workActive ? 'is-active' : ''}>
            Work
          </Link>
          <span aria-hidden="true">·</span>
          <Link
            href="/academic"
            aria-current={academicActive ? 'page' : undefined}
            className={academicActive ? 'is-active' : ''}
          >
            Academic
          </Link>
          <span aria-hidden="true">·</span>
          <a href={CV_URL}>CV</a>
        </div>
      </div>
    </nav>
  );
}

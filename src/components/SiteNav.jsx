import { useEffect, useState } from 'react';
import { CV_URL } from '../data/portfolio';
import Link from '../lib/Link';
import { usePath } from '../lib/usePath';

function savedTheme() {
  try { return localStorage.getItem('site-theme'); } catch { return null; }
}

function storeTheme(theme) {
  try { localStorage.setItem('site-theme', theme); } catch { return; }
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#101b2b' : '#f4f2ed');
}

export default function SiteNav({ overlay = false, hideWordmark = false }) {
  const path = usePath();
  const [theme, setTheme] = useState('light');
  const workActive = path === '/work' || path.startsWith('/work/');
  const academicActive = path === '/academic';

  useEffect(() => {
    const preference = window.matchMedia('(prefers-color-scheme: dark)');
    const sync = () => {
      const saved = savedTheme();
      const next = saved === 'dark' || saved === 'light' ? saved : preference.matches ? 'dark' : 'light';
      applyTheme(next);
      setTheme(next);
    };
    sync();
    preference.addEventListener('change', sync);
    return () => preference.removeEventListener('change', sync);
  }, []);

  function toggleTheme() {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    storeTheme(next);
    setTheme(next);
  }

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
          <button
            type="button"
            className="site-nav__theme"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>
    </nav>
  );
}

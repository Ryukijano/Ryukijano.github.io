import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { CV_URL, SITE_NAME } from '../content/site.js';
import { setSiteMode, useSiteMode } from '../lib/mode.js';

function ModeToggle() {
  const mode = useSiteMode();
  const next = mode === 'dark' ? 'light' : 'dark';
  const label = `Switch to ${next} theme`;
  return (
    <button
      type="button"
      className="site-nav__mode"
      onClick={() => setSiteMode(next)}
      aria-label={label}
      title={label}
    >
      {mode === 'dark' ? (
        <Sun size={14} strokeWidth={1.75} aria-hidden="true" />
      ) : (
        <Moon size={14} strokeWidth={1.75} aria-hidden="true" />
      )}
    </button>
  );
}

function variantClass(variant) {
  switch (variant) {
    case 'paper':
      return 'site-nav--paper';
    case 'ink':
      return 'site-nav--ink';
    case 'veil':
      return 'site-nav--paper site-nav--veil';
    default: {
      const _exhaustive = variant;
      void _exhaustive;
      return 'site-nav--ink';
    }
  }
}

export default function SiteNav({ variant = 'ink', overlay = false }) {
  const { pathname } = useLocation();
  const workOn = pathname === '/work' || pathname.startsWith('/work/');
  const academicOn = pathname === '/academic';
  const notesOn = pathname === '/blog' || pathname.startsWith('/blog/');
  const className = [
    'site-nav',
    variantClass(variant),
    overlay ? 'site-nav--overlay' : 'site-nav--sticky',
  ].join(' ');

  return (
    <nav className={className} aria-label="Site">
      <Link to="/" className="site-nav__wordmark">
        {SITE_NAME}
      </Link>
      <div className="site-nav__links">
        <Link
          to="/work"
          className={workOn ? 'is-active' : undefined}
          aria-current={workOn ? 'page' : undefined}
        >
          Work
        </Link>
        <span aria-hidden="true"> · </span>
        <Link
          to="/academic"
          className={academicOn ? 'is-active' : undefined}
          aria-current={academicOn ? 'page' : undefined}
        >
          Academic
        </Link>
        {!overlay ? (
          <>
            <span aria-hidden="true"> · </span>
            <Link
              to="/blog"
              className={notesOn ? 'is-active' : undefined}
              aria-current={notesOn ? 'page' : undefined}
            >
              Notes
            </Link>
          </>
        ) : null}
        <span aria-hidden="true"> · </span>
        <a href={CV_URL}>CV</a>
        <ModeToggle />
      </div>
    </nav>
  );
}

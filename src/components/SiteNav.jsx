import { CV_URL } from '../data/portfolio';
import Link from '../lib/Link';

const LINKS = [
  { href: '/', label: 'Personal', match: 'personal' },
  { href: '/work', label: 'Work', match: 'work' },
  { href: '/academic', label: 'Academic', match: 'academic' },
];

export default function SiteNav({ tone = 'dark', current = 'personal' }) {
  const dark = tone === 'dark';

  return (
    <nav
      className={`fixed top-3 right-3 sm:top-4 sm:right-4 z-50 flex items-center gap-1 rounded-full px-1 py-1 font-mono text-[11px] sm:text-xs uppercase tracking-widest shadow-lg backdrop-blur-md ${
        dark ? 'bg-white/90 text-black' : 'bg-black/90 text-white'
      }`}
      aria-label="Site"
    >
      {LINKS.map((link) => {
        const active = current === link.match;
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? 'page' : undefined}
            className={`rounded-full px-3 py-1.5 transition-colors ${
              active
                ? dark
                  ? 'bg-black text-white'
                  : 'bg-white text-black'
                : dark
                  ? 'text-black/50 hover:text-black'
                  : 'text-white/55 hover:text-white'
            }`}
          >
            {link.label}
          </Link>
        );
      })}
      <a
        href={CV_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`rounded-full px-3 py-1.5 transition-colors ${
          dark ? 'text-black/50 hover:text-black' : 'text-white/55 hover:text-white'
        }`}
      >
        CV
      </a>
    </nav>
  );
}

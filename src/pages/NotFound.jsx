import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { parseStyle } from '../lib/style.js';
import { Text, Theme } from '../components/m3/index.jsx';
import SiteNav from '../components/SiteNav.jsx';
import Atmosphere from '../components/Atmosphere.jsx';

const SERIF = '--m3-font:var(--md-sys-typescale-brand-font)';
const MONO = '--m3-font:var(--md-sys-typescale-mono-font)';
const MUTED = 'color:var(--md-sys-color-on-surface-variant)';
const INK = 'color:var(--md-sys-color-on-surface)';

const linkStyle = parseStyle(
  'color:var(--md-sys-color-primary);text-decoration:none;' +
    'border-bottom:1px solid color-mix(in srgb, var(--md-sys-color-primary) 35%, transparent)',
);

/*
 * The archivist register: the missing path is a record that cannot be
 * produced, and the response says what IS held instead of only what is not.
 * The phrase "isn't on the site" is asserted by ssr-smoke.jsx and stays.
 */
export default function NotFound() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = 'No record at this address — Gyanateet Dutta';
  }, []);

  return (
    <Theme
      name="study-dark"
      style={parseStyle(
        'position:relative;min-height:100vh;background:var(--md-sys-color-surface);' +
          'color:var(--md-sys-color-on-surface);' +
          'font-family:var(--md-sys-typescale-brand-font);-webkit-font-smoothing:antialiased',
      )}
    >
      <Atmosphere />
      <SiteNav variant="ink" />
      <main style={parseStyle('position:relative;z-index:1;max-width:42rem;margin:0 auto;padding:4rem 1.5rem 6rem')}>
        <Text as="p" role="label-large" style={parseStyle(`${MONO};${MUTED};margin:0`)}>
          404
        </Text>
        <Text as="h1" role="headline-large" style={parseStyle(`${INK};margin:1rem 0 0`)}>
          No record at this address.
        </Text>
        <Text as="p" role="body-large" style={parseStyle(`${SERIF};${INK};margin:1.5rem 0 0;line-height:1.65`)}>
          This path isn't on the site, so there is nothing to produce
          {pathname && pathname !== '/' ? (
            <>
              {' — '}
              <span style={parseStyle(`${MONO};font-size:0.85em`)}>{pathname}</span>
              {' was never catalogued'}
            </>
          ) : null}
          . What is filed here: eleven projects, a set of field notes, and the academic record.
        </Text>
        <p style={parseStyle(`${SERIF};${MUTED};margin:2rem 0 0`)}>
          Held elsewhere on this site:{' '}
          <Link to="/work" style={linkStyle}>
            Work
          </Link>
          <span aria-hidden="true"> · </span>
          <Link to="/academic" style={linkStyle}>
            Academic
          </Link>
          <span aria-hidden="true"> · </span>
          <Link to="/blog" style={linkStyle}>
            Notes
          </Link>
          <span aria-hidden="true"> · </span>
          <Link to="/" style={linkStyle}>
            Home
          </Link>
        </p>
      </main>
    </Theme>
  );
}

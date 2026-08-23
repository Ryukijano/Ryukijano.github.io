import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { parseStyle } from '../lib/style.js';
import { Text, Theme } from '../components/m3/index.jsx';
import SiteNav from '../components/SiteNav.jsx';
import Atmosphere from '../components/Atmosphere.jsx';

const SERIF = '--m3-font:var(--md-sys-typescale-brand-font)';
const MUTED = 'color:var(--md-sys-color-on-surface-variant)';
const INK = 'color:var(--md-sys-color-on-surface)';

const linkStyle = parseStyle(
  'color:var(--md-sys-color-primary);text-decoration:none;' +
    'border-bottom:1px solid color-mix(in srgb, var(--md-sys-color-primary) 35%, transparent)',
);

export default function NotFound() {
  useEffect(() => {
    document.title = "This path isn't on the site. — Gyanateet Dutta";
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
        <Text as="p" role="label-large" style={parseStyle(`${MUTED};margin:0`)}>
          404
        </Text>
        <Text as="h1" role="headline-large" style={parseStyle(`${INK};margin:1rem 0 0`)}>
          This path isn't on the site.
        </Text>
        <p style={parseStyle(`${SERIF};margin:2rem 0 0`)}>
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

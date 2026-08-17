import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Text, Theme } from '../components/m3/index.jsx';
import SiteNav from '../components/SiteNav.jsx';
import { curriculum, notes } from '../content/blog/index.js';

const HAIRLINE = '1px solid var(--md-sys-color-outline-variant)';

const MONO = {
  '--m3-font': 'var(--md-sys-typescale-mono-font)',
  fontVariantNumeric: 'tabular-nums',
};

const SERIF = {
  '--m3-font': 'var(--md-sys-typescale-brand-font)',
  '--m3-lh': 1.3,
};

const FACTS = [
  { dt: 'Notes', dd: String(notes.length) },
  { dt: 'Written', dd: '2026' },
  { dt: 'Areas', dd: String(new Set(notes.map((note) => note.area)).size) },
];

export default function BlogIndex() {
  useEffect(() => {
    document.title = 'Notes — Gyanateet Dutta';
  }, []);

  return (
    <Theme name="study" style={rootStyle}>
      <SiteNav variant="paper" />
      <main className="notes-index">
        <header style={headerStyle}>
          <Text as="h1" role="display-small" style={{ margin: 0 }}>
            Notes
          </Text>
          <Text as="p" role="title-large" style={leadStyle}>
            How the learning areas work. Projects are domains, not the plot. I met
            them as theatre video, then robot actions, then a state I could not look
            at, then a score instead of a demonstration.
          </Text>
          <dl style={factsStyle}>
            {FACTS.map((fact) => (
              <div key={fact.dt}>
                <Text
                  as="dt"
                  role="label-small"
                  style={{ color: 'var(--md-sys-color-on-surface-variant)', margin: '0 0 6px' }}
                >
                  {fact.dt}
                </Text>
                <Text as="dd" role="title-medium" style={{ ...MONO, margin: 0 }}>
                  {fact.dd}
                </Text>
              </div>
            ))}
          </dl>
        </header>

        <section style={mapStyle} aria-labelledby="curriculum-heading">
          <Text as="h2" role="title-small" style={{ margin: 0 }} id="curriculum-heading">
            How the object changed
          </Text>
          <Text as="p" role="body-small" style={mapCaptionStyle}>
            Theatre video, then action chunks, then a state I could not look at, then
            an energy instead of a demonstration. Schematic of that path. Framing, not
            a survey.
          </Text>
          <ol style={listStyle}>
            {curriculum.map((row) => (
              <li key={row.slug} className="notes-index__map-row">
                <Link to={`/blog/${row.slug}`} className="m3-state" style={titleLinkStyle}>
                  <Text as="span" role="title-small" style={SERIF}>
                    {row.layer}
                  </Text>
                </Link>
                <Text as="span" role="body-small" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
                  {row.changes}
                </Text>
              </li>
            ))}
          </ol>
        </section>

        <ul aria-label="Field notes" style={listStyle}>
          {notes.map((note) => (
            <li key={note.slug} className="notes-index__row">
              <Text
                as="span"
                role="label-medium"
                style={{ ...MONO, color: 'var(--md-sys-color-on-surface-variant)' }}
              >
                {note.written}
              </Text>
              <Link to={`/blog/${note.slug}`} className="m3-state" style={titleLinkStyle}>
                <Text as="span" role="title-medium" style={SERIF}>
                  {note.title}
                </Text>
              </Link>
              <Text as="span" role="label-medium" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
                {note.area}
              </Text>
              <Text as="span" role="body-small" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
                {note.desc}
              </Text>
            </li>
          ))}
        </ul>

        <footer style={footerStyle}>
          <Text as="p" role="body-small" style={{ color: 'var(--md-sys-color-on-surface-variant)', margin: 0 }}>
            <Link to="/work" className="m3-state" style={footLinkStyle}>
              Work
            </Link>
            {' · '}
            <Link to="/academic" className="m3-state" style={footLinkStyle}>
              Academic
            </Link>
          </Text>
        </footer>
      </main>
    </Theme>
  );
}

const rootStyle = {
  minHeight: '100vh',
  background: 'var(--md-sys-color-surface)',
  color: 'var(--md-sys-color-on-surface)',
  fontFamily: 'var(--md-sys-typescale-plain-font)',
  WebkitFontSmoothing: 'antialiased',
};

const headerStyle = {
  padding: '56px 0 0',
};

const leadStyle = {
  color: 'var(--md-sys-color-on-surface-variant)',
  maxWidth: '36em',
  margin: '16px 0 0',
  lineHeight: 1.45,
};

const factsStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: '20px',
  margin: '40px 0 0',
  padding: '18px 0',
  borderTop: HAIRLINE,
  borderBottom: HAIRLINE,
};

const mapStyle = {
  margin: '40px 0 0',
};

const mapCaptionStyle = {
  color: 'var(--md-sys-color-on-surface-variant)',
  margin: '8px 0 16px',
  maxWidth: '36em',
};

const listStyle = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
};

const titleLinkStyle = {
  textDecoration: 'none',
  color: 'var(--md-sys-color-on-surface)',
  borderRadius: 'var(--md-sys-shape-corner-extra-small)',
  minWidth: 0,
};

const footLinkStyle = {
  color: 'inherit',
  textDecoration: 'none',
  borderRadius: 'var(--md-sys-shape-corner-extra-small)',
};

const footerStyle = {
  margin: '64px 0 0',
};

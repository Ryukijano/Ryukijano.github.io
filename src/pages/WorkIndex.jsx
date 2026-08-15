import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Text, Theme } from '../components/m3/index.jsx';
import SiteNav from '../components/SiteNav.jsx';
import { alsoStudies, caseStudies, featuredStudies } from '../content/caseStudies/index.js';

/**
 * /work — a Distill-like dated index of notes, not a landing page.
 *
 * Featured rows are the eight studies worth leading with. Everything else
 * sits under Also. The four GIF strand sections, the fake terminal, the
 * affiliation chips and the method-transfer matrix are not on this page.
 */
const THEME = 'study-dark';

const HAIRLINE = '1px solid var(--md-sys-color-outline-variant)';

const YEARS = caseStudies.map((s) => s.year).filter((y) => y != null);
const YEAR_SPAN = YEARS.length ? `${Math.min(...YEARS)}–${Math.max(...YEARS)}` : '';
const LANES = [...new Set(caseStudies.map((s) => s.lane).filter(Boolean))].sort().join(' · ');

const FACTS = [
  { dt: 'Notes', dd: String(caseStudies.length) },
  { dt: 'Span', dd: YEAR_SPAN },
  { dt: 'Lanes', dd: LANES },
];

const MONO = {
  '--m3-font': 'var(--md-sys-typescale-mono-font)',
  fontVariantNumeric: 'tabular-nums',
};

const SERIF = {
  '--m3-font': 'var(--md-sys-typescale-brand-font)',
  '--m3-lh': 1.3,
};

export default function WorkIndex() {
  useEffect(() => {
    document.title = 'Selected work — Gyanateet Dutta';
  }, []);

  return (
    <Theme name={THEME} style={rootStyle}>
      <SiteNav variant="ink" />

      <main style={mainStyle}>
        <header style={headerStyle}>
          <Text as="h1" role="display-small" style={{ margin: 0 }}>
            Work
          </Text>
          <Text as="p" role="title-large" style={leadStyle}>
            Eleven notes. Papers are on Academic.
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

        <ul aria-label="Featured notes" style={listStyle}>
          {featuredStudies.map((study) => (
            <li key={study.slug} style={featuredRowStyle}>
              <Text as="span" role="label-medium" style={{ ...MONO, color: 'var(--md-sys-color-on-surface-variant)' }}>
                {study.year}
              </Text>
              <Link to={`/work/${study.slug}`} className="m3-state" style={titleLinkStyle}>
                <Text as="span" role="title-medium" style={SERIF}>
                  {study.name}
                </Text>
              </Link>
              <Text as="span" role="label-medium" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
                {study.lane}
              </Text>
              <Text as="span" role="body-small" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
                {study.desc}
              </Text>
            </li>
          ))}
        </ul>

        <Text as="h2" role="headline-small" style={alsoHeadingStyle}>
          Also
        </Text>
        <ul aria-label="Also" style={listStyle}>
          {alsoStudies.map((study) => (
            <li key={study.slug} style={alsoRowStyle}>
              <Text as="span" role="label-medium" style={{ ...MONO, color: 'var(--md-sys-color-on-surface-variant)' }}>
                {study.year}
              </Text>
              <Link to={`/work/${study.slug}`} className="m3-state" style={titleLinkStyle}>
                <Text as="span" role="title-medium" style={SERIF}>
                  {study.name}
                </Text>
              </Link>
            </li>
          ))}
        </ul>

        <footer style={footerStyle}>
          <Text as="p" role="body-small" style={{ color: 'var(--md-sys-color-on-surface-variant)', margin: 0 }}>
            <Link to="/academic" className="m3-state" style={footLinkStyle}>
              Academic record
            </Link>
            {' · '}
            <Link to="/trust" className="m3-state" style={footLinkStyle}>
              What we trust
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

const mainStyle = {
  maxWidth: '940px',
  margin: '0 auto',
  padding: '0 40px 120px',
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

const listStyle = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
};

const featuredRowStyle = {
  display: 'grid',
  gridTemplateColumns: '4.25rem minmax(8rem, 1.15fr) 5.75rem minmax(8rem, 1.4fr)',
  gap: '12px 20px',
  alignItems: 'baseline',
  padding: '14px 0',
  borderBottom: HAIRLINE,
};

const alsoRowStyle = {
  display: 'grid',
  gridTemplateColumns: '4.25rem 1fr',
  gap: '12px 20px',
  alignItems: 'baseline',
  padding: '12px 0',
  borderBottom: HAIRLINE,
};

const alsoHeadingStyle = {
  margin: '56px 0 8px',
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

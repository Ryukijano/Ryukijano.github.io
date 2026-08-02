import { Link } from 'react-router-dom';
import { parseStyle } from '../lib/style.js';
import { Divider, Text, Theme } from './m3/index.jsx';
import useReveal, { RevealContext } from './useReveal.js';
import MediaFigure from './MediaFigure.jsx';

/**
 * The case-study page shell: breadcrumb nav, hero, meta bar, the hero figure,
 * whatever numbered sections the page supplies, then the next-links footer.
 *
 * `sectionCount` is the number of reveal slots the page uses. It matches
 * SECTION_COUNT in the corresponding .dc.html script block, and slot 0 is
 * always the hero.
 *
 * Theme is `study` — the LIGHT terracotta ramp. A case study is a long-form
 * reading page: warm paper, near-black ink, and the widest text contrast the
 * ramp offers, which is what ten minutes of prose wants. The dark ramps belong
 * to the index and the triptych, which are looked at rather than read.
 */
export default function CaseStudy({ study, sectionCount = 6, children }) {
  const reveal = useReveal(sectionCount);

  return (
    <Theme name="study" style={shellStyle}>
      <article style={{ maxWidth: '940px', margin: '0 auto', padding: '0 40px' }}>
        <Nav breadcrumb={study.breadcrumb} />

        <section
          ref={reveal.attach(0)}
          style={parseStyle(reveal.style(0) + REVEAL_MOTION)}
        >
          <div style={{ padding: '72px 0 0' }}>
            <Text as="p" role="label-medium" style={kickerStyle}>
              {study.kicker}
            </Text>
            <Text as="h1" role="display-medium" emphasized style={titleStyle}>
              {study.title}
            </Text>
            <Text as="p" role="title-large" style={leadStyle}>
              {study.lead}
            </Text>
          </div>
          <MetaBar items={study.meta} />
        </section>

        {study.hero ? (
          <section style={{ padding: '56px 0 0' }}>
            <MediaFigure
              src={study.hero.src}
              alt={study.hero.alt}
              caption={study.hero.caption}
              highlight={study.hero.highlight}
              lazy={false}
            />
          </section>
        ) : null}

        <RevealContext.Provider value={reveal}>{children}</RevealContext.Provider>

        <Divider />

        <NextLinks items={study.next} />
      </article>
    </Theme>
  );
}

/* Same split as Section.jsx: fades ride an effects spring, movement rides a
 * spatial one. useReveal only knows how to emit one pair for both. */
const REVEAL_MOTION =
  ';transition:' +
  'opacity var(--md-sys-motion-duration-expressive-slow-effects) ' +
  'var(--md-sys-motion-spring-expressive-slow-effects),' +
  'transform var(--md-sys-motion-duration-expressive-slow-spatial) ' +
  'var(--md-sys-motion-spring-expressive-slow-spatial)';

/** Mono with tabular numerals: years, counts and stack strings must align. */
const mono = (extra) => ({
  '--m3-font': 'var(--md-sys-typescale-mono-font)',
  fontVariantNumeric: 'tabular-nums',
  ...extra,
});

const shellStyle = {
  minHeight: '100vh',
  background: 'var(--md-sys-color-surface)',
  color: 'var(--md-sys-color-on-surface)',
  fontFamily: 'var(--md-sys-typescale-plain-font)',
  WebkitFontSmoothing: 'antialiased',
};

const kickerStyle = mono({
  color: 'var(--md-sys-color-primary)',
  letterSpacing: '0.14em',
  margin: '0 0 22px',
});

const titleStyle = { margin: '0 0 24px', maxWidth: '20ch' };

/*
 * The lead sits between display and body, so it takes title-large in the
 * plain face — but title-* leading is drawn for one-line strings and this is
 * a five-line paragraph, so it gets reading leading instead.
 */
const leadStyle = {
  color: 'var(--md-sys-color-on-surface-variant)',
  lineHeight: 1.5,
  maxWidth: '60ch',
  margin: 0,
};

function Nav({ breadcrumb }) {
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '34px 0',
        borderBottom: '1px solid var(--md-sys-color-outline-variant)',
      }}
    >
      <Link to="/work" className="m3-state" style={backStyle}>
        ← GYANATEET
      </Link>
      <Text
        as="span"
        role="label-small"
        style={mono({ color: 'var(--md-sys-color-outline)' })}
      >
        /
      </Text>
      <Text
        as="span"
        role="label-small"
        style={mono({
          color: 'var(--md-sys-color-on-surface-variant)',
          letterSpacing: '0.1em',
        })}
      >
        {breadcrumb}
      </Text>
    </nav>
  );
}

/*
 * The hover wash and the focus ring come from .m3-state rather than a React
 * hover flag: a state layer works for touch and keyboard too, and the focus
 * outline is not something a page should be able to forget.
 */
const backStyle = mono({
  fontFamily: 'var(--md-sys-typescale-mono-font)',
  fontSize: 'var(--md-sys-typescale-label-small-size)',
  lineHeight: 'var(--md-sys-typescale-label-small-line-height)',
  fontWeight: 'var(--md-sys-typescale-emphasized-label-small-weight)',
  letterSpacing: '0.1em',
  color: 'var(--md-sys-color-on-surface-variant)',
  textDecoration: 'none',
  padding: '6px 10px',
  margin: '-6px -10px',
  borderRadius: 'var(--md-sys-shape-corner-small)',
});

/**
 * Year, role, venue, stack. A tonal container rather than two hairlines: it
 * is a block of data, and mono + tabular numerals keeps the values on a grid
 * across the row.
 */
function MetaBar({ items = [] }) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px 32px',
        margin: '52px 0 0',
        padding: '20px 24px',
        background: 'var(--md-sys-color-surface-container)',
        borderRadius: 'var(--md-sys-shape-corner-large)',
      }}
    >
      {items.map((item) => (
        <div key={item.k} style={{ flex: '1 1 150px' }}>
          <Text
            as="p"
            role="label-small"
            style={mono({
              color: 'var(--md-sys-color-on-surface-variant)',
              letterSpacing: '0.12em',
              margin: '0 0 6px',
            })}
          >
            {item.k}
          </Text>
          <Text
            as="p"
            role="body-medium"
            style={mono({ color: 'var(--md-sys-color-on-surface)', margin: 0 })}
          >
            {item.v}
          </Text>
        </div>
      ))}
    </div>
  );
}

/**
 * Outlined cards. The corner morph and the lift on hover are .m3-card's, so
 * the shape-as-state behaviour is identical to every other card on the site.
 */
function NextLinks({ items = [] }) {
  return (
    <section
      style={{
        padding: '64px 0 110px',
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
      }}
    >
      {items.map((item, i) => {
        const inner = (
          <>
            <Text
              as="span"
              role="label-small"
              style={mono({
                color: 'var(--md-sys-color-on-surface-variant)',
                letterSpacing: '0.1em',
              })}
            >
              {item.kicker}
            </Text>
            <Text as="span" role="headline-small">
              {item.title}
            </Text>
          </>
        );
        return item.to.startsWith('http') ? (
          <a
            key={i}
            href={item.to}
            target="_blank"
            rel="noopener noreferrer"
            className={CARD_CLASS}
            style={cardStyle}
          >
            {inner}
          </a>
        ) : (
          <Link key={i} to={item.to} className={CARD_CLASS} style={cardStyle}>
            {inner}
          </Link>
        );
      })}
    </section>
  );
}

const CARD_CLASS = 'm3-card m3-card--outlined m3-state';

/* No border-radius here on purpose: overriding it inline would defeat the
 * hover morph .m3-card declares. */
const cardStyle = {
  flex: '1 1 260px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

/** The artefacts block: kind, label, host. Always external. */
export function LinkList({ links = [] }) {
  return (
    <div style={{ margin: '22px 0 0' }}>
      {links.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="m3-state"
          style={rowStyle}
        >
          <Text
            as="span"
            role="label-small"
            style={mono({
              color: 'var(--md-sys-color-on-surface-variant)',
              letterSpacing: '0.1em',
              flex: 'none',
              width: '64px',
            })}
          >
            {link.kind}
          </Text>
          <Text as="span" role="body-large" style={{ flex: 1 }}>
            {link.label}
          </Text>
          <Text
            as="span"
            role="label-small"
            style={mono({
              color: 'var(--md-sys-color-on-surface-variant)',
              flex: 'none',
              textAlign: 'right',
            })}
          >
            {link.meta}
          </Text>
        </a>
      ))}
    </div>
  );
}

/*
 * Dense rows, so shape-corner-medium rather than the card's extra-large — a
 * 28px radius on a 48px row reads as a pill, not a list item.
 */
const rowStyle = {
  display: 'flex',
  alignItems: 'baseline',
  gap: '16px',
  padding: '14px 16px',
  textDecoration: 'none',
  color: 'var(--md-sys-color-on-surface)',
  background: 'var(--md-sys-color-surface-container-lowest)',
  border: '1px solid var(--md-sys-color-outline-variant)',
  borderRadius: 'var(--md-sys-shape-corner-medium)',
  marginBottom: '9px',
};

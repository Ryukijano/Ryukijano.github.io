import { createElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Chip, Text, Theme } from '../components/m3/index.jsx';
import { workIndex as T } from '../components/tokens.js';
import { hero, matrix, method, strands, footer } from '../content/work.js';

const ART = '/assets/images/kanagawa_latentspace_autoencoder.jpg';

/**
 * The four fields, each mapped onto a token palette instead of a literal
 * accent. Three of them have a seeded ramp of their own; ML-for-sciences does
 * not, so it borrows `study`'s tertiary — the one role in the set that is
 * neither slate-blue, terracotta nor magenta.
 *
 * All three dark ramps share the same neutral surfaces (they are seeded from
 * the site's ink, not from the accent), so switching the page's theme as you
 * scroll moves the accent and leaves the ground exactly where it was.
 */
const BANDS = [
  { theme: 'ryukijano-dark', role: 'primary' }, // GRAPHICS & SYSTEMS
  { theme: 'study-dark', role: 'primary' }, // VISION & ROBOTICS
  { theme: 'ryoushi-dark', role: 'primary' }, // QUANTUM ALGORITHMS
  { theme: 'study-dark', role: 'tertiary' }, // ML FOR SCIENCES
];

/** What every descendant of a Band reads instead of naming a colour. */
const ACCENT = 'var(--band-accent, var(--md-sys-color-primary))';

const bandStyle = (i, extra) => ({
  '--band-accent': `var(--md-sys-color-${BANDS[i].role})`,
  ...extra,
});

/* Spatial springs overshoot and belong to movement, size and corner radius.
 * Effects springs do not overshoot and belong to colour and opacity — an
 * opacity run on a spatial curve flickers past its target. */
const FADE = 'var(--md-sys-motion-duration-expressive-default-effects) var(--md-sys-motion-spring-expressive-default-effects)';
const FADE_SLOW = 'var(--md-sys-motion-duration-expressive-slow-effects) var(--md-sys-motion-spring-expressive-slow-effects)';
const MORPH = 'var(--md-sys-motion-duration-expressive-default-spatial) var(--md-sys-motion-spring-expressive-default-spatial)';

/** Mono with tabular numerals, for anything that has to line up in a column. */
const mono = (extra) => ({
  '--m3-font': 'var(--md-sys-typescale-mono-font)',
  fontVariantNumeric: 'tabular-nums',
  ...extra,
});

/**
 * Sets the palette for one field and publishes its accent as --band-accent,
 * so descendants can say ACCENT without knowing which field they are in.
 * `index < 0` means "no field" — the METHOD nav item — and renders plain.
 */
function Band({ index, as = 'span', style, children, ...rest }) {
  if (index === null || index === undefined || index < 0) {
    return createElement(as, { style, ...rest }, children);
  }
  return (
    <Theme name={BANDS[index].theme} as={as} style={bandStyle(index, style)} {...rest}>
      {children}
    </Theme>
  );
}

/**
 * /work — the project index, ported from "Revamp E - Method Transfer.dc.html".
 *
 * The artwork behind the page pans left to right as you scroll, which is the
 * prototype's own device: hand-painted at the top, dithered through the middle,
 * wireframe by the bottom. The page's theme travels with it, so the chrome
 * carries the accent of whichever field you are currently reading.
 *
 * Deliberately not ported: the cursor-following halftone canvas (decorative,
 * mouse-only), and the papers / weights / elsewhere / SoundCloud sections at
 * the foot of the prototype. See the TODO in src/content/work.js.
 */
export default function WorkIndex() {
  const [pct, setPct] = useState(0);
  const [focusStrand, setFocusStrand] = useState(null);
  const [focusMethod, setFocusMethod] = useState(null);
  const [hoverProject, setHoverProject] = useState(null);

  useEffect(() => {
    document.title = 'Selected work — Gyanateet Dutta';
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const f = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      setPct(Math.round(f * 100));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const dimmed = focusStrand !== null;
  const phase = Math.min(3, Math.floor((pct / 100) * 3 + 0.5));
  const activeBand = focusStrand !== null ? strands[focusStrand].accentIndex : phase;

  const statusText =
    focusMethod !== null
      ? matrix[focusMethod].method
      : focusStrand !== null
        ? `${strands[focusStrand].title} — ${strands[focusStrand].subtitle}`
        : 'gyanateet@leeds:~$ scroll — painted to wireframe';

  return (
    <Theme name={BANDS[activeBand].theme} style={bandStyle(activeBand, rootStyle)}>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          backgroundImage: `url(${ART})`,
          backgroundSize: 'cover',
          backgroundPosition: `${pct}% center`,
          opacity: dimmed ? 0.15 : 0.3,
          /* background-position tracks the scrollbar rather than transitioning
           * between two states, so it is smoothed linearly — a spring would
           * overshoot and swim against the scroll. Opacity is a state change
           * and takes the effects spring. */
          transition: `background-position var(--md-sys-motion-duration-standard-fast-effects) linear, opacity ${FADE_SLOW}`,
        }}
      />
      <div style={{ ...FIXED_OVERLAY, zIndex: 1, background: SCRIM }} />
      <div style={{ ...FIXED_OVERLAY, zIndex: 3, background: SCANLINES }} />

      <Header
        strands={strands}
        focusStrand={focusStrand}
        setFocusStrand={setFocusStrand}
        dimmed={dimmed}
      />

      <section style={heroSection}>
        <div>
          <Text
            as="p"
            role="label-small"
            emphasized
            style={mono({ color: ACCENT, letterSpacing: '0.24em', margin: '0 0 24px' })}
          >
            {hero.kicker}
          </Text>
          <Text as="h1" role="display-large" style={heroTitle}>
            {hero.name[0]}
            <br />
            <span
              style={{
                fontStyle: 'italic',
                fontWeight: 'var(--md-sys-typescale-emphasized-display-large-weight)',
              }}
            >
              {hero.name[1]}
            </span>
          </Text>
          <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap', marginTop: '30px' }}>
            {hero.roles.map((label, i) => (
              <Band key={label} index={i} style={{ display: 'inline-flex' }}>
                <Text
                  as="span"
                  role="label-small"
                  emphasized
                  style={mono({ color: ACCENT, letterSpacing: '0.1em' })}
                >
                  {i < hero.roles.length - 1 ? `${label}  /` : label}
                </Text>
              </Band>
            ))}
          </div>
          <Text as="p" role="headline-small" style={{ maxWidth: '600px', margin: '30px 0 0' }}>
            {hero.lead}
          </Text>
          <Text
            as="p"
            role="body-medium"
            style={{
              color: 'var(--md-sys-color-on-surface-variant)',
              maxWidth: '560px',
              margin: '20px 0 0',
            }}
          >
            {hero.quote}
          </Text>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '34px' }}>
            {hero.affiliations.map((a) => (
              <Chip key={a}>{a}</Chip>
            ))}
          </div>
        </div>
      </section>

      <MethodMatrix focusMethod={focusMethod} setFocusMethod={setFocusMethod} />

      {strands.map((strand, i) => (
        <Strand
          key={strand.id}
          strand={strand}
          index={i}
          focusStrand={focusStrand}
          setFocusStrand={setFocusStrand}
          hoverProject={hoverProject}
          setHoverProject={setHoverProject}
        />
      ))}

      <footer style={footerStyle}>
        {footer.map((f) => (
          <Text key={f} as="span" role="label-small" style={mono({ letterSpacing: '0.1em' })}>
            {f}
          </Text>
        ))}
        <Text
          as="span"
          role="label-small"
          style={mono({ letterSpacing: '0.1em', color: 'var(--md-sys-color-outline)' })}
        >
          BACKGROUND — KANAGAWA, LATENT-SPACE AUTOENCODER
        </Text>
      </footer>

      <div style={statusBar}>
        <span style={{ color: ACCENT, fontSize: '8px', transition: `color ${FADE}` }}>●</span>
        <Text
          as="span"
          role="label-medium"
          style={mono({ color: 'var(--md-sys-color-on-surface-variant)', letterSpacing: '0.06em' })}
        >
          {statusText}
        </Text>
      </div>
    </Theme>
  );
}

const rootStyle = {
  position: 'relative',
  minHeight: '100vh',
  background: 'var(--md-sys-color-surface)',
  color: 'var(--md-sys-color-on-surface)',
  /* The index keeps its terminal register: mono is the page default and prose
   * opts out of it, rather than the other way round. */
  fontFamily: 'var(--md-sys-typescale-mono-font)',
  overflowX: 'hidden',
};

const FIXED_OVERLAY = { position: 'fixed', inset: 0, pointerEvents: 'none' };

/* Both washes are mixed from surface and scrim rather than written as rgba, so
 * they follow the ground instead of pinning it to one hex. */
const SCRIM =
  'linear-gradient(to right,' +
  ' color-mix(in srgb, var(--md-sys-color-surface) 90%, transparent) 0%,' +
  ' color-mix(in srgb, var(--md-sys-color-surface) 62%, transparent) 42%,' +
  ' color-mix(in srgb, var(--md-sys-color-surface) 80%, transparent) 100%)';

const SCANLINES =
  'repeating-linear-gradient(to bottom, transparent 0 2px,' +
  ' color-mix(in srgb, var(--md-sys-color-scrim) 17%, transparent) 2px 4px)';

const heroSection = {
  position: 'relative',
  zIndex: 10,
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '0 40px',
  maxWidth: '1200px',
  margin: '0 auto',
};

/* display-large carries the face, weight and tracking; the size is fluid
 * because this one is a poster, not a paragraph. */
const heroTitle = {
  fontSize: 'clamp(48px,10vw,138px)',
  lineHeight: 0.88,
  letterSpacing: '-0.035em',
  margin: 0,
};

const footerStyle = {
  position: 'relative',
  zIndex: 10,
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '56px 40px 96px',
  display: 'flex',
  gap: '22px',
  flexWrap: 'wrap',
  color: 'var(--md-sys-color-on-surface-variant)',
};

const statusBar = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 40,
  display: 'flex',
  gap: '9px',
  alignItems: 'center',
  padding: '9px 40px',
  background: 'color-mix(in srgb, var(--md-sys-color-surface) 92%, transparent)',
  borderTop: `1px solid color-mix(in srgb, ${ACCENT} 45%, transparent)`,
  transition: `border-color ${FADE}`,
};

function Header({ strands: list, focusStrand, setFocusStrand, dimmed }) {
  const items = [{ id: 'method', label: 'METHOD', si: -1 }].concat(
    list.map((s, i) => ({ id: s.id, label: s.field.split(' ')[0], si: i })),
  );

  return (
    <header style={headerStyle}>
      <Text as="span" role="label-small" style={mono({ letterSpacing: '0.12em' })}>
        GYANATEET DUTTA
      </Text>
      <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/" className="m3-state" style={navLink(false, false)}>
          INDEX
        </Link>
        {items.map((n) => {
          const on = focusStrand === n.si && n.si >= 0;
          return (
            <Band
              key={n.label}
              as="a"
              index={n.si}
              href={`#${n.id}`}
              className="m3-state"
              onMouseEnter={() => setFocusStrand(n.si >= 0 ? n.si : null)}
              onMouseLeave={() => setFocusStrand(null)}
              style={navLink(on, dimmed && !on)}
            >
              {n.label}
            </Band>
          );
        })}
        <Link to="/trust" className="m3-state" style={navLink(false, false)}>
          TRUST
        </Link>
        <Link to="/academic" className="m3-state" style={navLink(false, false)}>
          ACADEMIC
        </Link>
      </nav>
      <a href="https://github.com/Ryukijano" target="_blank" rel="noopener noreferrer" style={githubLink}>
        GITHUB ↗
      </a>
    </header>
  );
}

const headerStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '18px 40px',
  background: 'color-mix(in srgb, var(--md-sys-color-surface) 80%, transparent)',
  color: 'var(--md-sys-color-on-surface-variant)',
};

/* The active nav item takes the emphasized weight as well as the accent, so
 * the selection is still visible with the colour taken away. */
function navLink(on, faded) {
  return {
    fontFamily: 'var(--md-sys-typescale-mono-font)',
    fontSize: 'var(--md-sys-typescale-label-small-size)',
    lineHeight: 'var(--md-sys-typescale-label-small-line-height)',
    fontWeight: on
      ? 'var(--md-sys-typescale-emphasized-label-small-weight)'
      : 'var(--md-sys-typescale-label-small-weight)',
    letterSpacing: '0.12em',
    textDecoration: 'none',
    color: on ? ACCENT : 'var(--md-sys-color-on-surface-variant)',
    opacity: faded ? 0.42 : 1,
    padding: '4px 6px',
    borderRadius: 'var(--md-sys-shape-corner-extra-small)',
    transition: `opacity ${FADE}, color ${FADE}`,
  };
}

const githubLink = {
  fontFamily: 'var(--md-sys-typescale-mono-font)',
  fontSize: 'var(--md-sys-typescale-label-small-size)',
  letterSpacing: '0.12em',
  textDecoration: 'none',
  color: 'var(--md-sys-color-on-surface)',
  borderBottom: '1px solid currentColor',
  paddingBottom: '2px',
};

/**
 * Five techniques against four fields. A table, so every cell is mono with
 * tabular numerals: "0.099M", "ViT-S/14" and "5B" have to read as figures and
 * line up down the column.
 */
function MethodMatrix({ focusMethod, setFocusMethod }) {
  const cols = '1.3fr 1fr 1fr 1fr 1fr';
  return (
    <section id="method" style={sectionShell}>
      <div style={railGrid}>
        <div>
          <Text
            as="p"
            role="title-medium"
            emphasized
            style={mono({ color: ACCENT, letterSpacing: '0.16em', margin: 0 })}
          >
            {method.num}
          </Text>
          <Text
            as="p"
            role="label-small"
            style={mono({
              color: 'var(--md-sys-color-on-surface-variant)',
              letterSpacing: '0.12em',
              margin: '10px 0 0',
            })}
          >
            {method.kicker}
          </Text>
        </div>
        <div>
          <Text as="h2" role="display-small" style={sectionTitle('clamp(30px,4.2vw,48px)')}>
            {method.title[0]}
            <br />
            {method.title[1]}
          </Text>
          <Text as="p" role="headline-small" style={{ maxWidth: '620px', margin: 0 }}>
            {method.lead}
          </Text>
          <Text
            as="p"
            role="label-small"
            style={mono({
              color: 'var(--md-sys-color-on-surface-variant)',
              letterSpacing: '0.06em',
              margin: '20px 0 16px',
            })}
          >
            {method.hint}
          </Text>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: cols,
              gap: '18px',
              padding: '0 0 10px',
              borderBottom: '1px solid var(--md-sys-color-outline-variant)',
            }}
          >
            <Text
              as="span"
              role="label-small"
              style={mono({
                color: 'var(--md-sys-color-on-surface-variant)',
                letterSpacing: '0.14em',
              })}
            >
              {method.headLabel}
            </Text>
            {T.columns.map((label, i) => (
              <Band key={label} index={i} style={{ display: 'inline-flex' }}>
                <Text
                  as="span"
                  role="label-small"
                  emphasized
                  style={mono({ color: ACCENT, letterSpacing: '0.14em' })}
                >
                  {label}
                </Text>
              </Band>
            ))}
          </div>

          {matrix.map((m, i) => {
            const on = focusMethod === i;
            return (
              <div
                key={m.method}
                onMouseEnter={() => setFocusMethod(i)}
                onMouseLeave={() => setFocusMethod(null)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: cols,
                  gap: '18px',
                  padding: '19px 0',
                  borderBottom: '1px solid var(--md-sys-color-outline-variant)',
                  opacity: focusMethod !== null && !on ? 0.34 : 1,
                  transition: `opacity ${FADE}`,
                }}
              >
                <div>
                  <Text
                    as="p"
                    role="title-medium"
                    emphasized={on}
                    style={{
                      margin: 0,
                      color: on ? ACCENT : 'var(--md-sys-color-on-surface)',
                      transition: `color ${FADE}`,
                    }}
                  >
                    {m.method}
                  </Text>
                  <Text
                    as="p"
                    role="body-small"
                    style={{
                      color: 'var(--md-sys-color-on-surface-variant)',
                      margin: '7px 0 0',
                    }}
                  >
                    {m.note}
                  </Text>
                </div>
                {m.cells.map((text, ci) => (
                  <div key={ci} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <Band index={ci} style={{ display: 'inline-flex' }}>
                      <Text
                        as="span"
                        role="label-small"
                        emphasized
                        style={mono({
                          color: ACCENT,
                          letterSpacing: '0.12em',
                          opacity: on ? 1 : 0,
                          transition: `opacity ${FADE}`,
                        })}
                      >
                        {T.columns[ci]}
                      </Text>
                    </Band>
                    <Text
                      as="span"
                      role="body-small"
                      style={mono({
                        color: on
                          ? 'var(--md-sys-color-on-surface)'
                          : 'var(--md-sys-color-on-surface-variant)',
                        lineHeight: 1.6,
                        transition: `color ${FADE}`,
                      })}
                    >
                      {text}
                    </Text>
                  </div>
                ))}
              </div>
            );
          })}

          <Caveat text={method.caveat} />
        </div>
      </div>
    </section>
  );
}

const sectionShell = {
  position: 'relative',
  zIndex: 10,
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '108px 40px 0',
};

const railGrid = {
  display: 'grid',
  gridTemplateColumns: '180px 1fr',
  gap: '56px',
};

const sectionTitle = (size) => ({
  fontSize: size,
  lineHeight: 1.06,
  letterSpacing: '-0.026em',
  margin: '0 0 14px',
});

/**
 * Where a method stops working. These sentences used to sit at 48% opacity
 * against the artwork; they are the load-bearing ones on the page, so they get
 * their own tonal container, an accent rule down the left, and the lead-in word
 * at the emphasized weight in mono.
 *
 * Nothing here depends on hue: the container's tone step, the rule, the
 * indent and the word itself all survive greyscale and colour-blindness. The
 * accent is the fourth channel, never the only one.
 */
function Caveat({ text }) {
  const split = /^([A-Za-z]{1,14}): /.exec(text);
  const lead = split ? split[1] : null;
  const rest = split ? text.slice(split[0].length) : text;

  return (
    <div style={caveatStyle}>
      <Text
        as="p"
        role="body-medium"
        style={{ color: 'var(--md-sys-color-on-surface-variant)', margin: 0 }}
      >
        {lead ? (
          <>
            <Text
              as="span"
              role="label-medium"
              emphasized
              style={mono({ color: ACCENT, letterSpacing: '0.12em' })}
            >
              {lead}
            </Text>
            {': '}
          </>
        ) : null}
        {rest}
      </Text>
    </div>
  );
}

const caveatStyle = {
  maxWidth: '660px',
  margin: '24px 0 0',
  padding: '14px 18px',
  background: 'var(--md-sys-color-surface-container)',
  border: '1px solid var(--md-sys-color-outline-variant)',
  borderLeft: `3px solid ${ACCENT}`,
  /* medium (12px) against 14–18px of padding: an inner box would want ~0, and
   * nothing inside this one is rounded. */
  borderRadius: 'var(--md-sys-shape-corner-medium)',
};

function Strand({ strand, index, focusStrand, setFocusStrand, hoverProject, setHoverProject }) {
  const on = focusStrand === index;
  const dimmed = focusStrand !== null;

  return (
    <Band
      as="section"
      index={strand.accentIndex}
      id={strand.id}
      onMouseEnter={() => setFocusStrand(index)}
      onMouseLeave={() => {
        setFocusStrand(null);
        setHoverProject(null);
      }}
      style={{
        position: 'relative',
        zIndex: 10,
        padding: '108px 0',
        opacity: dimmed && !on ? 0.24 : 1,
        transition: `opacity ${FADE_SLOW}`,
      }}
    >
      <div style={{ ...railGrid, maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
        <div>
          <Text
            as="p"
            role="title-medium"
            emphasized
            style={mono({ color: ACCENT, letterSpacing: '0.16em', margin: '0 0 9px' })}
          >
            {strand.num}
          </Text>
          <Text
            as="p"
            role="label-small"
            style={mono({
              color: 'var(--md-sys-color-on-surface-variant)',
              letterSpacing: '0.13em',
              margin: 0,
            })}
          >
            {strand.field}
          </Text>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '6px',
              marginTop: '18px',
            }}
          >
            {strand.tags.map((tag) => (
              <Chip key={tag}>{tag}</Chip>
            ))}
          </div>
        </div>
        <div>
          <Text as="h2" role="display-small" style={sectionTitle('clamp(32px,4.6vw,64px)')}>
            {strand.title}
          </Text>
          <Text
            as="p"
            role="label-medium"
            style={mono({
              color: 'var(--md-sys-color-on-surface-variant)',
              letterSpacing: '0.13em',
              textTransform: 'uppercase',
              margin: '0 0 22px',
            })}
          >
            {strand.subtitle}
          </Text>
          <Text as="p" role="headline-small" style={{ maxWidth: '620px', margin: 0 }}>
            {strand.desc}
          </Text>

          <Caveat text={strand.limit} />

          <div style={dashedRule} />

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {strand.projects.map((project, pi) => (
              <ProjectRow
                key={project.title}
                project={project}
                active={hoverProject === `${index}-${pi}`}
                onEnter={() => {
                  setFocusStrand(index);
                  setHoverProject(`${index}-${pi}`);
                }}
                onLeave={() => setHoverProject(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </Band>
  );
}

const dashedRule = {
  height: '1px',
  background:
    'repeating-linear-gradient(to right, var(--md-sys-color-outline) 0 2px, transparent 2px 7px)',
  margin: '34px 0 6px',
};

/**
 * One project. Shape is the state here: at rest the row is a flat ruled line,
 * under the pointer it morphs into a rounded tile with the project's own still
 * or GIF behind it. Radius rides a spatial spring, colour and the artwork ride
 * effects springs, and .m3-state supplies the hover wash and the focus ring.
 */
function ProjectRow({ project, active, onEnter, onLeave }) {
  const style = {
    position: 'relative',
    display: 'flex',
    alignItems: 'baseline',
    gap: '14px',
    padding: '16px 14px',
    textDecoration: 'none',
    color: active ? ACCENT : 'var(--md-sys-color-on-surface)',
    borderBottom: `1px solid ${active ? 'transparent' : 'var(--md-sys-color-outline-variant)'}`,
    borderRadius: active
      ? 'var(--md-sys-shape-corner-large)'
      : 'var(--md-sys-shape-corner-none)',
    overflow: 'hidden',
    transition: `border-radius ${MORPH}, color ${FADE}, border-color ${FADE}`,
  };

  const inner = (
    <>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          borderRadius: 'inherit',
          backgroundImage: active && project.media ? `url(${project.media})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: active && project.media ? (project.isGif ? 0.34 : 0.2) : 0,
          transition: `opacity ${FADE_SLOW}`,
        }}
      />
      <Text as="span" role="headline-small" style={{ flex: 'none' }}>
        {project.title}
      </Text>
      <span
        style={{
          flex: 1,
          minWidth: '20px',
          height: '1px',
          alignSelf: 'center',
          background:
            'repeating-linear-gradient(to right, currentColor 0 2px, transparent 2px 6px)',
          opacity: active ? 0.9 : 0.32,
          transition: `opacity ${FADE}`,
        }}
      />
      <span
        style={{
          flex: 'none',
          fontSize: 'var(--md-sys-typescale-label-small-size)',
          color: ACCENT,
          opacity: project.isGif ? (active ? 0.9 : 0.4) : 0,
          transition: `opacity ${FADE}`,
        }}
      >
        {project.isGif ? '▶' : ''}
      </span>
      <Text
        as="span"
        role="label-medium"
        style={mono({
          color: 'var(--md-sys-color-on-surface-variant)',
          letterSpacing: '0.04em',
          flex: 'none',
        })}
      >
        {project.desc}
      </Text>
    </>
  );

  const handlers = { onMouseEnter: onEnter, onMouseLeave: onLeave };

  return project.to.startsWith('http') ? (
    <a
      href={project.to}
      target="_blank"
      rel="noopener noreferrer"
      className="m3-state"
      style={style}
      {...handlers}
    >
      {inner}
    </a>
  ) : (
    <Link to={project.to} className="m3-state" style={style} {...handlers}>
      {inner}
    </Link>
  );
}

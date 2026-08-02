import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { joinStyle, parseStyle } from '../lib/style.js';
import { Card, Divider, Text, Theme } from '../components/m3/index.jsx';
import useReveal from '../components/useReveal.js';
import content from '../content/academic.js';

/** /academic — ported from "Academic.dc.html". SECTION_COUNT there is 10. */
const SECTION_COUNT = 10;

/*
 * study-dark, not ryukijano-dark.
 *
 * All three dark ramps share one neutral spine and differ only in
 * primary/secondary/tertiary, so this is a choice of accent, not of ground.
 * This page is the whole person — surgical video, quantum circuits, heritage
 * graphics — so it cannot wear the graphics persona's slate-blue without
 * implying everything under it is graphics work. `study` is the reading
 * register the case studies already wear, and its terracotta primary is the
 * ramp nearest the accent this page shipped with, so the page keeps its own
 * face while moving onto the token system.
 */
const THEME = 'study-dark';

/*
 * Motion pairs: a duration always travels with its own curve. `spatial` for
 * anything that moves, resizes or changes corner radius — those overshoot, and
 * that overshoot is the expressive part. `effects` for colour and opacity —
 * those must not, because a colour that overshoots leaves gamut and reads as a
 * render bug. base.css already zeroes both under prefers-reduced-motion.
 */
const SPATIAL =
  'var(--md-sys-motion-duration-expressive-default-spatial) var(--md-sys-motion-spring-expressive-default-spatial)';
const EFFECTS =
  'var(--md-sys-motion-duration-expressive-default-effects) var(--md-sys-motion-spring-expressive-default-effects)';
const EFFECTS_FAST =
  'var(--md-sys-motion-duration-expressive-fast-effects) var(--md-sys-motion-spring-expressive-fast-effects)';

/**
 * Mono with tabular numerals — every identifier, metric, date, venue, arXiv id
 * and parameter count on the page. Tabular so a column of figures lines up
 * instead of shifting under itself.
 */
const MONO = '--m3-font:var(--md-sys-typescale-mono-font);font-variant-numeric:tabular-nums';

/**
 * The third text rank. M3 stops at on-surface-variant, so rather than pick a
 * dimmer grey by eye the quietest tier is a mix of the role that already owns
 * secondary text. It still clears AA on every surface tone this page uses.
 */
const DIM = 'color-mix(in srgb, var(--md-sys-color-on-surface-variant) 74%, transparent)';

/*
 * Cards step up a tone rather than cast a shadow. On a near-black ground a
 * shadow barely registers, which is why M3 layers dark surfaces by tone; the
 * outlined variant keeps its hairline and the background moves from `surface`
 * (the page ground) to `surface-container`.
 */
const CARD_TONE = 'background:var(--md-sys-color-surface-container)';

/* Card renders an <a> or a <div>, never a react-router Link, so the link-cards
 * borrow its classes directly. Same component layer either way. */
const CARD_LINK = 'm3-card m3-card--outlined m3-state';

/* Ids in document order, taken from the rail so the two can't drift apart. */
const NAV_IDS = content.nav.map((n) => n.href.replace('#', ''));

/**
 * Reading position for the rail. The observer watches a band across the upper
 * part of the viewport and reports the first section in document order that is
 * inside it, which is the section you are actually reading rather than the one
 * that happens to be largest on screen.
 *
 * Everything touching the DOM is inside the effect: this page is also rendered
 * with react-dom/server, where there is no document and no IntersectionObserver.
 * The initial value is the first section, which is what a server-rendered page
 * scrolled to the top is showing anyway.
 */
function useReadingPosition(ids) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (nodes.length === 0) return undefined;

    const onscreen = new Set();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) onscreen.add(entry.target.id);
          else onscreen.delete(entry.target.id);
        });
        const first = ids.find((id) => onscreen.has(id));
        // No match means the band is between two sections mid-scroll; holding
        // the last answer is better than blanking the rail for a frame.
        if (first) setActiveId(first);
      },
      { rootMargin: '-10% 0px -70% 0px', threshold: 0 },
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [ids]);

  return activeId;
}

export default function Academic() {
  const reveal = useReveal(SECTION_COUNT, {
    threshold: 0.06,
    distance: 12,
    // useReveal drives opacity and transform off a single duration/curve pair.
    // That pair has to be `effects`: a spatial spring would overshoot the fade
    // past 1 and flicker, and a 12px nudge loses very little by not springing.
    duration: 'var(--md-sys-motion-duration-expressive-slow-effects)',
    easing: 'var(--md-sys-motion-spring-expressive-slow-effects)',
    delayFor: null,
  });
  const activeId = useReadingPosition(NAV_IDS);

  const [hover, setHover] = useState({});
  const set = (group, i) => ({
    onMouseEnter: () => setHover((h) => ({ ...h, [group]: i })),
    onMouseLeave: () => setHover((h) => ({ ...h, [group]: null })),
    // keyboard parity: the same feedback the pointer gets.
    onFocus: () => setHover((h) => ({ ...h, [group]: i })),
    onBlur: () => setHover((h) => ({ ...h, [group]: null })),
  });
  const isOn = (group, i) => hover[group] === i;

  useEffect(() => {
    document.title = 'Gyanateet Dutta — academic';
  }, []);

  return (
    <Theme
      name={THEME}
      style={parseStyle(
        'position:relative;min-height:100vh;' +
          'background:var(--md-sys-color-surface);color:var(--md-sys-color-on-surface);' +
          'font-family:var(--md-sys-typescale-plain-font);-webkit-font-smoothing:antialiased',
      )}
    >
      {/* dusk: the page's own primary, thinned, sitting behind the first
          screenful and gone by the time you're reading. */}
      <div
        aria-hidden="true"
        style={parseStyle(
          'position:absolute;top:0;left:0;right:0;height:460px;pointer-events:none;' +
            'background:linear-gradient(to bottom,' +
            'color-mix(in srgb, var(--md-sys-color-primary) 7%, transparent) 0%,' +
            'color-mix(in srgb, var(--md-sys-color-primary) 2%, transparent) 45%,' +
            'transparent 100%)',
        )}
      />

      <div
        style={parseStyle(
          'position:relative;max-width:1080px;margin:0 auto;padding:0 32px;display:grid;' +
            'grid-template-columns:250px minmax(0,1fr);gap:56px;align-items:start',
        )}
      >
        <aside style={parseStyle('position:sticky;top:0;padding:56px 0 40px;align-self:start')}>
          <Text
            as="h1"
            role="headline-small"
            style={parseStyle('color:var(--md-sys-color-on-surface);margin:0 0 12px')}
          >
            {content.rail.name}
          </Text>
          <Text
            role="body-medium"
            style={parseStyle('color:var(--md-sys-color-on-surface-variant);margin:0 0 16px')}
          >
            {content.rail.line}
          </Text>
          <Text role="label-small" style={parseStyle(`${MONO};--m3-lh:1.75;color:${DIM};margin:0`)}>
            {content.rail.meta.map((line, i) => (
              <span key={line}>
                {line}
                {i < content.rail.meta.length - 1 ? <br /> : null}
              </span>
            ))}
          </Text>

          <nav aria-label="sections" style={parseStyle('margin:26px 0 0')}>
            {content.nav.map((n) => {
              const id = n.href.replace('#', '');
              const on = activeId === id;
              return (
                <a
                  key={n.href}
                  href={n.href}
                  aria-current={on ? 'location' : undefined}
                  className="m3-state"
                  style={parseStyle(
                    'position:relative;display:block;padding:4px 8px 4px 15px;' +
                      'text-decoration:none;' +
                      'border-radius:var(--md-sys-shape-corner-small);' +
                      `color:var(--md-sys-color-${on ? 'primary' : 'on-surface-variant'});` +
                      `transition:color ${EFFECTS}`,
                  )}
                >
                  {/* Reading position is the primary colour and the emphasized
                      weight first; this marker only seconds them. It grows on a
                      spatial spring and fades on an effects one. */}
                  <span
                    aria-hidden="true"
                    style={parseStyle(
                      'position:absolute;left:0;top:5px;bottom:5px;width:2px;' +
                        'border-radius:var(--md-sys-shape-corner-full);' +
                        'background:var(--md-sys-color-primary);transform-origin:center;' +
                        `transform:scaleY(${on ? 1 : 0});opacity:${on ? 1 : 0};` +
                        `transition:transform ${SPATIAL},opacity ${EFFECTS}`,
                    )}
                  />
                  <Text
                    as="span"
                    role="label-large"
                    emphasized={on}
                    style={parseStyle(`--m3-lh:1.5;transition:font-weight ${EFFECTS}`)}
                  >
                    {n.label}
                  </Text>
                </a>
              );
            })}
          </nav>

          <div style={parseStyle('display:flex;gap:6px;flex-wrap:wrap;margin:26px 0 0')}>
            {content.links.map((l, i) => {
              const on = isOn('links', i);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="m3-chip m3-state"
                  {...set('links', i)}
                  style={parseStyle(
                    'cursor:pointer;' +
                      `color:var(--md-sys-color-${on ? 'primary' : 'on-surface-variant'});` +
                      `border-color:var(--md-sys-color-${on ? 'primary' : 'outline-variant'});` +
                      `transition:color ${EFFECTS_FAST},border-color ${EFFECTS_FAST}`,
                  )}
                >
                  {l.label}
                </a>
              );
            })}
          </div>

          <Divider style={parseStyle('margin:26px 0 0')} />
          <Text
            role="label-small"
            style={parseStyle(`${MONO};--m3-lh:1.8;color:${DIM};margin:16px 0 0`)}
          >
            ←{' '}
            <Link
              to="/"
              style={parseStyle(
                'color:var(--md-sys-color-on-surface-variant);text-decoration:none',
              )}
            >
              index
            </Link>{' '}
            ·{' '}
            <Link
              to="/work"
              style={parseStyle(
                'color:var(--md-sys-color-on-surface-variant);text-decoration:none',
              )}
            >
              the work
            </Link>{' '}
            ·{' '}
            <Link
              to="/trust"
              style={parseStyle(
                'color:var(--md-sys-color-on-surface-variant);text-decoration:none',
              )}
            >
              what we trust
            </Link>
          </Text>
        </aside>

        <main style={parseStyle('padding:56px 0 130px;min-width:0')}>
          <section id="about" style={parseStyle('scroll-margin-top:24px')}>
            <SectionHead>about</SectionHead>
            <P>
              most of what i do is surgical video. keyhole surgery specifically, where there’s one
              camera, it’s inside someone, and a fair amount of the time you can’t see anything
              because of the smoke. whatever i build has to run on the gpu the hospital already
              bought, which rules out a lot of what gets published.
            </P>
            <P>
              i also do quantum circuit design and error correction with{' '}
              <A href="https://github.com/Quantum-Buddies">quantum buddies</A>, which i co-founded,
              plus some heritage work at leeds. last year we rebuilt a mill that had burned down,
              working from ten photographs.
            </P>
            <P>these look unrelated. they aren’t, quite.</P>
          </section>

          <RevealSection id="research" reveal={reveal} index={0} title="research">
            <Text
              role="body-large"
              style={parseStyle(
                'color:var(--md-sys-color-on-surface-variant);margin:0 0 22px;max-width:64ch;' +
                  'padding-left:16px;border-left:2px solid var(--md-sys-color-primary)',
              )}
            >
              {content.prose.research}
            </Text>
            {content.themes.map((t) => (
              <Card key={t.n} variant="outlined" style={parseStyle(`${CARD_TONE};margin:0 0 14px`)}>
                <Text
                  as="span"
                  role="label-medium"
                  emphasized
                  style={parseStyle(
                    `${MONO};--m3-track:0.14em;display:block;` +
                      'color:var(--md-sys-color-primary);margin:0 0 10px',
                  )}
                >
                  {t.n}
                </Text>
                <Text
                  as="h3"
                  role="title-medium"
                  style={parseStyle('color:var(--md-sys-color-on-surface);margin:0 0 10px')}
                >
                  {t.t}
                </Text>
                <Text
                  role="body-large"
                  style={parseStyle(
                    'color:var(--md-sys-color-on-surface-variant);margin:0 0 14px;max-width:62ch',
                  )}
                >
                  {t.b}
                </Text>
                {/* where the method gives out. tertiary rather than primary so a
                    limit never reads as a claim, and the inner radius is the
                    card's 28 minus its 20 of padding — 8, not 28 again. */}
                <Text
                  role="body-small"
                  style={parseStyle(
                    `${MONO};--m3-lh:1.65;margin:0;padding:11px 14px;` +
                      'color:var(--md-sys-color-tertiary);' +
                      'background:var(--md-sys-color-surface-container-high);' +
                      'border-radius:var(--md-sys-shape-corner-small);' +
                      'border-left:2px solid color-mix(in srgb, var(--md-sys-color-tertiary) 60%, transparent)',
                  )}
                >
                  {t.e}
                </Text>
              </Card>
            ))}
          </RevealSection>

          <RevealSection id="timeline" reveal={reveal} index={1} title="how i got here">
            {content.timeline.map((e) => (
              <Card
                key={e.y}
                variant="outlined"
                style={parseStyle(
                  `${CARD_TONE};margin:0 0 14px;display:grid;` +
                    'grid-template-columns:56px minmax(0,1fr);gap:18px',
                )}
              >
                {/* the year is the one figure in the row: emphasized weight,
                    primary, tabular so the column stays a column. */}
                <Text
                  as="span"
                  role="label-large"
                  emphasized
                  style={parseStyle(`${MONO};color:var(--md-sys-color-primary)`)}
                >
                  {e.y}
                </Text>
                <Text
                  role="body-large"
                  style={parseStyle('color:var(--md-sys-color-on-surface-variant);max-width:60ch')}
                >
                  {e.b}
                </Text>
              </Card>
            ))}
          </RevealSection>

          <RevealSection id="work" reveal={reveal} index={2} title="selected work">
            <Sub>{content.prose.workSub}</Sub>
            {content.work.map((w, i) => (
              <Link
                key={w.t}
                to={w.to}
                className={CARD_LINK}
                {...set('work', i)}
                style={parseStyle(`${CARD_TONE};margin:0 0 14px`)}
              >
                <Text
                  as="span"
                  role="title-medium"
                  style={parseStyle(
                    `display:block;color:var(--md-sys-color-${isOn('work', i) ? 'primary' : 'on-surface'});` +
                      `transition:color ${EFFECTS}`,
                  )}
                >
                  {w.t}
                </Text>
                <Text
                  as="span"
                  role="body-medium"
                  style={parseStyle(
                    'display:block;color:var(--md-sys-color-on-surface-variant);' +
                      'margin:8px 0 0;max-width:62ch',
                  )}
                >
                  {w.d}
                </Text>
                <Text
                  as="span"
                  role="label-medium"
                  style={parseStyle(`${MONO};display:block;color:${DIM};margin:12px 0 0`)}
                >
                  {w.m}
                </Text>
              </Link>
            ))}
          </RevealSection>

          <RevealSection id="papers" reveal={reveal} index={3} title="papers">
            {content.papers.map((p, i) => {
              const on = isOn('papers', i);
              const inner = (
                <>
                  <Text
                    as="span"
                    role="title-medium"
                    style={parseStyle(
                      'display:block;--m3-lh:1.4;max-width:56ch;' +
                        `color:var(--md-sys-color-${on ? 'primary' : 'on-surface'});` +
                        `transition:color ${EFFECTS}`,
                    )}
                  >
                    {p.t}
                  </Text>
                  <Text
                    as="span"
                    role="body-medium"
                    style={parseStyle(
                      'display:block;color:var(--md-sys-color-on-surface-variant);' +
                        'margin:8px 0 0;max-width:62ch',
                    )}
                  >
                    {p.d}
                  </Text>
                  {/* venue, ids and measured figures: mono, tabular, and kept a
                      rank brighter than the other meta lines because this is
                      the line a reader checks. */}
                  <Text
                    as="span"
                    role="label-medium"
                    style={parseStyle(
                      `${MONO};display:block;--m3-lh:1.6;` +
                        'color:var(--md-sys-color-on-surface-variant);margin:12px 0 0',
                    )}
                  >
                    {p.m}
                  </Text>
                </>
              );
              return p.internal ? (
                <Link
                  key={p.t}
                  to={p.to}
                  className={CARD_LINK}
                  {...set('papers', i)}
                  style={parseStyle(`${CARD_TONE};margin:0 0 14px`)}
                >
                  {inner}
                </Link>
              ) : (
                <a
                  key={p.t}
                  href={p.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={CARD_LINK}
                  {...set('papers', i)}
                  style={parseStyle(`${CARD_TONE};margin:0 0 14px`)}
                >
                  {inner}
                </a>
              );
            })}
            <Sub>
              also on <A href="https://orcid.org/0009-0008-0480-9241">orcid</A>. there’s a dblp page
              under a similar name that isn’t me. not linked here, on purpose.
            </Sub>
          </RevealSection>

          <RevealSection id="software" reveal={reveal} index={4} title="software & releases">
            <Sub>{content.prose.softwareSub}</Sub>
            <ListPanel>
              {content.software.map((s, i, a) => (
                <a
                  key={s.n}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="m3-state"
                  {...set('software', i)}
                  style={parseStyle(
                    'display:grid;grid-template-columns:54px 190px minmax(0,1fr) auto;gap:14px;' +
                      'align-items:baseline;padding:14px 20px;text-decoration:none;' +
                      // the panel clips at its radius, so the ring turns inward
                      'outline-offset:-3px' +
                      (i === a.length - 1
                        ? ''
                        : ';border-bottom:1px solid var(--md-sys-color-outline-variant)'),
                  )}
                >
                  <Text
                    as="span"
                    role="label-small"
                    style={parseStyle(`${MONO};--m3-track:0.14em;color:${DIM}`)}
                  >
                    {s.k}
                  </Text>
                  <Text
                    as="span"
                    role="label-large"
                    style={parseStyle(
                      `${MONO};` +
                        `color:var(--md-sys-color-${isOn('software', i) ? 'primary' : 'on-surface'});` +
                        `transition:color ${EFFECTS_FAST}`,
                    )}
                  >
                    {s.n}
                  </Text>
                  <Text
                    as="span"
                    role="body-medium"
                    style={parseStyle('color:var(--md-sys-color-on-surface-variant)')}
                  >
                    {s.d}
                  </Text>
                  <Text
                    as="span"
                    role="label-medium"
                    style={parseStyle(`${MONO};color:${DIM};white-space:nowrap`)}
                  >
                    {s.s}
                  </Text>
                </a>
              ))}
            </ListPanel>
          </RevealSection>

          <RevealSection id="competitions" reveal={reveal} index={5} title="competitions">
            <Sub>{content.prose.competitionsSub}</Sub>
            <ListPanel>
              {content.competitions.map((c, i, a) => (
                <div
                  key={c.n}
                  style={parseStyle(
                    'display:flex;align-items:baseline;gap:14px;padding:14px 20px' +
                      (i === a.length - 1
                        ? ''
                        : ';border-bottom:1px solid var(--md-sys-color-outline-variant)'),
                  )}
                >
                  {/* the placement is the figure in the row, so it takes the
                      emphasized weight; nothing else in the row does. */}
                  <Text
                    as="span"
                    role="label-medium"
                    emphasized
                    style={parseStyle(
                      `${MONO};color:var(--md-sys-color-primary);flex:none;min-width:76px`,
                    )}
                  >
                    {c.p}
                  </Text>
                  <Text
                    as="span"
                    role="body-medium"
                    style={parseStyle('color:var(--md-sys-color-on-surface);flex:none')}
                  >
                    {c.n}
                  </Text>
                  <span
                    aria-hidden="true"
                    style={parseStyle(
                      'flex:1;min-width:14px;height:1px;align-self:center;' +
                        'background:repeating-linear-gradient(to right,' +
                        'var(--md-sys-color-outline-variant) 0 2px,transparent 2px 6px)',
                    )}
                  />
                  <Text
                    as="span"
                    role="label-medium"
                    style={parseStyle(`${MONO};color:${DIM};flex:none`)}
                  >
                    {c.y}
                  </Text>
                </div>
              ))}
            </ListPanel>
          </RevealSection>

          <RevealSection id="where" reveal={reveal} index={6} title="where the work happens">
            {content.places.map((p, i, a) => (
              <div key={p.n}>
                <div style={parseStyle('padding:15px 0')}>
                  <Text
                    as="span"
                    role="title-small"
                    style={parseStyle('display:block;color:var(--md-sys-color-on-surface)')}
                  >
                    {p.n}
                  </Text>
                  <Text
                    as="span"
                    role="body-medium"
                    style={parseStyle(
                      'display:block;color:var(--md-sys-color-on-surface-variant);margin:5px 0 0',
                    )}
                  >
                    {p.d}
                  </Text>
                </div>
                {i === a.length - 1 ? null : <Divider />}
              </div>
            ))}
          </RevealSection>

          <RevealSection id="public" reveal={reveal} index={7} title="learning in public">
            {content.prose.publicInPublic.map((p) => (
              <P key={p.slice(0, 24)}>{p}</P>
            ))}
          </RevealSection>

          <RevealSection id="misc" reveal={reveal} index={8} title="misc, unsorted">
            {content.misc.map((m) => (
              <Text
                key={m.slice(0, 24)}
                role="body-medium"
                style={parseStyle(
                  'color:var(--md-sys-color-on-surface-variant);margin:0 0 12px;max-width:64ch;' +
                    'padding-left:16px;border-left:1px solid var(--md-sys-color-outline-variant)',
                )}
              >
                {m}
              </Text>
            ))}
          </RevealSection>

          <RevealSection id="contact" reveal={reveal} index={9} title="contact">
            <P>{content.prose.contact}</P>
            <Text role="body-large" style={parseStyle(`${MONO};margin:0`)}>
              <A href="mailto:gyanateet@gmail.com">gyanateet@gmail.com</A>
            </Text>
            <Divider style={parseStyle('margin:46px 0 0')} />
            <Text
              role="label-small"
              style={parseStyle(`${MONO};--m3-lh:1.85;color:${DIM};margin:20px 0 0;max-width:64ch`)}
            >
              {content.prose.foot}
            </Text>
          </RevealSection>
        </main>
      </div>
    </Theme>
  );
}

/**
 * Section heading: brand face at headline scale, with a rule running out to the
 * right margin. Plain weight, not emphasized — on a page of eleven headings the
 * second weight axis would stop meaning anything.
 */
function SectionHead({ children }) {
  return (
    <header style={parseStyle('display:flex;align-items:baseline;gap:16px;margin:0 0 18px')}>
      <Text
        as="h2"
        role="headline-small"
        style={parseStyle('color:var(--md-sys-color-on-surface);flex:none')}
      >
        {children}
      </Text>
      <span
        aria-hidden="true"
        style={parseStyle(
          'flex:1;min-width:20px;height:1px;' +
            'background:linear-gradient(to right,var(--md-sys-color-outline-variant),transparent)',
        )}
      />
    </header>
  );
}

function RevealSection({ id, reveal, index, title, children }) {
  return (
    <section
      id={id}
      ref={reveal.attach(index)}
      style={parseStyle(joinStyle(reveal.style(index), 'padding:52px 0 0;scroll-margin-top:24px'))}
    >
      <SectionHead>{title}</SectionHead>
      {children}
    </section>
  );
}

/** A tonal panel holding rows: one step up from the ground, radius `large`
 *  rather than the cards' `extra-large` because 14px rows inside a 28px corner
 *  collide with the curve. */
function ListPanel({ children }) {
  return (
    <div
      style={parseStyle(
        `${CARD_TONE};border:1px solid var(--md-sys-color-outline-variant);` +
          'border-radius:var(--md-sys-shape-corner-large);overflow:hidden',
      )}
    >
      {children}
    </div>
  );
}

/** Running prose: plain face at body-large, the reading size for this page. */
function P({ children }) {
  return (
    <Text
      role="body-large"
      style={parseStyle('color:var(--md-sys-color-on-surface-variant);margin:0 0 16px;max-width:64ch')}
    >
      {children}
    </Text>
  );
}

/** The note under a heading that qualifies the section below it. */
function Sub({ children }) {
  return (
    <Text role="body-medium" style={parseStyle(`color:${DIM};margin:0 0 18px;max-width:64ch`)}>
      {children}
    </Text>
  );
}

function A({ href, children }) {
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      style={parseStyle(
        'color:var(--md-sys-color-primary);text-decoration:none;' +
          'border-bottom:1px solid color-mix(in srgb, var(--md-sys-color-primary) 35%, transparent)',
      )}
    >
      {children}
    </a>
  );
}

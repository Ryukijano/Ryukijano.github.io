import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { parseStyle } from '../lib/style.js';
import { dark as C, fonts } from '../components/tokens.js';
import useReveal from '../components/useReveal.js';
import content from '../content/academic.js';

/** /academic — ported from "Academic.dc.html". SECTION_COUNT there is 10. */
const SECTION_COUNT = 10;

export default function Academic() {
  const reveal = useReveal(SECTION_COUNT, {
    threshold: 0.06,
    distance: 12,
    duration: '.6s',
    easing: 'ease',
    delayFor: null,
  });
  const [hover, setHover] = useState({});
  const set = (group, i) => ({
    onMouseEnter: () => setHover((h) => ({ ...h, [group]: i })),
    onMouseLeave: () => setHover((h) => ({ ...h, [group]: null })),
  });
  const isOn = (group, i) => hover[group] === i;

  useEffect(() => {
    document.title = 'Gyanateet Dutta — academic';
  }, []);

  const cardBase = (on) =>
    `display:block;background:${on ? C.cardHover : C.card};` +
    `border:1px solid ${on ? 'rgba(209,118,79,0.35)' : C.hairline};border-radius:9px;` +
    `padding:20px 22px;margin:0 0 12px;text-decoration:none;transition:background .25s,border-color .25s`;

  return (
    <div
      style={parseStyle(
        `min-height:100vh;background:${C.bg};color:${C.text};font-family:${fonts.body};-webkit-font-smoothing:antialiased`,
      )}
    >
      <div
        style={parseStyle(
          'max-width:1080px;margin:0 auto;padding:0 32px;display:grid;' +
            'grid-template-columns:250px 1fr;gap:56px;align-items:start',
        )}
      >
        <aside style={parseStyle('position:sticky;top:0;padding:56px 0 40px;align-self:start')}>
          <h1
            style={parseStyle(
              `font-size:21px;font-weight:600;letter-spacing:-0.01em;margin:0 0 10px;color:${C.text}`,
            )}
          >
            {content.rail.name}
          </h1>
          <p style={parseStyle(`font-size:13px;line-height:1.6;color:${C.muted};margin:0 0 14px`)}>
            {content.rail.line}
          </p>
          <p
            style={parseStyle(
              `font-family:${fonts.mono};font-size:10.5px;line-height:1.7;color:${C.dim};margin:0`,
            )}
          >
            {content.rail.meta.map((line, i) => (
              <span key={line}>
                {line}
                {i < content.rail.meta.length - 1 ? <br /> : null}
              </span>
            ))}
          </p>

          <nav style={{ margin: '24px 0 0' }}>
            {content.nav.map((n, i) => (
              <a
                key={n.href}
                href={n.href}
                {...set('nav', i)}
                style={parseStyle(
                  `display:block;font-size:12.5px;line-height:1.95;text-decoration:none;` +
                    `color:${isOn('nav', i) ? C.accent : C.muted};transition:color .2s`,
                )}
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div style={parseStyle('display:flex;gap:6px;flex-wrap:wrap;margin:24px 0 0')}>
            {content.links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                {...set('links', i)}
                style={parseStyle(
                  `font-family:${fonts.mono};font-size:10px;padding:6px 10px;` +
                    `border:1px solid ${isOn('links', i) ? C.accent : C.hairline};border-radius:5px;` +
                    `text-decoration:none;color:${isOn('links', i) ? C.accent : C.muted};` +
                    `transition:border-color .2s,color .2s`,
                )}
              >
                {l.label}
              </a>
            ))}
          </div>

          <p
            style={parseStyle(
              `font-family:${fonts.mono};font-size:10.5px;color:${C.dim};margin:26px 0 0;` +
                `padding-top:18px;border-top:1px solid ${C.hairline}`,
            )}
          >
            ←{' '}
            <Link to="/" style={parseStyle(`color:${C.muted};text-decoration:none`)}>
              index
            </Link>{' '}
            ·{' '}
            <Link to="/work" style={parseStyle(`color:${C.muted};text-decoration:none`)}>
              the work
            </Link>
          </p>
        </aside>

        <main style={parseStyle('padding:56px 0 130px;min-width:0')}>
          <section id="about">
            <h2 style={parseStyle(`font-size:19px;font-weight:600;color:${C.text};margin:0 0 14px`)}>
              about
            </h2>
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
            <p
              style={parseStyle(
                `font-size:14.5px;line-height:1.78;color:${C.muted};margin:0 0 20px;max-width:68ch;` +
                  `padding-left:15px;border-left:2px solid ${C.accent}`,
              )}
            >
              {content.prose.research}
            </p>
            {content.themes.map((t) => (
              <div
                key={t.n}
                style={parseStyle(
                  `display:block;background:${C.card};border:1px solid ${C.hairline};` +
                    `border-radius:9px;padding:22px;margin:0 0 12px`,
                )}
              >
                <span
                  style={parseStyle(
                    `display:block;font-family:${fonts.mono};font-size:10.5px;color:${C.accent};margin-bottom:9px`,
                  )}
                >
                  {t.n}
                </span>
                <span
                  style={parseStyle(
                    `display:block;font-size:16px;font-weight:600;color:${C.text};margin-bottom:10px`,
                  )}
                >
                  {t.t}
                </span>
                <p style={parseStyle(`font-size:13.5px;line-height:1.72;color:${C.muted};margin:0 0 12px`)}>
                  {t.b}
                </p>
                <p
                  style={parseStyle(
                    `font-family:${fonts.mono};font-size:11px;line-height:1.65;color:${C.slate};` +
                      `margin:0;padding-left:13px;border-left:1px solid rgba(111,159,216,0.35)`,
                  )}
                >
                  {t.e}
                </p>
              </div>
            ))}
          </RevealSection>

          <RevealSection id="timeline" reveal={reveal} index={1} title="how i got here">
            {content.timeline.map((e) => (
              <div
                key={e.y}
                style={parseStyle(
                  `display:grid;grid-template-columns:52px 1fr;gap:18px;background:${C.card};` +
                    `border:1px solid ${C.hairline};border-radius:9px;padding:18px 22px;margin:0 0 12px`,
                )}
              >
                <span
                  style={parseStyle(
                    `font-family:${fonts.mono};font-size:12px;color:${C.accent};padding-top:2px`,
                  )}
                >
                  {e.y}
                </span>
                <p style={parseStyle(`font-size:13.5px;line-height:1.72;color:${C.muted};margin:0`)}>
                  {e.b}
                </p>
              </div>
            ))}
          </RevealSection>

          <RevealSection id="work" reveal={reveal} index={2} title="selected work">
            <Sub>{content.prose.workSub}</Sub>
            {content.work.map((w, i) => (
              <Link key={w.t} to={w.to} {...set('work', i)} style={parseStyle(cardBase(isOn('work', i)))}>
                <span
                  style={parseStyle(
                    `display:block;font-size:16.5px;font-weight:600;` +
                      `color:${isOn('work', i) ? C.accent : C.text};transition:color .25s`,
                  )}
                >
                  {w.t}
                </span>
                <span
                  style={parseStyle(
                    `display:block;font-size:13.5px;line-height:1.65;color:${C.muted};margin-top:7px`,
                  )}
                >
                  {w.d}
                </span>
                <span
                  style={parseStyle(
                    `display:block;font-family:${fonts.mono};font-size:10.5px;color:${C.dim};margin-top:11px`,
                  )}
                >
                  {w.m}
                </span>
              </Link>
            ))}
          </RevealSection>

          <RevealSection id="papers" reveal={reveal} index={3} title="papers">
            {content.papers.map((p, i) => {
              const on = isOn('papers', i);
              const inner = (
                <>
                  <span
                    style={parseStyle(
                      `display:block;font-size:15.5px;font-weight:600;line-height:1.4;` +
                        `color:${on ? C.accent : C.text};transition:color .25s`,
                    )}
                  >
                    {p.t}
                  </span>
                  <span
                    style={parseStyle(
                      `display:block;font-size:13px;line-height:1.65;color:${C.muted};margin-top:7px`,
                    )}
                  >
                    {p.d}
                  </span>
                  <span
                    style={parseStyle(
                      `display:block;font-family:${fonts.mono};font-size:10.5px;color:${C.dim};margin-top:10px`,
                    )}
                  >
                    {p.m}
                  </span>
                </>
              );
              return p.internal ? (
                <Link key={p.t} to={p.to} {...set('papers', i)} style={parseStyle(cardBase(on))}>
                  {inner}
                </Link>
              ) : (
                <a
                  key={p.t}
                  href={p.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...set('papers', i)}
                  style={parseStyle(cardBase(on))}
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
            <div
              style={parseStyle(
                `background:${C.card};border:1px solid ${C.hairline};border-radius:9px;overflow:hidden`,
              )}
            >
              {content.software.map((s, i) => {
                const on = isOn('software', i);
                return (
                  <a
                    key={s.n}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...set('software', i)}
                    style={parseStyle(
                      `display:grid;grid-template-columns:52px 190px 1fr auto;gap:14px;` +
                        `align-items:baseline;padding:13px 20px;text-decoration:none;` +
                        `background:${on ? C.cardHover : 'transparent'};` +
                        `border-bottom:1px solid ${C.hairline};transition:background .2s`,
                    )}
                  >
                    <span
                      style={parseStyle(
                        `font-family:${fonts.mono};font-size:9.5px;letter-spacing:0.1em;color:${C.dim}`,
                      )}
                    >
                      {s.k}
                    </span>
                    <span
                      style={parseStyle(
                        `font-family:${fonts.mono};font-size:12.5px;color:${on ? C.accent : C.text};transition:color .2s`,
                      )}
                    >
                      {s.n}
                    </span>
                    <span style={parseStyle(`font-size:12.5px;color:${C.muted};line-height:1.5`)}>
                      {s.d}
                    </span>
                    <span
                      style={parseStyle(
                        `font-family:${fonts.mono};font-size:10px;color:${C.dim};white-space:nowrap`,
                      )}
                    >
                      {s.s}
                    </span>
                  </a>
                );
              })}
            </div>
          </RevealSection>

          <RevealSection id="competitions" reveal={reveal} index={5} title="competitions">
            <Sub>{content.prose.competitionsSub}</Sub>
            <div
              style={parseStyle(
                `background:${C.card};border:1px solid ${C.hairline};border-radius:9px;overflow:hidden`,
              )}
            >
              {content.competitions.map((c, i, a) => (
                <div
                  key={c.n}
                  style={parseStyle(
                    `display:flex;align-items:baseline;gap:13px;padding:13px 22px` +
                      (i === a.length - 1 ? '' : `;border-bottom:1px solid ${C.hairline}`),
                  )}
                >
                  <span
                    style={parseStyle(
                      `font-family:${fonts.mono};font-size:10.5px;color:${C.accent};flex:none;min-width:74px`,
                    )}
                  >
                    {c.p}
                  </span>
                  <span style={parseStyle(`font-size:13.5px;color:${C.text};flex:none`)}>{c.n}</span>
                  <span
                    style={parseStyle(
                      `flex:1;min-width:14px;height:1px;align-self:center;` +
                        `background:repeating-linear-gradient(to right,${C.hairline} 0 2px,transparent 2px 6px)`,
                    )}
                  />
                  <span
                    style={parseStyle(
                      `font-family:${fonts.mono};font-size:11px;color:${C.dim};flex:none`,
                    )}
                  >
                    {c.y}
                  </span>
                </div>
              ))}
            </div>
          </RevealSection>

          <RevealSection id="where" reveal={reveal} index={6} title="where the work happens">
            {content.places.map((p, i, a) => (
              <div
                key={p.n}
                style={parseStyle(
                  `display:block;padding:14px 0` +
                    (i === a.length - 1 ? '' : `;border-bottom:1px solid ${C.hairline}`),
                )}
              >
                <span style={parseStyle(`display:block;font-size:14px;color:${C.text}`)}>{p.n}</span>
                <span
                  style={parseStyle(
                    `display:block;font-size:12.5px;line-height:1.6;color:${C.muted};margin-top:4px`,
                  )}
                >
                  {p.d}
                </span>
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
              <p
                key={m.slice(0, 24)}
                style={parseStyle(
                  `font-size:13.5px;line-height:1.75;color:${C.muted};margin:0 0 11px;` +
                    `padding-left:15px;border-left:1px solid ${C.hairline}`,
                )}
              >
                {m}
              </p>
            ))}
          </RevealSection>

          <RevealSection id="contact" reveal={reveal} index={9} title="contact">
            <P>{content.prose.contact}</P>
            <p style={parseStyle(`font-family:${fonts.mono};font-size:14px;margin:0 0 8px`)}>
              <A href="mailto:gyanateet@gmail.com">gyanateet@gmail.com</A>
            </p>
            <p
              style={parseStyle(
                `font-family:${fonts.mono};font-size:10.5px;line-height:1.75;color:${C.dim};` +
                  `margin:44px 0 0;padding-top:22px;border-top:1px solid ${C.hairline}`,
              )}
            >
              {content.prose.foot}
            </p>
          </RevealSection>
        </main>
      </div>
    </div>
  );
}

function RevealSection({ id, reveal, index, title, children }) {
  return (
    <section id={id} ref={reveal.attach(index)} style={parseStyle(reveal.style(index))}>
      <h2
        style={parseStyle(
          `font-size:19px;font-weight:600;color:${C.text};margin:0 0 14px;padding:40px 0 0`,
        )}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function P({ children }) {
  return (
    <p
      style={parseStyle(
        `font-size:14.5px;line-height:1.78;color:${C.muted};margin:0 0 15px;max-width:68ch`,
      )}
    >
      {children}
    </p>
  );
}

function Sub({ children }) {
  return (
    <p
      style={parseStyle(
        `font-size:13px;line-height:1.7;color:${C.dim};margin:0 0 16px;max-width:68ch`,
      )}
    >
      {children}
    </p>
  );
}

function A({ href, children }) {
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      style={parseStyle(
        `color:${C.accent};text-decoration:none;border-bottom:1px solid rgba(209,118,79,0.3)`,
      )}
    >
      {children}
    </a>
  );
}

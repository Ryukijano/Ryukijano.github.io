import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { parseStyle } from '../lib/style.js';
import { fonts, workIndex as T } from '../components/tokens.js';
import { hero, matrix, method, strands, footer } from '../content/work.js';

const ACCENTS = T.accents;
const ART = '/assets/images/kanagawa_latentspace_autoencoder.jpg';

/**
 * /work — the project index, ported from "Revamp E - Method Transfer.dc.html".
 *
 * The artwork behind the page pans left to right as you scroll, which is the
 * prototype's own device: hand-painted at the top, dithered through the middle,
 * wireframe by the bottom.
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
  const activeAccent =
    focusStrand !== null ? ACCENTS[strands[focusStrand].accentIndex] : ACCENTS[phase];

  const statusText =
    focusMethod !== null
      ? matrix[focusMethod].method
      : focusStrand !== null
        ? `${strands[focusStrand].title} — ${strands[focusStrand].subtitle}`
        : 'gyanateet@leeds:~$ scroll — painted to wireframe';

  return (
    <div
      style={parseStyle(
        `position:relative;min-height:100vh;background:${T.ground};color:${T.paper};` +
          `font-family:${fonts.mono};overflow-x:hidden`,
      )}
    >
      <div
        style={parseStyle(
          `position:fixed;inset:0;z-index:0;pointer-events:none;background-image:url(${ART});` +
            `background-size:cover;background-position:${pct}% center;` +
            `opacity:${(0.3 * (dimmed ? 0.5 : 1)).toFixed(3)};` +
            `transition:opacity .4s,background-position .18s linear`,
        )}
      />
      <div
        style={parseStyle(
          'position:fixed;inset:0;z-index:1;pointer-events:none;' +
            'background:linear-gradient(to right,rgba(11,13,16,0.90) 0%,rgba(11,13,16,0.62) 42%,rgba(11,13,16,0.80) 100%)',
        )}
      />
      <div
        style={parseStyle(
          'position:fixed;inset:0;z-index:3;pointer-events:none;' +
            'background:repeating-linear-gradient(to bottom,rgba(0,0,0,0) 0 2px,rgba(0,0,0,0.17) 2px 4px)',
        )}
      />

      <Header
        strands={strands}
        focusStrand={focusStrand}
        setFocusStrand={setFocusStrand}
        dimmed={dimmed}
      />

      <section
        style={parseStyle(
          'position:relative;z-index:10;min-height:100vh;display:flex;flex-direction:column;' +
            'justify-content:center;padding:0 40px;max-width:1200px;margin:0 auto',
        )}
      >
        <div>
          <p
            style={parseStyle(
              `font-family:${fonts.pixel};font-size:10.5px;letter-spacing:0.24em;color:${activeAccent};margin:0 0 24px`,
            )}
          >
            {hero.kicker}
          </p>
          <h1
            style={parseStyle(
              `font-family:${fonts.display};font-weight:300;font-size:clamp(48px,10vw,138px);` +
                `line-height:0.88;letter-spacing:-0.035em;margin:0`,
            )}
          >
            {hero.name[0]}
            <br />
            <span style={{ fontStyle: 'italic', fontWeight: 400 }}>{hero.name[1]}</span>
          </h1>
          <div
            style={parseStyle(
              'display:flex;gap:18px;flex-wrap:wrap;margin-top:30px;font-size:11px;letter-spacing:0.1em',
            )}
          >
            {hero.roles.map((label, i) => (
              <span key={label} style={{ color: ACCENTS[i], opacity: 0.85 }}>
                {i < hero.roles.length - 1 ? `${label}  /` : label}
              </span>
            ))}
          </div>
          <p
            style={parseStyle(
              `font-family:${fonts.display};font-size:19px;font-weight:300;line-height:1.62;` +
                `max-width:600px;margin:30px 0 0;opacity:0.85`,
            )}
          >
            {hero.lead}
          </p>
          <p
            style={parseStyle(
              'font-size:12.5px;line-height:1.8;max-width:560px;margin:20px 0 0;opacity:0.5',
            )}
          >
            {hero.quote}
          </p>
          <div
            style={parseStyle(
              'display:flex;gap:22px;flex-wrap:wrap;margin-top:34px;font-size:10.5px;letter-spacing:0.1em;opacity:0.45',
            )}
          >
            {hero.affiliations.map((a) => (
              <span key={a}>{a}</span>
            ))}
          </div>
        </div>
      </section>

      <MethodMatrix
        activeAccent={activeAccent}
        focusMethod={focusMethod}
        setFocusMethod={setFocusMethod}
      />

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

      <footer
        style={parseStyle(
          'position:relative;z-index:10;max-width:1200px;margin:0 auto;padding:56px 40px 96px;' +
            'font-size:10.5px;opacity:0.38;letter-spacing:0.1em;display:flex;gap:22px;flex-wrap:wrap',
        )}
      >
        {footer.map((f) => (
          <span key={f}>{f}</span>
        ))}
        <span style={{ opacity: 0.7 }}>BACKGROUND — KANAGAWA, LATENT-SPACE AUTOENCODER</span>
      </footer>

      <div
        style={parseStyle(
          `position:fixed;bottom:0;left:0;right:0;z-index:40;display:flex;gap:9px;align-items:center;` +
            `padding:9px 40px;background:rgba(11,13,16,0.9);border-top:1px solid ${activeAccent}55;` +
            `font-size:10.5px;letter-spacing:0.06em;transition:border-color .35s`,
        )}
      >
        <span style={{ color: activeAccent, fontSize: '8px' }}>●</span>
        <span style={{ opacity: 0.85 }}>{statusText}</span>
      </div>
    </div>
  );
}

function Header({ strands: list, focusStrand, setFocusStrand, dimmed }) {
  const items = [{ id: 'method', label: 'METHOD', si: -1 }].concat(
    list.map((s, i) => ({ id: s.id, label: s.field.split(' ')[0], si: i })),
  );

  return (
    <header
      style={parseStyle(
        'position:fixed;top:0;left:0;right:0;z-index:40;display:flex;align-items:center;' +
          'justify-content:space-between;padding:18px 40px;font-size:11px;letter-spacing:0.12em;' +
          'background:rgba(11,13,16,0.72)',
      )}
    >
      <span style={{ opacity: 0.65 }}>GYANATEET DUTTA</span>
      <nav style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={parseStyle('text-decoration:none;opacity:0.66')}>
          INDEX
        </Link>
        {items.map((n) => (
          <a
            key={n.label}
            href={`#${n.id}`}
            onMouseEnter={() => setFocusStrand(n.si >= 0 ? n.si : null)}
            onMouseLeave={() => setFocusStrand(null)}
            style={parseStyle(
              `text-decoration:none;opacity:${dimmed ? (focusStrand === n.si ? 1 : 0.26) : 0.66};` +
                `color:${focusStrand === n.si && n.si >= 0 ? ACCENTS[list[n.si].accentIndex] : 'inherit'};` +
                `transition:opacity .28s,color .28s`,
            )}
          >
            {n.label}
          </a>
        ))}
        <Link to="/academic" style={parseStyle('text-decoration:none;opacity:0.66')}>
          ACADEMIC
        </Link>
      </nav>
      <a
        href="https://github.com/Ryukijano"
        target="_blank"
        rel="noopener noreferrer"
        style={parseStyle(
          'text-decoration:none;opacity:0.8;border-bottom:1px solid currentColor;padding-bottom:2px',
        )}
      >
        GITHUB ↗
      </a>
    </header>
  );
}

function MethodMatrix({ activeAccent, focusMethod, setFocusMethod }) {
  const cols = '1.3fr 1fr 1fr 1fr 1fr';
  return (
    <section
      id="method"
      style={parseStyle(
        'position:relative;z-index:10;max-width:1200px;margin:0 auto;padding:108px 40px 0',
      )}
    >
      <div style={parseStyle('display:grid;grid-template-columns:180px 1fr;gap:56px')}>
        <div>
          <p
            style={parseStyle(
              `font-family:${fonts.pixel};font-size:12px;letter-spacing:0.16em;color:${activeAccent};margin:0`,
            )}
          >
            {method.num}
          </p>
          <p
            style={parseStyle(
              'font-size:10.5px;letter-spacing:0.12em;opacity:0.45;margin:10px 0 0',
            )}
          >
            {method.kicker}
          </p>
        </div>
        <div>
          <h2
            style={parseStyle(
              `font-family:${fonts.display};font-weight:300;font-size:clamp(30px,4.2vw,48px);` +
                `margin:0 0 14px;letter-spacing:-0.026em;line-height:1.06`,
            )}
          >
            {method.title[0]}
            <br />
            {method.title[1]}
          </h2>
          <p
            style={parseStyle(
              `font-family:${fonts.display};font-size:17.5px;font-weight:300;line-height:1.72;` +
                `max-width:620px;opacity:0.8;margin:0`,
            )}
          >
            {method.lead}
          </p>
          <p
            style={parseStyle(
              'font-size:11px;letter-spacing:0.06em;opacity:0.38;margin:20px 0 16px',
            )}
          >
            {method.hint}
          </p>

          <div
            style={parseStyle(
              `display:grid;grid-template-columns:${cols};gap:18px;padding:0 0 10px;` +
                `border-bottom:1px solid rgba(234,230,220,0.14)`,
            )}
          >
            <span
              style={parseStyle(
                `font-family:${fonts.pixel};font-size:8.5px;letter-spacing:0.14em;opacity:0.38`,
              )}
            >
              {method.headLabel}
            </span>
            {T.columns.map((label, i) => (
              <span
                key={label}
                style={parseStyle(
                  `font-family:${fonts.pixel};font-size:8.5px;letter-spacing:0.14em;` +
                    `color:${ACCENTS[i]};opacity:${focusMethod !== null ? 1 : 0.66};transition:opacity .25s`,
                )}
              >
                {label}
              </span>
            ))}
          </div>

          {matrix.map((m, i) => {
            const on = focusMethod === i;
            return (
              <div
                key={m.method}
                onMouseEnter={() => setFocusMethod(i)}
                onMouseLeave={() => setFocusMethod(null)}
                style={parseStyle(
                  `display:grid;grid-template-columns:${cols};gap:18px;padding:19px 0;` +
                    `border-bottom:1px solid rgba(234,230,220,0.09);` +
                    `opacity:${focusMethod !== null ? (on ? 1 : 0.28) : 0.88};transition:opacity .25s`,
                )}
              >
                <div>
                  <p
                    style={parseStyle(
                      `font-family:${fonts.display};font-size:16px;font-weight:400;line-height:1.36;` +
                        `margin:0;color:${on ? activeAccent : 'inherit'};transition:color .25s`,
                    )}
                  >
                    {m.method}
                  </p>
                  <p
                    style={parseStyle(
                      'font-size:10.5px;line-height:1.55;margin:7px 0 0;opacity:0.4',
                    )}
                  >
                    {m.note}
                  </p>
                </div>
                {m.cells.map((text, ci) => (
                  <div key={ci} style={parseStyle('display:flex;flex-direction:column;gap:4px')}>
                    <span
                      style={parseStyle(
                        `font-family:${fonts.pixel};font-size:7.5px;letter-spacing:0.12em;` +
                          `color:${ACCENTS[ci]};opacity:${on ? 0.85 : 0};transition:opacity .25s`,
                      )}
                    >
                      {T.columns[ci]}
                    </span>
                    <span
                      style={parseStyle(
                        `font-size:11px;line-height:1.6;opacity:${on ? 0.88 : 0.48};transition:opacity .25s`,
                      )}
                    >
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            );
          })}

          <p
            style={parseStyle(
              `font-size:12px;line-height:1.8;max-width:660px;margin:28px 0 0;padding-left:14px;` +
                `border-left:1px solid ${activeAccent}55;opacity:0.48`,
            )}
          >
            {method.caveat}
          </p>
        </div>
      </div>
    </section>
  );
}

function Strand({
  strand,
  index,
  focusStrand,
  setFocusStrand,
  hoverProject,
  setHoverProject,
}) {
  const accent = ACCENTS[strand.accentIndex];
  const on = focusStrand === index;
  const dimmed = focusStrand !== null;
  const opacity = dimmed ? (on ? 1 : 0.2) : 1;

  return (
    <section
      id={strand.id}
      onMouseEnter={() => setFocusStrand(index)}
      onMouseLeave={() => {
        setFocusStrand(null);
        setHoverProject(null);
      }}
      style={parseStyle(
        `position:relative;z-index:10;padding:108px 0;opacity:${opacity};transition:opacity .35s`,
      )}
    >
      <div
        style={parseStyle(
          'display:grid;grid-template-columns:180px 1fr;gap:56px;max-width:1200px;margin:0 auto;padding:0 40px',
        )}
      >
        <div>
          <p
            style={parseStyle(
              `font-family:${fonts.pixel};font-size:12px;letter-spacing:0.16em;color:${accent};margin:0 0 9px`,
            )}
          >
            {strand.num}
          </p>
          <p style={parseStyle('font-size:10px;letter-spacing:0.13em;opacity:0.45;margin:0')}>
            {strand.field}
          </p>
          <div
            style={parseStyle('display:flex;flex-direction:column;gap:5px;margin-top:18px')}
          >
            {strand.tags.map((tag) => (
              <span
                key={tag}
                style={parseStyle('font-size:9.5px;letter-spacing:0.14em;opacity:0.52')}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h2
            style={parseStyle(
              `font-family:${fonts.display};font-weight:300;font-size:clamp(32px,4.6vw,64px);` +
                `letter-spacing:-0.03em;margin:0 0 6px;line-height:1.03`,
            )}
          >
            {strand.title}
          </h2>
          <p
            style={parseStyle(
              'font-size:11px;letter-spacing:0.13em;opacity:0.55;margin:0 0 22px;text-transform:uppercase',
            )}
          >
            {strand.subtitle}
          </p>
          <p
            style={parseStyle(
              `font-family:${fonts.display};font-size:17.5px;font-weight:300;line-height:1.7;` +
                `max-width:620px;opacity:0.82;margin:0`,
            )}
          >
            {strand.desc}
          </p>
          <p
            style={parseStyle(
              `font-size:12px;line-height:1.75;max-width:620px;margin:16px 0 0;padding-left:14px;` +
                `border-left:1px solid ${accent}55;opacity:0.48`,
            )}
          >
            {strand.limit}
          </p>

          <div
            style={parseStyle(
              'height:1px;background:repeating-linear-gradient(to right,rgba(234,230,220,0.3) 0 2px,transparent 2px 7px);margin:34px 0 6px',
            )}
          />

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {strand.projects.map((project, pi) => (
              <ProjectRow
                key={project.title}
                project={project}
                accent={accent}
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
    </section>
  );
}

function ProjectRow({ project, accent, active, onEnter, onLeave }) {
  const rowStyle =
    `position:relative;display:flex;align-items:baseline;gap:12px;padding:16px 10px 16px 0;` +
    `text-decoration:none;color:${active ? accent : T.paper};` +
    `border-bottom:1px solid ${T.hairline};overflow:hidden;transition:color .3s`;

  const inner = (
    <>
      <div
        style={parseStyle(
          `position:absolute;inset:0;` +
            `background-image:${active && project.media ? `url(${project.media})` : 'none'};` +
            `background-size:cover;background-position:center;` +
            `opacity:${active && project.media ? (project.isGif ? 0.34 : 0.2) : 0};` +
            `transition:opacity .45s;z-index:-1`,
        )}
      />
      <span
        style={parseStyle(
          `font-family:${fonts.display};font-size:19.5px;font-weight:400;flex:none`,
        )}
      >
        {project.title}
      </span>
      <span
        style={parseStyle(
          `flex:1;min-width:20px;height:1px;align-self:center;` +
            `background:repeating-linear-gradient(to right,${active ? accent : 'rgba(234,230,220,0.25)'} 0 2px,transparent 2px 6px)`,
        )}
      />
      <span
        style={parseStyle(
          `flex:none;font-size:8px;opacity:${project.isGif ? (active ? 0.9 : 0.4) : 0};` +
            `color:${accent};transition:opacity .3s`,
        )}
      >
        {project.isGif ? '▶' : ''}
      </span>
      <span
        style={parseStyle(
          `font-size:11px;letter-spacing:0.06em;opacity:${active ? 0.9 : 0.45};flex:none`,
        )}
      >
        {project.desc}
      </span>
    </>
  );

  const handlers = { onMouseEnter: onEnter, onMouseLeave: onLeave };

  return project.to.startsWith('http') ? (
    <a
      href={project.to}
      target="_blank"
      rel="noopener noreferrer"
      style={parseStyle(rowStyle)}
      {...handlers}
    >
      {inner}
    </a>
  ) : (
    <Link to={project.to} style={parseStyle(rowStyle)} {...handlers}>
      {inner}
    </Link>
  );
}

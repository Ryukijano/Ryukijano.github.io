import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { parseStyle } from '../lib/style.js';
import { Chip, Divider, Text, Theme } from '../components/m3/index.jsx';
import useReveal from '../components/useReveal.js';
import content from '../content/intro.js';

const SECTION_COUNT = 3;

/*
 * One theme per pane, keyed by pane id rather than index so the mapping stays
 * true if the content module ever reorders.
 *
 * All three are the *dark* ramps deliberately. The three dark themes share an
 * identical neutral spine — only primary/secondary/tertiary move — so the panes
 * read as three rooms in the same building rather than three buildings. Using
 * the light ryoushi/study ramps here would have put a paper-white pane in the
 * middle of a dusk triptych, which is the one thing this page can't say.
 *
 * The middle pane — the vision/surgical work that bridges the other two — takes
 * the `study` family, the same terracotta the case studies wear, because that
 * is where it actually leads.
 */
const PANE_THEME = {
  ryukijano: 'ryukijano-dark',
  gyanateet: 'study-dark',
  ryoushi: 'ryoushi-dark',
};

/*
 * Motion pairs: a duration always travels with its matching curve. `spatial`
 * for anything that moves, resizes or changes radius — those overshoot, which
 * is the expressive part. `effects` for colour and opacity — those must not,
 * because a colour that overshoots leaves gamut and reads as a render bug.
 */
const SPATIAL =
  'var(--md-sys-motion-duration-expressive-default-spatial) var(--md-sys-motion-spring-expressive-default-spatial)';
const SPATIAL_SLOW =
  'var(--md-sys-motion-duration-expressive-slow-spatial) var(--md-sys-motion-spring-expressive-slow-spatial)';
const EFFECTS =
  'var(--md-sys-motion-duration-expressive-default-effects) var(--md-sys-motion-spring-expressive-default-effects)';
const EFFECTS_SLOW =
  'var(--md-sys-motion-duration-expressive-slow-effects) var(--md-sys-motion-spring-expressive-slow-effects)';

/** mono at a label role: the tech strips, the seam, the numbers, the footer. */
const MONO = '--m3-font:var(--md-sys-typescale-mono-font)';

/**
 * The hovered pane asserts itself and the other two step back. The flex row,
 * the seams and the canvas field all read these same weights, so nothing can
 * drift out of register with anything else.
 */
const paneWeights = (active, n) =>
  Array.from({ length: n }, (_, i) => (active === null ? 1 : active === i ? 1.55 : 0.72));

/** Fractional x of each seam, so seams track the panes instead of sitting at
 *  fixed thirds while the panes resize underneath them. */
function paneEdges(active, n) {
  const w = paneWeights(active, n);
  const total = w.reduce((a, b) => a + b, 0);
  const edges = [];
  let run = 0;
  for (let i = 0; i < n - 1; i++) {
    run += w[i];
    edges.push(run / total);
  }
  return edges;
}

/** / — ported from "Intro.dc.html". */
export default function Intro() {
  const canvasRef = useRef(null);
  const activeRef = useRef(null);
  const [active, setActive] = useState(null);
  const [hoverRow, setHoverRow] = useState(null);

  const reveal = useReveal(SECTION_COUNT, {
    threshold: 0.15,
    distance: 22,
    // useReveal drives opacity and transform off one duration/curve pair, so
    // this takes the effects spring: an overshooting curve would be fine on the
    // 22px nudge but would visibly flicker the fade past 1.
    duration: 'var(--md-sys-motion-duration-expressive-slow-effects)',
    easing: 'var(--md-sys-motion-spring-expressive-slow-effects)',
    prefix: 'position:relative;z-index:2;',
    delayFor: null,
  });

  useEffect(() => {
    document.title = 'Gyanateet Dutta';
  }, []);

  // keep the canvas loop reading the current pane without re-subscribing.
  // assigned in an effect, not during render — writing a ref while rendering
  // is unsafe under concurrent rendering.
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    if (reveal.reduced) return undefined;
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    // The field takes its colours from the panes themselves, so it tracks
    // whatever data-theme each pane is wearing. Queried here rather than held
    // in a ref: this is the only consumer and it only ever runs post-commit.
    const themedPanes = () =>
      Array.from(canvas.parentElement?.querySelectorAll('[data-pane-field]') ?? []);
    return runField(canvas, activeRef, themedPanes);
  }, [reveal.reduced]);

  const weights = paneWeights(active, content.panes.length);
  const edges = paneEdges(active, content.panes.length);

  return (
    <Theme
      name="ryukijano-dark"
      style={parseStyle(
        'min-height:100vh;position:relative;overflow-x:hidden;' +
          'background:var(--md-sys-color-surface-container-lowest);' +
          'color:var(--md-sys-color-on-surface);' +
          'font-family:var(--md-sys-typescale-plain-font);' +
          '-webkit-font-smoothing:antialiased',
      )}
    >
      <canvas
        ref={canvasRef}
        style={parseStyle(
          'position:fixed;inset:0;width:100%;height:100%;z-index:0;display:block',
        )}
      />
      {/* dusk vignette — scrim, not a hand-picked near-black */}
      <div
        style={parseStyle(
          'position:fixed;inset:0;z-index:1;pointer-events:none;' +
            'background:radial-gradient(120% 80% at 50% 0%,transparent 30%,' +
            'color-mix(in srgb, var(--md-sys-color-scrim) 55%, transparent) 78%,' +
            'color-mix(in srgb, var(--md-sys-color-scrim) 90%, transparent) 100%)',
        )}
      />

      <section
        style={parseStyle(
          'position:relative;z-index:2;height:100vh;min-height:620px;display:flex',
        )}
      >
        {content.panes.map((pane, i) => {
          const on = active === i;
          const off = active !== null && !on;
          return (
            <Theme
              key={pane.id}
              name={PANE_THEME[pane.id] ?? 'study-dark'}
              as={Link}
              to={pane.to}
              data-pane-field={i}
              className="m3-state"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              style={parseStyle(
                `flex:${weights[i]} 1 0;position:relative;display:block;overflow:hidden;` +
                  'text-decoration:none;color:var(--md-sys-color-on-surface);' +
                  `transition:flex-grow ${SPATIAL_SLOW}`,
              )}
            >
              {/* the pane's own light. primary resolves through this pane's
                  data-theme, so each room is lit differently without anyone
                  picking a colour by eye. */}
              <span
                aria-hidden="true"
                style={parseStyle(
                  'position:absolute;inset:0;pointer-events:none;' +
                    'background:linear-gradient(to top,' +
                    'color-mix(in srgb, var(--md-sys-color-primary) 22%, transparent) 0%,' +
                    'color-mix(in srgb, var(--md-sys-color-primary) 7%, transparent) 36%,' +
                    'transparent 70%);' +
                    `opacity:${on ? 1 : off ? 0.28 : 0.6};transition:opacity ${EFFECTS_SLOW}`,
                )}
              />

              <div
                style={parseStyle(
                  'position:absolute;left:0;right:0;bottom:0;padding:0 clamp(14px,2.4vw,34px) 58px;' +
                    'display:flex;flex-direction:column;align-items:flex-start;' +
                    `transform:translateY(${on ? -8 : off ? 6 : 0}px);transition:transform ${SPATIAL}`,
                )}
              >
                <Text
                  role="label-small"
                  emphasized={on}
                  style={parseStyle(
                    `${MONO};--m3-track:0.16em;` +
                      `color:var(--md-sys-color-${on ? 'primary' : 'on-surface-variant'});` +
                      `margin:0 0 20px;transition:color ${EFFECTS},font-weight ${EFFECTS}`,
                  )}
                >
                  {pane.tags}
                </Text>

                {/* Persona names: display scale in the brand face for all three.
                    They are one person, so they get one voice; the second weight
                    axis and the pane's own primary carry the difference. */}
                <h2 style={parseStyle('margin:0;display:flex;flex-direction:column')}>
                  {pane.lines.map((line) => (
                    <Text
                      key={line}
                      as="span"
                      role="display-large"
                      emphasized={on}
                      style={parseStyle(
                        '--m3-size:clamp(30px,4.4vw,var(--md-sys-typescale-display-large-size));' +
                          '--m3-lh:0.88;' +
                          `color:var(--md-sys-color-${on ? 'on-surface' : 'on-surface-variant'});` +
                          `transition:color ${EFFECTS},font-weight ${EFFECTS}`,
                      )}
                    >
                      {line}
                    </Text>
                  ))}
                </h2>

                <Text
                  role="label-small"
                  style={parseStyle(
                    `${MONO};--m3-track:0.15em;text-transform:uppercase;` +
                      'color:var(--md-sys-color-primary);margin:20px 0 0',
                  )}
                >
                  {pane.role}
                </Text>

                <Text
                  role="body-medium"
                  style={parseStyle(
                    'color:var(--md-sys-color-on-surface-variant);max-width:34ch;' +
                      'margin:14px 0 0;overflow:hidden;' +
                      `opacity:${on ? 1 : 0};max-height:${on ? '90px' : '0'};` +
                      `transition:opacity ${EFFECTS_SLOW},max-height ${SPATIAL}`,
                  )}
                >
                  {pane.desc}
                </Text>

                <Text
                  as="span"
                  role="label-small"
                  emphasized
                  style={parseStyle(
                    `${MONO};--m3-track:0.16em;display:inline-block;` +
                      'color:var(--md-sys-color-primary);margin:18px 0 0;' +
                      `opacity:${on ? 1 : 0};transform:translateX(${on ? 0 : -8}px);` +
                      `transition:opacity ${EFFECTS},transform ${SPATIAL}`,
                  )}
                >
                  ENTER →
                </Text>
              </div>
            </Theme>
          );
        })}

        {/* the seams: the fourth strand lives between the three, not beside
            them. Positioned from the same weights the panes use, so the edge
            stays welded to the boundary while the panes resize. */}
        {content.seamLabels.map((label, i) => (
          <div
            key={i}
            style={parseStyle(
              `position:absolute;top:0;bottom:0;left:${(edges[i] * 100).toFixed(3)}%;width:1px;` +
                'pointer-events:none;display:flex;align-items:center;justify-content:center;' +
                'background:linear-gradient(to bottom,transparent 0%,' +
                'var(--md-sys-color-outline-variant) 10%,var(--md-sys-color-outline) 50%,' +
                'var(--md-sys-color-outline-variant) 90%,transparent 100%);' +
                `opacity:${active === null ? 1 : 0.5};` +
                `transition:left ${SPATIAL_SLOW},opacity ${EFFECTS_SLOW}`,
            )}
          >
            <Text
              as="span"
              role="label-small"
              style={parseStyle(
                `${MONO};--m3-track:0.22em;white-space:nowrap;` +
                  'transform:rotate(90deg);transform-origin:center;' +
                  'color:var(--md-sys-color-on-surface-variant);' +
                  'background:var(--md-sys-color-surface-container-lowest);' +
                  'border-radius:var(--md-sys-shape-corner-extra-small);padding:5px 9px',
              )}
            >
              {label}
            </Text>
          </div>
        ))}

        <div
          style={parseStyle(
            'position:absolute;left:50%;bottom:26px;transform:translateX(-50%);text-align:center;' +
              `z-index:3;opacity:${active === null ? 1 : 0};transition:opacity ${EFFECTS}`,
          )}
        >
          <Text
            as="span"
            role="label-small"
            style={parseStyle(
              `${MONO};--m3-track:0.2em;color:var(--md-sys-color-on-surface-variant)`,
            )}
          >
            SCROLL
          </Text>
          <div
            style={parseStyle(
              'width:1px;height:26px;margin:9px auto 0;' +
                'background:linear-gradient(var(--md-sys-color-outline),transparent)',
            )}
          />
        </div>
      </section>

      <section ref={reveal.attach(0)} style={parseStyle(reveal.style(0))}>
        <div
          style={parseStyle(
            'position:relative;z-index:2;max-width:1080px;margin:0 auto;padding:110px 40px 0',
          )}
        >
          <Kicker>{content.thesis.kicker}</Kicker>
          <Text
            as="h3"
            role="display-medium"
            style={parseStyle(
              '--m3-size:clamp(28px,3.6vw,var(--md-sys-typescale-display-medium-size));' +
                '--m3-lh:1.14;color:var(--md-sys-color-on-surface);' +
                'margin:22px 0 26px;max-width:20ch',
            )}
          >
            {content.thesis.lead}
          </Text>
          {content.thesis.prose.map((p, i) => (
            <Text
              key={i}
              role="body-large"
              style={parseStyle(
                'color:var(--md-sys-color-on-surface-variant);max-width:66ch;' +
                  `margin:${i === 0 ? '0' : '20px 0 0'}`,
              )}
            >
              {p}
            </Text>
          ))}
        </div>
      </section>

      <section ref={reveal.attach(1)} style={parseStyle(reveal.style(1))}>
        <div
          style={parseStyle(
            'position:relative;z-index:2;max-width:1080px;margin:0 auto;padding:96px 40px 0',
          )}
        >
          <Kicker>WHERE THE WORK LIVES</Kicker>
          <div
            style={parseStyle(
              'margin:26px 0 0;border-top:1px solid var(--md-sys-color-outline-variant)',
            )}
          >
            {content.strands.map((s, i) => {
              const on = hoverRow === i;
              return (
                <Link
                  key={s.num}
                  to={s.to}
                  className="m3-state"
                  onMouseEnter={() => setHoverRow(i)}
                  onMouseLeave={() => setHoverRow(null)}
                  onFocus={() => setHoverRow(i)}
                  onBlur={() => setHoverRow(null)}
                  style={parseStyle(
                    'display:flex;align-items:baseline;gap:16px;text-decoration:none;' +
                      'border-bottom:1px solid var(--md-sys-color-outline-variant);' +
                      `padding:19px 6px 19px ${on ? '14px' : '0'};` +
                      // shape as state: the row rounds into a card as you reach it
                      `border-radius:var(--md-sys-shape-corner-${on ? 'medium' : 'none'});` +
                      `color:var(--md-sys-color-${on ? 'on-surface' : 'on-surface-variant'});` +
                      `transition:padding ${SPATIAL},border-radius ${SPATIAL},color ${EFFECTS}`,
                  )}
                >
                  <Text
                    as="span"
                    role="label-small"
                    style={parseStyle(
                      `${MONO};--m3-track:0.12em;flex:none;` +
                        `color:var(--md-sys-color-${on ? 'primary' : 'on-surface-variant'});` +
                        `transition:color ${EFFECTS}`,
                    )}
                  >
                    {s.num}
                  </Text>
                  <Text
                    as="span"
                    role="headline-small"
                    emphasized={on}
                    style={parseStyle(`flex:none;transition:font-weight ${EFFECTS}`)}
                  >
                    {s.title}
                  </Text>
                  <span
                    style={parseStyle(
                      'flex:1;min-width:20px;height:1px;align-self:center;' +
                        'background:repeating-linear-gradient(to right,' +
                        `var(--md-sys-color-${on ? 'primary' : 'outline-variant'}) 0 2px,` +
                        'transparent 2px 7px)',
                    )}
                  />
                  <Text
                    as="span"
                    role="label-small"
                    style={parseStyle(
                      `${MONO};--m3-track:0.06em;flex:none;` +
                        'color:var(--md-sys-color-on-surface-variant)',
                    )}
                  >
                    {s.meta}
                  </Text>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section ref={reveal.attach(2)} style={parseStyle(reveal.style(2))}>
        <div
          style={parseStyle(
            'position:relative;z-index:2;max-width:1080px;margin:0 auto;padding:96px 40px 130px',
          )}
        >
          <Kicker>WAYS IN</Kicker>
          <div style={parseStyle('display:flex;gap:18px;flex-wrap:wrap;margin:26px 0 0')}>
            {content.doors.map((d) => {
              /*
               * The house card: outlined surface, state layer, and the hover
               * shape-morph and lift that m3.css already owns. The card rests
               * at extra-large (28px) with 20px of padding, so the chip nested
               * inside sits at small (8px) — inner = outer − padding, never
               * equal.
               */
              const cls = 'm3-card m3-card--outlined m3-state';
              const style = parseStyle(
                'flex:1 1 250px;display:flex;flex-direction:column;gap:10px',
              );
              const inner = (
                <>
                  <Chip style={parseStyle('align-self:flex-start')}>{d.kick}</Chip>
                  <Text
                    as="span"
                    role="headline-small"
                    style={parseStyle('color:var(--md-sys-color-on-surface);margin:4px 0 0')}
                  >
                    {d.title}
                  </Text>
                  <Text
                    as="span"
                    role="body-medium"
                    style={parseStyle('color:var(--md-sys-color-on-surface-variant)')}
                  >
                    {d.desc}
                  </Text>
                </>
              );
              return d.to.startsWith('http') ? (
                <a
                  key={d.kick}
                  href={d.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cls}
                  style={style}
                >
                  {inner}
                </a>
              ) : (
                <Link key={d.kick} to={d.to} className={cls} style={style}>
                  {inner}
                </Link>
              );
            })}
          </div>
          <div style={parseStyle('margin:64px 0 0')}>
            <Divider />
            <Text
              role="label-small"
              style={parseStyle(
                `${MONO};--m3-track:0.08em;padding:22px 0 0;` +
                  'color:var(--md-sys-color-on-surface-variant)',
              )}
            >
              {content.footNote}
            </Text>
          </div>
        </div>
      </section>
    </Theme>
  );
}

function Kicker({ children }) {
  return (
    <Text
      role="label-small"
      style={parseStyle(
        `${MONO};--m3-track:0.2em;margin:0;color:var(--md-sys-color-on-surface-variant)`,
      )}
    >
      {children}
    </Text>
  );
}

/**
 * The three background fields, one per pane: standing waves, a drifting
 * embedding cloud, and a circuit lattice with a travelling pulse. Ported from
 * initField/seedDots/loop in the prototype; the changes are that it reads the
 * hovered pane out of a ref instead of this.state, that its region boundaries
 * chase the panes instead of sitting at fixed thirds, and that its ink comes
 * off the live tokens rather than a hardcoded palette.
 */
function runField(canvas, activeRef, themedPanes) {
  const N = content.panes.length;
  let W = 0;
  let H = 0;
  let dots = [];
  let ink = [];
  let t = 0;
  let raf = 0;

  // region boundaries, and their velocity. Canvas can't use a CSS curve, so
  // this is a light underdamped integrator — the same slight overshoot the
  // spatial spring gives the layout it sits behind.
  let edge = paneEdges(null, N);
  let vel = edge.map(() => 0);

  /*
   * Per-pixel colour is legitimately imperative, so this is the one place hex
   * is allowed — except it isn't hex. Each pane's resolved --md-sys-color-primary
   * is read off the themed element itself, which means the field follows the
   * theme instead of drifting away from it.
   */
  const readInk = () => {
    const els = themedPanes();
    const fallback = window.getComputedStyle(canvas).color;
    ink = Array.from({ length: N }, (_, i) => {
      const el = els[i];
      if (!el) return fallback;
      const cs = window.getComputedStyle(el);
      return cs.getPropertyValue('--md-sys-color-primary').trim() || fallback;
    });
  };

  const seedDots = () => {
    const n = Math.round((W * H) / 14000);
    dots = Array.from({ length: n }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.16,
      vy: (Math.random() - 0.5) * 0.16,
      r: 0.7 + Math.random() * 1.3,
    }));
  };

  const fit = () => {
    const d = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * d;
    canvas.height = window.innerHeight * d;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(d, 0, 0, d, 0, 0);
    W = window.innerWidth;
    H = window.innerHeight;
    readInk();
    seedDots();
  };

  fit();
  window.addEventListener('resize', fit);

  const loop = () => {
    t += 1;
    const ctx = canvas.getContext('2d');
    if (ctx && W) {
      ctx.clearRect(0, 0, W, H);

      const act = activeRef.current;
      const gain = (i) => (act === null ? 0.55 : act === i ? 1 : 0.2);

      const target = paneEdges(act, N);
      for (let i = 0; i < edge.length; i++) {
        vel[i] = (vel[i] + (target[i] - edge[i]) * 0.1) * 0.72;
        edge[i] += vel[i];
      }
      const bound = [0, ...edge.map((e) => e * W), W];

      /* pane 1 — standing wave lines */
      ctx.save();
      ctx.beginPath();
      ctx.rect(bound[0], 0, bound[1] - bound[0], H);
      ctx.clip();
      ctx.globalAlpha = 0.42 * gain(0);
      ctx.strokeStyle = ink[0];
      ctx.lineWidth = 1;
      for (let k = 0; k < 13; k++) {
        ctx.beginPath();
        let first = true;
        for (let x = bound[0]; x <= bound[1]; x += 7) {
          const y =
            H * 0.3 +
            k * 26 +
            Math.sin(x * 0.011 + t * 0.011 + k * 0.5) * (16 + k * 1.4) +
            Math.sin(x * 0.004 - t * 0.006) * 9;
          if (first) {
            ctx.moveTo(x, y);
            first = false;
          } else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();

      /* pane 2 — drifting embedding cloud with short links */
      ctx.save();
      ctx.beginPath();
      ctx.rect(bound[1], 0, bound[2] - bound[1], H);
      ctx.clip();
      const g2 = gain(1);
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < bound[1]) d.x = bound[2];
        if (d.x > bound[2]) d.x = bound[1];
        if (d.y < 0) d.y = H;
        if (d.y > H) d.y = 0;
      }
      const near = dots.filter((d) => d.x >= bound[1] && d.x <= bound[2]);
      ctx.globalAlpha = 0.2 * g2;
      ctx.strokeStyle = ink[1];
      ctx.lineWidth = 0.6;
      for (let i = 0; i < near.length; i++) {
        for (let j = i + 1; j < near.length; j++) {
          const dx = near[i].x - near[j].x;
          const dy = near[i].y - near[j].y;
          if (dx * dx + dy * dy < 8200) {
            ctx.beginPath();
            ctx.moveTo(near[i].x, near[i].y);
            ctx.lineTo(near[j].x, near[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 0.62 * g2;
      ctx.fillStyle = ink[1];
      for (const d of near) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, 6.284);
        ctx.fill();
      }
      ctx.restore();

      /* pane 3 — circuit lattice with a travelling pulse */
      ctx.save();
      ctx.beginPath();
      ctx.rect(bound[2], 0, bound[3] - bound[2], H);
      ctx.clip();
      const g3 = gain(2);
      const step = 42;
      ctx.globalAlpha = 0.26 * g3;
      ctx.strokeStyle = ink[2];
      ctx.lineWidth = 1;
      for (let x = bound[2]; x < W + step; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H + step; y += step) {
        ctx.beginPath();
        ctx.moveTo(bound[2], y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
      ctx.globalAlpha = 0.9 * g3;
      ctx.fillStyle = ink[2];
      const span = Math.max(1, bound[3] - bound[2]);
      for (let k = 0; k < 5; k++) {
        const px = bound[2] + ((t * 1.5 + k * 130) % span);
        const py = Math.floor((H * 0.2 + k * 97) / step) * step;
        ctx.beginPath();
        ctx.arc(px, py, 2.4, 0, 6.284);
        ctx.fill();
        ctx.globalAlpha = 0.22 * g3;
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, 6.284);
        ctx.fill();
        ctx.globalAlpha = 0.9 * g3;
      }
      ctx.restore();
      ctx.globalAlpha = 1;
    }
    raf = requestAnimationFrame(loop);
  };

  loop();

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', fit);
  };
}

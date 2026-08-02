import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { parseStyle } from '../lib/style.js';
import { fonts, intro as C } from '../components/tokens.js';
import useReveal from '../components/useReveal.js';
import content from '../content/intro.js';

const SECTION_COUNT = 3;

/** / — ported from "Intro.dc.html". */
export default function Intro() {
  const canvasRef = useRef(null);
  const activeRef = useRef(null);
  const [active, setActive] = useState(null);
  const [hoverRow, setHoverRow] = useState(null);
  const [hoverDoor, setHoverDoor] = useState(null);

  const reveal = useReveal(SECTION_COUNT, {
    threshold: 0.15,
    distance: 22,
    duration: '.8s',
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
    return runField(canvas, activeRef);
  }, [reveal.reduced]);

  return (
    <div
      style={parseStyle(
        `min-height:100vh;background:${C.ground};color:${C.paper};font-family:${fonts.body};` +
          `-webkit-font-smoothing:antialiased;position:relative;overflow-x:hidden`,
      )}
    >
      <canvas
        ref={canvasRef}
        style={parseStyle(
          'position:fixed;inset:0;width:100%;height:100%;z-index:0;display:block',
        )}
      />
      <div
        style={parseStyle(
          'position:fixed;inset:0;z-index:1;pointer-events:none;' +
            'background:radial-gradient(120% 80% at 50% 0%,rgba(0,0,0,0) 30%,rgba(9,9,8,0.55) 78%,rgba(9,9,8,0.9) 100%)',
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
            <Link
              key={pane.id}
              to={pane.to}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              style={parseStyle(
                `flex:${on ? 1.55 : off ? 0.72 : 1};position:relative;display:block;` +
                  `text-decoration:none;padding:0;transition:flex .85s cubic-bezier(.16,1,.3,1);` +
                  `border-right:${i < 2 ? ' 1px solid rgba(234,230,220,0.07)' : 'none'};overflow:hidden`,
              )}
            >
              <div
                style={parseStyle(
                  'position:absolute;left:0;right:0;bottom:0;padding:0 34px 58px;' +
                    'display:flex;flex-direction:column;align-items:flex-start',
                )}
              >
                <p
                  style={parseStyle(
                    `font-family:${fonts.mono};font-size:8.5px;letter-spacing:0.16em;` +
                      `color:${on ? pane.accent : C.dimmed};margin:0 0 20px;transition:color .5s`,
                  )}
                >
                  {pane.tags}
                </p>
                <h2
                  style={parseStyle('margin:0;display:flex;flex-direction:column;line-height:0.88')}
                >
                  {pane.lines.map((line) => (
                    <span
                      key={line}
                      style={parseStyle(
                        `font-family:${pane.font};font-weight:${pane.weight};` +
                          `letter-spacing:${pane.tracking};font-size:clamp(30px,4.4vw,62px);` +
                          `color:${on ? C.paper : '#b9b3a8'};transition:color .5s`,
                      )}
                    >
                      {line}
                    </span>
                  ))}
                </h2>
                <p
                  style={parseStyle(
                    `font-family:${fonts.mono};font-size:10px;letter-spacing:0.15em;` +
                      `text-transform:uppercase;color:${pane.accent};margin:20px 0 0`,
                  )}
                >
                  {pane.role}
                </p>
                <p
                  style={parseStyle(
                    `font-size:14px;line-height:1.6;color:#9a948a;max-width:34ch;margin:14px 0 0;` +
                      `opacity:${on ? 1 : 0};max-height:${on ? '90px' : '0'};transition:opacity .55s,max-height .7s`,
                  )}
                >
                  {pane.desc}
                </p>
                <span
                  style={parseStyle(
                    `font-family:${fonts.mono};font-size:10px;letter-spacing:0.16em;color:${pane.accent};` +
                      `margin:18px 0 0;opacity:${on ? 1 : 0};transform:translateX(${on ? 0 : -8}px);` +
                      `transition:opacity .5s,transform .5s`,
                  )}
                >
                  ENTER →
                </span>
              </div>
            </Link>
          );
        })}

        {/* the seams: the fourth strand lives between the three, not beside them */}
        {content.seamLabels.map((label, i) => (
          <div
            key={i}
            style={parseStyle(
              `position:absolute;top:0;bottom:0;left:${(i + 1) * 33.333}%;width:1px;` +
                `pointer-events:none;display:flex;align-items:center;justify-content:center;` +
                `opacity:${active === null ? 0.9 : 0.25};transition:opacity .6s`,
            )}
          >
            <span
              style={parseStyle(
                `font-family:${fonts.mono};font-size:8px;letter-spacing:0.22em;color:${C.dimmed};` +
                  `white-space:nowrap;transform:rotate(90deg);transform-origin:center;` +
                  `background:${C.ground};padding:5px 9px`,
              )}
            >
              {label}
            </span>
          </div>
        ))}

        <div
          style={parseStyle(
            `position:absolute;left:50%;bottom:26px;transform:translateX(-50%);text-align:center;` +
              `z-index:3;opacity:${active === null ? 0.85 : 0};transition:opacity .5s`,
          )}
        >
          <span
            style={parseStyle(
              `font-family:${fonts.mono};font-size:9.5px;letter-spacing:0.2em;color:#6b665e`,
            )}
          >
            SCROLL
          </span>
          <div
            style={parseStyle(
              'width:1px;height:26px;margin:9px auto 0;background:linear-gradient(#6b665e,transparent)',
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
          <h3
            style={parseStyle(
              `font-family:${fonts.display};font-weight:300;font-size:clamp(28px,3.6vw,44px);` +
                `letter-spacing:-0.025em;line-height:1.14;margin:22px 0 26px;max-width:20ch;color:${C.paper}`,
            )}
          >
            {content.thesis.lead}
          </h3>
          {content.thesis.prose.map((p, i) => (
            <p
              key={i}
              style={parseStyle(
                `font-size:16px;line-height:1.72;color:#a49e93;max-width:66ch;margin:${i === 0 ? '0' : '20px 0 0'}`,
              )}
            >
              {p}
            </p>
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
            style={parseStyle(`margin:26px 0 0;border-top:1px solid ${C.hairline}`)}
          >
            {content.strands.map((s, i) => {
              const on = hoverRow === i;
              return (
                <Link
                  key={s.num}
                  to={s.to}
                  onMouseEnter={() => setHoverRow(i)}
                  onMouseLeave={() => setHoverRow(null)}
                  style={parseStyle(
                    `display:flex;align-items:baseline;gap:16px;padding:19px 6px 19px 0;` +
                      `text-decoration:none;border-bottom:1px solid rgba(234,230,220,0.10);` +
                      `color:${on ? C.paper : '#b9b3a8'};transition:color .3s`,
                  )}
                >
                  <span
                    style={parseStyle(
                      `font-family:${fonts.mono};font-size:10px;letter-spacing:0.12em;` +
                        `color:${on ? C.ryukijano : C.dimmed};flex:none;transition:color .3s`,
                    )}
                  >
                    {s.num}
                  </span>
                  <span
                    style={parseStyle(
                      `font-family:${fonts.display};font-size:21px;font-weight:300;flex:none`,
                    )}
                  >
                    {s.title}
                  </span>
                  <span
                    style={parseStyle(
                      `flex:1;min-width:20px;height:1px;align-self:center;` +
                        `background:repeating-linear-gradient(to right,${on ? 'rgba(111,159,216,0.5)' : 'rgba(234,230,220,0.18)'} 0 2px,transparent 2px 7px)`,
                    )}
                  />
                  <span
                    style={parseStyle(
                      `font-family:${fonts.mono};font-size:10px;letter-spacing:0.06em;color:${C.muted};flex:none`,
                    )}
                  >
                    {s.meta}
                  </span>
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
            {content.doors.map((d, i) => {
              const on = hoverDoor === i;
              const style =
                `flex:1 1 250px;display:flex;flex-direction:column;gap:9px;padding:26px;` +
                `text-decoration:none;border:1px solid ${on ? 'rgba(111,159,216,0.45)' : 'rgba(234,230,220,0.13)'};` +
                `border-radius:11px;background:${on ? 'rgba(111,159,216,0.05)' : 'transparent'};` +
                `transition:border-color .35s,background .35s`;
              const inner = (
                <>
                  <span
                    style={parseStyle(
                      `font-family:${fonts.mono};font-size:9px;letter-spacing:0.16em;` +
                        `color:${on ? C.ryukijano : C.dimmed};transition:color .35s`,
                    )}
                  >
                    {d.kick}
                  </span>
                  <span
                    style={parseStyle(
                      `font-family:${fonts.display};font-size:20px;font-weight:300;color:${C.paper}`,
                    )}
                  >
                    {d.title}
                  </span>
                  <span
                    style={parseStyle(`font-size:12.5px;line-height:1.55;color:${C.muted}`)}
                  >
                    {d.desc}
                  </span>
                </>
              );
              const handlers = {
                onMouseEnter: () => setHoverDoor(i),
                onMouseLeave: () => setHoverDoor(null),
              };
              return d.to.startsWith('http') ? (
                <a
                  key={d.kick}
                  href={d.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={parseStyle(style)}
                  {...handlers}
                >
                  {inner}
                </a>
              ) : (
                <Link key={d.kick} to={d.to} style={parseStyle(style)} {...handlers}>
                  {inner}
                </Link>
              );
            })}
          </div>
          <p
            style={parseStyle(
              `font-family:${fonts.mono};font-size:10px;letter-spacing:0.08em;color:${C.dimmed};` +
                `margin:64px 0 0;border-top:1px solid rgba(234,230,220,0.10);padding:22px 0 0`,
            )}
          >
            {content.footNote}
          </p>
        </div>
      </section>
    </div>
  );
}

function Kicker({ children }) {
  return (
    <p
      style={parseStyle(
        `font-family:${fonts.mono};font-size:10px;letter-spacing:0.2em;color:${C.dimmed};margin:0`,
      )}
    >
      {children}
    </p>
  );
}

/**
 * The three background fields, one per pane: standing waves, a drifting
 * embedding cloud, and a circuit lattice with a travelling pulse. Ported from
 * initField/seedDots/loop in the prototype; the only change is that it reads
 * the hovered pane out of a ref instead of this.state.
 */
function runField(canvas, activeRef) {
  let W = 0;
  let H = 0;
  let dots = [];
  let t = 0;
  let raf = 0;

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
    seedDots();
  };

  fit();
  window.addEventListener('resize', fit);

  const loop = () => {
    t += 1;
    const ctx = canvas.getContext('2d');
    if (ctx && W) {
      const third = W / 3;
      ctx.clearRect(0, 0, W, H);

      const act = activeRef.current;
      const gain = (i) => (act === null ? 0.55 : act === i ? 1 : 0.2);

      /* pane 1 — standing wave lines */
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, third, H);
      ctx.clip();
      ctx.globalAlpha = 0.42 * gain(0);
      ctx.strokeStyle = C.ryukijano;
      ctx.lineWidth = 1;
      for (let k = 0; k < 13; k++) {
        ctx.beginPath();
        for (let x = 0; x <= third; x += 7) {
          const y =
            H * 0.3 +
            k * 26 +
            Math.sin(x * 0.011 + t * 0.011 + k * 0.5) * (16 + k * 1.4) +
            Math.sin(x * 0.004 - t * 0.006) * 9;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();

      /* pane 2 — drifting embedding cloud with short links */
      ctx.save();
      ctx.beginPath();
      ctx.rect(third, 0, third, H);
      ctx.clip();
      const g2 = gain(1);
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < third) d.x = third * 2;
        if (d.x > third * 2) d.x = third;
        if (d.y < 0) d.y = H;
        if (d.y > H) d.y = 0;
      }
      const near = dots.filter((d) => d.x >= third && d.x <= third * 2);
      ctx.globalAlpha = 0.2 * g2;
      ctx.strokeStyle = C.gyanateet;
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
      ctx.fillStyle = C.gyanateet;
      for (const d of near) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, 6.284);
        ctx.fill();
      }
      ctx.restore();

      /* pane 3 — circuit lattice with a travelling pulse */
      ctx.save();
      ctx.beginPath();
      ctx.rect(third * 2, 0, third, H);
      ctx.clip();
      const g3 = gain(2);
      const step = 42;
      ctx.globalAlpha = 0.26 * g3;
      ctx.strokeStyle = C.ryoushi;
      ctx.lineWidth = 1;
      for (let x = third * 2; x < W + step; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H + step; y += step) {
        ctx.beginPath();
        ctx.moveTo(third * 2, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
      ctx.globalAlpha = 0.9 * g3;
      ctx.fillStyle = C.ryoushi;
      for (let k = 0; k < 5; k++) {
        const px = third * 2 + ((t * 1.5 + k * 130) % third);
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

import { useEffect, useRef } from 'react';
import { parseStyle } from '../lib/style.js';
import { Text, Theme } from './m3/index.jsx';
import { Caption } from './MediaFigure.jsx';

const MODES = [
  { id: 'waves', label: 'WAVES', theme: 'ryukijano-dark' },
  { id: 'dots', label: 'DOTS', theme: 'study-dark' },
  { id: 'lattice', label: 'LATTICE', theme: 'ryoushi-dark' },
];

const UNDERLAY = '/assets/images/kanagawa_latentspace_autoencoder.jpg';

/**
 * Figure 1: one woodblock, three readings.
 *
 * The jpg is a real <img>. The 2D canvas sits on top and redraws the three
 * languages that used to live in the dusk triptych — standing waves, an
 * embedding cloud, a circuit lattice — over the same picture. No WebGL, no
 * drawing the photograph into the canvas.
 *
 * `mode` is null (all three at rest gain) or one of waves / dots / lattice.
 */
export default function KanagawaField({
  mode = null,
  onMode,
  caption,
  highlight = 'schematic',
}) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const modeRef = useRef(mode);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return undefined;
    if (stillOnly()) return undefined;
    return runField(canvas, wrap, modeRef);
  }, []);

  return (
    <figure style={{ margin: 0 }} id="fig-kanagawa">
      <div
        ref={wrapRef}
        style={parseStyle(
          'position:relative;overflow:hidden;' +
            'height:min(52vh, 480px);' +
            'background:var(--md-sys-color-surface);' +
            'border:1px solid var(--md-sys-color-on-surface)',
        )}
      >
        <img
          src={UNDERLAY}
          alt="Hokusai's wave reconstructed by a latent autoencoder: painted on the left, dithered in the middle, wireframed on the right"
          style={parseStyle(
            'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block',
          )}
        />
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={parseStyle('position:absolute;inset:0;width:100%;height:100%;display:block')}
        />
        {MODES.map((item) => (
          <Theme
            key={item.id}
            name={item.theme}
            as="span"
            data-field-ink={item.id}
            aria-hidden="true"
            style={parseStyle(
              'position:absolute;width:0;height:0;overflow:hidden;pointer-events:none',
            )}
          />
        ))}
      </div>
      <div
        role="group"
        aria-label="Canvas reading"
        style={parseStyle(
          'display:flex;gap:1.25rem;margin:0.75rem 0 0;flex-wrap:wrap',
        )}
      >
        {MODES.map((item) => {
          const on = mode === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={on}
              onMouseEnter={() => onMode?.(item.id)}
              onFocus={() => onMode?.(item.id)}
              onClick={() => onMode?.(item.id)}
              style={parseStyle(
                'padding:0;border:0;background:none;cursor:pointer;' +
                  'font:inherit;color:inherit',
              )}
            >
              <Text
                as="span"
                role="label-small"
                emphasized={on}
                style={parseStyle(
                  '--m3-font:var(--md-sys-typescale-mono-font);--m3-track:0.14em;' +
                    `color:var(--md-sys-color-${on ? 'primary' : 'on-surface-variant'})`,
                )}
              >
                {item.label}
              </Text>
            </button>
          );
        })}
      </div>
      {caption ? <Caption text={caption} highlight={highlight} /> : null}
    </figure>
  );
}

function stillOnly() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return true;
  }
  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.matchMedia('(max-width: 899px)').matches
  );
}

/**
 * Three readings of one rectangle. Ink is the computed primary of each
 * hidden themed probe — the allowed exception to the hex-in-JSX ban.
 */
function runField(canvas, wrap, modeRef) {
  let W = 0;
  let H = 0;
  let dots = [];
  let ink = { waves: '', dots: '', lattice: '' };
  let t = 0;
  let raf = 0;

  const readInk = () => {
    const fallback = window.getComputedStyle(canvas).color;
    for (const id of ['waves', 'dots', 'lattice']) {
      const el = wrap.querySelector(`[data-field-ink="${id}"]`);
      const cs = el ? window.getComputedStyle(el) : null;
      ink[id] = cs?.getPropertyValue('--md-sys-color-primary').trim() || fallback;
    }
  };

  const seedDots = () => {
    const n = Math.max(24, Math.round((W * H) / 14000));
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
    const box = wrap.getBoundingClientRect();
    W = Math.max(1, Math.floor(box.width));
    H = Math.max(1, Math.floor(box.height));
    canvas.width = W * d;
    canvas.height = H * d;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(d, 0, 0, d, 0, 0);
    readInk();
    seedDots();
  };

  const gainOf = (id) => {
    const act = modeRef.current;
    if (act === null) return 0.55;
    return act === id ? 1 : 0.2;
  };

  fit();
  window.addEventListener('resize', fit);

  const loop = () => {
    t += 1;
    const ctx = canvas.getContext('2d');
    if (ctx && W) {
      ctx.clearRect(0, 0, W, H);

      const gW = gainOf('waves');
      ctx.save();
      ctx.globalAlpha = 0.42 * gW;
      ctx.strokeStyle = ink.waves;
      ctx.lineWidth = 1;
      for (let k = 0; k < 13; k++) {
        ctx.beginPath();
        let first = true;
        for (let x = 0; x <= W; x += 7) {
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

      const gD = gainOf('dots');
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = W;
        if (d.x > W) d.x = 0;
        if (d.y < 0) d.y = H;
        if (d.y > H) d.y = 0;
      }
      ctx.save();
      ctx.globalAlpha = 0.2 * gD;
      ctx.strokeStyle = ink.dots;
      ctx.lineWidth = 0.6;
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          if (dx * dx + dy * dy < 8200) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 0.62 * gD;
      ctx.fillStyle = ink.dots;
      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, 6.284);
        ctx.fill();
      }
      ctx.restore();

      const gL = gainOf('lattice');
      const step = 42;
      ctx.save();
      ctx.globalAlpha = 0.26 * gL;
      ctx.strokeStyle = ink.lattice;
      ctx.lineWidth = 1;
      for (let x = 0; x < W + step; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H + step; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
      ctx.globalAlpha = 0.9 * gL;
      ctx.fillStyle = ink.lattice;
      for (let k = 0; k < 5; k++) {
        const px = (t * 1.5 + k * 130) % Math.max(1, W);
        const py = Math.floor((H * 0.2 + k * 97) / step) * step;
        ctx.beginPath();
        ctx.arc(px, py, 2.4, 0, 6.284);
        ctx.fill();
        ctx.globalAlpha = 0.22 * gL;
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, 6.284);
        ctx.fill();
        ctx.globalAlpha = 0.9 * gL;
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

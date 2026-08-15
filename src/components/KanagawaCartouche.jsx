import { parseStyle } from '../lib/style.js';

const WAVE = '/assets/images/kanagawa_latentspace_autoencoder.jpg';

/**
 * Opening impression: the wave as a Distill l-screen band, bio on a paper
 * title slip — the same move as Hokusai's cartouche in the upper-left of
 * the print. Type stays on cream so it does not multiply into Prussian blue.
 *
 * The band is a slice of the page, not a 100vh takeover. It pulls under the
 * sticky veil nav so the first screen is one impression. A straight-line
 * bokashi at the bottom dissolves the plate into the article, the way the
 * printers graded the sky around Fuji.
 *
 * Default crop is the painted woodblock. `pan` (0–1) slides toward the
 * wireframe when a Figure 2 column locks a reading.
 */

const BAND = parseStyle(
  'position:relative;display:flex;align-items:flex-end;justify-content:flex-start;' +
    'box-sizing:border-box;overflow:hidden;isolation:isolate;width:100%;' +
    'min-height:min(52vh, 32rem);margin-top:-3rem;' +
    'padding:calc(3rem + min(22vh, 8rem)) clamp(1.25rem,4vw,3rem) clamp(2.25rem,6vw,3.75rem)',
);

const PLATE = parseStyle(
  'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;' +
    'pointer-events:none;max-width:none;' +
    'transform:scale(var(--cartouche-zoom, 1.55));' +
    'transition:transform-origin var(--md-sys-motion-duration-expressive-slow-spatial) ' +
    'var(--md-sys-motion-spring-expressive-slow-spatial)',
);

const BOKASHI = parseStyle(
  'position:absolute;left:0;right:0;bottom:0;height:min(38%, 9rem);pointer-events:none;z-index:1;' +
    'background:linear-gradient(to top, var(--md-sys-color-surface) 0%, ' +
    'color-mix(in srgb, var(--md-sys-color-surface) 72%, transparent) 42%, transparent 100%)',
);

const SLIP = parseStyle(
  'position:relative;z-index:2;max-width:42rem;width:100%;' +
    'background:var(--md-sys-color-surface);color:var(--md-sys-color-on-surface);' +
    'border:1px solid var(--md-sys-color-on-surface);padding:5px;' +
    'box-shadow:0 0 0 3px var(--md-sys-color-surface), 0 0 0 4px var(--md-sys-color-on-surface);' +
    'font-family:var(--md-sys-typescale-brand-font)',
);

const HANKO = parseStyle(
  'position:absolute;top:-0.35rem;right:0.85rem;width:1.15rem;height:1.15rem;z-index:3;' +
    'background:var(--md-sys-color-primary);pointer-events:none;transform:rotate(-2.5deg);' +
    'box-shadow:inset 0 0 0 1.5px color-mix(in srgb, var(--md-sys-color-on-primary) 55%, transparent)',
);

const FACE = parseStyle(
  'border:1px solid var(--md-sys-color-on-surface);' +
    'padding:clamp(1.15rem,3.2vw,2.05rem) clamp(1.2rem,3.4vw,2.25rem);' +
    'color:var(--md-sys-color-on-surface)',
);

export default function KanagawaCartouche({ children, pan = 0 }) {
  const t = Math.min(1, Math.max(0, Number(pan) || 0));

  return (
    <header className="kanagawa-cartouche" style={BAND}>
      <img
        src={WAVE}
        alt=""
        fetchPriority="high"
        decoding="async"
        className="kanagawa-cartouche__plate"
        style={{
          ...PLATE,
          transformOrigin: `${t * 100}% 42%`,
        }}
      />
      <div aria-hidden="true" style={BOKASHI} />
      <div style={SLIP}>
        <span aria-hidden="true" style={HANKO} />
        <div style={FACE}>{children}</div>
      </div>
    </header>
  );
}

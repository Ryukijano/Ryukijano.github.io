import { parseStyle } from '../lib/style.js';

const WAVE = '/assets/images/kanagawa_latentspace_autoencoder.jpg';

/**
 * Opening impression: the claw frames a Fuji-sized title slip in the hollow.
 * Name and role sit on cream; the long bio lives in the article standfirst
 * so the wave is actually visible. A vertical English series tab stands in
 * for the print's title cartouche — no kanji, no museum-label fiction.
 *
 * The band is a Distill l-screen slice, not a 100vh takeover. Ichimonji
 * bokashi dissolves the plate into the sheet. `pan` (0–1) slides the crop
 * from the painted hollow toward the wireframe.
 */

const BAND = parseStyle(
  'position:relative;display:block;box-sizing:border-box;overflow:hidden;' +
    'isolation:isolate;width:100%;margin-top:-3rem',
);

const PLATE = parseStyle(
  'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;' +
    'pointer-events:none;max-width:none;' +
    'transform:scale(var(--cartouche-zoom, 1.14));' +
    'transition:transform-origin var(--md-sys-motion-duration-expressive-slow-spatial) ' +
    'var(--md-sys-motion-spring-expressive-slow-spatial)',
);

const BOKASHI = parseStyle(
  'position:absolute;left:0;right:0;bottom:0;height:min(30%, 7rem);pointer-events:none;z-index:1;' +
    'background:linear-gradient(to top, var(--md-sys-color-surface) 0%, ' +
    'color-mix(in srgb, var(--md-sys-color-surface) 72%, transparent) 42%, transparent 100%)',
);

const SLIP = parseStyle(
  'background:var(--md-sys-color-surface);color:var(--md-sys-color-on-surface);' +
    'border:1px solid var(--md-sys-color-on-surface);padding:4px;' +
    'box-shadow:0 0 0 3px var(--md-sys-color-surface), 0 0 0 4px var(--md-sys-color-on-surface);' +
    'font-family:var(--md-sys-typescale-brand-font)',
);

const HANKO = parseStyle(
  'position:absolute;top:-0.3rem;right:0.55rem;width:0.95rem;height:0.95rem;z-index:3;' +
    'background:var(--md-sys-color-primary);pointer-events:none;transform:rotate(-2.5deg);' +
    'box-shadow:inset 0 0 0 1.5px color-mix(in srgb, var(--md-sys-color-on-primary) 55%, transparent)',
);

const FACE = parseStyle(
  'border:1px solid var(--md-sys-color-on-surface);' +
    'padding:clamp(0.65rem,2vw,0.95rem) clamp(0.7rem,2.2vw,1rem);' +
    'color:var(--md-sys-color-on-surface)',
);

const TAB = parseStyle(
  'background:var(--md-sys-color-surface);color:var(--md-sys-color-on-surface-variant);' +
    'border:1px solid var(--md-sys-color-on-surface);padding:0.45rem 0.3rem;' +
    'box-shadow:0 0 0 3px var(--md-sys-color-surface), 0 0 0 4px var(--md-sys-color-on-surface);' +
    'font-family:var(--md-sys-typescale-mono-font);letter-spacing:0.14em;' +
    'writing-mode:vertical-rl;text-orientation:mixed',
);

export default function KanagawaCartouche({ children, pan = 0 }) {
  const t = Math.min(1, Math.max(0, Number(pan) || 0));
  const originX = 28 + t * 72;

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
          transformOrigin: `${originX}% var(--cartouche-origin-y, 38%)`,
        }}
      />
      <div aria-hidden="true" style={BOKASHI} />
      <p className="kanagawa-cartouche__tab" style={TAB}>
        <span className="kanagawa-cartouche__tab-full">PLATE</span>
        <span className="kanagawa-cartouche__tab-short">PLATE</span>
      </p>
      <div className="kanagawa-cartouche__slip" style={SLIP}>
        <span aria-hidden="true" style={HANKO} />
        <div style={FACE}>{children}</div>
      </div>
    </header>
  );
}

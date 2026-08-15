import { parseStyle } from '../lib/style.js';

const WAVE = '/assets/images/kanagawa_latentspace_autoencoder.jpg';

/**
 * Home masthead. The autoencoder wave is a full-bleed band; the bio sits on a
 * paper cartouche — the same editorial move as Hokusai's white title slip in
 * the upper-left of *Kanagawa-oki nami ura*.
 *
 * The jpg reads left → right as painted woodblock, RGB dither, neon wireframe.
 * Default crop is the painted side (`object-position: left`). `pan` (0–1)
 * slides that crop toward the wireframe. It is a still, not a Ken Burns: the
 * print does not move, and reduced-motion has nothing to disable.
 *
 * Type lives on cream paper (`--md-sys-color-surface`) inside a double
 * hairline, so it stays readable against Prussian blue and black. The band
 * is a slice of the page (`min-height: 70vh`), not a viewport takeover.
 */

const BAND = parseStyle(
  'position:relative;display:flex;align-items:flex-start;justify-content:flex-start;' +
    'box-sizing:border-box;overflow:hidden;isolation:isolate;' +
    'width:100vw;margin-left:calc(50% - 50vw);margin-right:calc(50% - 50vw);' +
    'min-height:70vh;' +
    'padding:clamp(1.5rem,5vw,3.25rem) clamp(1.25rem,4vw,3rem) clamp(2.25rem,7vw,4.5rem);' +
    'background:var(--md-sys-color-surface);color:var(--md-sys-color-on-surface);' +
    'border-bottom:1px solid var(--md-sys-color-outline-variant)',
);

const PLATE = parseStyle(
  'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;' +
    'pointer-events:none;transition:none',
);

const SLIP = parseStyle(
  'position:relative;z-index:1;max-width:42rem;width:100%;' +
    'background:var(--md-sys-color-surface);color:var(--md-sys-color-on-surface);' +
    'border:1px solid var(--md-sys-color-outline-variant);padding:5px;' +
    'font-family:var(--md-sys-typescale-brand-font)',
);

const SEAL = parseStyle(
  'position:absolute;top:0;right:1rem;width:5px;height:5px;' +
    'background:var(--md-sys-color-primary);pointer-events:none',
);

const FACE = parseStyle(
  'border:1px solid var(--md-sys-color-outline-variant);' +
    'padding:clamp(1.15rem,3.2vw,2.05rem) clamp(1.2rem,3.4vw,2.25rem);' +
    'color:var(--md-sys-color-on-surface)',
);

export default function KanagawaCartouche({ children, pan = 0 }) {
  const t = Math.min(1, Math.max(0, +pan || 0));

  return (
    <header style={BAND}>
      <img
        src={WAVE}
        alt="Hokusai's wave reconstructed by a latent autoencoder: painted on the left, dithered in the middle, wireframed on the right"
        fetchPriority="high"
        decoding="async"
        style={{
          ...PLATE,
          objectPosition: t === 0 ? 'left' : `${t * 100}% 50%`,
        }}
      />
      <div style={SLIP}>
        <span aria-hidden="true" style={SEAL} />
        <div style={FACE}>{children}</div>
      </div>
    </header>
  );
}

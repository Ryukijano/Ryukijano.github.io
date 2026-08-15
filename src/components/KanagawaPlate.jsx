import { useEffect, useRef } from 'react';
import { parseStyle } from '../lib/style.js';

const SRC = '/assets/images/kanagawa_latentspace_autoencoder.jpg';
const FROZEN = '20% 48%';
const EASE = 0.12;

/**
 * Page ground: the Kanagawa latent jpg as ink multiplied onto washi.
 *
 * The wrap is the only multiply layer. A second copy — the colour block —
 * appears in dots/lattice and slips off the kento, the way a reconstruction
 * fails to register against the key block. Waves stay locked. Narrow and
 * reduced-motion freeze the crop and never start a frame loop.
 */

const shellStyle = parseStyle(
  'position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden',
);

const blendStyle = parseStyle(
  'position:absolute;inset:0;overflow:hidden;mix-blend-mode:multiply',
);

const imgStyle = parseStyle(
  'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;' +
    'max-width:none;' +
    'transform-origin:var(--plate-pos, 20% 48%);' +
    'transform:scale(var(--plate-zoom, 1.58));' +
    'opacity:0.4',
);

const ghostStyle = parseStyle(
  'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;' +
    'max-width:none;' +
    'transform-origin:var(--plate-pos, 20% 48%);' +
    'transform:scale(var(--plate-zoom, 1.58)) translate(var(--plate-slip-x, 0px), var(--plate-slip-y, 0px));' +
    'filter:grayscale(1) sepia(1) hue-rotate(192deg) saturate(2.5) brightness(0.68) contrast(1.08);' +
    'opacity:0.24',
);

const hikitsukeStyle = parseStyle(
  'position:absolute;left:0.5rem;bottom:0.5rem;width:22px;height:0;z-index:2;' +
    'border-bottom:1px solid color-mix(in srgb, var(--md-sys-color-on-surface) 72%, transparent)',
);

const kagiStyle = parseStyle(
  'position:absolute;right:0.5rem;bottom:0.5rem;width:12px;height:12px;z-index:2;' +
    'border-right:1px solid color-mix(in srgb, var(--md-sys-color-on-surface) 72%, transparent);' +
    'border-bottom:1px solid color-mix(in srgb, var(--md-sys-color-on-surface) 72%, transparent)',
);

export default function KanagawaPlate({ mode = null }) {
  const wrapRef = useRef(null);
  const modeRef = useRef(mode);
  const kickRef = useRef(() => {});
  const ghost = mode === 'dots' || mode === 'lattice';

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return undefined;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const narrow = window.matchMedia('(max-width: 899px)');
    let stop = () => {};

    const sync = () => {
      stop();
      stop = () => {};
      kickRef.current = () => {};
      const freeze = motion.matches || narrow.matches;
      applySlip(wrap, freeze ? null : modeRef.current, freeze);
      if (freeze) {
        wrap.style.setProperty('--plate-pos', FROZEN);
        wrap.style.setProperty('--plate-zoom', '1.12');
        return;
      }
      wrap.style.setProperty('--plate-zoom', '1.58');
      const ctl = runPlate(wrap, modeRef);
      stop = ctl.stop;
      kickRef.current = ctl.kick;
      ctl.kick();
    };

    sync();
    motion.addEventListener('change', sync);
    narrow.addEventListener('change', sync);
    return () => {
      stop();
      kickRef.current = () => {};
      motion.removeEventListener('change', sync);
      narrow.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    modeRef.current = mode;
    const wrap = wrapRef.current;
    if (wrap) {
      const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
      const narrow = window.matchMedia('(max-width: 899px)');
      applySlip(wrap, mode, motion.matches || narrow.matches);
    }
    kickRef.current();
  }, [mode]);

  return (
    <div aria-hidden="true" style={shellStyle}>
      <div ref={wrapRef} style={blendStyle}>
        {ghost ? <img src={SRC} alt="" style={ghostStyle} /> : null}
        <img src={SRC} alt="" style={imgStyle} />
      </div>
      <span style={hikitsukeStyle} />
      <span style={kagiStyle} />
    </div>
  );
}

function slipForMode(mode) {
  switch (mode) {
    case 'dots':
      return { x: '2px', y: '1px' };
    case 'lattice':
      return { x: '5px', y: '-2px' };
    case 'waves':
    case null:
      return { x: '0px', y: '0px' };
    default: {
      const _exhaustive = mode;
      void _exhaustive;
      return { x: '0px', y: '0px' };
    }
  }
}

function applySlip(wrap, mode, freeze) {
  const slip = freeze ? { x: '0px', y: '0px' } : slipForMode(mode);
  wrap.style.setProperty('--plate-slip-x', slip.x);
  wrap.style.setProperty('--plate-slip-y', slip.y);
}

function scrollX() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (max <= 0) return 0;
  return (window.scrollY / max) * 100;
}

function targetX(mode) {
  switch (mode) {
    case 'waves':
      return 0;
    case 'dots':
      return 50;
    case 'lattice':
      return 100;
    case null:
      return scrollX();
    default: {
      const _exhaustive = mode;
      void _exhaustive;
      return scrollX();
    }
  }
}

function runPlate(wrap, modeRef) {
  let x = 20;
  let raf = 0;

  const paint = () => {
    wrap.style.setProperty('--plate-pos', `${x}% 48%`);
  };

  const tick = () => {
    raf = 0;
    const target = targetX(modeRef.current);
    x += (target - x) * EASE;
    if (Math.abs(target - x) < 0.05) x = target;
    paint();
    if (x !== target) raf = requestAnimationFrame(tick);
  };

  const kick = () => {
    if (!raf) raf = requestAnimationFrame(tick);
  };

  window.addEventListener('scroll', kick, { passive: true });
  window.addEventListener('resize', kick);
  paint();

  return {
    kick,
    stop() {
      cancelAnimationFrame(raf);
      raf = 0;
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', kick);
    },
  };
}

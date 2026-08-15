import { useEffect, useRef } from 'react';
import { parseStyle } from '../lib/style.js';

const SRC = '/assets/images/kanagawa_latentspace_autoencoder.jpg';
const FROZEN = '20% 48%';
const EASE = 0.12;

/**
 * Page ground: the Kanagawa latent jpg as ink multiplied onto washi.
 *
 * Not a figure and not a 100vh hero. A fixed viewport layer sits behind
 * the article; transform-origin pans left (painted) → right (wireframe)
 * with scroll, or eases toward a mode lock. Narrow viewports and reduced
 * motion freeze the crop and never start a frame loop.
 *
 * Blend lives on the wrap only. The img is a plain plate — multiplying
 * twice turns Prussian blue into mud.
 */

const wrapStyle = parseStyle(
  'position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;' +
    'mix-blend-mode:multiply',
);

const imgStyle = parseStyle(
  'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;' +
    'max-width:none;' +
    'transform-origin:var(--plate-pos, 20% 48%);' +
    'transform:scale(var(--plate-zoom, 1.58));' +
    'opacity:0.42',
);

export default function KanagawaPlate({ mode = null }) {
  const imgRef = useRef(null);
  const modeRef = useRef(mode);
  const kickRef = useRef(() => {});

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return undefined;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const narrow = window.matchMedia('(max-width: 899px)');
    let stop = () => {};

    const sync = () => {
      stop();
      stop = () => {};
      kickRef.current = () => {};
      if (motion.matches || narrow.matches) {
        img.style.setProperty('--plate-pos', FROZEN);
        img.style.setProperty('--plate-zoom', '1.12');
        return;
      }
      img.style.setProperty('--plate-zoom', '1.58');
      const ctl = runPlate(img, modeRef);
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
    kickRef.current();
  }, [mode]);

  return (
    <div aria-hidden="true" style={wrapStyle}>
      <img ref={imgRef} src={SRC} alt="" style={imgStyle} />
    </div>
  );
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

function runPlate(img, modeRef) {
  let x = 20;
  let raf = 0;

  const paint = () => {
    img.style.setProperty('--plate-pos', `${x}% 48%`);
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

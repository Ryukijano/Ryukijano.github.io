import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

/**
 * The scroll-reveal from every .dc.html page: sections start faded and nudged
 * down, an IntersectionObserver flips them on once, and the observer then
 * stops watching that element.
 *
 * Reduced motion is honoured the same way the prototypes do it — everything
 * starts visible and the observer is never created at all.
 */

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/*
 * Opacity and transform get DIFFERENT springs, which is the whole point.
 *
 * M3 Expressive splits motion into two families: spatial springs, which
 * overshoot, for anything that moves or resizes; and effects springs, which do
 * not, for colour and opacity. This hook used to run one hand-written curve
 * across both. A fade on an overshooting curve visibly flickers past full
 * opacity and back — it reads as a rendering fault rather than as motion.
 */
const DEFAULTS = {
  threshold: 0.2,
  distance: 20,
  // transform: spatial, allowed to overshoot and settle.
  spatialDuration: 'var(--md-sys-motion-duration-expressive-slow-spatial)',
  spatialEasing: 'var(--md-sys-motion-spring-expressive-slow-spatial)',
  // opacity: effects, must not overshoot.
  effectsDuration: 'var(--md-sys-motion-duration-expressive-slow-effects)',
  effectsEasing: 'var(--md-sys-motion-spring-expressive-slow-effects)',
  prefix: '',
  // per-index delay applied to the opacity transition only, matching the
  // case-study pages (`${i === 0 ? 0 : 0.05}s`).
  delayFor: (i) => (i === 0 ? '0s' : '0.05s'),
};

export default function useReveal(count, options = {}) {
  const opts = { ...DEFAULTS, ...options };
  const {
    threshold,
    distance,
    spatialDuration,
    spatialEasing,
    effectsDuration,
    effectsEasing,
    prefix,
    delayFor,
  } = opts;

  // lazy useState, not useRef().current — reading a ref during render is
  // a React violation and the value never changes after mount anyway.
  const [reduced] = useState(prefersReducedMotion);
  const nodes = useRef([]);
  const [visible, setVisible] = useState(() => {
    // If motion is off, or the browser has no IntersectionObserver, everything
    // starts revealed. Deciding that here rather than in an effect avoids a
    // cascading render on mount.
    const allVisible = reduced || typeof IntersectionObserver === 'undefined';
    const init = {};
    for (let i = 0; i < count; i++) init[i] = allVisible;
    return init;
  });

  // Deliberately NOT wrapped in useMemo: React Compiler cannot preserve manual
  // memoization around a closure that writes to a ref, and does a better job of
  // memoizing this itself.
  const setters = Array.from({ length: count }, (_, i) => (el) => {
    nodes.current[i] = el;
  });

  useEffect(() => {
    if (reduced) return undefined;
    if (typeof IntersectionObserver === 'undefined') return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const i = nodes.current.findIndex((n) => n === entry.target);
          if (i >= 0) {
            setVisible((prev) => ({ ...prev, [i]: true }));
            io.unobserve(entry.target);
          }
        });
      },
      { threshold },
    );

    nodes.current.forEach((n) => {
      if (n) io.observe(n);
    });
    return () => io.disconnect();
  }, [count, reduced, threshold]);

  const style = useCallback(
    (i) => {
      const on = !!visible[i];
      const delay = delayFor ? ` ${delayFor(i)}` : '';
      return (
        `${prefix}opacity:${on ? 1 : 0};` +
        `transform:translateY(${on ? 0 : distance}px);` +
        `transition:opacity ${effectsDuration} ${effectsEasing}${delay},` +
        `transform ${spatialDuration} ${spatialEasing}`
      );
    },
    [
      visible,
      prefix,
      distance,
      spatialDuration,
      spatialEasing,
      effectsDuration,
      effectsEasing,
      delayFor,
    ],
  );

  return { attach: (i) => setters[i], style, visible, reduced };
}

/**
 * CaseStudy owns one useReveal() for the whole page; Section pulls the ref and
 * the style string out of context by index so the page shell stays in one place.
 */
export const RevealContext = createContext(null);

export function useRevealSlot(index) {
  const reveal = useContext(RevealContext);
  if (!reveal || index === undefined || index === null) {
    return { attach: undefined, css: '' };
  }
  return { attach: reveal.attach(index), css: reveal.style(index) };
}

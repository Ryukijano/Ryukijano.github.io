import { useEffect, useState } from 'react';
import { parseStyle } from '../lib/style.js';
import { cs } from './tokens.js';

/**
 * A GIF or still with its caption underneath.
 *
 * Captions in the prototypes mark a few words in terracotta — most often the
 * word "schematic", which is the pages' standing disclosure that a figure is
 * drawn rather than measured. `highlight` takes that word (or several) and the
 * caption is split around them, so content modules stay plain strings and no
 * markup is smuggled into the data.
 */
export default function MediaFigure({
  src,
  alt,
  caption,
  highlight,
  lazy = true,
  tight = false,
  gutter = false,
  poster,
  style,
}) {
  const frame = style ? `${cs.figureFrame};${style}` : cs.figureFrame;
  const shown = useStillSrc(src, poster);
  const img = (
    <div style={parseStyle(frame)}>
      <img
        src={shown}
        alt={alt}
        loading={lazy ? 'lazy' : undefined}
        style={{ width: '100%', display: 'block' }}
      />
    </div>
  );
  const cap = caption ? (
    <Caption text={caption} highlight={highlight} tight={gutter || tight} />
  ) : null;

  if (gutter && cap) {
    return (
      <figure style={{ margin: 0 }}>
        <div
          style={parseStyle(
            'display:grid;grid-template-columns:160px 1fr;gap:48px;align-items:start',
          )}
        >
          <div>{cap}</div>
          {img}
        </div>
      </figure>
    );
  }

  return (
    <figure style={{ margin: 0 }}>
      {img}
      {cap}
    </figure>
  );
}

/**
 * Distill l-page pair: two figures, hairline gap, captions required when the
 * content module supplies them. No radius language — the frame already has none.
 */
export function FigurePair({ figures = [], style }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1px',
        background: 'var(--md-sys-color-outline-variant)',
        border: '1px solid var(--md-sys-color-outline-variant)',
        margin: '40px 0 0',
        ...style,
      }}
    >
      {figures.map((figure) => (
        <div
          key={figure.src}
          style={{
            background: 'var(--md-sys-color-surface)',
            padding: '0 0 12px',
          }}
        >
          <MediaFigure
            src={figure.src}
            alt={figure.alt}
            caption={figure.caption}
            highlight={figure.highlight}
            poster={figure.poster}
            style="border:0;border-radius:0"
            tight
          />
        </div>
      ))}
    </div>
  );
}

export function Caption({ text, highlight, tight = false }) {
  const style = tight ? cs.captionTight : cs.caption;
  return (
    <figcaption style={parseStyle(style)}>
      {splitOnHighlights(text, highlight).map((part, i) =>
        part.hit ? (
          <span key={i} style={{ color: 'var(--md-sys-color-primary)' }}>
            {part.text}
          </span>
        ) : (
          <span key={i}>{part.text}</span>
        ),
      )}
    </figcaption>
  );
}

function useStillSrc(src, poster) {
  const [still, setStill] = useState(false);
  useEffect(() => {
    if (!poster || typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setStill(mq.matches);
    apply();
    mq.addEventListener?.('change', apply);
    return () => mq.removeEventListener?.('change', apply);
  }, [poster]);
  return still && poster ? poster : src;
}

function splitOnHighlights(text, highlight) {
  if (!highlight) return [{ text, hit: false }];
  const terms = (Array.isArray(highlight) ? highlight : [highlight]).filter(Boolean);
  let parts = [{ text, hit: false }];

  for (const term of terms) {
    const next = [];
    for (const part of parts) {
      if (part.hit) {
        next.push(part);
        continue;
      }
      let rest = part.text;
      let at = rest.indexOf(term);
      while (at >= 0) {
        if (at > 0) next.push({ text: rest.slice(0, at), hit: false });
        next.push({ text: term, hit: true });
        rest = rest.slice(at + term.length);
        at = rest.indexOf(term);
      }
      if (rest) next.push({ text: rest, hit: false });
    }
    parts = next;
  }
  return parts;
}

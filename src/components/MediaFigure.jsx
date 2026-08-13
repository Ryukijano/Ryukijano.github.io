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
  style,
}) {
  const frame = style ? `${cs.figureFrame};${style}` : cs.figureFrame;
  return (
    <figure style={{ margin: 0 }}>
      <div style={parseStyle(frame)}>
        <img
          src={src}
          alt={alt}
          loading={lazy ? 'lazy' : undefined}
          style={{ width: '100%', display: 'block' }}
        />
      </div>
      {caption ? (
        <Caption text={caption} highlight={highlight} tight={tight} />
      ) : null}
    </figure>
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

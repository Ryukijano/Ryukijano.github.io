import { parseStyle } from '../lib/style.js';

/**
 * Terracotta rule down the left, serif quote, mono attribution.
 * Sits in the wide column of the same `160px 1fr` grid as the sections, which
 * is why the narrow column is rendered empty rather than dropped.
 */
export default function PullQuote({ quote, attribution }) {
  const wrap = `border-left:2px solid var(--md-sys-color-primary);padding:6px 0 6px 26px;margin:0`;
  const quoteStyle = `font-family:var(--md-sys-typescale-brand-font);font-size:21px;line-height:1.5;color:var(--md-sys-color-on-surface);margin:0;max-width:56ch`;
  const attrStyle = `font-family:var(--md-sys-typescale-mono-font);font-size:10px;letter-spacing:0.1em;color:var(--md-sys-color-on-surface-variant);margin:16px 0 0`;

  return (
    <section style={{ padding: '0 0 4px' }}>
      <div
        style={parseStyle('display:grid;grid-template-columns:160px 1fr;gap:48px')}
      >
        <div />
        <blockquote style={parseStyle(wrap)}>
          <p style={parseStyle(quoteStyle)}>{quote}</p>
          {attribution ? <p style={parseStyle(attrStyle)}>{attribution}</p> : null}
        </blockquote>
      </div>
    </section>
  );
}

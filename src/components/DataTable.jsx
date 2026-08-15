import { parseStyle } from '../lib/style.js';
import { cs } from './tokens.js';

/**
 * The results tables. Not a <table> in the prototypes either — it is a CSS
 * grid, because the last column wraps to several lines while the first three do
 * not, and the column ratios are load-bearing.
 *
 *   head    ['SYSTEM', 'QUBITS', ...]
 *   rows    [{ name, cells: ['8q', '0.63 mHa', '...'] }, ...]
 *
 * Numeric cells are mono with tabular numerals and right-aligned. That is the
 * one place on this site where it genuinely changes whether a table can be
 * read: proportional digits make 0.63 and 0.8 fail to line up at the decimal,
 * so a column of results stops being scannable and becomes a list of strings.
 * A cell counts as numeric if it starts with a digit or sign — so '0.63 mHa'
 * and '8q' align, while a prose cell stays left-aligned where it belongs.
 */

const M = '--md-sys-';
const NUMERIC = /^[-+−]?[.\d]/;

export default function DataTable({
  head,
  rows,
  columns = '1.35fr 0.85fr 1fr 1.5fr',
  highlight,
}) {
  /*
   * Cells whose value marks an absence rather than a measurement — `tbc`,
   * `skipped`, `paused`, `blocked` — are tinted in the prototypes, the same
   * way MediaFigure tints the word "schematic". It is the site's disclosure
   * colour, not decoration, so a table that drops it is quietly claiming more
   * than the source did. `tbc` is always marked; anything else a page needs is
   * passed in.
   */
  const marked = new Set(['tbc', ...(Array.isArray(highlight) ? highlight : highlight ? [highlight] : [])]);
  const headWrap =
    `display:grid;grid-template-columns:${columns};gap:0;` +
    `background:var(${M}color-surface-container);` +
    `border-bottom:1px solid var(${M}color-outline-variant)`;

  const headCell = (i, numeric) =>
    `font-family:var(${M}typescale-mono-font);` +
    `font-size:var(${M}typescale-label-small-size);` +
    `font-weight:var(${M}typescale-emphasized-label-small-weight);` +
    `letter-spacing:0.1em;color:var(${M}color-on-surface-variant);padding:11px 14px;` +
    `text-align:${numeric ? 'right' : 'left'}` +
    (i === 0 ? '' : `;border-left:1px solid var(${M}color-outline-variant)`);

  const nameCell =
    `font-family:var(${M}typescale-body-medium-font);` +
    `font-size:var(${M}typescale-body-medium-size);` +
    `line-height:var(${M}typescale-body-medium-line-height);` +
    `color:var(${M}color-on-surface);padding:13px 14px`;

  const dataCell = (numeric, flagged) =>
    `font-family:var(${M}typescale-mono-font);` +
    `font-size:var(${M}typescale-body-small-size);` +
    `line-height:var(${M}typescale-body-small-line-height);` +
    `color:var(${M}color-${flagged ? 'primary' : 'on-surface'});padding:13px 14px;` +
    `font-variant-numeric:tabular-nums;` +
    `text-align:${numeric ? 'right' : 'left'}`;

  // A column is numeric when every cell that has content in it is numeric, so
  // one prose row can't drag an otherwise-numeric column back to the left.
  const width = Math.max(0, ...rows.map((r) => r.cells.length));
  const numericCol = Array.from({ length: width }, (_, j) => {
    const seen = rows.map((r) => r.cells[j]).filter((c) => c != null && String(c).trim() !== '');
    return seen.length > 0 && seen.every((c) => NUMERIC.test(String(c).trim()));
  });

  return (
    <div style={parseStyle(cs.figureFrame)}>
      <div style={parseStyle(headWrap)}>
        {head.map((label, i) => (
          <span key={i} style={parseStyle(headCell(i, i > 0 && numericCol[i - 1]))}>
            {label}
          </span>
        ))}
      </div>
      {rows.map((row, i) => {
        const rowStyle =
          `display:grid;grid-template-columns:${columns};gap:0` +
          (i === rows.length - 1 ? '' : `;border-bottom:1px solid var(${M}color-outline-variant)`);
        return (
          <div key={i} style={parseStyle(rowStyle)}>
            <span style={parseStyle(nameCell)}>{row.name}</span>
            {row.cells.map((cell, j) => (
              <span
                key={j}
                style={parseStyle(
                  dataCell(numericCol[j], marked.has(String(cell).trim())),
                )}
              >
                {cell}
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
}

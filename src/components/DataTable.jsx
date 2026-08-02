import { parseStyle } from '../lib/style.js';
import { cs, fonts, light } from './tokens.js';

/**
 * The results tables. Not a <table> in the prototypes either — it is a CSS
 * grid, because the last column wraps to several lines while the first three
 * do not, and the column ratios are load-bearing.
 *
 *   head    ['SYSTEM', 'QUBITS', ...]
 *   rows    [{ name, cells: ['8q', '0.63 mHa', '...'] }, ...]
 */
export default function DataTable({
  head,
  rows,
  columns = '1.35fr 0.85fr 1fr 1.5fr',
}) {
  const headWrap =
    `display:grid;grid-template-columns:${columns};gap:0;` +
    `font-family:${fonts.mono};font-size:11px;background:${light.field};` +
    `border-bottom:1px solid ${light.rule}`;

  const headCell = (i) =>
    `font-family:${fonts.mono};font-size:10px;letter-spacing:0.1em;` +
    `color:${light.muted};padding:11px 14px` +
    (i === 0 ? '' : `;border-left:1px solid ${light.rule}`);

  const nameCell = `font-size:13.5px;padding:13px 14px;color:${light.ink};line-height:1.4`;

  return (
    <div style={parseStyle(cs.figureFrame)}>
      <div style={parseStyle(headWrap)}>
        {head.map((label, i) => (
          <span key={i} style={parseStyle(headCell(i))}>
            {label}
          </span>
        ))}
      </div>
      {rows.map((row, i) => {
        const rowStyle =
          `display:grid;grid-template-columns:${columns};gap:0` +
          (i === rows.length - 1 ? '' : `;border-bottom:1px solid ${light.faint}`);
        return (
          <div key={i} style={parseStyle(rowStyle)}>
            <span style={parseStyle(nameCell)}>{row.name}</span>
            {row.cells.map((cell, j) => (
              <span key={j} style={parseStyle(cs.tableCell)}>
                {cell}
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
}

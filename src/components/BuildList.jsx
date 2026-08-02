import { parseStyle } from '../lib/style.js';
import { fonts, light } from './tokens.js';

/** The arrow-prefixed list of build decisions, one hairline rule per row. */
export default function BuildList({ items, style = 'margin:26px 0 0' }) {
  const row = `display:flex;gap:14px;padding:11px 0;border-top:1px solid ${light.faint}`;
  const arrow = `font-family:${fonts.mono};font-size:10px;color:${light.terracotta};flex:none;padding-top:3px`;
  const text = `font-size:14.5px;line-height:1.6;color:${light.body}`;

  return (
    <div style={parseStyle(style)}>
      {items.map((item, i) => (
        <div key={i} style={parseStyle(row)}>
          <span style={parseStyle(arrow)}>→</span>
          <span style={parseStyle(text)}>{item}</span>
        </div>
      ))}
    </div>
  );
}

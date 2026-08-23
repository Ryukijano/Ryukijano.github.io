import { parseStyle } from '../lib/style.js';
import { Text } from './m3/index.jsx';

const MONO = '--m3-font:var(--md-sys-typescale-mono-font);font-variant-numeric:tabular-nums';
const MUTED = 'color:var(--md-sys-color-on-surface-variant)';
const INK = 'color:var(--md-sys-color-on-surface)';
const HAIR = '1px solid var(--md-sys-color-outline-variant)';

/**
 * One conceptual identity per row. Not KaTeX: IBM Plex Mono, so it restyles with M3.
 */
export default function NoteEquations({ items }) {
  if (!items?.length) return null;
  return (
    <dl style={parseStyle(`margin:1.5rem 0 0;padding:0.85rem 0;border-top:${HAIR};border-bottom:${HAIR}`)}>
      {items.map((item) => (
        <div key={item.expr} style={parseStyle('margin:0.65rem 0 0')}>
          <Text as="dt" role="label-small" style={parseStyle(`${MUTED};letter-spacing:0.08em;margin:0`)}>
            {item.label}
          </Text>
          <Text
            as="dd"
            role="body-medium"
            style={parseStyle(`${MONO};${INK};margin:0.2rem 0 0;overflow-wrap:anywhere`)}
          >
            {item.expr}
          </Text>
        </div>
      ))}
    </dl>
  );
}

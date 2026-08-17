import { parseStyle } from '../lib/style.js';
import { Text } from './m3/index.jsx';

const MONO = '--m3-font:var(--md-sys-typescale-mono-font);font-variant-numeric:tabular-nums';
const MUTED = 'color:var(--md-sys-color-on-surface-variant)';
const INK = 'color:var(--md-sys-color-on-surface)';
const HAIR = '1px solid var(--md-sys-color-outline-variant)';

/**
 * Nested family tree for a note. Content supplies names; this only lays them out.
 * Use when the pedagogy is “these are siblings, not one method with aliases.”
 */
export default function NoteTaxonomy({ title, branches, caption }) {
  return (
    <figure style={parseStyle('margin:2rem 0 0')}>
      {title ? (
        <Text as="p" role="label-small" style={parseStyle(`${MONO};${MUTED};letter-spacing:0.12em;margin:0 0 0.75rem`)}>
          {title}
        </Text>
      ) : null}
      <ul
        style={parseStyle(
          `list-style:none;margin:0;padding:0;display:grid;gap:0;border-top:${HAIR}`,
        )}
      >
        {branches.map((branch) => (
          <li
            key={branch.name}
            style={parseStyle(
              `display:grid;grid-template-columns:11rem 1fr;gap:1rem;padding:0.7rem 0;border-bottom:${HAIR};align-items:baseline`,
            )}
          >
            <Text as="span" role="title-small" style={parseStyle(`${INK};margin:0`)}>
              {branch.name}
            </Text>
            <Text as="span" role="body-medium" style={parseStyle(`${MUTED};margin:0`)}>
              {branch.items.join(' · ')}
            </Text>
          </li>
        ))}
      </ul>
      {caption ? (
        <Text as="figcaption" role="body-small" style={parseStyle(`${MUTED};margin:0.75rem 0 0`)}>
          {caption}
        </Text>
      ) : null}
    </figure>
  );
}

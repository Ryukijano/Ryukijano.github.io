/**
 * Every M3 type role expands to five custom properties, which .m3-type consumes.
 * Kept in its own module so components/m3/index.jsx exports components only —
 * mixing component and non-component exports breaks React Fast Refresh.
 */
export function typeStyle(role, { emphasized = false } = {}) {
  const v = (p) => `var(--md-sys-typescale-${role}-${p})`;
  return {
    '--m3-font': v('font'),
    '--m3-size': v('size'),
    '--m3-lh': v('line-height'),
    '--m3-track': v('tracking'),
    '--m3-weight': emphasized
      ? `var(--md-sys-typescale-emphasized-${role}-weight)`
      : v('weight'),
  };
}

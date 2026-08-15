/**
 * The .dc.html prototypes carry every style as a CSS declaration *string*
 * ("font-size:15.5px;line-height:1.65;color:#5e5d59"). Those strings are the
 * design system's actual source of truth, so the port keeps them as strings
 * and converts at the boundary rather than hand-rewriting a few hundred
 * declarations into React objects — a rewrite is where transcription errors
 * would come from.
 *
 * parseStyle() turns one of those strings into a React style object and caches
 * the result, so a string literal that never changes is parsed exactly once.
 */

const cache = new Map();

/** Split on `;` but ignore semicolons nested inside url() / gradient() calls. */
function splitDeclarations(css) {
  const out = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < css.length; i++) {
    const ch = css[i];
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    else if (ch === ';' && depth === 0) {
      out.push(css.slice(start, i));
      start = i + 1;
    }
  }
  out.push(css.slice(start));
  return out;
}

/** background-color -> backgroundColor, -webkit-x -> WebkitX, --custom stays. */
function toCamel(prop) {
  if (prop.startsWith('--')) return prop;
  return prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

export function parseStyle(css) {
  if (!css) return undefined;
  if (typeof css === 'object') return css;

  const cached = cache.get(css);
  if (cached) return cached;

  const style = {};
  for (const declaration of splitDeclarations(css)) {
    const colon = declaration.indexOf(':');
    if (colon < 0) continue;
    const prop = declaration.slice(0, colon).trim();
    const value = declaration.slice(colon + 1).trim();
    if (!prop || !value) continue;
    style[toCamel(prop)] = value;
  }

  cache.set(css, style);
  return style;
}

/** Join style strings, skipping empties. Later strings win at paint time. */
export function joinStyle(...parts) {
  return parts.filter(Boolean).join(';');
}

export default parseStyle;

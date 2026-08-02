/* eslint-disable react-hooks/refs -- `slot.attach` is a callback ref and
 * `slot.css` is a plain string, but both originate from useReveal, which
 * keeps its observed nodes in a ref. The React Compiler's flow analysis
 * taints every value that transitively reaches that ref and reports it as
 * a render-time ref read. Callback refs are the documented way to collect
 * a variable number of DOM nodes, so this is a false positive.
 */
import { parseStyle } from '../lib/style.js';
import { cs, light } from './tokens.js';
import { useRevealSlot } from './useReveal.js';

/**
 * The `160px 1fr` grid every numbered case-study section uses: number and
 * kicker in the narrow column, everything else in the wide one.
 *
 * `reveal` is the index into the page's useReveal() — sections without one
 * (02b and the interactive panel in Conditional-GQE) simply render static,
 * exactly as they do in the prototype.
 */
export default function Section({
  num,
  kicker,
  reveal,
  border = true,
  padding = '80px 0',
  children,
}) {
  const slot = useRevealSlot(reveal);

  const grid =
    `display:grid;grid-template-columns:160px 1fr;gap:48px;padding:${padding}` +
    (border ? `;border-bottom:1px solid ${light.rule}` : '');

  return (
    <section ref={slot.attach} style={parseStyle(slot.css)}>
      <div style={parseStyle(grid)}>
        <div>
          {num ? <p style={parseStyle(cs.numStyle)}>{num}</p> : null}
          {kicker ? <p style={parseStyle(cs.kickerStyle)}>{kicker}</p> : null}
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

/** Section heading and body paragraphs, so pages do not repeat the tokens. */
export function H2({ children }) {
  return <h2 style={parseStyle(cs.h2Style)}>{children}</h2>;
}

export function Body({ children, spacing = 'none' }) {
  const style =
    spacing === 'top'
      ? cs.bodyStyleTop
      : spacing === 'spaced'
        ? cs.bodyStyleSpaced
        : cs.bodyStyle;
  return <p style={parseStyle(style)}>{children}</p>;
}

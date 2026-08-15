/* eslint-disable react-hooks/refs -- `slot.attach` is a callback ref and
 * `slot.css` is a plain string, but both originate from useReveal, which
 * keeps its observed nodes in a ref. The React Compiler's flow analysis
 * taints every value that transitively reaches that ref and reports it as
 * a render-time ref read. Callback refs are the documented way to collect
 * a variable number of DOM nodes, so this is a false positive.
 */
import { parseStyle } from '../lib/style.js';
import { Text } from './m3/index.jsx';
import { useRevealSlot } from './useReveal.js';

/**
 * The `160px 1fr` grid every numbered case-study section uses: number and
 * kicker in the narrow column, everything else in the wide one.
 *
 * `reveal` is the index into the page's useReveal() — sections without one
 * (02b and the interactive panel in Conditional-GQE) simply render static,
 * exactly as they do in the prototype.
 */

/*
 * useReveal drives opacity and transform off a single duration/easing pair.
 * M3 splits those: anything that moves rides a spatial spring, which
 * overshoots on purpose; anything that fades rides an effects spring, which
 * must not — an opacity on a spatial curve visibly flickers past its target.
 * Appending this wins over the transition useReveal wrote, because parseStyle
 * keeps the last declaration for a property.
 */
const REVEAL_MOTION =
  ';transition:' +
  'opacity var(--md-sys-motion-duration-expressive-slow-effects) ' +
  'var(--md-sys-motion-spring-expressive-slow-effects),' +
  'transform var(--md-sys-motion-duration-expressive-slow-spatial) ' +
  'var(--md-sys-motion-spring-expressive-slow-spatial)';

/** Mono with tabular numerals — the figures in a column have to line up. */
const mono = (extra) => ({
  '--m3-font': 'var(--md-sys-typescale-mono-font)',
  fontVariantNumeric: 'tabular-nums',
  ...extra,
});

const numStyle = mono({
  color: 'var(--md-sys-color-primary)',
  letterSpacing: '0.1em',
});

const kickerStyle = mono({
  color: 'var(--md-sys-color-on-surface-variant)',
  letterSpacing: '0.12em',
  margin: '10px 0 0',
});

export default function Section({
  num,
  kicker,
  reveal,
  border = true,
  padding = '80px 0',
  children,
}) {
  const slot = useRevealSlot(reveal);

  const grid = {
    display: 'grid',
    gridTemplateColumns: '160px 1fr',
    gap: '48px',
    padding,
    borderBottom: border ? '1px solid var(--md-sys-color-outline-variant)' : undefined,
  };

  return (
    <section
      ref={slot.attach}
      style={slot.css ? parseStyle(slot.css + REVEAL_MOTION) : undefined}
    >
      <div style={grid}>
        <div>
          {num ? (
            <Text as="p" role="title-medium" emphasized style={numStyle}>
              {num}
            </Text>
          ) : null}
          {kicker ? (
            <Text as="p" role="label-small" style={kickerStyle}>
              {kicker}
            </Text>
          ) : null}
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

/**
 * Section heading and body paragraphs, so pages do not repeat the tokens.
 * Headings take the brand face at headline scale and the emphasized weight;
 * body takes the plain face at body-large, which is the reading size.
 */
export function H2({ children }) {
  return (
    <Text as="h2" role="headline-medium" emphasized style={{ margin: '0 0 16px' }}>
      {children}
    </Text>
  );
}

const BODY_MARGIN = { none: '0', spaced: '18px 0 0', top: '40px 0 0' };

export function Body({ children, spacing = 'none' }) {
  return (
    <Text
      as="p"
      role="body-large"
      style={{
        color: 'var(--md-sys-color-on-surface-variant)',
        maxWidth: '64ch',
        margin: BODY_MARGIN[spacing] ?? BODY_MARGIN.none,
      }}
    >
      {children}
    </Text>
  );
}

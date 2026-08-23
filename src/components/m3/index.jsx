/**
 * Material 3 Expressive primitives.
 *
 * Thin wrappers over the classes in src/styles/m3.css. They exist so pages
 * express intent ("this is a tonal button") rather than class strings, and so
 * the type-scale plumbing — five CSS variables per role — happens in one place.
 *
 * See docs/M3-EXPRESSIVE.md for the rules these encode.
 */
import { createElement } from 'react';
import { typeStyle } from './typeStyle.js';
import { useSiteMode } from './../../lib/mode.js';
import './../../styles/m3.css';

/**
 * Text at a named M3 role. `as` picks the element so heading level stays a
 * semantic decision rather than a visual one — an h2 can look like title-small
 * without lying to a screen reader.
 */
export function Text({ role = 'body-medium', emphasized, as = 'p', style, children, ...rest }) {
  // createElement rather than <As>: this project doesn't carry
  // eslint-plugin-react, so JSX use of a destructured element-type prop reads
  // as an unused variable. Not worth a plugin to sweeten one line.
  return createElement(
    as,
    { className: 'm3-type', style: { ...typeStyle(role, { emphasized }), ...style }, ...rest },
    children,
  );
}

/**
 * A themed region. Sets data-theme so descendants resolve the right palette.
 *
 * Pages declare a palette ("study"), not a scheme: both grounds are generated
 * for every theme, and the site-wide mode decides which one mounts. A name
 * that already carries "-light"/"-dark" is normalized first, so legacy call
 * sites like WorkIndex's study-dark follow the toggle instead of pinning
 * their old ground forever.
 */
export function Theme({ name, as = 'div', style, children, ...rest }) {
  const mode = useSiteMode();
  const base = String(name).replace(/-(light|dark)$/, '');
  return createElement(as, { 'data-theme': `${base}-${mode}`, style, ...rest }, children);
}

const cx = (...parts) => parts.filter(Boolean).join(' ');

/**
 * Card. Interactive variants (given href or onClick) get a state layer and the
 * hover shape-morph; static ones don't, because a container that reacts to the
 * pointer but does nothing is a lie about affordance.
 */
export function Card({ variant = 'outlined', href, onClick, className, children, ...rest }) {
  const interactive = Boolean(href || onClick);
  const cls = cx('m3-card', `m3-card--${variant}`, interactive && 'm3-state', className);
  if (href) {
    return (
      <a className={cls} href={href} {...rest}>
        {children}
      </a>
    );
  }
  if (onClick) {
    return (
      <button type="button" className={cls} onClick={onClick} {...rest}>
        {children}
      </button>
    );
  }
  return (
    <div className={cls} {...rest}>
      {children}
    </div>
  );
}

/** Button. `filled` for the one primary action, `text` for everything cheap. */
export function Button({ variant = 'filled', href, className, children, ...rest }) {
  const cls = cx('m3-button', `m3-button--${variant}`, 'm3-state', className);
  if (href) {
    return (
      <a className={cls} href={href} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}

/** Chip. Mono by design — these carry tech names, metrics and tags. */
export function Chip({ selected, className, children, ...rest }) {
  return (
    <span className={cx('m3-chip', selected && 'm3-chip--selected', className)} {...rest}>
      {children}
    </span>
  );
}

export function Divider({ className, ...rest }) {
  return <hr className={cx('m3-divider', className)} {...rest} />;
}

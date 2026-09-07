const cx = (...parts) => parts.filter(Boolean).join(' ');

/**
 * Paper-world film: a faint wash and procedural grain, under the ink.
 * Decorative only — never intercepts clicks.
 *
 * quiet — wash + grain, for paper/ink reading pages
 * film  — grain only
 *
 * The home page does not use this: its grain lives on the plate itself
 * (.folio__sheet-grain) so no text is ever composited under noise.
 */
export default function Atmosphere({ variant = 'quiet' }) {
  return (
    <div className={cx('atmo', variant === 'film' && 'atmo--film')} aria-hidden="true">
      {variant !== 'film' ? <div className="atmo__wash" /> : null}
      <div className="atmo__grain" />
    </div>
  );
}

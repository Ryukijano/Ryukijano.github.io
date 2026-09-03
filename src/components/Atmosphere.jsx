const cx = (...parts) => parts.filter(Boolean).join(' ');

/**
 * Paper-world film: a faint wash and procedural grain.
 * Decorative only — never intercepts clicks.
 *
 * full  — wash + rings + grain
 * quiet — wash + grain, for paper/ink reading pages
 * film  — grain only, so the Kanagawa plate can read
 */
export default function Atmosphere({ variant = 'full' }) {
  return (
    <div
      className={cx(
        'atmo',
        variant === 'quiet' && 'atmo--quiet',
        variant === 'film' && 'atmo--film',
      )}
      aria-hidden="true"
    >
      {variant !== 'film' ? <div className="atmo__wash" /> : null}
      {variant === 'full' ? <div className="atmo__rings" /> : null}
      <div className="atmo__grain" />
    </div>
  );
}

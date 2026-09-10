const cx = (...parts) => parts.filter(Boolean).join(' ');

export default function Atmosphere({ variant = 'quiet' }) {
  return (
    <div className={cx('atmo', variant === 'film' && 'atmo--film')} aria-hidden="true">
      {variant !== 'film' ? <div className="atmo__wash" /> : null}
      <div className="atmo__grain" />
    </div>
  );
}

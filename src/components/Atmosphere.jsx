const cx = (...parts) => parts.filter(Boolean).join(' ');

export default function Atmosphere({ variant = 'quiet', motif }) {
  return (
    <div
      className={cx('atmo', variant === 'film' && 'atmo--film')}
      data-motif={motif}
      aria-hidden="true"
    >
      {variant !== 'film' ? <div className="atmo__wash" /> : null}
      <div className="atmo__fibre" />
      <div className="atmo__engraving" />
      <div className="atmo__grain" />
    </div>
  );
}

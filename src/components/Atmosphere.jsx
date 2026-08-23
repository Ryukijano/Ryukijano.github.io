/**
 * The paper-world layer: ink wash, wave rings, grain.
 *
 * Purely decorative and token-driven — the CSS in m3.css derives every
 * colour from the enclosing [data-theme] root, so the same component reads
 * terracotta on case studies, slate on Ryukijano's room, rose on Ryoushi's,
 * and survives both light and dark modes untouched. Renders nothing
 * interactive; aria-hidden keeps it out of the tree entirely.
 *
 * Variants:
 *   full  — wash + rings + grain, for index/persona/landing pages
 *   quiet — wash (fainter) + grain only, for long-form reading pages
 *
 * Place as a child of the themed root; the root must be position:relative
 * and page content must stack above it (z-index on <main> is enough).
 */
const cx = (...parts) => parts.filter(Boolean).join(' ');

export default function Atmosphere({ variant = 'full' }) {
  return (
    <div className={cx('atmo', variant === 'quiet' && 'atmo--quiet')} aria-hidden="true">
      <div className="atmo__wash" />
      {variant === 'full' ? <div className="atmo__rings" /> : null}
      <div className="atmo__grain" />
    </div>
  );
}

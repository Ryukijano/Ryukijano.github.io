import { ACADEMIC_PROFILES } from '../data/publications';

const LINKS = [
  { href: ACADEMIC_PROFILES.github, label: 'GitHub' },
  { href: ACADEMIC_PROFILES.orcid, label: 'ORCID' },
  // Non-breaking spaces: split across two lines, a two-word name reads as two links.
  { href: ACADEMIC_PROFILES.googleScholar, label: 'Google\u00a0Scholar' },
  { href: ACADEMIC_PROFILES.linkedin, label: 'LinkedIn' },
  { href: ACADEMIC_PROFILES.huggingface, label: 'Hugging\u00a0Face' },
  { href: ACADEMIC_PROFILES.x, label: 'X' },
].filter((item) => item.href);

export default function SiteFooter() {
  return (
    <footer className="print__footer">
      <nav aria-label="Profiles elsewhere">
        {LINKS.map((item, index) => (
          <span key={item.label}>
            {/* The space after the rule is the line's only break point, so the
                footer wraps between profiles, never inside one, and a new line
                starts on a name rather than a stray rule. */}
            {index > 0 ? (
              <>
                <span aria-hidden="true" className="print__footer-rule">
                  ·
                </span>{' '}
              </>
            ) : null}
            <a href={item.href} target="_blank" rel="noopener noreferrer">
              {item.label}
            </a>
          </span>
        ))}
      </nav>
    </footer>
  );
}

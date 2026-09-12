import { ACADEMIC_PROFILES } from '../data/publications';

const LINKS = [
  { href: ACADEMIC_PROFILES.github, label: 'GitHub' },
  { href: ACADEMIC_PROFILES.orcid, label: 'ORCID' },
  { href: ACADEMIC_PROFILES.linkedin, label: 'LinkedIn' },
  { href: ACADEMIC_PROFILES.huggingface, label: 'Hugging Face' },
].filter((item) => item.href);

export default function SiteFooter() {
  return (
    <footer className="print__footer">
      <nav aria-label="Profiles elsewhere">
        {LINKS.map((item, index) => (
          <span key={item.label}>
            {index > 0 ? (
              <span aria-hidden="true" className="print__footer-rule">
                ·
              </span>
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

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { parseStyle } from '../lib/style.js';
import { Text, Theme } from '../components/m3/index.jsx';
import SiteNav from '../components/SiteNav.jsx';
import { CV_URL } from '../content/site.js';
import academic from '../content/academic.js';

const SERIF = '--m3-font:var(--md-sys-typescale-brand-font)';
const MONO = '--m3-font:var(--md-sys-typescale-mono-font);font-variant-numeric:tabular-nums';
const MUTED = 'color:var(--md-sys-color-on-surface-variant)';
const INK = 'color:var(--md-sys-color-on-surface)';

const linkStyle = parseStyle(
  'color:var(--md-sys-color-primary);text-decoration:none;' +
    'border-bottom:1px solid color-mix(in srgb, var(--md-sys-color-primary) 35%, transparent)',
);

function Ext({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={linkStyle}>
      {children}
    </a>
  );
}

function CopyBibtex({ text }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard may be missing */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      style={parseStyle(
        'margin:0.5rem 0 0;padding:0;border:0;background:none;cursor:pointer;' +
          'font:inherit;color:var(--md-sys-color-primary);' +
          'border-bottom:1px solid color-mix(in srgb, var(--md-sys-color-primary) 35%, transparent)',
      )}
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

function PublicationEntry({ pub }) {
  const doiHref = pub.doi ? `https://doi.org/${pub.doi}` : null;
  const title = pub.to ? (
    pub.internal ? (
      <Link to={pub.to} style={linkStyle}>
        {pub.title}
      </Link>
    ) : (
      <Ext href={pub.to}>{pub.title}</Ext>
    )
  ) : (
    pub.title
  );

  return (
    <Text
      as="li"
      role="body-large"
      style={parseStyle(
        `${SERIF};${INK};text-indent:-2rem;padding-left:2rem;margin:1.25rem 0 0;line-height:1.65`,
      )}
    >
      {pub.authors.join(', ')}. {title}. <em>{pub.venue}</em>, {pub.year}.
      {pub.pdf ? (
        <>
          {' '}
          <Ext href={pub.pdf}>[pdf]</Ext>
        </>
      ) : null}
      {doiHref ? (
        <>
          {' '}
          <Ext href={doiHref}>[doi]</Ext>
        </>
      ) : null}
      {pub.code ? (
        <>
          {' '}
          <Ext href={pub.code}>[code]</Ext>
        </>
      ) : null}
      {pub.note ? (
        <Text as="div" role="body-medium" style={parseStyle(`${SERIF};${MUTED};text-indent:0;margin:0.35rem 0 0`)}>
          {pub.note}
        </Text>
      ) : null}
      <div style={parseStyle('text-indent:0;margin:0.35rem 0 0')}>
        <details>
          <summary
            style={parseStyle(
              `cursor:pointer;color:var(--md-sys-color-primary);${SERIF}`,
            )}
          >
            BibTeX
          </summary>
          <Text
            as="pre"
            role="body-small"
            style={parseStyle(
              `${MONO};${MUTED};margin:0.5rem 0 0;white-space:pre-wrap;overflow-x:auto`,
            )}
          >
            {pub.bibtex}
          </Text>
          <CopyBibtex text={pub.bibtex} />
        </details>
      </div>
    </Text>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} style={parseStyle('scroll-margin-top:4rem;margin:3.5rem 0 0')}>
      <Text as="h2" role="headline-small" style={parseStyle(`${INK};margin:0 0 1rem`)}>
        {title}
      </Text>
      {children}
    </section>
  );
}

const HEADER_LINKS = [
  { href: CV_URL, label: 'CV', external: true },
  { href: '/work', label: 'Work', external: false },
  { href: '/blog', label: 'Notes', external: false },
  { href: academic.profiles.orcid, label: 'ORCID', external: true },
  { href: academic.profiles.github, label: 'GitHub', external: true },
].filter((item) => item.href);

export default function Academic() {
  const degree = academic.education[0];

  useEffect(() => {
    document.title = 'Gyanateet Dutta — academic';
  }, []);

  return (
    <Theme
      name="study"
      style={parseStyle(
        'position:relative;min-height:100vh;' +
          'background:var(--md-sys-color-surface);color:var(--md-sys-color-on-surface);' +
          'font-family:var(--md-sys-typescale-brand-font);-webkit-font-smoothing:antialiased',
      )}
    >
      <SiteNav variant="paper" />

      <main style={parseStyle('max-width:42rem;margin:0 auto;padding:4rem 1.5rem 6rem')}>
        <Text as="h1" role="headline-large" style={parseStyle(`${INK};margin:0`)}>
          {academic.bio.name}
        </Text>
        <Text as="p" role="title-medium" style={parseStyle(`${SERIF};${INK};margin:0.75rem 0 0`)}>
          {academic.bio.role}
        </Text>
        {degree ? (
          <Text as="p" role="body-large" style={parseStyle(`${SERIF};${MUTED};margin:0.35rem 0 0`)}>
            {degree.title}, {degree.org}, {degree.years}
          </Text>
        ) : null}
        <Text as="p" role="body-large" style={parseStyle(`${SERIF};${INK};margin:1.5rem 0 0;line-height:1.65`)}>
          {academic.bio.statement}
        </Text>

        <p style={parseStyle(`${SERIF};margin:1.5rem 0 0`)}>
          {HEADER_LINKS.map((item, index) => {
            const link = item.external ? (
              <Ext href={item.href}>{item.label}</Ext>
            ) : (
              <Link to={item.href} style={linkStyle}>
                {item.label}
              </Link>
            );
            return (
              <span key={item.label}>
                {index > 0 ? <span aria-hidden="true"> · </span> : null}
                {link}
              </span>
            );
          })}
        </p>

        <nav aria-label="On this page" style={parseStyle(`${SERIF};${MUTED};margin:1.25rem 0 0`)}>
          {academic.nav.map((item, index) => (
            <span key={item.id}>
              {index > 0 ? <span aria-hidden="true"> · </span> : null}
              <a href={`#${item.id}`} style={linkStyle}>
                {item.label}
              </a>
            </span>
          ))}
        </nav>

        <Section id="interests" title="Research interests">
          <Text as="p" role="body-large" style={parseStyle(`${SERIF};${INK};margin:0;line-height:1.65`)}>
            {academic.interests.join('; ')}.
          </Text>
        </Section>

        <Section id="education" title="Education">
          {academic.education.map((entry) => (
            <div key={entry.title}>
              <Text as="p" role="body-large" style={parseStyle(`${SERIF};${INK};margin:0`)}>
                {entry.title}
              </Text>
              <Text as="p" role="body-large" style={parseStyle(`${SERIF};${MUTED};margin:0.25rem 0 0`)}>
                {entry.org}, {entry.years}
              </Text>
              {entry.note ? (
                <Text as="p" role="body-medium" style={parseStyle(`${SERIF};${MUTED};margin:0.5rem 0 0`)}>
                  {entry.note}
                </Text>
              ) : null}
            </div>
          ))}
        </Section>

        <Section id="publications" title="Selected publications">
          <ul style={parseStyle('list-style:none;margin:0;padding:0')}>
            {academic.publications.map((pub) => (
              <PublicationEntry key={pub.title} pub={pub} />
            ))}
          </ul>
        </Section>

        <Section id="timeline" title="Timeline">
          <ul style={parseStyle('list-style:none;margin:0;padding:0')}>
            {academic.timeline.map((entry) => (
              <li
                key={`${entry.year}-${entry.title}`}
                style={parseStyle('display:flex;gap:1.5rem;margin:0.5rem 0 0;align-items:baseline')}
              >
                <Text
                  as="span"
                  role="label-large"
                  style={parseStyle(`${MONO};${MUTED};flex:none;width:3rem`)}
                >
                  {entry.year}
                </Text>
                <Text as="span" role="body-large" style={parseStyle(`${SERIF};${INK}`)}>
                  {entry.title}
                  {entry.org ? <>, {entry.org}</> : null}
                </Text>
              </li>
            ))}
          </ul>
          <Text as="p" role="body-medium" style={parseStyle(`${SERIF};${MUTED};margin:1.25rem 0 0`)}>
            Hackathon notes live on{' '}
            <Link to="/work" style={linkStyle}>
              /work
            </Link>
            .
          </Text>
        </Section>

        <Section id="software" title="Software">
          <ul style={parseStyle('list-style:none;margin:0;padding:0')}>
            {academic.software.map((repo) => (
              <li key={repo.name} style={parseStyle('margin:0.75rem 0 0')}>
                <Text as="p" role="body-large" style={parseStyle(`${SERIF};${INK};margin:0`)}>
                  <Ext href={repo.href}>{repo.name}</Ext>
                </Text>
                <Text as="p" role="body-medium" style={parseStyle(`${SERIF};${MUTED};margin:0.2rem 0 0`)}>
                  {repo.description}
                </Text>
              </li>
            ))}
          </ul>
        </Section>
      </main>
    </Theme>
  );
}

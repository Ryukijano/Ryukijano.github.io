import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { parseStyle } from '../lib/style.js';
import { Text, Theme } from '../components/m3/index.jsx';
import SiteNav from '../components/SiteNav.jsx';
import Atmosphere from '../components/Atmosphere.jsx';
import MediaFigure from '../components/MediaFigure.jsx';
import NoteEquations from '../components/NoteEquations.jsx';
import NoteTaxonomy from '../components/NoteTaxonomy.jsx';

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

export default function BlogNote({ note }) {
  useEffect(() => {
    document.title = `${note.title} — Gyanateet Dutta`;
  }, [note.title]);

  return (
    <Theme
      name="study"
      style={parseStyle(
        'position:relative;min-height:100vh;' +
          'background:var(--md-sys-color-surface);color:var(--md-sys-color-on-surface);' +
          'font-family:var(--md-sys-typescale-brand-font);-webkit-font-smoothing:antialiased',
      )}
    >
      <Atmosphere variant="quiet" />
      <SiteNav variant="paper" />
      <article style={parseStyle('position:relative;z-index:1;max-width:42rem;margin:0 auto;padding:4rem 1.5rem 6rem')}>
        <Text as="p" role="label-medium" style={parseStyle(`${MONO};${MUTED};margin:0`)}>
          {note.written}
          {' · '}
          {note.area}
        </Text>
        <Text as="h1" role="headline-large" style={parseStyle(`${INK};margin:1rem 0 0`)}>
          {note.title}
        </Text>
        <Text
          as="p"
          role="body-large"
          style={parseStyle(`${SERIF};${INK};margin:1.5rem 0 0;line-height:1.65`)}
        >
          {note.lead}
        </Text>

        {note.concept ? (
          <div style={parseStyle('margin:2.5rem 0 0')}>
            <MediaFigure
              src={note.concept.src}
              alt={note.concept.alt}
              caption={note.concept.caption}
              highlight={note.concept.highlight}
              poster={note.concept.poster}
            />
          </div>
        ) : null}

        {note.taxonomy ? (
          <NoteTaxonomy
            title={note.taxonomy.title}
            branches={note.taxonomy.branches}
            caption={note.taxonomy.caption}
          />
        ) : null}

        {note.equations ? <NoteEquations items={note.equations} /> : null}

        {note.sections.map((section) => (
          <section
            key={section.heading}
            style={parseStyle('scroll-margin-top:4rem;margin:3.5rem 0 0')}
          >
            <Text
              as="p"
              role="label-small"
              style={parseStyle(`${MONO};${MUTED};letter-spacing:0.12em;margin:0`)}
            >
              {section.kicker}
            </Text>
            <Text as="h2" role="headline-small" style={parseStyle(`${INK};margin:0.75rem 0 0`)}>
              {section.heading}
            </Text>
            {section.body.map((paragraph, i) => (
              <Text
                key={`${section.kicker}-${i}`}
                as="p"
                role="body-large"
                style={parseStyle(`${SERIF};${MUTED};margin:1.15rem 0 0;line-height:1.65`)}
              >
                {paragraph}
              </Text>
            ))}
          </section>
        ))}

        <Instance instance={note.instance} />

        <p style={parseStyle(`${SERIF};margin:4rem 0 0`)}>
          {note.next ? (
            <>
              <Link to={`/blog/${note.next.slug}`} style={linkStyle}>
                Next: {note.next.label}
              </Link>
              <span aria-hidden="true"> · </span>
            </>
          ) : null}
          <Link to="/blog" style={linkStyle}>
            All notes
          </Link>
          <span aria-hidden="true"> · </span>
          <Link to="/work" style={linkStyle}>
            Work
          </Link>
        </p>
      </article>
    </Theme>
  );
}

function Instance({ instance }) {
  if (!instance) return null;

  return (
    <section style={parseStyle('scroll-margin-top:4rem;margin:3.5rem 0 0')}>
      <Text
        as="p"
        role="label-small"
        style={parseStyle(`${MONO};${MUTED};letter-spacing:0.12em;margin:0`)}
      >
        INSTANCE
      </Text>
      <Text as="h2" role="headline-small" style={parseStyle(`${INK};margin:0.75rem 0 0`)}>
        Where this showed up
      </Text>
      <blockquote
        style={parseStyle(
          'margin:1.5rem 0 0;padding:0.35rem 0 0.35rem 1.5rem;' +
            'border-left:2px solid var(--md-sys-color-primary)',
        )}
      >
        <Text
          as="p"
          role="title-medium"
          style={parseStyle(`${SERIF};${INK};margin:0;line-height:1.5`)}
        >
          {instance.quote}
        </Text>
        {instance.attribution ? (
          <Text
            as="p"
            role="label-small"
            style={parseStyle(`${MONO};${MUTED};letter-spacing:0.1em;margin:1rem 0 0`)}
          >
            {instance.attribution}
          </Text>
        ) : null}
      </blockquote>
      <p style={parseStyle(`${SERIF};margin:1.25rem 0 0`)}>
        {instance.workSlug ? (
          <Link to={`/work/${instance.workSlug}`} style={linkStyle}>
            {instance.workLabel}
          </Link>
        ) : null}
        {instance.also ? (
          <>
            {instance.workSlug ? <span aria-hidden="true"> · </span> : null}
            <Link to={`/work/${instance.also.workSlug}`} style={linkStyle}>
              {instance.also.workLabel}
            </Link>
          </>
        ) : null}
        {instance.external ? (
          <>
            {instance.workSlug || instance.also ? <span aria-hidden="true"> · </span> : null}
            <Ext href={instance.external.href}>{instance.external.label}</Ext>
          </>
        ) : null}
      </p>
      {instance.gif ? (
        <div style={parseStyle('margin:2rem 0 0')}>
          <MediaFigure
            src={instance.gif.src}
            alt={instance.gif.alt}
            caption={instance.gif.caption}
            highlight={instance.gif.highlight}
            poster={instance.gif.poster}
          />
        </div>
      ) : null}
    </section>
  );
}

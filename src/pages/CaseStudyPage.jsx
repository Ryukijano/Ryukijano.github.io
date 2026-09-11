import Atmosphere from '../components/Atmosphere';
import SiteNav from '../components/SiteNav';
import { projectLane, projectYear, relatedProjects } from '../data/portfolio';
import Link from '../lib/Link';
import { WorkInkNotFound } from './WorkPage';

function labelFromHref(href) {
  try {
    const host = new URL(href).hostname.replace(/^www\./, '');
    if (host === 'github.com' || host === 'gist.github.com') return 'Code';
    if (host === 'arxiv.org') return 'Paper';
    if (host === 'huggingface.co') return 'Hugging Face';
    return host;
  } catch {
    return 'Link';
  }
}

function collectLinks(project) {
  const seen = new Set();
  const links = [];

  const add = (href, label) => {
    if (!href || href === '#') return;
    if (seen.has(href)) return;
    seen.add(href);
    links.push({ href, label: label || labelFromHref(href) });
  };

  if (Array.isArray(project.links)) {
    for (const item of project.links) {
      if (typeof item === 'string') {
        add(item);
      } else if (item && typeof item === 'object') {
        add(item.href || item.url || item.link, item.label || item.title);
      }
    }
  }

  add(project.liveUrl, 'Live');
  add(project.link);
  return links;
}

/** Pull a trailing "Scope: …" sentence out so it is shown once, labelled. */
function splitScope(text) {
  const match = text.match(/\s*Scope:\s*([\s\S]+)$/);
  if (!match) return { body: text.trim(), scope: null };
  return { body: text.slice(0, match.index).trim(), scope: match[1].trim() };
}

function paragraphs(text) {
  const sentences = text.split(/(?<=[a-z0-9)\]”"][.!?])\s+(?=[A-Z“"(])/).filter(Boolean);
  if (sentences.length <= 4) return [text];
  const cut = Math.ceil(sentences.length / 2);
  return [sentences.slice(0, cut).join(' '), sentences.slice(cut).join(' ')];
}

function Figure({ figure }) {
  const { kind, src, poster, sources = [], width, height, alt, caption, scope } = figure;

  return (
    <figure className="plate">
      <div
        className="plate__sheet"
        style={{
          aspectRatio: `${width} / ${height}`,
          ...(poster ? { '--plate-poster': `url(${poster})` } : {}),
        }}
      >
        {kind === 'video' ? (
          <video
            src={src}
            poster={poster}
            width={width}
            height={height}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label={alt}
          />
        ) : (
          <picture>
            {sources.map((source) => (
              <source key={source.srcSet} type={source.type} srcSet={source.srcSet} sizes={source.sizes} />
            ))}
            <img src={src} alt={alt} width={width} height={height} decoding="async" loading="lazy" />
          </picture>
        )}
      </div>
      <figcaption className="plate__slip">
        <span className="plate__slug">Fig. 1</span>
        <span>
          {caption}
          {scope ? <em className="plate__scope"> {scope}</em> : null}
        </span>
      </figcaption>
      <span className="plate__kento" aria-hidden="true" />
    </figure>
  );
}

export default function CaseStudyPage({ project }) {

  if (!project) return <WorkInkNotFound />;

  const year = projectYear(project);
  const lane = projectLane(project);
  const tags = Array.isArray(project.tags) ? project.tags.filter(Boolean) : [];
  const links = collectLinks(project);
  const { body, scope } = splitScope(project.fullDesc || project.desc || '');
  const aside = project.note || scope;
  const related = relatedProjects(project);

  return (
    <div className="print">
      <Atmosphere variant="quiet" />
      <SiteNav />

      <article id="main" tabIndex={-1} className="route print__body print__body--narrow">
        <p className="print__crumb">
          <Link href="/work">Work</Link>
        </p>

        {year != null || lane ? (
          <p className="cartouche">
            {year != null ? <span>{year}</span> : null}
            {lane ? <span>{lane}</span> : null}
          </p>
        ) : null}

        <h1 className="print__title">{project.title}</h1>

        {project.role ? <p className="print__role print__role--italic">{project.role}</p> : null}

        {body ? (
          <div className="print__body-copy">
            {paragraphs(body).map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </div>
        ) : null}

        {project.figure ? <Figure figure={project.figure} /> : null}

        {aside ? (
          <aside className="scope">
            <span className="scope__label">Scope</span>
            <p>{aside}</p>
          </aside>
        ) : null}

        {tags.length > 0 || links.length > 0 ? (
          <dl className="print__meta">
            {tags.length > 0 ? (
              <div>
                <dt>Stack</dt>
                <dd>{tags.join(', ')}</dd>
              </div>
            ) : null}
            {links.length > 0 ? (
              <div>
                <dt>Links</dt>
                <dd>
                  {links.map((item, index) => (
                    <span key={item.href}>
                      {index > 0 ? ', ' : null}
                      <a href={item.href} target="_blank" rel="noopener noreferrer">
                        {item.label}
                      </a>
                    </span>
                  ))}
                </dd>
              </div>
            ) : null}
          </dl>
        ) : null}

        {related.length > 0 ? (
          <section className="print__section">
            <h2 className="print__also">Also</h2>
            <ul role="list" className="work-also">
              {related.map((item) => {
                const itemYear = projectYear(item);
                return (
                  <li key={item.slug}>
                    <span>{itemYear != null ? itemYear : ''}</span>
                    <Link href={`/work/${item.slug}`}>{item.title}</Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}
      </article>
    </div>
  );
}

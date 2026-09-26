import Atmosphere from '../components/Atmosphere';
import SiteFooter from '../components/SiteFooter';
import SiteNav from '../components/SiteNav';
import { projectLane, projectYear, projectFigures, relatedProjects } from '../data/portfolio';
import Link from '../lib/Link';
import { useArticle } from '../lib/article';
import NotFoundPage from './NotFoundPage';

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

function Figure({ figure, index }) {
  const { kind, src, poster, sources = [], width, height, alt, caption, scope } = figure;

  return (
    <figure className="plate">
      <div
        className={poster ? 'plate__sheet plate__sheet--loop' : 'plate__sheet'}
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
            {/* First, so it wins: reduced motion swaps the loop for its still
                inside the same <img>, which keeps the alt text in the
                accessibility tree and never fetches the GIF. */}
            {poster ? <source media="(prefers-reduced-motion: reduce)" srcSet={poster} /> : null}
            {sources.map((source) => (
              <source key={source.srcSet} type={source.type} srcSet={source.srcSet} sizes={source.sizes} />
            ))}
            <img src={src} alt={alt} width={width} height={height} decoding="async" loading="lazy" />
          </picture>
        )}
      </div>
      <figcaption className="plate__slip">
        <span className="plate__slug">Fig. {index}</span>
        <span>
          {caption}
          {scope ? <em className="plate__scope"> {scope}</em> : null}
        </span>
      </figcaption>
      <span className="plate__kento" aria-hidden="true" />
    </figure>
  );
}

/**
 * A long-form case study: the compiled Markdown in chunks, with the project's
 * figures placed where the text calls for them (<!-- figure N -->). Figures
 * the text never places follow it, as on a short case study.
 */
function Article({ article, plates }) {
  const placed = new Set(article.figures);
  return (
    <>
      {article.chunks.map((html, i) => {
        const n = article.figures[i];
        const figure = n ? plates[n - 1] : null;
        return (
          <div key={i}>
            <div className="print__body-copy article" dangerouslySetInnerHTML={{ __html: html }} />
            {figure ? <Figure figure={figure} index={n} /> : null}
          </div>
        );
      })}
      {plates.map((figure, index) =>
        placed.has(index + 1) ? null : <Figure key={figure.src} figure={figure} index={index + 1} />,
      )}
    </>
  );
}

export default function CaseStudyPage({ project }) {
  const article = useArticle(project?.slug);

  if (!project) return <NotFoundPage />;

  const year = projectYear(project);
  const lane = projectLane(project);
  const tags = Array.isArray(project.tags) ? project.tags.filter(Boolean) : [];
  const links = collectLinks(project);
  const { body, scope } = splitScope(project.fullDesc || project.desc || '');
  const aside = project.note || scope;
  const related = relatedProjects(project);
  const plates = projectFigures(project);

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
            {article ? <span>{article.minutes} min read</span> : null}
          </p>
        ) : null}

        <h1 className="print__title">{project.title}</h1>

        {project.role ? <p className="print__role print__role--italic">{project.role}</p> : null}

        {article ? <Article article={article} plates={plates} /> : null}

        {/* No article: the short account. While an article is loading on a
            client-side navigation (undefined), nothing, so the page does not
            show one text and then swap it for another. */}
        {article === null && body ? (
          <div className="print__body-copy">
            {paragraphs(body).map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </div>
        ) : null}

        {article === null
          ? plates.map((figure, index) => <Figure key={figure.src} figure={figure} index={index + 1} />)
          : null}

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
      <SiteFooter />
    </div>
  );
}

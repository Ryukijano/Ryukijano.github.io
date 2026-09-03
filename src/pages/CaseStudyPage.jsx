import { useEffect } from 'react';
import Atmosphere from '../components/Atmosphere';
import SiteNav from '../components/SiteNav';
import { relatedProjects } from '../data/portfolio';
import Link from '../lib/Link';
import { WorkInkNotFound } from './WorkPage';

function projectYear(project) {
  if (typeof project?.year === 'number' && Number.isFinite(project.year)) {
    return project.year;
  }

  const blob = [project?.title, project?.desc, project?.fullDesc, project?.note]
    .filter(Boolean)
    .join(' ');
  const matches = blob.match(/\b(?:19|20)\d{2}\b/g);
  if (!matches) return null;
  return Math.max(...matches.map(Number));
}

function projectLane(project) {
  if (typeof project?.lane === 'string' && project.lane.trim()) return project.lane;
  if (typeof project?.laneLabel === 'string' && project.laneLabel.trim()) return project.laneLabel;
  return '';
}

function mediaSrc(project) {
  if (typeof project.media === 'string' && project.media) return project.media;
  return project.media?.src || project.bannerSrc || null;
}

function labelFromHref(href) {
  try {
    const host = new URL(href).hostname.replace(/^www\./, '');
    if (host.includes('github')) return 'Code';
    if (host.includes('arxiv')) return 'Paper';
    if (host.includes('huggingface')) return 'Hugging Face';
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

export default function CaseStudyPage({ project }) {
  useEffect(() => {
    if (project?.title) {
      document.title = `${project.title} · Gyanateet Dutta`;
    }
  }, [project?.title]);

  if (!project) return <WorkInkNotFound />;

  const year = projectYear(project);
  const lane = projectLane(project);
  const tags = Array.isArray(project.tags) ? project.tags.filter(Boolean) : [];
  const links = collectLinks(project);
  const src = mediaSrc(project);
  const body = project.fullDesc || project.desc || '';
  const related = relatedProjects(project);
  const caption =
    year != null && !String(project.title).includes(String(year))
      ? `${project.title}, ${year}`
      : project.title;

  return (
    <div className="print print--ink">
      <Atmosphere variant="quiet" />
      <SiteNav variant="ink" />

      <article className="print__body print__body--narrow">
        <p className="print__crumb">
          <Link href="/work">Work</Link>
        </p>

        {year != null ? <p className="print__kicker">{year}</p> : null}

        <h1 className="print__title">{project.title}</h1>

        {project.role ? <p className="print__role print__role--ink">{project.role}</p> : null}

        {src ? (
          <figure className="print__figure">
            <img src={src} alt="" />
            <figcaption>{caption}</figcaption>
          </figure>
        ) : null}

        {body ? <div className="print__body-copy">{body}</div> : null}

        {lane || tags.length > 0 || links.length > 0 ? (
          <dl className="print__meta">
            {lane ? (
              <div>
                <dt>Lane</dt>
                <dd>{lane}</dd>
              </div>
            ) : null}
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

        {project.note ? <p className="print__note">{project.note}</p> : null}

        {related.length > 0 ? (
          <section className="print__section">
            <h2 className="print__also">Also</h2>
            <ul className="work-also">
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

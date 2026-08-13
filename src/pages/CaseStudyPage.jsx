import SiteNav from '../components/SiteNav';
import { relatedProjects } from '../data/portfolio';
import Link from '../lib/Link';
import { WorkInkNotFound } from './WorkPage';

const MUTED = '#9a9588';
const RULE = 'rgba(230, 225, 211, 0.16)';

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
    <main className="min-h-screen bg-[#11110e] text-[#E6E1D3]">
      <SiteNav variant="ink" />

      <article className="mx-auto max-w-[42rem] px-6 py-16">
        <p className="mb-10 font-sans text-sm" style={{ color: MUTED }}>
          <Link href="/work" className="hover:text-[#E6E1D3] hover:underline">
            Work
          </Link>
        </p>

        {year != null ? (
          <p
            className="font-mono text-[13px] tabular-nums"
            style={{ color: MUTED }}
          >
            {year}
          </p>
        ) : null}

        <h1 className="mt-3 font-serif text-3xl leading-snug text-[#E6E1D3] sm:text-4xl">
          {project.title}
        </h1>

        {project.role ? (
          <p className="mt-3 font-sans italic" style={{ color: MUTED }}>
            {project.role}
          </p>
        ) : null}

        {src ? (
          <figure className="mt-10">
            <img
              src={src}
              alt=""
              className="max-h-[24rem] w-full object-cover"
            />
            <figcaption
              className="mt-3 font-sans text-sm italic"
              style={{ color: MUTED }}
            >
              {caption}
            </figcaption>
          </figure>
        ) : null}

        {body ? (
          <div
            className="mt-10 whitespace-pre-line font-serif text-[18px] leading-[1.65] text-[#E6E1D3]"
          >
            {body}
          </div>
        ) : null}

        {lane || tags.length > 0 || links.length > 0 ? (
          <dl
            className="mt-12 space-y-3 font-sans text-sm"
          >
            {lane ? (
              <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-x-4 border-t pt-3" style={{ borderColor: RULE }}>
                <dt style={{ color: MUTED }}>Lane</dt>
                <dd className="text-[#E6E1D3]">{lane}</dd>
              </div>
            ) : null}
            {tags.length > 0 ? (
              <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-x-4 border-t pt-3" style={{ borderColor: RULE }}>
                <dt style={{ color: MUTED }}>Stack</dt>
                <dd className="text-[#E6E1D3]">{tags.join(', ')}</dd>
              </div>
            ) : null}
            {links.length > 0 ? (
              <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-x-4 border-t pt-3" style={{ borderColor: RULE }}>
                <dt style={{ color: MUTED }}>Links</dt>
                <dd className="text-[#E6E1D3]">
                  {links.map((item, index) => (
                    <span key={item.href}>
                      {index > 0 ? ', ' : null}
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-[#E6E1D3]/40 underline-offset-2 hover:decoration-[#E6E1D3]"
                      >
                        {item.label}
                      </a>
                    </span>
                  ))}
                </dd>
              </div>
            ) : null}
          </dl>
        ) : null}

        {project.note ? (
          <p className="mt-8 font-sans text-sm italic" style={{ color: MUTED }}>
            {project.note}
          </p>
        ) : null}

        {related.length > 0 ? (
          <section className="mt-16 border-t pt-10" style={{ borderColor: RULE }}>
            <h2 className="font-serif text-lg text-[#E6E1D3]">Also</h2>
            <ul className="mt-4 space-y-2">
              {related.map((item) => {
                const itemYear = projectYear(item);
                return (
                  <li
                    key={item.slug}
                    className="font-sans text-[13px]"
                    style={{ color: MUTED }}
                  >
                    {itemYear != null ? (
                      <span
                        className="mr-3 inline-block w-10 font-mono tabular-nums"
                      >
                        {itemYear}
                      </span>
                    ) : (
                      <span className="mr-3 inline-block w-10" />
                    )}
                    <Link href={`/work/${item.slug}`} className="hover:text-[#E6E1D3] hover:underline">
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}
      </article>
    </main>
  );
}

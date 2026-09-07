import { DATA, PERSONA_BY_SLUG, allProjects, projectLane, projectYear } from '../data/portfolio';
import { ACADEMIC_BIO } from '../data/publications';
import { resolveRoute } from './navigation';

export const SITE_NAME = 'Gyanateet Dutta';
export const ORIGIN = 'https://ryukijano.github.io';
export const OG_IMAGE = '/assets/images/og-plate.jpg';
export const OG_IMAGE_ALT =
  'Kanagawa plate in three states, left to right: the painted wave, its RGB encoding, a neon wireframe.';

const HOME_DESCRIPTION =
  'Gyanateet Dutta — the real world, its encoding, the digital reconstruction: graphics, surgical vision, and quantum algorithms. MSc Advanced Computer Science (Artificial Intelligence), University of Leeds.';

/** Trim to a length social cards and search results will actually show. */
function clamp(text, max = 200) {
  const t = String(text ?? '').replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  return `${t.slice(0, t.lastIndexOf(' ', max - 1))}…`;
}

/**
 * Title, description and canonical path for a route.
 *
 * One source of truth: the pages read this for document.title and the
 * prerender script reads it for the static <head>, so a shared link and a
 * hydrated tab can never disagree.
 */
export function routeMeta(pathname) {
  const route = resolveRoute(pathname);

  switch (route.kind) {
    case 'work':
      return {
        title: `Work · ${SITE_NAME}`,
        description:
          'Dated notes on things I built — graphics and systems, surgical computer vision, and quantum algorithms. The academic record is separate.',
        canonical: '/work',
      };

    case 'academic':
      return {
        title: `Academic · ${SITE_NAME}`,
        description: clamp(`${ACADEMIC_BIO.role}. ${ACADEMIC_BIO.statement}`),
        canonical: '/academic',
      };

    case 'case-study': {
      const project = allProjects().find((p) => p.slug === route.slug);
      if (!project) return notFoundMeta(pathname);
      const year = projectYear(project);
      const lane = projectLane(project);
      const prefix = [year, lane].filter(Boolean).join(' · ');
      return {
        title: `${project.title} · ${SITE_NAME}`,
        description: clamp(prefix ? `${prefix}. ${project.desc}` : project.desc),
        canonical: `/work/${project.slug}`,
      };
    }

    case 'persona': {
      const data = DATA[route.persona];
      if (!data) return notFoundMeta(pathname);
      // Both /persona/yana and /persona/gyanateet resolve to the same person.
      // LANES uses 'yana', so that is the canonical URL and the alias points
      // at it rather than competing with it for indexing.
      const canonicalSlug =
        Object.entries(PERSONA_BY_SLUG).find(
          ([slug, id]) => id === route.persona && slug === 'yana',
        )?.[0] ?? route.slug;
      return {
        title: `${data.title} · ${SITE_NAME}`,
        description: clamp(`${data.subtitle}. ${data.desc}`),
        canonical: `/persona/${canonicalSlug}`,
      };
    }

    case 'home':
      return { title: SITE_NAME, description: HOME_DESCRIPTION, canonical: '/' };

    default:
      return notFoundMeta(pathname);
  }
}

function notFoundMeta() {
  return {
    title: `Not found · ${SITE_NAME}`,
    description: HOME_DESCRIPTION,
    canonical: null,
    noindex: true,
  };
}

/**
 * Every route the site actually has, for the prerender step and the sitemap.
 * Derived from the data, so adding a project adds a page with no other edit.
 */
export function allRoutes() {
  return [
    '/',
    '/work',
    '/academic',
    ...Object.keys(PERSONA_BY_SLUG).map((slug) => `/persona/${slug}`),
    ...allProjects().map((project) => `/work/${project.slug}`),
  ];
}

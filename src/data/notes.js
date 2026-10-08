/**
 * Notes, at /notes/<slug>. The prose is src/content/notes/<slug>.md; this is
 * what the page, the prerendered <head> and the sitemap need before the prose
 * arrives. Dates are publication dates; a note is revised in place.
 */
export const NOTES = [
  {
    slug: 'beige-pc',
    number: 1,
    kicker: 'Story',
    date: 'October 2026',
    title: 'A picture is something you build',
    standfirst:
      'Games and graphics got me into computers, and I never got out. Everything since, from a mill rebuilt from a handful of photographs to surgical video and quantum circuits, has been the same question asked of different data: what does a model need to see to build the rest?',
    scope:
      'A personal account. Each number comes from the paper, write-up or repository linked in its paragraph.',
  },
];

export function findNote(slug) {
  return NOTES.find((note) => note.slug === slug) ?? null;
}

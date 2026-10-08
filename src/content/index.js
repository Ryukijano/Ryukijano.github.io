/**
 * Case studies with a long-form article in this folder (<slug>.md). The
 * client checks this list before fetching, so a project without an article
 * never makes a request; tests/articles.test.js keeps it in step with the
 * Markdown files.
 */
export const ARTICLES = [
  'agentic-structure-from-motion',
  'cuda-blackwell-labs',
  'h-cgqe-conditional-gqe',
  'quantumforge',
];

/**
 * Notes with their text in notes/<slug>.md, keyed by note slug rather than
 * project slug. A folder of their own, so a note can never be read as a case
 * study; src/data/notes.js has each note's title, date and scope line.
 */
export const NOTE_ARTICLES = ['beige-pc'];

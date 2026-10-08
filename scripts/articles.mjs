/**
 * Long-form case studies: Markdown in src/content/<slug>.md, compiled here at
 * build time. Never imported by the client bundle.
 *
 * Why not a JS module: the writing is the heaviest content on the site, and
 * shipping it inside the bundle would spend the JS budget on prose. Instead
 * the prerender puts each article into its own page, and writes
 * dist/content/<slug>.json for client-side navigation to fetch.
 *
 * A line `<!-- figure 2 -->` places the project's second figure at that point
 * in the text; figures not placed follow the article, as before.
 *
 * Notes (/notes/<slug>) are compiled the same way from src/content/notes/.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { Marked } from 'marked';

const ROOT = resolve(import.meta.dirname, '..');
export const CONTENT = join(ROOT, 'src', 'content');
export const NOTES_DIR = join(CONTENT, 'notes');

const WORDS_PER_MINUTE = 230;
const MARKER = /^<!--\s*figure\s+(\d+)\s*-->$/;

const marked = new Marked({ gfm: true });

// Tables get a scrolling wrapper, so a wide one never pushes the page
// sideways on a phone.
const wrapTables = (html) =>
  html.replace(/<table>/g, '<div class="article__table"><table>').replace(/<\/table>/g, '</table></div>');

// An external link leaves the way every other one on the site does: in a new
// tab, with no opener and no referrer.
const externalLinks = (html) =>
  html.replace(/<a href="(https?:[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener noreferrer"');

export function compileArticle(markdown) {
  const chunks = [];
  const figures = [];
  let buffer = [];
  for (const line of markdown.split('\n')) {
    const m = line.trim().match(MARKER);
    if (m) {
      chunks.push(buffer.join('\n'));
      figures.push(Number(m[1]));
      buffer = [];
    } else {
      buffer.push(line);
    }
  }
  chunks.push(buffer.join('\n'));

  const words = markdown
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/[#>*_`|[\]()-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;

  return {
    chunks: chunks.map((c) => externalLinks(wrapTables(marked.parse(c.trim())))),
    // figures[i] follows chunks[i]
    figures,
    words,
    minutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
  };
}

export function loadArticles(dir = CONTENT) {
  if (!existsSync(dir)) return {};
  const out = {};
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.md')) continue;
    const slug = file.slice(0, -3);
    out[slug] = compileArticle(readFileSync(join(dir, file), 'utf8'));
  }
  return out;
}

export const loadNotes = () => loadArticles(NOTES_DIR);

/**
 * Writing gate for field notes: spine, instance, voice, assets, next-links.
 * Run: npm run notes
 */
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { notes, notesBySlug } from '../src/content/blog/index.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SPINE = ['THE JOB', 'MECHANICS', 'THE DOMAIN'];
const DIARY = [
  /^in my .+ paper/i,
  /^i did dinov2/i,
  /^i published v-jepa/i,
  /^i trained llada/i,
  /^here is another cool project/i,
  /^i built /i,
];
const NEEDLE_BANNED = [
  'I introduced V-JEPA',
  'I published V-JEPA',
  'I trained LLaDA',
  'I introduced DINO',
];
const CLICHE = [
  'revolutionary',
  'cutting-edge',
  'seamless',
  'game-changing',
  'at the intersection of',
  'passionate about',
];

let fail = 0;

function dump(slug, msg) {
  fail += 1;
  console.log(`FAIL  /blog/${slug}  ${msg}`);
}

function publicPath(src) {
  if (!src) return null;
  return join(ROOT, 'public', src.replace(/^\//, ''));
}

for (const note of notes) {
  if (!note.slug || !note.title || !note.area || !note.desc || !note.lead) {
    dump(note.slug || '?', 'missing title/area/desc/lead');
  }
  const kickers = (note.sections || []).map((s) => s.kicker);
  for (const k of SPINE) {
    if (!kickers.includes(k)) dump(note.slug, `missing section ${k}`);
  }
  if (!note.instance?.quote) dump(note.slug, 'missing instance quote');
  const blobs = [
    note.lead,
    ...(note.sections || []).flatMap((s) => s.body),
    note.instance?.quote,
    note.taxonomy?.caption,
  ].filter(Boolean);
  const joined = blobs.join('\n');
  for (const blob of blobs) {
    if (DIARY.some((re) => re.test(blob.trim()))) {
      dump(note.slug, `project-diary opener: ${JSON.stringify(blob.slice(0, 80))}`);
    }
    for (const b of NEEDLE_BANNED) {
      if (blob.includes(b)) dump(note.slug, `banned ${JSON.stringify(b)}`);
    }
  }
  for (const c of CLICHE) {
    if (joined.toLowerCase().includes(c)) dump(note.slug, `cliche ${JSON.stringify(c)}`);
  }
  if (note.next) {
    if (!notesBySlug[note.next.slug]) dump(note.slug, `next slug missing: ${note.next.slug}`);
    if (!note.next.label) dump(note.slug, 'next missing label');
  }
  const captions = [note.concept?.caption, note.instance?.gif?.caption, note.taxonomy?.caption]
    .filter(Boolean)
    .join(' ');
  if (note.concept && !/schematic|illustrative|framing/i.test(note.concept.caption || '')) {
    dump(note.slug, 'concept figure missing schematic/illustrative/framing');
  }
  if (note.taxonomy && !captions) dump(note.slug, 'taxonomy missing caption');
  for (const src of [note.concept?.src, note.concept?.poster, note.instance?.gif?.src]) {
    const disk = publicPath(src);
    if (disk && !existsSync(disk)) dump(note.slug, `missing file ${src}`);
  }
}

const contrastive = notesBySlug['contrastive-ssl'];
if (contrastive) {
  const blob = [contrastive.lead, ...(contrastive.sections || []).flatMap((s) => s.body)].join(' ');
  if (!/self-distillation/i.test(blob)) dump('contrastive-ssl', 'DINO taxonomy: missing self-distillation');
  if (/DINO is (a )?contrastive/i.test(blob)) dump('contrastive-ssl', 'DINO equated with contrastive');
}

const predictive = notesBySlug['predictive-ssl'];
if (predictive) {
  const blob = [predictive.lead, ...(predictive.sections || []).flatMap((s) => s.body)].join(' ');
  if (!/reconstruct pixels/i.test(blob) || !/VAE/i.test(blob)) {
    dump('predictive-ssl', 'missing three-contract split (pixels / latents / VAE)');
  }
}

const post = notesBySlug['post-training'];
if (post && !/mental model, not a theorem/i.test(post.lead)) {
  dump('post-training', 'slogan must be labelled a mental model, not a theorem');
}

const diffusion = notesBySlug['diffusion-objectives'];
if (diffusion) {
  const blob = [diffusion.lead, ...(diffusion.sections || []).flatMap((s) => s.body)].join(' ');
  if (!/flow matching/i.test(blob) || !/score matching/i.test(blob)) {
    dump('diffusion-objectives', 'missing reverse-loss family (score matching / flow matching)');
  }
}

if (notes.length < 8) dump('index', `only ${notes.length} notes`);

console.log(fail ? `${fail} note check(s) failed` : `ok   ${notes.length} notes`);
process.exit(fail ? 1 : 0);

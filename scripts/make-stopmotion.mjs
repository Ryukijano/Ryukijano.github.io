/**
 * Installs the stop-motion loops.
 *
 * Four plates are copied byte for byte from the authored folders once they
 * verify as GIF89a with a NETSCAPE loop of 0. They are not redrawn. The
 * Quantum Buddies patch is drawn here: a banner of three names and one
 * circuit line, in the shipped ink tokens, with no seal. Hopfield's first
 * frame, already the eleven-dot figure, is shortened so it is not held.
 *
 *   node scripts/make-stopmotion.mjs
 */
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';

const require = createRequire(import.meta.url);
const fontkit = require('fontkit');

const ROOT = resolve(import.meta.dirname, '..');
const MEDIA = join(ROOT, 'media', 'stopmotion');
const PUBLIC = join(ROOT, 'public', 'assets', 'media');
const AUTHORED = '/cursor/stores/bc-48453313-5dea-41e8-b548-af7b16fde8a8/media/stopmotion/authored';
const FONT = fontkit.openSync(join(ROOT, 'public', 'fonts', 'ibm-plex-mono-400.woff2'));
const GIFSKI = ['/usr/local/cargo/bin/gifski', `${process.env.HOME}/.cargo/bin/gifski`].find((p) => existsSync(p)) || 'gifski';

const WASHI = '#f4f2ed';
const INK = '#1a237e';
const MUTED = '#535896';

const AUTHORED_LOOPS = [
  { id: 'blackwell-cliff', dir: 'blackwell-cliff', gif: 'blackwell-cliff.gif', poster: 'blackwell-cliff-poster.webp' },
  { id: 'b3tt3r-turntable', dir: 'b3tt3r-turntable', gif: 'b3tt3r-turntable.gif', poster: 'b3tt3r-turntable-poster.webp' },
  { id: 'quantumforge-spiral', dir: 'quantumforge-spiral', gif: 'quantumforge-aer.gif', poster: 'poster.webp' },
  { id: 'glitch-wave', dir: 'glitch-wave', gif: 'glitch-wave.gif', poster: 'poster.webp' },
];

function parseGif(buf) {
  if (buf.subarray(0, 6).toString('ascii') !== 'GIF89a') return null;
  let i = 13;
  if (buf[10] & 0x80) i += 3 * (1 << ((buf[10] & 7) + 1));
  const delays = [];
  let loop = null;
  let delayAt = null;
  while (i < buf.length) {
    const b = buf[i];
    if (b === 0x3b) break;
    if (b === 0x21 && buf[i + 1] === 0xff) {
      const size = buf[i + 2];
      const app = buf.subarray(i + 3, i + 3 + size).toString('ascii');
      let p = i + 3 + size;
      const blocks = [];
      while (buf[p] !== 0) {
        const n = buf[p];
        blocks.push(buf.subarray(p + 1, p + 1 + n));
        p += 1 + n;
      }
      if (app.startsWith('NETSCAPE')) loop = Buffer.concat(blocks).readUInt16LE(1);
      i = p + 1;
    } else if (b === 0x21 && buf[i + 1] === 0xf9) {
      if (delayAt == null) delayAt = i + 4;
      delays.push(buf.readUInt16LE(i + 4));
      i += 8;
    } else if (b === 0x21) {
      i += 2;
      while (buf[i] !== 0) i += 1 + buf[i];
      i += 1;
    } else if (b === 0x2c) {
      i += 9;
      const ip = buf[i];
      i += 1;
      if (ip & 0x80) i += 3 * (1 << ((ip & 7) + 1));
      i += 1;
      while (buf[i] !== 0) i += 1 + buf[i];
      i += 1;
    } else i += 1;
  }
  return {
    frames: delays.length,
    delays,
    loop,
    delayAt,
    width: buf.readUInt16LE(6),
    height: buf.readUInt16LE(8),
  };
}

function verify(buf, label) {
  const info = parseGif(buf);
  if (!info) throw new Error(`${label} is not GIF89a`);
  if (info.loop !== 0) throw new Error(`${label} loop is ${info.loop}, want 0`);
  if (info.frames < 2) throw new Error(`${label} has ${info.frames} frames`);
  if (info.delays[0] > 30) throw new Error(`${label} first frame is ${info.delays[0] * 10}ms`);
  if (buf.length > 700_000) throw new Error(`${label} is ${buf.length} bytes`);
  return info;
}

function copySvgs(from, to) {
  mkdirSync(to, { recursive: true });
  const walk = (dir) => {
    for (const name of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, name.name);
      if (name.isDirectory()) walk(path);
      else if (name.name.endsWith('.svg') || name.name.startsWith('caption')) {
        copyFileSync(path, join(to, name.name));
      }
    }
  };
  walk(from);
}

function installAuthored() {
  for (const loop of AUTHORED_LOOPS) {
    const dir = join(AUTHORED, loop.dir);
    const gifPath = join(dir, loop.gif);
    const posterPath = join(dir, loop.poster);
    if (!existsSync(gifPath) || !existsSync(posterPath)) {
      throw new Error(`${loop.id} is missing its gif or poster in ${dir}`);
    }
    const gif = readFileSync(gifPath);
    const info = verify(gif, loop.id);
    copyFileSync(gifPath, join(PUBLIC, `${loop.id}.gif`));
    copyFileSync(posterPath, join(PUBLIC, `${loop.id}-poster.webp`));
    copySvgs(dir, join(MEDIA, loop.id));
    console.log(`  copied ${loop.id}: ${info.width}x${info.height}, ${info.frames} frames, first ${info.delays[0] * 10}ms, loop 0`);
  }
}

function rng(seed) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function boil(pts, seed, amp) {
  const r = rng(seed);
  return pts.map(([x, y]) => [x + (r() * 2 - 1) * amp, y + (r() * 2 - 1) * amp]);
}

function poly(pts, stroke, width, extra = '') {
  const points = pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  return `<polyline points="${points}" fill="none" stroke="${stroke}" stroke-width="${width}" stroke-linecap="square" stroke-linejoin="miter" ${extra}/>`;
}

function tracked(text, x, y, px, fill) {
  const scale = px / FONT.unitsPerEm;
  const track = px * 0.12;
  const glyphs = FONT.layout(text).glyphs;
  let width = 0;
  for (const g of glyphs) width += g.advanceWidth * scale + track;
  width -= track;
  let cursor = x - width / 2;
  const parts = [];
  for (const g of glyphs) {
    const d = g.path.toSVG();
    if (d) {
      parts.push(`<path d="${d}" fill="${fill}" transform="translate(${cursor.toFixed(2)} ${y.toFixed(2)}) scale(${scale.toFixed(5)} ${(-scale).toFixed(5)})"/>`);
    }
    cursor += g.advanceWidth * scale + track;
  }
  return parts.join('');
}

function patchFrame(frame) {
  const seed = 1600 + Math.floor(frame / 3) * 29;
  const slip = [0, 0, 1, 3, 5, 3, 1, 0, 2][frame];
  const pads = [150, 320, 490];
  const names = ['GYANATEET DUTTA', 'SID ILIYASU', 'DAT CHI LE'];
  const busY = 176;
  const route = [
    [pads[0], 114],
    [pads[0], busY],
    [pads[1], busY],
    [pads[1], 114],
    [pads[1], busY],
    [pads[2], busY],
    [pads[2], 114],
  ];
  let body = `<rect x="${48 + slip}" y="${32 - Math.sign(slip)}" width="544" height="296" fill="none" stroke="${MUTED}" stroke-width="1.5"/>`;
  body += `<rect x="48" y="32" width="544" height="296" fill="none" stroke="${INK}" stroke-width="2"/>`;
  body += `<rect x="60" y="44" width="520" height="272" fill="none" stroke="${INK}" stroke-width="1" stroke-opacity="0.35"/>`;
  body += poly(boil(route, seed, 1.3), INK, 2);
  pads.forEach((x, i) => {
    const j = boil([[x, 108]], seed + 20 + i, 1.1)[0];
    body += `<rect x="${(j[0] - 6).toFixed(1)}" y="${(j[1] - 6).toFixed(1)}" width="12" height="12" fill="${INK}"/>`;
    body += tracked(names[i], x, 214, 13, INK);
  });
  return body;
}

async function drawBuddies() {
  const id = 'quantum-buddies-patch';
  const dir = join(MEDIA, id);
  const work = join(tmpdir(), id);
  mkdirSync(dir, { recursive: true });
  rmSync(work, { recursive: true, force: true });
  mkdirSync(work, { recursive: true });
  const pngs = [];
  for (let frame = 0; frame < 9; frame += 1) {
    const svg = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360"><rect width="640" height="360" fill="${WASHI}"/>${patchFrame(frame)}</svg>\n`;
    const name = `frame-${String(frame + 1).padStart(2, '0')}`;
    writeFileSync(join(dir, `${name}.svg`), svg);
    const png = join(work, `${name}.png`);
    writeFileSync(png, new Resvg(svg, { fitTo: { mode: 'width', value: 640 } }).render().asPng());
    pngs.push(png);
  }
  await sharp(pngs[0]).webp({ quality: 80 }).toFile(join(PUBLIC, `${id}-poster.webp`));
  execFileSync(GIFSKI, [
    '-o', join(PUBLIC, `${id}.gif`),
    '--fps', '10',
    '--repeat', '0',
    '--quality', '100',
    '--motion-quality', '100',
    '--lossy-quality', '100',
    '--width', '640',
    '--height', '360',
    '--no-sort',
    '--quiet',
    '--matte', 'F4F2ED',
    ...pngs,
  ], { stdio: 'inherit' });
  const gif = readFileSync(join(PUBLIC, `${id}.gif`));
  const info = verify(gif, id);
  console.log(`  drew ${id}: ${info.frames} frames, first ${info.delays[0] * 10}ms, ${(gif.length / 1000).toFixed(0)} kB`);
  rmSync(work, { recursive: true, force: true });
}

function recutHopfield() {
  const file = join(PUBLIC, 'hopfield-method.gif');
  const buf = readFileSync(file);
  const info = parseGif(buf);
  if (!info) throw new Error('hopfield-method.gif is not GIF89a');
  if (info.delays[0] <= 30) {
    console.log(`  hopfield first frame already ${info.delays[0] * 10}ms`);
    return;
  }
  buf.writeUInt16LE(12, info.delayAt);
  writeFileSync(file, buf);
  const next = parseGif(readFileSync(file));
  console.log(`  hopfield first frame ${info.delays[0] * 10}ms -> ${next.delays[0] * 10}ms (still the opening figure)`);
}

mkdirSync(PUBLIC, { recursive: true });
installAuthored();
await drawBuddies();
recutHopfield();

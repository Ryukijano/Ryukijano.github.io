// @vitest-environment node
/**
 * The workbench is a separate list from the project catalogue. fframes is
 * Dmitriy Kovalenko’s framework; it must not gain a case study.
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { allProjects } from '../src/data/portfolio.js';
import { TOOLS } from '../src/data/tools.js';

const DIST = new URL('../dist/', import.meta.url).pathname;

describe('the tools sheet', () => {
  it('lists fframes with a needs line and names its author', () => {
    expect(TOOLS.map((tool) => tool.name)).toEqual(['fframes']);
    const [tool] = TOOLS;
    expect(tool.href).toBe('https://github.com/dmtrKovalenko/fframes');
    expect(tool.what).toMatch(/Rust/);
    expect(tool.what).toMatch(/SVG/);
    expect(tool.what).toMatch(/GPU/);
    expect(tool.needs).toEqual(['Rust', 'ffmpeg', 'Skia GPU']);
    expect(tool.scope).toContain('Dmitriy Kovalenko');
    expect(allProjects().some((project) => /fframes/i.test(`${project.title} ${project.desc}`))).toBe(false);
  });

  it('ships the row on /tools and nowhere under /work', () => {
    const file = join(DIST, 'tools.html');
    expect(existsSync(file), 'dist/tools.html is missing — run npm run build first').toBe(true);
    const html = readFileSync(file, 'utf8');
    expect(html).toContain('>fframes<');
    expect(html).toContain('Dmitriy Kovalenko');
    expect(html).toContain('https://github.com/dmtrKovalenko/fframes');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(existsSync(join(DIST, 'work/fframes.html'))).toBe(false);
  });
});

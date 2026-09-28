/**
 * Workbench rows: tools an agent on this site can clone and run.
 * These are not projects. A row names the author in `scope`.
 */
export const TOOLS = [
  {
    name: 'fframes',
    href: 'https://github.com/dmtrKovalenko/fframes',
    what: 'Renders a video from Rust code, each frame an SVG scene, on the GPU.',
    needs: ['Rust', 'ffmpeg', 'Skia GPU'],
    scope: 'Dmitriy Kovalenko’s library. This site’s agent can use it.',
  },
];

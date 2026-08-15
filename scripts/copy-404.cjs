const fs = require('node:fs');
const path = require('node:path');

const dist = path.resolve(process.cwd(), 'dist');
fs.copyFileSync(path.join(dist, 'index.html'), path.join(dist, '404.html'));
console.log('GitHub Pages fallback written to dist/404.html');

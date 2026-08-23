import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

// GitHub Pages has no server-side rewrite. Serving dist/404.html as a byte copy
// of the built dist/index.html lets BrowserRouter handle deep links like
// /work/conditional-gqe. Copying after the build keeps the hashed bundle name
// correct — a hand-written 404.html goes stale the moment the hash changes.
function pagesSpaFallback() {
  return {
    name: 'pages-spa-fallback',
    closeBundle() {
      const dist = resolve(__dirname, 'dist')
      copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), pagesSpaFallback()],
  base: '/', // user site served from the domain root
  // Cloud-agent previews arrive via localhost forward or a tunnel Host
  // header (trycloudflare, etc.). Vite 7 rejects unknown hosts by default.
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: true,
  },
})

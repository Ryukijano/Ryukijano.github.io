---
name: browser-qa
description: How to visually verify this site with a real browser in this sandbox — dev/preview servers, the browser-use audit script pattern (with its API quirks), what to probe in light and dark mode, and tunneling for the owner. Load before claiming any visual change "works".
---

# Browser QA in this sandbox

## Servers

- Dev (HMR): `npx vite --host 0.0.0.0 --port 5173 --strictPort` →
  `http://127.0.0.1:5173/`. Owner reaches it through the Cursor port
  forward; the `172.x` address is NOT reachable from their laptop.
- Production preview: `npx vite preview --config /tmp/opencode/vite.preview.config.mjs --host 127.0.0.1 --port 4173`
  (the overlay sets `preview.allowedHosts: true` for tunnel hostnames
  without touching the repo's `vite.config.js`).
- Public tunnel: `/tmp/opencode/cloudflared tunnel --url http://127.0.0.1:4173 --no-autoupdate`
  (binary is downloaded; re-fetch from the cloudflared releases if
  missing). Parse the `https://*.trycloudflare.com` URL from the log.
  URLs are ephemeral.

## The browser-use pattern (installed: pip `browser-use` + playwright chromium)

`src/components` render client-side, so `curl` cannot verify markup. Use
`browser_use.BrowserSession(headless=True)`; its `get_current_page()`
returns a CDP wrapper with a DIFFERENT API from playwright:

- `page.goto(url)` — no `wait_until` kwarg. Vite's HMR websocket means
  `networkidle` would hang anyway; follow gotos with
  `await page.evaluate("() => new Promise(r => setTimeout(r, 900))")`.
- `page.evaluate(js)` — js MUST be an arrow function string
  (`"() => {...}"`); it returns a JSON string, `json.loads` it.
- `page.screenshot(format='png')` — returns bytes (no `path` kwarg);
  write the file yourself.
- No console-event listeners on this wrapper. For console capture, use
  raw `playwright.sync_api` instead (also installed) — it is the right
  tool when you need response interception (e.g. pulling p5 editor
  sketch JSON) or console logs.

## What to probe per sweep

Run routes in light, then set
`localStorage.setItem('site-mode','dark')` and repeat the key ones:

1. `data-theme` on the themed root resolves with mode
   (`study-light` / `study-dark` / `ryukijano-…`).
2. Atmosphere: `.atmo__grain` computed opacity ≈ 0.055 and
   `mix-blend-mode: soft-light`; `.atmo__rings` present on full pages
   (/, /work, /trust, /blog index, personas, /nope) and ABSENT on quiet
   pages (notes, case studies) and the home folio.
3. Nav mode toggle flips `html[data-mode]` and persists across reload.
4. h1/title sanity per route; 404 routes show the archivist copy.
5. Narrow viewport (≤599px): folio lanes stack as cards under the plate.

Screenshots go to `/tmp/opencode/shots/`. Read them with the Read tool —
probes alone have missed visual regressions before.

## Known environment traps

- Backgrounding servers: use
  `(setsid nohup … >/tmp/opencode/x.log 2>&1 </dev/null &)`; a bare `&`
  wedges the tool shell. Never `pkill -f "vite"` — the pattern matches
  the invoking shell itself; use `pkill -f "[v]ite"`.
- `npm run preview` without the allowedHosts overlay 403s tunnel
  hostnames (Vite host guard, not the tunnel).

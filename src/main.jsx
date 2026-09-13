import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// The markup is prerendered per route by scripts/prerender.mjs, so hydrate it
// rather than throwing it away and rendering from scratch.
hydrateRoot(
  document.getElementById('root'),
  <StrictMode>
    <App />
  </StrictMode>,
)

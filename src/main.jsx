import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/m3-tokens.css';
import './base.css';
import App from './routes.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

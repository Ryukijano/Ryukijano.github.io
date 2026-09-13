import { createContext, useContext, useEffect, useState } from 'react';
import { navigate, normalizePath } from './navigation';

/**
 * Set by the prerender step so every route renders as itself.
 * `null` in the browser, where location is the source of truth.
 */
export const PathContext = createContext(null);

export function usePath() {
  const serverPath = useContext(PathContext);

  const [path, setPath] = useState(() => {
    if (serverPath != null) return normalizePath(serverPath);
    return typeof window === 'undefined' ? '/' : normalizePath(window.location.pathname);
  });

  useEffect(() => {
    // Links from the pre-React site.
    const hash = window.location.hash.replace('#', '');
    if (hash === 'academic') {
      navigate('/academic');
    } else if (hash === 'builder') {
      navigate('/');
    }

    const onChange = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener('popstate', onChange);
    return () => window.removeEventListener('popstate', onChange);
  }, []);

  return path;
}

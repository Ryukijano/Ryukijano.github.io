import { useEffect, useState } from 'react';
import { navigate, normalizePath } from './navigation';

export function usePath() {
  const [path, setPath] = useState(() =>
    typeof window === 'undefined' ? '/' : normalizePath(window.location.pathname),
  );

  useEffect(() => {
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

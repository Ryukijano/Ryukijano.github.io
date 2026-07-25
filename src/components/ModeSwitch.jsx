import { useState, useEffect } from 'react';

// --- Mode Switch: Academic / Builder toggle with hash persistence ---
const ModeSwitch = ({ mode, setMode }) => {
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'academic' || hash === 'builder') {
        setMode(hash);
      }
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, [setMode]);

  const handleSwitch = (next) => {
    setMode(next);
    window.history.pushState(null, '', `#${next}`);
  };

  return (
    <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-1 bg-white/90 backdrop-blur-md rounded-full px-1 py-1 shadow-lg font-mono text-xs sm:text-sm">
      <button
        onClick={() => handleSwitch('academic')}
        className={`px-3 py-1.5 rounded-full transition-colors duration-300 ${
          mode === 'academic' ? 'bg-black text-white' : 'text-black/50 hover:text-black'
        }`}
      >
        Academic
      </button>
      <button
        onClick={() => handleSwitch('builder')}
        className={`px-3 py-1.5 rounded-full transition-colors duration-300 ${
          mode === 'builder' ? 'bg-black text-white' : 'text-black/50 hover:text-black'
        }`}
      >
        Builder
      </button>
    </div>
  );
};

export default ModeSwitch;

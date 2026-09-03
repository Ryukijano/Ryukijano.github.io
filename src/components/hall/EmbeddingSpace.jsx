import { useEffect, useRef } from 'react';

function seedParticles(width, height) {
  const particles = [];
  const count = 90;
  for (let i = 0; i < count; i += 1) {
    const t = (i + 0.37) * 12.9898;
    const u = (i + 0.71) * 78.233;
    const x = (Math.sin(t) * 0.5 + 0.5) * width;
    const y = 0.38 * height + (Math.sin(u) * 0.5 + 0.5) * 0.62 * height;
    const palette = i % 3;
    particles.push({
      x,
      y,
      size: 2.2 + (i % 5) * 0.7,
      speed: 0.08 + (i % 7) * 0.02,
      phase: i * 0.37,
      r: palette === 0 ? 150 : palette === 1 ? 176 : 132,
      g: palette === 0 ? 164 : palette === 1 ? 148 : 148,
      b: palette === 0 ? 232 : palette === 1 ? 232 : 210,
    });
  }
  return particles;
}

/** Sparse, seeded points — no per-frame random sparkle. */
export default function EmbeddingSpace() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    let frameId = 0;
    let time = 0;
    let running = true;
    let particles = [];

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = seedParticles(width, height);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      if (!running) return;
      const { width, height } = canvas.getBoundingClientRect();
      time += 0.008;
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        const ox = Math.sin(time * p.speed + p.phase) * 10;
        const oy = Math.cos(time * p.speed * 0.7 + p.phase) * 8;
        const alpha = 0.18 + 0.1 * Math.sin(time * 0.4 + p.phase);
        ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${alpha})`;
        ctx.fillRect(p.x + ox, p.y + oy, p.size, p.size);
      }
      frameId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      running = false;
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="hall-canvas" aria-hidden="true" />;
}

import { useEffect, useRef } from 'react';

/** Slow indigo ink lines for the Ryukijano room. */
export default function FluidWaves() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    let frameId = 0;
    let time = 0;
    let running = true;

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      if (!running) return;
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      time += 0.006;
      for (let i = 0; i < 3; i += 1) {
        ctx.beginPath();
        ctx.lineWidth = 1.25;
        ctx.strokeStyle = `rgba(26, 35, 126, ${0.12 + i * 0.06})`;
        for (let x = 0; x <= width; x += 6) {
          const y =
            Math.sin(x * 0.004 + time + i * 0.8) * 42 +
            Math.sin(x * 0.011 + time * 0.45) * 16 +
            height * (0.58 + i * 0.08);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
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

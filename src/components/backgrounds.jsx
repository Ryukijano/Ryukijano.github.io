import { useEffect, useRef } from 'react';

// --- Expanded Background Components ---

const ExpandedFluidWaves = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frameId;
    let time = 0;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.008;
      for (let layer = 0; layer < 5; layer++) {
        ctx.beginPath();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = `rgba(26, 35, 126, ${0.03 + layer * 0.015})`;
        for (let x = 0; x < canvas.width; x += 3) {
          const y = Math.sin(x * 0.003 + time + layer * 0.5) * 80 
                  + Math.sin(x * 0.007 + time * 0.7) * 40 
                  + canvas.height * (0.3 + layer * 0.12);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      frameId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
    };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full opacity-60 pointer-events-none z-[1]" />;
};

const ExpandedEmbeddingSpace = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frameId;
    let time = 0;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    const gridSize = 24;
    const draw = () => {
      time += 0.012;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const flowX = x * 0.004 - time * 0.04;
          const flowY = y * 0.004 + time * 0.02;
          const noise = Math.sin(flowX) * Math.cos(flowY) + Math.sin(flowX * 1.3 + flowY * 1.3) * 0.3;
          let probability = 0.08 + noise * 0.06;
          const normalizedY = y / canvas.height;
          if (normalizedY > 0.7) probability *= 1 - (normalizedY - 0.7) / 0.3;
          if (Math.random() < probability * 0.5) {
            const colorNoise = Math.sin(flowX * 0.2 + flowY * 0.2 + time * 0.01);
            let r, g, b;
            if (colorNoise > 0.3) { r = 100; g = 220; b = 255; }
            else if (colorNoise > -0.3) { r = 140; g = 140; b = 255; }
            else { r = 180; g = 120; b = 255; }
            const alpha = 0.2 + Math.random() * 0.15;
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.3)`;
            const size = gridSize * (0.3 + Math.random() * 0.3);
            ctx.fillRect(x, y, size, size);
            ctx.shadowBlur = 0;
          }
        }
      }
      frameId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
    };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full opacity-50 pointer-events-none z-[1]" />;
};

const ExpandedCyberGrid = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)]">
        <div className="absolute inset-[-100%] w-[300%] h-[300%] animate-grid-move-expanded opacity-20"
             style={{
               backgroundImage: `
                 linear-gradient(to right, rgba(255, 46, 99, 0.4) 1px, transparent 1px),
                 linear-gradient(to bottom, rgba(255, 46, 99, 0.4) 1px, transparent 1px)
               `,
               backgroundSize: '80px 80px',
             }}
        />
      </div>
      <div className="absolute inset-0 opacity-5"
           style={{
             backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,46,99,0.1) 2px, rgba(255,46,99,0.1) 4px)',
           }}
      />
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#FF2E63] rounded-full animate-ping opacity-60" />
      <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse" />
      <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-[#FF2E63] rounded-full animate-ping opacity-40" style={{ animationDelay: '1s' }} />
    </div>
  );
};

// --- Pane Background Components ---

const FluidWaves = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frameId;
    let time = 0;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;
      const lines = 3;
      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = `rgba(26, 35, 126, ${0.1 + i * 0.05})`; 
        for (let x = 0; x < canvas.width; x += 5) {
          const y = Math.sin(x * 0.005 + time + i) * 50 
                  + Math.sin(x * 0.01 + time * 0.5) * 20 
                  + canvas.height * (0.6 + i * 0.1); 
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      frameId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
    };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50 pointer-events-none" />;
};

const EmbeddingSpace = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frameId;
    let time = 0;
    
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    
    const gridSize = 20; 
    
    const draw = () => {
      time += 0.015;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          
          const normalizedX = x / canvas.width;
          const normalizedY = y / canvas.height;
          
          const flowX = x * 0.005 - time * 0.05;
          const flowY = y * 0.005 + time * 0.02;
          
          const noise1 = Math.sin(flowX) * Math.cos(flowY);
          const noise2 = Math.sin(flowX * 1.2 + flowY * 1.2) * 0.3;
          const totalNoise = noise1 + noise2;
          
          let probability = 0;
          
          if (normalizedY > 0.4) {
            probability = 0.15 + totalNoise * 0.1;
          } else {
            probability = 0.05;
          }
          
          if (normalizedX > 0.9 || normalizedX < 0.1) probability *= 0.3;

          if (Math.random() < probability * 0.4) {
             
             let r, g, b;
             
             const colorNoise = Math.sin(flowX * 0.2 + flowY * 0.2 + time * 0.01);
             
             if (colorNoise > 0.4) {
               r = 100; g = 220; b = 255;
             } else if (colorNoise > 0) {
               r = 120; g = 150; b = 255;
             } else if (colorNoise > -0.4) {
               r = 180; g = 130; b = 255;
             } else {
               r = 140; g = 140; b = 220;
             }
             
             let alpha = 0.25 + Math.random() * 0.2;
             
             ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
             
             const size = gridSize * (0.3 + Math.random() * 0.3);
             
             ctx.shadowBlur = 12;
             ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.4)`;
             ctx.fillRect(x, y, size, size);
             ctx.shadowBlur = 0;
          }
        }
      }
      
      frameId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
       window.removeEventListener('resize', resize);
       cancelAnimationFrame(frameId);
    }
  }, []);
  
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50 pointer-events-none z-[1]" />;
};

const CyberGrid = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      <div className="absolute inset-0">
        <div className="absolute inset-[-100%] w-[300%] h-[300%] animate-grid-move opacity-60"
             style={{
               backgroundImage: `
                 linear-gradient(to right, rgba(255, 46, 99, 0.5) 1px, transparent 1px),
                 linear-gradient(to bottom, rgba(255, 46, 99, 0.5) 1px, transparent 1px)
               `,
               backgroundSize: '50px 50px',
             }}
        />
      </div>
      
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-[-50%] w-[200%] h-[200%] animate-grid-move-slow"
             style={{
               backgroundImage: `
                 linear-gradient(to right, rgba(0, 255, 255, 0.3) 1px, transparent 1px),
                 linear-gradient(to bottom, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
               `,
               backgroundSize: '80px 80px',
             }}
        />
      </div>
      
      <div className="absolute inset-0 opacity-10"
           style={{
             backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,46,99,0.15) 2px, rgba(255,46,99,0.15) 4px)',
           }}
      />
      
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#FF2E63]/20 to-transparent" />
      
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#FF2E63] rounded-full animate-ping opacity-70" />
      <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
      <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-[#FF2E63] rounded-full animate-ping opacity-50" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-1/3 left-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      
    </div>
  );
};

export { FluidWaves, EmbeddingSpace, CyberGrid, ExpandedFluidWaves, ExpandedEmbeddingSpace, ExpandedCyberGrid };

import React, { useEffect, useRef } from 'react';

interface ParticleCanvasProps {
  density?: 'low' | 'medium' | 'high';
  speed?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  vx: number;
  vy: number;
  hue: number;
  pulseSpeed: number;
  pulsePhase: number;
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({
  density = 'medium',
  speed = 1,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = density === 'low' ? 35 : density === 'medium' ? 70 : 120;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        baseAlpha: Math.random() * 0.6 + 0.2,
        alpha: Math.random() * 0.6 + 0.2,
        vx: (Math.random() - 0.5) * 0.3 * speed,
        vy: -(Math.random() * 0.5 + 0.2) * speed, // gently drifting upward
        hue: Math.random() > 0.3 ? 42 : 32, // warm gold / amber
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * 60 * dt;
        p.y += p.vy * 60 * dt;
        p.pulsePhase += p.pulseSpeed;

        p.alpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.25;
        p.alpha = Math.max(0.05, Math.min(0.9, p.alpha));

        // wrap around screen edges
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw particle glow
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
        gradient.addColorStop(0, `hsla(${p.hue}, 100%, 75%, ${p.alpha})`);
        gradient.addColorStop(0.5, `hsla(${p.hue}, 90%, 55%, ${p.alpha * 0.5})`);
        gradient.addColorStop(1, `hsla(${p.hue}, 80%, 40%, 0)`);
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core bright dot
        ctx.beginPath();
        ctx.fillStyle = `hsla(50, 100%, 95%, ${p.alpha})`;
        ctx.arc(p.x, p.y, p.radius * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    />
  );
};

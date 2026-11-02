import React, { useEffect, useRef } from 'react';

interface AtmosphereCanvasProps {
  intensity?: 'dark' | 'subtle' | 'rich' | 'celebration';
}

export const AtmosphereCanvas: React.FC<AtmosphereCanvasProps> = ({ intensity = 'rich' }) => {
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

    const particleCount = intensity === 'dark' ? 25 : intensity === 'subtle' ? 55 : intensity === 'celebration' ? 140 : 85;

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      pulseSpeed: number;
      color: string;
      glow: number;
    }

    const goldColors = [
      '#FFDF73', // Light Gold
      '#F5B041', // Amber Gold
      '#E67E22', // Deep Orange
      '#F39C12', // Warm Saffron
      '#FAD7A0', // Warm Ivory Glow
    ];

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.8 + 0.6,
        speedY: -(Math.random() * 0.6 + 0.15),
        speedX: (Math.random() - 0.5) * 0.35,
        opacity: Math.random() * 0.7 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        color: goldColors[Math.floor(Math.random() * goldColors.length)],
        glow: Math.random() * 10 + 4,
      });
    }

    // Stars in background
    const starCount = 60;
    interface Star {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      twinkle: number;
    }
    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.8,
        radius: Math.random() * 1.2 + 0.3,
        alpha: Math.random() * 0.8 + 0.1,
        twinkle: Math.random() * 0.03 + 0.01,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render stars
      for (const s of stars) {
        s.alpha += s.twinkle;
        if (s.alpha > 0.9 || s.alpha < 0.15) s.twinkle = -s.twinkle;
        ctx.fillStyle = `rgba(255, 245, 215, ${Math.max(0.1, s.alpha * 0.5)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render golden embers
      for (const p of particles) {
        p.y += p.speedY;
        p.x += p.speedX;
        p.opacity += Math.sin(Date.now() * p.pulseSpeed * 0.1) * 0.015;

        if (p.y < -20) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        ctx.save();
        ctx.shadowBlur = p.glow;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.08, Math.min(0.95, p.opacity));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

import React, { useEffect, useRef } from 'react';
import { soundEffects } from '../../services/soundEffects';

interface FireworksCanvasProps {
  onSequenceComplete?: () => void;
  interactive?: boolean;
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vy: number;
  color: string;
  trail: { x: number; y: number; alpha: number }[];
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  decay: number;
  size: number;
  twinkle: boolean;
}

export const FireworksCanvas: React.FC<FireworksCanvasProps> = ({
  onSequenceComplete,
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const rockets: Rocket[] = [];
    const sparks: Spark[] = [];

    // Festive Indian color palette for fireworks
    const colors = [
      '#f59e0b', // Gold / Amber
      '#fbbf24', // Warm Yellow
      '#ef4444', // Festive Ruby
      '#ec4899', // Gulal Pink
      '#8b5cf6', // Royal Purple
      '#10b981', // Emerald Spark
      '#ffffff', // Bright White
    ];

    const createExplosion = (x: number, y: number, baseColor?: string) => {
      const color = baseColor || colors[Math.floor(Math.random() * colors.length)];
      const sparkCount = Math.floor(Math.random() * 40) + 60;
      const isGoldCluster = Math.random() > 0.4;

      for (let i = 0; i < sparkCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1.5;
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: isGoldCluster && Math.random() > 0.3 ? '#fbbf24' : color,
          alpha: 1,
          decay: Math.random() * 0.015 + 0.012,
          size: Math.random() * 2.5 + 1.2,
          twinkle: Math.random() > 0.4,
        });
      }
    };

    const launchRocket = (startX?: number, targetY?: number, color?: string) => {
      const x = startX !== undefined ? startX : width * 0.2 + Math.random() * (width * 0.6);
      const target = targetY !== undefined ? targetY : height * 0.15 + Math.random() * (height * 0.35);
      const chosenColor = color || colors[Math.floor(Math.random() * colors.length)];

      rockets.push({
        x,
        y: height,
        targetY: target,
        vy: -(Math.random() * 3 + 11),
        color: chosenColor,
        trail: [],
      });
    };

    // Staged sequence of rockets for cinematic Diwali burst
    const sequenceTimeouts: NodeJS.Timeout[] = [
      // Wave 1: Center rocket
      setTimeout(() => launchRocket(width * 0.5, height * 0.28, '#f59e0b'), 100),
      // Wave 2: Left and right rockets
      setTimeout(() => launchRocket(width * 0.32, height * 0.34, '#fbbf24'), 600),
      setTimeout(() => launchRocket(width * 0.68, height * 0.26, '#ec4899'), 900),
      // Wave 3: Double golden burst
      setTimeout(() => launchRocket(width * 0.45, height * 0.2, '#fef08a'), 1500),
      setTimeout(() => launchRocket(width * 0.55, height * 0.22, '#ef4444'), 1800),
      // Grand Finale Wave: 3 rockets simultaneous
      setTimeout(() => launchRocket(width * 0.25, height * 0.3, '#8b5cf6'), 2400),
      setTimeout(() => launchRocket(width * 0.5, height * 0.15, '#fbbf24'), 2600),
      setTimeout(() => launchRocket(width * 0.75, height * 0.32, '#10b981'), 2800),
      // Finished
      setTimeout(() => {
        if (onSequenceComplete) {
          onSequenceComplete();
        }
      }, 4800),
    ];

    const handleClick = (e: MouseEvent) => {
      if (!interactive) return;
      launchRocket(e.clientX, e.clientY);
      soundEffects.playFireworkBoom();
    };

    const handleTouch = (e: TouchEvent) => {
      if (!interactive || e.touches.length === 0) return;
      const touch = e.touches[0];
      launchRocket(touch.clientX, touch.clientY);
      soundEffects.playFireworkBoom();
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleTouch);

    let animationId: number;

    const render = () => {
      // Semi-transparent fade creates golden comet trails
      ctx.fillStyle = 'rgba(7, 5, 10, 0.25)';
      ctx.fillRect(0, 0, width, height);

      // Render & update Rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.y += r.vy;
        r.vy *= 0.985; // Slight deceleration

        // Add trail particle
        r.trail.push({ x: r.x + (Math.random() - 0.5) * 2, y: r.y, alpha: 1 });
        if (r.trail.length > 8) r.trail.shift();

        // Draw trail
        for (let t = 0; t < r.trail.length; t++) {
          const pt = r.trail[t];
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(251, 191, 36, ${(t / r.trail.length) * 0.8})`;
          ctx.fill();
        }

        // Draw rocket head spark
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = '#fffbeb';
        ctx.shadowColor = r.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Check if reached apex or target
        if (r.y <= r.targetY || r.vy >= -1) {
          createExplosion(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      // Render & update Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.065; // Gravity
        s.vx *= 0.975; // Air friction
        s.vy *= 0.975;
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        const currentAlpha = s.twinkle && Math.random() > 0.3 ? s.alpha * 0.5 : s.alpha;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * (s.alpha * 0.8 + 0.2), 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(0, currentAlpha);
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleTouch);
      sequenceTimeouts.forEach(clearTimeout);
      cancelAnimationFrame(animationId);
    };
  }, [interactive, onSequenceComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-auto z-10"
      aria-hidden="true"
    />
  );
};

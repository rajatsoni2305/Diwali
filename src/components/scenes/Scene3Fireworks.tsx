
import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { soundEffects } from '../../services/soundEffects';

interface SceneProps {
  onNext: () => void;
}

interface Particle {
  x: number; y: number; vx: number; vy: number;
  alpha: number; decay: number; color: string; size: number;
}

export const Scene3Fireworks: React.FC<SceneProps> = ({ onNext }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let animationId = 0;
    let finished = false;
    const particles: Particle[] = [];
    const colors = ['#fff0c2', '#ffd166', '#f7ad55', '#ff8b64', '#f6d6ff', '#ffffff'];

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const burst = (x: number, y: number, count: number, power: number) => {
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.12;
        const speed = (2 + Math.random() * 5) * power;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: 0.009 + Math.random() * 0.014,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 1 + Math.random() * 2.4,
        });
      }
    };

    const timers = [
      window.setTimeout(() => {
        soundEffects.playFireworkBoom();
        burst(window.innerWidth * 0.5, window.innerHeight * 0.3, 150, 1.2);
      }, 150),
      window.setTimeout(() => {
        soundEffects.playFireworkBoom();
        burst(window.innerWidth * 0.25, window.innerHeight * 0.42, 85, 0.9);
      }, 850),
      window.setTimeout(() => {
        burst(window.innerWidth * 0.76, window.innerHeight * 0.34, 100, 1);
      }, 1350),
      window.setTimeout(() => {
        burst(window.innerWidth * 0.52, window.innerHeight * 0.18, 120, 0.8);
      }, 2050),
    ];

    const animate = () => {
      if (finished) return;

      ctx.fillStyle = 'rgba(12, 8, 20, 0.22)';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.985;
        p.vy = p.vy * 0.985 + 0.045;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationId = requestAnimationFrame(animate);
    };

    ctx.fillStyle = '#100b1a';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    animationId = requestAnimationFrame(animate);

    const nextTimer = window.setTimeout(() => {
      if (!finished) {
        finished = true;
        onNext();
      }
    }, 5200);

    return () => {
      finished = true;
      timers.forEach(clearTimeout);
      clearTimeout(nextTimer);
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [onNext]);

  return (
    <div className="relative isolate flex min-h-screen h-full w-full items-center justify-center overflow-hidden bg-[#100b1a]">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_15%,rgba(12,7,19,.55)_100%)]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 15 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.9, 1, 1.03, 1.08], y: [15, 0, 0, -10] }}
        transition={{ duration: 4.3, delay: 0.3 }}
        className="pointer-events-none relative z-10 px-5 text-center"
      >
        <p className="mb-5 font-cinzel text-[10px] uppercase tracking-[0.4em] text-[#dcb77d] sm:text-xs">
          A celebration in the sky
        </p>
        <h2 className="font-marcellus text-3xl leading-relaxed text-[#fff0cf] gold-glow-lg sm:text-5xl">
          A Golden Light
          <br />
          Awakes
        </h2>
        <div className="mx-auto mt-7 h-px w-24 bg-gradient-to-r from-transparent via-[#f0c77d] to-transparent" />
        <p className="mt-5 font-kalam text-sm text-[#e7cda6] sm:text-lg">
          May every little spark bring a little happiness.
        </p>
      </motion.div>

      <div className="pointer-events-none absolute bottom-9 text-[9px] uppercase tracking-[0.35em] text-[#bda17c]/70">
        A night to remember
      </div>
    </div>
  );
};

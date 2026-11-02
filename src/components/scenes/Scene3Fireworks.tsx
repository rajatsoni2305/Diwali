import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { soundEffects } from '../../services/soundEffects';

interface SceneProps {
  onNext: () => void;
}

export const Scene3Fireworks: React.FC<SceneProps> = ({ onNext }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    soundEffects.playFireworkBoom();

    // Trigger secondary burst sound slightly after
    const t2 = setTimeout(() => {
      soundEffects.playFireworkBoom();
    }, 700);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    interface FireworkParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      decay: number;
      color: string;
      size: number;
      gravity: number;
      drag: number;
      trail: { x: number; y: number }[];
    }

    const particles: FireworkParticle[] = [];
    const colors = [
      '#FFF3B0', '#FFE082', '#FFD54F', '#FFCA28', '#FFB300',
      '#FFA000', '#FF8F00', '#FF6F00', '#FFFFFF', '#FFF8E1'
    ];

    const createBurst = (cx: number, cy: number, count: number, speedScale: number) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 8 + 2) * speedScale;
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: Math.random() * 0.015 + 0.01,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 2.8 + 1.2,
          gravity: 0.12,
          drag: 0.965,
          trail: [],
        });
      }
    };

    // Primary grand burst in upper-center
    createBurst(width / 2, height * 0.28, 220, 1.2);

    // Subsidiary delayed bursts
    setTimeout(() => {
      createBurst(width * 0.35, height * 0.38, 120, 0.9);
    }, 550);

    setTimeout(() => {
      createBurst(width * 0.65, height * 0.35, 140, 1.0);
    }, 900);

    const animate = () => {
      ctx.fillStyle = 'rgba(7, 5, 3, 0.2)';
      ctx.fillRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 5) p.trail.shift();

        p.vx *= p.drag;
        p.vy = p.vy * p.drag + p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Draw trail
        ctx.save();
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = p.alpha * 0.45;
        ctx.lineWidth = p.size * 0.7;
        ctx.beginPath();
        for (let j = 0; j < p.trail.length; j++) {
          const pt = p.trail[j];
          if (j === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();

        // Draw head
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    // Transition smoothly into Scene 4 after explosion reaches full bloom
    const nextTimer = setTimeout(() => {
      onNext();
    }, 4200);

    return () => {
      clearTimeout(t2);
      clearTimeout(nextTimer);
      cancelAnimationFrame(animId);
    };
  }, [onNext]);

  return (
    <div className="relative w-full h-full min-h-screen bg-[#070503] overflow-hidden flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Screen flash on initial burst */}
      <motion.div
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute inset-0 bg-[#ffecb3] pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0, 0.9, 0], scale: [0.9, 1.05, 1.1] }}
        transition={{ duration: 3.2, delay: 0.6 }}
        className="relative z-10 text-center pointer-events-none px-4"
      >
        <span className="font-cinzel text-xl sm:text-3xl text-[#ffe57f] gold-glow tracking-widest uppercase">
          A Golden Light Awakes
        </span>
      </motion.div>
    </div>
  );
};

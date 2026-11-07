
import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { soundEffects } from '../../services/soundEffects';

interface SceneProps {
  onNext: () => void;
}

export const Scene2Rocket: React.FC<SceneProps> = ({ onNext }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    soundEffects.playRocketLaunch();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    let rocketY = height - 100;
    const rocketX = width / 2;
    let vy = -2;
    const ay = -0.38;

    interface Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      size: number;
    }

    const sparks: Spark[] = [];
    const colors = ['#FFE082', '#FFB300', '#FF7043', '#FFFFFF', '#FFCA28'];

    const animate = () => {
      ctx.fillStyle = 'rgba(7, 5, 3, 0.22)';
      ctx.fillRect(0, 0, width, height);

      vy += ay;
      rocketY += vy;

      for (let i = 0; i < 7; i++) {
        sparks.push({
          x: rocketX + (Math.random() - 0.5) * 6,
          y: rocketY + 20,
          vx: (Math.random() - 0.5) * 2.5,
          vy: Math.random() * 4 + 1.5,
          alpha: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 3 + 1,
        });
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= 0.035;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = s.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (rocketY > -30) {
        ctx.save();
        ctx.translate(rocketX, rocketY);

        ctx.strokeStyle = '#8d6e63';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 45);
        ctx.stroke();

        ctx.fillStyle = '#b71c1c';
        ctx.beginPath();
        ctx.moveTo(0, -18);
        ctx.lineTo(-6, 0);
        ctx.lineTo(6, 0);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#ffd54f';
        ctx.fillRect(-6, 0, 12, 22);

        ctx.fillStyle = '#ff8f00';
        ctx.fillRect(-6, 6, 12, 6);

        ctx.shadowBlur = 25;
        ctx.shadowColor = '#ff9800';
        ctx.fillStyle = '#fff59d';
        ctx.beginPath();
        ctx.ellipse(0, 24, 4, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      if (rocketY <= height * 0.18) {
        cancelAnimationFrame(animId);
        onNext();
        return;
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [onNext]);

  return (
    <div className="relative w-full h-full min-h-screen bg-[#070503] overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="absolute bottom-0 inset-x-0 h-40 pointer-events-none opacity-30 flex items-end justify-center">
        <svg
          viewBox="0 0 1200 160"
          className="w-full h-full object-cover text-[#ffd700]"
          fill="currentColor"
        >
          <path d="M0,160 L0,120 Q50,110 100,120 L150,120 Q180,70 210,120 L300,120 Q350,50 400,120 L520,120 Q550,80 580,120 L700,120 Q760,40 820,120 L940,120 Q970,75 1000,120 L1200,120 L1200,160 Z" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        className="absolute top-12 inset-x-0 text-center font-marcellus text-xs uppercase tracking-[0.3em] text-[#d4af37]"
      >
        Skyward Ascent
      </motion.div>
    </div>
  );
};

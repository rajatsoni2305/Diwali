import React, { useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';
import { soundEffects } from '../../services/soundEffects';

interface Props {
  onNext: () => void;
}

export const SceneGiftHamper: React.FC<Props> = memo(({ onNext }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Confetti Physics Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const pieces: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      rotation: number;
      rotSpeed: number;
    }> = Array.from({ length: 50 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 1.5,
      vy: Math.random() * 2 + 1,
      size: Math.random() * 6 + 4,
      color: ['#f59e0b', '#ec4899', '#3b82f6', '#10b981', '#fbbf24', '#f43f5e'][Math.floor(Math.random() * 6)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 5
    }));

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      pieces.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        if (p.y > h) {
          p.y = -10;
          p.x = Math.random() * w;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => cancelAnimationFrame(animId);
  }, []);

  const handleContinue = () => {
    try {
      soundEffects.play('bell');
    } catch (e) {
      // fallback
    }
    onNext();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-8 text-center select-none pt-20 pb-32">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Luxury Diwali Hamper Visual */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, type: "spring" }}
        className="relative w-64 h-64 mb-8 flex items-center justify-center animate-floating-hero z-10"
      >
        <div className="absolute inset-0 bg-pink-500/20 blur-3xl rounded-full" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Treats Stack */}
          <div className="flex -space-x-3 text-4xl -mb-4 z-20">
            <span>🎁</span>
            <span className="scale-125">🍫</span>
            <span className="scale-110">🍬</span>
            <span className="scale-115">🪔</span>
          </div>

          {/* Woven Basket */}
          <div className="w-52 h-32 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-950 rounded-b-[40px] border-2 border-amber-300 shadow-[0_0_40px_rgba(245,158,11,0.7)] flex flex-col items-center justify-center p-4">
            <div className="w-14 h-8 bg-red-600 rounded-full border border-red-300 shadow-md flex items-center justify-center text-sm text-white">
              🎀
            </div>
            <div className="w-full h-[1.5px] bg-yellow-300/60 my-2" />
            <span className="text-xs tracking-widest text-amber-200 uppercase font-serif font-bold">
              Exclusively Handcrafted
            </span>
          </div>
        </div>
      </motion.div>

      {/* Romantic Headline */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="max-w-md w-full px-6 mb-8 z-10"
      >
        <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-amber-50 mb-4 drop-shadow-[0_2px_15px_rgba(251,191,36,0.6)]">
          Diwali without you? <span className="text-rose-400">Illegal.</span>
        </h2>
        <p className="text-amber-200/90 font-serif italic text-lg sm:text-xl leading-relaxed">
          "Who else is supposed to celebrate with, share all the sweets with, and smile at? Only you."
        </p>
      </motion.div>

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleContinue}
        className="px-12 py-4 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white font-medium text-lg tracking-wide shadow-[0_0_35px_rgba(244,63,94,0.65)] hover:brightness-110 transition-all border border-pink-200/40 cursor-pointer z-10"
      >
        Claim Your Hamper 🎁
      </motion.button>
    </div>
  );
});

SceneGiftHamper.displayName = 'SceneGiftHamper';

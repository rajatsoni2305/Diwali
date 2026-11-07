import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEffects } from '../../services/soundEffects';

interface Props {
  onNext: () => void;
}

export const SceneInteractiveCrackers: React.FC<Props> = memo(({ onNext }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [litItems, setLitItems] = useState<{ [key: string]: boolean }>({});

  const crackers = [
    { id: 'anar', name: 'Royal Anar', icon: '🌋', color: '#f59e0b', spark: '✨ 🌟 ✨' },
    { id: 'chakri', name: 'Zamin Chakri', icon: '🌀', color: '#10b981', spark: '💫 ✨ 💫' },
    { id: 'rocket', name: 'Sky Rocket', icon: '🚀', color: '#ef4444', spark: '🎆 💥 🎆' },
    { id: 'bomb', name: 'Sutli Bomb', icon: '💣', color: '#b45309', spark: '💥 💥 💥' },
    { id: 'sparkler', name: 'Magic Phuljhadi', icon: '🪄', color: '#ec4899', spark: '✨ ⭐️ ✨' }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
    }> = [];

    const loop = () => {
      ctx.clearRect(0, 0, w, h);

      if (Object.keys(litItems).length > 0 && Math.random() < 0.3) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 3,
          vy: -Math.random() * 3 - 1,
          size: Math.random() * 2.5 + 1,
          color: ['#fef08a', '#f59e0b', '#ec4899', '#10b981'][Math.floor(Math.random() * 4)],
          alpha: 1
        });
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.015;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => cancelAnimationFrame(animId);
  }, [litItems]);

  const handleLight = (id: string) => {
    try {
      if (typeof (soundEffects as any)?.play === 'function') {
        (soundEffects as any).play('click');
      }
    } catch {
      // safe no-op
    }
    setLitItems((prev) => ({ ...prev, [id]: true }));
  };

  const countLit = Object.keys(litItems).length;
  const isReady = countLit >= 3;

  const handleContinue = () => {
    if (!isReady) return;
    try {
      if (typeof (soundEffects as any)?.play === 'function') {
        (soundEffects as any).play('click');
      }
    } catch {
      // safe no-op
    }
    onNext();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-8 text-center select-none pt-20 pb-32">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8 z-10"
      >
        <h2 className="text-3xl sm:text-5xl font-serif font-black text-amber-50 mb-3 drop-shadow-[0_2px_15px_rgba(251,191,36,0.65)]">
          Light Them Up! 🎆
        </h2>
        <p className="text-amber-200/90 font-serif italic text-base sm:text-lg tracking-wide">
          Tap each firecracker to celebrate Diwali together
        </p>
      </motion.div>

      <div className="grid grid-cols-3 gap-5 sm:gap-6 max-w-md w-full mb-10 z-10">
        {crackers.map((item, idx) => {
          const isLit = litItems[item.id];
          return (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleLight(item.id)}
              className={`relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-3xl cursor-pointer transition-all duration-300 ${
                idx === 4 ? 'col-span-3 w-40 mx-auto' : ''
              } ${
                isLit
                  ? 'bg-gradient-to-b from-amber-500/35 to-purple-900/70 border-2 border-yellow-300 shadow-[0_0_30px_rgba(251,191,36,0.9)] scale-105'
                  : 'bg-white/5 border border-white/15 hover:border-amber-400/50'
              }`}
            >
              <div className="text-4xl sm:text-5xl mb-2 select-none">
                {isLit ? '🔥' : item.icon}
              </div>
              <span className="text-xs sm:text-sm font-semibold text-amber-100 font-serif">
                {item.name}
              </span>
              <AnimatePresence>
                {isLit && (
                  <motion.span
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-yellow-300 absolute -bottom-6 font-bold whitespace-nowrap animate-bounce"
                  >
                    {item.spark}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleContinue}
        disabled={!isReady}
        className={`px-12 py-4 rounded-full font-medium text-lg tracking-wide transition-all z-10 ${
          isReady
            ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-[0_0_35px_rgba(245,158,11,0.7)] scale-105 border border-amber-200/50 cursor-pointer'
            : 'bg-white/10 text-amber-200/50 border border-white/15 cursor-not-allowed'
        }`}
      >
        {isReady ? "You're pure magic! Continue →" : `Ignite ${3 - countLit} more to unlock`}
      </motion.button>
    </div>
  );
});

SceneInteractiveCrackers.displayName = 'SceneInteractiveCrackers';

import React, { useEffect, useRef, useState, memo } from 'react';
import { motion } from 'framer-motion';
import { soundEffects } from '../../services/soundEffects';

interface Props {
  onNext: () => void;
  senderName?: string;
  recipientName?: string;
}

export const SceneGrandThali: React.FC<Props> = memo(({
  onNext,
  senderName = "Rajat",
  recipientName = "Tanisha"
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [diyasLit, setDiyasLit] = useState({ left: true, center: true, right: true });

  // Canvas particle engine for firework sparkles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const sparks: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      decay: number;
    }> = [];

    const colors = ['#fde047', '#f59e0b', '#fbbf24', '#ffffff', '#ea580c'];

    const createBurst = (originX: number, originY: number) => {
      for (let i = 0; i < 20; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.5 + 0.5;
        sparks.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.5,
          size: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: Math.random() * 0.02 + 0.015
        });
      }
    };

    let timer = 0;
    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      timer++;

      if (timer % 60 === 0) {
        createBurst(w / 2 + (Math.random() - 0.5) * 200, h * 0.28 + (Math.random() - 0.5) * 80);
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = s.color;
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const toggleDiya = (key: 'left' | 'center' | 'right') => {
    try {
      soundEffects.play('pop');
    } catch (e) {
      // fallback
    }
    setDiyasLit((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleContinue = () => {
    try {
      soundEffects.play('click');
    } catch (e) {
      // fallback
    }
    onNext();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-8 text-center select-none pt-20 pb-32">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />
      <div className="absolute w-[500px] h-[500px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Decorative Fireworks Sparkle Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative mb-8 z-10"
      >
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-amber-300 text-4xl animate-sparkle-spin">
          ✨
        </div>

        {/* Detailed Pooja Thali Visual with Rings */}
        <div className="relative w-72 h-44 sm:w-80 sm:h-48 flex items-center justify-center">
          <div className="absolute inset-0 bg-orange-600/20 blur-3xl rounded-full" />

          {/* Outer Rotating Lotus Mandala Rim */}
          <div className="absolute w-64 h-32 sm:w-72 sm:h-36 rounded-full border-2 border-amber-400/80 bg-gradient-to-b from-amber-900/60 via-purple-950/80 to-black/80 flex items-center justify-around px-4 shadow-[0_0_35px_rgba(245,158,11,0.55)]">
            {['🌸', '🌼', '🌺', '🌼', '🌸', '🌼', '🌺'].map((flower, i) => (
              <span key={i} className="text-xl drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                {flower}
              </span>
            ))}
          </div>

          {/* Inner Golden Ring */}
          <div className="absolute w-48 h-20 rounded-full border border-dashed border-yellow-200/50" />

          {/* Triple Diyas Array */}
          <div className="relative z-10 flex items-end space-x-6 sm:space-x-8">
            {/* Left Diya */}
            <div
              onClick={() => toggleDiya('left')}
              className="flex flex-col items-center scale-95 cursor-pointer transition-transform hover:scale-110"
            >
              {diyasLit.left && (
                <div className="w-3.5 h-5 bg-gradient-to-t from-orange-500 via-amber-200 to-white rounded-full animate-flame-real shadow-[0_0_18px_#f59e0b]" />
              )}
              <div className="w-8 h-4 bg-gradient-to-b from-amber-700 to-amber-950 rounded-b-full border-t border-amber-500 shadow-md" />
            </div>

            {/* Center Master Diya */}
            <div
              onClick={() => toggleDiya('center')}
              className="flex flex-col items-center scale-140 -mb-2 cursor-pointer transition-transform hover:scale-155"
            >
              {diyasLit.center && (
                <div className="w-4 h-7 bg-gradient-to-t from-orange-500 via-amber-200 to-white rounded-full animate-flame-real shadow-[0_0_28px_#f59e0b]" />
              )}
              <div className="w-10 h-5 bg-gradient-to-b from-amber-600 via-amber-800 to-amber-950 rounded-b-full border-t border-amber-400 shadow-xl" />
            </div>

            {/* Right Diya */}
            <div
              onClick={() => toggleDiya('right')}
              className="flex flex-col items-center scale-95 cursor-pointer transition-transform hover:scale-110"
            >
              {diyasLit.right && (
                <div className="w-3.5 h-5 bg-gradient-to-t from-orange-500 via-amber-200 to-white rounded-full animate-flame-real shadow-[0_0_18px_#f59e0b]" />
              )}
              <div className="w-8 h-4 bg-gradient-to-b from-amber-700 to-amber-950 rounded-b-full border-t border-amber-500 shadow-md" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Spacious Royal Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mb-8 z-10"
      >
        <h1 className="text-4xl sm:text-6xl font-serif font-black tracking-widest gold-gradient-shimmer drop-shadow-[0_2px_20px_rgba(251,191,36,0.65)] mb-3">
          HAPPY DIWALI
        </h1>
        <h3 className="text-2xl sm:text-3xl font-serif text-amber-200/90 italic font-light tracking-wide">
          Dearest {recipientName}!
        </h3>
      </motion.div>

      {/* Flirty Personalized Letter Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="festive-royal-glass rounded-[28px] px-8 py-7 max-w-md w-full mb-8 z-10"
      >
        <p className="text-amber-50 text-lg sm:text-xl font-serif italic leading-relaxed tracking-wide">
          "Save me some sweets, I'm coming for them...<br />
          <span className="font-semibold text-amber-300 block mt-3">— {senderName} 😎✨</span>"
        </p>
        <div className="w-20 h-[1px] bg-amber-400/40 mx-auto my-5" />
        <span className="text-xs sm:text-sm text-amber-300/80 block uppercase tracking-widest font-mono">
          ♪ Sent with love, from miles away
        </span>
      </motion.div>

      {/* Button */}
      <motion.button
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleContinue}
        className="px-12 py-4 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-medium text-lg tracking-wider shadow-[0_0_35px_rgba(245,158,11,0.65)] hover:brightness-110 transition-all border border-amber-300/50 cursor-pointer z-10"
      >
        See What's Next ✨
      </motion.button>
    </div>
  );
});

SceneGrandThali.displayName = 'SceneGrandThali';

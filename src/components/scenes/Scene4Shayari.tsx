import React, { useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';
import { soundEffects } from '../../services/soundEffects';

interface Props {
  onNext: () => void;
  customShayari?: string[];
}

export const Scene4Shayari: React.FC<Props> = memo(({ onNext }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Background Golden Firefly Embers Engine
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

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      alpha: number;
      alphaChange: number;
    }> = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.6,
      speedY: -Math.random() * 0.8 - 0.2,
      alpha: Math.random() * 0.8 + 0.2,
      alphaChange: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1)
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha += p.alphaChange;

        if (p.alpha <= 0.1 || p.alpha >= 0.95) p.alphaChange = -p.alphaChange;
        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(254, 240, 138, ${Math.max(0, p.alpha)})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#f59e0b';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleContinue = () => {
    try {
      soundEffects.play('click');
    } catch (e) {
      // safe fallback
    }
    onNext();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-8 text-center select-none pt-20 pb-32">
      {/* Interactive Golden Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Atmospheric Royal Radial Glow */}
      <div className="absolute w-[500px] h-[500px] bg-purple-700/20 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Premium Luxury Diary Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 35 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="festive-royal-glass rounded-[32px] p-8 sm:p-14 max-w-xl w-full relative z-10 border-2 border-amber-300/40 shadow-[0_0_50px_rgba(245,158,11,0.35)]"
      >
        {/* Floating Diya Icon with Flame */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-4 h-6 bg-gradient-to-t from-orange-500 via-amber-200 to-yellow-100 rounded-full animate-flame-real shadow-[0_0_20px_#f59e0b]" />
          <div className="w-8 h-4 bg-amber-800 rounded-b-full border-t border-amber-500 shadow-md -mt-1" />
        </div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-3xl sm:text-5xl font-serif font-black tracking-widest gold-gradient-shimmer mb-8 drop-shadow-[0_2px_15px_rgba(251,191,36,0.6)]"
        >
          अर्ज़ किया है..! 🪔
        </motion.h2>

        {/* Golden Filigree Divider */}
        <div className="flex items-center justify-center space-x-3 mb-10">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-300 to-amber-500" />
          <span className="text-amber-300 text-sm">✦ ✧ ✦</span>
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent via-amber-300 to-amber-500" />
        </div>

        {/* Clean, Spacious Typography */}
        <div className="space-y-6 sm:space-y-8 font-serif text-amber-50 text-xl sm:text-2xl leading-relaxed tracking-wide">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="drop-shadow-[0_2px_12px_rgba(251,191,36,0.35)]"
          >
            किसी को दिल का दीवाना पसंद है ,
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="drop-shadow-[0_2px_12px_rgba(251,191,36,0.35)]"
          >
            तो किसी को दिल का नजराना पसंद है ,
          </motion.p>

          <div className="w-28 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-6 opacity-60" />

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="drop-shadow-[0_2px_12px_rgba(251,191,36,0.35)]"
          >
            औरों की पसंद का तो पता नहीं ,
          </motion.p>

          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.9, duration: 0.9 }}
            className="font-bold text-amber-300 text-2xl sm:text-3xl drop-shadow-[0_2px_20px_rgba(251,191,36,0.95)] pt-2 leading-snug"
          >
            हमें तो आपका मुस्कुराना पसंद है ..! ✨
          </motion.p>
        </div>

        {/* Ornamental Bottom Bar */}
        <div className="w-36 h-[1px] bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto mt-10 mb-4" />

        <p className="text-xs sm:text-sm text-amber-300/80 font-serif italic tracking-widest uppercase">
          — Straight from my heart to yours
        </p>
      </motion.div>

      {/* Button with Sound Trigger */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.3, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleContinue}
        className="mt-10 px-12 py-4 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-medium text-lg tracking-wider shadow-[0_0_35px_rgba(245,158,11,0.7)] hover:brightness-110 transition-all border border-amber-200/50 cursor-pointer relative z-10"
      >
        Read On →
      </motion.button>
    </div>
  );
});

Scene4Shayari.displayName = 'Scene4Shayari';


import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEffects } from '../../services/soundEffects';

interface Props {
  onNext: () => void;
  recipientName?: string;
}

export const SceneDiyaHeart: React.FC<Props> = memo(({ onNext, recipientName = "Tanisha" }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Mathematical cardioid coordinates for heart curve placement
  const heartDiyas = [
    { id: 1, top: '15%', left: '33%', delay: 0.1 },
    { id: 2, top: '9%', left: '42%', delay: 0.2 },
    { id: 3, top: '15%', left: '50%', delay: 0.3 },
    { id: 4, top: '9%', left: '58%', delay: 0.4 },
    { id: 5, top: '15%', left: '67%', delay: 0.5 },
    { id: 6, top: '28%', left: '23%', delay: 0.6 },
    { id: 7, top: '28%', left: '77%', delay: 0.7 },
    { id: 8, top: '44%', left: '28%', delay: 0.8 },
    { id: 9, top: '44%', left: '72%', delay: 0.9 },
    { id: 10, top: '60%', left: '37%', delay: 1.0 },
    { id: 11, top: '60%', left: '63%', delay: 1.1 },
    { id: 12, top: '75%', left: '50%', delay: 1.2 }
  ];

  const [activeDiyas, setActiveDiyas] = useState<{ [key: number]: boolean }>({
    1: true, 2: true, 3: true, 4: true, 5: true, 6: true,
    7: true, 8: true, 9: true, 10: true, 11: true, 12: true
  });

  // Sparkle Canvas Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const sparks: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = Array.from({ length: 30 }, () => ({
      x: w / 2 + (Math.random() - 0.5) * 260,
      y: h / 2 - 40 + (Math.random() - 0.5) * 260,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: (Math.random() - 0.5) * 0.8,
      opacity: Math.random() * 0.7 + 0.3
    }));

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      sparks.forEach((s) => {
        s.x += s.speedX;
        s.y += s.speedY;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(253, 224, 71, ${s.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#f59e0b';
        ctx.fill();
      });
      animId = requestAnimationFrame(loop);
    };
    loop();

    return () => cancelAnimationFrame(animId);
  }, []);

  const handleDiyaTap = (id: number) => {
    try {
      soundEffects.play('pop');
    } catch (e) {
      // safe fallback
    }
    setActiveDiyas((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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
      {/* Sparkle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Atmospheric Halo */}
      <div className="absolute w-[450px] h-[450px] bg-amber-500/15 blur-[100px] rounded-full pointer-events-none" />

      {/* Heart Arrangement Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative w-80 h-80 sm:w-96 sm:h-96 mb-8 z-10"
      >
        {heartDiyas.map((pos) => {
          const isLit = activeDiyas[pos.id];
          return (
            <motion.div
              key={pos.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: pos.delay, duration: 0.6, type: "spring" }}
              onClick={() => handleDiyaTap(pos.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group"
              style={{ top: pos.top, left: pos.left }}
            >
              <AnimatePresence>
                {isLit && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="w-4 h-6 bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 rounded-[50%_50%_20%_20%] shadow-[0_0_22px_#f59e0b] animate-flame-real group-hover:scale-130 transition-transform"
                  />
                )}
              </AnimatePresence>
              <div className="w-7 h-3.5 bg-gradient-to-b from-amber-700 to-amber-950 rounded-b-full border-t border-amber-500 shadow-lg" />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Heartfelt Letter Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="max-w-md w-full px-6 py-4 mb-8 z-10"
      >
        <h2 className="text-3xl sm:text-5xl font-serif font-black tracking-wide gold-gradient-shimmer mb-4 drop-shadow-[0_2px_15px_rgba(251,191,36,0.6)]">
          {recipientName}... Happy Diwali 🪔
        </h2>
        <div className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6" />
        <p className="text-amber-100/90 text-lg sm:text-xl font-serif italic leading-relaxed tracking-wide">
          "Diwali without you is just noise...<br />
          So I shaped each flame into a heartbeat to say I miss you."
        </p>
      </motion.div>

      {/* Action Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleContinue}
        className="px-12 py-4 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-medium text-lg tracking-wider shadow-[0_0_35px_rgba(245,158,11,0.7)] hover:brightness-110 transition-all border border-amber-200/50 cursor-pointer z-10"
      >
        Light Up My World →
      </motion.button>
    </div>
  );
});

SceneDiyaHeart.displayName = 'SceneDiyaHeart';

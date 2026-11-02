import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';

interface SceneProps {
  onNext: () => void;
}

export const Scene9UnityLoyalty: React.FC<SceneProps> = ({ onNext }) => {
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 800);
    const t2 = setTimeout(() => setStage(2), 3400);
    const t3 = setTimeout(() => setStage(3), 5200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-screen bg-[#070d18] flex flex-col items-center justify-center px-4 sm:px-6 py-12 select-none overflow-hidden">
      {/* Background waters of Sethusamudram */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(10,50,70,0.5)_0%,rgba(7,13,24,1)_85%)] pointer-events-none" />

      {/* Floating Sacred Stones with 'श्री राम' */}
      <div className="relative z-10 w-full max-w-lg mb-8 flex justify-center items-center gap-3 sm:gap-6 flex-wrap">
        {[
          { label: 'श्री राम', delay: 0 },
          { label: 'श्री राम', delay: 0.3 },
          { label: 'श्री राम', delay: 0.6 },
          { label: 'श्री राम', delay: 0.9 },
        ].map((stone, idx) => (
          <motion.div
            key={idx}
            animate={{
              y: [0, -8, 0],
              rotate: [0, idx % 2 === 0 ? 1.5 : -1.5, 0],
            }}
            transition={{
              duration: 3 + idx * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: stone.delay,
            }}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-b from-[#2a3b4c] to-[#141f2a] border border-[#f5b041]/40 shadow-[0_10px_25px_rgba(0,0,0,0.8),0_0_15px_rgba(245,176,65,0.3)] flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
            <span className="font-rozha text-sm sm:text-base text-[#ffe082] tracking-wider font-semibold">
              {stone.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Content Card */}
      <div className="relative z-10 max-w-2xl w-full text-center p-6 sm:p-12 rounded-3xl bg-[#0e1724]/75 backdrop-blur-md border border-[#f59e0b]/30 shadow-[0_0_60px_rgba(0,0,0,0.9)]">
        {/* Stage Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1b2636] border border-[#fbbf24]/30 text-[#fde68a] text-xs font-cinzel tracking-widest uppercase mb-8">
          <Heart className="w-3.5 h-3.5 text-[#f59e0b]" />
          <span>Stage III — Ram Setu: The Bridge of Unity</span>
          <Heart className="w-3.5 h-3.5 text-[#f59e0b]" />
        </div>

        {/* Message 1 */}
        <div className="space-y-6 min-h-[160px] flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
            animate={stage >= 1 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="font-cinzel text-lg sm:text-2xl md:text-3xl text-[#fef3c7] leading-relaxed tracking-wide gold-glow"
          >
            "Great things are rarely achieved alone. Unity turns individual strength into something greater."
          </motion.p>

          {/* Message 2 */}
          <motion.p
            initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
            animate={stage >= 2 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="font-marcellus text-base sm:text-xl text-[#fde68a] leading-relaxed italic"
          >
            "Respect people, value teamwork, and remember that everyone has something meaningful to contribute."
          </motion.p>
        </div>

        {/* Continue Button to Ayodhya Reveal */}
        <div className="mt-10 pt-4 flex justify-center min-h-[50px]">
          {stage >= 3 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="px-7 py-3 rounded-full bg-gradient-to-r from-[#b45309] via-[#d97706] to-[#92400e] text-[#fffbeb] font-cinzel text-xs sm:text-sm font-bold tracking-widest uppercase shadow-[0_0_25px_rgba(245,158,11,0.5)] flex items-center gap-2 cursor-pointer border border-[#fef3c7]/40"
            >
              <span>Approach Grand Ayodhya</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

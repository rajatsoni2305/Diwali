
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';

interface SceneProps { onNext: () => void; }

export const Scene9UnityLoyalty: React.FC<SceneProps> = ({ onNext }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 800),
      setTimeout(() => setStage(2), 3400),
      setTimeout(() => setStage(3), 5200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative isolate flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#10131c] px-4 py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_70%,rgba(35,91,105,.4),transparent_65%)]" />

      {/* Floating bridge stones */}
      <div className="relative z-10 mb-9 flex w-full max-w-lg flex-wrap items-center justify-center gap-3 sm:gap-5">
        {['श्री राम', 'श्री राम', 'श्री राम', 'श्री राम'].map((label, index) => (
          <motion.div
            key={index}
            animate={{ y: [0, -9, 0], rotate: [0, index % 2 ? -2 : 2, 0] }}
            transition={{ duration: 3 + index * .4, repeat: Infinity, ease: 'easeInOut', delay: index * .3 }}
            className="flex items-center gap-2 rounded-2xl border border-[#e9bd70]/40 bg-gradient-to-b from-[#52606a] to-[#18232e] px-4 py-3 shadow-[0_12px_30px_rgba(0,0,0,.5)]"
          >
            <Sparkles className="h-4 w-4 text-[#ffd166]" />
            <span className="font-rozha text-sm font-semibold tracking-wider text-[#ffe6a0] sm:text-base">{label}</span>
          </motion.div>
        ))}
      </div>

      {/* Water and floating bridge */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 overflow-hidden">
        <motion.div
          animate={{ x: [0, -25, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0"
        >
          <svg viewBox="0 0 1200 200" preserveAspectRatio="none" className="h-full w-full">
            <path d="M0 50 Q150 15 300 50 T600 50 T900 50 T1200 50 V200 H0Z" fill="#16415a" />
            <path d="M0 95 Q150 55 300 95 T600 95 T900 95 T1200 95 V200 H0Z" fill="#0b2c43" />
            <path d="M0 140 Q150 105 300 140 T600 140 T900 140 T1200 140 V200 H0Z" fill="#071b2b" />
          </svg>
        </motion.div>
      </div>

      <div className="relative z-10 w-full max-w-2xl rounded-[30px] border border-[#e9bd70]/30 bg-[#111d2a]/85 p-6 text-center shadow-[0_25px_90px_rgba(0,0,0,.55)] backdrop-blur-xl sm:p-12">
        <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#fbbf24]/30 bg-[#273344] px-4 py-2 font-cinzel text-[10px] uppercase tracking-widest text-[#fde68a] sm:text-xs">
          <Heart className="h-4 w-4 text-[#f59e0b]" />
          Stage III — Ram Setu: The Bridge of Unity
          <Heart className="h-4 w-4 text-[#f59e0b]" />
        </div>

        <div className="flex min-h-[190px] flex-col justify-center gap-7">
          <motion.p
            initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
            animate={stage >= 1 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1.5 }}
            className="font-cinzel text-lg leading-relaxed text-[#fef3c7] sm:text-2xl md:text-3xl gold-glow"
          >
            "Great things are rarely achieved alone. Unity turns individual strength into something greater."
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
            animate={stage >= 2 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1.5 }}
            className="font-marcellus text-base italic leading-relaxed text-[#fde68a] sm:text-xl"
          >
            "Respect people, value teamwork, and remember that everyone has something meaningful to contribute."
          </motion.p>
        </div>

        <div className="mt-10 flex min-h-[50px] justify-center">
          {stage >= 3 && (
            <motion.button
              initial={{ opacity: 0, scale: .9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: .95 }}
              onClick={onNext}
              className="flex items-center gap-2 rounded-full border border-[#fef3c7]/40 bg-gradient-to-r from-[#8b4b16] via-[#d58b32] to-[#8b4b16] px-7 py-3 font-cinzel text-xs font-bold uppercase tracking-widest text-[#fff8e8] shadow-[0_0_30px_rgba(245,158,11,.3)] sm:text-sm"
            >
              Approach Grand Ayodhya <ArrowRight className="h-4 w-4" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};


import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Waves } from 'lucide-react';

interface SceneProps { onNext: () => void; }

export const Scene8FaithDevotion: React.FC<SceneProps> = ({ onNext }) => {
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
    <div className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#071323] px-4 py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,#193c60_0%,#0b1b30_45%,#040a16_100%)]" />

      {/* Moon */}
      <motion.div
        className="pointer-events-none absolute right-[12%] top-12 h-24 w-24 rounded-full bg-gradient-to-br from-[#fff9dc] to-[#d8c18a] shadow-[0_0_70px_rgba(255,225,155,.45)] sm:right-[18%] sm:h-36 sm:w-36"
        animate={{ opacity: [0.75, 1, 0.75], scale: [1, 1.04, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Ocean layers */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 overflow-hidden">
        <motion.svg
          viewBox="0 0 1200 240"
          preserveAspectRatio="none"
          className="absolute bottom-0 h-full w-full"
          animate={{ x: [0, -30, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M0 80 Q150 20 300 80 T600 80 T900 80 T1200 80 V240 H0Z" fill="#153d5a" opacity=".8" />
          <path d="M0 120 Q150 65 300 120 T600 120 T900 120 T1200 120 V240 H0Z" fill="#0b2944" />
          <path d="M0 165 Q150 115 300 165 T600 165 T900 165 T1200 165 V240 H0Z" fill="#07192d" />
        </motion.svg>
      </div>

      {/* Hanuman-inspired symbolic silhouette */}
      <div className="pointer-events-none absolute left-[9%] top-[20%] opacity-50 sm:left-[17%]">
        <svg viewBox="0 0 120 140" width="95" fill="none">
          <path d="M56 30 C40 18 24 27 28 44 C31 56 46 58 52 49" stroke="#d9c28d" strokeWidth="5" strokeLinecap="round" />
          <circle cx="60" cy="34" r="12" fill="#d9c28d" />
          <path d="M48 48 L72 48 L83 103 L40 103 Z" fill="#d9c28d" />
          <path d="M43 62 L14 45 M77 62 L106 39" stroke="#d9c28d" strokeWidth="7" strokeLinecap="round" />
          <path d="M48 100 L34 132 M73 100 L87 132" stroke="#d9c28d" strokeWidth="8" strokeLinecap="round" />
          <path d="M73 72 Q104 68 105 93" stroke="#d9c28d" strokeWidth="5" fill="none" />
        </svg>
      </div>

      <div className="relative z-10 mt-16 w-full max-w-2xl rounded-[30px] border border-[#83b8d9]/30 bg-[#091a2c]/85 p-6 text-center shadow-[0_25px_90px_rgba(0,0,0,.55)] backdrop-blur-xl sm:p-12">
        <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#83b8d9]/30 bg-[#112c46] px-4 py-2 font-cinzel text-[10px] uppercase tracking-[.18em] text-[#c2e2f6] sm:text-xs">
          <Waves className="h-4 w-4" />
          Stage II — The Mahasagar of Devotion
          <Waves className="h-4 w-4" />
        </div>

        <div className="flex min-h-[190px] flex-col justify-center gap-7">
          <motion.p
            initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
            animate={stage >= 1 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1.5 }}
            className="font-cinzel text-lg leading-relaxed text-[#e0f2fe] sm:text-2xl md:text-3xl"
          >
            "True devotion is not just about words. It is about loyalty, faith, and the strength to keep going."
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
            animate={stage >= 2 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1.5 }}
            className="font-marcellus text-base italic leading-relaxed text-[#b9dcf1] sm:text-xl"
          >
            "Be sincere in your efforts. Stay loyal to your values, and do not give up when the journey becomes difficult."
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
              className="flex items-center gap-2 rounded-full border border-[#bfdbfe]/40 bg-gradient-to-r from-[#164b72] via-[#347fae] to-[#164b72] px-7 py-3 font-cinzel text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_30px_rgba(59,130,246,.3)] sm:text-sm"
            >
              Bridge the Ocean to Ram Setu <ArrowRight className="h-4 w-4" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

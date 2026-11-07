
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Crown } from 'lucide-react';
import { soundEffects } from '../../services/soundEffects';

interface SceneProps { onNext: () => void; }

const PETALS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 7) % 100}%`,
  delay: (i % 10) * .55,
  duration: 7 + (i % 5),
  drift: (i % 2 ? 1 : -1) * (15 + (i % 4) * 10),
}));

export const Scene11Homecoming: React.FC<SceneProps> = ({ onNext }) => {
  const [textStage, setTextStage] = useState(0);

  useEffect(() => {
    soundEffects.playTempleBell();
    const t1 = setTimeout(() => setTextStage(1), 1000);
    const t2 = setTimeout(() => setTextStage(2), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="relative isolate flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-[#160902] px-4 py-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,#6b3517_0%,#2a1208_48%,#100602_100%)]" />

      {/* Palace columns */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-[75%] justify-between px-1 opacity-45 sm:px-8">
        {[0, 1, 2, 3].map((item) => (
          <div key={item} className="relative h-full w-9 border-x border-[#d4a65c]/40 bg-gradient-to-r from-[#321506] via-[#87502b] to-[#321506] sm:w-16">
            <div className="absolute inset-x-0 top-0 h-4 border-y-2 border-[#e6bd76]/60 bg-[#9b5e2b]" />
            <div className="absolute inset-x-0 bottom-0 h-5 border-y-2 border-[#e6bd76]/60 bg-[#9b5e2b]" />
          </div>
        ))}
      </div>

      {/* Falling marigold petals */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {PETALS.map((petal) => (
          <motion.span
            key={petal.id}
            className="absolute top-[-5%] h-3 w-2 rounded-[70%_30%_70%_30%] bg-gradient-to-br from-[#ffda68] via-[#ff9c25] to-[#c64c13] shadow-[0_0_10px_rgba(255,160,30,.5)]"
            style={{ left: petal.left }}
            animate={{
              y: ['0vh', '110vh'],
              x: [0, petal.drift, 0],
              rotate: [0, 300, 650],
              opacity: [0, .9, .8, 0],
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mt-4 inline-flex items-center gap-3 rounded-full border border-[#d4af37]/40 bg-[#201005]/80 px-4 py-2 font-cinzel text-[10px] uppercase tracking-widest text-[#ffe6a0] sm:text-xs">
        <Crown className="h-4 w-4 text-[#ffb300]" />
        The Return of The Divine King
        <Crown className="h-4 w-4 text-[#ffb300]" />
      </div>

      {/* Divine halo */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[37%] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ffdf91]/30 bg-[#ffb52d]/10 shadow-[0_0_100px_rgba(255,176,45,.25)] sm:h-80 sm:w-80"
        animate={{ scale: [1, 1.06, 1], opacity: [.5, .9, .5] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Symbolic silhouettes */}
      <motion.div
        initial={{ opacity: 0, scale: .9, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 2 }}
        className="relative z-10 my-auto flex items-end justify-center gap-3 px-3 sm:gap-8"
      >
        {/* Lakshman */}
        <div className="flex flex-col items-center opacity-85">
          <svg viewBox="0 0 100 180" className="h-36 w-16 text-[#e8bb62] drop-shadow-[0_0_15px_rgba(255,183,77,.6)] sm:h-44 sm:w-20" fill="currentColor">
            <path d="M50 12L39 29H61Z" />
            <circle cx="50" cy="39" r="10" />
            <path d="M40 52H60L68 132H32Z" />
            <path d="M28 20Q10 80 34 155" stroke="currentColor" strokeWidth="4" fill="none" />
            <path d="M43 130L36 172M58 130L66 172" stroke="currentColor" strokeWidth="8" />
          </svg>
          <span className="mt-1 font-cinzel text-[10px] text-[#ffe6a0]">Lakshman</span>
        </div>

        {/* Shri Ram */}
        <div className="flex scale-110 flex-col items-center">
          <svg viewBox="0 0 120 200" className="h-44 w-24 text-[#fff0ae] drop-shadow-[0_0_24px_rgba(255,215,64,.75)] sm:h-52 sm:w-28" fill="currentColor">
            <path d="M60 5L47 27H73Z" />
            <circle cx="60" cy="40" r="12" />
            <path d="M47 55H73L84 145H36Z" />
            <path d="M30 17Q10 90 37 165" stroke="currentColor" strokeWidth="4" fill="none" />
            <path d="M77 48L87 90L80 105" stroke="#ffb300" strokeWidth="5" fill="none" />
            <path d="M46 145L39 190M70 145L79 190" stroke="currentColor" strokeWidth="9" />
          </svg>
          <span className="mt-1 font-cinzel text-xs font-bold tracking-widest text-[#fff8b5] gold-glow">Shri Ram</span>
        </div>

        {/* Mata Sita */}
        <div className="flex flex-col items-center opacity-90">
          <svg viewBox="0 0 100 180" className="h-36 w-16 text-[#ffe082] drop-shadow-[0_0_14px_rgba(255,183,77,.6)] sm:h-44 sm:w-20" fill="currentColor">
            <path d="M50 16L39 30H61Z" />
            <circle cx="50" cy="39" r="10" />
            <path d="M41 52H59L73 132H27Z" />
            <path d="M63 75Q80 65 83 83" stroke="#ffd166" strokeWidth="3" fill="none" />
            <circle cx="77" cy="75" r="5" fill="#ff9cbd" />
            <path d="M42 130L35 172M58 130L65 172" stroke="currentColor" strokeWidth="8" />
          </svg>
          <span className="mt-1 font-cinzel text-[10px] text-[#ffe6a0]">Mata Sita</span>
        </div>
      </motion.div>

      <div className="relative z-10 mb-5 w-full max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={textStage >= 1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.6 }}
          className="rounded-[28px] border border-[#d4af37]/40 bg-[#140803]/90 p-5 shadow-[0_20px_70px_rgba(0,0,0,.6)] backdrop-blur-xl sm:p-8"
        >
          <p className="mb-6 font-marcellus text-base leading-relaxed text-[#ffecb3] sm:text-xl">
            "After fourteen years... The wait was finally over. Ram, Sita and Lakshman had returned home. And Ayodhya welcomed them with the light of a thousand diyas."
          </p>

          <div className="flex min-h-12 justify-center">
            {textStage >= 2 && (
              <motion.button
                initial={{ opacity: 0, scale: .9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: .95 }}
                onClick={onNext}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#a76a23] via-[#f5bd58] to-[#a76a23] px-7 py-3 font-cinzel text-xs font-bold uppercase tracking-widest text-[#1b0b03] shadow-lg sm:text-sm"
              >
                Approach The Royal Palace Gates
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

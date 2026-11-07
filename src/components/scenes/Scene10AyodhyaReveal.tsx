
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { soundEffects } from '../../services/soundEffects';

interface SceneProps { onNext: () => void; }

export const Scene10AyodhyaReveal: React.FC<SceneProps> = ({ onNext }) => {
  const [showText, setShowText] = useState(false);
  const [canProceed, setCanProceed] = useState(false);

  useEffect(() => {
    soundEffects.playTempleBell();
    const t1 = setTimeout(() => setShowText(true), 1200);
    const t2 = setTimeout(() => setCanProceed(true), 4500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="relative isolate flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-[#170904] px-4 py-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,#78401c_0%,#321707_48%,#100602_100%)]" />

      {/* Grand temple skyline */}
      <motion.div
        initial={{ scale: 1.12, y: 25 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 7, ease: 'easeOut' }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[76%]"
      >
        <svg viewBox="0 0 1000 650" preserveAspectRatio="xMidYMax slice" className="h-full w-full">
          <defs>
            <linearGradient id="ayodhyaStone" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffd982" />
              <stop offset="55%" stopColor="#c77b32" />
              <stop offset="100%" stopColor="#54240c" />
            </linearGradient>
            <linearGradient id="ayodhyaRiver" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d68b3b" stopOpacity=".7" />
              <stop offset="100%" stopColor="#28110a" />
            </linearGradient>
            <filter id="ayodhyaGlow"><feGaussianBlur stdDeviation="5" /></filter>
          </defs>

          <g fill="#48200d" opacity=".8">
            <path d="M0 440V280L65 180L130 280V440Z" />
            <path d="M120 450V240L180 130L240 240V450Z" />
            <path d="M760 440V250L820 145L880 250V440Z" />
            <path d="M870 450V290L935 190L1000 290V450Z" />
          </g>

          <g fill="url(#ayodhyaStone)" stroke="#8b4d1c" strokeWidth="3">
            <path d="M280 560V300H340V230H385V170L420 85L455 170V230H500V300H560V560Z" />
            <path d="M350 300H490V560H350Z" />
            <path d="M310 300Q420 220 530 300" fill="none" stroke="#ffe1a0" strokeWidth="8" />
            <path d="M380 560V420Q420 360 460 420V560Z" fill="#301307" />
            <path d="M80 560V390H150V330H210V390H270V560Z" />
            <path d="M600 560V390H660V330H720V390H790V560Z" />
          </g>

          <g fill="#fff0b0">
            <circle cx="420" cy="80" r="8" />
            <circle cx="180" cy="125" r="6" />
            <circle cx="820" cy="140" r="6" />
          </g>
          <path d="M420 75V30L470 45L420 60" fill="#f08c28" />

          {/* Palace windows */}
          {Array.from({ length: 20 }).map((_, i) => (
            <g key={i}>
              <rect x={100 + (i % 10) * 82} y={405 + Math.floor(i / 10) * 65} width="13" height="25" rx="6" fill="#ffe9a1" />
              <rect x={100 + (i % 10) * 82} y={405 + Math.floor(i / 10) * 65} width="13" height="25" rx="6" fill="#ffb52e" opacity=".5" filter="url(#ayodhyaGlow)" />
            </g>
          ))}

          {/* Ghats and Sarayu */}
          <rect y="560" width="1000" height="22" fill="#65300f" />
          <rect y="582" width="1000" height="20" fill="#49210e" />
          <rect y="602" width="1000" height="48" fill="url(#ayodhyaRiver)" />
          {Array.from({ length: 55 }).map((_, i) => (
            <circle key={i} cx={(i * 47) % 1000} cy={565 + (i % 3) * 10} r="3" fill="#ffe8a0" />
          ))}
        </svg>
      </motion.div>

      {/* Floating lights */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-[#ffd889]"
            style={{ left: `${(i * 41) % 100}%`, top: `${(i * 29) % 70}%` }}
            animate={{ y: [0, -18, 0], opacity: [.2, .9, .2] }}
            transition={{ duration: 3 + (i % 4), delay: i * .15, repeat: Infinity }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="relative z-10 mt-4 text-center"
      >
        <span className="mb-2 block font-cinzel text-[10px] uppercase tracking-[.35em] text-[#ffc978] sm:text-sm">
          Stage IV — The Sacred Capital
        </span>
        <h1 className="font-cinzel-dec text-3xl tracking-wider text-[#fff0b5] gold-glow-lg sm:text-5xl">
          GRAND AYODHYA
        </h1>
      </motion.div>

      <div className="relative z-10 mb-4 w-full max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showText ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.8 }}
          className="rounded-[28px] border border-[#d4af37]/40 bg-[#180a03]/85 p-5 shadow-[0_20px_70px_rgba(0,0,0,.55)] backdrop-blur-xl sm:p-8"
        >
          <p className="font-marcellus text-base leading-relaxed text-[#ffecb3] sm:text-xl">
            Before your eyes rises the golden city of Ayodhya. Along the gentle waters of Sarayu, countless thousands of earthen lamps glow in divine splendor.
          </p>

          <div className="mt-6 flex min-h-12 justify-center">
            {canProceed && (
              <motion.button
                initial={{ opacity: 0, scale: .9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: .95 }}
                onClick={onNext}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#a66a24] via-[#f5c05c] to-[#a66a24] px-7 py-3 font-cinzel text-xs font-bold uppercase tracking-widest text-[#1a0b03] shadow-lg"
              >
                <Sparkles className="h-4 w-4" />
                Witness The Homecoming
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

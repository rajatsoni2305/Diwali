import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Crown } from 'lucide-react';
import { soundEffects } from '../../services/soundEffects';

interface SceneProps {
  onNext: () => void;
}

export const Scene11Homecoming: React.FC<SceneProps> = ({ onNext }) => {
  const [textStage, setTextStage] = useState(0);

  useEffect(() => {
    soundEffects.playTempleBell();
    const t1 = setTimeout(() => setTextStage(1), 1000);
    const t2 = setTimeout(() => setTextStage(2), 3500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-screen bg-[#0c0602] flex flex-col items-center justify-between px-4 py-8 select-none overflow-hidden">
      {/* Golden Radiance Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(180,100,20,0.35)_0%,rgba(12,6,2,1)_85%)] pointer-events-none" />

      {/* Floating Marigold Flower Petals Falling */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 28 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              y: -40,
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800),
              rotate: 0,
              opacity: 0.8,
            }}
            animate={{
              y: (typeof window !== 'undefined' ? window.innerHeight : 900) + 40,
              x: `+=${(Math.random() - 0.5) * 80}`,
              rotate: 360,
              opacity: [0.8, 1, 0.2],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
            className="absolute w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-[#ff6f00] via-[#ffb300] to-[#ffd54f] shadow-[0_0_8px_#ff9800]"
          />
        ))}
      </div>

      {/* Top Royal Emblem */}
      <div className="relative z-10 flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#201005]/80 border border-[#d4af37]/40 text-[#ffe082] text-xs font-cinzel tracking-widest uppercase mt-4">
        <Crown className="w-3.5 h-3.5 text-[#ffb300]" />
        <span>The Return of The Divine King</span>
        <Crown className="w-3.5 h-3.5 text-[#ffb300]" />
      </div>

      {/* Central Majestic Silhouette: Ram, Sita, Lakshman */}
      <div className="relative z-10 my-auto flex flex-col items-center">
        {/* Divine Halo */}
        <div className="absolute -top-12 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-t from-[#ff8f00]/40 via-[#ffe082]/30 to-transparent blur-3xl pointer-events-none animate-pulse" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="relative flex items-end justify-center gap-4 sm:gap-8 px-6 py-4"
        >
          {/* Lakshman (Left) with Bow */}
          <div className="flex flex-col items-center opacity-85">
            <svg viewBox="0 0 100 180" className="w-20 sm:w-24 h-36 sm:h-44 text-[#ffd54f] filter drop-shadow-[0_0_12px_rgba(255,183,77,0.7)]" fill="currentColor">
              {/* Mukut / Crown */}
              <polygon points="50,15 44,28 56,28" />
              {/* Head */}
              <circle cx="50" cy="35" r="9" />
              {/* Torso & Robes */}
              <path d="M42,46 L58,46 L64,120 L36,120 Z" />
              {/* Bow on shoulder */}
              <path d="M30,25 Q20,80 34,140" stroke="#ffd54f" strokeWidth="3" fill="none" />
              <line x1="30" y1="25" x2="34" y2="140" stroke="#ffb300" strokeWidth="1" />
            </svg>
            <span className="font-cinzel text-[11px] text-[#ffe082] tracking-wider mt-1">Lakshman</span>
          </div>

          {/* Shri Ram (Center) with Kodanda & Crown */}
          <div className="flex flex-col items-center scale-110">
            <svg viewBox="0 0 120 200" className="w-28 sm:w-32 h-44 sm:h-52 text-[#fff3b0] filter drop-shadow-[0_0_20px_rgba(255,215,64,0.9)]" fill="currentColor">
              {/* Royal Divine Mukut with Kalash feather */}
              <polygon points="60,8 50,26 70,26" />
              <line x1="60" y1="8" x2="60" y2="2" stroke="#fff8e1" strokeWidth="2" />
              <circle cx="60" cy="35" r="11" />
              {/* Royal Angavastra & Armor */}
              <path d="M48,48 L72,48 L80,140 L40,140 Z" />
              {/* Great Kodanda Bow */}
              <path d="M30,15 Q14,85 36,160" stroke="#fff3b0" strokeWidth="4" fill="none" />
              <line x1="30" y1="15" x2="36" y2="160" stroke="#ffd54f" strokeWidth="1.5" />
              {/* Quiver of arrows on back */}
              <rect x="74" y="35" width="8" height="50" rx="3" fill="#ffb300" />
            </svg>
            <span className="font-cinzel text-xs text-[#fff8b5] font-bold tracking-widest mt-1 gold-glow">
              Shri Ram
            </span>
          </div>

          {/* Mata Sita (Right) with Lotus Grace */}
          <div className="flex flex-col items-center opacity-90">
            <svg viewBox="0 0 100 180" className="w-20 sm:w-24 h-36 sm:h-44 text-[#ffe082] filter drop-shadow-[0_0_12px_rgba(255,183,77,0.7)]" fill="currentColor">
              {/* Elegant Crown & Maang Tikka */}
              <polygon points="50,18 45,28 55,28" />
              <circle cx="50" cy="35" r="8.5" />
              {/* Flowing Traditional Saree Dupatta */}
              <path d="M44,46 L56,46 L68,125 L32,125 Z" />
              {/* Golden Lotus in hand */}
              <circle cx="66" cy="72" r="5" fill="#ff4081" />
              <path d="M66,72 Q68,60 74,68" stroke="#ffd54f" strokeWidth="1.5" fill="none" />
            </svg>
            <span className="font-cinzel text-[11px] text-[#ffe082] tracking-wider mt-1">Mata Sita</span>
          </div>
        </motion.div>
      </div>

      {/* Story Reveal Box */}
      <div className="relative z-10 max-w-2xl w-full text-center mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={textStage >= 1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.6 }}
          className="p-5 sm:p-8 rounded-3xl bg-[#140803]/85 backdrop-blur-md border border-[#d4af37]/40 shadow-[0_0_50px_rgba(0,0,0,0.9)]"
        >
          <p className="font-marcellus text-base sm:text-xl text-[#ffecb3] leading-relaxed mb-6">
            "After fourteen years... The wait was finally over. Ram, Sita and Lakshman had returned home. And Ayodhya welcomed them with the light of a thousand diyas."
          </p>

          <div className="flex justify-center min-h-[48px]">
            {textStage >= 2 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-[#b37d2a] via-[#f5b041] to-[#b37d2a] text-[#0d0702] font-cinzel text-xs sm:text-sm font-bold tracking-[0.2em] uppercase box-gold-glow-active transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Approach The Royal Palace Gates</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

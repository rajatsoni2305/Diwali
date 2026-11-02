import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { soundEffects } from '../../services/soundEffects';

interface SceneProps {
  onNext: () => void;
}

export const Scene10AyodhyaReveal: React.FC<SceneProps> = ({ onNext }) => {
  const [showText, setShowText] = useState(false);
  const [canProceed, setCanProceed] = useState(false);

  useEffect(() => {
    soundEffects.playTempleBell();

    const t1 = setTimeout(() => setShowText(true), 1200);
    const t2 = setTimeout(() => setCanProceed(true), 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-screen bg-[#0d0703] flex flex-col items-center justify-between px-4 py-8 select-none overflow-hidden">
      {/* Golden Dusk Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#180905] via-[#3d1808] to-[#120602] pointer-events-none" />

      {/* Atmospheric Saffron & Gold Celestial Glow */}
      <div className="absolute top-0 inset-x-0 h-[60vh] bg-[radial-gradient(ellipse_at_top,rgba(255,160,40,0.35)_0%,rgba(0,0,0,0)_80%)] pointer-events-none" />

      {/* Grand Ayodhya Panorama Illustrated Canvas / Vector Architecture */}
      <motion.div
        initial={{ scale: 1.15, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 7, ease: 'easeOut' }}
        className="absolute inset-0 w-full h-full pointer-events-none flex items-end justify-center"
      >
        <svg
          viewBox="0 0 1440 800"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="templeGold" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffd54f" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#ff8f00" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#3e1a06" stopOpacity="0.98" />
            </linearGradient>
            <linearGradient id="sarayuGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#381c0b" />
              <stop offset="50%" stopColor="#ffb300" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#1a0b03" />
            </linearGradient>
            <filter id="cityGlow">
              <feGaussianBlur stdDeviation="4" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Distant Temple Shikhars Silhouette */}
          <g fill="#2a1005" opacity="0.6">
            <path d="M 100 500 L 140 280 L 180 500 Z" />
            <path d="M 300 530 L 350 210 L 400 530 Z" />
            <path d="M 520 490 L 560 300 L 600 490 Z" />
            <path d="M 750 510 L 820 180 L 890 510 Z" />
            <path d="M 1020 520 L 1070 260 L 1120 520 Z" />
            <path d="M 1250 500 L 1300 240 L 1350 500 Z" />
          </g>

          {/* Main Grand Ayodhya Palaces & Royal Arches */}
          <g fill="url(#templeGold)" filter="url(#cityGlow)">
            {/* Left Wing Palaces */}
            <path d="M 0 650 L 0 450 L 60 450 L 60 410 L 90 340 L 120 410 L 120 450 L 220 450 L 220 380 Q 250 330 280 380 L 280 450 L 340 450 L 340 650 Z" />
            {/* Left Kalash and Dome */}
            <circle cx="250" cy="325" r="7" fill="#ffe082" />
            <line x1="250" y1="318" x2="250" y2="305" stroke="#ffe082" strokeWidth="2" />

            {/* Central Grand Ram Mandir Spire */}
            <path d="M 580 650 L 580 440 L 620 440 L 650 350 L 680 250 L 710 160 L 720 120 L 730 160 L 760 250 L 790 350 L 820 440 L 860 440 L 860 650 Z" />
            {/* Grand Kalash & Sacred Dhwaja (Flag) */}
            <circle cx="720" cy="115" r="9" fill="#fff8b5" />
            <line x1="720" y1="106" x2="720" y2="70" stroke="#fff8b5" strokeWidth="3" />
            <path d="M 720 70 L 765 85 L 720 100 Z" fill="#ff6f00" />

            {/* Right Wing Royal Palaces & Jharokhas */}
            <path d="M 960 650 L 960 430 L 1000 430 L 1040 330 L 1080 430 L 1180 430 Q 1220 350 1260 430 L 1340 430 L 1340 650 Z" />
            <circle cx="1220" cy="345" r="7" fill="#ffe082" />
          </g>

          {/* Palace Arches & Pillars Details */}
          <g fill="#1a0b03" opacity="0.8">
            <path d="M 230 450 Q 250 410 270 450 Z" />
            <path d="M 690 420 Q 720 370 750 420 Z" />
            <path d="M 680 500 Q 720 450 760 500 Z" />
            <path d="M 1200 450 Q 1220 410 1240 450 Z" />
          </g>

          {/* Stepped Ghats down to Sarayu */}
          <g fill="#361706">
            <rect x="0" y="650" width="1440" height="15" />
            <rect x="0" y="665" width="1440" height="20" fill="#2d1204" />
            <rect x="0" y="685" width="1440" height="25" fill="#240e03" />
            <rect x="0" y="710" width="1440" height="90" fill="url(#sarayuGrad)" />
          </g>

          {/* Thousands of Glowing Diyas along Ghats & Sarayu river */}
          {Array.from({ length: 65 }).map((_, i) => {
            const x = (i * 22) % 1440 + 10;
            const y = 645 + ((i * 7) % 55);
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="3" fill="#ffe57f" />
                <circle cx={x} cy={y} r="8" fill="#ff9800" opacity="0.4" />
              </g>
            );
          })}
        </svg>
      </motion.div>

      {/* Top Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="relative z-10 text-center max-w-xl mt-4"
      >
        <span className="font-cinzel text-xs sm:text-sm tracking-[0.3em] uppercase text-[#ffc107] block mb-1">
          Stage IV — The Sacred Capital
        </span>
        <h1 className="font-cinzel-dec text-2xl sm:text-4xl text-[#fff3b0] gold-glow tracking-wider">
          GRAND AYODHYA
        </h1>
      </motion.div>

      {/* Bottom Poetic Card & Continue */}
      <div className="relative z-10 w-full max-w-2xl text-center mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showText ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.8 }}
          className="p-5 sm:p-8 rounded-3xl bg-[#120703]/85 backdrop-blur-md border border-[#d4af37]/40 shadow-[0_0_50px_rgba(0,0,0,0.9)]"
        >
          <p className="font-marcellus text-base sm:text-xl text-[#ffecb3] leading-relaxed mb-4">
            Before your eyes rises the golden city of Ayodhya. Along the gentle waters of Sarayu, countless thousands of earthen lamps glow in divine splendor.
          </p>

          <div className="flex justify-center pt-2">
            {canProceed && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-[#b37d2a] via-[#f5b041] to-[#b37d2a] text-[#0d0702] font-cinzel text-xs sm:text-sm font-bold tracking-[0.2em] uppercase box-gold-glow-active transition-all cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Witness The Homecoming</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

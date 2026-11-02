import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { soundEffects } from '../../services/soundEffects';

interface SceneProps {
  onNext: () => void;
}

const DIYA_BLESSINGS = [
  'Inner Peace',
  'Radiant Joy',
  'Gentle Courage',
  'Endless Laughter',
  'Deep Wisdom',
  'Steadfast Hope',
  'Good Health',
  'True Friendship',
  'Golden Light',
  'Unconditional Love',
  'Resilience',
  'Quiet Serenity',
  'Abundant Happiness',
  'Grace & Blessing',
];

export const Scene14DiyaChallenge: React.FC<SceneProps> = ({ onNext }) => {
  // Session storage persistence key
  const STORAGE_KEY = 'tanisha_diwali_lit_diyas_v1';

  const [litDiyas, setLitDiyas] = useState<boolean[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = sessionStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length === 14) {
            return parsed;
          }
        }
      } catch {
        // fallback
      }
    }
    return new Array(14).fill(false);
  });

  const [showContinueButton, setShowContinueButton] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [recentBlessing, setRecentBlessing] = useState<string | null>(null);

  const litCount = litDiyas.filter(Boolean).length;
  const allLit = litCount === 14;

  // Persist to session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(litDiyas));
      } catch {
        // ignore
      }
    }
  }, [litDiyas]);

  // When all 14 diyas are lit, wait 2.5 seconds, then reveal the Continue button
  useEffect(() => {
    if (allLit) {
      soundEffects.playTempleBell();
      const timer = setTimeout(() => {
        setShowContinueButton(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [allLit]);

  const handleLightDiya = (index: number) => {
    if (litDiyas[index]) return; // already lit

    const newLit = [...litDiyas];
    newLit[index] = true;
    setLitDiyas(newLit);

    // Audio chime with rising harmonic pitch
    const pitch = 0.85 + (index / 14) * 0.7;
    soundEffects.playDiyaIgnite(pitch);

    setRecentBlessing(DIYA_BLESSINGS[index]);
  };

  const handleContinue = () => {
    if (isTransitioning) return; // prevent duplicate clicks
    setIsTransitioning(true);
    onNext();
  };

  return (
    <div className="relative w-full h-full min-h-screen bg-[#090502] flex flex-col items-center justify-between px-3 sm:px-6 py-6 sm:py-8 select-none overflow-x-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(80,45,15,0.45)_0%,rgba(9,5,2,1)_85%)] pointer-events-none" />

      {/* Header & Counter */}
      <div className="relative z-10 text-center max-w-xl w-full pt-2">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#1c0f05]/90 border border-[#d4af37]/40 text-[#f5b041] text-xs font-cinzel tracking-widest uppercase mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Sacred Fourteen</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <h2 className="font-cinzel text-xl sm:text-3xl text-[#ffe57f] gold-glow tracking-wider font-semibold">
          THE FOURTEEN DIYA CHALLENGE
        </h2>
        <p className="font-marcellus text-xs sm:text-sm text-[#d4c09d] mt-1">
          Tap each clay diya to kindle its sacred flame and release its blessing.
        </p>

        {/* Counter Badge */}
        <div className="mt-3 flex items-center justify-center gap-3">
          <div className="px-5 py-1.5 rounded-full bg-[#180e06] border border-[#f5b041]/50 shadow-md flex items-center gap-2">
            <span className="font-cinzel text-xs text-[#a38755] uppercase tracking-wider">Lamps Kindled:</span>
            <span className={`font-cinzel text-base font-bold ${allLit ? 'text-[#ffdd80] gold-glow' : 'text-[#f5b041]'}`}>
              {litCount} / 14
            </span>
            {allLit && <CheckCircle2 className="w-4 h-4 text-[#ffd700]" />}
          </div>
        </div>

        {/* Recent Blessing Banner */}
        <div className="h-6 mt-2 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {recentBlessing && (
              <motion.span
                key={recentBlessing}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="font-kalam text-xs sm:text-sm text-[#ffe082] tracking-wide"
              >
                Kindled for: {recentBlessing} ✨
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* The 14 Diyas Grid / Sacred Formation */}
      <div className="relative z-10 w-full max-w-3xl my-auto py-4">
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 sm:gap-4 justify-items-center">
          {litDiyas.map((isLit, idx) => {
            const blessing = DIYA_BLESSINGS[idx];

            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => handleLightDiya(idx)}
                className={`group relative flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl cursor-pointer transition-all duration-300 w-full max-w-[85px] sm:max-w-[95px] ${
                  isLit
                    ? 'bg-[#221206]/85 border border-[#ffd54f]/60 shadow-[0_0_20px_rgba(255,183,77,0.35)]'
                    : 'bg-[#140b04]/60 border border-[#6d4c1b]/40 hover:border-[#b37d2a] hover:bg-[#1f1107]'
                }`}
              >
                {/* Number Indicator badge */}
                <span className="absolute top-1 left-2 font-cinzel text-[9px] text-[#a88a50] opacity-80">
                  #{idx + 1}
                </span>

                {/* Flame or Unlit Wick */}
                <div className="relative h-12 flex items-center justify-center">
                  {isLit ? (
                    <div className="relative flex flex-col items-center">
                      {/* Flame Halo */}
                      <div className="absolute w-12 h-12 rounded-full bg-[#ff9800]/30 blur-md pointer-events-none" />
                      {/* Teardrop flame */}
                      <div className="w-5 h-9 bg-gradient-to-t from-[#e65100] via-[#ffb300] to-[#fffde7] rounded-full blur-[0.5px] shadow-[0_0_15px_#ff9800] animate-diya-flame" />
                      <div className="absolute w-1.5 h-3 bottom-0 bg-white rounded-full opacity-90" />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center opacity-60 group-hover:opacity-100 transition-opacity">
                      {/* Unlit wick */}
                      <div className="w-0.5 h-4 bg-[#2b180d] rounded-t" />
                      <div className="w-2 h-2 rounded-full bg-[#4a2e16] -mt-1 group-hover:bg-[#ffb300] transition-colors" />
                    </div>
                  )}
                </div>

                {/* Clay Diya Base */}
                <div className="relative -mt-1.5 w-12 sm:w-14 h-5 bg-gradient-to-r from-[#53260e] via-[#853b16] to-[#421d09] rounded-b-full border-t border-[#c67d38]/60 shadow-md">
                  <div className="absolute top-0 inset-x-1.5 h-0.5 bg-[#2a1105] rounded-full opacity-80" />
                </div>

                {/* Diya Blessing Label */}
                <span
                  className={`mt-2 font-marcellus text-[10px] sm:text-[11px] text-center leading-tight transition-colors line-clamp-1 ${
                    isLit ? 'text-[#ffdd80] font-medium' : 'text-[#8c7450]'
                  }`}
                >
                  {blessing}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: Continue Button */}
      <div className="relative z-10 w-full max-w-md pb-4 min-h-[70px] flex items-center justify-center">
        {showContinueButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.88, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isTransitioning}
            onClick={handleContinue}
            className={`px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#b37d2a] via-[#f5b041] to-[#b37d2a] text-[#0d0702] font-cinzel text-xs sm:text-sm font-bold tracking-[0.2em] uppercase box-gold-glow-active transition-all flex items-center gap-3 border border-[#fff2b2] cursor-pointer ${
              isTransitioning ? 'opacity-60 cursor-not-allowed' : 'animate-bounce'
            }`}
          >
            <span>Continue Your Journey →</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        )}

        {!allLit && (
          <p className="text-[11px] text-[#8c7247] font-marcellus tracking-wider text-center">
            Kindle all fourteen diyas to unlock the path ahead
          </p>
        )}
      </div>
    </div>
  );
};

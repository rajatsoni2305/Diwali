import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { soundEffects } from '../../services/soundEffects';

interface Props {
  onNext: () => void;
}

export const SceneSurpriseReveal: React.FC<Props> = memo(({ onNext }) => {
  const handleContinue = () => {
    try {
      if (typeof (soundEffects as any)?.play === 'function') {
        (soundEffects as any).play('click');
      }
    } catch {
      // safe no-op
    }
    onNext();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-8 text-center select-none pt-20 pb-32">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative w-80 h-64 mb-8 flex flex-col items-center justify-center z-10"
      >
        <div className="absolute inset-0 bg-amber-500/25 blur-3xl rounded-full" />

        <div className="flex space-x-10 mb-4">
          <div className="w-3.5 h-5 bg-yellow-200 rounded-full animate-flame-real" />
          <div className="w-3.5 h-5 bg-yellow-200 rounded-full animate-flame-real" />
        </div>

        <div className="relative z-10 flex flex-col items-center scale-160 mb-5">
          <div className="w-4 h-7 bg-gradient-to-t from-orange-500 via-yellow-200 to-white rounded-full animate-flame-real shadow-[0_0_30px_#f59e0b]" />
          <div className="w-10 h-5 bg-gradient-to-b from-amber-700 to-amber-950 rounded-b-full border-t border-amber-400 shadow-xl" />
        </div>

        <div className="flex space-x-12">
          <div className="w-4 h-5 bg-yellow-200 rounded-full animate-flame-real" />
          <div className="w-4 h-5 bg-yellow-200 rounded-full animate-flame-real" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="max-w-md w-full px-6 mb-8 z-10"
      >
        <h2 className="text-3xl sm:text-5xl font-serif font-black text-amber-50 mb-3 drop-shadow-[0_2px_15px_rgba(251,191,36,0.6)]">
          Let's light up Diwali together ✨
        </h2>
        <div className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-4" />
        <p className="text-amber-200/90 font-serif italic text-lg sm:text-xl leading-relaxed">
          "No matter the distance, under the same glowing sky, my heart is right next to yours."
        </p>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleContinue}
        className="px-12 py-4 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-medium text-lg tracking-wide shadow-[0_0_35px_rgba(245,158,11,0.65)] hover:brightness-110 transition-all border border-amber-300/50 cursor-pointer z-10"
      >
        Open Our Memories 📖
      </motion.button>
    </div>
  );
});

SceneSurpriseReveal.displayName = 'SceneSurpriseReveal';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { soundEffects } from '../../services/soundEffects';

interface Props {
  onNext: () => void;
}

export const SceneHangingLanterns: React.FC<Props> = memo(({ onNext }) => {
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
      <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center mb-8">
        <div className="absolute inset-0 rounded-full border border-amber-400/25 animate-sacred-aura" />
        <div className="absolute inset-8 rounded-full border border-amber-400/35" />
        <div className="absolute inset-16 rounded-full bg-amber-500/15 blur-2xl" />

        <div className="relative z-10 flex space-x-10 items-start animate-garland-swing">
          <motion.div
            drag="x"
            dragConstraints={{ left: -20, right: 20 }}
            className="flex flex-col items-center cursor-grab active:cursor-grabbing"
          >
            <div className="w-[1.5px] h-14 bg-gradient-to-b from-amber-200/80 to-amber-500" />
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-b from-orange-500 via-rose-600 to-purple-900 border-2 border-amber-300 shadow-[0_0_35px_#ea580c] flex items-center justify-center relative overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-yellow-100 blur-[3px] animate-pulse" />
              <div className="absolute inset-0 border-t-2 border-b-2 border-amber-300/40" />
            </div>
            <div className="flex space-x-1 mt-1">
              <div className="w-0.5 h-8 bg-amber-400" />
              <div className="w-0.5 h-12 bg-yellow-300" />
              <div className="w-0.5 h-8 bg-amber-400" />
            </div>
          </motion.div>

          <motion.div
            drag="x"
            dragConstraints={{ left: -20, right: 20 }}
            className="flex flex-col items-center mt-6 cursor-grab active:cursor-grabbing"
          >
            <div className="w-[1.5px] h-10 bg-gradient-to-b from-amber-200/80 to-amber-500" />
            <div className="w-16 h-24 sm:w-18 sm:h-28 bg-gradient-to-b from-amber-400 via-orange-500 to-red-700 rounded-xl border-2 border-yellow-200 shadow-[0_0_35px_#f59e0b] p-2 flex flex-col justify-between items-center">
              <div className="w-full h-1.5 bg-amber-950/70 rounded" />
              <div className="w-6 h-10 rounded bg-yellow-100 blur-[2px] animate-flame-real" />
              <div className="w-full h-1.5 bg-amber-950/70 rounded" />
            </div>
            <div className="flex space-x-1.5 -mt-1">
              <div className="w-1 h-10 bg-yellow-300 rounded-full" />
              <div className="w-1 h-14 bg-yellow-400 rounded-full" />
              <div className="w-1 h-10 bg-yellow-300 rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="max-w-lg w-full px-6 mb-8 z-10"
      >
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-amber-50 mb-4 drop-shadow-[0_2px_15px_rgba(251,191,36,0.55)]">
          Same chaos, different cities
        </h2>
        <div className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-4" />
        <p className="text-amber-200/90 font-serif italic text-lg sm:text-xl leading-relaxed">
          "Distance only measures the space between two cities,<br />never the closeness between two hearts."
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleContinue}
        className="px-12 py-4 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-medium text-lg tracking-wide shadow-[0_0_35px_rgba(245,158,11,0.65)] hover:brightness-110 transition-all border border-amber-300/50 cursor-pointer z-10"
      >
        Bridging the Distance →
      </motion.button>
    </div>
  );
});

SceneHangingLanterns.displayName = 'SceneHangingLanterns';

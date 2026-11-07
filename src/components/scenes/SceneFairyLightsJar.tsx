import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { soundEffects } from '../../services/soundEffects';

interface Props {
  onNext: () => void;
}

export const SceneFairyLightsJar: React.FC<Props> = memo(({ onNext }) => {
  const handleContinue = () => {
    try {
      soundEffects.play('click');
    } catch (e) {
      // fallback
    }
    onNext();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-8 text-center select-none pt-20 pb-32">
      <div className="absolute w-[450px] h-[450px] bg-amber-500/15 blur-[120px] rounded-full pointer-events-none" />

      {/* Mason Jar Visual Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative w-56 h-80 mx-auto mb-8 flex flex-col items-center animate-floating-hero z-10"
      >
        {/* Flower Garland on Lid */}
        <div className="relative z-20 flex items-center justify-center -mb-2">
          <div className="w-8 h-8 rounded-full bg-rose-600 shadow-[0_0_12px_#f43f5e]" />
          <div className="w-10 h-10 rounded-full bg-amber-500 shadow-[0_0_14px_#f59e0b] -ml-2" />
          <div className="w-8 h-8 rounded-full bg-orange-500 shadow-[0_0_12px_#f97316] -ml-2" />
        </div>
        <div className="w-32 h-6 bg-gradient-to-r from-amber-700 via-amber-800 to-amber-950 rounded-md z-10 border border-amber-300/60 shadow-lg" />

        {/* Vintage Glass Body with Lights */}
        <div className="relative w-44 h-64 border-2 border-yellow-200/60 rounded-3xl bg-gradient-to-b from-yellow-300/15 via-amber-500/25 to-yellow-200/10 backdrop-blur-md shadow-[0_0_45px_rgba(251,191,36,0.7)] overflow-hidden flex items-center justify-center">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2.5 h-2.5 rounded-full bg-yellow-100 animate-ping"
              style={{
                top: `${10 + (i * 17) % 78}%`,
                left: `${10 + (i * 29) % 78}%`,
                animationDuration: `${1.1 + (i % 4) * 0.4}s`,
                boxShadow: '0 0 12px 3px #fef08a'
              }}
            />
          ))}
          <div className="w-24 h-40 rounded-full bg-yellow-400/40 blur-2xl" />
        </div>
      </motion.div>

      {/* Typography */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="max-w-md w-full px-6 mb-8 z-10"
      >
        <h2 className="text-3xl sm:text-5xl font-serif font-black text-amber-50 mb-3 drop-shadow-[0_2px_15px_rgba(251,191,36,0.55)]">
          Remember our celebrations?
        </h2>
        <div className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-4" />
        <p className="text-amber-200/90 font-serif italic text-lg sm:text-xl leading-relaxed">
          "Every glowing thread inside this jar holds a memory of your laughter and every moment we've shared..."
        </p>
      </motion.div>

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleContinue}
        className="px-12 py-4 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-medium text-lg tracking-wide shadow-[0_0_35px_rgba(245,158,11,0.65)] hover:brightness-110 transition-all border border-amber-300/50 cursor-pointer z-10"
      >
        Cherish The Moments →
      </motion.button>
    </div>
  );
});

SceneFairyLightsJar.displayName = 'SceneFairyLightsJar';


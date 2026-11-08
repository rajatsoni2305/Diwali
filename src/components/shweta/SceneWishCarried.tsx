import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { LanternsCanvas } from './LanternsCanvas';
import { ArrowRight, Sparkles } from 'lucide-react';

interface SceneWishCarriedProps {
  onContinueToPoem: () => void;
}

export const SceneWishCarried: React.FC<SceneWishCarriedProps> = ({
  onContinueToPoem,
}) => {
  const [showNextButton, setShowNextButton] = useState<boolean>(false);

  useEffect(() => {
    const btnTimer = setTimeout(() => {
      setShowNextButton(true);
    }, 4500);

    return () => {
      clearTimeout(btnTimer);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between p-6 overflow-hidden bg-[#040207]">
      <LanternsCanvas mode="thousand_lights" />

      <div className="relative z-20 pt-16 text-center max-w-lg mx-auto pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/60 border border-amber-400/30 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-amber-200">
              Wish Ascending
            </span>
          </div>

          <h2 className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-gold-bright tracking-wide drop-shadow-[0_4px_20px_rgba(245,158,11,0.5)]">
            A little wish, carried by a thousand lights...
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.2 }}
            className="text-sm sm:text-base text-amber-100/80 font-sans font-light tracking-wide italic"
          >
            May your wish find its way to something beautiful.
          </motion.p>
        </motion.div>
      </div>

      <div className="relative z-20 pb-10 flex flex-col items-center">
        {showNextButton && (
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            onClick={onContinueToPoem}
            type="button"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-100 text-xs sm:text-sm font-sans tracking-wide backdrop-blur-md shadow-[0_0_25px_rgba(245,158,11,0.25)] transition-all"
          >
            <span>A Little Memory for You</span>
            <ArrowRight className="w-4 h-4 text-amber-300" />
          </motion.button>
        )}
      </div>
    </div>
  );
};

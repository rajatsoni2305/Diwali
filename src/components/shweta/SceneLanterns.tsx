import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LanternsCanvas } from './LanternsCanvas';
import { Sparkles } from 'lucide-react';

interface SceneLanternsProps {
  onOpenSurprise: () => void;
}

export const SceneLanterns: React.FC<SceneLanternsProps> = ({ onOpenSurprise }) => {
  const [lanternReady, setLanternReady] = useState<boolean>(false);
  const [isBursting, setIsBursting] = useState<boolean>(false);

  const handleLanternTap = () => {
    if (isBursting) return;
    setIsBursting(true);
    setTimeout(() => {
      onOpenSurprise();
    }, 700);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#050308]">
      {/* Lanterns canvas rendering background rising lanterns and central special lantern */}
      <LanternsCanvas
        mode="special_arrival"
        onSpecialLanternArrived={() => setLanternReady(true)}
        onCenterLanternTap={handleLanternTap}
        isBursting={isBursting}
      />

      {/* When the central lantern stops in the center, reveal 'Something for you...' */}
      <AnimatePresence>
        {lanternReady && !isBursting && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute z-20 flex flex-col items-center text-center pointer-events-auto cursor-pointer"
            style={{ top: '62%' }}
            onClick={handleLanternTap}
          >
            <motion.p
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="font-serif italic text-2xl sm:text-3xl text-gold-bright tracking-wide drop-shadow-[0_2px_12px_rgba(245,158,11,0.5)]"
            >
              Something for you...
            </motion.p>

            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-200 text-xs sm:text-sm font-sans tracking-widest uppercase backdrop-blur-md hover:bg-amber-500/25 transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)]"
            >
              <span>Tap the glowing lantern</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

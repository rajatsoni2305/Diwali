import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FireworksCanvas } from './FireworksCanvas';
import { ArrowRight, Sparkles } from 'lucide-react';

interface SceneFireworksProps {
  onComplete: () => void;
}

export const SceneFireworks: React.FC<SceneFireworksProps> = ({ onComplete }) => {
  const [canProceed, setCanProceed] = useState<boolean>(false);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between p-6 overflow-hidden bg-[#07040a]">
      {/* Dynamic Fireworks Canvas */}
      <FireworksCanvas
        onSequenceComplete={() => {
          setCanProceed(true);
          // Automatically proceed smoothly or let user enjoy fireworks
          setTimeout(() => {
            onComplete();
          }, 1400);
        }}
        interactive={true}
      />

      {/* Top Diwali Banner Greeting in Sky */}
      <div className="relative z-20 pt-12 text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/40 border border-amber-400/30 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-amber-200">
              The Festival of Lights
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-gold-bright tracking-tight drop-shadow-[0_4px_24px_rgba(245,158,11,0.6)]">
            Happy Diwali, Tanisha!
          </h1>

          <p className="text-sm sm:text-base text-amber-100/80 font-sans font-light tracking-wide max-w-sm mx-auto">
            May this season bring radiant light, warmth and joy into your world.
          </p>
        </motion.div>
      </div>

      {/* Subtle Hint & Skip to Greeting CTA */}
      <div className="relative z-20 pb-8 flex flex-col items-center gap-3">
        <p className="text-xs text-amber-300/60 font-sans tracking-wider animate-pulse">
          Tap anywhere in the sky to burst more fireworks ✨
        </p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          onClick={onComplete}
          type="button"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-100 text-xs sm:text-sm font-sans tracking-wide backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.25)] transition-all"
        >
          <span>{canProceed ? 'Open Your Greeting' : 'Continue to Greeting'}</span>
          <ArrowRight className="w-4 h-4 text-amber-300" />
        </motion.button>
      </div>
    </div>
  );
};

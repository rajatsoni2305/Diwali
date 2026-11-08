import React from 'react';
import { motion } from 'motion/react';
import { DiyaIllustration } from './DiyaIllustration';
import { Sparkles } from 'lucide-react';

interface SceneIntroProps {
  onBegin: () => void;
}

export const SceneIntro: React.FC<SceneIntroProps> = ({ onBegin }) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center z-20">
      {/* Soft ambient golden light appearing in darkness */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.18) 0%, rgba(217, 119, 6, 0.08) 50%, rgba(0, 0, 0, 0) 75%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Gentle Diya Presence */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2.2, delay: 0.6, ease: 'easeOut' }}
        className="mb-8 relative"
      >
        <DiyaIllustration size="lg" showPetioles={true} />
      </motion.div>

      {/* Title / Intro Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md mx-auto space-y-4"
      >
        <p className="font-serif italic text-2xl sm:text-3xl text-amber-100/90 tracking-wide font-light">
          A little Diwali magic, made for Tanisha.
        </p>

        <p className="text-xs uppercase tracking-[0.28em] text-amber-400/60 font-sans font-medium">
          A LITTLE FESTIVE SURPRISE
        </p>
      </motion.div>

      {/* Call to action button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8, delay: 2.4, ease: 'easeOut' }}
        className="mt-12"
      >
        <button
          onClick={onBegin}
          type="button"
          className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-sans font-semibold text-sm sm:text-base tracking-wide shadow-[0_0_35px_rgba(245,158,11,0.35)] hover:shadow-[0_0_50px_rgba(245,158,11,0.6)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
        >
          {/* Subtle button glow ring */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 opacity-30 blur-sm group-hover:opacity-60 transition duration-300" />
          
          <span className="relative flex items-center gap-2">
            Open Your Diwali Surprise
            <Sparkles className="w-4 h-4 text-slate-900 animate-spin" style={{ animationDuration: '6s' }} />
          </span>
        </button>
      </motion.div>
    </div>
  );
};

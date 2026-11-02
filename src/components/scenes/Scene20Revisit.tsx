import React from 'react';
import { motion } from 'motion/react';
import { RotateCcw, Sparkles } from 'lucide-react';
import { soundEffects } from '../../services/soundEffects';

interface SceneProps {
  onRestart: () => void;
}

export const Scene20Revisit: React.FC<SceneProps> = ({ onRestart }) => {
  const handleRestart = () => {
    soundEffects.playDiyaIgnite(1.0);
    onRestart();
  };

  return (
    <div className="relative w-full h-full min-h-screen bg-[#070503] flex flex-col items-center justify-center px-4 py-8 select-none overflow-hidden text-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(80,45,15,0.45)_0%,rgba(7,5,3,1)_85%)] pointer-events-none" />

      {/* Floating lanterns in the night sky */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: '20%', y: '25%', scale: 0.5 },
          { x: '80%', y: '30%', scale: 0.6 },
          { x: '50%', y: '15%', scale: 0.4 },
        ].map((item, i) => (
          <motion.div
            key={i}
            animate={{
              y: ['0px', '-20px', '0px'],
              opacity: [0.5, 0.85, 0.5],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ left: item.x, top: item.y, transform: `scale(${item.scale})` }}
            className="absolute w-8 h-12 rounded-t-lg bg-gradient-to-t from-[#ff8f00] to-[#fffde7] blur-[0.4px] shadow-[0_0_15px_#ff9800]"
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="relative z-10 max-w-lg w-full flex flex-col items-center p-8 rounded-3xl bg-[#140b04]/80 backdrop-blur-md border border-[#d4af37]/40 shadow-[0_0_60px_rgba(0,0,0,0.9)]"
      >
        <div className="inline-flex items-center gap-2 text-xs font-cinzel text-[#d4af37] tracking-[0.25em] uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#ffb300]" />
          <span>The Quest is Fulfilled</span>
          <Sparkles className="w-3.5 h-3.5 text-[#ffb300]" />
        </div>

        <h1 className="font-cinzel-dec text-2xl sm:text-4xl text-[#fff3b0] gold-glow tracking-wider font-bold mb-4">
          SHUBH DEEPAVALI
        </h1>

        <p className="font-marcellus text-base sm:text-lg text-[#ecd7b5] leading-relaxed mb-8">
          May the warmth of this journey, the laughter of old memories, and the blessings of Ayodhya stay with you always, Tanisha.
        </p>

        {/* Central Diya */}
        <div className="relative flex flex-col items-center mb-10">
          <div className="w-6 h-10 bg-gradient-to-t from-[#e65100] via-[#ffb300] to-[#fffde7] rounded-full blur-[0.5px] shadow-[0_0_20px_#ff9800] animate-diya-flame" />
          <div className="w-16 h-6 bg-gradient-to-r from-[#5d2b10] via-[#8d401a] to-[#4e220b] rounded-b-full border-t border-[#c67d38] -mt-2" />
        </div>

        {/* The Revisit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRestart}
          className="px-10 py-4 rounded-full bg-gradient-to-r from-[#b37d2a] via-[#f5b041] to-[#b37d2a] text-[#0d0702] font-cinzel text-xs sm:text-sm font-bold tracking-[0.2em] uppercase box-gold-glow-active transition-all cursor-pointer flex items-center gap-3 border border-[#fff2b2]"
        >
          <RotateCcw className="w-4 h-4 text-[#0d0702]" />
          <span>REVISIT THE MAGIC</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

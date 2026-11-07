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
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#10091b] px-4 py-8 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(126,79,151,0.3),transparent_70%)]" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#f2cf80]/10 to-transparent" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[
          { x: '12%', y: '25%', delay: 0 },
          { x: '28%', y: '65%', delay: 1 },
          { x: '50%', y: '15%', delay: 2 },
          { x: '72%', y: '45%', delay: 0.5 },
          { x: '88%', y: '23%', delay: 1.5 },
          { x: '62%', y: '78%', delay: 2.5 },
        ].map((item, index) => (
          <motion.div
            key={index}
            animate={{
              y: [0, -25, 0],
              opacity: [0.35, 0.9, 0.35],
            }}
            transition={{
              duration: 5 + (index % 3),
              delay: item.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ left: item.x, top: item.y }}
            className="absolute"
          >
            <div className="relative h-12 w-8 rounded-t-xl border border-[#ffe6a0]/60 bg-gradient-to-b from-[#fff4c4] via-[#ffbd55] to-[#c85b20] shadow-[0_0_25px_rgba(255,173,65,0.55)]">
              <div className="absolute -bottom-2 left-1/2 h-3 w-px -translate-x-1/2 bg-[#f4d99b]/70" />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 w-full max-w-xl rounded-[2rem] border border-[#e8c77d]/40 bg-gradient-to-br from-[#2a1a36]/95 via-[#1b1029]/95 to-[#120b1c]/95 p-8 shadow-[0_25px_90px_rgba(0,0,0,0.55)] sm:p-12"
      >
        <div className="pointer-events-none absolute inset-3 rounded-[1.5rem] border border-[#e8c77d]/15" />

        <div className="mb-5 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-[#e8c77d]">
          <Sparkles size={16} />
          The Quest Is Fulfilled
          <Sparkles size={16} />
        </div>

        <h1 className="font-cinzel-dec text-3xl font-bold tracking-wider text-[#fff0c7] sm:text-5xl">
          SHUBH DEEPAVALI
        </h1>

        <div className="mx-auto my-6 h-px w-32 bg-gradient-to-r from-transparent via-[#e8c77d] to-transparent" />

        <p className="font-marcellus text-base leading-8 text-[#f1e5d3] sm:text-lg">
          May the warmth of this journey, the laughter of old memories, and
          the blessings of Ayodhya stay with you always, Tanisha.
        </p>

        <div className="relative mx-auto my-10 flex h-24 w-28 flex-col items-center justify-end">
          <motion.div
            animate={{
              scaleX: [1, 0.85, 1],
              scaleY: [1, 1.12, 1],
            }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="absolute bottom-9 h-12 w-7 rounded-full bg-gradient-to-t from-[#ff6f00] via-[#ffb300] to-[#fffde7] shadow-[0_0_35px_rgba(255,152,0,0.8)]"
          />

          <div className="relative z-10 h-7 w-24 rounded-b-[50%] border-t-2 border-[#e8b66b] bg-gradient-to-r from-[#6d3214] via-[#b45b22] to-[#6d3214]" />

          <div className="absolute bottom-0 h-3 w-32 rounded-full bg-[#e8c77d]/10 blur-md" />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleRestart}
          className="mx-auto flex items-center gap-3 rounded-full border border-[#fff0c7]/70 bg-gradient-to-r from-[#b77c38] via-[#f0ce83] to-[#b77c38] px-8 py-4 text-xs font-bold tracking-[0.18em] text-[#25152b] shadow-[0_0_30px_rgba(232,199,125,0.2)] sm:text-sm"
        >
          <RotateCcw size={17} />
          REVISIT THE MAGIC
        </motion.button>

        <p className="mt-6 font-kalam text-lg text-[#e8c77d]/80">
          Until the lights shine again...
        </p>
      </motion.div>
    </div>
  );
};

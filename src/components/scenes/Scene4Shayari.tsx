import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface SceneProps {
  onNext: () => void;
}

const SHAYARI_LINES = [
  'Chup rahoge toh baat kaun karega,',
  'Hum nahi rahe toh yaad kaun karega...',
  'Maana ki hum itne achhe nahi hain,',
  'Par hum na rahe toh pareshan kaun karega!',
];

export const Scene4Shayari: React.FC<SceneProps> = ({ onNext }) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [canProceed, setCanProceed] = useState<boolean>(false);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // Line 1
    timers.push(
      setTimeout(() => {
        setVisibleLines(1);
      }, 800)
    );

    // Line 2
    timers.push(
      setTimeout(() => {
        setVisibleLines(2);
      }, 2600)
    );

    // Line 3
    timers.push(
      setTimeout(() => {
        setVisibleLines(3);
      }, 4400)
    );

    // Line 4
    timers.push(
      setTimeout(() => {
        setVisibleLines(4);
      }, 6200)
    );

    // Button reveal after full reading
    timers.push(
      setTimeout(() => {
        setCanProceed(true);
      }, 7800)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative w-full h-full min-h-screen bg-[#070503] flex flex-col items-center justify-center px-4 sm:px-6 py-12 select-none overflow-hidden">
      {/* Background radial gold glow and sacred mandala watermark */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(80,48,15,0.35)_0%,rgba(7,5,3,1)_85%)] pointer-events-none" />

      <div className="absolute w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] rounded-full border border-[#d4af37]/15 pointer-events-none animate-spin" style={{ animationDuration: '60s' }} />
      <div className="absolute w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] rounded-full border border-dashed border-[#d4af37]/20 pointer-events-none" />

      {/* Ornate Frame Header */}
      <div className="relative z-10 flex items-center gap-3 text-[#d4af37]/70 mb-8 sm:mb-12">
        <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#d4af37]" />
        <Sparkles className="w-4 h-4 text-[#f5b041]" />
        <span className="font-cinzel text-xs sm:text-sm tracking-[0.25em] uppercase text-[#ffd700]">
          An Ode to Nostalgia
        </span>
        <Sparkles className="w-4 h-4 text-[#f5b041]" />
        <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#d4af37]" />
      </div>

      {/* Shayari Card */}
      <div className="relative z-10 max-w-xl w-full text-center p-6 sm:p-10 rounded-3xl bg-[#120c07]/60 backdrop-blur-md border border-[#d4af37]/30 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        <div className="space-y-4 sm:space-y-6">
          {SHAYARI_LINES.map((line, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
              animate={
                visibleLines > idx
                  ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                  : { opacity: 0 }
              }
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className={`font-kalam text-xl sm:text-2xl md:text-3xl leading-relaxed tracking-wide ${
                idx === 3
                  ? 'text-[#ffdd80] font-bold gold-glow'
                  : 'text-[#f5e6ca]'
              }`}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={canProceed ? { opacity: 1, scale: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-8 sm:mt-10 pt-4 border-t border-[#d4af37]/20 flex justify-center"
        >
          {canProceed && (
            <button
              onClick={onNext}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#b37d2a] via-[#e5a83a] to-[#b37d2a] text-[#0d0905] font-cinzel font-semibold text-xs sm:text-sm tracking-wider uppercase hover:brightness-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(229,168,58,0.4)] flex items-center gap-2 cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

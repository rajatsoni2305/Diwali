
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
  const [visibleLines, setVisibleLines] = useState(0);
  const [canProceed, setCanProceed] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setVisibleLines(1), 800),
      setTimeout(() => setVisibleLines(2), 2600),
      setTimeout(() => setVisibleLines(3), 4400),
      setTimeout(() => setVisibleLines(4), 6200),
      setTimeout(() => setCanProceed(true), 7800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative isolate flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#170e1c] px-5 py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(126,77,91,.23),transparent_65%)]" />

      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d8b77b]/15 sm:h-[470px] sm:w-[470px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      />

      <div className="relative z-10 mb-8 flex items-center gap-3 text-[#e8c58c] sm:mb-12">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#d8b77b]" />
        <Sparkles className="h-4 w-4" />
        <span className="font-cinzel text-[10px] uppercase tracking-[.3em] sm:text-xs">
          An Ode to Nostalgia
        </span>
        <Sparkles className="h-4 w-4" />
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#d8b77b]" />
      </div>

      <div className="relative z-10 w-full max-w-2xl rounded-[28px] border border-[#d8b77b]/30 bg-[#241727]/80 px-5 py-9 shadow-[0_25px_90px_rgba(0,0,0,.45)] backdrop-blur-xl sm:px-12 sm:py-14">
        <div className="pointer-events-none absolute inset-3 rounded-[21px] border border-[#d8b77b]/10" />

        <div className="relative space-y-5 text-center sm:space-y-7">
          {SHAYARI_LINES.map((line, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
              animate={visibleLines > index
                ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                : { opacity: 0 }}
              transition={{ duration: 1.3 }}
              className={`font-kalam text-lg leading-relaxed sm:text-2xl md:text-3xl ${
                index === 3
                  ? 'font-bold text-[#ffdfa0] gold-glow'
                  : 'text-[#f2e4d1]'
              }`}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <div className="relative mt-9 flex min-h-12 justify-center border-t border-[#d8b77b]/20 pt-7">
          {canProceed && (
            <motion.button
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              onClick={onNext}
              className="flex items-center gap-3 rounded-full border border-[#f5d79f]/60 bg-gradient-to-r from-[#a96e3c] via-[#e5bb78] to-[#a96e3c] px-7 py-3 font-cinzel text-xs font-bold uppercase tracking-widest text-[#241525] shadow-lg transition hover:brightness-110 active:scale-95"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

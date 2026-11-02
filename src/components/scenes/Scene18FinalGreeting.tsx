import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { soundEffects } from '../../services/soundEffects';

interface SceneProps {
  onNext: () => void;
}

const GREETING_PARAGRAPHS = [
  'May your world always be brighter than a thousand diyas.',
  'May this Diwali bring you endless laughter, beautiful memories, exciting little adventures, and all the happiness your heart deserves.',
  "Keep smiling, keep shining, and please don't stop being your wonderfully unpredictable self.",
  'And yes... consider this your annual reminder that someone is professionally qualified to bother you. 😂',
  'Wishing you and your family a beautiful, peaceful and joyful Diwali.',
  'May your light always find its way home.',
];

export const Scene18FinalGreeting: React.FC<SceneProps> = ({ onNext }) => {
  const [step, setStep] = useState<number>(0);
  const [canProceed, setCanProceed] = useState<boolean>(false);

  useEffect(() => {
    soundEffects.playTempleBell();

    const timers: NodeJS.Timeout[] = [];
    timers.push(setTimeout(() => setStep(1), 600)); // Happy Diwali, Tanisha!
    timers.push(setTimeout(() => setStep(2), 2200)); // Para 1
    timers.push(setTimeout(() => setStep(3), 4200)); // Para 2
    timers.push(setTimeout(() => setStep(4), 6200)); // Para 3
    timers.push(setTimeout(() => setStep(5), 8200)); // Para 4 (joke)
    timers.push(setTimeout(() => setStep(6), 10200)); // Para 5
    timers.push(setTimeout(() => setStep(7), 12200)); // Para 6 & Sign-off
    timers.push(setTimeout(() => setCanProceed(true), 13600));

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative w-full h-full min-h-screen bg-[#080503] flex flex-col items-center justify-center px-4 sm:px-6 py-12 select-none overflow-x-hidden">
      {/* Warm Golden Halo Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(95,55,18,0.45)_0%,rgba(8,5,3,1)_85%)] pointer-events-none" />

      {/* Decorative Traditional Toran Overhead */}
      <div className="absolute top-0 inset-x-0 h-10 border-b border-[#d4af37]/30 flex justify-center items-center gap-6 pointer-events-none opacity-40">
        <span className="text-[#ffd54f]">𑁍</span>
        <span className="text-[#ffd54f]">𑁍</span>
        <span className="text-[#ffd54f]">𑁍</span>
        <span className="text-[#ffd54f]">𑁍</span>
        <span className="text-[#ffd54f]">𑁍</span>
      </div>

      {/* Main Glass Scroll Card */}
      <div className="relative z-10 max-w-2xl w-full p-6 sm:p-10 rounded-3xl bg-[#140b05]/85 backdrop-blur-md border-2 border-[#d4af37]/40 shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col items-center text-center">
        {/* Divine Greeting Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -10 }}
          animate={step >= 1 ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 text-xs font-cinzel text-[#d4af37] tracking-[0.25em] uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#ffb300]" />
            <span>Sacred Deepavali Blessings</span>
            <Sparkles className="w-3.5 h-3.5 text-[#ffb300]" />
          </div>
          <h1 className="font-cinzel-dec text-2xl sm:text-4xl md:text-5xl text-[#fff3b0] gold-glow font-bold tracking-wider">
            HAPPY DIWALI, TANISHA!
          </h1>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-[#ffd54f] to-transparent mx-auto mt-3" />
        </motion.div>

        {/* Gradual Message Paragraphs */}
        <div className="space-y-4 sm:space-y-5 text-[#f5e6cc] font-marcellus text-base sm:text-lg leading-relaxed max-w-xl">
          {GREETING_PARAGRAPHS.map((text, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 12, filter: 'blur(5px)' }}
              animate={step >= idx + 2 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className={
                idx === 3
                  ? 'text-[#ffe082] italic font-kalam text-lg sm:text-xl'
                  : idx === 5
                  ? 'text-[#fff8b5] font-semibold text-lg'
                  : ''
              }
            >
              {text}
            </motion.p>
          ))}

          {/* Signature */}
          {step >= 7 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="pt-6 border-t border-[#d4af37]/25 flex flex-col items-center"
            >
              <span className="font-kalam text-2xl sm:text-3xl text-[#f5b041] tracking-wide font-bold">
                — Rajat
              </span>
              <div className="flex items-center gap-1.5 text-xs text-[#a38550] font-cinzel mt-1">
                <Heart className="w-3 h-3 text-[#ff7043] fill-[#ff7043]" />
                <span>With festive mischief & boundless warmth</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Bottom Button to Keepsake */}
        <div className="mt-8 pt-4 min-h-[55px] flex items-center justify-center">
          {canProceed && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#b37d2a] via-[#f5b041] to-[#b37d2a] text-[#0d0702] font-cinzel text-xs sm:text-sm font-bold tracking-[0.2em] uppercase box-gold-glow-active transition-all cursor-pointer flex items-center gap-3 border border-[#fff2b2]"
            >
              <span>CLAIM YOUR DIGITAL KEEPSAKE</span>
              <ArrowRight className="w-4 h-4 text-[#0d0702]" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

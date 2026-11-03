import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { soundEffects } from '../../services/soundEffects';

interface SceneProps {
  onNext: () => void;
}

const GREETING_LETTER = {
  salutation: 'Dear Tanisha,',
  personalWish:
    'May this Diwali bring a little more magic into your life, turn your quietest dreams into beautiful realities and fill your days with the kind of happiness that needs no reason. May you always find the courage to chase what your heart desires, the strength to overcome what holds you back, and countless little moments that make you fall in love with life all over again. May you discover beautiful places, collect unforgettable memories, meet wonderful people and receive more kindness from life than you ever expected. You deserve a future filled with opportunities, achievements, peaceful moments and smiles that come straight from the heart. And may you never lose the little spark that makes you uniquely you.',
  familyWish:
    'For your entire family, may every diya illuminate your home with happiness, every prayer bring blessings and every new morning arrive with fresh hope. May God bless your parents with lasting good health, peace and the joy of seeing their dreams fulfilled. May your home always be a place of warmth, laughter, understanding and togetherness, where happiness is shared, difficulties are faced together and love never runs short. May prosperity find its way to your doorstep, may every member of your family flourish, and may the coming years bring you countless beautiful reasons to celebrate together.',
  finalGreeting:
    'Happy Diwali, Tanisha! May the lights of this beautiful festival brighten every path you take, may your wishes find their way to the stars, and may life always have something wonderful waiting around the corner for you. Wishing you and your entire family a Diwali filled with endless blessings, beautiful beginnings and happiness beyond words. ❤️🪔',
};

export const Scene18FinalGreeting: React.FC<SceneProps> = ({ onNext }) => {
  const [step, setStep] = useState<number>(0);
  const [canProceed, setCanProceed] = useState<boolean>(false);

  useEffect(() => {
    soundEffects.playTempleBell();

    const timers: NodeJS.Timeout[] = [];
    timers.push(setTimeout(() => setStep(1), 500)); // Header & Salutation
    timers.push(setTimeout(() => setStep(2), 1400)); // Para 1: Personal wishes
    timers.push(setTimeout(() => setStep(3), 2600)); // Para 2: Family wishes
    timers.push(setTimeout(() => setStep(4), 3800)); // Para 3: Final greeting & blessings
    timers.push(setTimeout(() => {
      setStep(5); // Signature
      setCanProceed(true);
    }, 4800));

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#080503] flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-14 select-none overflow-x-hidden">
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

      {/* Main Glass Scroll Letter Card */}
      <div className="relative z-10 max-w-2xl sm:max-w-3xl w-full p-6 sm:p-10 md:p-12 rounded-3xl bg-[#140b05]/90 backdrop-blur-md border-2 border-[#d4af37]/40 shadow-[0_0_60px_rgba(212,175,55,0.18)] flex flex-col my-auto">
        {/* Divine Greeting Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={step >= 1 ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-center mb-6 sm:mb-8"
        >
          <div className="inline-flex items-center gap-2 text-xs font-cinzel text-[#d4af37] tracking-[0.25em] uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#ffb300]" />
            <span>Sacred Deepavali Letter</span>
            <Sparkles className="w-3.5 h-3.5 text-[#ffb300]" />
          </div>
          <h1 className="font-cinzel-dec text-2xl sm:text-4xl md:text-5xl text-[#fff3b0] gold-glow font-bold tracking-wider">
            HAPPY DIWALI, TANISHA!
          </h1>
          <div className="w-36 h-0.5 bg-gradient-to-r from-transparent via-[#ffd54f] to-transparent mx-auto mt-3" />
        </motion.div>

        {/* Letter Body: Three Natural Paragraphs */}
        <div className="space-y-6 sm:space-y-7 text-[#f5e6cc] font-marcellus text-base sm:text-lg leading-relaxed">
          {/* Paragraph 1: Personal Wishes */}
          <motion.div
            initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
            animate={step >= 2 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="space-y-2.5"
          >
            <p className="font-kalam text-xl sm:text-2xl text-[#ffd54f] font-bold tracking-wide">
              {GREETING_LETTER.salutation}
            </p>
            <p className="text-left sm:text-justify text-[#f5e6cc]/95 leading-relaxed">
              {GREETING_LETTER.personalWish}
            </p>
          </motion.div>

          {/* Paragraph 2: Family Wishes */}
          <motion.div
            initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
            animate={step >= 3 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="pt-2"
          >
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent mx-auto mb-4" />
            <p className="text-left sm:text-justify text-[#f5e6cc]/95 leading-relaxed">
              {GREETING_LETTER.familyWish}
            </p>
          </motion.div>

          {/* Paragraph 3: Final Festive Greeting Callout Card */}
          <motion.div
            initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
            animate={step >= 4 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#241206]/85 via-[#341808]/80 to-[#1f0d04]/85 border border-[#ffd54f]/35 shadow-[0_0_30px_rgba(255,183,77,0.12)] text-left"
          >
            <p className="text-[#fff4d0] font-medium leading-relaxed">
              {GREETING_LETTER.finalGreeting}
            </p>
          </motion.div>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={step >= 5 ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.0 }}
            className="pt-4 border-t border-[#d4af37]/25 flex flex-col items-center text-center"
          >
            <span className="font-kalam text-2xl sm:text-3xl text-[#f5b041] tracking-wide font-bold">
              — Rajat
            </span>
            <div className="flex items-center gap-1.5 text-xs text-[#d4af37]/80 font-cinzel mt-1">
              <Heart className="w-3 h-3 text-[#ff7043] fill-[#ff7043]" />
              <span>With festive warmth & heartfelt blessings</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Button to Keepsake */}
        <div className="mt-8 pt-2 min-h-[55px] flex items-center justify-center">
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

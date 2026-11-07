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
  const [step, setStep] = useState(0);
  const [canProceed, setCanProceed] = useState(false);

  useEffect(() => {
    soundEffects.playTempleBell();

    const timers = [
      setTimeout(() => setStep(1), 500),
      setTimeout(() => setStep(2), 1400),
      setTimeout(() => setStep(3), 2600),
      setTimeout(() => setStep(4), 3800),
      setTimeout(() => {
        setStep(5);
        setCanProceed(true);
      }, 4800),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#10091b] px-4 py-10 sm:px-6 sm:py-14 flex items-center justify-center">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(126,79,151,0.25),transparent_70%)]" />

      <div className="absolute inset-x-0 top-0 h-20 pointer-events-none bg-gradient-to-b from-[#f4c96b]/10 to-transparent" />

      <div className="absolute top-0 left-0 right-0 flex justify-around text-[#f6d78b]/60 text-xl pointer-events-none">
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.span
            key={i}
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 2 + (i % 3), repeat: Infinity }}
          >
            ✦
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 my-auto w-full max-w-3xl rounded-[2rem] border border-[#e8c77d]/40 bg-gradient-to-br from-[#281936]/95 via-[#1b1029]/95 to-[#120b1c]/95 p-6 shadow-[0_20px_90px_rgba(0,0,0,0.5)] sm:p-10 md:p-12"
      >
        <div className="pointer-events-none absolute inset-3 rounded-[1.5rem] border border-[#e8c77d]/15" />

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={step >= 1 ? { opacity: 1, y: 0 } : {}}
          className="relative text-center"
        >
          <div className="mb-3 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-[#e8c77d]">
            <Sparkles size={15} />
            A Little Diwali Letter
            <Sparkles size={15} />
          </div>

          <h1 className="font-cinzel-dec text-2xl font-bold tracking-wider text-[#fff0c7] sm:text-4xl md:text-5xl">
            HAPPY DIWALI
          </h1>

          <p className="mt-2 font-kalam text-xl text-[#e8c77d] sm:text-2xl">
            For Tanisha
          </p>

          <div className="mx-auto mt-5 h-px w-40 bg-gradient-to-r from-transparent via-[#e8c77d] to-transparent" />
        </motion.div>

        <div className="relative mt-8 space-y-7 font-marcellus text-sm leading-8 text-[#f4e9d7] sm:text-base sm:leading-9">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={step >= 2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <p className="mb-2 font-kalam text-2xl font-bold text-[#f2cf80]">
              {GREETING_LETTER.salutation}
            </p>
            <p>{GREETING_LETTER.personalWish}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={step >= 3 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <div className="mx-auto mb-5 h-px w-24 bg-[#e8c77d]/40" />
            <p>{GREETING_LETTER.familyWish}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={step >= 4 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="rounded-2xl border border-[#e8c77d]/30 bg-[#f2cf80]/10 p-5 text-[#fff1d2] sm:p-6"
          >
            {GREETING_LETTER.finalGreeting}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={step >= 5 ? { opacity: 1, scale: 1 } : {}}
            className="border-t border-[#e8c77d]/25 pt-6 text-center"
          >
            <p className="font-kalam text-3xl font-bold text-[#e8c77d]">
              — Rajat
            </p>
            <p className="mt-2 flex items-center justify-center gap-2 text-xs text-[#d9c49e]">
              <Heart size={13} className="fill-[#d98a91] text-[#d98a91]" />
              With festive warmth and best wishes
            </p>
          </motion.div>
        </div>

        <div className="mt-8 flex min-h-14 justify-center">
          {canProceed && (
            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onNext}
              className="flex items-center gap-3 rounded-full border border-[#fff0c7]/70 bg-gradient-to-r from-[#b77c38] via-[#f0ce83] to-[#b77c38] px-7 py-3.5 text-xs font-bold tracking-[0.15em] text-[#25152b] shadow-[0_0_30px_rgba(232,199,125,0.2)] sm:text-sm"
            >
              CLAIM YOUR DIGITAL KEEPSAKE
              <ArrowRight size={17} />
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

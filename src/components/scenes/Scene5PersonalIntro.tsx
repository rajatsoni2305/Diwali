
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Compass } from 'lucide-react';
import { soundEffects } from '../../services/soundEffects';

interface SceneProps {
  onNext: () => void;
}

const INTRO_MESSAGES = [
  "Well, well... look who's here!",
  "We're back to bother you. Again. 😌",
  "Don't worry, it's just a little festive disturbance.",
  "With a little festive mischief, from Rajat.",
];

export const Scene5PersonalIntro: React.FC<SceneProps> = ({ onNext }) => {
  const [step, setStep] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 600),
      setTimeout(() => setStep(2), 2400),
      setTimeout(() => setStep(3), 4400),
      setTimeout(() => setStep(4), 6400),
      setTimeout(() => setStep(5), 8400),
      setTimeout(() => setShowButton(true), 9600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleEnterQuest = () => {
    soundEffects.playTempleBell();
    onNext();
  };

  return (
    <div className="relative isolate flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#180f1e] px-5 py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(151,91,81,.28),transparent_65%)]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-t-[150px] border border-[#d6b27b]/20 sm:h-[550px] sm:w-[400px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-t-[140px] border border-[#d6b27b]/10 sm:h-[520px] sm:w-[370px]" />

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="mb-9 inline-flex items-center gap-2 rounded-full border border-[#d6b27b]/40 bg-[#2b1b29]/80 px-4 py-2 text-[10px] uppercase tracking-[.18em] text-[#f1d49c] sm:text-xs"
        >
          <Sparkles className="h-4 w-4" />
          A Diwali Chronicle for Tanisha
          <Sparkles className="h-4 w-4" />
        </motion.div>

        <div className="flex min-h-[250px] flex-col justify-center space-y-4 sm:space-y-6">
          {INTRO_MESSAGES.map((message, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 14, filter: 'blur(7px)' }}
              animate={step > index
                ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                : { opacity: 0 }}
              transition={{ duration: 1.1 }}
              className={`font-marcellus text-lg leading-relaxed sm:text-2xl ${
                index === 3
                  ? 'font-semibold text-[#f3c77d] gold-glow'
                  : 'text-[#f2e5d5]'
              }`}
            >
              {message}
            </motion.p>
          ))}

          {step >= 5 && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="pt-4 font-cinzel text-lg leading-relaxed text-[#ffe5a9] gold-glow sm:text-2xl"
            >
              Ready to enter a little world of magic?
            </motion.p>
          )}
        </div>

        <div className="mt-9 flex min-h-16 items-center justify-center">
          {showButton && (
            <motion.button
              initial={{ opacity: 0, scale: 0.85, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleEnterQuest}
              className="flex items-center gap-3 rounded-full border border-[#fff0c0]/70 bg-gradient-to-r from-[#a96e3c] via-[#f0ca83] to-[#a96e3c] px-8 py-4 font-cinzel text-xs font-bold tracking-[.16em] text-[#251526] shadow-[0_0_35px_rgba(220,166,91,.3)] sm:text-sm"
            >
              <Compass className="h-5 w-5" />
              ENTER THE QUEST
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

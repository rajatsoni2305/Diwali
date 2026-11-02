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
  const [step, setStep] = useState<number>(0);
  const [showButton, setShowButton] = useState<boolean>(false);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    timers.push(setTimeout(() => setStep(1), 600));
    timers.push(setTimeout(() => setStep(2), 2400));
    timers.push(setTimeout(() => setStep(3), 4400));
    timers.push(setTimeout(() => setStep(4), 6400));
    timers.push(setTimeout(() => setStep(5), 8400)); // "Ready to enter..."
    timers.push(setTimeout(() => setShowButton(true), 9600));

    return () => timers.forEach(clearTimeout);
  }, []);

  const handleEnterQuest = () => {
    soundEffects.playTempleBell();
    onNext();
  };

  return (
    <div className="relative w-full h-full min-h-screen bg-[#070503] flex flex-col items-center justify-center px-4 sm:px-6 py-12 select-none overflow-hidden">
      {/* Ancient royal architectural arch silhouette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(110,65,20,0.3)_0%,rgba(7,5,3,1)_80%)] pointer-events-none" />

      {/* Subtle royal ornamental arch frame */}
      <div className="relative z-10 max-w-xl w-full text-center flex flex-col items-center">
        {/* Name dedication badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#20140a]/80 border border-[#d4af37]/40 text-[#f5d77f] text-xs font-cinzel tracking-widest uppercase mb-8 shadow-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#f5b041]" />
          <span>A Diwali Chronicle for Tanisha</span>
          <Sparkles className="w-3.5 h-3.5 text-[#f5b041]" />
        </motion.div>

        {/* Sequential Conversation Text */}
        <div className="space-y-4 sm:space-y-6 min-h-[220px] flex flex-col justify-center">
          {INTRO_MESSAGES.map((msg, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
              animate={step > index ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className={`font-marcellus text-lg sm:text-2xl leading-relaxed ${
                index === 3
                  ? 'text-[#f5b041] font-semibold tracking-wide'
                  : 'text-[#f0dfc4]'
              }`}
            >
              {msg}
            </motion.p>
          ))}

          {/* Final Call to Adventure */}
          {step >= 5 && (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4 }}
              className="font-cinzel text-xl sm:text-2xl text-[#ffe57f] gold-glow font-bold pt-4 tracking-wider"
            >
              Ready to enter a little world of magic?
            </motion.p>
          )}
        </div>

        {/* The Grand Quest Enter Button */}
        <div className="mt-10 min-h-[60px] flex items-center justify-center">
          {showButton && (
            <motion.button
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEnterQuest}
              className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#b37d2a] via-[#f3b544] to-[#b37d2a] text-[#0d0702] font-cinzel font-bold text-sm sm:text-base tracking-[0.2em] uppercase box-gold-glow-active transition-all cursor-pointer flex items-center gap-3 border border-[#fff2b2]"
            >
              <Compass className="w-5 h-5 text-[#0d0702] animate-spin" style={{ animationDuration: '10s' }} />
              <span>ENTER THE QUEST</span>
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

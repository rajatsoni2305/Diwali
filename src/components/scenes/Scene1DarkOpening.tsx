import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { soundEffects } from '../../services/soundEffects';

interface SceneProps {
  onNext: () => void;
}

export const Scene1DarkOpening: React.FC<SceneProps> = ({ onNext }) => {
  const [ignited, setIgnited] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    // Reveal text after a brief suspenseful delay
    const timer = setTimeout(() => {
      setTextVisible(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleIgnite = () => {
    if (ignited) return;
    setIgnited(true);
    soundEffects.playDiyaIgnite(0.9);

    // Transition smoothly after diya flame illuminates darkness
    setTimeout(() => {
      onNext();
    }, 1800);
  };

  return (
    <div
      onClick={handleIgnite}
      className="relative w-full h-full min-h-screen flex flex-col items-center justify-center bg-black cursor-pointer select-none overflow-hidden px-4"
    >
      {/* Subtle ambient darkness radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(40,25,10,0.4)_0%,rgba(0,0,0,1)_70%)] pointer-events-none" />

      {/* Cinematic Text Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
        animate={textVisible ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 2.2, ease: 'easeOut' }}
        className="relative z-10 text-center max-w-xl mb-12"
      >
        <p className="font-marcellus text-lg sm:text-2xl text-[#f3dfb5] tracking-widest leading-relaxed drop-shadow-[0_2px_15px_rgba(245,187,85,0.4)]">
          Wait... someone is lighting a diya in the dark.
        </p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={textVisible ? { opacity: [0.3, 0.7, 0.3] } : {}}
          transition={{ duration: 2.5, repeat: Infinity, delay: 2.5 }}
          className="text-xs sm:text-sm text-[#cca462] font-kalam mt-4 tracking-wider"
        >
          (tap anywhere to touch the flame)
        </motion.p>
      </motion.div>

      {/* The Central Spark / Diya */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Glow halo */}
        <motion.div
          animate={{
            scale: ignited ? [1, 2.8, 3.5] : [0.8, 1.2, 0.9],
            opacity: ignited ? [0.4, 0.9, 0.8] : [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: ignited ? 1.5 : 3,
            repeat: ignited ? 0 : Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-12 w-32 h-32 rounded-full bg-gradient-to-t from-[#ff8c00] via-[#ffc107] to-transparent blur-2xl pointer-events-none"
        />

        {/* Flickering Flame */}
        <motion.div
          initial={{ scale: 0.4, opacity: 0.5 }}
          animate={
            ignited
              ? { scale: [1, 1.8, 2], opacity: 1 }
              : { scale: [0.8, 1.05, 0.9], opacity: [0.6, 0.95, 0.7] }
          }
          transition={{ duration: ignited ? 1.2 : 1.8, repeat: ignited ? 0 : Infinity }}
          className="relative w-8 h-12 flex items-center justify-center"
        >
          {/* Flame teardrop */}
          <div className="w-6 h-10 bg-gradient-to-t from-[#e65100] via-[#ffb300] to-[#fffde7] rounded-full blur-[0.5px] shadow-[0_0_20px_#ff9800] animate-diya-flame" />
          <div className="absolute w-2 h-4 bottom-1 bg-white rounded-full blur-[0.2px] opacity-90" />
        </motion.div>

        {/* Clay Diya Base */}
        <div className="relative -mt-2 w-16 h-6 bg-gradient-to-r from-[#5d2b10] via-[#8d401a] to-[#4e220b] rounded-b-full border-t border-[#c67d38]/60 shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
          <div className="absolute top-0 inset-x-2 h-1 bg-[#3a1807] rounded-full opacity-70" />
        </div>
      </div>
    </div>
  );
};

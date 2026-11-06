
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { soundEffects } from '../../services/soundEffects';

interface SceneProps {
  onNext: () => void;
}

const PARTICLES = Array.from({ length: 34 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 11) % 100}%`,
  delay: (i % 9) * 0.55,
  duration: 5 + (i % 6) * 1.2,
  size: 2 + (i % 3),
}));

export const Scene1DarkOpening: React.FC<SceneProps> = ({ onNext }) => {
  const [ignited, setIgnited] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setTextVisible(true), 1200);

    return () => {
      clearTimeout(timer);
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
    };
  }, []);

  const handleIgnite = () => {
    if (ignited) return;

    setIgnited(true);
    soundEffects.playDiyaIgnite(0.9);

    transitionTimer.current = setTimeout(() => {
      onNext();
    }, 1800);
  };

  return (
    <div
      onClick={handleIgnite}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleIgnite();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Light the diya and begin the Diwali journey"
      className="relative isolate flex min-h-screen h-full w-full flex-col items-center justify-center overflow-hidden bg-[#100914] px-5 text-center cursor-pointer select-none"
    >
      {/* Royal midnight background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_48%,#382039_0%,#211326_42%,#100914_78%)]" />

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_100%,rgba(190,111,43,0.16),transparent_55%)]" />

      {/* Subtle ornamental frame */}
      <div className="pointer-events-none absolute inset-4 sm:inset-8 rounded-[28px] border border-[#d5a85e]/20" />
      <div className="pointer-events-none absolute inset-[23px] sm:inset-[39px] rounded-[22px] border border-[#d5a85e]/10" />

      {/* Corner ornaments */}
      {['top-7 left-7', 'top-7 right-7', 'bottom-7 left-7', 'bottom-7 right-7'].map((position, index) => (
        <motion.div
          key={position}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.55, scale: 1 }}
          transition={{ delay: 0.8 + index * 0.15, duration: 1.4 }}
          className={`pointer-events-none absolute ${position} z-0`}
        >
          <svg viewBox="0 0 54 54" width="38" height="38" fill="none">
            <path
              d="M3 27 C15 27 27 15 27 3 M27 3 C27 15 39 27 51 27 M51 27 C39 27 27 39 27 51 M27 51 C27 39 15 27 3 27"
              stroke="#d9ad69"
              strokeWidth="1.1"
              opacity=".7"
            />
            <circle cx="27" cy="27" r="4" stroke="#f4d99c" opacity=".8" />
            <circle cx="27" cy="27" r="1.5" fill="#f4d99c" />
          </svg>
        </motion.div>
      ))}

      {/* Floating golden particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {PARTICLES.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full bg-[#f4c979]"
            style={{
              left: particle.left,
              bottom: '-5%',
              width: particle.size,
              height: particle.size,
              boxShadow: '0 0 10px rgba(255,190,90,.8)',
            }}
            animate={{
              y: [0, -window.innerHeight * 1.15],
              x: [0, particle.id % 2 === 0 ? 22 : -22, 0],
              opacity: [0, 0.75, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Background halo */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d98c35]/10 blur-[75px] sm:h-96 sm:w-96"
        animate={{
          scale: ignited ? [1, 2.3, 3.5] : [0.9, 1.12, 0.9],
          opacity: ignited ? [0.5, 0.9, 0] : [0.45, 0.8, 0.45],
        }}
        transition={{
          duration: ignited ? 1.5 : 4,
          repeat: ignited ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Opening message */}
      <motion.div
        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
        animate={
          textVisible
            ? { opacity: ignited ? 0 : 1, y: 0, filter: 'blur(0px)' }
            : {}
        }
        transition={{ duration: 1.8, ease: 'easeOut' }}
        className="relative z-10 mb-14 max-w-xl"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={textVisible ? { opacity: 0.8, letterSpacing: '0.32em' } : {}}
          transition={{ duration: 2 }}
          className="mb-7 text-[10px] sm:text-xs uppercase text-[#d9b477]"
        >
          A little light, a beautiful beginning
        </motion.p>

        <h1 className="font-marcellus text-2xl leading-relaxed text-[#fff0d1] sm:text-4xl sm:leading-relaxed gold-glow">
          Every beautiful story
          <br />
          begins with a little light.
        </h1>

        <motion.div
          initial={{ width: 0 }}
          animate={textVisible ? { width: 90 } : {}}
          transition={{ delay: 1, duration: 1.2 }}
          className="mx-auto mt-7 h-px bg-gradient-to-r from-transparent via-[#e9bd70] to-transparent"
        />

        <motion.p
          animate={textVisible ? { opacity: [0.35, 0.85, 0.35] } : {}}
          transition={{ duration: 3, repeat: Infinity }}
          className="mt-6 font-kalam text-sm tracking-wide text-[#e5c18c] sm:text-base"
        >
          Someone is waiting to light the first diya...
        </motion.p>
      </motion.div>

      {/* Central diya */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        animate={ignited ? { scale: [1, 1.15, 1.35] } : { y: [0, -5, 0] }}
        transition={{
          duration: ignited ? 1.4 : 4,
          repeat: ignited ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Outer light rings */}
        <motion.div
          className="absolute -top-20 h-44 w-44 rounded-full border border-[#e8b965]/15"
          animate={{ scale: [0.85, 1.2, 0.85], opacity: [0.25, 0.65, 0.25] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <motion.div
          className="absolute -top-14 h-32 w-32 rounded-full bg-[#ffac32]/15 blur-2xl"
          animate={{
            scale: ignited ? [1, 3, 4] : [0.8, 1.25, 0.8],
            opacity: ignited ? [0.6, 1, 0] : [0.45, 0.8, 0.45],
          }}
          transition={{ duration: ignited ? 1.5 : 3, repeat: ignited ? 0 : Infinity }}
        />

        {/* Flame */}
        <motion.div
          className="relative flex h-20 w-16 items-end justify-center"
          animate={ignited ? { scale: [1, 1.7, 2.2], opacity: [1, 1, 0] } : {}}
          transition={{ duration: 1.5 }}
        >
          <motion.div
            className="absolute bottom-1 h-12 w-8 rounded-[80%_10%_80%_80%] bg-gradient-to-tr from-[#e65b16] via-[#ffb52f] to-[#fff5c8] shadow-[0_0_28px_#ff9e25]"
            animate={{
              rotate: [-7, 7, -5],
              scaleY: [1, 1.12, 0.92, 1],
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="absolute bottom-2 h-7 w-3 rounded-full bg-[#fff9d8] blur-[2px]" />
        </motion.div>

        {/* Diya bowl */}
        <div className="relative -mt-1 h-9 w-28 rounded-b-[55%] border-b-2 border-[#e2a65d]/80 bg-gradient-to-b from-[#d58b47] via-[#974b29] to-[#512318] shadow-[0_9px_18px_rgba(0,0,0,.6)]">
          <div className="absolute inset-x-3 top-0 h-2 rounded-full border border-[#f5d19a]/60 bg-[#4d2419]" />
          <div className="absolute left-1/2 top-2 h-3 w-12 -translate-x-1/2 rounded-full bg-[#f5aa3b]/20 blur-md" />
        </div>

        {/* Decorative diya stand */}
        <div className="mt-1 h-1.5 w-20 rounded-full bg-gradient-to-r from-transparent via-[#c38a4e] to-transparent" />
        <div className="h-3 w-12 rounded-b-full border-b border-[#c38a4e]/60 bg-gradient-to-b from-[#8a4d2d] to-transparent" />
      </motion.div>

      {/* Tap instruction */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: textVisible && !ignited ? 1 : 0,
          y: textVisible && !ignited ? 0 : 10,
        }}
        transition={{ delay: 0.7, duration: 1.2 }}
        className="absolute bottom-20 z-10 flex flex-col items-center gap-3"
      >
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-[#f4d99c]"
          animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />

        <p className="font-kalam text-sm tracking-wider text-[#e6c58f]">
          Tap anywhere to light the diya
        </p>
      </motion.div>

      {/* Ignition message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={ignited ? { opacity: 1, y: -8 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute bottom-20 z-20 font-marcellus text-lg tracking-widest text-[#ffe5a9] gold-glow"
      >
        Let the celebration begin...
      </motion.p>
    </div>
  );
};

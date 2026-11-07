
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { soundEffects } from '../../services/soundEffects';

interface SceneProps { onNext: () => void; }

export const Scene12RoyalGates: React.FC<SceneProps> = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleOpenGates = () => {
    if (isOpen) return;

    setIsOpen(true);
    soundEffects.playDoorOpen();

    timerRef.current = setTimeout(() => {
      onNext();
    }, 3200);
  };

  return (
    <div
      onClick={handleOpenGates}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleOpenGates();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Open the royal palace gates"
      className="relative isolate flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#090502] px-3 text-center"
    >
      {/* Light behind the doors */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_48%,#fff1a6_0%,#d68a24_23%,#69300d_50%,#100601_85%)]"
        animate={{ opacity: isOpen ? 1 : .18, scale: isOpen ? 1.3 : 1 }}
        transition={{ duration: 2.5 }}
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-28 bg-gradient-to-b from-[#090502] to-transparent sm:h-40" />

      {/* Palace arch */}
      <div className="pointer-events-none absolute top-0 z-20 h-36 w-full sm:h-48">
        <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="h-full w-full">
          <defs>
            <linearGradient id="gateArch" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#71401d" />
              <stop offset="100%" stopColor="#241006" />
            </linearGradient>
          </defs>
          <path d="M0 0H1000V120Q800 185 500 180Q200 185 0 120Z" fill="url(#gateArch)" stroke="#d9a451" strokeWidth="5" />
          <path d="M330 180Q500 90 670 180" fill="none" stroke="#f1cb7e" strokeWidth="4" opacity=".65" />
          <path d="M400 170Q500 120 600 170" fill="none" stroke="#f1cb7e" strokeWidth="2" opacity=".5" />
        </svg>
      </div>

      {/* Door structure */}
      <div
        className="relative z-10 flex h-[min(65vh,570px)] w-full max-w-xl items-stretch justify-center px-2 sm:h-[600px]"
        style={{ perspective: 1400 }}
      >
        {/* Left door */}
        <motion.div
          animate={isOpen ? { rotateY: -88, x: -30, opacity: .9 } : { rotateY: 0, x: 0, opacity: 1 }}
          transition={{ duration: 2.5, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ transformOrigin: 'left center', transformStyle: 'preserve-3d' }}
          className="relative flex w-1/2 flex-col justify-around overflow-hidden rounded-l-2xl border-y-4 border-l-4 border-r-2 border-[#d4a34f] bg-gradient-to-r from-[#291004] via-[#653116] to-[#3a1809] p-3 shadow-[0_20px_55px_rgba(0,0,0,.8)] sm:p-6"
        >
          <div className="pointer-events-none absolute inset-3 rounded-lg border border-[#e9bd70]/40" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#f2c66d_1px,transparent_1px)] bg-[size:22px_22px] opacity-20" />

          <div className="relative z-10 flex h-20 items-center justify-center rounded-lg border-2 border-[#d4a34f]/60 sm:h-24">
            <span className="text-3xl text-[#f6d58f] sm:text-4xl">❋</span>
          </div>
          <div className="relative z-10 flex h-32 items-center justify-center rounded-lg border-2 border-[#d4a34f]/60 sm:h-40">
            <span className="text-4xl text-[#f6d58f] sm:text-6xl">☸</span>
          </div>
          <div className="relative z-10 flex h-20 items-center justify-center rounded-lg border-2 border-[#d4a34f]/60 sm:h-24">
            <span className="text-3xl text-[#f6d58f] sm:text-4xl">❋</span>
          </div>

          <div className="absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border-4 border-[#f1c76e] bg-[#9a5a20] shadow-lg sm:right-4 sm:h-11 sm:w-11">
            <div className="h-3 w-3 rounded-full bg-[#ffe9a8]" />
          </div>
        </motion.div>

        {/* Right door */}
        <motion.div
          animate={isOpen ? { rotateY: 88, x: 30, opacity: .9 } : { rotateY: 0, x: 0, opacity: 1 }}
          transition={{ duration: 2.5, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ transformOrigin: 'right center', transformStyle: 'preserve-3d' }}
          className="relative flex w-1/2 flex-col justify-around overflow-hidden rounded-r-2xl border-y-4 border-r-4 border-l-2 border-[#d4a34f] bg-gradient-to-l from-[#291004] via-[#653116] to-[#3a1809] p-3 shadow-[0_20px_55px_rgba(0,0,0,.8)] sm:p-6"
        >
          <div className="pointer-events-none absolute inset-3 rounded-lg border border-[#e9bd70]/40" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#f2c66d_1px,transparent_1px)] bg-[size:22px_22px] opacity-20" />

          <div className="relative z-10 flex h-20 items-center justify-center rounded-lg border-2 border-[#d4a34f]/60 sm:h-24">
            <span className="text-3xl text-[#f6d58f] sm:text-4xl">❋</span>
          </div>
          <div className="relative z-10 flex h-32 items-center justify-center rounded-lg border-2 border-[#d4a34f]/60 sm:h-40">
            <span className="text-4xl text-[#f6d58f] sm:text-6xl">☸</span>
          </div>
          <div className="relative z-10 flex h-20 items-center justify-center rounded-lg border-2 border-[#d4a34f]/60 sm:h-24">
            <span className="text-3xl text-[#f6d58f] sm:text-4xl">❋</span>
          </div>

          <div className="absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border-4 border-[#f1c76e] bg-[#9a5a20] shadow-lg sm:left-4 sm:h-11 sm:w-11">
            <div className="h-3 w-3 rounded-full bg-[#ffe9a8]" />
          </div>
        </motion.div>
      </div>

      {/* Instructions */}
      <div className="relative z-30 mt-7 min-h-20 px-4">
        {!isOpen ? (
          <motion.div
            animate={{ scale: [1, 1.04, 1], opacity: [.8, 1, .8] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-3 rounded-full border border-[#f5b041]/70 bg-[#1e0f06]/90 px-5 py-3 font-cinzel text-[10px] uppercase tracking-widest text-[#ffe57f] shadow-[0_0_30px_rgba(245,176,65,.25)] sm:px-7 sm:text-sm"
          >
            <Sparkles className="h-4 w-4" />
            Tap to Open The Royal Palace Gates
            <Sparkles className="h-4 w-4" />
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-cinzel text-sm uppercase tracking-widest text-[#fff8b5] gold-glow sm:text-xl"
          >
            Entering The Grand Celebration...
          </motion.p>
        )}
      </div>
    </div>
  );
};

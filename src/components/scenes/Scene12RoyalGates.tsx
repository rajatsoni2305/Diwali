import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { soundEffects } from '../../services/soundEffects';

interface SceneProps {
  onNext: () => void;
}

export const Scene12RoyalGates: React.FC<SceneProps> = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGates = () => {
    if (isOpen) return;
    setIsOpen(true);
    soundEffects.playDoorOpen();

    // Transition smoothly after doors open and camera moves through light
    setTimeout(() => {
      onNext();
    }, 3200);
  };

  return (
    <div
      onClick={handleOpenGates}
      className="relative w-full h-full min-h-screen bg-[#070402] flex flex-col items-center justify-center select-none overflow-hidden cursor-pointer"
    >
      {/* Background celestial golden burst waiting behind the gates */}
      <div
        className={`absolute inset-0 bg-[radial-gradient(circle_at_center,#ffe57f_0%,#f59e0b_40%,#180802_80%)] transition-opacity duration-1000 ${
          isOpen ? 'opacity-100' : 'opacity-20'
        }`}
      />

      {/* Royal Arch Structure overhead */}
      <div className="absolute top-0 inset-x-0 h-40 sm:h-52 z-20 pointer-events-none flex justify-center">
        <svg viewBox="0 0 1000 200" className="w-full h-full text-[#2c1306]" fill="currentColor" preserveAspectRatio="none">
          <path d="M0,0 L1000,0 L1000,120 Q800,180 500,180 Q200,180 0,120 Z" />
          <path d="M400,180 Q500,120 600,180 Z" fill="#ffd54f" opacity="0.3" />
        </svg>
      </div>

      {/* Gates Container with 3D Perspective */}
      <div
        className="relative z-10 w-full max-w-xl h-[520px] sm:h-[600px] flex items-center justify-center px-4"
        style={{ perspective: 1200 }}
      >
        {/* Left Gate Leaf */}
        <motion.div
          animate={
            isOpen
              ? { rotateY: -82, x: -60, opacity: 0.85 }
              : { rotateY: 0, x: 0, opacity: 1 }
          }
          transition={{ duration: 2.5, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ transformOrigin: 'left center' }}
          className="relative w-1/2 h-full bg-gradient-to-r from-[#2a1205] via-[#481e09] to-[#361506] border-y-4 border-l-4 border-r-2 border-[#b37d2a] rounded-l-2xl shadow-[0_15px_40px_rgba(0,0,0,0.9)] flex flex-col justify-around p-4 sm:p-6 overflow-hidden"
        >
          {/* Ancient Carved Wood Motifs & Brass Studs */}
          <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] bg-[size:24px_24px] opacity-15 pointer-events-none" />
          
          <div className="w-full h-24 border-2 border-[#b37d2a]/50 rounded-xl flex items-center justify-center">
            <span className="font-cinzel text-lg sm:text-2xl text-[#ffe082] opacity-70">𑁍</span>
          </div>
          <div className="w-full h-36 border-2 border-[#b37d2a]/50 rounded-xl flex items-center justify-center">
            <span className="font-cinzel text-2xl sm:text-4xl text-[#ffe082] opacity-70">☸</span>
          </div>
          <div className="w-full h-24 border-2 border-[#b37d2a]/50 rounded-xl flex items-center justify-center">
            <span className="font-cinzel text-lg sm:text-2xl text-[#ffe082] opacity-70">𑁍</span>
          </div>

          {/* Brass Door Handle Knocker Ring */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-4 border-[#ffd54f] shadow-lg flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-[#ffb300]" />
          </div>
        </motion.div>

        {/* Right Gate Leaf */}
        <motion.div
          animate={
            isOpen
              ? { rotateY: 82, x: 60, opacity: 0.85 }
              : { rotateY: 0, x: 0, opacity: 1 }
          }
          transition={{ duration: 2.5, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ transformOrigin: 'right center' }}
          className="relative w-1/2 h-full bg-gradient-to-l from-[#2a1205] via-[#481e09] to-[#361506] border-y-4 border-r-4 border-l-2 border-[#b37d2a] rounded-r-2xl shadow-[0_15px_40px_rgba(0,0,0,0.9)] flex flex-col justify-around p-4 sm:p-6 overflow-hidden"
        >
          {/* Ancient Carved Wood Motifs & Brass Studs */}
          <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] bg-[size:24px_24px] opacity-15 pointer-events-none" />

          <div className="w-full h-24 border-2 border-[#b37d2a]/50 rounded-xl flex items-center justify-center">
            <span className="font-cinzel text-lg sm:text-2xl text-[#ffe082] opacity-70">𑁍</span>
          </div>
          <div className="w-full h-36 border-2 border-[#b37d2a]/50 rounded-xl flex items-center justify-center">
            <span className="font-cinzel text-2xl sm:text-4xl text-[#ffe082] opacity-70">☸</span>
          </div>
          <div className="w-full h-24 border-2 border-[#b37d2a]/50 rounded-xl flex items-center justify-center">
            <span className="font-cinzel text-lg sm:text-2xl text-[#ffe082] opacity-70">𑁍</span>
          </div>

          {/* Brass Door Handle Knocker Ring */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-4 border-[#ffd54f] shadow-lg flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-[#ffb300]" />
          </div>
        </motion.div>
      </div>

      {/* Prompts and CTA */}
      <div className="relative z-30 text-center mt-6">
        {!isOpen ? (
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1e0f06]/90 border border-[#f5b041] text-[#ffe57f] font-cinzel text-xs sm:text-sm tracking-widest uppercase cursor-pointer box-gold-glow"
          >
            <Sparkles className="w-4 h-4 text-[#ffd54f]" />
            <span>Tap to Open The Royal Palace Gates</span>
            <Sparkles className="w-4 h-4 text-[#ffd54f]" />
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-cinzel text-lg sm:text-xl text-[#fff8b5] gold-glow uppercase tracking-widest"
          >
            Entering The Grand Celebration...
          </motion.p>
        )}
      </div>
    </div>
  );
};

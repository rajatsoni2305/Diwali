import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Coffee, Eye, Heart, Flame, X } from 'lucide-react';
import { soundEffects } from '../../services/soundEffects';

interface SceneProps {
  onNext: () => void;
}

const ORB_POEM_LINES = [
  'Tum khubsurat jese Chand lagti ho',
  'Tum nadan lekin pyari behisab lagti ho',
  'Ab ye kanch ka tukta batyega tumhe tumhari khubsurati',
  'Zara meri ankho se pucho tum kitni lajawab lagti ho',
];

export const Scene16MemoryRoom: React.FC<SceneProps> = ({ onNext }) => {
  const [selectedDiscovery, setSelectedDiscovery] = useState<number | null>(null);
  const [showOrbParchment, setShowOrbParchment] = useState<boolean>(false);
  const [orbPoemStage, setOrbPoemStage] = useState<number>(0);

  // When Orb is tapped, trigger sound and sequential line reveal on antique parchment
  const handleTapOrb = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEffects.playDiyaIgnite(1.3);
    setShowOrbParchment(true);
    setOrbPoemStage(0);
  };

  useEffect(() => {
    if (!showOrbParchment) return;

    const t1 = setTimeout(() => setOrbPoemStage(1), 900);
    const t2 = setTimeout(() => setOrbPoemStage(2), 2700);
    const t3 = setTimeout(() => setOrbPoemStage(3), 4500);
    const t4 = setTimeout(() => setOrbPoemStage(4), 6300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [showOrbParchment]);

  return (
    <div className="relative w-full h-full min-h-screen bg-[#0a0603] flex flex-col items-center justify-between px-3 sm:px-6 py-6 sm:py-8 select-none overflow-x-hidden">
      {/* Background Palace Chamber Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(85,45,15,0.4)_0%,rgba(10,6,3,1)_85%)] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-xl mt-2 sm:mt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e1006]/85 border border-[#d4af37]/40 text-[#f5b041] text-xs font-cinzel tracking-widest uppercase mb-2">
          <Eye className="w-3.5 h-3.5 text-[#ffd54f]" />
          <span>The Four Royal Discoveries</span>
          <Eye className="w-3.5 h-3.5 text-[#ffd54f]" />
        </div>
        <h2 className="font-cinzel text-xl sm:text-3xl text-[#ffe57f] gold-glow tracking-wider font-semibold">
          THE MEMORY ROOM
        </h2>
        <p className="font-marcellus text-xs sm:text-sm text-[#cca770] mt-1">
          Moments etched in time, preserved in the royal palace archives.
        </p>
      </div>

      {/* Four Discoveries Grid */}
      <div className="relative z-10 w-full max-w-5xl my-auto py-4 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 px-1">
        
        {/* DISCOVERY 01: The Sacred Reflection (Glowing Golden Magical Orb & Poem Reveal Only) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="relative rounded-3xl p-5 sm:p-6 bg-[#160e06]/85 backdrop-blur-md border-2 border-[#f5b041]/60 shadow-[0_15px_35px_rgba(0,0,0,0.85)] flex flex-col items-center text-center group hover:border-[#ffd54f] transition-all"
        >
          {/* Tag */}
          <div className="w-full flex items-center justify-between text-xs font-cinzel text-[#d4af37] tracking-wider uppercase mb-3">
            <span className="text-[#f5b041] font-bold">Discovery 01</span>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#f5b041]" />
              <span>A Sacred Reflection</span>
            </div>
          </div>

          {/* Cinematic Celestial Golden Chamber with Centered Interactive Orb */}
          <div className="w-full h-48 sm:h-56 rounded-2xl bg-gradient-to-b from-[#2a1708] to-[#120803] border border-[#d4af37]/40 flex flex-col items-center justify-center p-3 relative overflow-hidden shadow-inner">
            {/* Ambient Golden Radial Light */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,179,0,0.2)_0%,transparent_70%)] pointer-events-none" />

            {/* Subtle Sacred Arch Geometry */}
            <svg viewBox="0 0 160 120" className="w-40 h-32 text-[#d4af37]/25 absolute top-2 pointer-events-none" fill="none" stroke="currentColor">
              <path d="M20,110 L20,60 Q80,10 140,60 L140,110" strokeWidth="1.5" />
              <path d="M30,110 L30,65 Q80,22 130,65 L130,110" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="80" cy="50" r="12" strokeWidth="1" opacity="0.4" />
            </svg>

            {/* Interactive Centered Glowing Golden Magical Orb */}
            <motion.div
              onClick={handleTapOrb}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-20 cursor-pointer flex flex-col items-center my-auto"
            >
              <div className="relative flex items-center justify-center">
                {/* Pulsing radiance halo */}
                <motion.div
                  animate={{
                    scale: [1, 1.45, 1],
                    opacity: [0.5, 0.9, 0.5],
                  }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-[#ffd700] via-[#ff9800] to-[#ff6f00] blur-lg"
                />
                {/* The Golden Orb Crystal */}
                <div className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#ff8f00] via-[#ffd54f] to-[#ffffff] shadow-[0_0_30px_#ffd700] border-2 border-[#fff9c4] flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-[#7a4816] animate-spin" style={{ animationDuration: '9s' }} />
                </div>
              </div>
              <span className="font-cinzel text-xs text-[#ffe57f] font-bold tracking-widest mt-3 bg-black/70 px-3.5 py-1 rounded-full border border-[#d4af37]/60 shadow-lg">
                TAP THE GOLDEN ORB ✨
              </span>
            </motion.div>
          </div>

          {/* Caption */}
          <p className="mt-3 font-marcellus text-xs sm:text-sm text-[#f5dfb8] leading-relaxed italic">
            "Touch the sacred light to reveal words written from the heart."
          </p>
        </motion.div>

        {/* DISCOVERY 02: The Café Gathering (Unchanged) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="relative rounded-3xl p-5 sm:p-6 bg-[#160e06]/85 backdrop-blur-md border-2 border-[#b37d2a]/50 shadow-[0_15px_35px_rgba(0,0,0,0.8)] flex flex-col items-center text-center group hover:border-[#ffd54f] transition-all"
        >
          {/* Tag */}
          <div className="w-full flex items-center justify-between text-xs font-cinzel text-[#d4af37] tracking-wider uppercase mb-3">
            <span className="text-[#d4af37]">Discovery 02</span>
            <div className="flex items-center gap-1.5">
              <Coffee className="w-4 h-4 text-[#f5b041]" />
              <span>The Café Gathering</span>
            </div>
          </div>

          {/* Steaming Coffee Mugs Vector */}
          <div className="w-full h-48 sm:h-56 rounded-2xl bg-gradient-to-b from-[#2a1708] to-[#120803] border border-[#d4af37]/30 flex flex-col items-center justify-center p-3 relative overflow-hidden shadow-inner">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-[#ffb300]/15 blur-2xl pointer-events-none" />

            <svg viewBox="0 0 160 120" className="w-32 h-24 text-[#ffd54f]" fill="none" stroke="currentColor">
              <path d="M40,55 L44,95 C44,102 54,106 64,106 C74,106 84,102 84,95 L88,55 Z" fill="#3a1b08" stroke="#ffb300" strokeWidth="2.5" />
              <path d="M86,65 Q102,65 100,82 Q98,92 84,90" stroke="#ffb300" strokeWidth="2.5" fill="none" />
              <path d="M75,55 L79,95 C79,102 89,106 99,106 C109,106 119,102 119,95 L123,55 Z" fill="#2d1405" stroke="#ffe082" strokeWidth="2.5" />
              <path d="M121,65 Q137,65 135,82 Q133,92 119,90" stroke="#ffe082" strokeWidth="2.5" fill="none" />
              <path d="M60,45 Q55,30 65,18 Q75,6 60,0" stroke="#ffcc80" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />
              <path d="M98,45 Q105,30 95,18 Q85,6 100,0" stroke="#ffcc80" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />
            </svg>
            <div className="w-4/5 h-1 bg-[#b37d2a]/40 rounded-full mt-2" />
          </div>

          {/* Exact Caption */}
          <p className="mt-3 font-marcellus text-xs sm:text-sm text-[#f5dfb8] leading-relaxed italic">
            "Some ordinary moments become special simply because of the people we share them with."
          </p>
        </motion.div>

        {/* DISCOVERY 03: The Festive Laughter (Unchanged) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="relative rounded-3xl p-5 sm:p-6 bg-[#160e06]/85 backdrop-blur-md border-2 border-[#b37d2a]/50 shadow-[0_15px_35px_rgba(0,0,0,0.8)] flex flex-col items-center text-center group hover:border-[#ffd54f] transition-all"
        >
          <div className="w-full flex items-center justify-between text-xs font-cinzel text-[#d4af37] tracking-wider uppercase mb-3">
            <span className="text-[#d4af37]">Discovery 03</span>
            <div className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-[#f5b041]" />
              <span>Festive Laughter</span>
            </div>
          </div>

          <div className="w-full h-44 sm:h-48 rounded-2xl bg-gradient-to-b from-[#2a1708] to-[#120803] border border-[#d4af37]/30 flex flex-col items-center justify-center p-3 relative overflow-hidden shadow-inner">
            <div className="text-3xl sm:text-4xl text-[#ffd54f] mb-2 animate-bounce">
              ✨ 😌 ✨
            </div>
            <div className="font-cinzel text-xs text-[#ffe082] tracking-widest uppercase">
              Endless Festive Mischief
            </div>
          </div>

          <p className="mt-3 font-marcellus text-xs sm:text-sm text-[#f5dfb8] leading-relaxed italic">
            "Laughter that turns ordinary evenings into golden stories."
          </p>
        </motion.div>

        {/* DISCOVERY 04: The Sacred Glow (Unchanged) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="relative rounded-3xl p-5 sm:p-6 bg-[#160e06]/85 backdrop-blur-md border-2 border-[#b37d2a]/50 shadow-[0_15px_35px_rgba(0,0,0,0.8)] flex flex-col items-center text-center group hover:border-[#ffd54f] transition-all"
        >
          <div className="w-full flex items-center justify-between text-xs font-cinzel text-[#d4af37] tracking-wider uppercase mb-3">
            <span className="text-[#d4af37]">Discovery 04</span>
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-[#f5b041]" />
              <span>The Sacred Glow</span>
            </div>
          </div>

          <div className="w-full h-44 sm:h-48 rounded-2xl bg-gradient-to-b from-[#2a1708] to-[#120803] border border-[#d4af37]/30 flex flex-col items-center justify-center p-3 relative overflow-hidden shadow-inner">
            <div className="w-6 h-10 bg-gradient-to-t from-[#ff6f00] via-[#ffb300] to-[#fffde7] rounded-full blur-[0.4px] shadow-[0_0_20px_#ff9800] animate-diya-flame" />
            <div className="w-14 h-4 bg-gradient-to-r from-[#5d2b10] via-[#8d401a] to-[#4e220b] rounded-b-full border-t border-[#c67d38] -mt-1" />
          </div>

          <p className="mt-3 font-marcellus text-xs sm:text-sm text-[#f5dfb8] leading-relaxed italic">
            "A bond illuminated by faith, warmth, and quiet care."
          </p>
        </motion.div>

      </div>

      {/* Navigation Footer */}
      <div className="relative z-10 w-full max-w-md pb-4 flex items-center justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#b37d2a] via-[#f5b041] to-[#b37d2a] text-[#0d0702] font-cinzel text-xs sm:text-sm font-bold tracking-[0.2em] uppercase box-gold-glow-active transition-all cursor-pointer flex items-center gap-3"
        >
          <span>Continue The Quest</span>
          <ArrowRight className="w-4 h-4 text-[#0d0702]" />
        </motion.button>
      </div>

      {/* Interactive Antique Parchment Modal for Discovery 01 Orb Tap */}
      <AnimatePresence>
        {showOrbParchment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.88, y: 25 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.88, y: 25 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative w-full max-w-lg rounded-3xl p-6 sm:p-10 parchment-bg border-4 border-[#b37d2a] shadow-[0_0_70px_rgba(255,215,0,0.4),0_20px_50px_rgba(0,0,0,0.95)] text-[#2a1705] overflow-hidden"
            >
              {/* Ornate Gold Filigree Corners */}
              <div className="absolute top-3 left-3 text-[#b37d2a] text-lg font-cinzel">❧</div>
              <div className="absolute top-3 right-3 text-[#b37d2a] text-lg font-cinzel">☙</div>
              <div className="absolute bottom-3 left-3 text-[#b37d2a] text-lg font-cinzel">❧</div>
              <div className="absolute bottom-3 right-3 text-[#b37d2a] text-lg font-cinzel">☙</div>

              {/* Inner Filigree Border */}
              <div className="absolute inset-3 border border-[#b37d2a]/40 rounded-2xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setShowOrbParchment(false)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#1b0e06]/10 hover:bg-[#1b0e06]/20 border border-[#b37d2a]/40 flex items-center justify-center text-[#7a4816] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 text-[#8b5a1b] font-cinzel text-xs uppercase tracking-[0.25em]">
                  <Sparkles className="w-3.5 h-3.5 text-[#b37d2a]" />
                  <span>The Whispers of The Orb</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#b37d2a]" />
                </div>
                <h3 className="font-cinzel text-lg sm:text-xl text-[#2b1406] font-bold tracking-wider mt-1">
                  A Secret Verse for Tanisha
                </h3>
                <div className="w-24 h-0.5 bg-[#b37d2a]/50 mx-auto mt-2" />
              </div>

              {/* Sequential 4-Line Poem Reveal */}
              <div className="space-y-4 sm:space-y-5 text-center min-h-[220px] flex flex-col justify-center my-4">
                {ORB_POEM_LINES.map((line, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                    animate={
                      orbPoemStage > idx
                        ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                        : { opacity: 0 }
                    }
                    transition={{ duration: 1.3, ease: 'easeOut' }}
                    className={`font-kalam text-lg sm:text-2xl leading-relaxed tracking-wide ${
                      idx === 3
                        ? 'text-[#851818] font-bold text-xl sm:text-2xl'
                        : 'text-[#361a07]'
                    }`}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              {/* Dismiss / Return Button */}
              <div className="mt-6 pt-3 flex justify-center border-t border-[#b37d2a]/20">
                <button
                  onClick={() => setShowOrbParchment(false)}
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-[#8b5a1b] via-[#c68c35] to-[#8b5a1b] text-[#fbf7ee] font-cinzel text-xs font-bold tracking-[0.15em] uppercase shadow-md hover:brightness-110 transition-all cursor-pointer"
                >
                  Return to Gallery
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

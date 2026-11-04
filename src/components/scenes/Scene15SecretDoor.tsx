
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { soundEffects } from '../../services/soundEffects';

interface SceneProps {
  onNext: () => void;
}

const SECRET_SHAYARI_LINES = [
  'Nazar ko,',
  'Nazar ki,',
  'Nazar na lage,',
  'Koi achha bhi is kadar na lage,',
  '"Tujhe dekha hai is nazar se,',
  'Jis nazar se tujhe nazar na lage."',
];

export const Scene15SecretDoor: React.FC<SceneProps> = ({ onNext }) => {
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [revealedLines, setRevealedLines] = useState<number>(0);
  const [canProceed, setCanProceed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowPrompt(true), 1000);
    return () => clearTimeout(t);
  }, []);

  const handleOpenDoor = () => {
    if (isDoorOpen) return;

    setIsDoorOpen(true);
    soundEffects.playDoorOpen();

    // Reveal all six shayari lines sequentially.
    const revealTimers = SECRET_SHAYARI_LINES.map((_, index) =>
      setTimeout(() => setRevealedLines(index + 1), 1600 + index * 1400)
    );

    // Show Continue only after all six lines have appeared.
    const continueTimer = setTimeout(() => {
      setCanProceed(true);
    }, 10200);
  };

  return (
    <div className="relative w-full h-full min-h-screen bg-[#070402] flex flex-col items-center justify-center px-4 py-8 select-none overflow-hidden">
      {/* Background warm palace glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(80,45,15,0.45)_0%,rgba(7,4,2,1)_85%)] pointer-events-none" />

      {/* Hanging marigold flower garlands framing top */}
      <div className="absolute top-0 inset-x-0 h-16 sm:h-20 pointer-events-none z-30 flex justify-around">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center -space-y-1">
            <div className="w-0.5 h-6 bg-[#3d2105]" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#ff6f00] shadow-sm" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#ffb300]" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#ffd54f]" />
          </div>
        ))}
      </div>

      {/* Before Opening: Closed Door View */}
      {!isDoorOpen ? (
        <div className="relative z-20 flex flex-col items-center max-w-lg w-full">
          {/* Header Text */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={showPrompt ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-6"
          >
            <p className="font-marcellus text-base sm:text-xl text-[#f3dfb5] tracking-wide mb-1">
              A little surprise is waiting inside...
            </p>
            <span className="font-cinzel text-xs text-[#d4af37] tracking-[0.25em] uppercase font-bold animate-pulse">
              TAP TO OPEN
            </span>
          </motion.div>

          {/* Interactive Tap Door Target */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleOpenDoor}
            className="relative w-72 sm:w-84 h-[380px] sm:h-[440px] rounded-t-full bg-gradient-to-b from-[#2a1306] via-[#1a0a03] to-[#120602] border-4 border-[#b37d2a] shadow-[0_0_60px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.3)] cursor-pointer flex p-2 overflow-hidden"
          >
            {/* Left Door Panel */}
            <div className="w-1/2 h-full border-r-2 border-[#b37d2a]/60 bg-gradient-to-r from-[#3a1b09] to-[#241005] p-3 flex flex-col justify-around rounded-tl-full">
              <div className="w-full h-16 border border-[#b37d2a]/40 rounded-t-full flex items-center justify-center">
                <span className="text-sm text-[#ffd54f]">⚜</span>
              </div>
              <div className="w-full h-24 border border-[#b37d2a]/40 rounded-lg flex items-center justify-center">
                <span className="text-xl text-[#ffd54f]">𑁍</span>
              </div>
              <div className="w-full h-16 border border-[#b37d2a]/40 rounded-lg flex items-center justify-center">
                <span className="text-sm text-[#ffd54f]">⚜</span>
              </div>
              {/* Brass Ring */}
              <div className="self-end mr-1 w-6 h-6 rounded-full border-2 border-[#ffd54f] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#ffb300]" />
              </div>
            </div>

            {/* Right Door Panel */}
            <div className="w-1/2 h-full border-l-2 border-[#b37d2a]/60 bg-gradient-to-l from-[#3a1b09] to-[#241005] p-3 flex flex-col justify-around rounded-tr-full">
              <div className="w-full h-16 border border-[#b37d2a]/40 rounded-t-full flex items-center justify-center">
                <span className="text-sm text-[#ffd54f]">⚜</span>
              </div>
              <div className="w-full h-24 border border-[#b37d2a]/40 rounded-lg flex items-center justify-center">
                <span className="text-xl text-[#ffd54f]">𑁍</span>
              </div>
              <div className="w-full h-16 border border-[#b37d2a]/40 rounded-lg flex items-center justify-center">
                <span className="text-sm text-[#ffd54f]">⚜</span>
              </div>
              {/* Brass Ring */}
              <div className="self-start ml-1 w-6 h-6 rounded-full border-2 border-[#ffd54f] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#ffb300]" />
              </div>
            </div>

            {/* Flanking Small Earthen Diyas at doorstep */}
            <div className="absolute bottom-2 left-4 flex flex-col items-center">
              <div className="w-3 h-5 bg-gradient-to-t from-[#ff6f00] to-[#fffde7] rounded-full blur-[0.3px] shadow-[0_0_10px_#ff9800] animate-diya-flame" />
              <div className="w-8 h-3 bg-[#6d2f10] rounded-b-full -mt-1" />
            </div>
            <div className="absolute bottom-2 right-4 flex flex-col items-center">
              <div className="w-3 h-5 bg-gradient-to-t from-[#ff6f00] to-[#fffde7] rounded-full blur-[0.3px] shadow-[0_0_10px_#ff9800] animate-diya-flame" />
              <div className="w-8 h-3 bg-[#6d2f10] rounded-b-full -mt-1" />
            </div>
          </motion.div>
        </div>
      ) : (
        /* After Opening: Antique Ivory Parchment Room */
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="relative z-20 max-w-xl w-full flex flex-col items-center"
        >
          {/* Antique Ivory Parchment Scroll */}
          <div className="relative w-full rounded-3xl p-6 sm:p-10 parchment-bg border-4 border-[#b37d2a] shadow-[0_0_70px_rgba(255,215,0,0.35),0_15px_40px_rgba(0,0,0,0.9)] text-[#2a1705] overflow-hidden">
            {/* Ornate Gold Corner Filigree */}
            <div className="absolute top-3 left-3 text-[#b37d2a] text-lg font-cinzel">❧</div>
            <div className="absolute top-3 right-3 text-[#b37d2a] text-lg font-cinzel">☙</div>
            <div className="absolute bottom-3 left-3 text-[#b37d2a] text-lg font-cinzel">❧</div>
            <div className="absolute bottom-3 right-3 text-[#b37d2a] text-lg font-cinzel">☙</div>

            {/* Inner Gold Border */}
            <div className="absolute inset-3 border border-[#b37d2a]/40 rounded-2xl pointer-events-none" />

            {/* Floral Rose Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-8 pointer-events-none">
              <span className="text-9xl text-[#b37d2a]">🌹</span>
            </div>

            {/* Parchment Title Header */}
            <div className="relative z-10 text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2 text-[#8b5a1b] font-cinzel text-xs uppercase tracking-[0.25em]">
                <Sparkles className="w-3.5 h-3.5 text-[#b37d2a]" />
                <span>The Secret Farman</span>
                <Sparkles className="w-3.5 h-3.5 text-[#b37d2a]" />
              </div>
              <div className="w-24 h-0.5 bg-[#b37d2a]/50 mx-auto mt-2" />
            </div>

            {/* Six-Line Shayari: Sequential Reveal */}
            <div className="relative z-10 space-y-3 sm:space-y-4 text-center min-h-[250px] flex flex-col justify-center">
              {SECRET_SHAYARI_LINES.map((line, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
                  animate={
                    revealedLines > idx
                      ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                      : { opacity: 0 }
                  }
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className={`font-kalam text-lg sm:text-xl md:text-2xl leading-relaxed tracking-wide ${
                    idx === 5
                      ? 'text-[#851818] font-bold'
                      : 'text-[#361a07]'
                  }`}
                >
                  {line}
                </motion.p>
              ))}
            </div>

            {/* Continue Button */}
            <div className="relative z-10 mt-6 sm:mt-8 pt-4 flex justify-center min-h-[50px]">
              {canProceed && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onNext}
                  className="px-8 py-2.5 rounded-full bg-gradient-to-r from-[#8b5a1b] via-[#c68c35] to-[#8b5a1b] text-[#fbf7ee] font-cinzel text-xs font-bold tracking-[0.2em] uppercase shadow-lg shadow-black/30 hover:brightness-110 transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>CONTINUE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

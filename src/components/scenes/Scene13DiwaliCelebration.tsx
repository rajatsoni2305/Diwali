import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, Flame } from 'lucide-react';
import { soundEffects } from '../../services/soundEffects';

interface SceneProps {
  onNext: () => void;
}

export const Scene13DiwaliCelebration: React.FC<SceneProps> = ({ onNext }) => {
  useEffect(() => {
    soundEffects.playFireworkBoom();

    // Trigger golden celebratory confetti burst
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#ffd700', '#ff9800', '#ff6f00', '#fff8e1', '#d4af37'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  return (
    <div className="relative w-full h-full min-h-screen bg-[#0d0702] flex flex-col items-center justify-between px-4 py-8 select-none overflow-hidden">
      {/* Saffron & Deep Night Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1c0c04] via-[#2f1406] to-[#0c0502] pointer-events-none" />

      {/* Floating lanterns in the far sky */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: '15%', y: '25%', scale: 0.6, delay: 0 },
          { x: '80%', y: '18%', scale: 0.8, delay: 1 },
          { x: '45%', y: '12%', scale: 0.5, delay: 2 },
          { x: '68%', y: '28%', scale: 0.7, delay: 1.5 },
          { x: '25%', y: '35%', scale: 0.55, delay: 0.5 },
        ].map((lantern, idx) => (
          <motion.div
            key={idx}
            animate={{
              y: ['0px', '-25px', '0px'],
              x: ['0px', '10px', '0px'],
              opacity: [0.6, 0.95, 0.6],
            }}
            transition={{
              duration: 4 + idx,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: lantern.delay,
            }}
            style={{ left: lantern.x, top: lantern.y, transform: `scale(${lantern.scale})` }}
            className="absolute w-8 h-10 rounded-t-lg rounded-b-sm bg-gradient-to-t from-[#ff6f00] via-[#ffb300] to-[#fffde7] shadow-[0_0_20px_#ff9800]"
          />
        ))}
      </div>

      {/* Top Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="relative z-10 text-center mt-4 max-w-xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#201004]/80 border border-[#d4af37]/40 text-[#ffd54f] text-xs font-cinzel tracking-widest uppercase mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#ffb300]" />
          <span>The Grand Deepotsav of Ayodhya</span>
          <Sparkles className="w-3.5 h-3.5 text-[#ffb300]" />
        </div>
        <h1 className="font-cinzel-dec text-2xl sm:text-4xl text-[#fff3b0] gold-glow tracking-wider">
          THE FESTIVAL OF LIGHTS
        </h1>
      </motion.div>

      {/* Central Visual: Luminous Sacred Rangoli with Diyas */}
      <div className="relative z-10 my-auto flex flex-col items-center">
        {/* Glowing Mandalas */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
          {/* Animated decorative rangoli rings */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#ffb300]/40 animate-spin" style={{ animationDuration: '40s' }} />
          <div className="absolute inset-4 rounded-full border border-[#ff6f00]/30 animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />

          {/* Rangoli Petal Pattern SVG */}
          <svg viewBox="0 0 200 200" className="w-full h-full text-[#ffd54f]/70 filter drop-shadow-[0_0_15px_rgba(255,179,0,0.5)]">
            <g transform="translate(100,100)">
              {Array.from({ length: 8 }).map((_, i) => (
                <g key={i} transform={`rotate(${i * 45})`}>
                  <path d="M 0 0 C 15 -30 35 -30 0 -80 C -35 -30 -15 -30 0 0" fill="#ff8f00" fillOpacity="0.4" stroke="#ffe082" strokeWidth="1" />
                  <circle cx="0" cy="-60" r="4" fill="#fff8e1" />
                </g>
              ))}
            </g>
          </svg>

          {/* Central King Diya */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-8 h-12 bg-gradient-to-t from-[#e65100] via-[#ffb300] to-[#fffde7] rounded-full blur-[0.5px] shadow-[0_0_30px_#ff9800] animate-diya-flame" />
            <div className="w-16 h-6 bg-gradient-to-r from-[#5d2b10] via-[#8d401a] to-[#4e220b] rounded-b-full border-t border-[#c67d38] -mt-2" />
          </div>
        </div>
      </div>

      {/* Bottom Narrative Card & Button */}
      <div className="relative z-10 max-w-2xl w-full text-center mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="p-5 sm:p-7 rounded-3xl bg-[#140803]/85 backdrop-blur-md border border-[#d4af37]/40 shadow-[0_0_50px_rgba(0,0,0,0.9)]"
        >
          <p className="font-marcellus text-base sm:text-lg text-[#ffecb3] leading-relaxed mb-5">
            Every doorway shines with marigolds and glowing lamps. But before the palace doors unveil their secret, a special ritual awaits.
          </p>

          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#b37d2a] via-[#f5b041] to-[#b37d2a] text-[#0d0702] font-cinzel text-xs sm:text-sm font-bold tracking-[0.2em] uppercase box-gold-glow-active transition-all cursor-pointer flex items-center gap-3"
            >
              <Flame className="w-4 h-4 text-[#0d0702]" />
              <span>Begin The 14 Diya Challenge</span>
              <ArrowRight className="w-4 h-4 text-[#0d0702]" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

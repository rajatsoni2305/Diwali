import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Waves } from 'lucide-react';

interface SceneProps {
  onNext: () => void;
}

export const Scene8FaithDevotion: React.FC<SceneProps> = ({ onNext }) => {
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 800);
    const t2 = setTimeout(() => setStage(2), 3400);
    const t3 = setTimeout(() => setStage(3), 5200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-screen bg-[#040814] flex flex-col items-center justify-center px-4 sm:px-6 py-12 select-none overflow-hidden">
      {/* Deep Ocean & Starlit Celestial Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(15,35,80,0.5)_0%,rgba(4,8,20,1)_85%)] pointer-events-none" />

      {/* Full Moon & Celestial Glow */}
      <div className="absolute top-12 sm:top-16 w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-gradient-to-b from-[#fff8e1] to-[#ffd54f] blur-xs opacity-90 shadow-[0_0_80px_rgba(255,224,130,0.6)] flex items-center justify-center">
        {/* Respectful silhouette of Hanumanji soaring across the ocean with devotion */}
        <svg viewBox="0 0 100 100" className="w-20 h-20 text-[#101c38] opacity-85" fill="currentColor">
          <path d="M50 20 C55 20 60 25 60 30 C60 35 55 40 50 40 C45 40 40 35 40 30 C40 25 45 20 50 20 Z M46 42 L54 42 L66 65 L58 75 L52 56 L48 76 L40 68 Z M62 38 Q75 42 85 30 L80 50 Z" />
        </svg>
      </div>

      {/* Ocean Waves SVG layer */}
      <div className="absolute inset-x-0 bottom-0 h-44 pointer-events-none opacity-40">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full text-[#0a1c3d]" fill="currentColor">
          <path d="M0,40 C150,90 350,-20 500,40 C650,100 900,10 1200,50 L1200,120 L0,120 Z" />
        </svg>
      </div>

      {/* Glass Card */}
      <div className="relative z-10 max-w-2xl w-full text-center p-6 sm:p-12 rounded-3xl bg-[#09142b]/75 backdrop-blur-md border border-[#3b82f6]/30 shadow-[0_0_60px_rgba(0,0,0,0.9)] mt-24 sm:mt-28">
        {/* Stage Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0d234d] border border-[#60a5fa]/30 text-[#93c5fd] text-xs font-cinzel tracking-widest uppercase mb-8">
          <Waves className="w-3.5 h-3.5 text-[#60a5fa]" />
          <span>Stage II — The Mahasagar of Devotion</span>
          <Waves className="w-3.5 h-3.5 text-[#60a5fa]" />
        </div>

        {/* Message 1 */}
        <div className="space-y-6 min-h-[160px] flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
            animate={stage >= 1 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="font-cinzel text-lg sm:text-2xl md:text-3xl text-[#e0f2fe] leading-relaxed tracking-wide drop-shadow-[0_0_20px_rgba(96,165,250,0.5)]"
          >
            "True devotion is not just about words. It is about loyalty, faith, and the strength to keep going."
          </motion.p>

          {/* Message 2 */}
          <motion.p
            initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
            animate={stage >= 2 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="font-marcellus text-base sm:text-xl text-[#bae6fd] leading-relaxed italic"
          >
            "Be sincere in your efforts. Stay loyal to your values, and do not give up when the journey becomes difficult."
          </motion.p>
        </div>

        {/* Continue Button */}
        <div className="mt-10 pt-4 flex justify-center min-h-[50px]">
          {stage >= 3 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="px-7 py-3 rounded-full bg-gradient-to-r from-[#1d4ed8] via-[#3b82f6] to-[#1e40af] text-white font-cinzel text-xs sm:text-sm font-bold tracking-widest uppercase shadow-[0_0_25px_rgba(59,130,246,0.5)] flex items-center gap-2 cursor-pointer border border-[#bfdbfe]/40"
            >
              <span>Bridge the Ocean to Ram Setu</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

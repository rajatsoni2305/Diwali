import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Leaf, Shield } from 'lucide-react';

interface SceneProps {
  onNext: () => void;
}

export const Scene7DharmaCourage: React.FC<SceneProps> = ({ onNext }) => {
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
    <div className="relative w-full h-full min-h-screen bg-[#060a06] flex flex-col items-center justify-center px-4 sm:px-6 py-12 select-none overflow-hidden">
      {/* Mystical Dandakaranya Forest Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(25,50,25,0.45)_0%,rgba(6,10,6,1)_85%)] pointer-events-none" />

      {/* Atmospheric God-Rays (Sunbeams through canopy) */}
      <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-[600px] h-[800px] bg-gradient-to-b from-[#ffd700]/30 via-[#2e7d32]/10 to-transparent rotate-12 blur-3xl" />
        <div className="absolute -top-20 right-1/3 w-[400px] h-[700px] bg-gradient-to-b from-[#ffe57f]/25 to-transparent -rotate-15 blur-2xl" />
      </div>

      {/* Ancient Tree Silhouettes */}
      <div className="absolute inset-x-0 bottom-0 h-64 pointer-events-none opacity-40 flex justify-between items-end">
        <svg viewBox="0 0 1000 300" className="w-full h-full object-cover text-[#0d1f0d]" fill="currentColor">
          <path d="M0,300 L0,180 Q80,140 120,190 T240,160 Q300,90 350,180 T500,200 Q620,110 700,200 T850,150 Q920,80 1000,170 L1000,300 Z" />
        </svg>
      </div>

      {/* Content Card */}
      <div className="relative z-10 max-w-2xl w-full text-center p-6 sm:p-12 rounded-3xl bg-[#0a120a]/75 backdrop-blur-md border border-[#4caf50]/30 shadow-[0_0_60px_rgba(0,0,0,0.85)]">
        {/* Stage Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#132213] border border-[#81c784]/30 text-[#a5d6a7] text-xs font-cinzel tracking-widest uppercase mb-8">
          <Leaf className="w-3.5 h-3.5 text-[#81c784]" />
          <span>Stage I — Dandakaranya</span>
          <Shield className="w-3.5 h-3.5 text-[#81c784]" />
        </div>

        {/* Message 1 */}
        <div className="space-y-6 min-h-[160px] flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
            animate={stage >= 1 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="font-cinzel text-lg sm:text-2xl md:text-3xl text-[#e8f5e9] leading-relaxed tracking-wide gold-glow"
          >
            "Dharma is not merely knowing what is right. It is having the courage to stand by what is right."
          </motion.p>

          {/* Message 2 */}
          <motion.p
            initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
            animate={stage >= 2 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="font-marcellus text-base sm:text-xl text-[#c8e6c9] leading-relaxed italic"
          >
            "Choose what is right, even when it is not the easiest choice."
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
              className="px-7 py-3 rounded-full bg-gradient-to-r from-[#2e7d32] via-[#43a047] to-[#1b5e20] text-[#f1f8e9] font-cinzel text-xs sm:text-sm font-bold tracking-widest uppercase shadow-[0_0_25px_rgba(76,175,80,0.4)] flex items-center gap-2 cursor-pointer border border-[#a5d6a7]/40"
            >
              <span>Venture to the Ocean</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};


import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Leaf, Shield } from 'lucide-react';

interface SceneProps {
  onNext: () => void;
}

export const Scene7DharmaCourage: React.FC<SceneProps> = ({ onNext }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 800),
      setTimeout(() => setStage(2), 3400),
      setTimeout(() => setStage(3), 5200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative isolate flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#101b17] px-5 py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_15%,rgba(90,125,76,.3),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#0b1511]/20 to-[#07100d]" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 opacity-40">
        <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="h-full w-full">
          <path d="M0 300V180Q70 100 150 180T300 155Q390 55 480 175T650 165Q760 55 850 165T1000 130V300Z" fill="#10291c" />
          <path d="M0 300V240Q150 165 300 245T600 225Q800 150 1000 230V300Z" fill="#09140e" />
        </svg>
      </div>

      <div className="pointer-events-none absolute -left-12 top-16 h-64 w-64 rounded-full bg-[#d3b36c]/10 blur-[90px]" />
      <div className="pointer-events-none absolute -right-16 bottom-20 h-72 w-72 rounded-full bg-[#709c69]/10 blur-[100px]" />

      <div className="relative z-10 w-full max-w-2xl rounded-[28px] border border-[#b8c895]/25 bg-[#14231b]/80 px-6 py-10 text-center shadow-[0_25px_80px_rgba(0,0,0,.5)] backdrop-blur-xl sm:px-12 sm:py-14">
        <div className="mb-9 inline-flex items-center gap-3 rounded-full border border-[#b6ca9a]/30 bg-[#203629] px-4 py-2 text-[10px] uppercase tracking-[.18em] text-[#d1e0b7] sm:text-xs">
          <Leaf className="h-4 w-4" />
          Stage I — Dandakaranya
          <Shield className="h-4 w-4" />
        </div>

        <div className="flex min-h-[190px] flex-col justify-center gap-7">
          <motion.p
            initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
            animate={stage >= 1 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1.5 }}
            className="font-cinzel text-lg leading-relaxed text-[#f0edda] gold-glow sm:text-2xl md:text-3xl"
          >
            "Dharma is not merely knowing what is right. It is having the courage to stand by what is right."
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15, filter: 'blur(7px)' }}
            animate={stage >= 2 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1.5 }}
            className="font-marcellus text-base italic leading-relaxed text-[#cbd9bd] sm:text-xl"
          >
            "Choose what is right, even when it is not the easiest choice."
          </motion.p>
        </div>

        <div className="mt-10 flex min-h-14 justify-center">
          {stage >= 3 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onNext}
              className="flex items-center gap-3 rounded-full border border-[#c3d5ad]/40 bg-gradient-to-r from-[#355c3d] via-[#61865a] to-[#355c3d] px-7 py-3 font-cinzel text-xs font-bold uppercase tracking-widest text-[#f3f2df] shadow-[0_0_30px_rgba(105,160,100,.2)] sm:text-sm"
            >
              Venture to the Ocean
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

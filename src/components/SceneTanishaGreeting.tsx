import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { DiyaIllustration } from './shweta/DiyaIllustration';

export const SceneTanishaGreeting: React.FC<{ onNext: () => void }> = ({ onNext }) => (
  <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-5 py-12 text-center">
    <motion.div initial={{ opacity: 0, y: 22, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1.1 }} className="w-full max-w-xl rounded-[2rem] border border-amber-300/25 bg-gradient-to-b from-[#21152f]/95 via-[#171020]/95 to-[#100a18]/95 p-7 shadow-[0_25px_90px_rgba(0,0,0,.45),0_0_45px_rgba(245,158,11,.08)] backdrop-blur-xl sm:p-11">
      <DiyaIllustration size="lg" showPetioles />
      <div className="mt-5 flex items-center justify-center gap-2 text-xs uppercase tracking-[.28em] text-amber-300/70"><Sparkles size={14}/> A little note for you <Sparkles size={14}/></div>
      <h1 className="mt-4 font-serif text-4xl text-gold-bright sm:text-5xl">Happy Diwali, Tanisha!</h1>
      <div className="mx-auto my-6 h-px w-24 bg-gradient-to-r from-transparent via-amber-300/70 to-transparent"/>
      <p className="font-serif text-xl italic leading-relaxed text-amber-50/90 sm:text-2xl">May this festival bring you peaceful days, genuine smiles, new adventures and countless reasons to feel happy.</p>
      <p className="mt-5 text-sm leading-7 text-amber-100/65">A small festive surprise, made with care. I hope it adds a little extra warmth to your Diwali.</p>
      <button onClick={onNext} className="mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 px-7 py-3 text-sm font-semibold text-[#241326] shadow-[0_0_28px_rgba(245,158,11,.2)]">Continue <ArrowRight size={16}/></button>
    </motion.div>
  </div>
);

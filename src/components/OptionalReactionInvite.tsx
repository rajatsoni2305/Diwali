import React from 'react';
import { motion } from 'motion/react';
import { Camera, ArrowRight, Sparkles } from 'lucide-react';

export const OptionalReactionInvite: React.FC<{ onRecord: () => void; onSkip: () => void }> = ({ onRecord, onSkip }) => (
  <div className="relative z-20 flex min-h-screen items-center justify-center px-5 py-12">
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg rounded-3xl border border-amber-300/25 bg-[#1a1126]/90 p-7 text-center shadow-2xl backdrop-blur-xl sm:p-10">
      <Sparkles className="mx-auto h-7 w-7 text-amber-300"/>
      <p className="mt-4 text-xs uppercase tracking-[.28em] text-amber-300/70">One last little option</p>
      <h2 className="mt-3 font-serif text-3xl text-gold-bright">Would you like to leave a reaction?</h2>
      <p className="mt-4 text-sm leading-7 text-amber-100/70">If you feel comfortable, you can record a short video or voice note. This is completely optional — you can skip it and finish the experience right away.</p>
      <button onClick={onRecord} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 px-6 py-3.5 text-sm font-semibold text-[#241326]"><Camera size={17}/> Record a reaction <ArrowRight size={16}/></button>
      <button onClick={onSkip} className="mt-3 w-full rounded-full border border-amber-300/30 px-6 py-3 text-sm text-amber-100/80 transition hover:bg-amber-300/10">Skip and finish</button>
      <p className="mt-5 text-[11px] text-amber-100/40">Camera and microphone stay off unless you choose to record.</p>
    </motion.div>
  </div>
);

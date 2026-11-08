import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';
import { DiyaIllustration } from './DiyaIllustration';

interface Props { onNext: () => void }
export const SceneDiyaGarden: React.FC<Props> = ({ onNext }) => {
  const [lit, setLit] = useState<boolean[]>([false, false, false, false, false, false, false]);
  const allLit = lit.every(Boolean);
  const toggle = (i: number) => setLit(old => old.map((v, n) => n === i ? !v : v));
  return <div className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-12 text-center">
    <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} className="max-w-xl">
      <Sparkles className="mx-auto mb-4 h-6 w-6 text-amber-300" />
      <p className="text-xs uppercase tracking-[.3em] text-amber-300/70">A little light for you</p>
      <h1 className="mt-3 font-serif text-4xl text-gold-bright sm:text-5xl">The Diya Garden</h1>
      <p className="mt-4 text-sm leading-7 text-amber-100/70">Tap each diya and bring this little corner to life.</p>
    </motion.div>
    <div className="my-10 grid w-full max-w-md grid-cols-4 place-items-center gap-x-3 gap-y-5">
      {lit.map((on,i) => <motion.button key={i} type="button" aria-label={`${on?'Extinguish':'Light'} diya ${i+1}`} onClick={()=>toggle(i)} whileTap={{scale:.9}} className={`rounded-2xl p-2 transition-all ${on?'bg-amber-400/10 shadow-[0_0_28px_rgba(251,191,36,.22)]':'opacity-65 hover:opacity-100'}`}><span className={on?'[filter:drop-shadow(0_0_12px_rgba(251,191,36,.8))]':''}><DiyaIllustration size="sm" showPetioles={false}/></span></motion.button>)}
    </div>
    <p className="mb-6 text-sm text-amber-200/80">{allLit ? 'Every little light is glowing. ✨' : `${lit.filter(Boolean).length} of ${lit.length} diyas lit`}</p>
    <button type="button" onClick={()=>setLit(lit.map(()=>true))} className="mb-3 rounded-full border border-amber-300/40 bg-amber-500/15 px-6 py-2.5 text-sm text-amber-100">Light them all together</button>
    <button type="button" onClick={onNext} className="mt-3 inline-flex items-center gap-2 rounded-full bg-amber-400 px-7 py-3 text-sm font-semibold text-[#241326]">Continue <ArrowRight className="h-4 w-4"/></button>
  </div>;
};

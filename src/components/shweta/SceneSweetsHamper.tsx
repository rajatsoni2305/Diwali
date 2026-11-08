import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Gift, Sparkles } from 'lucide-react';
interface Props { onNext: () => void }
export const SceneSweetsHamper: React.FC<Props> = ({ onNext }) => {
 const [open,setOpen]=useState(false);
 return <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 py-12 text-center">
  <Sparkles className="mb-4 h-6 w-6 text-amber-300"/><p className="text-xs uppercase tracking-[.3em] text-amber-300/70">A festive little treat</p>
  <h1 className="mt-3 font-serif text-4xl text-gold-bright sm:text-5xl">A Box of Sweetness</h1>
  <p className="mt-4 max-w-sm text-sm leading-7 text-amber-100/70">A small festive hamper, wrapped with warm wishes.</p>
  <motion.button type="button" onClick={()=>setOpen(v=>!v)} whileTap={{scale:.97}} className="relative my-12 flex h-48 w-64 flex-col items-center justify-end rounded-b-3xl border-x-2 border-b-2 border-amber-200/60 bg-gradient-to-br from-rose-900 via-fuchsia-950 to-amber-900 p-5 shadow-[0_20px_55px_rgba(0,0,0,.45)]">
   <motion.div animate={{rotateX:open?-115:0,y:open?-18:0}} style={{transformOrigin:'bottom'}} className="absolute -top-5 left-0 right-0 h-16 rounded-t-2xl border-2 border-amber-200/60 bg-gradient-to-r from-amber-700 via-rose-800 to-amber-700"/>
   <div className="mb-3 flex gap-3 text-3xl">🍫 🍬 🍪</div><Gift className="mb-2 h-6 w-6 text-amber-200"/><span className="font-serif text-lg italic text-amber-100">With best wishes</span>
   {open&&<motion.span initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="absolute -top-16 rounded-xl border border-amber-300/30 bg-[#241326] px-4 py-2 text-sm text-amber-100">A little sweetness for your Diwali ✨</motion.span>}
  </motion.button>
  <button type="button" onClick={()=>setOpen(v=>!v)} className="rounded-full border border-amber-300/40 bg-amber-500/15 px-6 py-2.5 text-sm text-amber-100">{open?'Close hamper':'Open your hamper'}</button>
  <button type="button" onClick={onNext} className="mt-5 inline-flex items-center gap-2 rounded-full bg-amber-400 px-7 py-3 text-sm font-semibold text-[#241326]">Continue <ArrowRight className="h-4 w-4"/></button>
 </div>;
};

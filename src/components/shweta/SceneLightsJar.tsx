import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { soundEffects } from '../../services/soundEffects';
interface Props { onNext: () => void }
export const SceneLightsJar: React.FC<Props> = ({ onNext }) => {
 const [glow,setGlow]=useState(false);
 return <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 py-12 text-center">
  <Sparkles className="mb-4 h-6 w-6 text-amber-300"/><p className="text-xs uppercase tracking-[.3em] text-amber-300/70">Little moments of brightness</p>
  <h1 className="mt-3 font-serif text-4xl text-gold-bright sm:text-5xl">A Jar Full of Lights</h1>
  <p className="mt-4 max-w-sm text-sm leading-7 text-amber-100/70">Some lights are tiny, but they make everything feel warmer.</p>
  <motion.button type="button" onClick={()=>{ soundEffects.playDiyaIgnite(1.12); setGlow(v=>!v); }} whileTap={{scale:.97}} className="relative my-10 h-64 w-52 rounded-[3rem_3rem_2.5rem_2.5rem] border-2 border-cyan-100/35 bg-gradient-to-b from-cyan-100/15 via-violet-200/10 to-amber-100/10 shadow-[inset_0_0_35px_rgba(255,255,255,.12)] backdrop-blur-sm">
   <span className="absolute left-8 right-8 top-0 h-5 -translate-y-1/2 rounded-full border border-cyan-100/40 bg-slate-300/20"/>
   {Array.from({length:18},(_,i)=><motion.i key={i} animate={glow?{opacity:[.4,1,.65],scale:[.85,1.25,.9]}:{opacity:.25,scale:.8}} transition={{duration:1.5+i*.04,repeat:glow?Infinity:0,delay:i*.04}} className="absolute h-2.5 w-2.5 rounded-full bg-amber-200 shadow-[0_0_14px_5px_rgba(251,191,36,.75)]" style={{left:`${18+(i*37)%65}%`,top:`${22+(i*23)%65}%`}}/>)}
   <span className="absolute bottom-5 left-0 right-0 font-serif text-lg italic text-amber-100/80">tap to glow</span>
  </motion.button>
  <button type="button" onClick={()=>{ soundEffects.playDiyaIgnite(1.12); setGlow(v=>!v); }} className="rounded-full border border-amber-300/40 bg-amber-500/15 px-6 py-2.5 text-sm text-amber-100">{glow?'Dim the lights':'Switch on the lights'}</button>
  <button type="button" onClick={onNext} className="mt-5 inline-flex items-center gap-2 rounded-full bg-amber-400 px-7 py-3 text-sm font-semibold text-[#241326]">Continue <ArrowRight className="h-4 w-4"/></button>
 </div>;
};

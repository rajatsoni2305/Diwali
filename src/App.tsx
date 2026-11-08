import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Lock } from 'lucide-react';
import { AtmosphereCanvas } from './components/AtmosphereCanvas';
import FestiveDecor from './components/FestiveDecor';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { RecordingIndicator } from './components/recording/RecordingIndicator';
import { sessionService } from './services/sessionService';
import { SceneIntro } from './components/shweta/SceneIntro';
import { SceneLanterns } from './components/shweta/SceneLanterns';
import { SceneFireworks } from './components/shweta/SceneFireworks';
import { SceneDiyaGarden } from './components/shweta/SceneDiyaGarden';
import { SceneLightsJar } from './components/shweta/SceneLightsJar';
import { SceneSweetsHamper } from './components/shweta/SceneSweetsHamper';
import { SceneWishCarried } from './components/shweta/SceneWishCarried';
import { Scene4Shayari } from './components/scenes/Scene4Shayari';
import { Scene16MemoryRoom } from './components/scenes/Scene16MemoryRoom';
import { Scene18FinalGreeting } from './components/scenes/Scene18FinalGreeting';
import { Scene19DigitalKeepsake } from './components/scenes/Scene19DigitalKeepsake';
import { Scene19bReactionRecording } from './components/scenes/Scene19bReactionRecording';
import { Scene20Revisit } from './components/scenes/Scene20Revisit';
import { SceneWishEntry } from './components/scenes/SceneWishEntry';

type Scene = 'intro'|'lanterns'|'lights_jar'|'diya_garden'|'sweets'|'fireworks'|'shayari'|'memory'|'wish'|'wish_carried'|'letter'|'keepsake'|'recording'|'revisit';
const FLOW: Scene[] = ['intro','lanterns','lights_jar','diya_garden','sweets','fireworks','shayari','memory','wish','wish_carried','letter','keepsake','recording','revisit'];
export default function App() {
 const [scene,setScene] = useState<Scene>('intro');
 const [admin,setAdmin] = useState(false);
 const next = () => setScene(current => FLOW[Math.min(FLOW.indexOf(current)+1,FLOW.length-1)]);
 const restart = () => { try { sessionStorage.removeItem('tanisha_diwali_lit_diyas_v1'); } catch {} sessionService.resetSession(); setScene('intro'); };
 const intensity = scene==='fireworks' ? 'celebration' : scene==='intro' ? 'dark' : 'rich';
 return <div className="relative isolate min-h-screen w-full overflow-x-hidden bg-[#10091f] text-[#fdf8f0]">
  <AtmosphereCanvas intensity={intensity} /><FestiveDecor variant={scene==='intro'?'subtle':'full'} /><RecordingIndicator />
  <div className="fixed right-4 top-4 z-[60]"><button onClick={()=>setAdmin(true)} aria-label="Open admin view" title="Admin View" className="rounded-full border border-amber-300/30 bg-[#1c1029]/70 p-2 text-amber-300/70"><Lock className="h-4 w-4"/></button></div>
  <AdminDashboard isOpen={admin} onClose={()=>setAdmin(false)} />
  <main className="relative z-30 min-h-screen w-full"><AnimatePresence mode="wait"><motion.div key={scene} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} transition={{duration:.65}} className="min-h-screen w-full">
   {scene==='intro' && <SceneIntro onBegin={next}/>}
   {scene==='lanterns' && <SceneLanterns onOpenSurprise={next}/>}
   {scene==='lights_jar' && <SceneLightsJar onNext={next}/>}
   {scene==='diya_garden' && <SceneDiyaGarden onNext={next}/>}
   {scene==='sweets' && <SceneSweetsHamper onNext={next}/>}
   {scene==='fireworks' && <SceneFireworks onComplete={next}/>}
   {scene==='shayari' && <Scene4Shayari onNext={next}/>}
   {scene==='memory' && <Scene16MemoryRoom onNext={next}/>}
   {scene==='wish' && <SceneWishEntry onNext={next}/>}
   {scene==='wish_carried' && <SceneWishCarried onContinueToPoem={next}/>}
   {scene==='letter' && <Scene18FinalGreeting onNext={next}/>}
   {scene==='keepsake' && <Scene19DigitalKeepsake onNext={next}/>}
   {scene==='recording' && <Scene19bReactionRecording onNext={next}/>}
   {scene==='revisit' && <Scene20Revisit onRestart={restart}/>}
  </motion.div></AnimatePresence></main>
 </div>;
}

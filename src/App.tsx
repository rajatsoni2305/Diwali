import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Lock } from 'lucide-react';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { RecordingIndicator } from './components/recording/RecordingIndicator';
import { sessionService } from './services/sessionService';
import { SceneId } from './types/scenes';
import { ParticleCanvas } from './components/shweta/ParticleCanvas';
import { AudioPlayer } from './components/shweta/AudioPlayer';
import { SceneIntro } from './components/shweta/SceneIntro';
import { SceneLightsJar } from './components/shweta/SceneLightsJar';
import { SceneDiyaGarden } from './components/shweta/SceneDiyaGarden';
import { SceneSweetsHamper } from './components/shweta/SceneSweetsHamper';
import { SceneFireworksReveal } from './components/SceneFireworksReveal';
import { Scene17WishLantern } from './components/scenes/Scene17WishLantern';
import { Scene18FinalGreeting } from './components/scenes/Scene18FinalGreeting';
import { Scene4Shayari } from './components/scenes/Scene4Shayari';
import { Scene19DigitalKeepsake } from './components/scenes/Scene19DigitalKeepsake';
import { Scene19bReactionRecording } from './components/scenes/Scene19bReactionRecording';
import { Scene20Revisit } from './components/scenes/Scene20Revisit';
import { OptionalReactionInvite } from './components/OptionalReactionInvite';

const SCENE_FLOW: SceneId[] = ['welcome', 'lights_jar', 'diya_garden', 'sweets_hamper', 'fireworks_reveal', 'wish_lantern', 'opening_shayari', 'final_greeting', 'digital_keepsake', 'reaction_invite', 'reaction_recording', 'revisit'];

export default function App() {
  const [currentScene, setCurrentScene] = useState<SceneId>('welcome');
  const [showAdmin, setShowAdmin] = useState(false);
  const goToNextScene = () => {
    const index = SCENE_FLOW.indexOf(currentScene);
    if (index >= 0 && index < SCENE_FLOW.length - 1) setCurrentScene(SCENE_FLOW[index + 1]);
  };
  const handleRestart = () => {
    try { sessionStorage.removeItem('tanisha_diwali_lit_diyas_v1'); } catch {}
    sessionService.resetSession();
    setCurrentScene('welcome');
  };
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [currentScene]);

  return (
    <div className="relative isolate min-h-screen w-full overflow-x-hidden bg-[#10091f] text-[#fdf8f0] selection:bg-amber-500/30">
      <ParticleCanvas density={currentScene === 'wish_lantern' ? 'low' : 'medium'} speed={0.7}/>
      <AudioPlayer />
      <RecordingIndicator />
      <div className="fixed right-4 top-16 z-[60]">
        <button onClick={() => setShowAdmin(true)} title="Admin View" aria-label="Open admin view" className="rounded-full border border-amber-400/20 bg-[#1a1025]/70 p-2 text-amber-300/50 backdrop-blur-md transition hover:border-amber-300/60 hover:text-amber-200"><Lock className="h-3.5 w-3.5"/></button>
      </div>
      <AdminDashboard isOpen={showAdmin} onClose={() => setShowAdmin(false)}/>
      <main className="relative z-10 min-h-screen w-full">
        <AnimatePresence mode="wait">
          <motion.div key={currentScene} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.75 }} className="min-h-screen w-full">
            {currentScene === 'welcome' && <SceneIntro onBegin={goToNextScene}/>}
            {currentScene === 'lights_jar' && <SceneLightsJar onNext={goToNextScene}/>}
            {currentScene === 'diya_garden' && <SceneDiyaGarden onNext={goToNextScene}/>}
            {currentScene === 'sweets_hamper' && <SceneSweetsHamper onNext={goToNextScene}/>}
            {currentScene === 'fireworks_reveal' && <SceneFireworksReveal onNext={goToNextScene}/>}
            {currentScene === 'wish_lantern' && <Scene17WishLantern onNext={goToNextScene}/>}
            {currentScene === 'opening_shayari' && <Scene4Shayari onNext={goToNextScene}/>}
            {currentScene === 'final_greeting' && <Scene18FinalGreeting onNext={goToNextScene}/>}
            {currentScene === 'digital_keepsake' && <Scene19DigitalKeepsake onNext={goToNextScene}/>}
            {currentScene === 'reaction_invite' && <OptionalReactionInvite onRecord={goToNextScene} onSkip={() => setCurrentScene('revisit')}/>}
            {currentScene === 'reaction_recording' && <Scene19bReactionRecording onNext={() => setCurrentScene('revisit')}/>}
            {currentScene === 'revisit' && <Scene20Revisit onRestart={handleRestart}/>}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

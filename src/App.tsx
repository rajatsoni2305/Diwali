/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Lock } from 'lucide-react';
import { SceneId } from './types/scenes';
import { AtmosphereCanvas } from './components/AtmosphereCanvas';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { RecordingConsentModal } from './components/recording/RecordingConsentModal';
import { RecordingIndicator } from './components/recording/RecordingIndicator';
import { sessionService } from './services/sessionService';
import { recordingManager } from './services/recordingManager';

// All Scenes
import { Scene1DarkOpening } from './components/scenes/Scene1DarkOpening';
import { Scene2Rocket } from './components/scenes/Scene2Rocket';
import { Scene3Fireworks } from './components/scenes/Scene3Fireworks';
import { Scene4Shayari } from './components/scenes/Scene4Shayari';
import { Scene5PersonalIntro } from './components/scenes/Scene5PersonalIntro';
import { Scene6JourneyMap } from './components/scenes/Scene6JourneyMap';
import { Scene7DharmaCourage } from './components/scenes/Scene7DharmaCourage';
import { Scene8FaithDevotion } from './components/scenes/Scene8FaithDevotion';
import { Scene9UnityLoyalty } from './components/scenes/Scene9UnityLoyalty';
import { Scene10AyodhyaReveal } from './components/scenes/Scene10AyodhyaReveal';
import { Scene11Homecoming } from './components/scenes/Scene11Homecoming';
import { Scene12RoyalGates } from './components/scenes/Scene12RoyalGates';
import { Scene13DiwaliCelebration } from './components/scenes/Scene13DiwaliCelebration';
import { Scene14DiyaChallenge } from './components/scenes/Scene14DiyaChallenge';
import { Scene15SecretDoor } from './components/scenes/Scene15SecretDoor';
import { Scene16MemoryRoom } from './components/scenes/Scene16MemoryRoom';
import { Scene17WishLantern } from './components/scenes/Scene17WishLantern';
import { Scene18FinalGreeting } from './components/scenes/Scene18FinalGreeting';
import { Scene19DigitalKeepsake } from './components/scenes/Scene19DigitalKeepsake';
import { Scene20Revisit } from './components/scenes/Scene20Revisit';

const SCENE_FLOW: SceneId[] = [
  'dark_opening',
  'rocket_launch',
  'golden_fireworks',
  'opening_shayari',
  'personal_intro',
  'journey_map',
  'dharma_courage',
  'faith_devotion',
  'unity_loyalty',
  'ayodhya_reveal',
  'homecoming',
  'royal_gates',
  'diwali_celebration',
  'diya_challenge',
  'secret_door',
  'memory_room',
  'wish_lantern',
  'final_greeting',
  'digital_keepsake',
  'revisit',
];

export default function App() {
  const [hasGivenConsentChoice, setHasGivenConsentChoice] = useState(false);
  const [currentScene, setCurrentScene] = useState<SceneId>('dark_opening');
  const [showAdmin, setShowAdmin] = useState(false);

  const goToNextScene = () => {
    const currentIndex = SCENE_FLOW.indexOf(currentScene);
    if (currentIndex >= 0 && currentIndex < SCENE_FLOW.length - 1) {
      setCurrentScene(SCENE_FLOW[currentIndex + 1]);
    }
  };

  const handleRestart = () => {
    // Reset session storage for fresh 14 diyas run
    try {
      sessionStorage.removeItem('tanisha_diwali_lit_diyas_v1');
    } catch {
      // ignore
    }
    sessionService.resetSession();
    setCurrentScene('dark_opening');
  };

  const getIntensity = (): 'dark' | 'subtle' | 'rich' | 'celebration' => {
    if (currentScene === 'dark_opening') return 'dark';
    if (currentScene === 'rocket_launch' || currentScene === 'golden_fireworks' || currentScene === 'diwali_celebration') {
      return 'celebration';
    }
    if (currentScene === 'dharma_courage' || currentScene === 'faith_devotion') {
      return 'subtle';
    }
    return 'rich';
  };

  return (
    <div className="relative w-full min-h-screen bg-[#070503] text-[#F7E7CE] overflow-x-hidden select-none">
      {/* Background Golden Particle Atmosphere */}
      <AtmosphereCanvas intensity={getIntensity()} />

      {/* Discreet Recording Indicator (unobtrusive pulsing red dot + time, opt-in preview) */}
      <RecordingIndicator />

      {/* Initial Explicit Permission Consent Screen */}
      {!hasGivenConsentChoice && (
        <RecordingConsentModal onStartQuest={() => setHasGivenConsentChoice(true)} />
      )}

      {/* Discreet Admin Lock Button in Top-Right Corner for Rajat */}
      <div className="fixed top-4 right-4 z-40">
        <button
          onClick={() => setShowAdmin(true)}
          title="Admin View"
          className="p-2 rounded-full bg-[#140b04]/50 border border-[#d4af37]/30 text-[#d4af37]/60 hover:text-[#ffd54f] hover:border-[#ffd54f] hover:bg-[#201007] transition-all cursor-pointer backdrop-blur-xs"
        >
          <Lock className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Admin Dashboard Modal */}
      <AdminDashboard isOpen={showAdmin} onClose={() => setShowAdmin(false)} />

      {/* Main Scene Container with Cinematic Transitions */}
      <main className="relative w-full min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="w-full min-h-screen"
          >
            {currentScene === 'dark_opening' && <Scene1DarkOpening onNext={goToNextScene} />}
            {currentScene === 'rocket_launch' && <Scene2Rocket onNext={goToNextScene} />}
            {currentScene === 'golden_fireworks' && <Scene3Fireworks onNext={goToNextScene} />}
            {currentScene === 'opening_shayari' && <Scene4Shayari onNext={goToNextScene} />}
            {currentScene === 'personal_intro' && <Scene5PersonalIntro onNext={goToNextScene} />}
            {currentScene === 'journey_map' && <Scene6JourneyMap onNext={goToNextScene} />}
            {currentScene === 'dharma_courage' && <Scene7DharmaCourage onNext={goToNextScene} />}
            {currentScene === 'faith_devotion' && <Scene8FaithDevotion onNext={goToNextScene} />}
            {currentScene === 'unity_loyalty' && <Scene9UnityLoyalty onNext={goToNextScene} />}
            {currentScene === 'ayodhya_reveal' && <Scene10AyodhyaReveal onNext={goToNextScene} />}
            {currentScene === 'homecoming' && <Scene11Homecoming onNext={goToNextScene} />}
            {currentScene === 'royal_gates' && <Scene12RoyalGates onNext={goToNextScene} />}
            {currentScene === 'diwali_celebration' && <Scene13DiwaliCelebration onNext={goToNextScene} />}
            {currentScene === 'diya_challenge' && <Scene14DiyaChallenge onNext={goToNextScene} />}
            {currentScene === 'secret_door' && <Scene15SecretDoor onNext={goToNextScene} />}
            {currentScene === 'memory_room' && <Scene16MemoryRoom onNext={goToNextScene} />}
            {currentScene === 'wish_lantern' && <Scene17WishLantern onNext={goToNextScene} />}
            {currentScene === 'final_greeting' && <Scene18FinalGreeting onNext={goToNextScene} />}
            {currentScene === 'digital_keepsake' && <Scene19DigitalKeepsake onNext={goToNextScene} />}
            {currentScene === 'revisit' && <Scene20Revisit onRestart={handleRestart} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

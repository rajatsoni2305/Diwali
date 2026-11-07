import React, { useState, useEffect } from 'react';

// Global Atmosphere & Overlays
import { FestiveDecor } from './components/FestiveDecor';
import { AtmosphereCanvas } from './components/AtmosphereCanvas';
import { RecordingConsentModal } from './components/recording/RecordingConsentModal';
import { RecordingIndicator } from './components/recording/RecordingIndicator';

// Original Story Arc Scenes
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
import { Scene19bReactionRecording } from './components/scenes/Scene19bReactionRecording';
import { Scene20Revisit } from './components/scenes/Scene20Revisit';

// The 7 Newly Added Screenshot Variations
import { SceneDiyaHeart } from './components/scenes/SceneDiyaHeart';
import { SceneGrandThali } from './components/scenes/SceneGrandThali';
import { SceneHangingLanterns } from './components/scenes/SceneHangingLanterns';
import { SceneInteractiveCrackers } from './components/scenes/SceneInteractiveCrackers';
import { SceneGiftHamper } from './components/scenes/SceneGiftHamper';
import { SceneFairyLightsJar } from './components/scenes/SceneFairyLightsJar';
import { SceneSurpriseReveal } from './components/scenes/SceneSurpriseReveal';

// Essential Backend Services (Firebase & Cloudinary Preserved)
import { sessionService } from './services/sessionService';
import { recordingManager } from './services/recordingManager';

export const App: React.FC = () => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [sessionData, setSessionData] = useState<any>(null);
  const [hasConsent, setHasConsent] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const initSession = async () => {
      try {
        const data = await sessionService.getCurrentSession();
        setSessionData(data);
      } catch (err) {
        console.warn('Session loaded with default settings', err);
      }
    };
    initSession();
  }, []);

  const handleNext = () => {
    setCurrentSceneIndex((prev) => Math.min(prev + 1, scenes.length - 1));
  };

  const handleRecordingConsent = async (consent: boolean) => {
    setHasConsent(consent);
    if (consent) {
      try {
        await recordingManager.startRecording();
        setIsRecording(true);
      } catch (e) {
        console.warn('Recording access not permitted:', e);
      }
    }
  };

  // Harmoniously interlaced sequence: (Original 20 + 7 New Variations = 27 Grand Scenes)
  const scenes = [
    <Scene1DarkOpening onNext={handleNext} />,
    <SceneDiyaHeart onNext={handleNext} recipientName={sessionData?.recipientName} />,
    <Scene2Rocket onNext={handleNext} />,
    <Scene3Fireworks onNext={handleNext} />,
    <SceneGrandThali onNext={handleNext} recipientName={sessionData?.recipientName} senderName={sessionData?.senderName} />,
    <Scene4Shayari onNext={handleNext} customShayari={sessionData?.shayari} />,
    <Scene5PersonalIntro onNext={handleNext} />,
    <SceneFairyLightsJar onNext={handleNext} />,
    <Scene6JourneyMap onNext={handleNext} />,
    <Scene7DharmaCourage onNext={handleNext} />,
    <SceneHangingLanterns onNext={handleNext} />,
    <Scene8FaithDevotion onNext={handleNext} />,
    <Scene9UnityLoyalty onNext={handleNext} />,
    <Scene10AyodhyaReveal onNext={handleNext} />,
    <SceneInteractiveCrackers onNext={handleNext} />,
    <Scene11Homecoming onNext={handleNext} />,
    <Scene12RoyalGates onNext={handleNext} />,
    <Scene13DiwaliCelebration onNext={handleNext} />,
    <SceneGiftHamper onNext={handleNext} />,
    <Scene14DiyaChallenge onNext={handleNext} />,
    <Scene15SecretDoor onNext={handleNext} />,
    <SceneSurpriseReveal onNext={handleNext} />,
    <Scene16MemoryRoom onNext={handleNext} photos={sessionData?.photos} recipientName={sessionData?.recipientName} />,
    <Scene17WishLantern onNext={handleNext} />,
    <Scene18FinalGreeting onNext={handleNext} />,
    <Scene19DigitalKeepsake onNext={handleNext} />,
    <Scene19bReactionRecording onNext={handleNext} />,
    <Scene20Revisit onNext={handleNext} />
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between">
      {/* Background Interactive Particles */}
      <AtmosphereCanvas />

      {/* Persistent Fairy Lights & Bottom Rangoli Border */}
      <FestiveDecor />

      {/* Top Recording Status */}
      {isRecording && <RecordingIndicator />}

      {/* Main Flow Content */}
      <main className="relative z-20 flex-1 flex flex-col justify-center items-center w-full">
        {scenes[currentSceneIndex]}
      </main>

      {/* Privacy Consent Dialog */}
      {!hasConsent && (
        <RecordingConsentModal 
          onConfirm={() => handleRecordingConsent(true)} 
          onSkip={() => handleRecordingConsent(false)} 
        />
      )}
    </div>
  );
};

export default App;

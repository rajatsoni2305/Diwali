import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Global Overlays
import { FestiveDecor } from './components/FestiveDecor';
import { AtmosphereCanvas } from './components/AtmosphereCanvas';
import { RecordingConsentModal } from './components/recording/RecordingConsentModal';
import { RecordingIndicator } from './components/recording/RecordingIndicator';

// Original Story Narrative Scenes
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

// The 7 Screenshot Variation Scenes
import { SceneDiyaHeart } from './components/scenes/SceneDiyaHeart';
import { SceneGrandThali } from './components/scenes/SceneGrandThali';
import { SceneHangingLanterns } from './components/scenes/SceneHangingLanterns';
import { SceneInteractiveCrackers } from './components/scenes/SceneInteractiveCrackers';
import { SceneGiftHamper } from './components/scenes/SceneGiftHamper';
import { SceneFairyLightsJar } from './components/scenes/SceneFairyLightsJar';
import { SceneSurpriseReveal } from './components/scenes/SceneSurpriseReveal';

// Backend Services
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
        console.warn('Session initialized with default profile', err);
      }
    };
    initSession();
  }, []);

  const handleNext = useCallback(() => {
    setCurrentSceneIndex((prev) => Math.min(prev + 1, 26));
  }, []);

  const handleRecordingConsent = useCallback(async (consent: boolean) => {
    setHasConsent(consent);
    if (consent) {
      try {
        await recordingManager.startRecording();
        setIsRecording(true);
      } catch (e) {
        console.warn('Recording permission bypassed:', e);
      }
    }
  }, []);

  const scenes = useMemo(() => [
    <Scene1DarkOpening key="s1" onNext={handleNext} />,
    <SceneDiyaHeart key="s-heart" onNext={handleNext} recipientName={sessionData?.recipientName} />,
    <Scene2Rocket key="s2" onNext={handleNext} />,
    <Scene3Fireworks key="s3" onNext={handleNext} />,
    <SceneGrandThali key="s-thali" onNext={handleNext} recipientName={sessionData?.recipientName} senderName={sessionData?.senderName} />,
    <Scene4Shayari key="s4" onNext={handleNext} customShayari={sessionData?.shayari} />,
    <Scene5PersonalIntro key="s5" onNext={handleNext} />,
    <SceneFairyLightsJar key="s-jar" onNext={handleNext} />,
    <Scene6JourneyMap key="s6" onNext={handleNext} />,
    <Scene7DharmaCourage key="s7" onNext={handleNext} />,
    <SceneHangingLanterns key="s-lanterns" onNext={handleNext} />,
    <Scene8FaithDevotion key="s8" onNext={handleNext} />,
    <Scene9UnityLoyalty key="s9" onNext={handleNext} />,
    <Scene10AyodhyaReveal key="s10" onNext={handleNext} />,
    <SceneInteractiveCrackers key="s-crackers" onNext={handleNext} />,
    <Scene11Homecoming key="s11" onNext={handleNext} />,
    <Scene12RoyalGates key="s12" onNext={handleNext} />,
    <Scene13DiwaliCelebration key="s13" onNext={handleNext} />,
    <SceneGiftHamper key="s-hamper" onNext={handleNext} />,
    <Scene14DiyaChallenge key="s14" onNext={handleNext} />,
    <Scene15SecretDoor key="s15" onNext={handleNext} />,
    <SceneSurpriseReveal key="s-surprise" onNext={handleNext} />,
    <Scene16MemoryRoom key="s16" onNext={handleNext} photos={sessionData?.photos} recipientName={sessionData?.recipientName} />,
    <Scene17WishLantern key="s17" onNext={handleNext} />,
    <Scene18FinalGreeting key="s18" onNext={handleNext} />,
    <Scene19DigitalKeepsake key="s19" onNext={handleNext} />,
    <Scene19bReactionRecording key="s19b" onNext={handleNext} />,
    <Scene20Revisit key="s20" onNext={handleNext} />
  ], [handleNext, sessionData]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between">
      <AtmosphereCanvas />
      <FestiveDecor />
      {isRecording && <RecordingIndicator />}

      <main className="relative z-20 flex-1 flex flex-col justify-center items-center w-full">
        {scenes[currentSceneIndex]}
      </main>

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

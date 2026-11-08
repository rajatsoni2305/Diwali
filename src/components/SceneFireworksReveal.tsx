import React, { useState } from 'react';
import { SceneFireworks } from './shweta/SceneFireworks';
import { SceneTanishaGreeting } from './SceneTanishaGreeting';

export const SceneFireworksReveal: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [showGreeting, setShowGreeting] = useState(false);
  return showGreeting ? <SceneTanishaGreeting onNext={onNext} /> : <SceneFireworks onComplete={() => setShowGreeting(true)} />;
};

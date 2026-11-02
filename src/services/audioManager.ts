// Background music removed per instructions.
// Interaction and festive sound effects are preserved in soundEffects.ts.

type AudioStatus = 'paused';

class BackgroundAudioManager {
  public attemptPlay() {}
  public toggleMute(): boolean { return false; }
  public togglePlayPause() {}
  public userInteractedToStart() {}
  public setCustomAudioSource(_url: string) {}
  public subscribe(_fn: (status: AudioStatus, isMuted: boolean) => void) {
    return () => {};
  }
  public getStatus(): AudioStatus { return 'paused'; }
  public getIsMuted(): boolean { return false; }
  public getAutoplayBlocked(): boolean { return false; }
}

export const audioManager = new BackgroundAudioManager();

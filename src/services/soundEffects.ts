class SoundEffectsManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public playRocketLaunch() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Rising whistle oscillator
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 1.2);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 1.8);

      oscGain.gain.setValueAtTime(0.01, now);
      oscGain.gain.linearRampToValueAtTime(0.12, now + 0.4);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 1.9);

      // Noise generator for rocket thruster fizzle
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(300, now);
      filter.frequency.exponentialRampToValueAtTime(2200, now + 1.8);
      filter.Q.value = 3;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.02, now);
      noiseGain.gain.linearRampToValueAtTime(0.15, now + 0.5);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.9);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      osc.start(now);
      whiteNoise.start(now);
      osc.stop(now + 1.9);
      whiteNoise.stop(now + 1.9);
    } catch {
      // AudioContext blocked or not supported
    }
  }

  public playFireworkBoom() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Sub-bass thump
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.6);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.85);

      // Crackles / sparkling high burst
      const bufferSize = ctx.sampleRate * 1.2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        // intermittent crackle pulses
        data[i] = Math.random() > 0.85 ? (Math.random() * 2 - 1) : 0;
      }
      const crackle = ctx.createBufferSource();
      crackle.buffer = buffer;

      const crackleFilter = ctx.createBiquadFilter();
      crackleFilter.type = 'highpass';
      crackleFilter.frequency.value = 1500;

      const crackleGain = ctx.createGain();
      crackleGain.gain.setValueAtTime(0.15, now + 0.1);
      crackleGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      crackle.connect(crackleFilter);
      crackleFilter.connect(crackleGain);
      crackleGain.connect(ctx.destination);

      crackle.start(now + 0.1);
      crackle.stop(now + 1.2);
    } catch {
      // ignore
    }
  }

  public playDiyaIgnite(pitchFactor = 1.0) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Resonant sweet bell chime
      const baseFreq = 528 * pitchFactor; // Solfeggio 528 Hz or scaled
      const harmonics = [1, 2, 2.76, 4];
      const gains = [0.15, 0.08, 0.04, 0.02];

      harmonics.forEach((h, idx) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq * h, now);

        g.gain.setValueAtTime(gains[idx], now);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 1.25);
      });
    } catch {
      // ignore
    }
  }

  public playTempleBell() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const fundamental = 264; // C4 warm temple bell
      const partials = [1, 1.5, 2, 2.7, 3.8, 5.2];
      const partialGains = [0.2, 0.12, 0.08, 0.05, 0.03, 0.01];

      partials.forEach((p, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(fundamental * p, now);

        g.gain.setValueAtTime(partialGains[i], now);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 3.0);
      });
    } catch {
      // ignore
    }
  }

  public playDoorOpen() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Deep resonant stone/wood rumble + golden chime
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(90, now);
      osc.frequency.linearRampToValueAtTime(140, now + 1.0);
      osc.frequency.exponentialRampToValueAtTime(60, now + 2.0);

      g.gain.setValueAtTime(0.12, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 2.3);

      // Chime burst
      setTimeout(() => {
        this.playDiyaIgnite(1.4);
      }, 500);
    } catch {
      // ignore
    }
  }

  public playLanternAscent() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 2.5);

      g.gain.setValueAtTime(0.01, now);
      g.gain.linearRampToValueAtTime(0.09, now + 0.8);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 2.9);
    } catch {
      // ignore
    }
  }

  public playWishChime() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const freqs = [528, 660, 792, 1056]; // Golden harmonic chord
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);
        g.gain.setValueAtTime(0.12 / (idx + 1), now + idx * 0.1);
        g.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.1 + 1.8);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 1.9);
      });
    } catch {
      // ignore
    }
  }
}

export const soundEffects = new SoundEffectsManager();

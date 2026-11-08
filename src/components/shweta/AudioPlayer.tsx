import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isSetupRef = useRef<boolean>(false);
  const gainNodeRef = useRef<GainNode | null>(null);
  const chimeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const initAudio = () => {
    if (isSetupRef.current && audioCtxRef.current) {
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 4);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // 1. Warm meditative tanpura drone (root notes: C#3 138.59Hz, G#3 207.65Hz, C#4 277.18Hz)
      const droneFreqs = [138.59, 207.65, 277.18];
      droneFreqs.forEach((freq) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // subtle warm vibrato
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 0.2;
        lfoGain.gain.value = 0.8;
        lfo.connect(osc.frequency);
        lfo.start();

        oscGain.gain.value = 0.045;
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
      });

      // 2. Periodic delicate temple chimes (pentatonic notes)
      const pentatonic = [554.37, 622.25, 698.46, 830.61, 932.33, 1108.73];
      const playChime = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'suspended') return;
        const note = pentatonic[Math.floor(Math.random() * pentatonic.length)];
        const chimeOsc = ctx.createOscillator();
        const chimeGain = ctx.createGain();

        chimeOsc.type = 'sine';
        chimeOsc.frequency.setValueAtTime(note, ctx.currentTime);

        const now = ctx.currentTime;
        chimeGain.gain.setValueAtTime(0, now);
        chimeGain.gain.linearRampToValueAtTime(0.022, now + 0.05);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

        chimeOsc.connect(chimeGain);
        chimeGain.connect(masterGain);

        chimeOsc.start(now);
        chimeOsc.stop(now + 3.6);
      };

      chimeIntervalRef.current = setInterval(playChime, 3800);
      isSetupRef.current = true;
    } catch {
      // AudioContext not supported or restricted
    }
  };

  const toggleSound = () => {
    if (!isPlaying) {
      initAudio();
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      setIsPlaying(true);
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend();
      }
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (chimeIntervalRef.current) clearInterval(chimeIntervalRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      type="button"
      className="fixed top-4 right-4 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-950/40 border border-amber-500/20 backdrop-blur-md text-amber-200/80 hover:text-amber-100 hover:border-amber-400/40 hover:bg-amber-950/60 transition-all text-xs tracking-wider"
      title={isPlaying ? 'Mute ambient melody' : 'Play ambient melody'}
      aria-label={isPlaying ? 'Mute festive audio' : 'Play festive audio'}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="hidden sm:inline font-sans text-[11px] font-medium tracking-wide">Diwali Melody</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-amber-300/60" />
          <span className="hidden sm:inline font-sans text-[11px] font-medium tracking-wide">Sound Off</span>
        </>
      )}
    </button>
  );
};

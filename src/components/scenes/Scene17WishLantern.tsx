import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send } from 'lucide-react';
import { soundEffects } from '../../services/soundEffects';
import { sessionService } from '../../services/sessionService';

interface SceneProps {
  onNext: () => void;
}

interface SwarmLantern {
  x: number;
  initialX: number;
  y: number;
  speedY: number;
  swayFreq: number;
  swayAmp: number;
  phase: number;
  scale: number;
  alpha: number;
  color: string;
}

export const Scene17WishLantern: React.FC<SceneProps> = ({ onNext }) => {
  const [wishText, setWishText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isReleased, setIsReleased] = useState(false);
  const [activeWish, setActiveWish] = useState('');
  const [showSwarm, setShowSwarm] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const handleRelease = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = wishText.trim();
    if (!trimmed) {
      setErrorMsg('Please write your wish before releasing the lantern ✨');
      return;
    }

    setErrorMsg('');
    setActiveWish(trimmed);
    setIsReleased(true);
    soundEffects.playLanternAscent();

    // Save wish to Firebase Firestore (and local session persistence)
    sessionService.saveWish(trimmed);

    // 1. Keep the lantern visible briefly
    // 2. Start cinematic transition after ~2.6s: dozens of glowing lanterns emerge from the bottom
    const tSwarm = setTimeout(() => {
      setShowSwarm(true);
    }, 2600);

    // 3. Let lanterns fill the screen and transition smoothly into the next scene
    const tNext = setTimeout(() => {
      onNext();
    }, 8500);

    return () => {
      clearTimeout(tSwarm);
      clearTimeout(tNext);
    };
  };

  // Canvas animation for dozens of tiny glowing lanterns rising from the bottom to the top
  useEffect(() => {
    if (!showSwarm) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate dozens of lanterns emerging strictly from the bottom
    const lanternCount = Math.min(50, Math.floor(width / 16) + 20);
    const lanterns: SwarmLantern[] = [];
    const colors = ['#ff8f00', '#ffa000', '#ffb300', '#ffd54f', '#ffe082'];

    for (let i = 0; i < lanternCount; i++) {
      const initX = Math.random() * (width - 40) + 20;
      // Staggered vertical start strictly BELOW the bottom of the screen
      const startY = height + 30 + Math.random() * (height * 1.1) + (i * 18);
      lanterns.push({
        x: initX,
        initialX: initX,
        y: startY,
        speedY: Math.random() * 1.5 + 1.1,
        swayFreq: Math.random() * 0.003 + 0.0015,
        swayAmp: Math.random() * 18 + 8,
        phase: Math.random() * Math.PI * 2,
        scale: Math.random() * 0.65 + 0.35, // Depth variation
        alpha: Math.random() * 0.3 + 0.7,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let startTime = Date.now();

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const elapsed = Date.now() - startTime;

      for (let i = 0; i < lanterns.length; i++) {
        const l = lanterns[i];

        // Move upward from bottom to top
        l.y -= l.speedY;
        // Natural gentle swaying motion
        l.x = l.initialX + Math.sin(elapsed * l.swayFreq + l.phase) * l.swayAmp;

        // If it exits the top far above, it won't pop back suddenly
        if (l.y < -80) {
          continue;
        }

        // Draw lantern
        const w = 18 * l.scale;
        const h = 24 * l.scale;

        ctx.save();
        ctx.globalAlpha = l.alpha;
        ctx.shadowBlur = 14 * l.scale;
        ctx.shadowColor = l.color;

        // Lantern glowing body
        const grad = ctx.createLinearGradient(l.x, l.y + h, l.x, l.y);
        grad.addColorStop(0, '#e65100');
        grad.addColorStop(0.5, l.color);
        grad.addColorStop(1, '#fffde7');

        ctx.fillStyle = grad;
        ctx.beginPath();
        // Rounded dome top
        ctx.roundRect(l.x - w / 2, l.y - h / 2, w, h, [w * 0.35, w * 0.35, 2, 2]);
        ctx.fill();

        // Inner glowing flame
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(l.x, l.y + h * 0.15, 2 * l.scale, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [showSwarm]);

  return (
    <div className="relative w-full h-full min-h-screen bg-[#07050a] flex flex-col items-center justify-between px-4 py-8 select-none overflow-hidden">
      {/* Starry Night Sky Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#090b14] via-[#120a1c] to-[#060408] pointer-events-none" />

      {/* Floating Canvas for dozens of rising lanterns from bottom to top */}
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 pointer-events-none z-20 transition-opacity duration-1000 ${
          showSwarm ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Header */}
      <div className="relative z-10 text-center max-w-xl mt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e1026]/80 border border-[#d4af37]/40 text-[#f5d77f] text-xs font-cinzel tracking-widest uppercase mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#ffb300]" />
          <span>The Celestial Akash Kandil</span>
          <Sparkles className="w-3.5 h-3.5 text-[#ffb300]" />
        </div>
        <h2 className="font-cinzel text-xl sm:text-3xl text-[#ffe57f] gold-glow tracking-wider font-semibold">
          THE WISH LANTERN
        </h2>
      </div>

      {/* Main Interactive Container */}
      <div className="relative z-10 w-full max-w-lg my-auto flex flex-col items-center">
        {!isReleased ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full p-6 sm:p-8 rounded-3xl bg-[#150d18]/80 backdrop-blur-md border border-[#d4af37]/40 shadow-[0_0_50px_rgba(0,0,0,0.85)] text-center"
          >
            <p className="font-marcellus text-lg sm:text-2xl text-[#ffecb3] leading-relaxed mb-6">
              "Every Diwali carries a wish. What's yours?"
            </p>

            <form onSubmit={handleRelease} className="space-y-4">
              <div className="relative">
                <textarea
                  value={wishText}
                  onChange={(e) => {
                    setWishText(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  maxLength={150}
                  rows={3}
                  placeholder="Type your quiet wish into the lantern..."
                  className={`w-full px-4 py-3 rounded-2xl bg-[#0c060d]/80 border text-[#fff8e1] font-marcellus text-sm sm:text-base placeholder:text-[#8a7256] focus:outline-hidden transition-all resize-none ${
                    errorMsg
                      ? 'border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400'
                      : 'border-[#b37d2a]/50 focus:border-[#ffd54f] focus:ring-1 focus:ring-[#ffd54f]'
                  }`}
                />
                <span className="absolute bottom-2 right-3 text-[10px] text-[#8a7256] font-mono">
                  {wishText.length}/150
                </span>
              </div>

              {/* Graceful validation feedback for empty or whitespace-only submissions */}
              <AnimatePresence>
                {errorMsg && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="text-xs text-[#ffb4a2] font-marcellus"
                  >
                    {errorMsg}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={!wishText.trim() || isReleased}
                whileHover={wishText.trim() && !isReleased ? { scale: 1.03 } : {}}
                whileTap={wishText.trim() && !isReleased ? { scale: 0.97 } : {}}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#b37d2a] via-[#f5b041] to-[#b37d2a] text-[#0d0702] font-cinzel text-xs sm:text-sm font-bold tracking-[0.2em] uppercase box-gold-glow-active transition-all cursor-pointer flex items-center justify-center gap-2 border border-[#fff2b2] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
              >
                <Send className="w-4 h-4 text-[#0d0702]" />
                <span>RELEASE YOUR WISH</span>
              </motion.button>
            </form>
          </motion.div>
        ) : (
          /* Released Lantern View */
          <div className="relative w-full h-[420px] flex flex-col items-center justify-center">
            {/* 1. Display her written wish beautifully on a glowing lantern */}
            {/* 2. Keep the lantern visible briefly, then ascending */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={
                showSwarm
                  ? {
                      y: -280,
                      scale: 0.65,
                      opacity: [1, 1, 0.9],
                      x: [0, 15, -10, 20],
                    }
                  : {
                      scale: 1,
                      opacity: 1,
                      y: 0,
                    }
              }
              transition={
                showSwarm
                  ? { duration: 6, ease: [0.25, 0.1, 0.25, 1] }
                  : { duration: 1.2, ease: 'easeOut' }
              }
              className="relative flex flex-col items-center z-30"
            >
              {/* Lantern Warm Glowing Aura */}
              <div className="absolute -top-10 w-44 h-56 rounded-full bg-[#ff9800]/45 blur-2xl pointer-events-none" />

              {/* Lantern Body with her exact written wish */}
              <div className="relative w-44 sm:w-52 min-h-[190px] rounded-t-3xl rounded-b-xl bg-gradient-to-t from-[#e65100] via-[#ffb300] to-[#fffde7] p-4 shadow-[0_0_40px_#ff9800] border-t-2 border-[#fff9c4] flex flex-col items-center justify-between text-center">
                <div className="flex items-center gap-1.5 text-[#3e1a06] text-xs font-cinzel uppercase tracking-widest pt-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Tanisha's Wish</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </div>

                <div className="my-auto py-2">
                  <p className="font-kalam text-sm sm:text-base text-[#2c1305] font-bold leading-relaxed px-1">
                    "{activeWish}"
                  </p>
                </div>

                <div className="w-12 h-2.5 bg-[#ff5722] rounded-full blur-[1px]" />
              </div>

              {/* Lantern Base & Tassel */}
              <div className="w-16 h-2.5 bg-[#5d2b10] rounded-b-full -mt-0.5" />
              <div className="w-0.5 h-8 bg-[#ffd54f] opacity-80" />
            </motion.div>

            {/* Atmosphere Message during ascent */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={showSwarm ? { opacity: 1 } : { opacity: 0.8 }}
              transition={{ duration: 1.2 }}
              className="relative z-30 text-center mt-6"
            >
              <p className="font-marcellus text-sm sm:text-base text-[#ffecb3] gold-glow">
                {showSwarm
                  ? 'A thousand lanterns rise together into the heavens...'
                  : 'Lighting your wish with the sacred flame...'}
              </p>
            </motion.div>
          </div>
        )}
      </div>

      {/* Subtle Privacy Notice */}
      <div className="relative z-10 text-[10px] text-[#735e40] font-marcellus text-center">
        (Your wish remains local to your device and is not saved on any external server)
      </div>
    </div>
  );
};


import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { soundEffects } from '../../services/soundEffects';

interface SceneProps {
  onNext: () => void;
}

const MAP_STOPS = [
  { id: 'dandakaranya', name: 'Dandakaranya', subtitle: 'The Sacred Forest of Penance & Dharma', x: 13, y: 72, icon: '🌿' },
  { id: 'ocean', name: 'The Sacred Ocean', subtitle: 'Vast Waters of Faith & Hanuman’s Flight', x: 39, y: 82, icon: '🌊' },
  { id: 'ram_setu', name: 'Ram Setu', subtitle: 'The Floating Bridge of Unity', x: 66, y: 53, icon: '🪨' },
  { id: 'ayodhya', name: 'Grand Ayodhya', subtitle: 'The Eternal Realm of a Thousand Diyas', x: 87, y: 22, icon: '🛕' },
];

export const Scene6JourneyMap: React.FC<SceneProps> = ({ onNext }) => {
  const [activeStop, setActiveStop] = useState(0);
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => {
        setActiveStop(1);
        soundEffects.playDiyaIgnite(1);
      }, 1500),
      setTimeout(() => {
        setActiveStop(2);
        soundEffects.playDiyaIgnite(1.2);
      }, 3200),
      setTimeout(() => {
        setActiveStop(3);
        soundEffects.playDiyaIgnite(1.4);
      }, 4900),
      setTimeout(() => {
        setActiveStop(4);
        soundEffects.playTempleBell();
        setShowContinue(true);
      }, 6500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative isolate flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#170f1c] px-3 py-8 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(140,92,75,.23),transparent_65%)]" />

      <div className="relative z-20 mb-6 text-center">
        <div className="mb-2 flex items-center justify-center gap-2 text-[#eac47f]">
          <Sparkles className="h-4 w-4" />
          <h2 className="font-cinzel text-lg tracking-[.16em] text-[#ffe2a0] gold-glow sm:text-2xl">
            THE SACRED ODYSSEY
          </h2>
          <Sparkles className="h-4 w-4" />
        </div>
        <p className="font-marcellus text-xs text-[#d9c2a2] sm:text-sm">
          From the depths of exile across the seas to the homecoming of Ayodhya
        </p>
      </div>

      <div className="relative z-10 flex h-[440px] w-full max-w-4xl flex-col justify-between overflow-hidden rounded-[26px] border border-[#d8b477]/45 bg-[#e9d4aa] p-3 shadow-[0_25px_80px_rgba(0,0,0,.45)] sm:h-[490px] sm:p-7">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(255,250,224,.92),rgba(219,185,130,.65)_75%,rgba(153,108,69,.6))]" />

        <div className="pointer-events-none absolute inset-0 opacity-25">
          <svg viewBox="0 0 800 500" preserveAspectRatio="none" className="h-full w-full">
            <defs>
              <pattern id="journeyGrid" width="42" height="42" patternUnits="userSpaceOnUse">
                <path d="M42 0H0V42" fill="none" stroke="#9b7447" strokeWidth=".7" />
              </pattern>
            </defs>
            <rect width="800" height="500" fill="url(#journeyGrid)" />
            <path d="M-40 150 Q120 50 260 160 T540 140 T850 180" fill="none" stroke="#a77b50" strokeWidth="2" strokeDasharray="5 8" />
            <path d="M-30 350 Q130 250 290 360 T600 320 T850 380" fill="none" stroke="#a77b50" strokeWidth="2" strokeDasharray="5 8" />
          </svg>
        </div>

        <div className="pointer-events-none absolute bottom-5 left-5 text-[#8e6b48]/50">
          <svg viewBox="0 0 100 100" width="90" height="90" fill="none" stroke="currentColor">
            <circle cx="50" cy="50" r="38" strokeDasharray="3 4" />
            <circle cx="50" cy="50" r="25" />
            <path d="M50 5L59 41 95 50 59 59 50 95 41 59 5 50 41 41Z" />
          </svg>
        </div>

        <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="journeyGold" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#a66c32" />
              <stop offset="55%" stopColor="#e3a83f" />
              <stop offset="100%" stopColor="#fff0b1" />
            </linearGradient>
          </defs>
          <path d="M13 72 Q25 91 39 82 T66 53 T87 22" fill="none" stroke="#9c764d" strokeWidth="0.7" strokeDasharray="1.5 1.5" />
          <motion.path
            d="M13 72 Q25 91 39 82 T66 53 T87 22"
            fill="none"
            stroke="url(#journeyGold)"
            strokeWidth="1.1"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: activeStop / 4 }}
            transition={{ duration: 1.5 }}
          />
        </svg>

        <div className="relative z-20 flex-1">
          {MAP_STOPS.map((stop, index) => {
            const reached = activeStop >= index;
            const current = activeStop === index;

            return (
              <div
                key={stop.id}
                style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
              >
                <motion.div
                  animate={current
                    ? { scale: [1, 1.16, 1], boxShadow: ['0 0 10px #dca64e', '0 0 25px #f1c96e', '0 0 10px #dca64e'] }
                    : { scale: reached ? 1 : 0.82, opacity: reached ? 1 : 0.55 }}
                  transition={{ duration: 1.5, repeat: current ? Infinity : 0 }}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-lg sm:h-12 sm:w-12 sm:text-xl ${
                    reached
                      ? 'border-[#fff0b5] bg-gradient-to-br from-[#8e5729] to-[#3c251b] text-white'
                      : 'border-[#9e835e] bg-[#dfc69f] text-[#80674b]'
                  }`}
                >
                  {stop.icon}
                </motion.div>

                <div className="mt-2 min-w-[100px] text-center sm:min-w-[155px]">
                  <span className={`block font-cinzel text-[9px] font-bold leading-tight sm:text-xs ${
                    reached ? 'text-[#59351e]' : 'text-[#8b775f]'
                  }`}>
                    {stop.name}
                  </span>
                  <span className="mt-1 hidden font-marcellus text-[9px] leading-tight text-[#765b40] sm:block">
                    {stop.subtitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative z-20 flex items-center justify-between gap-2 border-t border-[#9c744b]/35 pt-3">
          <div className="flex items-center gap-2 font-marcellus text-[10px] text-[#684b30] sm:text-xs">
            <MapPin className="h-4 w-4" />
            <span>Path of Virtue & Valor</span>
          </div>

          <button
            onClick={onNext}
            disabled={!showContinue}
            className={`flex items-center gap-2 rounded-full px-4 py-2 font-cinzel text-[9px] font-bold uppercase tracking-wider transition sm:px-5 sm:text-xs ${
              showContinue
                ? 'bg-gradient-to-r from-[#a96e3c] via-[#e9bd70] to-[#a96e3c] text-[#241525] shadow-lg'
                : 'cursor-not-allowed border border-[#a78a65]/50 bg-[#d8c19e] text-[#927957] opacity-70'
            }`}
          >
            Begin Journey <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

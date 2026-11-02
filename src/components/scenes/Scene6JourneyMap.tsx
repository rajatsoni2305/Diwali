import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { soundEffects } from '../../services/soundEffects';

interface SceneProps {
  onNext: () => void;
}

const MAP_STOPS = [
  {
    id: 'dandakaranya',
    name: 'Dandakaranya',
    subtitle: 'The Sacred Forest of Penance & Dharma',
    x: 18,
    y: 72,
    icon: '🌿',
  },
  {
    id: 'ocean',
    name: 'The Sacred Ocean',
    subtitle: 'Vast Waters of Faith & Hanuman’s Flight',
    x: 42,
    y: 78,
    icon: '🌊',
  },
  {
    id: 'ram_setu',
    name: 'Ram Setu',
    subtitle: 'The Floating Bridge of Unity',
    x: 65,
    y: 52,
    icon: '🪨',
  },
  {
    id: 'ayodhya',
    name: 'Grand Ayodhya',
    subtitle: 'The Eternal Realm of a Thousand Diyas',
    x: 84,
    y: 26,
    icon: '🛕',
  },
];

export const Scene6JourneyMap: React.FC<SceneProps> = ({ onNext }) => {
  const [activeStop, setActiveStop] = useState<number>(0);
  const [showContinue, setShowContinue] = useState<boolean>(false);

  useEffect(() => {
    // Automatically sequentially animate through waypoints
    const t1 = setTimeout(() => {
      setActiveStop(1);
      soundEffects.playDiyaIgnite(1.0);
    }, 1500);

    const t2 = setTimeout(() => {
      setActiveStop(2);
      soundEffects.playDiyaIgnite(1.2);
    }, 3200);

    const t3 = setTimeout(() => {
      setActiveStop(3);
      soundEffects.playDiyaIgnite(1.4);
    }, 4900);

    const t4 = setTimeout(() => {
      setActiveStop(4);
      soundEffects.playTempleBell();
      setShowContinue(true);
    }, 6500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-screen bg-[#070503] flex flex-col items-center justify-center px-4 py-8 select-none overflow-hidden">
      {/* Title */}
      <div className="relative z-10 text-center mb-6">
        <div className="flex items-center justify-center gap-2 text-[#d4af37] mb-1">
          <Sparkles className="w-4 h-4 text-[#f5b041]" />
          <h2 className="font-cinzel text-lg sm:text-2xl text-[#ffe57f] gold-glow uppercase tracking-[0.2em]">
            The Sacred Odyssey
          </h2>
          <Sparkles className="w-4 h-4 text-[#f5b041]" />
        </div>
        <p className="font-marcellus text-xs sm:text-sm text-[#c9b183]">
          From the depths of exile across the seas to the homecoming of Ayodhya
        </p>
      </div>

      {/* Antique Parchment Map Container */}
      <div className="relative z-10 w-full max-w-4xl h-[420px] sm:h-[480px] rounded-3xl p-4 sm:p-8 bg-[#160e07] border-2 border-[#b37d2a]/60 shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col justify-between">
        {/* Parchment texture background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(55,35,18,0.7)_0%,rgba(18,10,5,0.95)_100%)] pointer-events-none" />

        {/* Vintage Topography and Constellation lines */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#d4af37" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Ancient Compass Rose watermark in bottom-left */}
            <g transform="translate(100, 360) scale(0.6)" stroke="#d4af37" fill="none">
              <circle r="60" strokeWidth="1" strokeDasharray="4 4" />
              <circle r="40" strokeWidth="0.8" />
              <polygon points="0,-70 12,-15 70,0 15,12 0,70 -12,15 -70,0 -15,-12" fill="#d4af37" fillOpacity="0.15" />
            </g>
          </svg>
        </div>

        {/* Connecting Golden Path SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            <linearGradient id="goldPath" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f39c12" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#ffd700" stopOpacity="1" />
              <stop offset="100%" stopColor="#fff8b5" stopOpacity="0.9" />
            </linearGradient>
            <filter id="goldGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Golden animated pathway */}
          <path
            d="M 18% 72% Q 30% 85%, 42% 78% T 65% 52% T 84% 26%"
            fill="none"
            stroke="#5c3e16"
            strokeWidth="3"
            strokeDasharray="6 6"
          />
          <motion.path
            d="M 18% 72% Q 30% 85%, 42% 78% T 65% 52% T 84% 26%"
            fill="none"
            stroke="url(#goldPath)"
            strokeWidth="4"
            filter="url(#goldGlow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: Math.min(1, activeStop / 3) }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
          />
        </svg>

        {/* Map Waypoint Nodes */}
        <div className="relative z-20 w-full h-full">
          {MAP_STOPS.map((stop, i) => {
            const isReached = activeStop >= i;
            const isCurrent = activeStop === i;

            return (
              <div
                key={stop.id}
                style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              >
                {/* Glowing Marker Pin */}
                <motion.div
                  animate={
                    isCurrent
                      ? { scale: [1, 1.25, 1], boxShadow: ['0 0 10px #f5b041', '0 0 25px #ffd700', '0 0 10px #f5b041'] }
                      : isReached
                      ? { scale: 1 }
                      : { scale: 0.85, opacity: 0.45 }
                  }
                  transition={{ duration: 1.6, repeat: isCurrent ? Infinity : 0 }}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                    isReached
                      ? 'bg-gradient-to-br from-[#8a5518] to-[#2d1808] border-[#ffe57f] text-[#ffe57f] shadow-[0_0_20px_rgba(255,215,0,0.5)]'
                      : 'bg-[#1b120c] border-[#6b5028] text-[#8c7450]'
                  }`}
                >
                  <span className="text-base sm:text-lg">{stop.icon}</span>
                </motion.div>

                {/* Stop Label */}
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={isReached ? { opacity: 1, y: 0 } : { opacity: 0.4 }}
                  className="mt-2 text-center pointer-events-none min-w-[120px] sm:min-w-[160px]"
                >
                  <span
                    className={`block font-cinzel text-xs sm:text-sm font-semibold tracking-wider ${
                      isReached ? 'text-[#ffdd80] gold-glow' : 'text-[#8b7550]'
                    }`}
                  >
                    {stop.name}
                  </span>
                  <span className="hidden sm:block font-marcellus text-[10px] text-[#caa875] opacity-80 leading-tight">
                    {stop.subtitle}
                  </span>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Bottom Bar: Action */}
        <div className="relative z-20 flex items-center justify-between pt-4 border-t border-[#b37d2a]/30">
          <div className="flex items-center gap-2 text-xs text-[#d4af37] font-marcellus">
            <MapPin className="w-3.5 h-3.5 text-[#f5b041]" />
            <span>Path of Virtue & Valor</span>
          </div>

          <button
            onClick={onNext}
            className={`px-5 py-2 rounded-full font-cinzel text-xs font-bold tracking-widest uppercase transition-all flex items-center gap-2 cursor-pointer ${
              showContinue
                ? 'bg-gradient-to-r from-[#b37d2a] via-[#e5a83a] to-[#b37d2a] text-black box-gold-glow animate-pulse'
                : 'bg-[#2b1b0d] text-[#e5a83a] hover:bg-[#3d2714]'
            }`}
          >
            <span>Begin Journey</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

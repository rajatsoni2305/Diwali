import React, { memo } from 'react';
import { motion } from 'framer-motion';

export const FestiveDecor: React.FC = memo(() => {
  // Wire drape lengths with realistic catenary sag variations
  const stringWires = [
    { height: 38, delay: 0.1, color: '#fef08a', shadow: '#f59e0b' },
    { height: 62, delay: 0.4, color: '#fde047', shadow: '#ea580c' },
    { height: 86, delay: 0.8, color: '#fef08a', shadow: '#f59e0b' },
    { height: 104, delay: 0.2, color: '#facc15', shadow: '#ea580c' },
    { height: 78, delay: 0.7, color: '#fef08a', shadow: '#f59e0b' },
    { height: 52, delay: 0.3, color: '#fde047', shadow: '#ea580c' },
    { height: 42, delay: 0.9, color: '#fef08a', shadow: '#f59e0b' },
    { height: 72, delay: 0.5, color: '#facc15', shadow: '#ea580c' },
    { height: 96, delay: 0.2, color: '#fef08a', shadow: '#f59e0b' },
    { height: 110, delay: 0.8, color: '#fde047', shadow: '#ea580c' },
    { height: 82, delay: 0.4, color: '#fef08a', shadow: '#f59e0b' },
    { height: 56, delay: 0.6, color: '#facc15', shadow: '#ea580c' },
    { height: 40, delay: 0.3, color: '#fef08a', shadow: '#f59e0b' },
    { height: 68, delay: 0.7, color: '#fde047', shadow: '#ea580c' },
    { height: 92, delay: 0.1, color: '#fef08a', shadow: '#f59e0b' },
    { height: 106, delay: 0.9, color: '#facc15', shadow: '#ea580c' },
    { height: 80, delay: 0.5, color: '#fef08a', shadow: '#f59e0b' },
    { height: 54, delay: 0.2, color: '#fde047', shadow: '#ea580c' },
    { height: 44, delay: 0.6, color: '#fef08a', shadow: '#f59e0b' },
    { height: 74, delay: 0.4, color: '#facc15', shadow: '#ea580c' }
  ];

  // Marigold color palette matching authentic festive garlands
  const marigolds = [
    { bg: '#ea580c', border: '#f97316', inner: '#7c2d12' },
    { bg: '#f59e0b', border: '#fbbf24', inner: '#9a3412' },
    { bg: '#fbbf24', border: '#fef08a', inner: '#b45309' },
    { bg: '#dc2626', border: '#ef4444', inner: '#450a0a' },
    { bg: '#f97316', border: '#fbbf24', inner: '#7c2d12' },
    { bg: '#f59e0b', border: '#fde047', inner: '#9a3412' },
    { bg: '#ea580c', border: '#f97316', inner: '#7c2d12' },
    { bg: '#dc2626', border: '#f87171', inner: '#450a0a' },
    { bg: '#fbbf24', border: '#fef08a', inner: '#b45309' },
    { bg: '#f59e0b', border: '#fbbf24', inner: '#9a3412' },
    { bg: '#ea580c', border: '#f97316', inner: '#7c2d12' }
  ];

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden select-none">
      {/* Top Background Atmospheric Light Wash */}
      <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-amber-500/15 via-purple-900/10 to-transparent blur-2xl" />

      {/* Primary Hanging String Lights Array */}
      <div className="absolute top-0 left-0 right-0 flex justify-between px-2 sm:px-6 pt-0">
        {stringWires.map((wire, idx) => (
          <div key={`wire-${idx}`} className="flex flex-col items-center">
            {/* Fine Golden Electrical Thread */}
            <div
              className="w-[1.2px] bg-gradient-to-b from-yellow-100/60 via-amber-300/80 to-amber-500 shadow-[0_0_4px_rgba(251,191,36,0.5)]"
              style={{ height: `${wire.height}px` }}
            />
            {/* Light Fixture Cap */}
            <div className="w-2 h-1.5 bg-amber-950 rounded-t-sm border border-amber-500/60 -mt-0.5" />
            {/* Radiant Glowing Filament Bulb */}
            <div
              className="w-4 h-4 rounded-full border border-amber-100/90 animate-fairy-twinkle -mt-0.5 transition-transform"
              style={{
                backgroundColor: wire.color,
                boxShadow: `0 0 18px 4px ${wire.shadow}, 0 0 35px 8px rgba(245, 158, 11, 0.45)`,
                animationDelay: `${wire.delay}s`
              }}
            />
          </div>
        ))}
      </div>

      {/* Second Layer: Soft Gold Swag Drapes */}
      <svg
        viewBox="0 0 1200 120"
        className="absolute top-0 left-0 w-full h-24 opacity-60 drop-shadow-[0_0_12px_rgba(251,191,36,0.4)]"
        preserveAspectRatio="none"
      >
        <path
          d="M 0 10 Q 150 70 300 10 Q 450 70 600 10 Q 750 70 900 10 Q 1050 70 1200 10"
          fill="none"
          stroke="url(#garlandGoldGrad)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />
        <defs>
          <linearGradient id="garlandGoldGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>
        </defs>
      </svg>

      {/* Ambient Starlight Dust Droplets */}
      <div className="absolute top-28 left-0 right-0 flex justify-around opacity-75">
        {[...Array(9)].map((_, i) => (
          <div
            key={`droplet-${i}`}
            className="w-1.5 h-1.5 rounded-full bg-yellow-200 animate-ping"
            style={{
              animationDuration: `${2.6 + (i % 4) * 0.7}s`,
              animationDelay: `${i * 0.35}s`,
              boxShadow: '0 0 12px 2px #fef08a'
            }}
          />
        ))}
      </div>

      {/* Bottom Master Festive Frame: Marigolds & Sacred Rangoli */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
        {/* Layer 1: Hand-Arranged Fresh Marigold Blooms */}
        <div className="flex -space-x-4 mb-[-18px] z-10">
          {marigolds.map((flower, idx) => (
            <motion.div
              key={`marigold-${idx}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.05 * idx, duration: 0.6 }}
              className="relative w-11 h-11 rounded-full border-2 flex items-center justify-center shadow-lg"
              style={{
                backgroundColor: flower.bg,
                borderColor: flower.border,
                boxShadow: `0 0 16px ${flower.bg}99`
              }}
            >
              {/* Petal Ridges */}
              <div
                className="w-5 h-5 rounded-full border border-yellow-200/40"
                style={{ backgroundColor: flower.inner }}
              />
              <div className="absolute inset-1 rounded-full border border-dashed border-yellow-100/30 opacity-70" />
            </motion.div>
          ))}
        </div>

        {/* Layer 2: Elaborate Multi-Ring Imperial Rangoli SVG */}
        <svg
          viewBox="0 0 440 200"
          className="w-96 sm:w-[480px] h-48 drop-shadow-[0_0_35px_rgba(245,158,11,0.7)]"
        >
          {/* Ring 1: Exterior Royal Magenta Arc */}
          <path
            d="M 10 200 A 210 210 0 0 1 430 200 Z"
            fill="#581c87"
            stroke="#fef08a"
            strokeWidth="2.5"
          />
          {/* Ring 2: Deep Crimson Ring with Scent Pattern */}
          <path
            d="M 35 200 A 185 185 0 0 1 405 200 Z"
            fill="#881337"
            stroke="#fde047"
            strokeWidth="1.8"
          />
          {/* Ring 3: Sacred Forest Green Arc */}
          <path
            d="M 68 200 A 152 152 0 0 1 372 200 Z"
            fill="#065f46"
            stroke="#fef08a"
            strokeWidth="1.8"
          />
          {/* Ring 4: Radiant Golden Mustard Arc */}
          <path
            d="M 105 200 A 115 115 0 0 1 335 200 Z"
            fill="#b45309"
            stroke="#fbbf24"
            strokeWidth="1.5"
          />
          {/* Ring 5: Inner Ruby Lotus Heart */}
          <path
            d="M 148 200 A 72 72 0 0 1 292 200 Z"
            fill="#be123c"
            stroke="#fde047"
            strokeWidth="2"
          />
          {/* Inner Golden Core */}
          <path
            d="M 185 200 A 35 35 0 0 1 255 200 Z"
            fill="#eab308"
          />

          {/* Symmetrical Florets & Pearl Beads along Ring 2 */}
          {[...Array(19)].map((_, idx) => {
            const angle = (idx + 1) * 9 - 90;
            const rad = (angle * Math.PI) / 180;
            const cx = 220 + 168 * Math.cos(rad);
            const cy = 200 + 168 * Math.sin(rad);
            return (
              <g key={`bead-${idx}`}>
                <circle
                  cx={cx}
                  cy={cy}
                  r="5"
                  fill="#fde047"
                  stroke="#7c2d12"
                  strokeWidth="1.2"
                />
                <circle
                  cx={cx}
                  cy={cy}
                  r="2"
                  fill="#ffffff"
                />
              </g>
            );
          })}

          {/* Radial Lotus Petals radiating from Center Core */}
          {[...Array(11)].map((_, idx) => {
            const angle = (idx + 1) * 15 - 90;
            const rad = (angle * Math.PI) / 180;
            const cx = 220 + 94 * Math.cos(rad);
            const cy = 200 + 94 * Math.sin(rad);
            return (
              <polygon
                key={`petal-${idx}`}
                points={`${cx},${cy - 8} ${cx + 6},${cy} ${cx},${cy + 8} ${cx - 6},${cy}`}
                fill="#fef08a"
                stroke="#b45309"
                strokeWidth="1"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
});

FestiveDecor.displayName = 'FestiveDecor';

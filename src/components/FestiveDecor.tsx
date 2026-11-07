import React from 'react';

export const FestiveDecor: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden select-none">
      {/* Top Hanging Fairy Lights Garland */}
      <div className="absolute top-0 left-0 right-0 flex justify-between px-2 pt-0">
        {[...Array(20)].map((_, i) => {
          const wireLengths = [30, 48, 62, 48, 30, 20];
          const height = wireLengths[i % wireLengths.length];
          const delay = (i % 6) * 0.35;
          return (
            <div key={i} className="flex flex-col items-center">
              <div 
                className="w-[1.2px] bg-gradient-to-b from-amber-300/40 via-amber-400/80 to-yellow-200"
                style={{ height: `${height}px` }}
              />
              <div
                className="w-3.5 h-3.5 rounded-full bg-amber-300 shadow-[0_0_16px_#f59e0b] border border-amber-100 animate-pulse-glow -mt-1"
                style={{ animationDelay: `${delay}s` }}
              />
            </div>
          );
        })}
      </div>

      {/* Floating Starlight Sparkles */}
      <div className="absolute top-14 left-0 right-0 flex justify-around opacity-80">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-yellow-200 animate-ping"
            style={{
              animationDuration: `${2 + (i % 3) * 0.7}s`,
              animationDelay: `${i * 0.3}s`,
              boxShadow: '0 0 12px #fef08a'
            }}
          />
        ))}
      </div>

      {/* Bottom Festive Anchor: Marigold Garland & Floral Rangoli */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
        <div className="flex -space-x-3 mb-[-14px] z-10">
          {['#f97316', '#eab308', '#ea580c', '#f59e0b', '#dc2626', '#f59e0b', '#ea580c', '#eab308', '#f97316'].map((color, idx) => (
            <div
              key={idx}
              className="w-9 h-9 rounded-full border border-amber-200/40 flex items-center justify-center shadow-[0_0_14px_rgba(249,115,22,0.85)]"
              style={{ backgroundColor: color }}
            >
              <div className="w-3.5 h-3.5 rounded-full bg-amber-950/25" />
            </div>
          ))}
        </div>

        <svg viewBox="0 0 320 140" className="w-80 sm:w-96 h-36 drop-shadow-[0_0_22px_rgba(245,158,11,0.6)]">
          <path d="M 10 140 A 150 150 0 0 1 310 140 Z" fill="#881337" stroke="#fef08a" strokeWidth="1.5" />
          <path d="M 32 140 A 128 128 0 0 1 288 140 Z" fill="#065f46" stroke="#fde047" strokeWidth="1.5" />
          <path d="M 60 140 A 100 100 0 0 1 260 140 Z" fill="#b45309" stroke="#fef08a" strokeWidth="1.5" />
          <path d="M 90 140 A 70 70 0 0 1 230 140 Z" fill="#4c0519" stroke="#fbbf24" strokeWidth="1.5" />
          <path d="M 125 140 A 35 35 0 0 1 195 140 Z" fill="#e11d48" />

          {[...Array(13)].map((_, idx) => {
            const angle = (idx + 1) * 13 - 90;
            const rad = (angle * Math.PI) / 180;
            const cx = 160 + 114 * Math.cos(rad);
            const cy = 140 + 114 * Math.sin(rad);
            return (
              <circle
                key={idx}
                cx={cx}
                cy={cy}
                r="4.5"
                fill="#fde047"
                stroke="#9a3412"
                strokeWidth="1"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};

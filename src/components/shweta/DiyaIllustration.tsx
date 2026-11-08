import React from 'react';

interface DiyaProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showPetioles?: boolean;
  className?: string;
}

export const DiyaIllustration: React.FC<DiyaProps> = ({ 
  size = 'md', 
  showPetioles = true,
  className = '' 
}) => {
  const sizeMap = {
    sm: { width: 64, height: 56, flameHeight: 28 },
    md: { width: 96, height: 84, flameHeight: 42 },
    lg: { width: 140, height: 120, flameHeight: 60 },
    xl: { width: 190, height: 160, flameHeight: 80 },
  };

  const { width, height } = sizeMap[size];

  return (
    <div className={`relative inline-flex flex-col items-center justify-center ${className}`}>
      {/* Outer ambient warm glow radial */}
      <div 
        className="absolute -top-6 rounded-full pointer-events-none animate-pulse-glow"
        style={{
          width: width * 1.8,
          height: width * 1.8,
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.35) 0%, rgba(245, 158, 11, 0.15) 45%, rgba(0, 0, 0, 0) 70%)',
          filter: 'blur(16px)',
        }}
      />

      {/* SVG Diya with realistic layered flame */}
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 100 90" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 drop-shadow-[0_10px_20px_rgba(245,158,11,0.3)]"
      >
        <defs>
          {/* Flame gradients */}
          <linearGradient id="flameOuter" x1="50" y1="5" x2="50" y2="45" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="25%" stopColor="#fef08a" />
            <stop offset="55%" stopColor="#f59e0b" />
            <stop offset="90%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="flameInner" x1="50" y1="12" x2="50" y2="42" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#fef3c7" />
            <stop offset="80%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.6" />
          </linearGradient>

          {/* Diya Clay/Brass gradient */}
          <linearGradient id="brassBody" x1="10" y1="42" x2="90" y2="82" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="20%" stopColor="#d97706" />
            <stop offset="50%" stopColor="#fef08a" />
            <stop offset="75%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          <linearGradient id="rimHighlight" x1="20" y1="46" x2="80" y2="46" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="50%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          {/* Base Stand gradient */}
          <linearGradient id="baseGrad" x1="30" y1="80" x2="70" y2="88" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="50%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>
        </defs>

        {/* Decorative floral rangoli petals at base if enabled */}
        {showPetioles && (
          <g opacity="0.65">
            <ellipse cx="25" cy="82" rx="10" ry="3" fill="#f59e0b" transform="rotate(-15 25 82)" />
            <ellipse cx="75" cy="82" rx="10" ry="3" fill="#f59e0b" transform="rotate(15 75 82)" />
            <ellipse cx="50" cy="86" rx="18" ry="4" fill="#d97706" />
            <circle cx="35" cy="84" r="2" fill="#fef08a" />
            <circle cx="50" cy="87" r="2.5" fill="#fffbeb" />
            <circle cx="65" cy="84" r="2" fill="#fef08a" />
          </g>
        )}

        {/* The Diya Stand / Foot */}
        <path 
          d="M38 74 C38 78, 30 83, 26 84 C40 86, 60 86, 74 84 C70 83, 62 78, 62 74 Z" 
          fill="url(#baseGrad)" 
        />

        {/* The Diya Body (Traditional Brass curved bowl) */}
        <path 
          d="M12 48 C16 68, 32 78, 50 78 C68 78, 84 68, 88 48 C75 52, 25 52, 12 48 Z" 
          fill="url(#brassBody)" 
        />

        {/* Embossed traditional decorative border dots along rim */}
        <g opacity="0.8">
          <circle cx="22" cy="51" r="1.5" fill="#fef3c7" />
          <circle cx="31" cy="53" r="1.5" fill="#fef3c7" />
          <circle cx="40" cy="54" r="1.5" fill="#fef3c7" />
          <circle cx="50" cy="54.5" r="1.8" fill="#ffffff" />
          <circle cx="60" cy="54" r="1.5" fill="#fef3c7" />
          <circle cx="69" cy="53" r="1.5" fill="#fef3c7" />
          <circle cx="78" cy="51" r="1.5" fill="#fef3c7" />
        </g>

        {/* Rim Edge Highlight */}
        <ellipse cx="50" cy="48" rx="38" ry="5.5" fill="none" stroke="url(#rimHighlight)" strokeWidth="1.2" />

        {/* The Wick (Cotton Baati) */}
        <path 
          d="M50 48 Q49 42 50 38" 
          stroke="#451a03" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
        />

        {/* Outer Flame with animated flicker */}
        <g className="animate-diya-flicker origin-bottom" style={{ transformOrigin: '50px 44px' }}>
          {/* Flame outer aura */}
          <path 
            d="M50 8 C44 20, 36 28, 36 36 C36 43, 42 47, 50 47 C58 47, 64 43, 64 36 C64 28, 56 20, 50 8 Z" 
            fill="url(#flameOuter)" 
          />

          {/* Flame inner vibrant core */}
          <path 
            d="M50 16 C46 24, 42 30, 42 36 C42 41, 45 44, 50 44 C55 44, 58 41, 58 36 C58 30, 54 24, 50 16 Z" 
            fill="url(#flameInner)" 
          />

          {/* White-hot center spark */}
          <ellipse cx="50" cy="38" rx="3.5" ry="5" fill="#ffffff" opacity="0.9" />
        </g>
      </svg>
    </div>
  );
};

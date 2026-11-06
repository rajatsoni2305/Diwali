
import React from 'react';

type FestiveDecorProps = {
  variant?: 'full' | 'subtle';
};

const FestiveDecor: React.FC<FestiveDecorProps> = ({ variant = 'full' }) => {
  const lights = Array.from({ length: 13 }, (_, index) => ({
    x: 4 + index * 7.65,
    y: 13 + Math.sin((index / 12) * Math.PI) * 23,
    delay: `${(index % 5) * 0.28}s`,
  }));

  return (
    <>
      <style>{`
        .festive-decor {
          position: fixed;
          inset: 0;
          z-index: 25;
          pointer-events: none;
          overflow: hidden;
          isolation: isolate;
        }

        .festive-lights {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 112px;
          overflow: visible;
          opacity: 0.96;
        }

        .festive-wire {
          fill: none;
          stroke: rgba(218, 174, 100, 0.68);
          stroke-width: 1.3;
        }

        .festive-bulb {
          transform-box: fill-box;
          transform-origin: center;
          animation: festiveTwinkle 2.4s ease-in-out infinite;
          filter: drop-shadow(0 0 5px currentColor);
        }

        .festive-bulb:nth-of-type(2n) { animation-duration: 3.1s; }
        .festive-bulb:nth-of-type(3n) { animation-duration: 2s; }

        @keyframes festiveTwinkle {
          0%, 100% { opacity: .55; transform: scale(.82); }
          50% { opacity: 1; transform: scale(1.16); }
        }

        .festive-corner {
          position: absolute;
          bottom: -24px;
          width: clamp(105px, 17vw, 220px);
          height: auto;
          opacity: .88;
          filter: drop-shadow(0 0 15px rgba(255, 153, 64, .18));
        }

        .festive-corner.left {
          left: -13px;
          transform: rotate(-9deg);
        }

        .festive-corner.right {
          right: -13px;
          transform: scaleX(-1) rotate(-9deg);
        }

        .festive-rangoli {
          position: absolute;
          bottom: -112px;
          left: 50%;
          width: clamp(190px, 29vw, 360px);
          height: auto;
          transform: translateX(-50%);
          opacity: .54;
          filter: drop-shadow(0 0 16px rgba(244, 177, 81, .2));
        }

        .festive-grain {
          position: absolute;
          inset: 0;
          opacity: .16;
          background-image:
            radial-gradient(circle, rgba(255, 221, 157, .7) .7px, transparent 1px);
          background-size: 37px 37px;
          mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
        }

        .festive-edge-glow {
          position: absolute;
          inset: 0;
          box-shadow: inset 0 0 100px rgba(147, 75, 34, .12);
        }

        .festive-decor.subtle .festive-corner,
        .festive-decor.subtle .festive-rangoli {
          opacity: .22;
        }

        .festive-decor.subtle .festive-lights {
          opacity: .52;
        }

        @media (max-width: 600px) {
          .festive-lights {
            height: 78px;
          }

          .festive-corner {
            width: 112px;
            bottom: -12px;
          }

          .festive-rangoli {
            width: 210px;
            bottom: -78px;
            opacity: .38;
          }

          .festive-grain {
            background-size: 29px 29px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .festive-bulb {
            animation: none;
          }
        }
      `}</style>

      <div
        className={`festive-decor ${variant === 'subtle' ? 'subtle' : ''}`}
        aria-hidden="true"
      >
        {/* Hanging fairy-light strings */}
        <svg
          className="festive-lights"
          viewBox="0 0 1000 112"
          preserveAspectRatio="none"
        >
          {lights.map((light, index) => (
            <g key={index}>
              <path
                className="festive-wire"
                d={`M ${light.x * 10} 0 Q ${light.x * 10} ${light.y * 2.5} ${light.x * 10} ${light.y * 2.5}`}
              />
              <path
                d={`M ${light.x * 10} ${light.y * 2.5} l 0 8`}
                stroke="rgba(218,174,100,.7)"
                strokeWidth="1"
              />
              <circle
                className="festive-bulb"
                cx={light.x * 10}
                cy={light.y * 2.5 + 13}
                r="4.2"
                fill={index % 4 === 0 ? '#ffcf75' : index % 4 === 1 ? '#ff9c83' : index % 4 === 2 ? '#f9e6ad' : '#d9a7ff'}
                color="#ffca72"
                style={{ animationDelay: light.delay }}
              />
              <circle
                cx={light.x * 10}
                cy={light.y * 2.5 + 13}
                r="9"
                fill="#ffbd62"
                opacity=".12"
              />
            </g>
          ))}
          <path
            className="festive-wire"
            d="M 0 0 Q 125 56 250 22 T 500 22 T 750 22 T 1000 0"
          />
        </svg>

        {/* Left marigold decoration */}
        <svg className="festive-corner left" viewBox="0 0 220 190">
          <defs>
            <radialGradient id="marigoldGold">
              <stop offset="0%" stopColor="#ffdc7c" />
              <stop offset="65%" stopColor="#ed9b32" />
              <stop offset="100%" stopColor="#a94e20" />
            </radialGradient>
          </defs>
          <path d="M 0 190 Q 50 135 115 115 Q 155 85 205 0" fill="none" stroke="#557342" strokeWidth="5" />
          {[ [32,160], [82,126], [139,85], [184,35] ].map(([x,y], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              {Array.from({ length: 12 }, (_, petal) => (
                <ellipse
                  key={petal}
                  cx="0"
                  cy="-11"
                  rx="5.5"
                  ry="13"
                  fill="url(#marigoldGold)"
                  transform={`rotate(${petal * 30})`}
                />
              ))}
              <circle r="6" fill="#8e421c" />
            </g>
          ))}
          <path d="M 56 145 Q 25 105 9 117 Q 19 151 56 145" fill="#63834a" />
          <path d="M 116 104 Q 91 65 73 77 Q 83 108 116 104" fill="#75944f" />
          <path d="M 163 62 Q 146 27 127 37 Q 135 65 163 62" fill="#63834a" />
        </svg>

        {/* Right marigold decoration */}
        <svg className="festive-corner right" viewBox="0 0 220 190">
          <path d="M 0 190 Q 50 135 115 115 Q 155 85 205 0" fill="none" stroke="#557342" strokeWidth="5" />
          {[ [32,160], [82,126], [139,85], [184,35] ].map(([x,y], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              {Array.from({ length: 12 }, (_, petal) => (
                <ellipse
                  key={petal}
                  cx="0"
                  cy="-11"
                  rx="5.5"
                  ry="13"
                  fill="#ed9b32"
                  transform={`rotate(${petal * 30})`}
                />
              ))}
              <circle r="6" fill="#8e421c" />
            </g>
          ))}
          <path d="M 56 145 Q 25 105 9 117 Q 19 151 56 145" fill="#63834a" />
          <path d="M 116 104 Q 91 65 73 77 Q 83 108 116 104" fill="#75944f" />
          <path d="M 163 62 Q 146 27 127 37 Q 135 65 163 62" fill="#63834a" />
        </svg>

        {/* Decorative rangoli */}
        <svg className="festive-rangoli" viewBox="0 0 300 300">
          <g transform="translate(150 150)" fill="none" stroke="#e5b96e">
            <circle r="137" strokeWidth="1.4" />
            <circle r="124" strokeWidth="1" strokeDasharray="3 5" />
            <circle r="96" strokeWidth="1.4" />
            <circle r="65" strokeWidth="1.2" />
            {Array.from({ length: 16 }, (_, i) => (
              <g key={i} transform={`rotate(${i * 22.5})`}>
                <path
                  d="M 0 -137 Q 22 -111 0 -88 Q -22 -111 0 -137Z"
                  fill={i % 2 ? '#c77c73' : '#d9a64e'}
                  fillOpacity=".2"
                  strokeWidth="1.1"
                />
                <circle cx="0" cy="-76" r="3" fill="#f1d29b" />
              </g>
            ))}
            {Array.from({ length: 8 }, (_, i) => (
              <g key={i} transform={`rotate(${i * 45})`}>
                <path
                  d="M 0 -65 Q 30 -38 0 0 Q -30 -38 0 -65Z"
                  fill="#d59c57"
                  fillOpacity=".17"
                  strokeWidth="1.2"
                />
              </g>
            ))}
            <circle r="23" fill="#e3b45e" fillOpacity=".18" />
            <circle r="8" fill="#f0d69e" fillOpacity=".7" />
          </g>
        </svg>

        <div className="festive-grain" />
        <div className="festive-edge-glow" />
      </div>
    </>
  );
};

export default FestiveDecor;

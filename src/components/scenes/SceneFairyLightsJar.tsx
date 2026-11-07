import React from 'react';

interface Props {
  onNext: () => void;
}

export const SceneFairyLightsJar: React.FC<Props> = ({ onNext }) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center select-none pt-12 pb-24">
      <div className="relative w-44 h-64 mx-auto mb-6 flex flex-col items-center animate-float-gentle">
        <div className="relative z-20 flex items-center justify-center -mb-2">
          <div className="w-6 h-6 rounded-full bg-rose-600 shadow-[0_0_10px_#f43f5e]" />
          <div className="w-8 h-8 rounded-full bg-amber-500 shadow-[0_0_12px_#f59e0b] -ml-2" />
          <div className="w-6 h-6 rounded-full bg-orange-500 shadow-[0_0_10px_#f97316] -ml-2" />
        </div>
        <div className="w-24 h-4 bg-amber-800 rounded-md z-10 border border-amber-300/50" />

        <div className="relative w-36 h-52 border-2 border-yellow-200/50 rounded-2xl bg-gradient-to-b from-yellow-300/10 via-amber-500/20 to-yellow-200/10 backdrop-blur-sm shadow-[0_0_35px_rgba(251,191,36,0.6)] overflow-hidden flex items-center justify-center">
          {[...Array(18)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-yellow-100 animate-ping"
              style={{
                top: `${14 + (i * 19) % 72}%`,
                left: `${14 + (i * 31) % 72}%`,
                animationDuration: `${1.1 + (i % 4) * 0.4}s`,
                boxShadow: '0 0 10px 3px #fef08a'
              }}
            />
          ))}
          <div className="w-16 h-28 rounded-full bg-yellow-400/35 blur-xl" />
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-serif text-amber-100 mb-2">
        Remember our celebrations?
      </h2>
      <p className="text-amber-200/80 italic font-light text-sm max-w-xs mb-8">
        "Every little light reminds me of your smile and every moment we've shared..."
      </p>

      <button
        onClick={onNext}
        className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-medium shadow-[0_0_20px_rgba(245,158,11,0.5)] active:scale-95 transition-all"
      >
        Cherish The Moments →
      </button>
    </div>
  );
};

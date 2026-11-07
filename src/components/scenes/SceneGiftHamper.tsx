import React from 'react';

interface Props {
  onNext: () => void;
}

export const SceneGiftHamper: React.FC<Props> = ({ onNext }) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center select-none pt-12 pb-24">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-sm animate-ping"
            style={{
              top: `${(i * 17) % 85}%`,
              left: `${(i * 23) % 95}%`,
              backgroundColor: ['#f59e0b', '#ec4899', '#3b82f6', '#10b981', '#fbbf24'][i % 5],
              animationDuration: `${1.8 + (i % 3) * 0.5}s`
            }}
          />
        ))}
      </div>

      <div className="relative w-48 h-48 mb-6 flex items-center justify-center animate-float-gentle">
        <div className="absolute inset-0 bg-pink-500/15 blur-2xl rounded-full" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="flex -space-x-2 text-2xl -mb-2 z-20">
            <span>🎁</span>
            <span className="scale-125">🍫</span>
            <span>🍬</span>
            <span className="scale-110">🪔</span>
          </div>
          <div className="w-36 h-24 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-900 rounded-b-3xl border-2 border-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.6)] flex flex-col items-center justify-center p-2">
            <div className="w-10 h-6 bg-red-600 rounded-full border border-red-300 shadow-md flex items-center justify-center text-xs text-white">
              🎀
            </div>
            <div className="w-full h-[1.5px] bg-yellow-300/60 my-1" />
            <span className="text-[10px] tracking-widest text-amber-200 uppercase font-serif">
              Handcrafted For You
            </span>
          </div>
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-serif text-amber-100 mb-2">
        Diwali without you? <span className="text-pink-400 font-bold">Illegal.</span>
      </h2>
      <p className="text-amber-200/80 italic font-light text-sm max-w-xs mb-8">
        "Who am I supposed to celebrate with, share all the sweets with, and smile at? Only you."
      </p>

      <button
        onClick={onNext}
        className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white font-medium shadow-[0_0_25px_rgba(244,63,94,0.6)] active:scale-95 transition-all"
      >
        Claim Your Hamper 🎁
      </button>
    </div>
  );
};

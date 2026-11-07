import React from 'react';

interface Props {
  onNext: () => void;
}

export const SceneHangingLanterns: React.FC<Props> = ({ onNext }) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center select-none pt-12 pb-24">
      <div className="relative w-64 h-64 flex items-center justify-center mb-6">
        <div className="absolute inset-0 rounded-full border border-amber-400/20 animate-spin" style={{ animationDuration: '30s' }} />
        <div className="absolute inset-4 rounded-full border border-amber-400/30" />
        <div className="absolute inset-10 rounded-full bg-amber-500/10 blur-xl" />

        <div className="relative z-10 flex space-x-6 items-start animate-sway">
          <div className="flex flex-col items-center">
            <div className="w-[1.5px] h-10 bg-amber-300/60" />
            <div className="w-14 h-14 rounded-full bg-gradient-to-b from-orange-500 to-red-600 border border-amber-300 shadow-[0_0_25px_#ea580c] flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-yellow-200 blur-[2px] animate-pulse" />
            </div>
            <div className="w-1 h-6 bg-red-400/80 -mt-0.5" />
          </div>

          <div className="flex flex-col items-center mt-3">
            <div className="w-[1.5px] h-6 bg-amber-300/60" />
            <div className="w-12 h-18 bg-gradient-to-b from-amber-400 to-yellow-600 rounded-md border border-yellow-200 shadow-[0_0_25px_#f59e0b] p-1 flex flex-col justify-between items-center">
              <div className="w-full h-1 bg-amber-800/60" />
              <div className="w-4 h-7 rounded-sm bg-yellow-100 blur-[2px] animate-flame" />
              <div className="w-full h-1 bg-amber-800/60" />
            </div>
            <div className="flex space-x-1 -mt-0.5">
              <div className="w-0.5 h-5 bg-yellow-300" />
              <div className="w-0.5 h-6 bg-yellow-400" />
              <div className="w-0.5 h-5 bg-yellow-300" />
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-serif text-amber-100 mb-2">
        Same chaos, different cities
      </h2>
      <p className="text-amber-300/80 italic font-light text-sm max-w-xs mb-8">
        "Distance is just geography when someone lives in your heart..."
      </p>

      <button
        onClick={onNext}
        className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-medium shadow-[0_0_20px_rgba(245,158,11,0.5)] active:scale-95 transition-all"
      >
        Bridging the Distance →
      </button>
    </div>
  );
};

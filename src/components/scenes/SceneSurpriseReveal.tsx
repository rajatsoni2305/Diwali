import React from 'react';

interface Props {
  onNext: () => void;
}

export const SceneSurpriseReveal: React.FC<Props> = ({ onNext }) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center select-none pt-12 pb-24">
      <div className="relative w-64 h-56 mb-6 flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-amber-500/20 blur-3xl rounded-full" />
        
        <div className="flex space-x-6 mb-3">
          <div className="w-2.5 h-3.5 bg-yellow-200 rounded-full animate-flame" />
          <div className="w-2.5 h-3.5 bg-yellow-200 rounded-full animate-flame" />
        </div>

        <div className="relative z-10 flex flex-col items-center scale-150 mb-3">
          <div className="w-3.5 h-6 bg-gradient-to-t from-orange-500 via-yellow-200 to-white rounded-full animate-flame shadow-[0_0_25px_#f59e0b]" />
          <div className="w-8 h-4 bg-amber-700 rounded-b-full border-t border-amber-400" />
        </div>

        <div className="flex space-x-8">
          <div className="w-3 h-4 bg-yellow-200 rounded-full animate-flame" />
          <div className="w-3 h-4 bg-yellow-200 rounded-full animate-flame" />
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-serif text-amber-100 mb-2">
        Let's light up Diwali together ✨
      </h2>
      <p className="text-amber-200/80 italic font-light text-sm max-w-xs mb-8">
        "No matter the distance, under the same glowing sky, my heart is right next to yours."
      </p>

      <button
        onClick={onNext}
        className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-medium shadow-[0_0_25px_rgba(245,158,11,0.6)] active:scale-95 transition-all"
      >
        Open Our Memories 📖
      </button>
    </div>
  );
};

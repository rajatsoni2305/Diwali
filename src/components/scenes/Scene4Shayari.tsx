import React from 'react';

interface Props {
  onNext: () => void;
  customShayari?: string[];
}

export const Scene4Shayari: React.FC<Props> = ({ onNext }) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center select-none pt-12 pb-24">
      <div className="absolute w-72 h-72 bg-purple-600/25 blur-3xl rounded-full pointer-events-none" />

      {/* Decorative Diary Style Frame */}
      <div className="festive-glass rounded-3xl p-8 max-w-md w-full relative z-10 border-2 border-amber-300/40 shadow-[0_0_35px_rgba(245,158,11,0.35)]">
        <h2 className="text-2xl font-serif text-amber-200 font-bold mb-4 tracking-wide drop-shadow-[0_2px_10px_rgba(251,191,36,0.6)]">
          अर्ज़ किया है..! 🪔
        </h2>

        <div className="space-y-3 font-serif text-amber-100 text-lg sm:text-xl leading-relaxed">
          <p className="drop-shadow-[0_2px_8px_rgba(251,191,36,0.3)]">
            किसी को दिल का दीवाना पसंद है,
          </p>
          <p className="drop-shadow-[0_2px_8px_rgba(251,191,36,0.3)]">
            तो किसी को दिल का नजराना पसंद है,
          </p>
          <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-3" />
          <p className="drop-shadow-[0_2px_8px_rgba(251,191,36,0.3)]">
            औरों की पसंद का तो पता नहीं,
          </p>
          <p className="font-semibold text-amber-300 text-xl sm:text-2xl drop-shadow-[0_2px_12px_rgba(251,191,36,0.8)]">
            हमें तो आपका मुस्कुराना पसंद है ..! ✨
          </p>
        </div>

        <div className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto mt-6 mb-3" />

        <p className="text-xs text-amber-300/70 italic">
          — Straight from the heart
        </p>
      </div>

      <button
        onClick={onNext}
        className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium shadow-[0_0_25px_rgba(245,158,11,0.6)] active:scale-95 transition-all hover:brightness-110"
      >
        Read On →
      </button>
    </div>
  );
};

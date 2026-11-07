import React from 'react';

interface Props {
  onNext: () => void;
  senderName?: string;
  recipientName?: string;
}

export const SceneGrandThali: React.FC<Props> = ({ onNext, senderName = "Rajat", recipientName = "Tanisha" }) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center select-none pt-12 pb-24">
      <div className="relative mb-6">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-amber-300 text-4xl animate-spin" style={{ animationDuration: '9s' }}>
          ✨
        </div>

        <div className="relative w-56 h-32 flex items-center justify-center">
          <div className="absolute inset-0 bg-orange-600/20 blur-2xl rounded-full" />
          <div className="absolute w-48 h-16 rounded-full border-4 border-dashed border-amber-400/60 bg-amber-900/30 flex items-center justify-around px-3">
            {['🌸', '🌼', '🌺', '🌼', '🌸'].map((flower, i) => (
              <span key={i} className="text-lg opacity-85">{flower}</span>
            ))}
          </div>

          <div className="relative z-10 flex items-end space-x-4">
            <div className="flex flex-col items-center scale-90">
              <div className="w-2.5 h-3.5 bg-yellow-200 rounded-full animate-flame" />
              <div className="w-6 h-3 bg-amber-800 rounded-b-full border-t border-amber-500" />
            </div>
            <div className="flex flex-col items-center scale-125 -mb-1">
              <div className="w-3.5 h-5 bg-gradient-to-t from-orange-500 via-amber-200 to-white rounded-full animate-flame shadow-[0_0_20px_#f59e0b]" />
              <div className="w-8 h-4 bg-amber-700 rounded-b-full border-t border-amber-400" />
            </div>
            <div className="flex flex-col items-center scale-90">
              <div className="w-2.5 h-3.5 bg-yellow-200 rounded-full animate-flame" />
              <div className="w-6 h-3 bg-amber-800 rounded-b-full border-t border-amber-500" />
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-serif text-amber-200 tracking-wider mb-1 font-bold drop-shadow-[0_2px_8px_rgba(251,191,36,0.6)]">
        HAPPY DIWALI
      </h1>
      <h3 className="text-xl font-serif text-orange-300 italic mb-4">Dearest {recipientName}!</h3>

      <div className="festive-glass rounded-2xl px-6 py-4 max-w-xs mb-8">
        <p className="text-amber-100 text-sm font-light leading-relaxed">
          "Save me some sweets, I'm coming for them...<br />
          <span className="font-medium text-amber-300">— {senderName} 😎✨</span>"
        </p>
        <span className="text-xs text-amber-300/70 mt-2 block font-mono">
          ♪ Sent with love, across every mile
        </span>
      </div>

      <button
        onClick={onNext}
        className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium shadow-[0_0_20px_rgba(245,158,11,0.5)] active:scale-95 transition-all"
      >
        See What's Next ✨
      </button>
    </div>
  );
};

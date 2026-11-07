import React from 'react';

interface Props {
  onNext: () => void;
  recipientName?: string;
}

export const SceneDiyaHeart: React.FC<Props> = ({ onNext, recipientName = "Tanisha" }) => {
  const heartDiyas = [
    { top: '14%', left: '33%' }, { top: '8%', left: '42%' }, { top: '14%', left: '50%' },
    { top: '8%', left: '58%' }, { top: '14%', left: '67%' },
    { top: '26%', left: '24%' }, { top: '26%', left: '76%' },
    { top: '42%', left: '30%' }, { top: '42%', left: '70%' },
    { top: '58%', left: '39%' }, { top: '58%', left: '61%' },
    { top: '74%', left: '50%' }
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center select-none pt-12 pb-24">
      <div className="relative w-64 h-64 mb-6">
        <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        {heartDiyas.map((pos, i) => (
          <div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-transform hover:scale-125"
            style={{ top: pos.top, left: pos.left }}
          >
            <div className="w-3 h-4 bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 rounded-[50%_50%_20%_20%] shadow-[0_0_15px_#f59e0b] animate-flame" />
            <div className="w-5 h-2.5 bg-amber-800 rounded-b-full border-t border-amber-600 shadow-md" />
          </div>
        ))}
      </div>

      <h2 className="text-2xl sm:text-3xl font-serif text-amber-100 mb-2 drop-shadow-[0_2px_10px_rgba(251,191,36,0.5)]">
        {recipientName}... Happy Diwali 🪔
      </h2>
      <p className="text-amber-200/90 text-sm italic font-light max-w-xs mb-8 leading-relaxed">
        "Diwali without you is just noise...<br />So I brought all these lights to shine just for you."
      </p>

      <button
        onClick={onNext}
        className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-medium tracking-wide shadow-[0_0_25px_rgba(245,158,11,0.6)] active:scale-95 transition-all hover:brightness-110"
      >
        Light Up My World →
      </button>
    </div>
  );
};

import React, { useState } from 'react';

interface Props {
  onNext: () => void;
}

export const SceneInteractiveCrackers: React.FC<Props> = ({ onNext }) => {
  const [litItems, setLitItems] = useState<{ [key: string]: boolean }>({});

  const crackers = [
    { id: 'anar', name: 'Golden Anar', icon: '🌋', spark: '✨ 🌟 ✨' },
    { id: 'chakri', name: 'Zamin Chakri', icon: '🌀', spark: '💫 ✨ 💫' },
    { id: 'rocket', name: 'Sky Rocket', icon: '🚀', spark: '🎆 💥 🎆' },
    { id: 'bomb', name: 'Sutli Bomb', icon: '💣', spark: '💥 💥 💥' },
    { id: 'sparkler', name: 'Fuljhadi', icon: '🪄', spark: '✨ ⭐️ ✨' },
  ];

  const handleLight = (id: string) => {
    setLitItems(prev => ({ ...prev, [id]: true }));
  };

  const allLit = Object.keys(litItems).length >= 3;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center select-none pt-12 pb-24">
      <h2 className="text-2xl sm:text-3xl font-serif text-amber-100 mb-1">
        Light them up! 🎆
      </h2>
      <p className="text-amber-200/70 text-xs tracking-wider mb-6">
        Tap a cracker to light it
      </p>

      <div className="grid grid-cols-3 gap-4 max-w-xs mb-8">
        {crackers.map((item, idx) => {
          const isLit = litItems[item.id];
          return (
            <div
              key={item.id}
              onClick={() => handleLight(item.id)}
              className={`relative flex flex-col items-center justify-center p-3 rounded-2xl cursor-pointer transition-all ${
                idx === 4 ? 'col-span-3 w-28 mx-auto' : ''
              } ${
                isLit
                  ? 'bg-amber-500/25 border-2 border-yellow-300 shadow-[0_0_20px_rgba(251,191,36,0.8)] scale-105'
                  : 'bg-white/5 border border-white/10 hover:border-amber-400/40 hover:scale-105'
              }`}
            >
              <div className="text-3xl mb-1 select-none">
                {isLit ? '🔥' : item.icon}
              </div>
              <span className="text-[11px] font-medium text-amber-200">
                {item.name}
              </span>
              {isLit && (
                <span className="text-[10px] text-yellow-300 absolute -bottom-5 whitespace-nowrap animate-bounce font-bold">
                  {item.spark}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={onNext}
        className={`px-8 py-3 rounded-full font-medium transition-all ${
          allLit
            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-[0_0_25px_#f59e0b] scale-105'
            : 'bg-white/10 text-amber-200/80 border border-white/20 hover:bg-white/20'
        }`}
      >
        {allLit ? "You're magical! Let's continue →" : "Tap at least 3 to ignite"}
      </button>
    </div>
  );
};

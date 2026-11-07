import React, { useState } from 'react';

interface Props {
  onNext: () => void;
  photos?: string[];
  recipientName?: string;
}

export const Scene16MemoryRoom: React.FC<Props> = ({
  onNext,
  photos = [],
  recipientName = "Tanisha"
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);

  const displayPhotos = photos.length > 0 ? photos : [
    'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=800&auto=format&fit=crop'
  ];

  const handleNextPhoto = () => {
    setPhotoIndex((prev) => (prev + 1) % displayPhotos.length);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center select-none pt-12 pb-24">
      <h2 className="text-2xl sm:text-3xl font-serif text-amber-100 mb-1 drop-shadow-[0_2px_10px_rgba(251,191,36,0.5)]">
        Diwali Memory Frame 📸
      </h2>
      <p className="text-amber-200/80 text-xs italic mb-6">
        Special moments with {recipientName}
      </p>

      {/* Ornate Picture Frame with Glowing Borders */}
      <div className="relative p-3 rounded-3xl bg-gradient-to-b from-amber-300 via-amber-600 to-yellow-800 shadow-[0_0_35px_rgba(245,158,11,0.6)] max-w-xs w-full mb-6">
        <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-yellow-200 shadow-[0_0_8px_#fef08a] animate-ping" />
        <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-yellow-200 shadow-[0_0_8px_#fef08a] animate-ping" />
        <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-yellow-200 shadow-[0_0_8px_#fef08a] animate-ping" />
        <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-yellow-200 shadow-[0_0_8px_#fef08a] animate-ping" />

        <div className="overflow-hidden rounded-2xl bg-black aspect-[4/5] relative flex items-center justify-center">
          <img
            src={displayPhotos[photoIndex]}
            alt="Diwali Memory"
            className="w-full h-full object-cover transition-opacity duration-500"
          />
        </div>
      </div>

      {displayPhotos.length > 1 && (
        <button
          onClick={handleNextPhoto}
          className="text-xs text-amber-300 underline mb-6 hover:text-amber-100"
        >
          View Next Memory ({photoIndex + 1}/{displayPhotos.length}) 💫
        </button>
      )}

      {/* Embedded Shayari Card */}
      <div className="festive-glass rounded-2xl p-6 max-w-sm text-center mb-8 border border-amber-300/30">
        <h3 className="text-amber-200 font-serif font-bold text-lg mb-2">
          अर्ज़ किया है..! 🪔
        </h3>
        <p className="text-amber-100 text-sm font-serif leading-relaxed mb-1">
          किसी को दिल का दीवाना पसंद है,
        </p>
        <p className="text-amber-100 text-sm font-serif leading-relaxed mb-2">
          तो किसी को दिल का नजराना पसंद है,
        </p>
        <p className="text-amber-100 text-sm font-serif leading-relaxed mb-1">
          औरों की पसंद का तो पता नहीं,
        </p>
        <p className="text-amber-300 text-base font-serif font-semibold leading-relaxed">
          हमें तो आपका मुस्कुराना पसंद है ..! ✨
        </p>
      </div>

      <button
        onClick={onNext}
        className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium shadow-[0_0_20px_rgba(245,158,11,0.5)] active:scale-95 transition-all"
      >
        Make A Wish With Me 🪔
      </button>
    </div>
  );
};

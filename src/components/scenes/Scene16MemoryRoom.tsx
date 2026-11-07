import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEffects } from '../../services/soundEffects';

interface Props {
  onNext: () => void;
  photos?: string[];
  recipientName?: string;
}

export const Scene16MemoryRoom: React.FC<Props> = memo(({
  onNext,
  photos = [],
  recipientName = "Tanisha"
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);

  const displayPhotos = photos && photos.length > 0 ? photos : [
    'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=800&auto=format&fit=crop'
  ];

  const handleNextPhoto = () => {
    try {
      if (typeof (soundEffects as any)?.play === 'function') {
        (soundEffects as any).play('click');
      }
    } catch {
      // safe no-op
    }
    setPhotoIndex((prev) => (prev + 1) % displayPhotos.length);
  };

  const handleContinue = () => {
    try {
      if (typeof (soundEffects as any)?.play === 'function') {
        (soundEffects as any).play('click');
      }
    } catch {
      // safe no-op
    }
    onNext();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-8 text-center select-none pt-20 pb-32">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8 z-10"
      >
        <h2 className="text-3xl sm:text-5xl font-serif font-black text-amber-50 drop-shadow-[0_2px_15px_rgba(251,191,36,0.65)] mb-3">
          Diwali Memory Frame 📸
        </h2>
        <p className="text-amber-200/90 font-serif italic text-base sm:text-lg">
          Special moments and beautiful smiles with {recipientName}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9 }}
        className="relative p-4 rounded-[32px] bg-gradient-to-b from-amber-300 via-amber-600 to-yellow-950 shadow-[0_0_45px_rgba(245,158,11,0.7)] max-w-sm sm:max-w-md w-full mb-6 z-10"
      >
        <div className="absolute top-3 left-3 w-4 h-4 rounded-full bg-yellow-200 shadow-[0_0_12px_#fef08a] animate-ping" />
        <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-yellow-200 shadow-[0_0_12px_#fef08a] animate-ping" />
        <div className="absolute bottom-3 left-3 w-4 h-4 rounded-full bg-yellow-200 shadow-[0_0_12px_#fef08a] animate-ping" />
        <div className="absolute bottom-3 right-3 w-4 h-4 rounded-full bg-yellow-200 shadow-[0_0_12px_#fef08a] animate-ping" />

        <div className="overflow-hidden rounded-2xl bg-black aspect-[4/5] relative flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.img
              key={photoIndex}
              src={displayPhotos[photoIndex]}
              alt="Diwali Memory"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>
      </motion.div>

      {displayPhotos.length > 1 && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNextPhoto}
          className="text-sm text-amber-300 underline mb-8 hover:text-amber-100 font-mono tracking-wider cursor-pointer z-10"
        >
          View Next Memory ({photoIndex + 1}/{displayPhotos.length}) 💫
        </motion.button>
      )}

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="festive-royal-glass rounded-[28px] p-8 max-w-lg w-full text-center mb-8 border border-amber-300/40 z-10"
      >
        <h3 className="text-amber-200 font-serif font-black text-2xl sm:text-3xl mb-5 tracking-wide">
          अर्ज़ किया है..! 🪔
        </h3>
        <p className="text-amber-100 text-lg sm:text-xl font-serif leading-relaxed mb-2">
          किसी को दिल का दीवाना पसंद है ,
        </p>
        <p className="text-amber-100 text-lg sm:text-xl font-serif leading-relaxed mb-4">
          तो किसी को दिल का नजराना पसंद है ,
        </p>
        <div className="w-20 h-[1px] bg-amber-400/50 mx-auto my-3" />
        <p className="text-amber-100 text-lg sm:text-xl font-serif leading-relaxed mb-2">
          औरों की पसंद का तो पता नहीं ,
        </p>
        <p className="text-amber-300 text-xl sm:text-2xl font-serif font-bold leading-relaxed drop-shadow-[0_0_12px_rgba(251,191,36,0.85)]">
          हमें तो आपका मुस्कुराना पसंद है ..! ✨
        </p>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleContinue}
        className="px-12 py-4 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-medium text-lg tracking-wide shadow-[0_0_35px_rgba(245,158,11,0.65)] hover:brightness-110 transition-all border border-amber-300/50 cursor-pointer z-10"
      >
        Make A Wish With Me 🪔
      </motion.button>
    </div>
  );
});

Scene16MemoryRoom.displayName = 'Scene16MemoryRoom';

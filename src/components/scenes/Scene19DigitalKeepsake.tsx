import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Download,
  Printer,
  ArrowRight,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { soundEffects } from '../../services/soundEffects';
import { recordingManager } from '../../services/recordingManager';
import { cloudinaryService } from '../../services/cloudinaryService';
import { sessionService } from '../../services/sessionService';

interface SceneProps {
  onNext: () => void;
}

const SECOND_POEM_LINES = [
  'Tum khubsurat jese Chand lagti ho',
  'Tum nadan lekin pyari behisab lagti ho',
  'Ab ye kanch ka tukta batyega tumhe tumhari khubsurati',
  'Zara meri ankho se pucho tum kitni lajawab lagti ho',
];

export const Scene19DigitalKeepsake: React.FC<SceneProps> = ({ onNext }) => {
  const [keepsakeStage, setKeepsakeStage] = useState<
    'stage1_shayari' | 'stage2_poem'
  >('stage1_shayari');

  const [canAdvanceStage, setCanAdvanceStage] = useState(false);
  const [poemLineStage, setPoemLineStage] = useState(0);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatusText, setUploadStatusText] = useState(
    'Finalizing reaction recording...'
  );

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    soundEffects.playTempleBell();

    const timer = setTimeout(() => {
      setCanAdvanceStage(true);
    }, 4200);

    return () => clearTimeout(timer);
  }, []);

  const handleCompleteQuest = async () => {
    if (recordingManager.isRecordingActive()) {
      setIsFinalizing(true);
      setUploadStatusText('Capturing final quest moments...');
      await sessionService.setRecordingStatus('uploading');

      try {
        const videoBlob = await recordingManager.stopAndFinalize();
        recordingManager.releaseTracks();

        if (videoBlob && videoBlob.size > 0) {
          setUploadStatusText('Preserving your Diwali reaction memory...');

          const result = await cloudinaryService.uploadMedia(
            videoBlob,
            'video',
            (percent) => setUploadProgress(percent)
          );

          await sessionService.saveRecordingCompleted(
            result.assetId,
            result.secureUrl
          );

          setUploadStatusText('Memory safely preserved! ✨');
          soundEffects.playWishChime();

          await new Promise((resolve) => setTimeout(resolve, 1400));
        } else {
          await sessionService.setRecordingStatus('not_recorded');
        }
      } catch (err) {
        console.warn('Reaction recording upload error:', err);
        await sessionService.setRecordingStatus('completed');
      } finally {
        setIsFinalizing(false);
        onNext();
      }
    } else {
      recordingManager.releaseTracks();
      onNext();
    }
  };

  const handleRevealPoem = () => {
    setKeepsakeStage('stage2_poem');
    setPoemLineStage(0);
    soundEffects.playDiyaIgnite(1.2);

    SECOND_POEM_LINES.forEach((_, index) => {
      setTimeout(() => setPoemLineStage(index + 1), 900 + index * 1500);
    });

    setTimeout(() => setPoemLineStage(5), 7200);
  };

  const handleDownloadImage = () => {
    const canvas = document.createElement('canvas');
    const width = 1200;
    const height = 1800;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#faf5eb';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#f0e6d2';
    for (let i = 0; i < 500; i++) {
      ctx.fillRect(Math.random() * width, Math.random() * height, 2, 2);
    }

    ctx.strokeStyle = '#b37d2a';
    ctx.lineWidth = 14;
    ctx.strokeRect(40, 40, width - 80, height - 80);

    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 3;
    ctx.strokeRect(60, 60, width - 120, height - 120);

    ctx.fillStyle = '#b37d2a';
    ctx.font = '36px serif';
    ctx.fillText('❧', 75, 105);
    ctx.fillText('☙', width - 110, 105);
    ctx.fillText('❧', 75, height - 75);
    ctx.fillText('☙', width - 110, height - 75);

    ctx.textAlign = 'center';

    ctx.fillStyle = '#784e1b';
    ctx.font = '600 32px Cinzel, serif';
    ctx.fillText('A LITTLE DIWALI MEMORY', width / 2, 160);

    ctx.fillStyle = '#2a1405';
    ctx.font = 'bold 64px Cinzel, serif';
    ctx.fillText('TANISHA', width / 2, 240);

    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 120, 270);
    ctx.lineTo(width / 2 + 120, 270);
    ctx.stroke();

    ctx.fillStyle = '#851818';
    ctx.font = 'italic 500 42px Kalam, cursive';
    ctx.fillText('Tumhara khubsurat hona nhi', width / 2, 380);
    ctx.fillText('Tumhara hona hi khubsurat hai', width / 2, 440);

    ctx.fillStyle = '#ff9800';
    ctx.beginPath();
    ctx.arc(width / 2, 540, 16, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#6d2f10';
    ctx.fillRect(width / 2 - 25, 555, 50, 14);

    ctx.fillStyle = '#3a200a';
    ctx.font = '500 36px Kalam, cursive';

    const poemY = [760, 900, 1040, 1180];

    SECOND_POEM_LINES.forEach((line, index) => {
      let fontSize = 36;

      if (index >= 2) fontSize = 29;

      ctx.font = `500 ${fontSize}px Kalam, cursive`;
      ctx.fillText(line, width / 2, poemY[index], 1020);
    });

    ctx.fillStyle = '#851818';
    ctx.font = 'bold 38px Kalam, cursive';
    ctx.fillText('— Rajat', width / 2, 1450);

    ctx.fillStyle = '#9c7c4f';
    ctx.font = '24px Cinzel, serif';
    ctx.fillText('Deepavali Chronicle • Eternal Light', width / 2, 1700);

    const link = document.createElement('a');
    link.download = 'tanisha-diwali-keepsake.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-x-hidden bg-[#10091b] px-3 py-8 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(126,79,151,0.22),transparent_75%)] no-print" />

      <div className="relative z-10 mb-5 text-center no-print">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#e8c77d]/40 bg-[#291a35]/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#f2d58e]">
          <Sparkles size={15} />
          Sacred Diwali Memento
          <Sparkles size={15} />
        </div>

        <h2 className="font-cinzel text-xl font-bold tracking-wider text-[#fff0c7] sm:text-3xl">
          THE ROYAL KEEPSAKE
        </h2>
      </div>

      <div className="relative z-10 my-auto w-full max-w-2xl px-1">
        <div
          ref={cardRef}
          className="print-only-card relative w-full overflow-hidden rounded-[2rem] border-4 border-[#b37d2a] bg-gradient-to-br from-[#fff9ed] via-[#f7ecd8] to-[#ead8b9] p-6 text-[#2a1705] shadow-[0_0_70px_rgba(232,199,125,0.22)] sm:p-12"
        >
          <div className="pointer-events-none absolute inset-3 rounded-[1.5rem] border border-[#b37d2a]/40 sm:inset-4" />

          <div className="absolute left-5 top-4 text-xl text-[#b37d2a]">❧</div>
          <div className="absolute right-5 top-4 text-xl text-[#b37d2a]">☙</div>
          <div className="absolute bottom-4 left-5 text-xl text-[#b37d2a]">❧</div>
          <div className="absolute bottom-4 right-5 text-xl text-[#b37d2a]">☙</div>

          <div className="relative z-10 mb-5 text-center">
            <span className="block text-xs font-semibold uppercase tracking-[0.25em] text-[#8c591c] sm:text-sm">
              A Little Diwali Memory
            </span>

            <h1 className="mt-2 font-cinzel text-3xl font-extrabold tracking-wider text-[#2b1406] sm:text-5xl">
              TANISHA
            </h1>

            <div className="mx-auto mt-3 h-px w-28 bg-[#b37d2a]" />
          </div>

          <div className="relative z-10 my-5 flex flex-col items-center">
            <div className="h-9 w-5 rounded-full bg-gradient-to-t from-[#ff6f00] via-[#ffb300] to-[#fffde7] shadow-[0_0_18px_#ff9800] animate-diya-flame" />
            <div className="-mt-1 h-4 w-14 rounded-b-full border-t border-[#b37d2a] bg-gradient-to-r from-[#63290b] via-[#913d10] to-[#4e1f06]" />
          </div>

          <AnimatePresence mode="wait">
            {keepsakeStage === 'stage1_shayari' ? (
              <motion.div
                key="stage1"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 1 }}
                className="relative z-10 my-6 border-y border-[#b37d2a]/30 py-7 text-center"
              >
                <p className="font-kalam text-xl font-bold leading-relaxed tracking-wide text-[#851818] sm:text-3xl">
                  Tumhara khubsurat hona nhi
                  <br />
                  Tumhara hona hi khubsurat hai
                </p>

                <div className="mt-8 flex min-h-12 justify-center no-print">
                  {canAdvanceStage && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleRevealPoem}
                      className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8b5a1b] via-[#c68c35] to-[#8b5a1b] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-lg"
                    >
                      <Sparkles size={15} />
                      Reveal The Royal Verse
                      <ArrowRight size={15} />
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="stage2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 my-5 border-y border-[#b37d2a]/30 py-7 text-center"
              >
                <div className="flex min-h-[310px] flex-col justify-center gap-5 sm:gap-6">
                  {SECOND_POEM_LINES.map((line, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 12, filter: 'blur(5px)' }}
                      animate={
                        poemLineStage > index
                          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                          : { opacity: 0 }
                      }
                      transition={{ duration: 0.9 }}
                      className={`font-kalam leading-relaxed ${
                        index === 3
                          ? 'text-xl font-bold text-[#851818] sm:text-3xl'
                          : 'text-lg text-[#361a07] sm:text-2xl'
                      }`}
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>

                {poemLineStage >= 5 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="mt-6 border-t border-[#b37d2a]/30 pt-5"
                  >
                    <span className="block font-kalam text-3xl font-bold text-[#7a4816]">
                      — Rajat
                    </span>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="relative z-10 mt-6 flex w-full max-w-xl flex-wrap justify-center gap-3 pb-4 no-print">
        <button
          onClick={handleDownloadImage}
          className="flex items-center gap-2 rounded-full border border-[#e8c77d]/50 bg-[#291a35] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#f5d77f]"
        >
          <Download size={15} />
          Save Keepsake Image
        </button>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 rounded-full border border-[#e8c77d]/50 bg-[#291a35] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#f5d77f]"
        >
          <Printer size={15} />
          Print / PDF
        </button>

        {keepsakeStage === 'stage2_poem' && poemLineStage >= 5 && (
          <button
            onClick={handleCompleteQuest}
            disabled={isFinalizing}
            className="flex items-center gap-2 rounded-full border border-[#fff0c7]/70 bg-gradient-to-r from-[#b77c38] via-[#f0ce83] to-[#b77c38] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#25152b] disabled:opacity-50"
          >
            {isFinalizing ? 'Preserving Quest...' : 'Complete The Quest'}
            <ArrowRight size={15} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isFinalizing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#10091b]/95 p-4 text-center backdrop-blur-md"
          >
            <div className="w-full max-w-md rounded-3xl border border-[#e8c77d]/50 bg-[#21142d] p-8 shadow-2xl">
              <div className="mb-5 flex justify-center">
                {uploadProgress >= 100 ? (
                  <CheckCircle2 className="h-12 w-12 text-[#f2d58e]" />
                ) : (
                  <Loader2 className="h-12 w-12 animate-spin text-[#f2d58e]" />
                )}
              </div>

              <h3 className="mb-3 font-cinzel text-xl font-bold text-[#fff0c7]">
                DEEPAVALI CHRONICLE
              </h3>

              <p className="mb-6 text-sm text-[#ecd7b5]">
                {uploadStatusText}
              </p>

              <div className="mb-3 h-2.5 overflow-hidden rounded-full bg-[#10091b]">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#b37d2a] to-[#ffd54f]"
                  animate={{ width: `${Math.max(5, uploadProgress)}%` }}
                />
              </div>

              <span className="text-xs text-[#d9c49e]">
                {uploadProgress > 0 ? `${uploadProgress}%` : 'Finalizing...'}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

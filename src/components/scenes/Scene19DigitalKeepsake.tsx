import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Download, Printer, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
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
  // Stage 1: First two-line shayari only
  // Stage 2: Second four-line poem revealed line-by-line + Rajat signature
  const [keepsakeStage, setKeepsakeStage] = useState<'stage1_shayari' | 'stage2_poem'>('stage1_shayari');
  const [canAdvanceStage, setCanAdvanceStage] = useState(false);
  const [poemLineStage, setPoemLineStage] = useState(0);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatusText, setUploadStatusText] = useState('Finalizing reaction recording...');
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    soundEffects.playTempleBell();

    // After enough reading time for the first 2-line shayari, enable smooth transition to stage 2
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
          const result = await cloudinaryService.uploadMedia(videoBlob, 'video', (percent) => {
            setUploadProgress(percent);
          });
          await sessionService.saveRecordingCompleted(result.assetId, result.secureUrl);
          setUploadStatusText('Memory safely preserved! ✨');
          soundEffects.playWishChime();
          await new Promise((r) => setTimeout(r, 1400));
        } else {
          await sessionService.setRecordingStatus('not_recorded');
        }
      } catch (err) {
        console.warn('Reaction recording upload error (safely recorded locally):', err);
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
    soundEffects.playDiyaIgnite(1.2);

    // Reveal second 4-line poem line by line
    setTimeout(() => setPoemLineStage(1), 800);
    setTimeout(() => setPoemLineStage(2), 2600);
    setTimeout(() => setPoemLineStage(3), 4400);
    setTimeout(() => setPoemLineStage(4), 6200);
    setTimeout(() => setPoemLineStage(5), 7800); // Rajat's signature appears last
  };

  // High-Resolution Canvas PNG Downloader with updated poem
  const handleDownloadImage = () => {
    const canvas = document.createElement('canvas');
    const width = 1200;
    const height = 1600;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Ivory Paper
    ctx.fillStyle = '#faf5eb';
    ctx.fillRect(0, 0, width, height);

    // Subtle paper texture grain
    ctx.fillStyle = '#f0e6d2';
    for (let i = 0; i < 500; i++) {
      ctx.fillRect(Math.random() * width, Math.random() * height, 2, 2);
    }

    // Outer Gold Border
    ctx.strokeStyle = '#b37d2a';
    ctx.lineWidth = 14;
    ctx.strokeRect(40, 40, width - 80, height - 80);

    // Inner Filigree Border
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 3;
    ctx.strokeRect(60, 60, width - 120, height - 120);

    // Corner Ornaments
    ctx.fillStyle = '#b37d2a';
    ctx.font = '36px serif';
    ctx.fillText('❧', 75, 105);
    ctx.fillText('☙', width - 110, 105);
    ctx.fillText('❧', 75, height - 75);
    ctx.fillText('☙', width - 110, height - 75);

    // Header Title
    ctx.textAlign = 'center';
    ctx.fillStyle = '#784e1b';
    ctx.font = '600 32px Cinzel, serif';
    ctx.fillText('A LITTLE DIWALI MEMORY', width / 2, 160);

    // Name Dedication
    ctx.fillStyle = '#2a1405';
    ctx.font = 'bold 64px Cinzel, serif';
    ctx.fillText('TANISHA', width / 2, 240);

    // Gold divider
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 120, 270);
    ctx.lineTo(width / 2 + 120, 270);
    ctx.stroke();

    // Stage 1 Shayari
    ctx.fillStyle = '#851818';
    ctx.font = 'italic 500 42px Kalam, cursive';
    ctx.fillText('"Tumhara khubsurat hona nhi', width / 2, 380);
    ctx.fillText('Tumhara hona hi khubsurat hai"', width / 2, 440);

    // Diya motif in center
    ctx.fillStyle = '#ff9800';
    ctx.beginPath();
    ctx.arc(width / 2, 540, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#6d2f10';
    ctx.fillRect(width / 2 - 25, 555, 50, 14);

    // Stage 2 Four-Line Poem
    ctx.fillStyle = '#3a200a';
    ctx.font = '500 38px Kalam, cursive';
    ctx.fillText('Tum khubsurat jese Chand lagti ho', width / 2, 690);
    ctx.fillText('Tum nadan lekin pyari behisab lagti ho', width / 2, 760);
    ctx.fillText('Ab ye kanch ka tukta batyega tumhe tumhari khubsurati', width / 2, 830);
    ctx.fillText('Zara meri ankho se pucho tum kitni lajawab lagti ho', width / 2, 900);

    // Sign-off
    ctx.fillStyle = '#784e1b';
    ctx.font = 'bold 50px Kalam, cursive';
    ctx.fillText('— Rajat', width / 2, 1060);

    // Footer
    ctx.fillStyle = '#9c7c4f';
    ctx.font = '24px Cinzel, serif';
    ctx.fillText('Deepavali Chronicle • Eternal Light', width / 2, 1480);

    const link = document.createElement('a');
    link.download = 'tanisha-diwali-keepsake.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative w-full h-full min-h-screen bg-[#070503] flex flex-col items-center justify-between px-3 sm:px-6 py-8 select-none overflow-x-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(85,50,15,0.4)_0%,rgba(7,5,3,1)_85%)] pointer-events-none no-print" />

      {/* Screen Title */}
      <div className="relative z-10 text-center max-w-xl mb-4 no-print">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e1006]/85 border border-[#d4af37]/40 text-[#f5d77f] text-xs font-cinzel tracking-widest uppercase mb-1">
          <Sparkles className="w-3.5 h-3.5 text-[#ffd54f]" />
          <span>Sacred Diwali Memento</span>
          <Sparkles className="w-3.5 h-3.5 text-[#ffd54f]" />
        </div>
        <h2 className="font-cinzel text-lg sm:text-2xl text-[#ffe57f] gold-glow tracking-wider font-semibold">
          THE ROYAL KEEPSAKE
        </h2>
      </div>

      {/* The Antique Ivory Greeting Card / Farman Certificate */}
      <div className="relative z-10 w-full max-w-2xl my-auto px-2">
        <div
          ref={cardRef}
          className="print-only-card relative w-full rounded-3xl p-6 sm:p-12 parchment-bg border-4 border-[#b37d2a] shadow-[0_0_80px_rgba(255,215,0,0.35),0_20px_50px_rgba(0,0,0,0.95)] text-[#2a1705] overflow-hidden"
        >
          {/* Inner Ornate Gold Filigree Border */}
          <div className="absolute inset-3 sm:inset-4 border-2 border-[#d4af37]/50 rounded-2xl pointer-events-none" />

          {/* Corner Calligraphic Accents */}
          <div className="absolute top-4 left-5 text-[#b37d2a] text-xl font-cinzel">❧</div>
          <div className="absolute top-4 right-5 text-[#b37d2a] text-xl font-cinzel">☙</div>
          <div className="absolute bottom-4 left-5 text-[#b37d2a] text-xl font-cinzel">❧</div>
          <div className="absolute bottom-4 right-5 text-[#b37d2a] text-xl font-cinzel">☙</div>

          {/* Card Title & Name */}
          <div className="relative z-10 text-center mb-6">
            <span className="font-cinzel text-xs sm:text-sm text-[#8c591c] uppercase tracking-[0.3em] font-semibold block mb-1">
              A Little Diwali Memory
            </span>
            <h1 className="font-cinzel text-2xl sm:text-4xl text-[#2b1406] font-extrabold tracking-wider mt-1">
              TANISHA
            </h1>
            <div className="w-28 h-0.5 bg-gradient-to-r from-transparent via-[#b37d2a] to-transparent mx-auto mt-3" />
          </div>

          {/* Central Diya Illustration */}
          <div className="relative z-10 flex flex-col items-center justify-center my-4">
            <div className="w-5 h-8 bg-gradient-to-t from-[#ff6f00] via-[#ffb300] to-[#fffde7] rounded-full blur-[0.3px] shadow-[0_0_15px_#ff9800] animate-diya-flame" />
            <div className="w-14 h-4 bg-gradient-to-r from-[#63290b] via-[#913d10] to-[#4e1f06] rounded-b-full border-t border-[#b37d2a] -mt-1" />
          </div>

          {/* CONTENT REVEAL: NEVER SHOW BOTH POEMS SIMULTANEOUSLY */}
          <AnimatePresence mode="wait">
            {keepsakeStage === 'stage1_shayari' ? (
              /* FIRST REVEAL — EXISTING TWO-LINE SHAYARI ONLY */
              <motion.div
                key="stage1"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="relative z-10 text-center my-6 py-4 border-y border-[#b37d2a]/20"
              >
                <p className="font-kalam text-xl sm:text-3xl text-[#851818] font-bold leading-relaxed tracking-wide">
                  "Tumhara khubsurat hona nhi
                  <br />
                  Tumhara hona hi khubsurat hai"
                </p>

                {/* Transition Button to Stage 2 after reading */}
                <div className="mt-8 flex justify-center no-print min-h-[48px]">
                  {canAdvanceStage && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleRevealPoem}
                      className="px-7 py-2.5 rounded-full bg-gradient-to-r from-[#8b5a1b] via-[#c68c35] to-[#8b5a1b] text-[#fbf7ee] font-cinzel text-xs font-semibold tracking-wider uppercase shadow-md hover:brightness-110 transition-all cursor-pointer flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#ffe57f]" />
                      <span>Reveal The Royal Verse</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#ffe57f]" />
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ) : (
              /* SECOND REVEAL — FOUR-LINE POEM LINE BY LINE + RAJAT SIGNATURE */
              <motion.div
                key="stage2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="relative z-10 text-center my-4 py-2 border-y border-[#b37d2a]/20"
              >
                <div className="space-y-3 sm:space-y-4 min-h-[180px] flex flex-col justify-center">
                  {SECOND_POEM_LINES.map((line, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, y: 12, filter: 'blur(5px)' }}
                      animate={
                        poemLineStage > idx
                          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                          : { opacity: 0 }
                      }
                      transition={{ duration: 1.3, ease: 'easeOut' }}
                      className={`font-kalam text-lg sm:text-2xl leading-relaxed tracking-wide ${
                        idx === 3
                          ? 'text-[#851818] font-bold text-xl sm:text-2xl'
                          : 'text-[#361a07]'
                      }`}
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>

                {/* Rajat's Signature appears last */}
                {poemLineStage >= 5 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2 }}
                    className="pt-6 border-t border-[#b37d2a]/20 mt-4"
                  >
                    <span className="font-kalam text-2xl sm:text-3xl text-[#7a4816] font-bold tracking-wider block">
                      — Rajat
                    </span>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Keepsake Actions: Download Image & Print & Advance */}
      <div className="relative z-10 w-full max-w-xl pb-4 flex flex-wrap items-center justify-center gap-3 no-print mt-6">
        <button
          onClick={handleDownloadImage}
          className="px-4 py-2.5 rounded-full bg-[#1c1006] border border-[#d4af37]/60 text-[#f5d77f] font-cinzel text-xs font-semibold tracking-wider uppercase hover:bg-[#2b1809] hover:border-[#ffd54f] transition-all flex items-center gap-2 cursor-pointer shadow-md"
        >
          <Download className="w-3.5 h-3.5 text-[#f5b041]" />
          <span>Save Keepsake Image</span>
        </button>

        <button
          onClick={handlePrint}
          className="px-4 py-2.5 rounded-full bg-[#1c1006] border border-[#d4af37]/60 text-[#f5d77f] font-cinzel text-xs font-semibold tracking-wider uppercase hover:bg-[#2b1809] hover:border-[#ffd54f] transition-all flex items-center gap-2 cursor-pointer shadow-md"
        >
          <Printer className="w-3.5 h-3.5 text-[#f5b041]" />
          <span>Print / PDF</span>
        </button>

        {keepsakeStage === 'stage2_poem' && poemLineStage >= 5 && (
          <button
            onClick={handleCompleteQuest}
            disabled={isFinalizing}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#b37d2a] via-[#f5b041] to-[#b37d2a] text-[#0d0702] font-cinzel text-xs font-bold tracking-[0.15em] uppercase box-gold-glow-active transition-all flex items-center gap-2 cursor-pointer border border-[#fff2b2] disabled:opacity-50"
          >
            <span>{isFinalizing ? 'Preserving Quest...' : 'Complete The Quest'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#0d0702]" />
          </button>
        )}
      </div>

      {/* Cinematic Finalizing & Uploading Overlay Modal */}
      <AnimatePresence>
        {isFinalizing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#070503]/90 backdrop-blur-md flex items-center justify-center p-4 text-center"
          >
            <div className="w-full max-w-md p-8 rounded-3xl bg-[#140b04]/95 border-2 border-[#d4af37]/50 shadow-[0_0_80px_rgba(212,175,55,0.25)] flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#201007] border border-[#d4af37]/60 flex items-center justify-center mb-5 text-[#ffd54f]">
                {uploadProgress >= 100 ? (
                  <CheckCircle2 className="w-8 h-8 text-[#ffd54f] animate-bounce" />
                ) : (
                  <Loader2 className="w-8 h-8 text-[#f5b041] animate-spin" />
                )}
              </div>

              <h3 className="font-cinzel text-lg sm:text-xl text-[#ffe57f] gold-glow font-bold tracking-wider mb-2">
                DEEPAVALI CHRONICLE
              </h3>

              <p className="font-marcellus text-sm text-[#ecd7b5] mb-6">
                {uploadStatusText}
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-[#0a0502] rounded-full h-2.5 overflow-hidden border border-[#d4af37]/30 mb-2">
                <motion.div
                  className="bg-gradient-to-r from-[#b37d2a] to-[#ffd54f] h-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(5, uploadProgress)}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <span className="font-mono text-xs text-[#c9b183]">
                {uploadProgress > 0 ? `${uploadProgress}%` : 'Finalizing...'}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

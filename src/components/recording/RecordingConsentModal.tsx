import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Video, Sparkles, Shield, ArrowRight, Camera } from 'lucide-react';
import { recordingManager } from '../../services/recordingManager';
import { sessionService } from '../../services/sessionService';

interface Props {
  onStartQuest: () => void;
}

export const RecordingConsentModal: React.FC<Props> = ({ onStartQuest }) => {
  const [requesting, setRequesting] = useState(false);

  const handleAllowRecording = async () => {
    setRequesting(true);
    const granted = await recordingManager.grantConsentAndStart();
    await sessionService.setRecordingStatus(granted ? 'recording' : 'not_recorded');
    setRequesting(false);
    onStartQuest();
  };

  const handleContinueWithoutRecording = async () => {
    recordingManager.continueWithoutRecording();
    await sessionService.setRecordingStatus('not_recorded');
    onStartQuest();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070503] flex items-center justify-center p-4 select-none overflow-y-auto">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(80,45,15,0.45)_0%,rgba(7,5,3,1)_85%)] pointer-events-none" />

      {/* Decorative Traditional Toran Accent */}
      <div className="absolute top-0 inset-x-0 h-10 border-b border-[#d4af37]/25 flex justify-center items-center gap-6 pointer-events-none opacity-40">
        <span className="text-[#ffd54f]">𑁍</span>
        <span className="text-[#ffd54f]">𑁍</span>
        <span className="text-[#ffd54f]">𑁍</span>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-lg p-6 sm:p-9 rounded-3xl bg-[#140b04]/90 backdrop-blur-md border-2 border-[#d4af37]/45 shadow-[0_0_70px_rgba(0,0,0,0.95)] text-center text-[#f7e7ce]"
      >
        {/* Emblem */}
        <div className="w-14 h-14 rounded-full bg-[#201007] border border-[#d4af37]/50 flex items-center justify-center mx-auto mb-4 text-[#ffd54f] shadow-md">
          <Camera className="w-7 h-7 text-[#f5b041]" />
        </div>

        {/* Title */}
        <div className="inline-flex items-center gap-2 text-xs font-cinzel text-[#d4af37] tracking-[0.25em] uppercase mb-1">
          <Sparkles className="w-3.5 h-3.5 text-[#ffb300]" />
          <span>A Magical Diwali Chronicle</span>
          <Sparkles className="w-3.5 h-3.5 text-[#ffb300]" />
        </div>

        <h1 className="font-cinzel text-xl sm:text-2xl text-[#ffe57f] gold-glow font-bold tracking-wider mb-4">
          CAPTURE YOUR REACTION?
        </h1>

        {/* Clear, Respectful Explanation per Prompt Requirements */}
        <div className="space-y-3 font-marcellus text-xs sm:text-sm text-[#ecd7b5] leading-relaxed text-left bg-[#0c0603]/80 p-4 rounded-2xl border border-[#d4af37]/25 mb-6">
          <p className="flex items-start gap-2">
            <span className="text-[#ffd54f] font-bold mt-0.5">•</span>
            <span>Your front camera and microphone can capture your natural reactions throughout this Diwali quest.</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-[#ffd54f] font-bold mt-0.5">•</span>
            <span>The reaction video and audio will be uploaded securely to Rajat's private Cloudinary storage after you tap <strong>Complete the Quest</strong>.</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-[#ffd54f] font-bold mt-0.5">•</span>
            <span>Your written wish from the lantern ceremony will be preserved in Firebase.</span>
          </p>
          <p className="flex items-start gap-2 text-[#ffd54f]">
            <span className="text-[#ffd54f] font-bold mt-0.5">•</span>
            <span>Recording is completely voluntary and optional. You are welcome to proceed without recording.</span>
          </p>
        </div>

        {/* Two Clear Choices */}
        <div className="space-y-3">
          <button
            onClick={handleAllowRecording}
            disabled={requesting}
            className="w-full py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#b37d2a] via-[#f5b041] to-[#b37d2a] text-[#0d0702] font-cinzel text-xs sm:text-sm font-bold tracking-[0.15em] uppercase box-gold-glow-active transition-all cursor-pointer flex items-center justify-center gap-2 border border-[#fff2b2] disabled:opacity-50"
          >
            <Video className="w-4 h-4" />
            <span>{requesting ? 'Requesting Camera...' : 'ALLOW CAMERA & MICROPHONE AND START QUEST'}</span>
          </button>

          <button
            onClick={handleContinueWithoutRecording}
            disabled={requesting}
            className="w-full py-3 rounded-full bg-[#1b1007] border border-[#d4af37]/40 text-[#c9b183] hover:text-[#ffe57f] hover:border-[#ffd54f] font-cinzel text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>CONTINUE WITHOUT RECORDING</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Privacy Note */}
        <div className="mt-5 pt-3 border-t border-[#d4af37]/15 flex items-center justify-center gap-1.5 text-[10px] text-[#8c7450] font-marcellus">
          <Shield className="w-3 h-3 text-[#d4af37]" />
          <span>Camera and microphone are only accessed after you tap Allow.</span>
        </div>
      </motion.div>
    </div>
  );
};

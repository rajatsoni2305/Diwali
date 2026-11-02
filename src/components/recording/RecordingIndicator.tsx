import React, { useState, useEffect, useRef } from 'react';
import { recordingManager } from '../../services/recordingManager';
import { Eye, EyeOff } from 'lucide-react';

export const RecordingIndicator: React.FC = () => {
  const [isRecording, setIsRecording] = useState(recordingManager.isRecordingActive());
  const [duration, setDuration] = useState(recordingManager.getDuration());
  const [showPreview, setShowPreview] = useState(false);
  const previewRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const unsubscribe = recordingManager.subscribe((recording, dur) => {
      setIsRecording(recording);
      setDuration(dur);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (showPreview && previewRef.current) {
      const stream = recordingManager.getStream();
      if (stream) {
        previewRef.current.srcObject = stream;
      }
    }
  }, [showPreview]);

  if (!isRecording) return null;

  const formatSecs = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <>
      <div className="fixed top-4 left-4 z-40 flex items-center gap-2">
        <button
          onClick={() => setShowPreview(!showPreview)}
          title="Reaction recording active. Tap to toggle private camera view."
          className="px-3 py-1.5 rounded-full bg-[#160b05]/85 border border-red-500/50 backdrop-blur-md shadow-md flex items-center gap-2 cursor-pointer hover:border-red-400 transition-all"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_#ff1744]" />
          <span className="font-mono text-xs text-red-200 tracking-wider">
            REC {formatSecs(duration)}
          </span>
          {showPreview ? (
            <EyeOff className="w-3.5 h-3.5 text-[#d4af37]" />
          ) : (
            <Eye className="w-3.5 h-3.5 text-[#d4af37]/70" />
          )}
        </button>
      </div>

      {/* Optional Private Preview Modal when explicitly chosen */}
      {showPreview && (
        <div
          onClick={() => setShowPreview(false)}
          className="fixed inset-0 z-50 bg-black/60 flex items-start justify-start p-4 pt-16 sm:pt-16"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-48 sm:w-56 aspect-square rounded-2xl overflow-hidden bg-black border-2 border-[#d4af37]/60 shadow-2xl relative"
          >
            <video
              ref={previewRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover scale-x-[-1]"
            />
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/70 text-[10px] text-[#ffd54f] border border-[#d4af37]/40"
            >
              Hide
            </button>
          </div>
        </div>
      )}
    </>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Video, Mic, StopCircle, Play, RotateCcw, Send, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Trash2 } from 'lucide-react';
import { cloudinaryService } from '../../services/cloudinaryService';
import { sessionService } from '../../services/sessionService';

interface SceneProps {
  onNext: () => void;
}

export const Scene19bReactionRecording: React.FC<SceneProps> = ({ onNext }) => {
  const [activeTab, setActiveTab] = useState<'video' | 'voice'>('video');

  // Video state
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isVideoRecording, setIsVideoRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoUploading, setVideoUploading] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoSubmitted, setVideoSubmitted] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);

  // Voice state
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [voiceBlob, setVoiceBlob] = useState<Blob | null>(null);
  const [voiceUrl, setVoiceUrl] = useState<string | null>(null);
  const [voiceDuration, setVoiceDuration] = useState(0);
  const [voiceUploading, setVoiceUploading] = useState(false);
  const [voiceProgress, setVoiceProgress] = useState(0);
  const [voiceSubmitted, setVoiceSubmitted] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);

  const videoPreviewRef = useRef<HTMLVideoElement | null>(null);
  const videoMediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoStreamRef = useRef<MediaStream | null>(null);
  const videoChunksRef = useRef<Blob[]>([]);

  const voiceMediaRecorderRef = useRef<MediaRecorder | null>(null);
  const voiceStreamRef = useRef<MediaStream | null>(null);
  const voiceChunksRef = useRef<Blob[]>([]);

  const timerRef = useRef<number | null>(null);

  // Cleanup streams on unmount
  useEffect(() => {
    return () => {
      stopCameraStream();
      stopVoiceStream();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const stopCameraStream = () => {
    if (videoStreamRef.current) {
      videoStreamRef.current.getTracks().forEach((track) => track.stop());
      videoStreamRef.current = null;
    }
    setIsCameraActive(false);
    setIsVideoRecording(false);
  };

  const stopVoiceStream = () => {
    if (voiceStreamRef.current) {
      voiceStreamRef.current.getTracks().forEach((track) => track.stop());
      voiceStreamRef.current = null;
    }
    setIsVoiceRecording(false);
  };

  // --- VIDEO REACTION METHODS ---

  const handleStartCamera = async () => {
    setVideoError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 720 }, height: { ideal: 720 }, facingMode: 'user' },
        audio: true,
      });
      videoStreamRef.current = stream;
      setIsCameraActive(true);
      if (videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = stream;
      }
    } catch (err: any) {
      setVideoError('Camera permission denied or camera unavailable. You can still leave a voice note or proceed.');
    }
  };

  const handleStartVideoRecording = () => {
    if (!videoStreamRef.current) return;
    setVideoError(null);
    videoChunksRef.current = [];
    setVideoDuration(0);

    const options = MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')
      ? { mimeType: 'video/webm;codecs=vp9,opus' }
      : { mimeType: 'video/mp4' };

    try {
      const recorder = new MediaRecorder(videoStreamRef.current, options);
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          videoChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const finalBlob = new Blob(videoChunksRef.current, { type: recorder.mimeType || 'video/mp4' });
        setVideoBlob(finalBlob);
        setVideoUrl(URL.createObjectURL(finalBlob));
        stopCameraStream();
      };

      videoMediaRecorderRef.current = recorder;
      recorder.start(500);
      setIsVideoRecording(true);

      timerRef.current = window.setInterval(() => {
        setVideoDuration((d) => d + 1);
      }, 1000);
    } catch (err: any) {
      setVideoError('Could not start video recording: ' + err.message);
    }
  };

  const handleStopVideoRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (videoMediaRecorderRef.current && videoMediaRecorderRef.current.state !== 'inactive') {
      videoMediaRecorderRef.current.stop();
    }
    setIsVideoRecording(false);
  };

  const handleRetakeVideo = () => {
    setVideoBlob(null);
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    setVideoUrl(null);
    setVideoDuration(0);
    handleStartCamera();
  };

  const handleDiscardVideo = () => {
    setVideoBlob(null);
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    setVideoUrl(null);
    setVideoDuration(0);
    stopCameraStream();
  };

  const handleSubmitVideo = async () => {
    if (!videoBlob || videoUploading || videoSubmitted) return;
    setVideoUploading(true);
    setVideoError(null);

    try {
      const result = await cloudinaryService.uploadMedia(videoBlob, 'video', (pct) => {
        setVideoProgress(pct);
      });

      await sessionService.saveVideoReaction({
        cloudinaryAssetId: result.assetId,
        secureUrl: result.secureUrl,
        submittedAt: new Date().toISOString(),
        duration: videoDuration,
      });

      setVideoSubmitted(true);
    } catch (err: any) {
      setVideoError(err.message || 'Video upload failed. Please try again.');
    } finally {
      setVideoUploading(false);
    }
  };

  // --- VOICE NOTE METHODS ---

  const handleStartVoiceRecording = async () => {
    setVoiceError(null);
    setVoiceBlob(null);
    if (voiceUrl) URL.revokeObjectURL(voiceUrl);
    setVoiceUrl(null);
    setVoiceDuration(0);
    voiceChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      voiceStreamRef.current = stream;

      const options = MediaRecorder.isTypeSupported('audio/webm')
        ? { mimeType: 'audio/webm' }
        : { mimeType: 'audio/ogg' };

      const recorder = new MediaRecorder(stream, options);
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          voiceChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const finalBlob = new Blob(voiceChunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        setVoiceBlob(finalBlob);
        setVoiceUrl(URL.createObjectURL(finalBlob));
        stopVoiceStream();
      };

      voiceMediaRecorderRef.current = recorder;
      recorder.start(500);
      setIsVoiceRecording(true);

      timerRef.current = window.setInterval(() => {
        setVoiceDuration((d) => d + 1);
      }, 1000);
    } catch (err: any) {
      setVoiceError('Microphone permission was denied or is unavailable.');
    }
  };

  const handleStopVoiceRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (voiceMediaRecorderRef.current && voiceMediaRecorderRef.current.state !== 'inactive') {
      voiceMediaRecorderRef.current.stop();
    }
    setIsVoiceRecording(false);
  };

  const handleRetakeVoice = () => {
    setVoiceBlob(null);
    if (voiceUrl) URL.revokeObjectURL(voiceUrl);
    setVoiceUrl(null);
    setVoiceDuration(0);
    handleStartVoiceRecording();
  };

  const handleDiscardVoice = () => {
    setVoiceBlob(null);
    if (voiceUrl) URL.revokeObjectURL(voiceUrl);
    setVoiceUrl(null);
    setVoiceDuration(0);
    stopVoiceStream();
  };

  const handleSubmitVoice = async () => {
    if (!voiceBlob || voiceUploading || voiceSubmitted) return;
    setVoiceUploading(true);
    setVoiceError(null);

    try {
      const result = await cloudinaryService.uploadMedia(voiceBlob, 'audio', (pct) => {
        setVoiceProgress(pct);
      });

      await sessionService.saveVoiceNote({
        cloudinaryAssetId: result.assetId,
        secureUrl: result.secureUrl,
        submittedAt: new Date().toISOString(),
        duration: voiceDuration,
      });

      setVoiceSubmitted(true);
    } catch (err: any) {
      setVoiceError(err.message || 'Voice upload failed. Please try again.');
    } finally {
      setVoiceUploading(false);
    }
  };

  const formatSecs = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="relative w-full h-full min-h-screen bg-[#070503] flex flex-col items-center justify-between px-3 sm:px-6 py-6 sm:py-8 select-none overflow-x-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(85,50,15,0.4)_0%,rgba(7,5,3,1)_85%)] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-xl mt-2 sm:mt-4">
        <span className="font-cinzel text-xs sm:text-sm text-[#f5b041] uppercase tracking-[0.25em] font-semibold block mb-1">
          A Moment of Reflection
        </span>
        <h2 className="font-cinzel text-xl sm:text-3xl text-[#ffe57f] gold-glow tracking-wider font-bold">
          A LITTLE MESSAGE BEFORE YOU GO
        </h2>
        <p className="font-marcellus text-xs sm:text-sm text-[#cca770] mt-1">
          If you'd like, leave a little video message or voice note about your experience.
        </p>
      </div>

      {/* Mode Tabs */}
      <div className="relative z-10 flex items-center justify-center gap-3 my-4">
        <button
          onClick={() => setActiveTab('video')}
          className={`px-5 py-2 rounded-full font-cinzel text-xs font-semibold tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'video'
              ? 'bg-gradient-to-r from-[#b37d2a] to-[#e5a83a] text-black shadow-lg shadow-black/50'
              : 'bg-[#1b1007] border border-[#d4af37]/40 text-[#c9b183] hover:text-[#ffe57f]'
          }`}
        >
          <Video className="w-3.5 h-3.5" />
          <span>Video Message</span>
        </button>

        <button
          onClick={() => setActiveTab('voice')}
          className={`px-5 py-2 rounded-full font-cinzel text-xs font-semibold tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'voice'
              ? 'bg-gradient-to-r from-[#b37d2a] to-[#e5a83a] text-black shadow-lg shadow-black/50'
              : 'bg-[#1b1007] border border-[#d4af37]/40 text-[#c9b183] hover:text-[#ffe57f]'
          }`}
        >
          <Mic className="w-3.5 h-3.5" />
          <span>Voice Note</span>
        </button>
      </div>

      {/* Main Interactive Card */}
      <div className="relative z-10 w-full max-w-lg my-auto">
        <div className="p-5 sm:p-7 rounded-3xl bg-[#140b04]/85 backdrop-blur-md border border-[#d4af37]/40 shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col items-center text-center">

          {/* TAB 1: VIDEO MESSAGE */}
          {activeTab === 'video' && (
            <div className="w-full flex flex-col items-center">
              {!isCameraActive && !videoUrl ? (
                /* Initial State: Permission notice & Start button */
                <div className="space-y-4 py-4">
                  <div className="w-16 h-16 rounded-full bg-[#201107] border border-[#d4af37]/50 flex items-center justify-center mx-auto shadow-md">
                    <Video className="w-8 h-8 text-[#f5b041]" />
                  </div>
                  <p className="font-marcellus text-sm text-[#ecd7b5] leading-relaxed max-w-sm mx-auto">
                    Recording is completely voluntary. Your camera will only be activated when you choose to start.
                  </p>
                  <button
                    onClick={handleStartCamera}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-[#b37d2a] via-[#f5b041] to-[#b37d2a] text-black font-cinzel text-xs font-bold tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-lg"
                  >
                    Start Camera
                  </button>
                </div>
              ) : isCameraActive ? (
                /* Live Preview & Record State */
                <div className="w-full flex flex-col items-center">
                  <div className="relative w-full max-w-xs sm:max-w-sm aspect-square rounded-2xl overflow-hidden bg-black border-2 border-[#d4af37]/60 shadow-xl">
                    <video
                      ref={videoPreviewRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover scale-x-[-1]"
                    />
                    {isVideoRecording && (
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-red-600/90 text-white text-xs font-mono flex items-center gap-2 animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-white" />
                        <span>REC {formatSecs(videoDuration)}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                    {!isVideoRecording ? (
                      <>
                        <button
                          onClick={handleStartVideoRecording}
                          className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-cinzel text-xs font-bold tracking-wider uppercase transition-all cursor-pointer shadow-md flex items-center gap-2"
                        >
                          <span className="w-2.5 h-2.5 rounded-full bg-white" />
                          <span>Start Recording</span>
                        </button>
                        <button
                          onClick={stopCameraStream}
                          className="px-4 py-2.5 rounded-full border border-[#d4af37]/40 text-[#c9b183] text-xs hover:bg-[#201007] cursor-pointer"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={handleStopVideoRecording}
                        className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#b37d2a] to-[#f5b041] text-black font-cinzel text-xs font-bold tracking-wider uppercase flex items-center gap-2 cursor-pointer shadow-lg animate-bounce"
                      >
                        <StopCircle className="w-4 h-4" />
                        <span>Stop Recording</span>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Recorded Video Preview & Review */
                <div className="w-full flex flex-col items-center">
                  <div className="relative w-full max-w-xs sm:max-w-sm aspect-square rounded-2xl overflow-hidden bg-black border-2 border-[#d4af37]/60 shadow-xl">
                    <video
                      src={videoUrl || ''}
                      controls
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {videoSubmitted ? (
                    <div className="mt-4 p-3 rounded-xl bg-[#1c2718] border border-green-500/50 text-green-300 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span>Your video message has been saved for Rajat!</span>
                    </div>
                  ) : (
                    <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                      <button
                        onClick={handleRetakeVideo}
                        disabled={videoUploading}
                        className="px-4 py-2 rounded-full border border-[#d4af37]/50 text-[#e0cfaf] text-xs font-cinzel hover:bg-[#201007] flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Retake</span>
                      </button>
                      <button
                        onClick={handleDiscardVideo}
                        disabled={videoUploading}
                        className="px-4 py-2 rounded-full border border-red-500/40 text-red-300 text-xs font-cinzel hover:bg-[#2a1010] flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Discard</span>
                      </button>
                      <button
                        onClick={handleSubmitVideo}
                        disabled={videoUploading}
                        className="px-6 py-2 rounded-full bg-gradient-to-r from-[#b37d2a] via-[#f5b041] to-[#b37d2a] text-black font-cinzel text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{videoUploading ? `Uploading ${videoProgress}%...` : 'Submit Video'}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {videoError && (
                <div className="mt-3 p-2 rounded-lg bg-red-900/30 border border-red-500/40 text-red-200 text-[11px] flex items-center gap-2">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{videoError}</span>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: VOICE NOTE */}
          {activeTab === 'voice' && (
            <div className="w-full flex flex-col items-center">
              {!isVoiceRecording && !voiceUrl ? (
                /* Initial State */
                <div className="space-y-4 py-4">
                  <div className="w-16 h-16 rounded-full bg-[#201107] border border-[#d4af37]/50 flex items-center justify-center mx-auto shadow-md">
                    <Mic className="w-8 h-8 text-[#f5b041]" />
                  </div>
                  <p className="font-marcellus text-sm text-[#ecd7b5] leading-relaxed max-w-sm mx-auto">
                    Record a quiet audio message. You can review or delete it before submitting.
                  </p>
                  <button
                    onClick={handleStartVoiceRecording}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-[#b37d2a] via-[#f5b041] to-[#b37d2a] text-black font-cinzel text-xs font-bold tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-lg"
                  >
                    Start Voice Recording
                  </button>
                </div>
              ) : isVoiceRecording ? (
                /* Recording Active */
                <div className="py-6 flex flex-col items-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-red-600/20 border-2 border-red-500 flex items-center justify-center animate-pulse">
                    <Mic className="w-8 h-8 text-red-400" />
                  </div>
                  <div className="font-mono text-base text-[#ff8a80]">
                    Recording: {formatSecs(voiceDuration)}
                  </div>
                  <button
                    onClick={handleStopVoiceRecording}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#b37d2a] to-[#f5b041] text-black font-cinzel text-xs font-bold tracking-wider uppercase flex items-center gap-2 cursor-pointer shadow-lg"
                  >
                    <StopCircle className="w-4 h-4" />
                    <span>Stop Recording</span>
                  </button>
                </div>
              ) : (
                /* Review Voice Note */
                <div className="w-full flex flex-col items-center py-4 space-y-4">
                  <div className="w-full max-w-sm p-3 rounded-2xl bg-[#0c0603] border border-[#d4af37]/40">
                    <audio src={voiceUrl || ''} controls className="w-full" />
                  </div>

                  {voiceSubmitted ? (
                    <div className="p-3 rounded-xl bg-[#1c2718] border border-green-500/50 text-green-300 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span>Your voice note has been saved for Rajat!</span>
                    </div>
                  ) : (
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <button
                        onClick={handleRetakeVoice}
                        disabled={voiceUploading}
                        className="px-4 py-2 rounded-full border border-[#d4af37]/50 text-[#e0cfaf] text-xs font-cinzel hover:bg-[#201007] flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Record Again</span>
                      </button>
                      <button
                        onClick={handleDiscardVoice}
                        disabled={voiceUploading}
                        className="px-4 py-2 rounded-full border border-red-500/40 text-red-300 text-xs font-cinzel hover:bg-[#2a1010] flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Discard</span>
                      </button>
                      <button
                        onClick={handleSubmitVoice}
                        disabled={voiceUploading}
                        className="px-6 py-2 rounded-full bg-gradient-to-r from-[#b37d2a] via-[#f5b041] to-[#b37d2a] text-black font-cinzel text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{voiceUploading ? `Uploading ${voiceProgress}%...` : 'Submit Voice Note'}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {voiceError && (
                <div className="mt-3 p-2 rounded-lg bg-red-900/30 border border-red-500/40 text-red-200 text-[11px] flex items-center gap-2">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{voiceError}</span>
                </div>
              )}
            </div>
          )}

          {/* Privacy Disclaimer (Part 9) */}
          <div className="mt-6 pt-4 border-t border-[#d4af37]/20 flex items-start gap-2 text-left">
            <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
            <p className="text-[11px] text-[#a8906a] font-marcellus leading-normal">
              Recording is completely optional. Your camera or microphone will only be activated when you choose to record. You can review or discard your recording before submitting it. Recordings are kept private for Rajat.
            </p>
          </div>
        </div>
      </div>

      {/* Continue to Final Celebration Button */}
      <div className="relative z-10 w-full max-w-md pb-2 flex items-center justify-center">
        <button
          onClick={onNext}
          className="px-8 py-3 rounded-full bg-[#1b1007] border border-[#d4af37]/60 text-[#ffe57f] font-cinzel text-xs sm:text-sm font-bold tracking-[0.2em] uppercase hover:bg-[#2b180a] hover:border-[#ffd54f] transition-all flex items-center gap-2 cursor-pointer shadow-md"
        >
          <span>Continue to Final Screen</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

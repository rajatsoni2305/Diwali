import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lock, Video, Mic, Sparkles, Trash2, RefreshCw, X, Shield, Clock } from 'lucide-react';
import { sessionService, ExperienceSession } from '../../services/sessionService';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [sessions, setSessions] = useState<ExperienceSession[]>([]);
  const [loading, setLoading] = useState(false);

  // Authenticate with Rajat's private PIN (or Firebase Auth)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === 'rajat2026' || pin.trim() === 'diwali2026') {
      setIsAuthenticated(true);
      setPinError(false);
      loadSessions();
    } else {
      setPinError(true);
    }
  };

  const loadSessions = async () => {
    setLoading(true);
    try {
      const all = await sessionService.getAllSessions();
      setSessions(all);
    } catch (err) {
      console.error('Failed to load admin records:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadSessions();
    }
  }, [isOpen, isAuthenticated]);

  const handleDelete = async (sessionId: string) => {
    if (window.confirm('Delete this record permanently?')) {
      await sessionService.deleteSession(sessionId);
      loadSessions();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-3xl my-auto bg-[#140b04] border-2 border-[#d4af37]/60 rounded-3xl p-6 sm:p-8 text-[#f7e7ce] shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#201007] border border-[#d4af37]/40 text-[#d4af37] flex items-center justify-center hover:bg-[#30180a] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {!isAuthenticated ? (
          /* Admin Login Gate */
          <div className="max-w-sm mx-auto text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#201107] border border-[#d4af37]/50 flex items-center justify-center mx-auto text-[#ffd54f]">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-cinzel text-xl text-[#ffe57f] gold-glow font-bold">
              Private Admin Portal
            </h3>
            <p className="font-marcellus text-xs text-[#c9b183]">
              Restricted to Rajat. Enter your private authorization passkey to view received wishes and reactions.
            </p>

            <form onSubmit={handleLogin} className="space-y-3 pt-2">
              <input
                type="password"
                placeholder="Enter Admin PIN..."
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setPinError(false);
                }}
                className={`w-full px-4 py-2.5 rounded-full bg-[#0a0502] border text-center font-mono tracking-widest text-sm text-[#ffd54f] focus:outline-hidden ${
                  pinError ? 'border-red-500' : 'border-[#d4af37]/50 focus:border-[#ffd54f]'
                }`}
              />
              {pinError && (
                <p className="text-xs text-red-400 font-marcellus">
                  Invalid authorization key.
                </p>
              )}
              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#b37d2a] via-[#f5b041] to-[#b37d2a] text-black font-cinzel text-xs font-bold tracking-widest uppercase hover:brightness-110 cursor-pointer"
              >
                Access Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* Dashboard Content */
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between border-b border-[#d4af37]/30 pb-4 gap-2">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#f5b041]" />
                <h3 className="font-cinzel text-lg sm:text-xl text-[#ffe57f] font-bold">
                  Diwali Quest Submissions
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={loadSessions}
                  disabled={loading}
                  className="px-3 py-1.5 rounded-full bg-[#201007] border border-[#d4af37]/40 text-xs font-cinzel text-[#d4af37] flex items-center gap-1.5 hover:bg-[#30180a] cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="px-3 py-1.5 rounded-full border border-red-500/40 text-xs text-red-300 hover:bg-red-900/20 cursor-pointer"
                >
                  Lock
                </button>
              </div>
            </div>

            {/* Submissions List */}
            {sessions.length === 0 ? (
              <div className="text-center py-12 text-[#a8906a] font-marcellus text-sm">
                No submissions received yet in this experience.
              </div>
            ) : (
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                {sessions.map((sess, idx) => (
                  <div
                    key={sess.sessionId || idx}
                    className="p-4 sm:p-5 rounded-2xl bg-[#0d0703] border border-[#d4af37]/30 space-y-4"
                  >
                    <div className="flex items-center justify-between text-xs text-[#a8906a] border-b border-[#d4af37]/15 pb-2">
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-[#ffd54f]">Session:</span>
                        <span>{sess.sessionId}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        {sess.createdAt && (
                          <div className="flex items-center gap-1 text-[11px]">
                            <Clock className="w-3 h-3 text-[#d4af37]" />
                            <span>{new Date(sess.createdAt).toLocaleString()}</span>
                          </div>
                        )}
                        <button
                          onClick={() => handleDelete(sess.sessionId)}
                          className="text-red-400 hover:text-red-300 transition-colors p-1"
                          title="Delete record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Recording Status Pill */}
                    {sess.recordingStatus && (
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-[#a88a50]">Status:</span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase border ${
                          sess.recordingStatus === 'completed'
                            ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                            : sess.recordingStatus === 'uploading' || sess.recordingStatus === 'recording'
                            ? 'bg-amber-950/60 border-amber-500/40 text-amber-300'
                            : 'bg-stone-900 border-stone-700 text-stone-400'
                        }`}>
                          {sess.recordingStatus}
                        </span>
                      </div>
                    )}

                    {/* Wish Section */}
                    {(sess.wishText || sess.wish?.text) && (
                      <div className="p-3 rounded-xl bg-[#180f08] border border-[#b37d2a]/30">
                        <div className="flex items-center justify-between text-xs font-cinzel text-[#f5b041] mb-1">
                          <span className="flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Tanisha's Diwali Wish:</span>
                          </span>
                          <span className="text-[10px] text-[#a88a50] font-mono">
                            {(sess.wishSubmittedAt || sess.wish?.submittedAt)
                              ? new Date(sess.wishSubmittedAt || sess.wish?.submittedAt || '').toLocaleTimeString()
                              : ''}
                          </span>
                        </div>
                        <p className="font-kalam text-base sm:text-lg text-[#fff8e1] px-1 italic">
                          "{sess.wishText || sess.wish?.text}"
                        </p>
                      </div>
                    )}

                    {/* Video Reaction Section */}
                    {(sess.videoSecureUrl || sess.videoReaction?.secureUrl || (sess.videoAssetId && sess.videoAssetId.startsWith('blob:'))) && (
                      <div className="p-3 rounded-xl bg-[#180f08] border border-[#b37d2a]/30 space-y-2">
                        <div className="flex items-center justify-between text-xs font-cinzel text-[#f5b041]">
                          <span className="flex items-center gap-1.5">
                            <Video className="w-3.5 h-3.5" />
                            <span>Reaction Video:</span>
                          </span>
                          <span className="text-[10px] text-[#a88a50] font-mono">
                            {(sess.videoUploadedAt || sess.videoReaction?.submittedAt)
                              ? new Date(sess.videoUploadedAt || sess.videoReaction?.submittedAt || '').toLocaleTimeString()
                              : ''}
                          </span>
                        </div>
                        <video
                          src={sess.videoSecureUrl || sess.videoReaction?.secureUrl || sess.videoAssetId}
                          controls
                          playsInline
                          className="w-full max-w-sm rounded-lg aspect-video bg-black border border-[#d4af37]/30"
                        />
                        {sess.videoAssetId && (
                          <div className="text-[10px] font-mono text-[#8c7450] truncate">
                            ID: {sess.videoAssetId}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Voice Note Section */}
                    {(sess.audioSecureUrl || sess.voiceNote?.secureUrl) && (
                      <div className="p-3 rounded-xl bg-[#180f08] border border-[#b37d2a]/30 space-y-2">
                        <div className="flex items-center justify-between text-xs font-cinzel text-[#f5b041]">
                          <span className="flex items-center gap-1.5">
                            <Mic className="w-3.5 h-3.5" />
                            <span>Voice Note:</span>
                          </span>
                          <span className="text-[10px] text-[#a88a50] font-mono">
                            {(sess.audioUploadedAt || sess.voiceNote?.submittedAt)
                              ? new Date(sess.audioUploadedAt || sess.voiceNote?.submittedAt || '').toLocaleTimeString()
                              : ''}
                          </span>
                        </div>
                        <audio src={sess.audioSecureUrl || sess.voiceNote?.secureUrl} controls className="w-full" />
                      </div>
                    )}

                    {!(sess.wishText || sess.wish?.text) &&
                     !(sess.videoSecureUrl || sess.videoReaction?.secureUrl || sess.videoAssetId) &&
                     !(sess.audioSecureUrl || sess.voiceNote?.secureUrl) && (
                      <div className="text-xs text-[#8c7247] italic">
                        Session active — no wishes or recordings submitted yet.
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

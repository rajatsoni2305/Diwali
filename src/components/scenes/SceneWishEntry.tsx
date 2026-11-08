import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Sparkles } from 'lucide-react';
import { sessionService } from '../../services/sessionService';

export const SceneWishEntry: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [wish, setWish] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const value = wish.trim();
    if (!value) { setError('Please write your wish before continuing.'); return; }
    setSaving(true); setError('');
    try {
      await sessionService.saveWish(value);
      onNext();
    } catch (e) {
      setError('Your wish could not be saved. Please try again.');
      setSaving(false);
    }
  };
  return <div className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden bg-[#10091f] px-5 py-12 text-center">
    <div className="w-full max-w-xl rounded-3xl border border-amber-300/30 bg-[#1c1029]/90 p-7 shadow-2xl sm:p-10">
      <Sparkles className="mx-auto mb-5 h-8 w-8 text-amber-300" />
      <p className="font-serif text-2xl italic text-amber-100 sm:text-3xl">Every Diwali carries a wish.</p>
      <h2 className="mt-2 text-xs uppercase tracking-[0.3em] text-amber-300/70">What's yours?</h2>
      <form onSubmit={submit} className="mt-8 space-y-4">
        <textarea value={wish} onChange={e=>setWish(e.target.value)} maxLength={150} rows={4} placeholder="Write your Diwali wish here..." className="w-full resize-none rounded-2xl border border-amber-300/30 bg-black/30 p-4 text-amber-50 placeholder:text-amber-100/35 focus:border-amber-300 focus:outline-none" />
        <p className="text-right text-xs text-amber-100/45">{wish.length}/150</p>
        {error && <p role="alert" className="text-sm text-rose-300">{error}</p>}
        <motion.button whileTap={{scale:.97}} disabled={!wish.trim() || saving} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-300 px-7 py-3 font-semibold text-[#241326] disabled:opacity-50">
          <Send className="h-4 w-4" /> {saving ? 'Saving your wish...' : 'Send My Wish Into The Sky'}
        </motion.button>
      </form>
      <p className="mt-5 text-xs text-amber-100/40">Your wish will be carried with the lights.</p>
    </div>
  </div>;
};

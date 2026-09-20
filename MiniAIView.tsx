import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, Loader2, RotateCcw, Globe2 } from 'lucide-react';
import { ChatMessage } from '../types';

export const MiniAIView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([{ sender: 'ai', text: 'Halo! Aku Mini AI 👋 Aku bisa membantu menjawab pertanyaan umum, Bahasa Indonesia, pelajaran SD, penjelasan istilah, merangkum teks, memberi contoh, dan membantu memahami soal. Tanyakan apa saja yang aman dan bermanfaat untuk belajar!', timestamp: Date.now() }]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages, isLoading]);

  const suggestions = ['Apa itu kalimat efektif?', 'Jelaskan majas personifikasi', 'Apa ibu kota Indonesia?', 'Buatkan contoh teks deskripsi', 'Apa perbedaan fakta dan opini?', 'Jelaskan ide pokok dengan mudah'];

  const handleSend = async (preset?: string) => {
    const query = (preset ?? inputText).trim();
    if (!query || isLoading) return;
    const userMsg: ChatMessage = { sender: 'user', text: query, timestamp: Date.now() };
    const history = [...messages, userMsg].slice(-12).map(m => ({ role: m.sender === 'ai' ? 'model' : 'user', text: m.text }));
    setMessages(prev => [...prev, userMsg]); setInputText(''); setIsLoading(true);
    try {
      const res = await fetch('/api/ai', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question: query, history }) });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.reply) { setMessages(prev => [...prev, { sender: 'ai', text: data.reply, timestamp: Date.now() }]); return; }
      throw new Error(data.error || 'AI belum tersedia');
    } catch (e) {
      setMessages(prev => [...prev, { sender: 'ai', text: 'Mini AI sedang tidak tersambung. Coba lagi sebentar. Fitur materi, ringkasan, flashcards, dan tryout tetap bisa digunakan tanpa AI.', timestamp: Date.now() }]);
    } finally { setIsLoading(false); }
  };

  return <div className="max-w-4xl mx-auto space-y-4 animate-fade-in">
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 p-6 text-white shadow-xl shadow-indigo-500/20">
      <div className="absolute -right-8 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
      <div className="relative flex items-start gap-4"><div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center"><Bot className="w-7 h-7" /></div><div><div className="flex items-center gap-2 text-xs font-bold text-indigo-100"><Globe2 className="w-3.5 h-3.5"/> Pengetahuan umum + Tutor belajar</div><h2 className="text-2xl font-black mt-1">Mini AI</h2><p className="text-sm text-indigo-100 mt-1 max-w-2xl">Tanya seperti sedang ngobrol dengan asisten AI. Untuk informasi yang sangat baru atau berubah cepat, tetap cek sumber terbaru.</p></div></div>
    </section>

    <div className="flex flex-wrap gap-2"><span className="text-[11px] font-bold text-slate-400 self-center mr-1"><Sparkles className="inline w-3.5 h-3.5 text-amber-500"/> Coba:</span>{suggestions.map((s,i)=><button key={i} onClick={()=>handleSend(s)} disabled={isLoading} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 transition">{s}</button>)}</div>

    <div className="h-[500px] p-4 sm:p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 overflow-y-auto space-y-4 shadow-inner">
      {messages.map((msg,idx)=>{const ai=msg.sender==='ai'; return <div key={idx} className={`flex items-start gap-2.5 ${ai?'justify-start':'justify-end'}`}>
        {ai && <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0"><Bot className="w-4 h-4"/></div>}
        <div className={`max-w-[88%] p-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line shadow-sm ${ai?'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700':'bg-indigo-600 text-white'}`}><div className={`text-[10px] font-black uppercase tracking-wider mb-1 ${ai?'text-indigo-500':'text-indigo-200'}`}>{ai?'Mini AI':'Kamu'}</div>{msg.text}</div>
        {!ai && <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0"><User className="w-4 h-4"/></div>}
      </div>})}
      {isLoading && <div className="flex items-center gap-2 text-xs text-slate-500"><Loader2 className="w-4 h-4 animate-spin text-indigo-500"/> Mini AI sedang berpikir...</div>}
      <div ref={messagesEndRef}/>
    </div>

    <div className="flex gap-2"><input value={inputText} disabled={isLoading} onChange={e=>setInputText(e.target.value)} onKeyDown={e=>{if(e.key==='Enter') handleSend()}} placeholder="Tanya apa saja..." className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"/><button onClick={()=>handleSend()} disabled={!inputText.trim()||isLoading} className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold flex items-center gap-2"><Send className="w-4 h-4"/><span>Kirim</span></button><button onClick={()=>setMessages([{sender:'ai',text:'Chat dibersihkan. Mau mulai dengan pertanyaan apa?',timestamp:Date.now()}])} className="px-3 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" title="Chat baru"><RotateCcw className="w-4 h-4"/></button></div>
  </div>;
};

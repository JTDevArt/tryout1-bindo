import React, { useState, useMemo } from 'react';
import {
  GraduationCap,
  Sparkles,
  BookMarked,
  PenTool,
  Info,
  ArrowRight,
} from 'lucide-react';
import { LatihanMode } from '../types';
import { flashcards } from '../data/flashcardsData';

interface LatihanViewProps {
  onStartLatihan: (mode: LatihanMode, kelas: string, topic: string) => void;
}

export const LatihanView: React.FC<LatihanViewProps> = ({ onStartLatihan }) => {
  const [mode, setMode] = useState<LatihanMode>('belajar');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');

  const topicsForClass = useMemo(() => {
    const pool =
      selectedClass === 'all'
        ? flashcards
        : flashcards.filter((c) => c.kelas === parseInt(selectedClass));
    const unique = Array.from(new Set(pool.map((c) => c.topik)));
    return unique;
  }, [selectedClass]);

  const modes: {
    id: LatihanMode;
    title: string;
    desc: string;
    badge: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'belajar',
      title: 'Mode Belajar (Ronde Redemption)',
      desc: 'Pilih kelas, jawab 50 soal pilihan ganda. Langsung tahu benar/salah + pembahasan. Ada ronde Redemption untuk soal yang salah.',
      badge: 'Paling Populer',
      icon: <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
    },
    {
      id: 'latihan',
      title: 'Mode Latihan per Topik',
      desc: 'Pilih kelas dan topik spesifik. Soal campuran: pilihan ganda, isian, dan esai lengkap dengan feedback seketika.',
      badge: 'Campuran PG + Isian + Esai',
      icon: <BookMarked className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
    },
    {
      id: 'isian',
      title: 'Mode Isian Singkat',
      desc: 'Latihan khusus soal isian singkat tanpa bantuan pilihan jawaban. Ketik jawabanmu dan uji ketepatan analisismu.',
      badge: 'Uji Hafalan & Ketepatan',
      icon: <PenTool className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      {/* Title */}
      <div className="text-center sm:text-left pb-2 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2 font-sans">
          <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          Latihan Soal Interaktif
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Pilih mode latihan yang sesuai dengan kebutuhan belajarmu. Jawaban benar/salah langsung ditampilkan beserta pembahasan lengkap.
        </p>
      </div>

      {/* Mode Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {modes.map((m) => {
          const isSelected = mode === m.id;
          return (
            <div
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isSelected
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {m.icon}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200/70 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {m.badge}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1.5">
                  {m.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {m.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
                <span>{isSelected ? 'Mode Terpilih' : 'Pilih Mode Ini'}</span>
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Redemption Round Explanation Box */}
      <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 flex items-start gap-3 text-xs sm:text-sm">
        <Info className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">Tentang Fitur Ronde Redemption (Khusus Mode Belajar):</p>
          <p className="text-indigo-800/90 dark:text-indigo-300/90 leading-relaxed">
            Dalam Mode Belajar, soal yang kamu jawab salah akan otomatis dikumpulkan dan dikerjakan kembali setelah ronde utama selesai.
            Ini adalah kesempatan keduamu untuk memperbaiki pemahaman konsep. Hasil evaluasi akhir baru ditampilkan setelah ronde Redemption selesai.
          </p>
        </div>
      </div>

      {/* Class and Topic Options */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4 shadow-sm">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-2">
            Pilih Cakupan Kelas:
          </label>
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { id: 'all', label: 'Semua Kelas (4, 5, 6)' },
              { id: '4', label: 'Kelas 4 Saja' },
              { id: '5', label: 'Kelas 5 Saja' },
              { id: '6', label: 'Kelas 6 Saja' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedClass(item.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  selectedClass === item.id
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-750 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Topic select for Mode Latihan */}
        {mode === 'latihan' && (
          <div className="pt-2 border-t border-slate-100 dark:border-slate-750">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-2">
              Pilih Topik Khusus:
            </label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full sm:w-80 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-750 text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Semua Topik ({topicsForClass.length} Topik Tersedia)</option>
              {topicsForClass.map((topic, i) => (
                <option key={i} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Start Button */}
      <div className="pt-2">
        <button
          onClick={() => onStartLatihan(mode, selectedClass, selectedTopic)}
          className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40 active:scale-[0.99] transition-all"
        >
          <span>Mulai Latihan Sekarang</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Flame, Clock, Target, CheckSquare, Sparkles } from 'lucide-react';

interface TryoutConfigViewProps {
  onStartTryout: (config: {
    classes: number[];
    pgCount: number;
    isianCount: number;
    esaiCount: number;
    targetScore: number;
  }) => void;
}

export const TryoutConfigView: React.FC<TryoutConfigViewProps> = ({ onStartTryout }) => {
  const [pgCount, setPgCount] = useState<number>(30);
  const [isianCount, setIsianCount] = useState<number>(15);
  const [esaiCount, setEsaiCount] = useState<number>(5);
  const [targetScore, setTargetScore] = useState<number>(80);
  const [selectedClasses, setSelectedClasses] = useState<{ [key: number]: boolean }>({
    4: true,
    5: true,
    6: true,
  });

  const totalCount = (pgCount || 0) + (isianCount || 0) + (esaiCount || 0);

  const toggleClass = (kelas: number) => {
    setSelectedClasses((prev) => {
      const next = { ...prev, [kelas]: !prev[kelas] };
      // Prevent unchecking all
      const hasAny = Object.values(next).some(Boolean);
      return hasAny ? next : prev;
    });
  };

  const handleStart = () => {
    const classes = [4, 5, 6].filter((k) => selectedClasses[k]);
    if (classes.length === 0) {
      alert('Pilih minimal satu kelas.');
      return;
    }
    if (totalCount <= 0) {
      alert('Total soal harus lebih dari 0.');
      return;
    }
    onStartTryout({
      classes,
      pgCount: Math.max(0, pgCount || 0),
      isianCount: Math.max(0, isianCount || 0),
      esaiCount: Math.max(0, esaiCount || 0),
      targetScore: targetScore || 80,
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Title */}
      <div className="text-center pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-bold mb-2">
          <Flame className="w-3.5 h-3.5" />
          <span>Simulasi Tryout Mandiri</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-sans">
          Tryout Bahasa Indonesia
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Sesuaikan komposisi soal atau gunakan komposisi standar 50 soal (30 PG + 15 Isian + 5 Esai).
        </p>
      </div>

      {/* Main Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md space-y-6">
        {/* Question Distribution Inputs */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              Komposisi Tipe Soal
            </h3>
            <span className="text-xs font-semibold text-slate-400">
              Sesuaikan jumlah sesuai keinginan
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50">
              <label className="block text-xs font-bold text-indigo-900 dark:text-indigo-300 mb-1">
                Pilihan Ganda
              </label>
              <input
                type="number"
                min="0"
                max="50"
                value={pgCount}
                onChange={(e) => setPgCount(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800 font-bold text-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block">
                Opsi A, B, C, D diacak
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50">
              <label className="block text-xs font-bold text-amber-900 dark:text-amber-300 mb-1">
                Isian Singkat
              </label>
              <input
                type="number"
                min="0"
                max="30"
                value={isianCount}
                onChange={(e) => setIsianCount(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-800 font-bold text-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block">
                Mengetik kata kunci
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50">
              <label className="block text-xs font-bold text-emerald-900 dark:text-emerald-300 mb-1">
                Soal Esai
              </label>
              <input
                type="number"
                min="0"
                max="15"
                value={esaiCount}
                onChange={(e) => setEsaiCount(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800 font-bold text-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block">
                Evaluasi uraian konsep
              </span>
            </div>
          </div>
        </div>

        {/* Source Classes Checkboxes */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-2">
            Sumber Kelas Soal (Pilih minimal satu):
          </label>
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { kelas: 4, label: 'Kelas 4 (Materi Dasar)' },
              { kelas: 5, label: 'Kelas 5 (Materi Inti)' },
              { kelas: 6, label: 'Kelas 6 (Materi Lanjutan)' },
            ].map((item) => {
              const isChecked = selectedClasses[item.kelas];
              return (
                <button
                  key={item.kelas}
                  type="button"
                  onClick={() => toggleClass(item.kelas)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                    isChecked
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-750 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <CheckSquare className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
            Soal akan diacak secara proporsional dari bank soal kelas yang kamu centang.
          </p>
        </div>

        {/* Target and Total Score */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-slate-750">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1 flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-indigo-500" />
              Target Nilai Minimal:
            </label>
            <input
              type="number"
              min="10"
              max="100"
              value={targetScore}
              onChange={(e) => setTargetScore(parseInt(e.target.value) || 80)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 font-bold text-base text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 flex flex-col justify-center">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
              Total Soal yang Akan Dikerjakan:
            </span>
            <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
              {totalCount} <span className="text-xs font-semibold text-slate-400">Soal</span>
            </div>
          </div>
        </div>

        {/* Warning Callout */}
        <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-amber-900 dark:text-amber-200 text-xs flex items-center gap-2.5">
          <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
          <span>
            <strong>Durasi Tryout:</strong> 60 Menit. Pengingat suara otomatis di menit ke-5 dan ke-1.
            Jika waktu habis, hasil otomatis tersimpan dan dievaluasi.
          </span>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 via-indigo-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white font-extrabold text-base sm:text-lg flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 active:scale-[0.99] transition-all"
        >
          <Flame className="w-5 h-5 text-amber-300" />
          <span>MULAI TRYOUT SEKARANG</span>
        </button>
      </div>
    </div>
  );
};

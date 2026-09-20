import React, { useState, useMemo } from 'react';
import { Layers, Search, Play, RotateCw } from 'lucide-react';
import { flashcards } from '../data/flashcardsData';
import { GradeLevel } from '../types';

interface FlashcardViewProps {
  onStartFlashcardQuiz: (kelasFilter: string) => void;
}

export const FlashcardView: React.FC<FlashcardViewProps> = ({ onStartFlashcardQuiz }) => {
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [flippedMap, setFlippedMap] = useState<Record<number, boolean>>({});

  const toggleFlip = (index: number) => {
    setFlippedMap((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const filteredCards = useMemo(() => {
    return flashcards.filter((card) => {
      const classMatch = selectedClass === 'all' || card.kelas === parseInt(selectedClass);
      if (!classMatch) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        card.topik.toLowerCase().includes(q) ||
        card.q.toLowerCase().includes(q) ||
        card.a.toLowerCase().includes(q) ||
        (card.ex && card.ex.toLowerCase().includes(q))
      );
    });
  }, [selectedClass, searchQuery]);

  const getClassBadge = (kelas: GradeLevel) => {
    switch (kelas) {
      case 4:
        return 'bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800';
      case 5:
        return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800';
      case 6:
        return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2 font-sans">
              <Layers className="w-6 h-6 text-amber-500" />
              Pengetahuan & 50 Flashcards
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              {filteredCards.length} Kartu
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Klik kartu untuk membalik dan melihat jawaban. Gunakan filter kelas atau pencarian untuk menemukan konsep yang kamu butuhkan.
          </p>
        </div>

        {/* Start Quiz on this set */}
        <button
          onClick={() => onStartFlashcardQuiz(selectedClass)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-95 whitespace-nowrap self-start sm:self-auto"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>MULAI FLASHCARDS</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          {[
            { id: 'all', label: 'Semua (50)' },
            { id: '4', label: 'Kelas 4 (10)' },
            { id: '5', label: 'Kelas 5 (25)' },
            { id: '6', label: 'Kelas 6 (15)' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedClass(item.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                selectedClass === item.id
                  ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kartu..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Flashcards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCards.map((card, idx) => {
          const isFlipped = !!flippedMap[idx];
          const badgeStyle = getClassBadge(card.kelas);

          return (
            <div
              key={idx}
              onClick={() => toggleFlip(idx)}
              className="cursor-pointer group h-56 perspective-1000 select-none"
            >
              <div
                className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* Front Side */}
                <div
                  className="absolute inset-0 w-full h-full p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between backface-hidden group-hover:border-amber-400 transition-colors"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeStyle}`}>
                        Kelas {card.kelas} • {card.topik}
                      </span>
                      <RotateCw className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-500 transition-colors" />
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                      {card.q}
                    </h3>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-750 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                    <span>Kartu #{idx + 1}</span>
                    <span className="text-amber-600 dark:text-amber-400 font-semibold group-hover:underline">
                      Klik untuk membalik
                    </span>
                  </div>
                </div>

                {/* Back Side */}
                <div
                  className="absolute inset-0 w-full h-full p-4 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-md flex flex-col justify-between backface-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="overflow-y-auto pr-1 no-scrollbar">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white border border-white/30">
                        Jawaban & Pembahasan
                      </span>
                      <RotateCw className="w-3.5 h-3.5 text-white/70" />
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed mb-2">
                      {card.a}
                    </p>

                    {card.ex && (
                      <div className="p-2 rounded-lg bg-black/20 text-[11px] text-indigo-100 border border-white/10 font-mono">
                        <span className="font-bold text-amber-300">Contoh: </span>
                        {card.ex}
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[11px] text-indigo-200">
                    <span>{card.topik}</span>
                    <span className="text-amber-200 font-bold">Klik untuk kembali</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

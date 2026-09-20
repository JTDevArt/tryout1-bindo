import React, { useState, useMemo } from 'react';
import { BookOpen, Search, Sparkles, Check, ChevronRight } from 'lucide-react';
import { materiData } from '../data/materiData';
import { GradeLevel } from '../types';
import { extraExamples } from './RingkasanView';

export const MateriView: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openExample, setOpenExample] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    return materiData
      .filter((group) => {
        if (selectedClass === 'all') return true;
        return group.kelas === parseInt(selectedClass);
      })
      .map((group) => {
        if (!searchQuery.trim()) return group;
        const q = searchQuery.toLowerCase();
        const matchedTopics = group.topics.filter((topic) => {
          return (
            topic.title.toLowerCase().includes(q) ||
            topic.desc.toLowerCase().includes(q) ||
            topic.points.some((p) => p.toLowerCase().includes(q)) ||
            (topic.contoh && topic.contoh.toLowerCase().includes(q))
          );
        });
        return {
          ...group,
          topics: matchedTopics,
        };
      })
      .filter((group) => group.topics.length > 0);
  }, [selectedClass, searchQuery]);

  const getClassTheme = (kelas: GradeLevel) => {
    switch (kelas) {
      case 4:
        return {
          badge: 'bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800',
          dot: 'bg-teal-500',
          accent: 'text-teal-600 dark:text-teal-400',
          border: 'border-teal-100 dark:border-teal-900/40',
        };
      case 5:
        return {
          badge: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
          dot: 'bg-amber-500',
          accent: 'text-amber-600 dark:text-amber-400',
          border: 'border-amber-100 dark:border-amber-900/40',
        };
      case 6:
        return {
          badge: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800',
          dot: 'bg-purple-500',
          accent: 'text-purple-600 dark:text-purple-400',
          border: 'border-purple-100 dark:border-purple-900/40',
        };
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2 font-sans">
            <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            POINTER BAHASA INDONESIA TRYOUT 1
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Materi lengkap sesuai pointer Tryout 1 Kelas 4, 5, dan 6 — pahami arti, ciri-ciri, fungsi, dan contoh sebelum latihan.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari materi, majas, kata..."
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="rounded-2xl bg-slate-900 dark:bg-slate-950 text-white p-5 shadow-lg">
        <div className="text-sm font-black mb-3">Pointer yang dipelajari</div>
        <div className="grid md:grid-cols-3 gap-4 text-xs text-slate-300">
          <div><div className="font-bold text-teal-300 mb-1">MATERI KELAS 4</div><ul className="space-y-1 list-disc pl-4"><li>Kalimat Efektif, Kalimat Majemuk</li><li>Konjungsi Antarkalimat</li><li>Kalimat Fakta dan Opini</li></ul></div>
          <div><div className="font-bold text-amber-300 mb-1">MATERI KELAS 5</div><ul className="space-y-1 list-disc pl-4"><li>Imbuhan pe-, me-, -kan, -lah dan pe-an</li><li>Unsur Intrinsik, Nonfiksi, Majas</li><li>Narasi, Deskripsi, Eksposisi</li><li>Perintah, Ajakan, Harapan, Larangan</li><li>Catatan Perjalanan & Sebab-Akibat</li><li>Majemuk Setara & Bertingkat</li></ul></div>
          <div><div className="font-bold text-purple-300 mb-1">MATERI KELAS 6</div><ul className="space-y-1 list-disc pl-4"><li>Sinonim, Antonim</li><li>Informasi, Ide Pokok, Ide Pendukung</li><li>Simpulan Teks</li><li>Laporan Pengamatan & Wawancara</li></ul></div>
        </div>
      </div>

      {/* Class filter pills */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 mr-1">
          Filter Kelas:
        </span>
        {[
          { id: 'all', label: 'Semua Kelas' },
          { id: '4', label: 'Kelas 4' },
          { id: '5', label: 'Kelas 5' },
          { id: '6', label: 'Kelas 6' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedClass(item.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
              selectedClass === item.id
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="p-8 text-center rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500">
          <p className="text-sm">Tidak ditemukan materi dengan kata kunci "{searchQuery}".</p>
        </div>
      )}

      {/* Materi Groups */}
      <div className="space-y-8">
        {filteredData.map((group) => {
          const theme = getClassTheme(group.kelas);
          return (
            <div key={group.kelas} className="space-y-4">
              {/* Group Header */}
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${theme.dot}`} />
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-sans">
                  {group.title}
                </h3>
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${theme.badge}`}
                >
                  {group.percentageText}
                </span>
              </div>

              {/* Topics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.topics.map((topic, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl bg-white dark:bg-slate-800/90 border ${theme.border} shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-1.5">
                          <ChevronRight className={`w-4 h-4 ${theme.accent} flex-shrink-0`} />
                          {topic.title}
                        </h4>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                        {topic.desc}
                      </p>

                      <div className="space-y-1.5 mb-4">
                        {topic.points.map((pt, pIdx) => (
                          <div
                            key={pIdx}
                            className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300"
                          >
                            <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {topic.contoh && (
                      <div className="space-y-2">
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-750/80 border border-slate-200/80 dark:border-slate-700 text-xs">
                          <div className="font-bold text-slate-700 dark:text-slate-200 mb-1 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-500" /> Contoh utama:
                          </div>
                          <p className="text-slate-600 dark:text-slate-300 text-[11px] sm:text-xs leading-relaxed">{topic.contoh}</p>
                        </div>
                        <button type="button" onClick={() => setOpenExample(openExample === `${group.kelas}-${topic.title}` ? null : `${group.kelas}-${topic.title}`)} className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                          {openExample === `${group.kelas}-${topic.title}` ? 'Sembunyikan contoh lainnya' : 'Lihat contoh lainnya →'}
                        </button>
                        {openExample === `${group.kelas}-${topic.title}` && (
                          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-1.5 text-[11px] sm:text-xs text-slate-700 dark:text-slate-300">
                            {(extraExamples[topic.title] || []).map((example, exampleIndex) => <div key={exampleIndex}>• {example}</div>)}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

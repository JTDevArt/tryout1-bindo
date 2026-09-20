import React from 'react';
import {
  BookOpen,
  Layers,
  GraduationCap,
  Flame,
  Bot,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Trophy,
} from 'lucide-react';
import { AppTab } from '../types';

interface BerandaViewProps {
  onNavigate: (tab: AppTab) => void;
  onQuickStartTryout: () => void;
}

export const BerandaView: React.FC<BerandaViewProps> = ({
  onNavigate,
  onQuickStartTryout,
}) => {
  const featureCards = [
    {
      tab: 'materi' as AppTab,
      title: 'Materi Lengkap',
      desc: 'Penjelasan sistematis semua materi Bahasa Indonesia Kelas 4, 5, dan 6 lengkap dengan poin inti dan contoh praktis.',
      icon: <BookOpen className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
      bg: 'bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-900',
      badge: 'Kelas 4, 5, 6',
    },
    {
      tab: 'flashcard' as AppTab,
      title: '50 Flashcards',
      desc: '50 kartu pintar interaktif dengan efek balik 3D untuk menguji hafalan konsep dan kaidah bahasa secara cepat.',
      icon: <Layers className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
      bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900',
      badge: '50 Kartu Edukatif',
    },
    {
      tab: 'latihan' as AppTab,
      title: 'Mode Latihan & Belajar',
      desc: 'Dilengkapi pembahasan langsung dan fitur Ronde Redemption otomatis untuk memperbaiki soal yang salah jawab.',
      icon: <GraduationCap className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
      bg: 'bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-900',
      badge: 'Redemption Round',
    },
    {
      tab: 'tryout' as AppTab,
      title: '🔥 Tryout 50 Soal',
      desc: 'Simulasi ujian dengan komposisi berbobot (10 K4 + 25 K5 + 15 K6), pengatur waktu 60 menit, dan analisis nilai mendalam.',
      icon: <Flame className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
      bg: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900',
      badge: 'Simulasi Ujian',
      highlight: true,
    },
    {
      tab: 'ai' as AppTab,
      title: 'Mini AI Tutor',
      desc: 'Tanya jawab seputar tata bahasa, majas, struktur kalimat, dan materi pointer Bahasa Indonesia kapan pun kamu butuh.',
      icon: <Bot className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      bg: 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-900',
      badge: 'Tutor Cerdas',
    },
    {
      tab: 'statistik' as AppTab,
      title: 'Statistik & Riwayat',
      desc: 'Pantau grafik perkembangan nilai tryoutmu, evaluasi materi yang sering salah, dan capai target skormu.',
      icon: <BarChart3 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900',
      badge: 'Riwayat & Evaluasi',
    },
  ];

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto pt-6 pb-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-bold tracking-wide border border-indigo-200 dark:border-indigo-800 mb-4 shadow-sm">
          <span>📖</span>
          <span>Tryout 1 - Bahasa Indonesia SD</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4 font-sans">
          Bindo Tryout 1 — Kelas 4, 5, 6
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto">
          Platform belajar terintegrasi Bahasa Indonesia untuk SD kelas 4, 5, dan 6.
          Materi lengkap, 50 flashcard, latihan interaktif, tryout 50 soal, Mini AI tutor, dan grafik perkembangan.
        </p>

        {/* Quick Action CTA */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10">
          <button
            onClick={onQuickStartTryout}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm sm:text-base shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Flame className="w-4 h-4 text-amber-300" />
            <span>Mulai Tryout Standar (50 Soal)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate('latihan')}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm sm:text-base hover:bg-slate-50 dark:hover:bg-slate-750 transition-all"
          >
            <GraduationCap className="w-4 h-4 text-indigo-500" />
            <span>Masuk Mode Belajar</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="text-center p-2 rounded-xl bg-teal-50/60 dark:bg-teal-950/30">
            <div className="text-2xl sm:text-3xl font-black text-teal-600 dark:text-teal-400">10</div>
            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">
              Kelas 4 (20%)
            </div>
          </div>
          <div className="text-center p-2 rounded-xl bg-amber-50/60 dark:bg-amber-950/30">
            <div className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400">25</div>
            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">
              Kelas 5 (50%)
            </div>
          </div>
          <div className="text-center p-2 rounded-xl bg-purple-50/60 dark:bg-purple-950/30">
            <div className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400">15</div>
            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">
              Kelas 6 (30%)
            </div>
          </div>
          <div className="text-center p-2 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30">
            <div className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400">50</div>
            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">
              Total Soal
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            Fitur Utama Pembelajaran
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Klik modul untuk membuka
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featureCards.map((feat) => (
            <div
              key={feat.tab}
              onClick={() => onNavigate(feat.tab)}
              className={`group p-5 rounded-2xl border transition-all cursor-pointer hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between ${
                feat.highlight
                  ? 'border-indigo-300 dark:border-indigo-700 bg-white dark:bg-slate-800 hover:border-indigo-500 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${feat.bg}`}>
                    {feat.icon}
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700/80 text-slate-600 dark:text-slate-300">
                    {feat.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {feat.desc}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-750 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                <span>Buka Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Information Banner */}
      <div className="p-5 rounded-2xl border border-indigo-100 dark:border-indigo-900/60 bg-gradient-to-r from-indigo-50/70 to-purple-50/70 dark:from-indigo-950/40 dark:to-purple-950/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-bold text-sm text-indigo-900 dark:text-indigo-200">
            <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
            <span>Sesuai Standar Kurikulum Bahasa Indonesia SD</span>
          </div>
          <p className="text-xs text-indigo-800/80 dark:text-indigo-300/80">
            Materi mencakup Kalimat Efektif, Imbuhan, Unsur Intrinsik Cerita, Teks Nonfiksi, Majas, Sinonim/Antonim, dan Simpulan Teks.
          </p>
        </div>
        <button
          onClick={() => onNavigate('materi')}
          className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold shadow-sm border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-slate-700 whitespace-nowrap transition-colors"
        >
          Lihat Semua Materi
        </button>
      </div>
    </div>
  );
};

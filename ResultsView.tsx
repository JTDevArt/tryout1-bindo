import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  Home,
  AlertTriangle,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { formatTime } from '../utils/quizHelper';

export interface ResultQuestionItem {
  q: string;
  correct: boolean;
  correctAnswer: string;
  userAnswer?: string;
  topik: string;
  kelas: number;
  explanation?: string;
}

interface ResultsViewProps {
  mode: string;
  score: number;
  correctCount: number;
  wrongCount: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  targetScore?: number | null;
  perClassStats: {
    4: { correct: number; total: number };
    5: { correct: number; total: number };
    6: { correct: number; total: number };
  };
  weakMaterials: { topic: string; count: number }[];
  pembahasanList: ResultQuestionItem[];
  isRedemption: boolean;
  onRetryWrongQuestions?: () => void;
  onTryAgain: () => void;
  onGoHome: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  mode,
  score,
  correctCount,
  wrongCount,
  totalQuestions,
  timeSpentSeconds,
  targetScore,
  perClassStats,
  weakMaterials,
  pembahasanList,
  isRedemption,
  onRetryWrongQuestions,
  onTryAgain,
  onGoHome,
}) => {
  const [showPembahasan, setShowPembahasan] = useState<boolean>(true);

  // Trigger celebration confetti for high score
  useEffect(() => {
    if (score >= 80) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    }
  }, [score]);

  const getScoreTheme = (s: number) => {
    if (s >= 80)
      return {
        text: 'text-emerald-600 dark:text-emerald-400',
        bg: 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700',
        ring: 'ring-emerald-500/20',
      };
    if (s >= 60)
      return {
        text: 'text-indigo-600 dark:text-indigo-400',
        bg: 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-700',
        ring: 'ring-indigo-500/20',
      };
    if (s >= 40)
      return {
        text: 'text-amber-600 dark:text-amber-400',
        bg: 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700',
        ring: 'ring-amber-500/20',
      };
    return {
      text: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-950/60 border-red-300 dark:border-red-700',
      ring: 'ring-red-500/20',
    };
  };

  const scoreTheme = getScoreTheme(score);

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-fade-in">
      {/* Top Banner */}
      <div className="text-center space-y-3 pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
          <Trophy className="w-3.5 h-3.5 text-amber-500" />
          <span>
            {mode === 'tryout'
              ? 'Laporan Hasil Tryout'
              : isRedemption
              ? 'Hasil Ronde Redemption Selesai'
              : 'Hasil Sesi Belajar'}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-sans">
          {score >= 80 ? 'Luar Biasa! Pertahankan!' : score >= 60 ? 'Bagus! Terus Tingkatkan!' : 'Perlu Berlatih Lebih Giat!'}
        </h2>

        {/* Score Circle */}
        <div className="flex flex-col items-center justify-center pt-2">
          <div
            className={`w-32 h-32 rounded-full border-4 flex flex-col items-center justify-center shadow-lg transition-transform hover:scale-105 ${scoreTheme.bg} ${scoreTheme.ring}`}
          >
            <span className={`text-4xl sm:text-5xl font-black ${scoreTheme.text} font-sans`}>
              {score}
            </span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
              Nilai / 100
            </span>
          </div>
        </div>

        {/* Target Message */}
        {targetScore && (
          <div
            className={`max-w-md mx-auto p-3 rounded-2xl text-xs font-bold border ${
              score >= targetScore
                ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800'
                : 'bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-800'
            }`}
          >
            {score >= targetScore
              ? `🎯 Target tercapai! Kamu berhasil mencapai nilai ${score} (Target: ${targetScore}).`
              : `🎯 Kamu berjarak ${targetScore - score} poin dari target ${targetScore}. Pelajari lagi materi yang salah ya!`}
          </div>
        )}
      </div>

      {/* 4 Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center shadow-sm">
          <div className="flex items-center justify-center gap-1 text-emerald-600 dark:text-emerald-400 mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xl sm:text-2xl font-black">{correctCount}</span>
          </div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Jawaban Benar
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center shadow-sm">
          <div className="flex items-center justify-center gap-1 text-red-600 dark:text-red-400 mb-1">
            <XCircle className="w-4 h-4" />
            <span className="text-xl sm:text-2xl font-black">{wrongCount}</span>
          </div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Jawaban Salah
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center shadow-sm">
          <div className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400 mb-1">
            {Math.round((correctCount / (totalQuestions || 1)) * 100)}%
          </div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Akurasi Soal
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center shadow-sm">
          <div className="flex items-center justify-center gap-1 text-amber-600 dark:text-amber-400 mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-lg sm:text-xl font-bold font-mono">
              {formatTime(timeSpentSeconds)}
            </span>
          </div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Waktu Pengerjaan
          </div>
        </div>
      </div>

      {/* Per Class Breakdown */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Statistik per Jenjang Kelas
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900 text-center">
            <div className="text-xs font-bold text-teal-800 dark:text-teal-300">Kelas 4 (Dasar)</div>
            <div className="text-xl font-black text-teal-600 dark:text-teal-400 mt-1">
              {perClassStats[4].correct} / {perClassStats[4].total}
            </div>
            <div className="text-[10px] text-teal-700/80 dark:text-teal-400/80 font-semibold mt-0.5">
              {perClassStats[4].total > 0
                ? `${Math.round((perClassStats[4].correct / perClassStats[4].total) * 100)}% Tercapai`
                : 'Tidak ada soal'}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-center">
            <div className="text-xs font-bold text-amber-800 dark:text-amber-300">Kelas 5 (Inti)</div>
            <div className="text-xl font-black text-amber-600 dark:text-amber-400 mt-1">
              {perClassStats[5].correct} / {perClassStats[5].total}
            </div>
            <div className="text-[10px] text-amber-700/80 dark:text-amber-400/80 font-semibold mt-0.5">
              {perClassStats[5].total > 0
                ? `${Math.round((perClassStats[5].correct / perClassStats[5].total) * 100)}% Tercapai`
                : 'Tidak ada soal'}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900 text-center">
            <div className="text-xs font-bold text-purple-800 dark:text-purple-300">Kelas 6 (Lanjutan)</div>
            <div className="text-xl font-black text-purple-600 dark:text-purple-400 mt-1">
              {perClassStats[6].correct} / {perClassStats[6].total}
            </div>
            <div className="text-[10px] text-purple-700/80 dark:text-purple-400/80 font-semibold mt-0.5">
              {perClassStats[6].total > 0
                ? `${Math.round((perClassStats[6].correct / perClassStats[6].total) * 100)}% Tercapai`
                : 'Tidak ada soal'}
            </div>
          </div>
        </div>
      </div>

      {/* Weak Materials Callout */}
      {weakMaterials.length > 0 && (
        <div className="p-5 rounded-3xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 space-y-2">
          <h4 className="text-sm font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Materi yang Perlu Dipelajari Lagi:</span>
          </h4>
          <ul className="space-y-1 text-xs text-amber-800 dark:text-amber-300 pl-2">
            {weakMaterials.map((w, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                <span>
                  <strong>{w.topic}</strong> — {w.count} soal belum terjawab dengan tepat
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        {wrongCount > 0 && onRetryWrongQuestions && (
          <button
            onClick={onRetryWrongQuestions}
            className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ulangi Soal yang Salah ({wrongCount})</span>
          </button>
        )}

        <button
          onClick={onTryAgain}
          className="px-5 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
        >
          Coba Lagi
        </button>

        <button
          onClick={onGoHome}
          className="px-5 py-3 rounded-2xl border border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>
      </div>

      {/* Pembahasan Section */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setShowPembahasan(!showPembahasan)}
          className="w-full flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-900 dark:text-white shadow-sm hover:border-indigo-300 transition-colors"
        >
          <span className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <span>Pembahasan Rinci ({pembahasanList.length} Soal)</span>
          </span>
          {showPembahasan ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showPembahasan && (
          <div className="mt-4 space-y-3">
            {pembahasanList.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-2 transition-all ${
                  item.correct
                    ? 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700'
                    : 'bg-red-50/40 dark:bg-red-950/20 border-red-200 dark:border-red-900/40'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-slate-500 dark:text-slate-400 text-xs">
                    Soal #{idx + 1} • Kelas {item.kelas} • {item.topik}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.correct
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300'
                    }`}
                  >
                    {item.correct ? 'Benar' : 'Salah'}
                  </span>
                </div>

                <p className="font-semibold text-slate-900 dark:text-white leading-relaxed">
                  {item.q}
                </p>

                {item.userAnswer && (
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Jawabanmu: <span className="font-semibold text-slate-700 dark:text-slate-200">{item.userAnswer}</span>
                  </div>
                )}

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-750/70 text-xs leading-relaxed space-y-1 border border-slate-200/60 dark:border-slate-700">
                  <div className="font-bold text-indigo-600 dark:text-indigo-400">
                    Kunci Jawaban: {item.correctAnswer}
                  </div>
                  {item.explanation && (
                    <div className="text-slate-600 dark:text-slate-300">
                      {item.explanation}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

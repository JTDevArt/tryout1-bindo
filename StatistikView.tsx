import React from 'react';
import {
  BarChart3,
  Trophy,
  Flame,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Trash2,
} from 'lucide-react';
import { UserStats } from '../types';
import { formatTime } from '../utils/quizHelper';
import { clearUserStats } from '../utils/storage';

interface StatistikViewProps {
  stats: UserStats;
  onRefreshStats: () => void;
  onStartTryoutClick: () => void;
}

export const StatistikView: React.FC<StatistikViewProps> = ({
  stats,
  onRefreshStats,
  onStartTryoutClick,
}) => {
  const tryouts = stats.tryouts;

  if (tryouts.length === 0) {
    return (
      <div className="max-w-xl mx-auto p-10 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-4 shadow-sm animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
          <BarChart3 className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Belum Ada Riwayat Tryout
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          Kamu belum pernah menyelesaikan tryout. Kerjakan tryout pertamamu sekarang untuk melihat grafik perkembangan nilaimu!
        </p>
        <button
          onClick={onStartTryoutClick}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-all"
        >
          Mulai Tryout Pertama
        </button>
      </div>
    );
  }

  const scores = tryouts.map((t) => t.score);
  const highest = Math.max(...scores);
  const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

  // Frequency of weak materials
  const weakCount: Record<string, number> = {};
  tryouts.forEach((t) => {
    (t.weakMaterials || []).forEach((m) => {
      weakCount[m] = (weakCount[m] || 0) + 1;
    });
  });

  const topWeak = Object.entries(weakCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const handleClear = () => {
    if (confirm('Hapus seluruh riwayat tryout dari browser? Tindakan ini tidak dapat dibatalkan.')) {
      clearUserStats();
      onRefreshStats();
    }
  };

  // Build SVG Points for the Score History Line Chart
  // Data points are ordered chronologically (oldest to newest)
  const chronoTryouts = [...tryouts].reverse();
  const chartHeight = 160;
  const chartWidth = 600;
  const paddingX = 40;
  const paddingY = 25;

  const points = chronoTryouts.map((t, idx) => {
    const x =
      chronoTryouts.length === 1
        ? chartWidth / 2
        : paddingX + (idx / (chronoTryouts.length - 1)) * (chartWidth - 2 * paddingX);
    const y =
      chartHeight -
      paddingY -
      (t.score / 100) * (chartHeight - 2 * paddingY);
    return { x, y, score: t.score, label: `T#${idx + 1}` };
  });

  const pathD =
    points.length > 1
      ? points.reduce(
          (acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`,
          ''
        )
      : '';

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Title */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2 font-sans">
            <BarChart3 className="w-6 h-6 text-emerald-500" />
            Statistik & Riwayat Tryout
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Pantau konsistensi dan capaian nilaimu dari waktu ke waktu
          </p>
        </div>

        <button
          onClick={handleClear}
          title="Reset riwayat"
          className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center shadow-sm">
          <div className="flex items-center justify-center gap-1.5 text-emerald-600 dark:text-emerald-400 mb-0.5">
            <Trophy className="w-5 h-5" />
            <span className="text-2xl sm:text-3xl font-black font-sans">{highest}</span>
          </div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Nilai Tertinggi
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center shadow-sm">
          <div className="flex items-center justify-center gap-1.5 text-indigo-600 dark:text-indigo-400 mb-0.5">
            <TrendingUp className="w-5 h-5" />
            <span className="text-2xl sm:text-3xl font-black font-sans">{avg}</span>
          </div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Nilai Rata-rata
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center shadow-sm">
          <div className="flex items-center justify-center gap-1.5 text-amber-600 dark:text-amber-400 mb-0.5">
            <Flame className="w-5 h-5" />
            <span className="text-2xl sm:text-3xl font-black font-sans">{tryouts.length}</span>
          </div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Total Sesi Tryout
          </div>
        </div>
      </div>

      {/* SVG Progression Line Chart */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
          <span>Grafik Perkembangan Nilai Tryout</span>
          <span className="text-slate-400 font-normal text-[11px]">Skala 0 - 100</span>
        </div>

        <div className="w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full h-44 overflow-visible"
          >
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map((val) => {
              const y =
                chartHeight -
                paddingY -
                (val / 100) * (chartHeight - 2 * paddingY);
              return (
                <g key={val}>
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={chartWidth - paddingX}
                    y2={y}
                    stroke="currentColor"
                    className="text-slate-100 dark:text-slate-700"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={paddingX - 8}
                    y={y + 3}
                    textAnchor="end"
                    className="text-[10px] fill-slate-400 font-mono"
                  >
                    {val}
                  </text>
                </g>
              );
            })}

            {/* Target 80 horizontal reference */}
            <line
              x1={paddingX}
              y1={chartHeight - paddingY - 0.8 * (chartHeight - 2 * paddingY)}
              x2={chartWidth - paddingX}
              y2={chartHeight - paddingY - 0.8 * (chartHeight - 2 * paddingY)}
              stroke="#10b981"
              strokeWidth="1.5"
              strokeDasharray="2 2"
              opacity="0.6"
            />

            {/* Line connecting points */}
            {points.length > 1 && (
              <path
                d={pathD}
                fill="none"
                stroke="#6366f1"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Point circles & values */}
            {points.map((p, idx) => (
              <g key={idx} className="group">
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="5"
                  className="fill-indigo-600 stroke-white dark:stroke-slate-900 stroke-2"
                />
                <text
                  x={p.x}
                  y={p.y - 10}
                  textAnchor="middle"
                  className="text-[11px] font-extrabold fill-slate-800 dark:fill-slate-100"
                >
                  {p.score}
                </text>
                <text
                  x={p.x}
                  y={chartHeight - 6}
                  textAnchor="middle"
                  className="text-[9px] fill-slate-400"
                >
                  {p.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Top Weak Materials */}
      {topWeak.length > 0 && (
        <div className="p-5 rounded-3xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 space-y-2.5">
          <h3 className="text-sm font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Materi yang Paling Sering Salah Jawab:</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {topWeak.map(([topic, count], i) => (
              <div
                key={i}
                className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-amber-200/70 dark:border-amber-900/60 flex items-center justify-between text-xs"
              >
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {topic}
                </span>
                <span className="font-bold text-red-600 dark:text-red-400">
                  {count}x salah
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Historical List */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          Riwayat Detail Tryout ({tryouts.length} Sesi):
        </h3>

        <div className="space-y-2.5">
          {tryouts.map((item, idx) => {
            const isHigh = item.score >= 80;
            return (
              <div
                key={item.id || idx}
                className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Tryout #{tryouts.length - idx} • {item.date}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isHigh
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300'
                      }`}
                    >
                      Skor: {item.score}/100
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                    <span className="flex items-center gap-1 text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {item.correct} Benar
                    </span>
                    <span className="flex items-center gap-1 text-red-500">
                      <XCircle className="w-3.5 h-3.5" />
                      {item.wrong} Salah
                    </span>
                    <span className="flex items-center gap-1 text-amber-600">
                      <Clock className="w-3.5 h-3.5" />
                      {formatTime(item.timeSeconds)}
                    </span>
                  </div>
                </div>

                {/* Per class tags */}
                <div className="flex items-center gap-1.5 text-[11px] font-mono self-start sm:self-auto">
                  <span className="px-2 py-1 rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                    K4: {item.perClass?.[4] || 0}/{item.perClassTotal?.[4] || 0}
                  </span>
                  <span className="px-2 py-1 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    K5: {item.perClass?.[5] || 0}/{item.perClassTotal?.[5] || 0}
                  </span>
                  <span className="px-2 py-1 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                    K6: {item.perClass?.[6] || 0}/{item.perClassTotal?.[6] || 0}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

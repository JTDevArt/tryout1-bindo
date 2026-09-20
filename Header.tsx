import React from 'react';
import {
  BookOpen,
  Volume2,
  VolumeX,
  Moon,
  Sun,
  Timer as TimerIcon,
  Sparkles,
  Layers,
  ListChecks,
  GraduationCap,
  Flame,
  Bot,
  BarChart3,
} from 'lucide-react';
import { AppTab } from '../types';
import { formatTime } from '../utils/quizHelper';

interface HeaderProps {
  activeTab: AppTab;
  onNavigate?: (tab: AppTab) => void;
  onSelectTab?: (tab: AppTab) => void;
  isTimerActive?: boolean;
  isQuizActive?: boolean;
  quizMode?: string;
  timeRemaining?: number;
  soundEnabled?: boolean;
  soundMuted?: boolean;
  onToggleSound: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onQuickStartTryout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onNavigate,
  onSelectTab,
  isTimerActive,
  isQuizActive,
  quizMode,
  timeRemaining = 0,
  soundEnabled,
  soundMuted,
  onToggleSound,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const handleSelect = (tab: AppTab) => {
    if (onNavigate) onNavigate(tab);
    else if (onSelectTab) onSelectTab(tab);
  };

  const isSoundOn = soundMuted !== undefined ? !soundMuted : soundEnabled ?? true;
  const isTimerShown = (isTimerActive || (isQuizActive && quizMode === 'tryout')) && timeRemaining > 0;
  const isTimeWarning = timeRemaining <= 300;

  const navItems: { id: AppTab; label: string; icon: React.ReactNode }[] = [
    { id: 'beranda', label: 'Beranda', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'materi', label: 'Materi', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'ringkasan', label: 'Ringkasan', icon: <ListChecks className="w-4 h-4" /> },
    { id: 'flashcard', label: 'Flashcards', icon: <Layers className="w-4 h-4" /> },
    { id: 'latihan', label: 'Latihan', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'tryout', label: 'Tryout', icon: <Flame className="w-4 h-4 text-amber-500" /> },
    { id: 'ai', label: 'Mini AI', icon: <Bot className="w-4 h-4" /> },
    { id: 'statistik', label: 'Statistik', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Brand */}
        <button
          onClick={() => handleSelect('beranda')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
          title="Ke Beranda tryout1-bindo"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-tight font-sans tracking-tight">
              tryout1-bindo
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-800">
                SD 4-6
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              Pointer Bahasa Indonesia
            </p>
          </div>
        </button>

        {/* Center Nav Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/25'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Active Tryout Timer */}
          {isTimerShown && (
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold font-mono transition-all border ${
                isTimeWarning
                  ? 'bg-red-50 text-red-600 border-red-300 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800 animate-pulse'
                  : 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
              }`}
              title="Sisa waktu Tryout"
            >
              <TimerIcon className="w-3.5 h-3.5" />
              <span>{formatTime(timeRemaining)}</span>
            </div>
          )}

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
              isSoundOn
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800'
                : 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
            }`}
            title={isSoundOn ? 'Suara & Narator Aktif' : 'Suara Senyap'}
            aria-label="Toggle Sound"
          >
            {isSoundOn ? (
              <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
            <span className="hidden md:inline">{isSoundOn ? 'Suara ON' : 'Mute'}</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            title={isDarkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};

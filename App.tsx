/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AppTab, QuestionModel, AnswerRecord, UserStats, LatihanMode, TryoutHistoryItem } from './types';
import { Header } from './components/Header';
import { BerandaView } from './components/BerandaView';
import { MateriView } from './components/MateriView';
import { RingkasanView } from './components/RingkasanView';
import { FlashcardView } from './components/FlashcardView';
import { LatihanView } from './components/LatihanView';
import { TryoutConfigView } from './components/TryoutConfigView';
import { QuizActiveView } from './components/QuizActiveView';
import { ResultsView, ResultQuestionItem } from './components/ResultsView';
import { MiniAIView } from './components/MiniAIView';
import { StatistikView } from './components/StatistikView';

import {
  buildTryoutSet,
  buildBelajarSet,
  buildLatihanSet,
  buildIsianSet,
  buildFlashcardQuizSet,
  calculateScore,
} from './utils/quizHelper';
import {
  initAudio,
  playChime,
  playSuccess,
  setSoundMuted,
  isSoundMuted,
} from './utils/audio';
import {
  loadUserStats,
  saveTryoutRecord,
  loadThemePreference,
  saveThemePreference,
} from './utils/storage';

const TRYOUT_DURATION = 3600; // 60 minutes in seconds

export default function App() {
  // Navigation & Theme
  const [activeTab, setActiveTab] = useState<AppTab>('beranda');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => loadThemePreference());
  const [soundMuted, setMutedState] = useState<boolean>(() => isSoundMuted());
  const [stats, setStats] = useState<UserStats>(() => loadUserStats());

  // Active Quiz State
  const [isQuizActive, setIsQuizActive] = useState<boolean>(false);
  const [quizMode, setQuizMode] = useState<'tryout' | 'belajar' | 'latihan' | 'isian' | 'retry'>('tryout');
  const [questions, setQuestions] = useState<QuestionModel[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<(AnswerRecord | null)[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<number>(TRYOUT_DURATION);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [targetScore, setTargetScore] = useState<number | null>(80);

  // Redemption round state (for Mode Belajar)
  const [isRedemption, setIsRedemption] = useState<boolean>(false);
  const [originalBelajarQuestions, setOriginalBelajarQuestions] = useState<QuestionModel[]>([]);
  const [originalBelajarAnswers, setOriginalBelajarAnswers] = useState<(AnswerRecord | null)[]>([]);

  // Retry state (retrying wrong questions from results)
  const [isRetry, setIsRetry] = useState<boolean>(false);
  const [retryTotal, setRetryTotal] = useState<number>(0);

  // Results display state
  const [resultsData, setResultsData] = useState<{
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
    wrongQuestionsPool: QuestionModel[];
  } | null>(null);

  // Warning chime flags
  const warned5MinRef = useRef(false);
  const warned1MinRef = useRef(false);

  // Synchronize Dark Mode to HTML document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveThemePreference(isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const toggleSound = () => {
    initAudio();
    const next = !soundMuted;
    setSoundMuted(next);
    setMutedState(next);
  };

  // Submit Quiz Callback
  const submitQuiz = useCallback(() => {
    if (!isQuizActive) return;

    // Check if in Mode Belajar and has wrong answers and hasn't done redemption yet
    if (quizMode === 'belajar' && !isRedemption) {
      const wrongIndices = answers
        .map((ans, idx) => (!ans || !ans.correct ? idx : -1))
        .filter((idx) => idx !== -1);

      if (wrongIndices.length > 0) {
        // Start Redemption Round for wrong answers!
        const redemptionQuestions = wrongIndices.map((i) => questions[i]);
        setOriginalBelajarQuestions(questions);
        setOriginalBelajarAnswers(answers);
        setQuestions(redemptionQuestions);
        setAnswers(new Array(redemptionQuestions.length).fill(null));
        setCurrentIndex(0);
        setIsRedemption(true);
        playChime();
        return;
      }
    }

    // Merge answers if this was the redemption round
    let finalQuestions = questions;
    let finalAnswers = answers;

    if (isRedemption && originalBelajarQuestions.length > 0) {
      finalQuestions = originalBelajarQuestions;
      // Replace original wrong answers with new answers from redemption round
      const merged = [...originalBelajarAnswers];
      let rIdx = 0;
      for (let i = 0; i < merged.length; i++) {
        if (!merged[i] || !merged[i]?.correct) {
          if (answers[rIdx]) {
            merged[i] = answers[rIdx];
          }
          rIdx++;
        }
      }
      finalAnswers = merged;
    }

    // Calculate score
    const totalQ = finalQuestions.length;
    const correctCount = finalAnswers.filter((a) => a && a.correct).length;
    const wrongCount = totalQ - correctCount;
    const score = calculateScore(correctCount, totalQ);
    const timeSpent = quizMode === 'tryout' ? TRYOUT_DURATION - timeRemaining : elapsedSeconds;

    // Per class stats
    const perClassStats: {
      4: { correct: number; total: number };
      5: { correct: number; total: number };
      6: { correct: number; total: number };
    } = {
      4: { correct: 0, total: 0 },
      5: { correct: 0, total: 0 },
      6: { correct: 0, total: 0 },
    };

    const weakCountMap: Record<string, number> = {};
    const wrongQuestionsPool: QuestionModel[] = [];

    const pembahasanList: ResultQuestionItem[] = finalQuestions.map((q, idx) => {
      const userAns = finalAnswers[idx];
      const isCorrect = !!(userAns && userAns.correct);

      if (q.kelas === 4 || q.kelas === 5 || q.kelas === 6) {
        perClassStats[q.kelas].total++;
        if (isCorrect) {
          perClassStats[q.kelas].correct++;
        }
      }

      if (!isCorrect) {
        weakCountMap[q.topik] = (weakCountMap[q.topik] || 0) + 1;
        wrongQuestionsPool.push(q);
      }

      let correctAnsText = '';
      if (q.type === 'pg') {
        const correctOpt = q.options?.find((o) => o.correct);
        correctAnsText = correctOpt ? correctOpt.text : 'Kunci A';
      } else if (q.type === 'isian') {
        correctAnsText = (q.answers || [])[0] || '';
      } else if (q.type === 'esai') {
        correctAnsText = q.sample || q.explanation || 'Uraian konsep lengkap';
      }

      return {
        q: q.q,
        correct: isCorrect,
        correctAnswer: correctAnsText,
        userAnswer: userAns?.text || 'Tidak dijawab',
        topik: q.topik,
        kelas: q.kelas,
        explanation: q.explanation,
      };
    });

    const weakMaterials = Object.entries(weakCountMap)
      .map(([topic, count]) => ({ topic, count }))
      .sort((a, b) => b.count - a.count);

    // Save history for Tryout
    if (quizMode === 'tryout') {
      const historyItem: TryoutHistoryItem = {
        id: 'tryout_' + Date.now(),
        date: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        score,
        correct: correctCount,
        wrong: wrongCount,
        totalQuestions: totalQ,
        timeSeconds: timeSpent,
        targetScore: targetScore || 80,
        perClass: {
          4: perClassStats[4].correct,
          5: perClassStats[5].correct,
          6: perClassStats[6].correct,
        },
        perClassTotal: {
          4: perClassStats[4].total,
          5: perClassStats[5].total,
          6: perClassStats[6].total,
        },
        weakMaterials: weakMaterials.map((w) => w.topic),
      };

      const updatedStats = saveTryoutRecord(historyItem);
      setStats(updatedStats);
    }

    setResultsData({
      mode: quizMode,
      score,
      correctCount,
      wrongCount,
      totalQuestions: totalQ,
      timeSpentSeconds: timeSpent,
      targetScore,
      perClassStats,
      weakMaterials,
      pembahasanList,
      isRedemption,
      wrongQuestionsPool,
    });

    setIsQuizActive(false);
    playSuccess();
  }, [
    isQuizActive,
    quizMode,
    isRedemption,
    answers,
    questions,
    originalBelajarQuestions,
    originalBelajarAnswers,
    timeRemaining,
    elapsedSeconds,
    targetScore,
  ]);

  // Timer Tick Hook
  useEffect(() => {
    if (!isQuizActive) return;

    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);

      if (quizMode === 'tryout') {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            submitQuiz();
            return 0;
          }

          // Audio warnings
          if (prev === 300 && !warned5MinRef.current) {
            warned5MinRef.current = true;
            playChime();
          }
          if (prev === 60 && !warned1MinRef.current) {
            warned1MinRef.current = true;
            playChime();
          }

          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isQuizActive, quizMode, submitQuiz]);

  // Keyboard Shortcuts (A/B/C/D, 1/2/3/4)
  useEffect(() => {
    if (!isQuizActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when user is typing in an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      const q = questions[currentIndex];
      if (!q || q.type !== 'pg' || !q.options) return;

      const key = e.key.toLowerCase();
      let optIndex = -1;

      if (key === 'a' || key === '1') optIndex = 0;
      else if (key === 'b' || key === '2') optIndex = 1;
      else if (key === 'c' || key === '3') optIndex = 2;
      else if (key === 'd' || key === '4') optIndex = 3;

      if (optIndex >= 0 && optIndex < q.options.length) {
        const opt = q.options[optIndex];
        const isCorrect = !!opt.correct;

        setAnswers((prev) => {
          const next = [...prev];
          next[currentIndex] = {
            answered: true,
            selected: optIndex,
            correct: isCorrect,
            correctIndex: q.correctIndex,
            text: opt.text,
            feedbackHtml: isCorrect
              ? q.explanation || 'Tepat sekali!'
              : `Kunci: ${['A', 'B', 'C', 'D'][q.correctIndex ?? 0]}. ${q.explanation || ''}`,
          };
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isQuizActive, questions, currentIndex]);

  // Handler: Start Standard Tryout (from Beranda or Header)
  const handleQuickStartTryout = () => {
    initAudio();
    const tryoutQuestions = buildTryoutSet({
      classes: [4, 5, 6],
      pgCount: 30,
      isianCount: 15,
      esaiCount: 5,
    });

    setQuizMode('tryout');
    setQuestions(tryoutQuestions);
    setAnswers(new Array(tryoutQuestions.length).fill(null));
    setCurrentIndex(0);
    setTimeRemaining(TRYOUT_DURATION);
    setElapsedSeconds(0);
    setTargetScore(80);
    setIsRedemption(false);
    setIsRetry(false);
    setResultsData(null);
    warned5MinRef.current = false;
    warned1MinRef.current = false;
    setIsQuizActive(true);
  };

  // Handler: Custom Tryout configuration
  const handleStartCustomTryout = (config: {
    classes: number[];
    pgCount: number;
    isianCount: number;
    esaiCount: number;
    targetScore: number;
  }) => {
    initAudio();
    const tryoutQuestions = buildTryoutSet({
      classes: config.classes,
      pgCount: config.pgCount,
      isianCount: config.isianCount,
      esaiCount: config.esaiCount,
    });

    setQuizMode('tryout');
    setQuestions(tryoutQuestions);
    setAnswers(new Array(tryoutQuestions.length).fill(null));
    setCurrentIndex(0);
    setTimeRemaining(TRYOUT_DURATION);
    setElapsedSeconds(0);
    setTargetScore(config.targetScore);
    setIsRedemption(false);
    setIsRetry(false);
    setResultsData(null);
    warned5MinRef.current = false;
    warned1MinRef.current = false;
    setIsQuizActive(true);
  };

  // Handler: Start Latihan / Belajar
  const handleStartLatihan = (mode: LatihanMode, kelas: string, topic: string) => {
    initAudio();
    let qSet: QuestionModel[] = [];

    if (mode === 'belajar') {
      qSet = buildBelajarSet(kelas, 50);
      setQuizMode('belajar');
    } else if (mode === 'latihan') {
      qSet = buildLatihanSet(kelas, topic, 20);
      setQuizMode('latihan');
    } else {
      qSet = buildIsianSet(kelas, 15);
      setQuizMode('isian');
    }

    setQuestions(qSet);
    setAnswers(new Array(qSet.length).fill(null));
    setCurrentIndex(0);
    setElapsedSeconds(0);
    setIsRedemption(false);
    setIsRetry(false);
    setResultsData(null);
    setIsQuizActive(true);
  };

  // Handler: Start Flashcard Quiz
  const handleStartFlashcardQuiz = (kelasFilter: string) => {
    initAudio();
    const qSet = buildFlashcardQuizSet(kelasFilter, 15);
    setQuizMode('latihan');
    setQuestions(qSet);
    setAnswers(new Array(qSet.length).fill(null));
    setCurrentIndex(0);
    setElapsedSeconds(0);
    setIsRedemption(false);
    setIsRetry(false);
    setResultsData(null);
    setIsQuizActive(true);
  };

  // Handler: Retry only incorrectly answered questions from results
  const handleRetryWrongQuestions = () => {
    if (!resultsData || resultsData.wrongQuestionsPool.length === 0) return;
    initAudio();
    const wrongQs = [...resultsData.wrongQuestionsPool];
    setQuizMode('retry');
    setQuestions(wrongQs);
    setAnswers(new Array(wrongQs.length).fill(null));
    setCurrentIndex(0);
    setElapsedSeconds(0);
    setIsRedemption(false);
    setIsRetry(true);
    setRetryTotal(wrongQs.length);
    setResultsData(null);
    setIsQuizActive(true);
  };

  // Handler: Answer recorded for a question
  const handleAnswerSelected = (index: number, record: AnswerRecord) => {
    initAudio();
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = record;
      return next;
    });
  };

  // Exit Quiz with confirmation
  const handleExitQuiz = () => {
    if (confirm('Apakah kamu yakin ingin keluar dari sesi latihan/tryout ini? Progres tidak akan tersimpan.')) {
      setIsQuizActive(false);
      setResultsData(null);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      submitQuiz();
    }
  };

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNavigationChange = (tab: AppTab) => {
    if (isQuizActive) {
      if (!confirm('Sesi soal sedang berlangsung. Yakin ingin berpindah tab?')) {
        return;
      }
      setIsQuizActive(false);
      setResultsData(null);
    }
    setActiveTab(tab);
    setResultsData(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Universal Header */}
      <Header
        activeTab={activeTab}
        isDarkMode={isDarkMode}
        soundMuted={soundMuted}
        isQuizActive={isQuizActive}
        quizMode={quizMode}
        timeRemaining={timeRemaining}
        onNavigate={handleNavigationChange}
        onToggleDarkMode={toggleDarkMode}
        onToggleSound={toggleSound}
        onQuickStartTryout={handleQuickStartTryout}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-3 sm:px-6 py-6">
        {/* If Active Quiz is ongoing */}
        {isQuizActive ? (
          <QuizActiveView
            mode={quizMode}
            questions={questions}
            currentIndex={currentIndex}
            answers={answers}
            isRedemption={isRedemption}
            isRetry={isRetry}
            retryTotal={retryTotal}
            onAnswerSelected={handleAnswerSelected}
            onNavigateIndex={setCurrentIndex}
            onNextQuestion={handleNextQuestion}
            onPrevQuestion={handlePrevQuestion}
            onSubmitTryout={submitQuiz}
            onExitQuiz={handleExitQuiz}
          />
        ) : resultsData ? (
          /* If Quiz Results are ready */
          <ResultsView
            mode={resultsData.mode}
            score={resultsData.score}
            correctCount={resultsData.correctCount}
            wrongCount={resultsData.wrongCount}
            totalQuestions={resultsData.totalQuestions}
            timeSpentSeconds={resultsData.timeSpentSeconds}
            targetScore={resultsData.targetScore}
            perClassStats={resultsData.perClassStats}
            weakMaterials={resultsData.weakMaterials}
            pembahasanList={resultsData.pembahasanList}
            isRedemption={resultsData.isRedemption}
            onRetryWrongQuestions={
              resultsData.wrongQuestionsPool.length > 0 ? handleRetryWrongQuestions : undefined
            }
            onTryAgain={handleQuickStartTryout}
            onGoHome={() => {
              setResultsData(null);
              setActiveTab('beranda');
            }}
          />
        ) : (
          /* Normal Tab Content */
          <>
            {activeTab === 'beranda' && (
              <BerandaView
                onNavigate={handleNavigationChange}
                onQuickStartTryout={handleQuickStartTryout}
              />
            )}

            {activeTab === 'materi' && <MateriView />}

            {activeTab === 'ringkasan' && <RingkasanView />}

            {activeTab === 'flashcard' && (
              <FlashcardView onStartFlashcardQuiz={handleStartFlashcardQuiz} />
            )}

            {activeTab === 'latihan' && (
              <LatihanView onStartLatihan={handleStartLatihan} />
            )}

            {activeTab === 'tryout' && (
              <TryoutConfigView onStartTryout={handleStartCustomTryout} />
            )}

            {activeTab === 'ai' && <MiniAIView />}

            {activeTab === 'statistik' && (
              <StatistikView
                stats={stats}
                onRefreshStats={() => setStats(loadUserStats())}
                onStartTryoutClick={handleQuickStartTryout}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            tryout1-bindo — Platform Tryout & Belajar Bahasa Indonesia SD (Kelas 4, 5, 6)
          </span>
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            50 Soal Proporsional • Mini AI Tutor • Audio Feedback
          </span>
        </div>
      </footer>
    </div>
  );
}

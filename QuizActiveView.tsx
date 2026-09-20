import React, { useState, useEffect } from 'react';
import {
  QuestionModel,
  AnswerRecord,
  GradeLevel,
} from '../types';
import {
  evaluateIsianAnswer,
  evaluateEssayAnswer,
} from '../utils/quizHelper';
import { playCorrect, playWrong } from '../utils/audio';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Send,
  AlertCircle,
  LogOut,
  Sparkles,
} from 'lucide-react';

interface QuizActiveViewProps {
  mode: 'tryout' | 'belajar' | 'latihan' | 'isian' | 'retry';
  questions: QuestionModel[];
  currentIndex: number;
  answers: (AnswerRecord | null)[];
  isRedemption: boolean;
  isRetry: boolean;
  retryTotal?: number;
  onAnswerSelected: (index: number, record: AnswerRecord) => void;
  onNavigateIndex: (index: number) => void;
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
  onSubmitTryout: () => void;
  onExitQuiz: () => void;
}

export const QuizActiveView: React.FC<QuizActiveViewProps> = ({
  mode,
  questions,
  currentIndex,
  answers,
  isRedemption,
  isRetry,
  retryTotal,
  onAnswerSelected,
  onNavigateIndex,
  onNextQuestion,
  onPrevQuestion,
  onSubmitTryout,
  onExitQuiz,
}) => {
  const currentQ = questions[currentIndex];
  const currentA = answers[currentIndex];
  const isAnswered = !!(currentA && currentA.answered);

  const [textInput, setTextInput] = useState<string>('');
  const [essayInput, setEssayInput] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Sync inputs when navigating to another question
  useEffect(() => {
    setErrorMessage('');
    if (currentA && currentA.text) {
      if (currentQ?.type === 'isian') setTextInput(currentA.text);
      if (currentQ?.type === 'esai') setEssayInput(currentA.text);
    } else {
      setTextInput('');
      setEssayInput('');
    }
  }, [currentIndex, currentQ, currentA]);

  if (!currentQ) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700">
        <p className="text-slate-500">Tidak ada soal yang sedang aktif.</p>
      </div>
    );
  }

  const letters = ['A', 'B', 'C', 'D'];

  // Handle PG selection
  const handleOptionClick = (optIdx: number) => {
    if (mode === 'tryout') {
      // In tryout, user can change answer any time
      const opt = currentQ.options?.[optIdx];
      const isCorrect = !!opt?.correct;
      onAnswerSelected(currentIndex, {
        answered: true,
        selected: optIdx,
        correct: isCorrect,
        correctIndex: currentQ.correctIndex,
        text: opt?.text,
      });
      return;
    }

    // Practice / Belajar mode: locked after answering once
    if (isAnswered) return;

    const opt = currentQ.options?.[optIdx];
    const isCorrect = !!opt?.correct;

    let feedback = '';
    if (isCorrect) {
      feedback = currentQ.explanation || 'Jawaban tepat sekali!';
      playCorrect();
    } else {
      const correctLetter = letters[currentQ.correctIndex ?? 0];
      feedback = `Jawaban yang benar adalah ${correctLetter}. ${currentQ.explanation || ''}`;
      playWrong();
    }

    onAnswerSelected(currentIndex, {
      answered: true,
      selected: optIdx,
      correct: isCorrect,
      correctIndex: currentQ.correctIndex,
      text: opt?.text,
      feedbackHtml: feedback,
    });
  };

  // Handle text input submission for Isian & Esai
  const handleTextSubmit = () => {
    if (currentQ.type === 'isian') {
      const val = textInput.trim();
      if (!val) {
        setErrorMessage('Silakan ketik jawaban terlebih dahulu.');
        return;
      }
      setErrorMessage('');

      const isCorrect = evaluateIsianAnswer(val, currentQ.answers || []);

      if (mode === 'tryout') {
        onAnswerSelected(currentIndex, {
          answered: true,
          correct: isCorrect,
          text: val,
        });
        return;
      }

      if (isCorrect) {
        playCorrect();
      } else {
        playWrong();
      }

      onAnswerSelected(currentIndex, {
        answered: true,
        correct: isCorrect,
        text: val,
        feedbackHtml: isCorrect
          ? `Benar! ${currentQ.explanation || ''}`
          : `Kurang tepat. Jawaban yang diharapkan: "${(currentQ.answers || [])[0]}". ${currentQ.explanation || ''}`,
      });
    } else if (currentQ.type === 'esai') {
      const val = essayInput.trim();
      if (val.length < 10) {
        setErrorMessage('Jawaban terlalu singkat! Tuliskan penjelasan minimal satu kalimat lengkap.');
        return;
      }
      setErrorMessage('');

      const evalResult = evaluateEssayAnswer(val, currentQ.keywords || []);

      if (mode === 'tryout') {
        onAnswerSelected(currentIndex, {
          answered: true,
          correct: evalResult.isCorrect,
          text: val,
          matchedKeywords: evalResult.matchedKeywords,
        });
        return;
      }

      if (evalResult.isCorrect) {
        playCorrect();
      } else {
        playWrong();
      }

      onAnswerSelected(currentIndex, {
        answered: true,
        correct: evalResult.isCorrect,
        text: val,
        matchedKeywords: evalResult.matchedKeywords,
        feedbackHtml: evalResult.isCorrect
          ? `Penjelasan bagus! Kata kunci terdeteksi: [${evalResult.matchedKeywords.join(', ')}]. ${currentQ.explanation || ''}`
          : `Penjelasan belum lengkap memuat kata kunci konsep penting. Contoh uraian yang baik: "${currentQ.sample || currentQ.explanation || ''}"`,
      });
    }
  };

  const answeredCount = answers.filter((a) => a && a.answered).length;
  const correctCount = answers.filter((a) => a && a.correct).length;
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  const getClassTheme = (kelas: GradeLevel) => {
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
    <div className="max-w-3xl mx-auto space-y-5 animate-fade-in">
      {/* Top Progress & Stats Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
          <span className="flex items-center gap-1.5">
            <span className="text-indigo-600 dark:text-indigo-400">Soal {currentIndex + 1}</span>
            <span>dari {questions.length}</span>
            {isRedemption && (
              <span className="ml-2 px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-extrabold dark:bg-indigo-900 dark:text-indigo-200">
                Ronde Redemption 🏆
              </span>
            )}
          </span>

          <span>
            {mode === 'tryout'
              ? `Terjawab: ${answeredCount}/${questions.length}`
              : isRetry
              ? `Benar: ${correctCount}/${retryTotal || questions.length}`
              : `Benar: ${correctCount}/${questions.length}`}
          </span>
        </div>

        {/* Progress Fill Bar */}
        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
        {/* Badges: Class & Type */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getClassTheme(currentQ.kelas)}`}>
              Kelas {currentQ.kelas} • {currentQ.topik}
            </span>

            {currentQ.type === 'pg' && (
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 uppercase">
                Pilihan Ganda
              </span>
            )}
            {currentQ.type === 'isian' && (
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-800 uppercase">
                Isian Singkat
              </span>
            )}
            {currentQ.type === 'esai' && (
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 uppercase">
                Soal Esai
              </span>
            )}
          </div>

          <span className="text-xs font-semibold text-slate-400">
            Nomor #{currentIndex + 1}
          </span>
        </div>

        {/* Question Text */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
          {currentQ.q}
        </h3>

        {/* PG Options */}
        {currentQ.type === 'pg' && currentQ.options && (
          <div className="space-y-2.5 pt-1">
            {currentQ.options.map((opt, optIdx) => {
              const letter = letters[optIdx];
              const isSelected = currentA?.selected === optIdx;
              const isCorrectOpt = opt.correct;

              let btnStyle =
                'border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-750/70 text-slate-800 dark:text-slate-200 hover:border-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-700';

              if (mode === 'tryout') {
                if (isSelected) {
                  btnStyle =
                    'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-900 dark:text-indigo-200 ring-2 ring-indigo-500/20';
                }
              } else if (isAnswered) {
                if (isCorrectOpt) {
                  btnStyle =
                    'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-bold';
                } else if (isSelected && !currentA?.correct) {
                  btnStyle =
                    'border-red-500 bg-red-50 dark:bg-red-950/50 text-red-900 dark:text-red-200';
                } else {
                  btnStyle =
                    'opacity-60 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-400';
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleOptionClick(optIdx)}
                  disabled={mode !== 'tryout' && isAnswered}
                  className={`w-full p-3.5 rounded-2xl border-2 text-left flex items-start gap-3 transition-all ${btnStyle}`}
                >
                  <span
                    className={`w-7 h-7 rounded-xl font-black text-xs flex items-center justify-center flex-shrink-0 transition-colors ${
                      mode === 'tryout' && isSelected
                        ? 'bg-indigo-600 text-white'
                        : isAnswered && isCorrectOpt
                        ? 'bg-emerald-600 text-white'
                        : isAnswered && isSelected && !currentA?.correct
                        ? 'bg-red-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="text-xs sm:text-sm font-medium leading-normal pt-0.5">
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Isian Input */}
        {currentQ.type === 'isian' && (
          <div className="space-y-3 pt-2">
            <div className="relative">
              <input
                type="text"
                value={textInput}
                disabled={mode !== 'tryout' && isAnswered}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleTextSubmit();
                }}
                placeholder="Ketik kata/istilah jawabanmu di sini..."
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-750 text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {(!isAnswered || mode === 'tryout') && (
              <button
                onClick={handleTextSubmit}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{mode === 'tryout' ? 'Simpan Jawaban Isian' : 'Cek Jawaban'}</span>
              </button>
            )}
          </div>
        )}

        {/* Esai Input */}
        {currentQ.type === 'esai' && (
          <div className="space-y-3 pt-2">
            <textarea
              rows={4}
              value={essayInput}
              disabled={mode !== 'tryout' && isAnswered}
              onChange={(e) => setEssayInput(e.target.value)}
              placeholder="Tuliskan uraian penjelasanmu secara lengkap dan runtut..."
              className="w-full p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-750 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 leading-relaxed resize-y"
            />

            {(!isAnswered || mode === 'tryout') && (
              <button
                onClick={handleTextSubmit}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{mode === 'tryout' ? 'Simpan Uraian Esai' : 'Cek & Analisis Esai'}</span>
              </button>
            )}
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs flex items-center gap-2 border border-red-200 dark:border-red-800">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Immediate Feedback in Practice/Belajar Mode */}
        {mode !== 'tryout' && isAnswered && currentA && (
          <div
            className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed space-y-1.5 animate-fade-in ${
              currentA.correct
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                : 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-900 dark:text-red-200'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm">
              {currentA.correct ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Jawaban Benar!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                  <span>Jawaban Salah / Kurang Tepat</span>
                </>
              )}
            </div>

            <p>{currentA.feedbackHtml}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-750 flex items-center justify-between gap-3 flex-wrap">
          {mode === 'tryout' ? (
            <>
              <button
                onClick={onPrevQuestion}
                disabled={currentIndex === 0}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Sebelumnya</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={onSubmitTryout}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-colors"
                >
                  Selesai & Kumpulkan
                </button>

                {currentIndex < questions.length - 1 && (
                  <button
                    onClick={onNextQuestion}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <span>Soal Berikutnya</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <div />
              {isAnswered && (
                <button
                  onClick={onNextQuestion}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all ml-auto"
                >
                  <span>
                    {currentIndex < questions.length - 1
                      ? 'Soal Berikutnya'
                      : !isRedemption && answers.some((a) => a && !a.correct)
                      ? 'Lanjut ke Ronde Redemption 🏆'
                      : 'Lihat Hasil Akhir'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Navigation Grid for Tryout */}
      {mode === 'tryout' && (
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
            <span>Navigasi Butir Soal:</span>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                Terjawab ({answeredCount})
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600 inline-block" />
                Kosong ({questions.length - answeredCount})
              </span>
            </div>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 max-h-48 overflow-y-auto pr-1">
            {questions.map((_, qIdx) => {
              const isCurrent = qIdx === currentIndex;
              const hasAns = answers[qIdx] && answers[qIdx]?.answered;

              return (
                <button
                  key={qIdx}
                  onClick={() => onNavigateIndex(qIdx)}
                  className={`h-9 rounded-xl text-xs font-bold transition-all flex items-center justify-center border ${
                    isCurrent
                      ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-400/30'
                      : hasAns
                      ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 text-slate-600 dark:text-slate-400 hover:border-indigo-300'
                  }`}
                >
                  {qIdx + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Exit Button */}
      <div className="text-center pt-2">
        <button
          onClick={onExitQuiz}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-red-500 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Keluar dari Sesi Soal</span>
        </button>
      </div>
    </div>
  );
};

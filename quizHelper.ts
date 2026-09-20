import {
  QuestionModel,
  FlashcardItem,
  SoalIsianItem,
  EssayItem,
  PGOption,
  GradeLevel,
} from '../types';
import { flashcards } from '../data/flashcardsData';
import { soalIsian, essayBank } from '../data/soalData';

export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function cleanOptionText(text: string): string {
  // Strip any trailing parenthetical concept labels like (Personifikasi), (Alur/Plot), (Tema) etc.
  return text.replace(/\s*\([A-Z][a-zA-Z0-9\s/,-]*\)\s*(\.?)$/, '$1').trim();
}

export function generateOptionsForPG(
  correctAnswer: string,
  currentQuestionText: string,
  allCards: FlashcardItem[],
  customDistractors?: string[],
  topik?: string,
  kelas?: GradeLevel
): { options: PGOption[]; correctIndex: number } {
  let distractors: string[] = [];

  // 1. If tailored, tricky, topic-specific distractors are provided, use them!
  if (customDistractors && customDistractors.length >= 3) {
    distractors = shuffleArray(customDistractors).slice(0, 3);
  } else {
    // 2. Otherwise, look for cards with the EXACT SAME topic first
    const used = new Set<string>([correctAnswer]);
    const sameTopicCards = allCards.filter(
      (c) => c.topik === topik && c.a !== correctAnswer && c.q !== currentQuestionText
    );

    for (const item of shuffleArray(sameTopicCards)) {
      if (!used.has(item.a)) {
        distractors.push(item.a);
        used.add(item.a);
        if (distractors.length >= 3) break;
      }
    }

    // 3. If still needed, look within same kelas and similar semantic context, NEVER from random topics
    if (distractors.length < 3) {
      const sameClassCards = allCards.filter(
        (c) => c.kelas === kelas && c.a !== correctAnswer && c.q !== currentQuestionText && !used.has(c.a)
      );
      for (const item of shuffleArray(sameClassCards)) {
        distractors.push(item.a);
        used.add(item.a);
        if (distractors.length >= 3) break;
      }
    }
  }

  // Last resort: use unused answers from the complete bank. This is preferable to
  // synthetic filler because the options remain real concepts/answers from the app.
  if (distractors.length < 3) {
    const globalCandidates = shuffleArray(allCards)
      .map(c => c.a)
      .filter(a => a && a !== correctAnswer && !used.has(a) && a.trim().length > 2);
    for (const candidate of globalCandidates) {
      if (!distractors.some(d => d.toLowerCase() === candidate.toLowerCase())) {
        distractors.push(candidate);
        used.add(candidate);
      }
      if (distractors.length >= 3) break;
    }
  }

  // Keep the UI stable even when a very small custom bank is supplied.
  while (distractors.length < 3) {
    distractors.push(`Bukan jawaban yang tepat untuk topik ${topik || 'ini'}.`);
  }

  const rawOptions: PGOption[] = [
    { text: cleanOptionText(correctAnswer), correct: true },
    { text: cleanOptionText(distractors[0]), correct: false },
    { text: cleanOptionText(distractors[1]), correct: false },
    { text: cleanOptionText(distractors[2]), correct: false },
  ];

  const options = shuffleArray(rawOptions);
  const correctIndex = options.findIndex((opt) => opt.correct);

  return { options, correctIndex };
}

export function normalizeFlashcardToPG(card: FlashcardItem): QuestionModel {
  const { options, correctIndex } = generateOptionsForPG(
    card.a,
    card.q,
    flashcards,
    card.distractors,
    card.topik,
    card.kelas
  );
  return {
    type: 'pg',
    kelas: card.kelas,
    topik: card.topik,
    q: card.q,
    answer: card.a,
    explanation: card.ex,
    options,
    correctIndex,
  };
}

export function normalizeIsian(item: SoalIsianItem): QuestionModel {
  return {
    type: 'isian',
    kelas: item.kelas,
    topik: item.topik,
    q: item.q,
    answers: item.answers,
    explanation: item.ex,
  };
}

export function normalizeEssay(item: EssayItem): QuestionModel {
  return {
    type: 'esai',
    kelas: item.kelas,
    topik: item.topik,
    q: item.q,
    keywords: item.keywords,
    sample: item.sample,
    explanation: item.sample,
  };
}

export function buildBelajarQuiz(kelasFilter: string): QuestionModel[] {
  const filtered = flashcards.filter(
    (c) => kelasFilter === 'all' || c.kelas === parseInt(kelasFilter)
  );
  return shuffleArray(filtered).map((c) => normalizeFlashcardToPG(c));
}

export function buildLatihanQuiz(kelasFilter: string, topicFilter: string): QuestionModel[] {
  const isMatch = (c: { kelas: GradeLevel; topik: string }) => {
    const classOk = kelasFilter === 'all' || c.kelas === parseInt(kelasFilter);
    const topicOk = topicFilter === 'all' || c.topik === topicFilter;
    return classOk && topicOk;
  };

  const pgItems = flashcards.filter(isMatch).map((c) => normalizeFlashcardToPG(c));
  const isianItems = soalIsian.filter(isMatch).map((c) => normalizeIsian(c));
  const essayItems = essayBank.filter(isMatch).map((c) => normalizeEssay(c));

  return shuffleArray([...pgItems, ...isianItems, ...essayItems]);
}

export function buildIsianQuiz(kelasFilter: string): QuestionModel[] {
  const filtered = soalIsian.filter(
    (c) => kelasFilter === 'all' || c.kelas === parseInt(kelasFilter)
  );
  return shuffleArray(filtered).map((c) => normalizeIsian(c));
}

export function buildTryoutQuiz(config: {
  classes: number[];
  pgCount: number;
  isianCount: number;
  esaiCount: number;
}): QuestionModel[] {
  const classSet = new Set(config.classes);
  const inSelectedClasses = (item: { kelas: GradeLevel }) => classSet.has(item.kelas);

  const pgPool = flashcards.filter(inSelectedClasses);
  const isianPool = soalIsian.filter(inSelectedClasses);
  const esaiPool = essayBank.filter(inSelectedClasses);

  const selectedPG = shuffleArray(pgPool)
    .slice(0, config.pgCount)
    .map((c) => normalizeFlashcardToPG(c));

  const selectedIsian = shuffleArray(isianPool)
    .slice(0, config.isianCount)
    .map((c) => normalizeIsian(c));

  const selectedEsai = shuffleArray(esaiPool)
    .slice(0, config.esaiCount)
    .map((c) => normalizeEssay(c));

  // Section order: PG -> Isian -> Esai (unshuffled between sections)
  return [...selectedPG, ...selectedIsian, ...selectedEsai];
}

export function evaluateIsianAnswer(
  userInput: string,
  acceptableAnswers: string[]
): boolean {
  const cleanInput = userInput.trim().toLowerCase();
  if (!cleanInput) return false;

  for (const ans of acceptableAnswers) {
    const cleanAns = ans.trim().toLowerCase();
    if (cleanInput === cleanAns) return true;
    if (cleanInput.includes(cleanAns) || cleanAns.includes(cleanInput)) return true;
  }
  return false;
}

export function evaluateEssayAnswer(
  userInput: string,
  keywords: string[]
): { isCorrect: boolean; matchedKeywords: string[]; message?: string } {
  const cleanInput = userInput.trim().toLowerCase();
  if (cleanInput.length < 10) {
    return {
      isCorrect: false,
      matchedKeywords: [],
      message: 'Jawaban terlalu pendek! Mohon tuliskan penjelasan yang lebih lengkap.',
    };
  }

  const matched: string[] = [];
  for (const kw of keywords) {
    if (cleanInput.includes(kw.toLowerCase())) {
      matched.push(kw);
    }
  }

  // Considered correct if at least 2 keywords are matched
  const isCorrect = matched.length >= 2;
  return { isCorrect, matchedKeywords: matched };
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function calculateScore(correctCount: number, totalQuestions: number): number {
  if (totalQuestions <= 0) return 0;
  return Math.round((correctCount / totalQuestions) * 100);
}

export function buildFlashcardQuizSet(kelasFilter: string, count: number = 15): QuestionModel[] {
  const filtered = flashcards.filter(
    (c) => kelasFilter === 'all' || c.kelas === parseInt(kelasFilter)
  );
  return shuffleArray(filtered).slice(0, count).map((c) => normalizeFlashcardToPG(c));
}

// Aliases for flexible imports
export const buildTryoutSet = buildTryoutQuiz;
export const buildBelajarSet = (kelasFilter: string, _count?: number) => buildBelajarQuiz(kelasFilter);
export const buildLatihanSet = (kelasFilter: string, topicFilter: string, _count?: number) => buildLatihanQuiz(kelasFilter, topicFilter);
export const buildIsianSet = (kelasFilter: string, _count?: number) => buildIsianQuiz(kelasFilter);

export type GradeLevel = 4 | 5 | 6;

export interface TopicMateri {
  title: string;
  desc: string;
  points: string[];
  contoh?: string;
}

export interface ClassMateriGroup {
  kelas: GradeLevel;
  dot: 'kelas4' | 'kelas5' | 'kelas6';
  title: string;
  percentageText: string;
  topics: TopicMateri[];
}

export interface FlashcardItem {
  kelas: GradeLevel;
  topik: string;
  q: string;
  a: string;
  ex?: string;
  distractors?: string[];
}

export interface SoalIsianItem {
  kelas: GradeLevel;
  topik: string;
  q: string;
  answers: string[];
  ex?: string;
}

export interface EssayItem {
  kelas: GradeLevel;
  topik: string;
  q: string;
  keywords: string[];
  sample: string;
}

export type QuestionType = 'pg' | 'isian' | 'esai';

export interface PGOption {
  text: string;
  correct: boolean;
}

export interface QuestionModel {
  id?: string;
  type: QuestionType;
  kelas: GradeLevel;
  topik: string;
  q: string;
  explanation?: string;
  // PG specific
  answer?: string;
  options?: PGOption[];
  correctIndex?: number;
  // Isian specific
  answers?: string[];
  // Esai specific
  keywords?: string[];
  sample?: string;
}

export interface AnswerRecord {
  answered: boolean;
  selected?: number; // for PG
  correct: boolean;
  correctIndex?: number;
  text?: string;
  matchedKeywords?: string[];
  feedbackHtml?: string;
}

export type AppTab = 'beranda' | 'materi' | 'ringkasan' | 'flashcard' | 'latihan' | 'tryout' | 'quiz' | 'results' | 'ai' | 'statistik';

export type LatihanMode = 'belajar' | 'latihan' | 'isian';

export interface TryoutHistoryItem {
  id: string;
  date: string;
  score: number;
  correct: number;
  wrong: number;
  totalQuestions?: number;
  timeSeconds: number;
  perClass: { 4: number; 5: number; 6: number };
  perClassTotal: { 4: number; 5: number; 6: number };
  weakMaterials: string[];
  targetScore?: number | null;
  target?: number | null;
}

export interface UserStats {
  tryouts: TryoutHistoryItem[];
  targetScore: number;
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  timestamp: number;
}

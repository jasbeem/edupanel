
export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface MemoryPair {
  term: string;
  definition: string;
}

export interface TrueFalseItem {
  statement: string;
  isTrue: boolean;
  // Added optional explanation property to resolve type errors in TrueFalseGame.tsx
  explanation?: string;
}

export interface RoscoItem {
  letter: string;
  definition: string;
  word: string;
}

export interface HangmanItem {
  word: string;
  hint: string;
}

export interface SopaItem {
  words: string[];
  title: string;
}

export interface GameData {
  subject: string;
  topic: string;
  quiz: QuizQuestion[];
  memory: MemoryPair[];
  trueFalse: TrueFalseItem[];
  rosco: RoscoItem[];
  hangman: HangmanItem[];
  sopa: SopaItem[];
}

export type ViewState = 'HOME' | 'QUIZ' | 'MEMORY' | 'TRUE_FALSE' | 'ROSCO' | 'SOPA' | 'HANGMAN';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}
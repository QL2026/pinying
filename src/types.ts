export interface PinyinExample {
  word: string;
  pinyin: string;
  emoji: string;
}

export interface PinyinItem {
  pinyin: string;
  speechKey: string; // The Chinese character we speak to approximate the spelling phonetically
  examples: PinyinExample[];
}

export interface PinyinGroup {
  id: string;
  name: string;
  items: PinyinItem[];
}

export interface ChallengeItem {
  id: string;
  pair: string; // e.g. "b / p"
  word: string;  // e.g. "爸爸"
  pinyin: string; // e.g. "bàba"
  emoji: string;  // e.g. "👨"
  audioText: string; // text read for pronunciation
  options: string[]; // e.g. ["b", "p"]
  answer: string;    // e.g. "b"
}

export interface PracticeHistory {
  date: string;
  type: 'initial' | 'final' | 'challenge';
  target: string; // e.g. "b" or "b / p"
  status: 'completed' | 'correct' | 'incorrect';
}

export interface ParentReport {
  totalStars: number;
  totalPractices: number;
  recentTargets: string[];
  frequentErrors: { target: string; count: number }[];
}

import { PracticeHistory } from '../types';

const STARS_KEY = 'pinyin_stars';
const HISTORY_KEY = 'pinyin_history';
const ERRORS_KEY = 'pinyin_errors';

export function getStars(): number {
  if (typeof window === 'undefined') return 0;
  const val = localStorage.getItem(STARS_KEY);
  return val ? parseInt(val, 10) : 0;
}

export function saveStars(count: number) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STARS_KEY, count.toString());
}

export function addStar(): number {
  const current = getStars();
  const next = current + 1;
  saveStars(next);
  return next;
}

export function getHistory(): PracticeHistory[] {
  if (typeof window === 'undefined') return [];
  const val = localStorage.getItem(HISTORY_KEY);
  return val ? JSON.parse(val) : [];
}

export function addHistory(item: Omit<PracticeHistory, 'date'>) {
  if (typeof window === 'undefined') return;
  const history = getHistory();
  const newItem: PracticeHistory = {
    ...item,
    date: new Date().toISOString(),
  };
  localStorage.setItem(HISTORY_KEY, JSON.stringify([newItem, ...history]));
}

export function recordError(target: string) {
  if (typeof window === 'undefined') return;
  const errors = getErrors();
  errors[target] = (errors[target] || 0) + 1;
  localStorage.setItem(ERRORS_KEY, JSON.stringify(errors));
}

export function getErrors(): Record<string, number> {
  if (typeof window === 'undefined') return {};
  const val = localStorage.getItem(ERRORS_KEY);
  return val ? JSON.parse(val) : {};
}

export function clearAllProgress() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STARS_KEY);
  localStorage.removeItem(HISTORY_KEY);
  localStorage.removeItem(ERRORS_KEY);
}

import { UserStats, TryoutHistoryItem } from '../types';

const STORAGE_KEY = 'tryoutBindoStats_v1';

export function loadUserStats(): UserStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { tryouts: [], targetScore: 80 };
    }
    const parsed = JSON.parse(raw);
    return {
      tryouts: Array.isArray(parsed.tryouts) ? parsed.tryouts : [],
      targetScore: typeof parsed.targetScore === 'number' ? parsed.targetScore : 80,
    };
  } catch (e) {
    console.error('Failed to load stats:', e);
    return { tryouts: [], targetScore: 80 };
  }
}

export function saveTryoutResult(item: Omit<TryoutHistoryItem, 'id'>): void {
  try {
    const stats = loadUserStats();
    const newItem: TryoutHistoryItem = {
      ...item,
      id: 'tryout_' + Date.now(),
    };
    stats.tryouts.unshift(newItem);
    // Keep last 30 tryouts
    if (stats.tryouts.length > 30) {
      stats.tryouts = stats.tryouts.slice(0, 30);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save tryout result:', e);
  }
}

export function saveTargetScore(score: number): void {
  try {
    const stats = loadUserStats();
    stats.targetScore = score;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save target score:', e);
  }
}

export function saveTryoutRecord(item: TryoutHistoryItem): UserStats {
  try {
    const stats = loadUserStats();
    stats.tryouts.unshift(item);
    if (stats.tryouts.length > 30) {
      stats.tryouts = stats.tryouts.slice(0, 30);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    return stats;
  } catch (e) {
    console.error('Failed to save tryout record:', e);
    return loadUserStats();
  }
}

export function loadThemePreference(): boolean {
  try {
    const pref = localStorage.getItem('bindo_theme_dark');
    if (pref !== null) return pref === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    return false;
  }
}

export function saveThemePreference(isDark: boolean): void {
  try {
    localStorage.setItem('bindo_theme_dark', isDark ? 'true' : 'false');
  } catch {
    // ignore
  }
}

export function clearUserStats(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear stats:', e);
  }
}

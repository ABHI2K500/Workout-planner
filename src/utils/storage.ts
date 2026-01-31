import { UserProgress, DailyProgress } from '../types';

const STORAGE_KEY = 'toji_fitness_progress';
const SETTINGS_KEY = 'toji_fitness_settings';

export const getProgress = (): UserProgress => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }

  const newProgress: UserProgress = {
    startDate: new Date().toISOString().split('T')[0],
    dailyProgress: {},
    currentStreak: 0,
  };

  saveProgress(newProgress);
  return newProgress;
};

export const saveProgress = (progress: UserProgress): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

export const getTodayProgress = (): DailyProgress => {
  const progress = getProgress();
  const today = new Date().toISOString().split('T')[0];

  if (!progress.dailyProgress[today]) {
    progress.dailyProgress[today] = {
      date: today,
      morningCompleted: false,
      eveningCompleted: false,
      exercises: {},
    };
    saveProgress(progress);
  }

  return progress.dailyProgress[today];
};

export const updateTodayProgress = (updates: Partial<DailyProgress>): void => {
  const progress = getProgress();
  const today = new Date().toISOString().split('T')[0];

  progress.dailyProgress[today] = {
    ...progress.dailyProgress[today],
    ...updates,
    date: today,
  };

  progress.currentStreak = calculateStreak(progress);
  saveProgress(progress);
};

export const calculateStreak = (progress: UserProgress): number => {
  const sortedDates = Object.keys(progress.dailyProgress).sort().reverse();
  let streak = 0;
  let currentDate = new Date();

  for (const dateStr of sortedDates) {
    const date = new Date(dateStr);
    const dayProgress = progress.dailyProgress[dateStr];

    const dayDiff = Math.floor((currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (dayDiff > streak) break;

    if (dayProgress.morningCompleted || dayProgress.eveningCompleted) {
      streak++;
      currentDate = date;
    } else {
      break;
    }
  }

  return streak;
};

export const resetProgress = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const getSettings = () => {
  const stored = localStorage.getItem(SETTINGS_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    morningReminder: false,
    eveningReminder: false,
    darkMode: true,
  };
};

export const saveSettings = (settings: any): void => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

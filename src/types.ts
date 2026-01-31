export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  completed?: boolean;
}

export interface WorkoutSession {
  type: 'morning' | 'evening';
  exercises: Exercise[];
}

export interface DayWorkout {
  day: string;
  morning: Exercise[];
  evening: Exercise[];
}

export interface DailyProgress {
  date: string;
  morningCompleted: boolean;
  eveningCompleted: boolean;
  exercises: {
    [key: string]: boolean;
  };
  notes?: string;
  weight?: number;
}

export interface UserProgress {
  startDate: string;
  dailyProgress: {
    [date: string]: DailyProgress;
  };
  currentStreak: number;
}

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

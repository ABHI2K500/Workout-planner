import { DayWorkout } from '../types';

export const weeklyWorkouts: DayWorkout[] = [
  {
    day: 'monday',
    morning: [
      { name: 'Bench Press', sets: 4, reps: '6-8' },
      { name: 'Overhead Press', sets: 3, reps: '6-8' },
      { name: 'Dips', sets: 3, reps: '8-12' },
      { name: 'Lateral Raises', sets: 3, reps: '12-15' },
    ],
    evening: [
      { name: 'Wall Handstand Holds', sets: 3, reps: '30-60s' },
      { name: 'Push-ups', sets: 3, reps: '15-20' },
      { name: 'Hollow Hold', sets: 3, reps: '30-45s' },
      { name: 'Shadowboxing', sets: 1, reps: '10 min' },
    ],
  },
  {
    day: 'tuesday',
    morning: [
      { name: 'Pull-ups / Lat Pulldown', sets: 4, reps: '6-10' },
      { name: 'Rows', sets: 3, reps: '8-10' },
      { name: 'Face Pulls', sets: 3, reps: '12-15' },
      { name: 'Light Curls', sets: 2, reps: '10-12' },
    ],
    evening: [
      { name: 'Pull-ups / Rows', sets: 3, reps: '8-12' },
      { name: 'Pike Push-ups', sets: 3, reps: '10-15' },
      { name: 'Dead Bugs', sets: 3, reps: '12-15' },
      { name: 'Skipping / Jog', sets: 1, reps: '10 min' },
    ],
  },
  {
    day: 'wednesday',
    morning: [
      { name: 'Squats', sets: 4, reps: '6-10' },
      { name: 'RDL', sets: 3, reps: '8' },
      { name: 'Calf Raises', sets: 3, reps: '12-15' },
      { name: 'Hanging Leg Raises / Planks', sets: 3, reps: '10-15' },
    ],
    evening: [
      { name: 'Wall Sit', sets: 3, reps: '45-60s' },
      { name: 'Squats', sets: 3, reps: '20-25' },
      { name: 'Plank', sets: 3, reps: '60s' },
      { name: 'Light Shadowboxing', sets: 1, reps: '10 min' },
    ],
  },
  {
    day: 'thursday',
    morning: [
      { name: 'Incline Bench', sets: 4, reps: '8' },
      { name: 'Shoulder Press', sets: 3, reps: '8' },
      { name: 'Dips / Flys', sets: 3, reps: '10-12' },
      { name: 'Triceps Pushdowns', sets: 2, reps: '12' },
    ],
    evening: [
      { name: 'Handstand Holds', sets: 3, reps: '30-60s' },
      { name: 'Diamond Push-ups', sets: 3, reps: '12-15' },
      { name: 'Hollow Hold', sets: 3, reps: '30-45s' },
      { name: 'Skipping', sets: 1, reps: '10 min' },
    ],
  },
  {
    day: 'friday',
    morning: [
      { name: 'Wide Pull-ups', sets: 4, reps: '6-8' },
      { name: 'Seated Rows', sets: 3, reps: '8-10' },
      { name: 'Shrugs', sets: 3, reps: '10-12' },
      { name: 'Hammer Curls', sets: 2, reps: '10' },
    ],
    evening: [
      { name: 'Towel Hangs', sets: 3, reps: '30-45s' },
      { name: 'Archer Push-ups', sets: 3, reps: '8-10' },
      { name: 'Hanging Knee Raises', sets: 3, reps: '12-15' },
      { name: 'Shadowboxing', sets: 1, reps: '10 min' },
    ],
  },
  {
    day: 'saturday',
    morning: [],
    evening: [
      { name: 'Light Jog / Walk', sets: 1, reps: '20-30 min' },
      { name: 'Stretching', sets: 1, reps: '10-15 min' },
    ],
  },
  {
    day: 'sunday',
    morning: [],
    evening: [],
  },
];

export const motivationalQuotes = [
  'Discipline is choosing between what you want now and what you want most.',
  'Every rep is a choice. Make it count.',
  'Silent progress speaks louder than empty words.',
  'The body achieves what the mind believes.',
  'Consistency is the ultimate form of strength.',
  'Train with purpose, rest with intention.',
  'Your only competition is who you were yesterday.',
  'Strength is built in moments of doubt.',
  'Calm mind, strong body, unbreakable will.',
  'Excellence is a habit, not an act.',
];

export const getDayWorkout = (day: string): DayWorkout | undefined => {
  return weeklyWorkouts.find(w => w.day === day.toLowerCase());
};

export const getRandomQuote = (): string => {
  return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
};

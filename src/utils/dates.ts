export const getDayOfWeek = (date: Date = new Date()): string => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[date.getDay()];
};

export const getDayNumber = (startDate: string): number => {
  const start = new Date(startDate);
  const today = new Date();
  const diff = today.getTime() - start.getTime();
  const daysDiff = Math.floor(diff / (1000 * 60 * 60 * 24));
  return daysDiff + 1;
};

export const formatDate = (date: Date = new Date()): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });
};

export const getCalendarMonth = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }

  return days;
};

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

export const formatDateKey = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

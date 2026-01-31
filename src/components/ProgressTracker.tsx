import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { getProgress, updateTodayProgress, getTodayProgress } from '../utils/storage';
import { getCalendarMonth, formatDateKey, isToday } from '../utils/dates';

export default function ProgressTracker() {
  const [progress, setProgress] = useState(getProgress());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const calendarDays = getCalendarMonth(year, month);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1));
  };

  const handleSaveNotes = () => {
    if (!selectedDate) return;

    const dateKey = formatDateKey(selectedDate);
    const dayProgress = progress.dailyProgress[dateKey] || {
      date: dateKey,
      morningCompleted: false,
      eveningCompleted: false,
      exercises: {},
    };

    const updates: any = { ...dayProgress };
    if (weight) updates.weight = parseFloat(weight);
    if (notes) updates.notes = notes;

    if (isToday(selectedDate)) {
      updateTodayProgress(updates);
    } else {
      progress.dailyProgress[dateKey] = updates;
    }

    setProgress(getProgress());
    setSelectedDate(null);
    setWeight('');
    setNotes('');
  };

  const getDayStatus = (date: Date | null) => {
    if (!date) return null;
    const dateKey = formatDateKey(date);
    return progress.dailyProgress[dateKey];
  };

  const calculateWeeklyCompletion = () => {
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    let completed = 0;
    let total = 0;

    Object.entries(progress.dailyProgress).forEach(([dateStr, dayProgress]) => {
      const date = new Date(dateStr);
      if (date >= weekAgo && date <= today) {
        total += 2;
        if (dayProgress.morningCompleted) completed++;
        if (dayProgress.eveningCompleted) completed++;
      }
    });

    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const weeklyCompletion = calculateWeeklyCompletion();

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-center tracking-wide">PROGRESS TRACKER</h1>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 text-center">
            <div className="text-2xl font-bold text-blue-500">{weeklyCompletion}%</div>
            <div className="text-xs text-gray-400 mt-1">Week Complete</div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 text-center">
            <div className="flex items-center justify-center space-x-1">
              <Flame className="text-orange-500" size={24} />
              <div className="text-2xl font-bold text-orange-500">{progress.currentStreak}</div>
            </div>
            <div className="text-xs text-gray-400 mt-1">Day Streak</div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 text-center">
            <div className="text-2xl font-bold text-green-500">
              {Object.keys(progress.dailyProgress).length}
            </div>
            <div className="text-xs text-gray-400 mt-1">Days Tracked</div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-800 rounded">
              <ChevronLeft size={20} />
            </button>
            <h2 className="font-semibold">
              {monthNames[month]} {year}
            </h2>
            <button onClick={handleNextMonth} className="p-2 hover:bg-gray-800 rounded">
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
              <div key={idx} className="text-center text-xs text-gray-500 font-semibold">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((date, idx) => {
              if (!date) {
                return <div key={`empty-${idx}`} className="aspect-square" />;
              }

              const dayStatus = getDayStatus(date);
              const bothComplete = dayStatus?.morningCompleted && dayStatus?.eveningCompleted;
              const oneComplete = dayStatus?.morningCompleted || dayStatus?.eveningCompleted;
              const today = isToday(date);

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(date)}
                  className={`aspect-square rounded-lg text-sm font-medium transition-all ${
                    today ? 'ring-2 ring-blue-500' : ''
                  } ${
                    bothComplete
                      ? 'bg-green-600 text-white'
                      : oneComplete
                      ? 'bg-yellow-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-750'
                  }`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-600 rounded" />
              <span className="text-gray-400">Complete</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-yellow-600 rounded" />
              <span className="text-gray-400">Partial</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-gray-800 rounded" />
              <span className="text-gray-400">Incomplete</span>
            </div>
          </div>
        </div>

        {selectedDate && (
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
            <h3 className="font-semibold mb-3">
              {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Enter weight"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="How did you feel? Energy level?"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 h-20 resize-none"
                />
              </div>

              <button
                onClick={handleSaveNotes}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

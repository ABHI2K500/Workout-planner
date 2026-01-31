import { useEffect, useState } from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { getTodayProgress, updateTodayProgress, getProgress } from '../utils/storage';
import { getDayNumber, formatDate } from '../utils/dates';
import { getRandomQuote } from '../data/workouts';

export default function Dashboard() {
  const [todayProgress, setTodayProgress] = useState(getTodayProgress());
  const [progress, setProgress] = useState(getProgress());
  const [quote] = useState(getRandomQuote());

  useEffect(() => {
    setTodayProgress(getTodayProgress());
    setProgress(getProgress());
  }, []);

  const dayNumber = getDayNumber(progress.startDate);
  const completionPercentage = todayProgress.morningCompleted && todayProgress.eveningCompleted
    ? 100
    : todayProgress.morningCompleted || todayProgress.eveningCompleted
    ? 50
    : 0;

  const handleToggleMorning = () => {
    const newStatus = !todayProgress.morningCompleted;
    updateTodayProgress({ morningCompleted: newStatus });
    setTodayProgress({ ...todayProgress, morningCompleted: newStatus });
    setProgress(getProgress());
  };

  const handleToggleEvening = () => {
    const newStatus = !todayProgress.eveningCompleted;
    updateTodayProgress({ eveningCompleted: newStatus });
    setTodayProgress({ ...todayProgress, eveningCompleted: newStatus });
    setProgress(getProgress());
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2 tracking-wide">TOJI PROTOCOL</h1>
          <p className="text-gray-400">{formatDate()}</p>
          <p className="text-sm text-blue-500 mt-1">Day {dayNumber} of 365</p>
        </div>

        <div className="relative w-48 h-48 mx-auto mb-8">
          <svg className="transform -rotate-90 w-48 h-48">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-800"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={553}
              strokeDashoffset={553 - (553 * completionPercentage) / 100}
              className="text-blue-500 transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl font-bold">{completionPercentage}%</div>
              <div className="text-sm text-gray-400 mt-1">Complete</div>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <button
            onClick={handleToggleMorning}
            className={`w-full py-6 rounded-lg transition-all duration-300 flex items-center justify-between px-6 ${
              todayProgress.morningCompleted
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg shadow-blue-500/30'
                : 'bg-gray-800 hover:bg-gray-750'
            }`}
          >
            <div className="text-left">
              <div className="text-lg font-semibold">Morning Gym</div>
              <div className="text-sm text-gray-300">45-60 min</div>
            </div>
            {todayProgress.morningCompleted ? (
              <CheckCircle size={32} className="text-white" />
            ) : (
              <Circle size={32} className="text-gray-600" />
            )}
          </button>

          <button
            onClick={handleToggleEvening}
            className={`w-full py-6 rounded-lg transition-all duration-300 flex items-center justify-between px-6 ${
              todayProgress.eveningCompleted
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 shadow-lg shadow-purple-500/30'
                : 'bg-gray-800 hover:bg-gray-750'
            }`}
          >
            <div className="text-left">
              <div className="text-lg font-semibold">Evening Calisthenics</div>
              <div className="text-sm text-gray-300">20-30 min</div>
            </div>
            {todayProgress.eveningCompleted ? (
              <CheckCircle size={32} className="text-white" />
            ) : (
              <Circle size={32} className="text-gray-600" />
            )}
          </button>
        </div>

        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <div className="text-sm text-gray-500 mb-2 uppercase tracking-wider">Today's Reminder</div>
          <p className="text-gray-200 leading-relaxed italic">{quote}</p>
        </div>

        {progress.currentStreak > 0 && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-6 py-3">
              <span className="text-2xl">🔥</span>
              <span className="text-lg font-semibold text-orange-500">{progress.currentStreak} Day Streak</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

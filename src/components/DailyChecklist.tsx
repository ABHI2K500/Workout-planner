import { useState, useEffect } from 'react';
import { Check, Dumbbell, Activity } from 'lucide-react';
import { getDayOfWeek, formatDate } from '../utils/dates';
import { getDayWorkout } from '../data/workouts';
import { getTodayProgress, updateTodayProgress } from '../utils/storage';
import { Exercise } from '../types';

export default function DailyChecklist() {
  const [todayProgress, setTodayProgress] = useState(getTodayProgress());
  const [showConfetti, setShowConfetti] = useState(false);

  const today = getDayOfWeek();
  const dayWorkout = getDayWorkout(today);

  useEffect(() => {
    setTodayProgress(getTodayProgress());
  }, []);

  const handleExerciseToggle = (exerciseKey: string) => {
    const newExercises = {
      ...todayProgress.exercises,
      [exerciseKey]: !todayProgress.exercises[exerciseKey],
    };

    updateTodayProgress({ exercises: newExercises });
    setTodayProgress({ ...todayProgress, exercises: newExercises });
  };

  const handleCompleteMorning = () => {
    if (!dayWorkout?.morning.length) return;

    const allMorningComplete = dayWorkout.morning.every(
      (ex, idx) => todayProgress.exercises[`morning-${idx}`]
    );

    if (allMorningComplete) {
      updateTodayProgress({ morningCompleted: true });
      setTodayProgress({ ...todayProgress, morningCompleted: true });
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const handleCompleteEvening = () => {
    if (!dayWorkout?.evening.length) return;

    const allEveningComplete = dayWorkout.evening.every(
      (ex, idx) => todayProgress.exercises[`evening-${idx}`]
    );

    if (allEveningComplete) {
      updateTodayProgress({ eveningCompleted: true });
      setTodayProgress({ ...todayProgress, eveningCompleted: true });
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const renderExerciseList = (exercises: Exercise[], type: 'morning' | 'evening') => {
    return exercises.map((exercise, idx) => {
      const exerciseKey = `${type}-${idx}`;
      const isChecked = todayProgress.exercises[exerciseKey] || false;

      return (
        <div
          key={exerciseKey}
          onClick={() => handleExerciseToggle(exerciseKey)}
          className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all ${
            isChecked
              ? 'bg-green-900/30 border border-green-700/50'
              : 'bg-gray-800 border border-gray-700 hover:bg-gray-750'
          }`}
        >
          <div className="flex items-center space-x-3 flex-1">
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                isChecked
                  ? 'bg-green-600 border-green-600'
                  : 'border-gray-600'
              }`}
            >
              {isChecked && <Check size={16} className="text-white" />}
            </div>
            <div className="flex-1">
              <div className={`font-medium ${isChecked ? 'text-gray-300 line-through' : 'text-gray-100'}`}>
                {exercise.name}
              </div>
              <div className="text-sm text-gray-500">
                {exercise.sets} × {exercise.reps}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  if (!dayWorkout) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 pb-20 flex items-center justify-center">
        <p className="text-gray-400">No workout data for today</p>
      </div>
    );
  }

  const isRestDay = dayWorkout.morning.length === 0 && dayWorkout.evening.length === 0;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 pb-20">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-6xl animate-bounce">✓</div>
        </div>
      )}

      <div className="max-w-md mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2 tracking-wide">TODAY'S TRAINING</h1>
          <p className="text-gray-400">{formatDate()}</p>
          <p className="text-blue-500 uppercase text-sm mt-1">{today}</p>
        </div>

        {isRestDay ? (
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-8 text-center">
            <div className="text-4xl mb-4">😴</div>
            <h2 className="text-xl font-semibold mb-2">Rest Day</h2>
            <p className="text-gray-400">Recovery is part of the process. Rest well.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {dayWorkout.morning.length > 0 && (
              <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-900/50 to-blue-800/30 px-4 py-3 border-b border-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Dumbbell size={20} className="text-blue-500" />
                      <h2 className="font-semibold uppercase tracking-wide">Morning Gym</h2>
                    </div>
                    {todayProgress.morningCompleted && (
                      <span className="text-green-500 text-sm">✓ Complete</span>
                    )}
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  {renderExerciseList(dayWorkout.morning, 'morning')}
                  {!todayProgress.morningCompleted && (
                    <button
                      onClick={handleCompleteMorning}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors mt-4"
                    >
                      Complete Morning Session
                    </button>
                  )}
                </div>
              </div>
            )}

            {dayWorkout.evening.length > 0 && (
              <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-900/50 to-purple-800/30 px-4 py-3 border-b border-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Activity size={20} className="text-purple-500" />
                      <h2 className="font-semibold uppercase tracking-wide">Evening Calisthenics</h2>
                    </div>
                    {todayProgress.eveningCompleted && (
                      <span className="text-green-500 text-sm">✓ Complete</span>
                    )}
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  {renderExerciseList(dayWorkout.evening, 'evening')}
                  {!todayProgress.eveningCompleted && (
                    <button
                      onClick={handleCompleteEvening}
                      className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors mt-4"
                    >
                      Complete Evening Session
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

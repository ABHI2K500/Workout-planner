import { weeklyWorkouts } from '../data/workouts';
import { Dumbbell, Activity } from 'lucide-react';

export default function WeeklyRoutine() {
  const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-center tracking-wide">WEEKLY ROUTINE</h1>

        <div className="space-y-6">
          {dayOrder.map((day) => {
            const dayWorkout = weeklyWorkouts.find(w => w.day === day);
            if (!dayWorkout) return null;

            return (
              <div key={day} className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-800 to-gray-850 px-4 py-3 border-b border-gray-800">
                  <h2 className="text-lg font-semibold uppercase tracking-wide">
                    {day}
                  </h2>
                </div>

                {dayWorkout.morning.length > 0 && (
                  <div className="p-4 border-b border-gray-800">
                    <div className="flex items-center space-x-2 mb-3">
                      <Dumbbell size={18} className="text-blue-500" />
                      <h3 className="font-semibold text-blue-400 uppercase text-sm tracking-wide">
                        Morning Gym
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {dayWorkout.morning.map((exercise, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-gray-300">{exercise.name}</span>
                          <span className="text-gray-500">
                            {exercise.sets}×{exercise.reps}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {dayWorkout.evening.length > 0 && (
                  <div className="p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Activity size={18} className="text-purple-500" />
                      <h3 className="font-semibold text-purple-400 uppercase text-sm tracking-wide">
                        Evening Calisthenics
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {dayWorkout.evening.map((exercise, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-gray-300">{exercise.name}</span>
                          <span className="text-gray-500">
                            {exercise.sets}×{exercise.reps}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {dayWorkout.morning.length === 0 && dayWorkout.evening.length === 0 && (
                  <div className="p-4 text-center text-gray-500">
                    <p>Full Rest Day</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

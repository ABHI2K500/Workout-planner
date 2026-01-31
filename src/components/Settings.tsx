import { useState, useEffect } from 'react';
import { Bell, Trash2 } from 'lucide-react';
import { getSettings, saveSettings, resetProgress, getProgress } from '../utils/storage';

export default function Settings() {
  const [settings, setSettings] = useState(getSettings());
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const progress = getProgress();

  const handleToggle = (key: string) => {
    const newSettings = {
      ...settings,
      [key]: !settings[key],
    };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const handleReset = () => {
    resetProgress();
    setShowResetConfirm(false);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-center tracking-wide">SETTINGS</h1>

        <div className="space-y-6">
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
            <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Bell size={20} />
              <span>Reminders</span>
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Morning Reminder</div>
                  <div className="text-sm text-gray-400">Notify for morning gym</div>
                </div>
                <button
                  onClick={() => handleToggle('morningReminder')}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.morningReminder ? 'bg-blue-600' : 'bg-gray-700'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.morningReminder ? 'translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Evening Reminder</div>
                  <div className="text-sm text-gray-400">Notify for evening calisthenics</div>
                </div>
                <button
                  onClick={() => handleToggle('eveningReminder')}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.eveningReminder ? 'bg-purple-600' : 'bg-gray-700'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.eveningReminder ? 'translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Note: Browser notifications require permission
            </p>
          </div>

          <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
            <h2 className="text-lg font-semibold mb-4">Progress Stats</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Start Date</span>
                <span className="font-medium">
                  {new Date(progress.startDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Days Tracked</span>
                <span className="font-medium">{Object.keys(progress.dailyProgress).length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Current Streak</span>
                <span className="font-medium">{progress.currentStreak} days</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg border border-red-900/50 p-4">
            <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2 text-red-500">
              <Trash2 size={20} />
              <span>Danger Zone</span>
            </h2>

            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors"
              >
                Reset All Progress
              </button>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-gray-300">
                  Are you sure? This will delete all your progress and cannot be undone.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={handleReset}
                    className="flex-1 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors"
                  >
                    Yes, Reset
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="text-center text-xs text-gray-500 pt-4">
            <p>Toji Protocol v1.0</p>
            <p className="mt-1">Built for discipline and progress</p>
          </div>
        </div>
      </div>
    </div>
  );
}

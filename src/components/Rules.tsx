import { Target, Moon, Utensils, Brain } from 'lucide-react';

export default function Rules() {
  const rules = [
    {
      icon: Target,
      title: 'Morning = Effort',
      description: 'Push yourself in the gym. Focus on progressive overload and strength.',
    },
    {
      icon: Brain,
      title: 'Evening = Quality',
      description: 'Calisthenics is about control and form. Move with intention.',
    },
    {
      icon: Target,
      title: 'Stop Before Failure',
      description: 'End gym sets 1-2 reps before failure. Leave something in the tank.',
    },
    {
      icon: Moon,
      title: 'Sleep 7+ Hours',
      description: 'Recovery happens during sleep. Prioritize rest as much as training.',
    },
    {
      icon: Utensils,
      title: 'Protein Every Meal',
      description: 'Aim for 1.6-2.2g per kg bodyweight. Fuel your recovery properly.',
    },
  ];

  const principles = [
    'Consistency beats intensity',
    'Quality over quantity',
    'Train to build, not to destroy',
    'Discipline is doing what needs to be done, even when you don\'t want to',
    'Your body is a weapon. Sharpen it daily.',
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-center tracking-wide">RULES & MINDSET</h1>

        <div className="space-y-4 mb-8">
          {rules.map((rule, idx) => (
            <div
              key={idx}
              className="bg-gray-900 rounded-lg border border-gray-800 p-4 hover:border-gray-700 transition-colors"
            >
              <div className="flex items-start space-x-3">
                <div className="bg-blue-500/10 p-2 rounded-lg">
                  <rule.icon size={24} className="text-blue-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{rule.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{rule.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-850 rounded-lg border border-gray-800 p-6">
          <h2 className="text-lg font-semibold mb-4 text-center">Core Principles</h2>
          <div className="space-y-3">
            {principles.map((principle, idx) => (
              <div key={idx} className="flex items-start space-x-3">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-300 text-sm leading-relaxed">{principle}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-gray-900 rounded-lg border border-gray-800 p-6">
          <h2 className="text-lg font-semibold mb-3 text-center">Training Philosophy</h2>
          <p className="text-gray-400 text-sm leading-relaxed text-center">
            This is not a race. This is a lifestyle. Every session is a step towards becoming
            the strongest version of yourself. Train smart, recover well, stay consistent.
            The results will follow.
          </p>
        </div>
      </div>
    </div>
  );
}

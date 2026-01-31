import { Home, Calendar, CheckSquare, BookOpen, Settings, TrendingUp } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'checklist', icon: CheckSquare, label: 'Today' },
    { id: 'routine', icon: Calendar, label: 'Routine' },
    { id: 'progress', icon: TrendingUp, label: 'Progress' },
    { id: 'rules', icon: BookOpen, label: 'Rules' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              currentPage === id
                ? 'text-blue-500'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <Icon size={20} />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

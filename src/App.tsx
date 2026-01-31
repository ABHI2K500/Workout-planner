import { useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import DailyChecklist from './components/DailyChecklist';
import WeeklyRoutine from './components/WeeklyRoutine';
import ProgressTracker from './components/ProgressTracker';
import Rules from './components/Rules';
import Settings from './components/Settings';

type Page = 'dashboard' | 'checklist' | 'routine' | 'progress' | 'rules' | 'settings';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'checklist':
        return <DailyChecklist />;
      case 'routine':
        return <WeeklyRoutine />;
      case 'progress':
        return <ProgressTracker />;
      case 'rules':
        return <Rules />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {renderPage()}
      <Navigation currentPage={currentPage} onNavigate={(page) => setCurrentPage(page as Page)} />
    </div>
  );
}

export default App;

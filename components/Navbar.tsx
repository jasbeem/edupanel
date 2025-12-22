
import React from 'react';
import { Theme, ViewState } from '../types';

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
  currentView: ViewState;
  onGoHome: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme, currentView, onGoHome }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex justify-between items-center">
      <div 
        className="flex items-center gap-3 cursor-pointer group"
        onClick={onGoHome}
      >
        <div className="bg-indigo-600 text-white p-2.5 rounded-xl group-hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-black tracking-tighter leading-none">EduPanel</h1>
          <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-500">Suite Educativa</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {currentView !== 'HOME' && (
          <button 
            onClick={onGoHome}
            className="px-5 py-2 text-xs font-bold rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors uppercase tracking-wider"
          >
            Inicio
          </button>
        )}
        <button
          onClick={onToggleTheme}
          className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:scale-110 transition-all"
        >
          {theme === Theme.LIGHT ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

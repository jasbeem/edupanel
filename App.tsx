
import React, { useState, useLayoutEffect } from 'react';
import { ViewState, GameData, Theme } from './types';
import { SAMPLE_CSV } from './constants';
import Navbar from './components/Navbar';
import Home from './components/Home';
import RoscoGame from './games/RoscoGame';
import HangmanGame from './games/HangmanGame';
import SopaGame from './games/SopaGame';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('edupanel-theme');
    return (saved as Theme) || Theme.DARK;
  });

  useLayoutEffect(() => {
    const isDark = theme === Theme.DARK;
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('edupanel-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  };

  const handleFileUpload = (data: GameData) => {
    setGameData(data);
    setView('HOME');
  };

  const downloadSample = () => {
    const dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(SAMPLE_CSV);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "plantilla_juegos_educativos.csv");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const renderContent = () => {
    if (!gameData && view !== 'HOME') {
       setView('HOME');
    }

    switch (view) {
      case 'ROSCO':
        return gameData ? <RoscoGame data={gameData.rosco} onBack={() => setView('HOME')} /> : null;
      case 'HANGMAN':
        return gameData ? <HangmanGame data={gameData.hangman} onBack={() => setView('HOME')} /> : null;
      case 'SOPA':
        return gameData ? <SopaGame data={gameData.sopa} onBack={() => setView('HOME')} /> : null;
      default:
        return (
          <Home 
            gameData={gameData} 
            onUpload={handleFileUpload} 
            onSelectGame={setView} 
            onDownloadSample={downloadSample}
          />
        );
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === Theme.DARK ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <Navbar theme={theme} onToggleTheme={toggleTheme} currentView={view} onGoHome={() => setView('HOME')} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderContent()}
      </main>
      <footer className="py-8 text-center border-t border-slate-200 dark:border-slate-800 opacity-40">
        <p className="text-sm font-bold tracking-widest uppercase">EduPanel Secundaria & Bachillerato</p>
        <p className="text-xs mt-1">Funciona localmente • Sin servidor • Modo Oscuro</p>
      </footer>
    </div>
  );
};

export default App;

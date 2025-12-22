
import React, { useState, useEffect } from 'react';
import { HangmanItem } from '../types';

interface HangmanGameProps {
  data: HangmanItem[];
  onBack: () => void;
}

const HangmanGame: React.FC<HangmanGameProps> = ({ data, onBack }) => {
  const [itemIdx, setItemIdx] = useState(0);
  const [usedLetters, setUsedLetters] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [status, setStatus] = useState<'PLAYING' | 'WON' | 'LOST'>('PLAYING');

  const currentItem = data[itemIdx];
  const word = currentItem.word.toUpperCase();

  const handleLetter = (letter: string) => {
    if (usedLetters.includes(letter) || status !== 'PLAYING') return;
    
    setUsedLetters(prev => [...prev, letter]);
    if (!word.includes(letter)) {
      setMistakes(m => m + 1);
    }
  };

  useEffect(() => {
    if (mistakes >= 6) setStatus('LOST');
    else if (word.split('').every(l => usedLetters.includes(l) || l === ' ')) setStatus('WON');
  }, [usedLetters, mistakes, word]);

  const nextWord = () => {
    if (itemIdx < data.length - 1) {
      setItemIdx(i => i + 1);
      setUsedLetters([]);
      setMistakes(0);
      setStatus('PLAYING');
    } else {
      onBack();
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
      <div className="grid md:grid-cols-2 gap-12 w-full items-center">
        {/* Dibujo Ahorcado */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl flex justify-center border-b-4 border-slate-200 dark:border-slate-700">
           <svg width="200" height="250" viewBox="0 0 200 250" className="stroke-slate-900 dark:stroke-white fill-none stroke-[6]">
              {/* Estructura */}
              <line x1="20" y1="230" x2="180" y2="230" />
              <line x1="60" y1="230" x2="60" y2="20" />
              <line x1="60" y1="20" x2="140" y2="20" />
              <line x1="140" y1="20" x2="140" y2="50" />
              {/* Cabeza */}
              {mistakes > 0 && <circle cx="140" cy="80" r="25" />}
              {/* Cuerpo */}
              {mistakes > 1 && <line x1="140" y1="105" x2="140" y2="170" />}
              {/* Brazos */}
              {mistakes > 2 && <line x1="140" y1="120" x2="110" y2="150" />}
              {mistakes > 3 && <line x1="140" y1="120" x2="170" y2="150" />}
              {/* Piernas */}
              {mistakes > 4 && <line x1="140" y1="170" x2="110" y2="210" />}
              {mistakes > 5 && <line x1="140" y1="170" x2="170" y2="210" />}
           </svg>
        </div>

        <div className="space-y-6">
          <div className="bg-yellow-500/10 border-2 border-yellow-500/20 p-6 rounded-2xl text-center">
             <h4 className="text-xs font-bold uppercase text-yellow-600 mb-2">Pista:</h4>
             <p className="text-lg font-medium italic">"{currentItem.hint}"</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {word.split('').map((l, i) => (
              <div key={i} className="w-10 h-12 border-b-4 border-indigo-500 flex items-center justify-center text-2xl font-black">
                {usedLetters.includes(l) || status === 'LOST' ? l : l === ' ' ? ' ' : ''}
              </div>
            ))}
          </div>

          {status !== 'PLAYING' && (
            <div className={`p-6 rounded-2xl text-center animate-bounce ${status === 'WON' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
              <h3 className="text-xl font-black">{status === 'WON' ? '¡Increíble, Ganaste!' : 'Fin de la Partida'}</h3>
              <button onClick={nextWord} className="mt-4 px-6 py-2 bg-white text-slate-900 rounded-lg font-bold">Continuar</button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-7 sm:grid-cols-10 gap-2 w-full max-w-2xl">
        {"ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split('').map(l => (
          <button
            key={l}
            disabled={usedLetters.includes(l) || status !== 'PLAYING'}
            onClick={() => handleLetter(l)}
            className={`p-3 rounded-lg font-bold transition-all ${usedLetters.includes(l) ? 'opacity-20 grayscale' : 'bg-white dark:bg-slate-800 hover:bg-indigo-500 hover:text-white shadow'}`}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HangmanGame;

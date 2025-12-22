
import React, { useState, useEffect } from 'react';
import { SopaItem } from '../types';

interface SopaGameProps {
  data: SopaItem[];
  onBack: () => void;
}

const SopaGame: React.FC<SopaGameProps> = ({ data, onBack }) => {
  const [itemIdx, setItemIdx] = useState(0);
  const [grid, setGrid] = useState<string[][]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selection, setSelection] = useState<{r:number, c:number}[]>([]);
  const SIZE = 12;

  const current = data[itemIdx];

  useEffect(() => {
    generateGrid();
  }, [itemIdx]);

  const generateGrid = () => {
    const newGrid = Array(SIZE).fill(null).map(() => Array(SIZE).fill(''));
    const alphabet = "ABCDEFFGHIJKLMNOPQRSTUVWXYZ";

    current.words.forEach(word => {
      let placed = false;
      while(!placed) {
        const horizontal = Math.random() > 0.5;
        const r = Math.floor(Math.random() * (horizontal ? SIZE : SIZE - word.length));
        const c = Math.floor(Math.random() * (horizontal ? SIZE - word.length : SIZE));
        
        let canPlace = true;
        for(let i=0; i<word.length; i++) {
          const char = newGrid[horizontal ? r : r+i][horizontal ? c+i : c];
          if(char !== '' && char !== word[i]) canPlace = false;
        }

        if(canPlace) {
          for(let i=0; i<word.length; i++) {
            newGrid[horizontal ? r : r+i][horizontal ? c+i : c] = word[i];
          }
          placed = true;
        }
      }
    });

    for(let i=0; i<SIZE; i++) {
      for(let j=0; j<SIZE; j++) {
        if(newGrid[i][j] === '') newGrid[i][j] = alphabet[Math.floor(Math.random()*alphabet.length)];
      }
    }
    setGrid(newGrid);
    setFoundWords([]);
    setSelection([]);
  };

  const toggleSelect = (r: number, c: number) => {
    const exists = selection.find(s => s.r === r && s.c === c);
    let newSelection = [];
    if (exists) {
      newSelection = selection.filter(s => !(s.r === r && s.c === c));
    } else {
      newSelection = [...selection, {r, c}];
    }
    setSelection(newSelection);

    const selectedWord = newSelection.map(s => grid[s.r][s.c]).join('');
    const reversedWord = selectedWord.split('').reverse().join('');
    
    const wordFound = current.words.find(w => w === selectedWord || w === reversedWord);
    if(wordFound && !foundWords.includes(wordFound)) {
      setFoundWords(prev => [...prev, wordFound]);
      setSelection([]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-4 rounded-3xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-12 gap-1 md:gap-2 aspect-square">
          {grid.map((row, rIdx) => 
            row.map((char, cIdx) => {
              const isSelected = selection.find(s => s.r === rIdx && s.c === cIdx);
              return (
                <button
                  key={`${rIdx}-${cIdx}`}
                  onClick={() => toggleSelect(rIdx, cIdx)}
                  className={`aspect-square flex items-center justify-center text-xs md:text-sm font-bold rounded-md transition-all ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'}`}
                >
                  {char}
                </button>
              )
            })
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-indigo-600 text-white p-6 rounded-3xl shadow-xl">
           <h3 className="text-xl font-bold mb-4">{current.title}</h3>
           <div className="flex flex-col gap-2">
              {current.words.map(w => (
                <div key={w} className={`flex items-center gap-3 p-2 rounded-lg ${foundWords.includes(w) ? 'bg-green-500/30 line-through opacity-50' : ''}`}>
                   <div className={`w-4 h-4 rounded-full border-2 ${foundWords.includes(w) ? 'bg-white border-white' : 'border-white/30'}`} />
                   <span className="font-bold tracking-widest">{w}</span>
                </div>
              ))}
           </div>
        </div>

        {foundWords.length === current.words.length && (
           <div className="bg-green-500 text-white p-6 rounded-3xl text-center animate-pulse">
              <h4 className="text-xl font-black mb-4">¡Sopa Completada!</h4>
              <button onClick={() => itemIdx < data.length - 1 ? setItemIdx(i => i+1) : onBack()} className="w-full py-2 bg-white text-green-600 rounded-xl font-bold">
                {itemIdx < data.length - 1 ? "Siguiente Sopa" : "Finalizar"}
              </button>
           </div>
        )}
        
        <button onClick={onBack} className="w-full py-4 text-slate-500 font-bold hover:text-indigo-500">Abandonar Juego</button>
      </div>
    </div>
  );
};

export default SopaGame;

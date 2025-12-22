
import React, { useState } from 'react';
import { RoscoItem } from '../types';

interface RoscoGameProps {
  data: RoscoItem[];
  onBack: () => void;
}

const RoscoGame: React.FC<RoscoGameProps> = ({ data, onBack }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'CORRECT' | 'WRONG' | 'PENDING'>>({});
  const [userInput, setUserInput] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const currentItem = data[currentIdx];

  const handleCheck = () => {
    const isCorrect = userInput.trim().toUpperCase() === currentItem.word.toUpperCase();
    // Fix: Explicitly type newAnswers to prevent string literal widening which causes assignment errors to state
    const newAnswers: Record<number, 'CORRECT' | 'WRONG' | 'PENDING'> = { 
      ...answers, 
      [currentIdx]: isCorrect ? 'CORRECT' : 'WRONG' 
    };
    setAnswers(newAnswers);
    setUserInput('');
    moveToNext(newAnswers);
  };

  const handlePasapalabra = () => {
    moveToNext(answers);
  };

  const moveToNext = (currentAnswers: Record<number, any>) => {
    let next = (currentIdx + 1) % data.length;
    let count = 0;
    while (currentAnswers[next] && currentAnswers[next] !== 'PENDING' && count < data.length) {
      next = (next + 1) % data.length;
      count++;
    }

    if (count >= data.length) {
      setGameOver(true);
    } else {
      setCurrentIdx(next);
    }
  };

  if (gameOver) {
    const corrects = Object.values(answers).filter(v => v === 'CORRECT').length;
    return (
      <div className="max-w-xl mx-auto text-center p-10 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl">
        <h2 className="text-4xl font-black mb-4">¡Rosco Terminado!</h2>
        <div className="text-6xl mb-6">🎯</div>
        <p className="text-2xl mb-8">Has acertado <span className="text-green-500 font-bold">{corrects}</span> de {data.length}</p>
        <button onClick={onBack} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold">Volver al Panel</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      {/* Visual del Rosco */}
      <div className="relative aspect-square max-w-[400px] mx-auto">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
            {currentItem.letter}
          </div>
        </div>
        {data.map((item, idx) => {
          const angle = (idx / data.length) * 2 * Math.PI - Math.PI / 2;
          const x = 50 + 40 * Math.cos(angle);
          const y = 50 + 40 * Math.sin(angle);
          const status = answers[idx] || 'PENDING';
          const colorClass = status === 'CORRECT' ? 'bg-green-500' : status === 'WRONG' ? 'bg-red-500' : idx === currentIdx ? 'bg-indigo-600 scale-125' : 'bg-slate-300 dark:bg-slate-600';

          return (
            <div 
              key={idx}
              className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white transition-all duration-300 ${colorClass}`}
              style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
            >
              {item.letter}
            </div>
          );
        })}
      </div>

      {/* Panel de Pregunta */}
      <div className="space-y-6">
        <div className="bg-indigo-600 p-8 rounded-[2rem] text-white shadow-xl min-h-[200px] flex flex-col justify-center">
          <h3 className="text-sm font-bold uppercase tracking-widest opacity-60 mb-2">Definición:</h3>
          <p className="text-xl font-medium leading-relaxed">{currentItem.definition}</p>
        </div>

        <input 
          type="text" 
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
          placeholder="Escribe la respuesta..."
          className="w-full p-6 rounded-2xl bg-white dark:bg-slate-800 border-2 border-indigo-500/20 focus:border-indigo-500 outline-none text-xl font-bold transition-all"
          autoFocus
        />

        <div className="grid grid-cols-2 gap-4">
          <button onClick={handleCheck} className="py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-green-500/20">Comprobar</button>
          <button onClick={handlePasapalabra} className="py-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-yellow-500/20">Pasapalabra</button>
        </div>
      </div>
    </div>
  );
};

export default RoscoGame;
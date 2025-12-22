
import React, { useState, useEffect } from 'react';
import { MemoryPair } from '../types';

interface MemoryGameProps {
  data: MemoryPair[];
  onBack: () => void;
}

interface Card {
  id: string;
  content: string;
  type: 'TERM' | 'DEF';
  pairId: number;
}

const MemoryGame: React.FC<MemoryGameProps> = ({ data, onBack }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    // Prepare deck
    const deck: Card[] = [];
    data.forEach((item, idx) => {
      deck.push({ id: `t-${idx}`, content: item.term, type: 'TERM', pairId: idx });
      deck.push({ id: `d-${idx}`, content: item.definition, type: 'DEF', pairId: idx });
    });
    // Shuffle
    setCards(deck.sort(() => Math.random() - 0.5));
  }, [data]);

  const handleCardClick = (id: string) => {
    if (flipped.length === 2 || matched.includes(id) || flipped.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const card1 = cards.find(c => c.id === newFlipped[0])!;
      const card2 = cards.find(c => c.id === newFlipped[1])!;

      if (card1.pairId === card2.pairId && card1.type !== card2.type) {
        setMatched(prev => [...prev, card1.id, card2.id]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const isGameComplete = matched.length === cards.length && cards.length > 0;

  if (isGameComplete) {
    return (
      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-2xl text-center space-y-6">
        <div className="text-6xl mb-4">🧠</div>
        <h2 className="text-3xl font-extrabold">¡Excelente Memoria!</h2>
        <p className="text-xl">Has completado todas las parejas en <span className="font-bold text-indigo-600 dark:text-indigo-400">{moves}</span> movimientos.</p>
        <div className="pt-6">
          <button 
            onClick={onBack}
            className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-colors"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Juego de Memoria</h2>
        <div className="flex gap-4">
          <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-4 py-1 rounded-full text-sm font-bold">
             Movimientos: {moves}
          </span>
          <span className="bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-4 py-1 rounded-full text-sm font-bold">
             Parejas: {matched.length / 2} / {data.length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {cards.map((card) => {
          const isFlipped = flipped.includes(card.id) || matched.includes(card.id);
          const isMatched = matched.includes(card.id);

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`h-40 relative perspective-1000 group transition-all duration-500 rounded-2xl overflow-hidden ${isMatched ? 'scale-95 opacity-80' : ''}`}
            >
              <div className={`w-full h-full relative transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* Front (Hidden) */}
                <div className="absolute inset-0 bg-indigo-600 flex items-center justify-center text-white backface-hidden rounded-2xl border-4 border-indigo-400 shadow-lg">
                  <div className="text-4xl">?</div>
                </div>
                {/* Back (Visible content) */}
                <div className={`absolute inset-0 rotate-y-180 bg-white dark:bg-slate-700 flex items-center justify-center p-4 text-center backface-hidden rounded-2xl border-4 ${isMatched ? 'border-green-400' : 'border-slate-200 dark:border-slate-600'} shadow-lg overflow-hidden`}>
                   <p className={`text-sm md:text-base font-medium ${isMatched ? 'text-green-600 dark:text-green-400' : ''}`}>
                      {card.content}
                   </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .transform-style-preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
      `}</style>
    </div>
  );
};

export default MemoryGame;

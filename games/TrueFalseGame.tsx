
import React, { useState } from 'react';
import { TrueFalseItem } from '../types';

interface TrueFalseGameProps {
  data: TrueFalseItem[];
  onBack: () => void;
}

const TrueFalseGame: React.FC<TrueFalseGameProps> = ({ data, onBack }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleAnswer = (answer: boolean) => {
    if (isConfirmed) return;
    setUserAnswer(answer);
  };

  const handleConfirm = () => {
    if (userAnswer === null) return;
    setIsConfirmed(true);
    if (userAnswer === data[currentIdx].isTrue) {
      setScore(s => s + 1);
    }
  };

  const nextChallenge = () => {
    if (currentIdx < data.length - 1) {
      setCurrentIdx(i => i + 1);
      setUserAnswer(null);
      setIsConfirmed(false);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-2xl text-center space-y-6">
        <div className="text-6xl mb-4">🎯</div>
        <h2 className="text-3xl font-extrabold">¡Desafío Completado!</h2>
        <p className="text-xl">Precisión lograda: <span className="font-bold text-indigo-600 dark:text-indigo-400">{Math.round((score / data.length) * 100)}%</span></p>
        <p className="text-slate-500">({score} de {data.length} afirmaciones correctas)</p>
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

  const current = data[currentIdx];
  const isCorrect = userAnswer === current.isTrue;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Verdadero o Falso</h2>
        <span className="bg-slate-200 dark:bg-slate-800 px-4 py-1 rounded-full text-sm font-bold">
           {currentIdx + 1} / {data.length}
        </span>
      </div>

      <div className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-[2rem] shadow-xl border border-slate-200 dark:border-slate-700 space-y-12">
        <div className="text-center">
          <p className="text-2xl font-semibold leading-relaxed mb-10 min-h-[100px] flex items-center justify-center">
            "{current.statement}"
          </p>

          {!isConfirmed ? (
            <div className="grid grid-cols-2 gap-6">
              <button
                onClick={() => handleAnswer(true)}
                className={`py-6 rounded-2xl font-bold text-xl transition-all flex flex-col items-center gap-2 ${
                  userAnswer === true ? 'bg-indigo-600 text-white ring-4 ring-indigo-200' : 'bg-slate-100 dark:bg-slate-700 hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-600'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Verdadero
              </button>
              <button
                onClick={() => handleAnswer(false)}
                className={`py-6 rounded-2xl font-bold text-xl transition-all flex flex-col items-center gap-2 ${
                  userAnswer === false ? 'bg-indigo-600 text-white ring-4 ring-indigo-200' : 'bg-slate-100 dark:bg-slate-700 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Falso
              </button>
            </div>
          ) : (
            <div className={`p-8 rounded-3xl space-y-4 animate-bounce-short ${isCorrect ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'}`}>
               <div className="text-4xl mb-2">{isCorrect ? '✨ Correcto ✨' : '❌ Incorrecto ❌'}</div>
               {current.explanation && (
                 <p className="text-sm font-medium italic">Nota: {current.explanation}</p>
               )}
            </div>
          )}
        </div>

        <div className="flex justify-center">
          {!isConfirmed ? (
            <button
              disabled={userAnswer === null}
              onClick={handleConfirm}
              className="px-12 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 disabled:opacity-50 shadow-lg shadow-indigo-500/30 transition-all"
            >
              Confirmar Respuesta
            </button>
          ) : (
            <button
              onClick={nextChallenge}
              className="px-12 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 transition-all flex items-center gap-2"
            >
              {currentIdx === data.length - 1 ? "Ver Resultados" : "Continuar"}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          )}
        </div>
      </div>
      <style>{`
        @keyframes bounce-short {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-short { animation: bounce-short 1s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default TrueFalseGame;

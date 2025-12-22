
import React, { useState } from 'react';
import { QuizQuestion } from '../types';

interface QuizGameProps {
  data: QuizQuestion[];
  onBack: () => void;
}

const QuizGame: React.FC<QuizGameProps> = ({ data, onBack }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleOptionClick = (idx: number) => {
    if (isConfirmed) return;
    setSelectedOption(idx);
  };

  const handleConfirm = () => {
    if (selectedOption === null) return;
    setIsConfirmed(true);
    if (selectedOption === data[currentIdx].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < data.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsConfirmed(false);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-2xl text-center space-y-6">
        <div className="text-6xl mb-4">🏆</div>
        <h2 className="text-3xl font-extrabold">¡Quiz Finalizado!</h2>
        <p className="text-xl">Has acertado <span className="font-bold text-indigo-600 dark:text-indigo-400">{score}</span> de <span className="font-bold">{data.length}</span> preguntas.</p>
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

  const currentQuestion = data[currentIdx];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Quiz</h2>
        <span className="bg-slate-200 dark:bg-slate-800 px-4 py-1 rounded-full text-sm font-bold">
          {currentIdx + 1} / {data.length}
        </span>
      </div>

      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 space-y-8">
        <p className="text-xl font-medium leading-relaxed">{currentQuestion.question}</p>
        
        <div className="grid gap-4">
          {currentQuestion.options.map((option, idx) => {
            let bgColor = "bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600";
            if (selectedOption === idx) {
              bgColor = "ring-2 ring-indigo-500 bg-indigo-50 dark:bg-indigo-900/30";
            }
            if (isConfirmed) {
              if (idx === currentQuestion.correctAnswer) {
                bgColor = "bg-green-100 dark:bg-green-900/40 border-2 border-green-500 text-green-700 dark:text-green-400";
              } else if (selectedOption === idx) {
                bgColor = "bg-red-100 dark:bg-red-900/40 border-2 border-red-500 text-red-700 dark:text-red-400";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(idx)}
                className={`w-full text-left p-5 rounded-2xl font-medium transition-all ${bgColor}`}
              >
                <span className="mr-3 opacity-50">{String.fromCharCode(65 + idx)}.</span>
                {option}
              </button>
            );
          })}
        </div>

        <div className="flex justify-end pt-4">
          {!isConfirmed ? (
            <button
              disabled={selectedOption === null}
              onClick={handleConfirm}
              className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              Confirmar
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              {currentIdx === data.length - 1 ? "Ver Resultados" : "Siguiente"}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizGame;

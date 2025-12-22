
import React, { useRef, useState } from 'react';
import { GameData, ViewState, RoscoItem, HangmanItem, SopaItem } from '../types';

interface HomeProps {
  gameData: GameData | null;
  onUpload: (data: GameData) => void;
  onSelectGame: (view: ViewState) => void;
  onDownloadSample: () => void;
}

const Home: React.FC<HomeProps> = ({ gameData, onUpload, onSelectGame, onDownloadSample }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const parseCSV = (text: string): GameData => {
    const cleanText = text.replace(/^\uFEFF/, '');
    const lines = cleanText.split(/\r?\n/);
    const rosco: RoscoItem[] = [];
    const hangman: HangmanItem[] = [];
    const sopa: SopaItem[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const columns = line.split(';').map(col => col.trim());
      const tipo = columns[0]?.toLowerCase();

      if (tipo === 'rosco' && columns[1] && columns[2]) {
        const word = columns[2].toUpperCase();
        rosco.push({ letter: word[0], definition: columns[1], word: word });
      } else if (tipo === 'ahorcado' && columns[1] && columns[2]) {
        hangman.push({ hint: columns[1], word: columns[2].toUpperCase() });
      } else if (tipo === 'sopa' && columns[2]) {
        const words = [columns[2], columns[3], columns[4], columns[5]].filter(w => w && w.length > 1).map(w => w.toUpperCase());
        if (words.length > 0) {
          sopa.push({ title: columns[1] || "Hardware & Software", words });
        }
      }
    }

    return { 
      subject: "General", topic: "Panel", 
      quiz: [], memory: [], trueFalse: [], 
      rosco, hangman, sopa 
    };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = parseCSV(event.target?.result as string);
        onUpload(data);
        setError(null);
      } catch (err: any) { setError("El archivo no tiene el formato correcto."); }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section className="text-center space-y-4">
        <h2 className="text-6xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white">
          Aprendizaje <span className="text-indigo-500 italic">Interactivo</span>
        </h2>
        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Carga tus contenidos y pon a prueba tus conocimientos con nuestros desafíos educativos.
        </p>
      </section>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Panel lateral de carga */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-8">
          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold">Configuración</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Para empezar, sube un archivo CSV con las definiciones y palabras. Puedes usar nuestra plantilla como guía.
            </p>
          </div>
          
          <div className="space-y-4">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Sube tu archivo CSV
            </button>
            <input type="file" ref={fileInputRef} className="hidden" accept=".csv" onChange={handleFileChange} />
            
            <button 
              onClick={onDownloadSample}
              className="w-full py-3.5 text-xs font-black uppercase tracking-widest text-indigo-500 border-2 border-indigo-500/10 rounded-2xl hover:bg-indigo-500/5 transition-all"
            >
              Ver plantilla de ejemplo
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-bold flex items-center gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
               </svg>
               {error}
            </div>
          )}

          {gameData && (
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-500 text-xs font-bold flex items-center gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
               </svg>
               ¡Datos cargados correctamente!
            </div>
          )}
        </div>

        {/* Tarjetas de Juegos */}
        <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
          <GameCard 
            title="Rosco de Palabras" 
            desc="Completa el rosco acertando las definiciones de la A a la Z." 
            icon="⭕" 
            color="bg-rose-500"
            count={gameData?.rosco.length || 0}
            disabled={!gameData || gameData.rosco.length === 0}
            onClick={() => onSelectGame('ROSCO')}
          />
          <GameCard 
            title="El Ahorcado" 
            desc="Adivina la palabra oculta antes de que se complete el dibujo." 
            icon="☠️" 
            color="bg-amber-500"
            count={gameData?.hangman.length || 0}
            disabled={!gameData || gameData.hangman.length === 0}
            onClick={() => onSelectGame('HANGMAN')}
          />
          <GameCard 
            title="Sopa de Letras" 
            desc="Encuentra todos los términos ocultos en la cuadrícula." 
            icon="🧩" 
            color="bg-sky-500"
            count={gameData?.sopa.length || 0}
            disabled={!gameData || gameData.sopa.length === 0}
            onClick={() => onSelectGame('SOPA')}
          />
        </div>
      </div>
    </div>
  );
};

const GameCard = ({ title, desc, icon, color, count, disabled, onClick }: any) => (
  <button 
    disabled={disabled} onClick={onClick}
    className={`p-8 rounded-[2.5rem] text-left border transition-all flex flex-col h-full group relative overflow-hidden ${
      disabled 
      ? 'opacity-20 grayscale bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800' 
      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 hover:shadow-3xl hover:-translate-y-2 active:scale-95'
    }`}
  >
    <div className={`w-16 h-16 ${color} rounded-[1.25rem] flex items-center justify-center text-3xl mb-6 shadow-2xl shadow-black/20 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <h4 className="text-2xl font-black mb-2 dark:text-white">{title}</h4>
    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-grow leading-relaxed">{desc}</p>
    
    <div className="flex items-center justify-between mt-auto">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">{count} niveles cargados</span>
      </div>
      {!disabled && (
        <span className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </span>
      )}
    </div>
  </button>
);

export default Home;

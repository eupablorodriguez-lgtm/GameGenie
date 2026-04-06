import { useState } from 'react';
import { Brain, Send } from 'lucide-react';

interface LearnFormProps {
  wrongGame: string;
  onSubmit: (correctGame: string, characteristic: string) => void;
}

export function LearnForm({ wrongGame, onSubmit }: LearnFormProps) {
  const [correctGame, setCorrectGame] = useState('');
  const [characteristic, setCharacteristic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (correctGame.trim() && characteristic.trim()) {
      onSubmit(correctGame.trim(), characteristic.trim());
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fadeInUp">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-violet-500/30 to-fuchsia-500/30 rounded-2xl md:rounded-3xl blur-xl md:blur-2xl animate-pulse"></div>

        <div className="relative glass-effect rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-2xl border-2 border-white/20">
          <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 justify-center">
            <Brain className="text-violet-400" size={40} />
            <h2 className="text-2xl md:text-3xl font-black gradient-text text-center">
              Me ensine!
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            <div>
              <label className="block text-cyan-300 font-black text-base md:text-lg mb-3 uppercase tracking-wide">
                Em que jogo você pensou?
              </label>
              <input
                type="text"
                value={correctGame}
                onChange={(e) => setCorrectGame(e.target.value)}
                placeholder="Digite o nome do jogo..."
                className="w-full bg-white/5 border-2 border-white/20 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-white placeholder-white/40 font-semibold text-base md:text-lg focus:outline-none focus:border-violet-400 focus:bg-white/10 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-cyan-300 font-black text-base md:text-lg mb-3 uppercase tracking-wide">
                O que tem no {correctGame || 'seu jogo'} que não tem no {wrongGame}?
              </label>
              <textarea
                value={characteristic}
                onChange={(e) => setCharacteristic(e.target.value)}
                placeholder="Descreva uma característica única..."
                rows={4}
                className="w-full bg-white/5 border-2 border-white/20 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-white placeholder-white/40 font-semibold text-base md:text-lg focus:outline-none focus:border-violet-400 focus:bg-white/10 transition-all resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 hover:from-blue-400 hover:via-violet-400 hover:to-fuchsia-400 text-white rounded-xl md:rounded-2xl py-5 md:py-6 px-8 font-black text-lg md:text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 uppercase tracking-wider shadow-xl"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

              <div className="relative flex items-center justify-center gap-2 md:gap-3">
                <Send size={22} className="md:w-6 md:h-6" />
                Ensinar ao Genie
              </div>
            </button>
          </form>

          <p className="text-center text-cyan-200/60 text-sm md:text-base font-semibold mt-6">
            O Genie nunca esquece! Obrigado por me ensinar.
          </p>
        </div>
      </div>
    </div>
  );
}


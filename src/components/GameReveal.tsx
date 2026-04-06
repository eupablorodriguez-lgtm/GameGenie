import { Sparkles, Check, X } from 'lucide-react';

interface GameRevealProps {
  gameName: string;
  questionCount: number;
  onGuessCorrect: () => void;
  onGuessWrong: () => void;
}

export function GameReveal({ gameName, questionCount, onGuessCorrect, onGuessWrong }: GameRevealProps) {
  return (
    <div className="w-full max-w-5xl mx-auto animate-scale-in">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/40 via-orange-500/30 to-fuchsia-500/40 rounded-2xl md:rounded-3xl blur-2xl md:blur-3xl animate-pulse"></div>

        <div className="relative glass-effect rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-2xl border-2 border-white/30 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full animate-particle-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 8}s`,
                }}
              />
            ))}
          </div>

          <div className="relative">
            <div className="flex items-center justify-center gap-3 md:gap-5 mb-6 md:mb-10">
              <Sparkles className="text-yellow-300 animate-bounce drop-shadow-2xl" size={36} fill="currentColor" />
              <h2 className="text-4xl md:text-5xl font-black gradient-text text-center drop-shadow-2xl">MIND READ!</h2>
              <Sparkles
                className="text-yellow-300 animate-bounce drop-shadow-2xl"
                size={36}
                fill="currentColor"
                style={{ animationDelay: '0.2s' }}
              />
            </div>

            <div className="relative glass-effect rounded-xl md:rounded-2xl p-6 md:p-10 mb-8 md:mb-10 border-2 border-yellow-400/40 shadow-2xl">
              <p className="text-cyan-300 text-center text-base md:text-lg mb-4 md:mb-6 uppercase tracking-widest font-black">
                O jogo era
              </p>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white text-center mb-6 md:mb-8 drop-shadow-2xl leading-tight px-2">
                {gameName}?
              </h1>

              <p className="text-center text-cyan-200/80 mb-6 md:mb-8 text-sm md:text-base font-semibold px-4">
                Fiz {questionCount} {questionCount === 1 ? 'pergunta' : 'perguntas'} para descobrir!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <button
                  onClick={onGuessCorrect}
                  className="group relative overflow-hidden rounded-xl md:rounded-2xl py-5 md:py-7 px-6 md:px-8 font-black text-lg md:text-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-green-500 to-emerald-600"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>

                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  <div className="relative flex items-center justify-center gap-3 text-white drop-shadow-lg">
                    <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <Check size={24} className="md:w-7 md:h-7 stroke-[3]" />
                    </div>
                    <span className="uppercase tracking-wider">SIM</span>
                  </div>
                </button>

                <button
                  onClick={onGuessWrong}
                  className="group relative overflow-hidden rounded-xl md:rounded-2xl py-5 md:py-7 px-6 md:px-8 font-black text-lg md:text-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-red-500 to-rose-600"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>

                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  <div className="relative flex items-center justify-center gap-3 text-white drop-shadow-lg">
                    <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <X size={24} className="md:w-7 md:h-7 stroke-[3]" />
                    </div>
                    <span className="uppercase tracking-wider">NÃO</span>
                  </div>
                </button>
              </div>
            </div>

            <p className="text-center text-cyan-200/60 text-sm md:text-base font-bold px-4">
              O Genie está sempre aprendendo e melhorando!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

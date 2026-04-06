import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { GameEngine } from './lib/gameEngine';
import { getAllGames, saveGameSession } from './lib/supabase';
import type { Game, Question } from './types/game';

import { Genie } from './components/Genie';
import { QuestionCard } from './components/QuestionCard';
import { GameReveal } from './components/GameReveal';

function App() {
  const [phase, setPhase] = useState<'intro' | 'playing' | 'guessing' | 'reveal'>('intro');
  const [gameEngine, setGameEngine] = useState<GameEngine | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [guessedGame, setGuessedGame] = useState<Game | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [allGames, setAllGames] = useState<Game[]>([]);

  useEffect(() => {
    const init = async () => {
      const games = await getAllGames();
      setAllGames(games);
      setGameEngine(new GameEngine(games));
    };
    init();
  }, []);

  const startGame = async () => {
    if (!gameEngine) return;
    gameEngine.reset();
    setStartTime(Date.now());
    setPhase('playing');
    const next = await gameEngine.getNextQuestion();
    if (next && 'is_question' in next) {
      setCurrentQuestion(next);
    } else if (next) {
      // If the first node is already a game, reveal it immediately
      setGuessedGame(next as Game);
      setPhase('reveal');
      await saveGameSession(next.id, gameEngine.getQuestionCount(), true, (Date.now() - startTime) / 1000);
    }
  };

  const handleAnswer = async (answer: boolean) => {
    if (!gameEngine) return;

    await gameEngine.answerQuestion(answer);
    const next = await gameEngine.getNextQuestion();

    if (next === null) {
      // No more questions, and no game found. This shouldn't happen with a well-formed tree.
      // For now, we'll assume a failure or try to guess the closest game.
      // For this implementation, we'll just reset.
      console.warn("No more questions and no game found. Resetting.");
      setPhase('intro');
      return;
    }

    if ('is_question' in next) {
      setCurrentQuestion(next);
    } else {
      setPhase('guessing');
      // Simulate thinking time
      setTimeout(async () => {
        setGuessedGame(next as Game);
        setPhase('reveal');
        await saveGameSession(next.id, gameEngine.getQuestionCount(), true, (Date.now() - startTime) / 1000);
      }, 2000); // 2 seconds thinking time
    }
  };

  const handlePlayAgain = () => {
    setPhase('intro');
    setGuessedGame(null);
    setCurrentQuestion(null);
    if (gameEngine) {
      gameEngine.reset();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-[url(\'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zz4PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDAgTCA2MCAwIEwgNjAgNjAgTCAwIDYwIFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFmMmU0ZSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaW અપડેટ)Ii8+PC9zdmc+\')] opacity-40"></div>

      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full animate-particle-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
          }}
        />
      ))}

      <div className="relative z-10">
        <header className="py-4 md:py-5 px-4 border-b border-white/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 blur-lg opacity-50"></div>
                <Sparkles size={40} className="md:hidden relative text-cyan-300 drop-shadow-2xl" fill="currentColor" />
                <Sparkles size={48} className="hidden md:block relative text-cyan-300 drop-shadow-2xl" fill="currentColor" />
              </div>
              <div className="text-center">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black gradient-text drop-shadow-2xl leading-tight">
                  GENIE GAME
                </h1>
                <p className="text-cyan-300/90 text-xs md:text-sm font-black tracking-widest uppercase">
                  Ultimate Mind Reader
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 md:py-10">
          <div className="max-w-6xl mx-auto">
            {phase === 'intro' && (
              <div className="flex flex-col items-center gap-8 md:gap-12 animate-fadeInUp">
                <Genie state="idle" />

                <div className="relative max-w-3xl w-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-violet-500/30 rounded-3xl blur-2xl"></div>

                  <div className="relative glass-effect rounded-2xl md:rounded-3xl p-6 md:p-10 border-2 border-white/20 shadow-2xl">
                    <div className="space-y-6 md:space-y-8">
                      <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-black gradient-text mb-2">SUMMON THE GENIE</h2>
                        <p className="text-cyan-300/80 text-sm md:text-base font-bold tracking-wide">
                          Challenge the most powerful mind reading AI
                        </p>
                      </div>

                      <ol className="space-y-4 md:space-y-5">
                        {[
                          {
                            title: 'Think of ANY video game',
                            desc: 'From classics to modern masterpieces',
                          },
                          {
                            title: 'Answer the mystical questions',
                            desc: 'Be honest with your responses',
                          },
                          {
                            title: 'Watch the Genie read your mind!',
                            desc: 'Flawless accuracy, every single time',
                          },
                        ].map((item, i) => (
                          <li key={i} className="flex gap-4 items-start group">
                            <div className="relative flex-shrink-0">
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-violet-500 blur-md opacity-50 group-hover:opacity-70 transition-opacity"></div>
                              <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center font-black text-base md:text-lg text-white drop-shadow-xl group-hover:scale-110 transition-transform">
                                {i + 1}
                              </div>
                            </div>
                            <div className="flex-1 pt-0.5">
                              <p className="text-white font-black text-base md:text-lg mb-0.5">{item.title}</p>
                              <p className="text-cyan-200/60 text-xs md:text-sm font-semibold">{item.desc}</p>
                            </div>
                          </li>
                        ))}
                      </ol>

                      <button
                        onClick={startGame}
                        className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 hover:from-blue-400 hover:via-violet-400 hover:to-fuchsia-400 text-white rounded-xl md:rounded-2xl py-5 md:py-6 px-8 font-black text-lg md:text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 uppercase tracking-wider shadow-xl"
                      >
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                        <div className="relative flex items-center justify-center gap-2 md:gap-3">
                          <Sparkles size={22} fill="currentColor" className="md:w-7 md:h-7" />
                          Awaken the Genie
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {phase === 'playing' && currentQuestion && gameEngine && (
              <div className="space-y-8 md:space-y-10">
                <Genie state="thinking" />
                <QuestionCard
                  question={currentQuestion}
                  onAnswer={handleAnswer}
                  questionNumber={gameEngine.getQuestionCount() + 1}
                />

                <div className="text-center space-y-3">
                  <p className="text-cyan-300 font-black text-lg md:text-xl">
                    <span className="text-blue-400 text-2xl md:text-3xl font-black">{gameEngine.getPossibleGamesCount()}</span>{' '}
                    Games Remaining
                  </p>
                  <div className="w-full max-w-2xl mx-auto h-1.5 md:h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 transition-all duration-500 rounded-full"
                      style={{
                        width: `${Math.max(5, Math.min(100, (gameEngine.getPossibleGamesCount() / allGames.length) * 100))}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {phase === 'guessing' && (
              <div className="animate-scale-in">
                <Genie state="guessing" />
              </div>
            )}

            {phase === 'reveal' && guessedGame && (
              <div className="space-y-8 md:space-y-10">
                <Genie state="victory" />
                <GameReveal
                  game={guessedGame}
                  questionCount={gameEngine ? gameEngine.getQuestionCount() : 0}
                  onPlayAgain={handlePlayAgain}
                />
              </div>
            )}
          </div>
        </main>

        <footer className="py-4 md:py-6 text-center text-cyan-300/50 text-xs md:text-sm border-t border-white/10">
          <p className="font-bold tracking-widest uppercase">GENIE GAME • Undefeated Mind Reader</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

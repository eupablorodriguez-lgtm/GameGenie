import { useState, useEffect } from 'react';
import { Genie } from './components/Genie';
import { QuestionCard } from './components/QuestionCard';
import { GameReveal } from './components/GameReveal';
import { getAllGames, saveGameSession } from './lib/supabase';
import { GameEngine } from './lib/gameEngine';
import type { Game, Question } from './types/game';
import { Loader2, Sparkles } from 'lucide-react';

type GamePhase = 'loading' | 'intro' | 'playing' | 'guessing' | 'reveal';

function App() {
  const [phase, setPhase] = useState<GamePhase>('loading');
  const [gameEngine, setGameEngine] = useState<GameEngine | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [guessedGame, setGuessedGame] = useState<Game | null>(null);
  const [startTime, setStartTime] = useState<number>(0);

  useEffect(() => {
    initializeGame();
  }, []);

  async function initializeGame() {
    setPhase('loading');
    const games = await getAllGames();

    if (games.length === 0) {
      console.error('No games found in database');
      return;
    }

    const engine = new GameEngine(games);
    setGameEngine(engine);
    setPhase('intro');
  }

  function startGame() {
    if (!gameEngine) return;

    setStartTime(Date.now());
    setPhase('playing');
    askNextQuestion();
  }

  function askNextQuestion() {
    if (!gameEngine) return;

    const question = gameEngine.getBestQuestion();

    if (!question || gameEngine.getPossibleGamesCount() <= 1) {
      makeGuess();
      return;
    }

    setCurrentQuestion(question);
  }

  function handleAnswer(answer: boolean) {
    if (!gameEngine || !currentQuestion) return;

    gameEngine.answerQuestion(currentQuestion, answer);

    if (gameEngine.getPossibleGamesCount() <= 1) {
      makeGuess();
    } else {
      askNextQuestion();
    }
  }

  function makeGuess() {
    if (!gameEngine) return;

    setPhase('guessing');

    setTimeout(() => {
      const guess = gameEngine.getFinalGuess();
      setGuessedGame(guess);
      setPhase('reveal');

      const duration = Math.floor((Date.now() - startTime) / 1000);
      if (guess) {
        saveGameSession(guess.id, gameEngine.getQuestionCount(), true, duration);
      }
    }, 2800);
  }

  function handlePlayAgain() {
    if (!gameEngine) {
      initializeGame();
      return;
    }

    getAllGames().then(games => {
      gameEngine.reset(games);
      setCurrentQuestion(null);
      setGuessedGame(null);
      setPhase('intro');
    });
  }

  if (phase === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-violet-900 flex items-center justify-center overflow-hidden relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.75s' }}></div>
        </div>

        <div className="relative flex flex-col items-center gap-8 z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 blur-2xl opacity-50 rounded-full"></div>
            <Loader2 size={100} className="relative text-blue-300 animate-spin drop-shadow-2xl" />
          </div>
          <div className="text-center">
            <p className="text-cyan-300 text-3xl font-black tracking-wider mb-2">INITIALIZING GENIE...</p>
            <p className="text-blue-400/70 text-sm font-bold tracking-widest">Channeling psychic energies</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-violet-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-blue-600/40 to-transparent blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-violet-600/30 to-transparent blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-fuchsia-600/20 blur-3xl rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDAgTCA2MCAwIEwgNjAgNjAgTCAwIDYwIFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFmMmU0ZSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

      {[...Array(30)].map((_, i) => (
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
        <header className="py-8 px-4 border-b border-white/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 blur-xl opacity-50"></div>
                <Sparkles size={64} className="relative text-cyan-300 drop-shadow-2xl" fill="currentColor" />
              </div>
              <div className="text-center">
                <h1 className="text-6xl md:text-8xl font-black gradient-text drop-shadow-2xl leading-tight">
                  GENIE GAME
                </h1>
                <p className="text-cyan-300/90 text-sm md:text-base font-black tracking-widest uppercase mt-1">
                  The Ultimate Mind Reading Oracle
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {phase === 'intro' && (
              <div className="flex flex-col items-center gap-14 animate-fadeInUp">
                <Genie state="idle" />

                <div className="relative max-w-3xl w-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-violet-500/30 rounded-3xl blur-2xl"></div>

                  <div className="relative glass-effect rounded-3xl p-12 border-2 border-white/20 shadow-2xl">
                    <div className="space-y-10">
                      <div className="text-center">
                        <h2 className="text-5xl font-black gradient-text mb-3">SUMMON THE GENIE</h2>
                        <p className="text-cyan-300/80 text-base font-bold tracking-wide">
                          Challenge the most powerful mind reading AI ever created
                        </p>
                      </div>

                      <ol className="space-y-6">
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
                          <li key={i} className="flex gap-5 items-start group">
                            <div className="relative flex-shrink-0">
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-violet-500 blur-lg opacity-50 group-hover:opacity-70 transition-opacity"></div>
                              <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center font-black text-lg text-white drop-shadow-xl group-hover:scale-110 transition-transform">
                                {i + 1}
                              </div>
                            </div>
                            <div className="flex-1 pt-1">
                              <p className="text-white font-black text-lg mb-1">{item.title}</p>
                              <p className="text-cyan-200/60 text-sm font-semibold">{item.desc}</p>
                            </div>
                          </li>
                        ))}
                      </ol>

                      <button
                        onClick={startGame}
                        className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 hover:from-blue-400 hover:via-violet-400 hover:to-fuchsia-400 text-white rounded-2xl py-7 px-10 font-black text-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 uppercase tracking-wider shadow-xl"
                      >
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                        <div className="relative flex items-center justify-center gap-3">
                          <Sparkles size={28} fill="currentColor" />
                          Awaken the Genie
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {phase === 'playing' && currentQuestion && (
              <div className="space-y-12">
                <Genie state="thinking" />
                <QuestionCard
                  question={currentQuestion}
                  onAnswer={handleAnswer}
                  questionNumber={gameEngine?.getQuestionCount() || 1}
                />

                {gameEngine && (
                  <div className="text-center space-y-4">
                    <p className="text-cyan-300 font-black text-xl">
                      <span className="text-blue-400 text-3xl font-black">{gameEngine.getPossibleGamesCount()}</span>{' '}
                      Games Remaining
                    </p>
                    <div className="w-full max-w-2xl mx-auto h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 transition-all duration-500 rounded-full"
                        style={{
                          width: `${Math.max(5, Math.min(100, (gameEngine.getPossibleGamesCount() / 150) * 100))}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {phase === 'guessing' && (
              <div className="animate-scale-in">
                <Genie state="guessing" />
              </div>
            )}

            {phase === 'reveal' && guessedGame && (
              <div className="space-y-12">
                <Genie state="victory" />
                <GameReveal
                  game={guessedGame}
                  questionCount={gameEngine?.getQuestionCount() || 0}
                  onPlayAgain={handlePlayAgain}
                />
              </div>
            )}
          </div>
        </main>

        <footer className="py-8 text-center text-cyan-300/50 text-sm border-t border-white/10">
          <p className="font-bold tracking-widest uppercase">GENIE GAME • Undefeated Mind Reader</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

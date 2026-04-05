import { useState, useEffect } from 'react';
import { Genie } from './components/Genie';
import { QuestionCard } from './components/QuestionCard';
import { GameReveal } from './components/GameReveal';
import { getAllGames, saveGameSession } from './lib/supabase';
import { GameEngine } from './lib/gameEngine';
import type { Game, Question } from './types/game';
import { Loader2, Wand2 } from 'lucide-react';

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
    }, 2500);
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
      <div className="min-h-screen bg-gradient-to-br from-amber-950 via-orange-950 to-red-950 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative flex flex-col items-center gap-6 z-10">
          <div className="relative">
            <Loader2 size={80} className="text-amber-300 animate-spin drop-shadow-2xl" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-400 animate-spin" style={{ animationDuration: '3s' }}></div>
          </div>
          <div className="text-center">
            <p className="text-amber-300 text-2xl font-black tracking-wider">AWAKENING THE GENIE...</p>
            <p className="text-orange-400/60 text-sm mt-2 font-semibold">Channeling mystical powers</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-orange-600/40 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-amber-600/30 to-transparent blur-3xl"></div>
      </div>

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImZpcmUiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDAgTCA4MCAwIEwgODAgODAgTCAwIDgwIFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzc0NTQxOCIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZmlyZSkiLz48L3N2Zz4=')] opacity-20"></div>

      <div className="relative z-10">
        <header className="py-6 px-4 border-b border-orange-500/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center gap-3">
              <div className="relative">
                <Wand2 size={54} className="text-orange-300 drop-shadow-lg" />
                <div className="absolute inset-0 text-orange-400 animate-pulse" style={{ filter: 'blur(1px)' }}>
                  <Wand2 size={54} />
                </div>
              </div>
              <div>
                <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-red-400 drop-shadow-lg leading-tight">
                  GENIE GAME
                </h1>
                <p className="text-orange-300/80 text-sm font-bold tracking-widest uppercase">The Mind Reading Prophecy</p>
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {phase === 'intro' && (
              <div className="flex flex-col items-center gap-12 animate-scale-in">
                <Genie state="idle" />

                <div className="relative max-w-2xl w-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-3xl blur-xl"></div>
                  <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-950/98 backdrop-blur-xl rounded-3xl p-10 border-2 border-orange-500/40 shadow-2xl">
                    <div className="space-y-8">
                      <div>
                        <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-amber-300 mb-2">
                          SUMMON THE GENIE
                        </h2>
                        <p className="text-orange-300/60 text-sm font-semibold">Challenge the mystical powers of mind reading</p>
                      </div>

                      <ol className="space-y-4">
                        <li className="flex gap-4 items-start group">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center font-black text-sm text-white drop-shadow-lg group-hover:scale-110 transition-transform">
                            1
                          </div>
                          <div>
                            <p className="text-white font-semibold">Think of ANY video game</p>
                            <p className="text-orange-300/50 text-sm">From retro classics to latest releases</p>
                          </div>
                        </li>
                        <li className="flex gap-4 items-start group">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center font-black text-sm text-white drop-shadow-lg group-hover:scale-110 transition-transform">
                            2
                          </div>
                          <div>
                            <p className="text-white font-semibold">Answer my mystical questions</p>
                            <p className="text-orange-300/50 text-sm">Be truthful with your responses</p>
                          </div>
                        </li>
                        <li className="flex gap-4 items-start group">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center font-black text-sm text-white drop-shadow-lg group-hover:scale-110 transition-transform">
                            3
                          </div>
                          <div>
                            <p className="text-white font-semibold">I WILL READ YOUR MIND!</p>
                            <p className="text-orange-300/50 text-sm">The Genie never fails to divine your choice</p>
                          </div>
                        </li>
                      </ol>

                      <button
                        onClick={startGame}
                        className="w-full group relative overflow-hidden bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-400 hover:via-amber-400 hover:to-orange-500 text-white rounded-2xl py-5 px-8 font-black text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 uppercase tracking-wider drop-shadow-lg"
                      >
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        <div className="relative flex items-center justify-center gap-2">
                          <Wand2 size={24} />
                          Awaken the Genie
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {phase === 'playing' && currentQuestion && (
              <div className="space-y-10">
                <Genie state="thinking" />
                <QuestionCard
                  question={currentQuestion}
                  onAnswer={handleAnswer}
                  questionNumber={gameEngine?.getQuestionCount() || 1}
                />

                {gameEngine && (
                  <div className="text-center space-y-2">
                    <p className="text-orange-300/80 font-bold text-lg">
                      <span className="text-orange-400 text-2xl font-black">{gameEngine.getPossibleGamesCount()}</span> Possible Games
                    </p>
                    <div className="w-full max-w-md mx-auto h-1 bg-orange-900/40 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-500"
                        style={{
                          width: `${Math.max(10, (Math.min(150, gameEngine.getPossibleGamesCount()) / 150) * 100)}%`,
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
              <div className="space-y-10">
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

        <footer className="py-6 text-center text-orange-300/40 text-sm border-t border-orange-500/20">
          <p className="font-semibold tracking-wide">GENIE GAME • THE INFINITE ORACLE</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

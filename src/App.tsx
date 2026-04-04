import { useState, useEffect } from 'react';
import { Genie } from './components/Genie';
import { QuestionCard } from './components/QuestionCard';
import { GameReveal } from './components/GameReveal';
import { getAllGames, saveGameSession } from './lib/supabase';
import { GameEngine } from './lib/gameEngine';
import type { Game, Question } from './types/game';
import { Loader2, Gamepad2 } from 'lucide-react';

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
    }, 2000);
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
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={64} className="text-cyan-400 animate-spin" />
          <p className="text-white text-xl font-medium">Loading game database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjA1Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50"></div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <header className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-4">
              <Gamepad2 size={48} className="text-cyan-400" />
              <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Game Mind Reader
              </h1>
            </div>
            <p className="text-center text-cyan-300/60 mt-2 text-lg">
              Think of any game... I will read your mind! 🔮
            </p>
          </div>
        </header>

        <main className="px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {phase === 'intro' && (
              <div className="flex flex-col items-center gap-8 animate-scale-in">
                <Genie state="idle" />

                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl p-12 max-w-2xl border border-cyan-500/30 shadow-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6 text-center">
                    How to Play
                  </h2>
                  <ol className="space-y-4 text-white/80 text-lg mb-8">
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-sm">
                        1
                      </span>
                      <span>Think of any video game</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-sm">
                        2
                      </span>
                      <span>Answer my questions honestly</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-sm">
                        3
                      </span>
                      <span>Watch as I read your mind!</span>
                    </li>
                  </ol>

                  <button
                    onClick={startGame}
                    className="w-full group relative overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 text-white rounded-2xl py-6 px-8 font-black text-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95"
                  >
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <div className="relative">Start Reading My Mind!</div>
                  </button>
                </div>
              </div>
            )}

            {phase === 'playing' && currentQuestion && (
              <div className="space-y-8">
                <Genie state="thinking" message="Hmm, interesting... Let me ask you this..." />
                <QuestionCard
                  question={currentQuestion}
                  onAnswer={handleAnswer}
                  questionNumber={gameEngine?.getQuestionCount() || 0 + 1}
                />

                {gameEngine && (
                  <div className="text-center">
                    <p className="text-cyan-300/60 text-sm">
                      Possible games remaining: {gameEngine.getPossibleGamesCount()}
                    </p>
                  </div>
                )}
              </div>
            )}

            {phase === 'guessing' && (
              <div className="animate-scale-in">
                <Genie state="guessing" message="I've got it! I know exactly what game you're thinking of!" />
              </div>
            )}

            {phase === 'reveal' && guessedGame && (
              <div className="space-y-8">
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

        <footer className="py-8 text-center text-white/40 text-sm">
          <p>Game Mind Reader • Powered by AI Magic ✨</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

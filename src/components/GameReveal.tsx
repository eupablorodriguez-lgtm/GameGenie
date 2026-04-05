import { Sparkles, RotateCcw, Share2, Trophy, Target, Zap } from 'lucide-react';
import type { Game } from '../types/game';

interface GameRevealProps {
  game: Game;
  questionCount: number;
  onPlayAgain: () => void;
}

export function GameReveal({ game, questionCount, onPlayAgain }: GameRevealProps) {
  const handleShare = () => {
    const text = `🎮 The GENIE read my mind PERFECTLY! I was thinking of "${game.name}" and it guessed it in ${questionCount} questions! Can you challenge the Genie? 🔮`;
    if (navigator.share) {
      navigator.share({
        title: 'GENIE GAME - Mind Reading Challenge',
        text,
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('Copied to clipboard! Share your result!');
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto animate-scale-in">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/40 via-orange-500/30 to-fuchsia-500/40 rounded-3xl blur-3xl animate-pulse"></div>

        <div className="relative glass-effect rounded-3xl p-14 shadow-2xl border-2 border-white/30 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            {[...Array(20)].map((_, i) => (
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
            <div className="flex items-center justify-center gap-6 mb-12">
              <Sparkles className="text-yellow-300 animate-bounce drop-shadow-2xl" size={56} fill="currentColor" />
              <h2 className="text-6xl font-black gradient-text text-center drop-shadow-2xl">MIND READ!</h2>
              <Sparkles
                className="text-yellow-300 animate-bounce drop-shadow-2xl"
                size={56}
                fill="currentColor"
                style={{ animationDelay: '0.2s' }}
              />
            </div>

            <div className="relative glass-effect rounded-2xl p-12 mb-10 border-2 border-yellow-400/40 shadow-2xl">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-50"></div>
                  <Trophy className="relative text-yellow-300 drop-shadow-2xl" size={48} fill="currentColor" />
                </div>
              </div>

              <p className="text-cyan-300 text-center text-lg mb-8 uppercase tracking-widest font-black">
                Your Thought Revealed
              </p>

              <h1 className="text-6xl md:text-7xl font-black text-white text-center mb-6 drop-shadow-2xl leading-tight">
                {game.name}
              </h1>

              <div className="flex flex-wrap items-center justify-center gap-4 text-white/90 text-base md:text-lg font-bold">
                {game.year && (
                  <span className="glass-effect px-4 py-2 rounded-full border border-white/20">{game.year}</span>
                )}
                {game.developer && (
                  <>
                    <span className="text-blue-400">•</span>
                    <span className="glass-effect px-4 py-2 rounded-full border border-white/20">{game.developer}</span>
                  </>
                )}
                {game.primary_genre && (
                  <>
                    <span className="text-violet-400">•</span>
                    <span className="glass-effect px-4 py-2 rounded-full border border-white/20">
                      {game.primary_genre}
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
                <div className="relative glass-effect rounded-2xl p-8 border-2 border-blue-400/40 text-center transform group-hover:scale-105 transition-transform">
                  <Target className="mx-auto mb-3 text-blue-300" size={40} />
                  <p className="text-blue-200/70 text-xs uppercase font-black mb-2 tracking-widest">Questions</p>
                  <p className="text-5xl font-black text-blue-300 drop-shadow-lg">{questionCount}</p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
                <div className="relative glass-effect rounded-2xl p-8 border-2 border-violet-400/40 text-center transform group-hover:scale-105 transition-transform">
                  <Zap className="mx-auto mb-3 text-violet-300" size={40} />
                  <p className="text-violet-200/70 text-xs uppercase font-black mb-2 tracking-widest">Mind Power</p>
                  <p className="text-5xl font-black text-violet-300 drop-shadow-lg">∞</p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-green-500/30 rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
                <div className="relative glass-effect rounded-2xl p-8 border-2 border-emerald-400/40 text-center transform group-hover:scale-105 transition-transform">
                  <Trophy className="mx-auto mb-3 text-emerald-300" size={40} />
                  <p className="text-emerald-200/70 text-xs uppercase font-black mb-2 tracking-widest">Accuracy</p>
                  <p className="text-5xl font-black text-emerald-300 drop-shadow-lg">100%</p>
                </div>
              </div>
            </div>

            <p className="text-center text-cyan-200 mb-12 text-xl font-bold">
              The Genie's powers remain undefeated. Every thought is transparent.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={onPlayAgain}
                className="group relative overflow-hidden rounded-2xl py-6 px-8 font-black text-xl transition-all duration-300 transform hover:scale-105 active:scale-95 uppercase tracking-wider"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-violet-500 to-fuchsia-500"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>

                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                <div className="relative flex items-center justify-center gap-3 text-white drop-shadow-lg">
                  <RotateCcw size={28} />
                  Challenge Again
                </div>
              </button>

              <button
                onClick={handleShare}
                className="group relative overflow-hidden rounded-2xl py-6 px-8 font-black text-xl transition-all duration-300 transform hover:scale-105 active:scale-95 uppercase tracking-wider"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>

                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                <div className="relative flex items-center justify-center gap-3 text-white drop-shadow-lg">
                  <Share2 size={28} />
                  Share Result
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

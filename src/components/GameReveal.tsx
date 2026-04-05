import { Sparkles, RotateCcw, Share2, Crown } from 'lucide-react';
import type { Game } from '../types/game';

interface GameRevealProps {
  game: Game;
  questionCount: number;
  onPlayAgain: () => void;
}

export function GameReveal({ game, questionCount, onPlayAgain }: GameRevealProps) {
  const handleShare = () => {
    const text = `The Genie read my mind perfectly! I was thinking of "${game.name}" and it guessed it in ${questionCount} questions! Can you challenge the Genie? 🔮✨ #GenieGame`;
    if (navigator.share) {
      navigator.share({
        title: 'Genie Game',
        text,
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-scale-in">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/30 to-orange-500/20 rounded-3xl blur-2xl animate-pulse"></div>

        <div className="relative bg-gradient-to-br from-yellow-950 via-orange-950 to-red-950 rounded-3xl p-12 shadow-2xl border-3 border-yellow-400/60 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative">
            <div className="flex items-center justify-center gap-6 mb-10">
              <Sparkles className="text-yellow-300 animate-bounce drop-shadow-lg" size={48} fill="currentColor" />
              <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-400 text-center drop-shadow-lg">
                GENIE TRIUMPH!
              </h2>
              <Sparkles className="text-yellow-300 animate-bounce drop-shadow-lg" size={48} fill="currentColor" style={{ animationDelay: '0.2s' }} />
            </div>

            <div className="bg-gradient-to-br from-black/60 to-slate-900/80 backdrop-blur-sm rounded-2xl p-10 mb-8 border-2 border-yellow-400/40 shadow-xl">
              <p className="text-yellow-300/80 text-center text-lg mb-6 uppercase tracking-wider font-bold">
                Your Thoughts Revealed
              </p>

              <div className="flex items-center justify-center gap-3 mb-6">
                <Crown className="text-yellow-400 drop-shadow-lg" size={40} fill="currentColor" />
                <h1 className="text-5xl md:text-6xl font-black text-white text-center drop-shadow-xl">
                  {game.name}
                </h1>
                <Crown className="text-yellow-400 drop-shadow-lg" size={40} fill="currentColor" />
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 text-white/70 text-sm md:text-base font-semibold">
                {game.year && <span className="bg-orange-500/30 px-3 py-1 rounded-full">{game.year}</span>}
                {game.developer && (
                  <>
                    <span className="text-yellow-400/60">•</span>
                    <span className="bg-orange-500/30 px-3 py-1 rounded-full">{game.developer}</span>
                  </>
                )}
                {game.primary_genre && (
                  <>
                    <span className="text-yellow-400/60">•</span>
                    <span className="bg-orange-500/30 px-3 py-1 rounded-full">{game.primary_genre}</span>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              <div className="bg-gradient-to-br from-emerald-500/20 to-green-600/20 backdrop-blur-sm rounded-xl p-6 border-2 border-emerald-400/40 text-center">
                <p className="text-emerald-300/60 text-xs uppercase font-bold mb-2 tracking-widest">Questions Used</p>
                <p className="text-4xl font-black text-emerald-300 drop-shadow-lg">{questionCount}</p>
              </div>

              <div className="bg-gradient-to-br from-yellow-500/20 to-amber-600/20 backdrop-blur-sm rounded-xl p-6 border-2 border-yellow-400/40 text-center">
                <p className="text-yellow-300/60 text-xs uppercase font-bold mb-2 tracking-widest">Mind Power</p>
                <p className="text-4xl font-black text-yellow-300 drop-shadow-lg">∞</p>
              </div>

              <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 backdrop-blur-sm rounded-xl p-6 border-2 border-orange-400/40 text-center">
                <p className="text-orange-300/60 text-xs uppercase font-bold mb-2 tracking-widest">Accuracy</p>
                <p className="text-4xl font-black text-orange-300 drop-shadow-lg">100%</p>
              </div>
            </div>

            <p className="text-center text-yellow-300/70 mb-10 text-lg font-bold">
              The Genie's mystical powers have once again proven INFALLIBLE!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={onPlayAgain}
                className="group relative overflow-hidden rounded-2xl py-5 px-6 font-black text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 uppercase tracking-wider"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-600 group-hover:from-orange-400 group-hover:to-amber-500 transition-all duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative flex items-center justify-center gap-2 text-white drop-shadow-lg">
                  <RotateCcw size={24} />
                  Challenge Again
                </div>
              </button>

              <button
                onClick={handleShare}
                className="group relative overflow-hidden rounded-2xl py-5 px-6 font-black text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 uppercase tracking-wider"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-orange-600 group-hover:from-yellow-400 group-hover:to-orange-500 transition-all duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative flex items-center justify-center gap-2 text-white drop-shadow-lg">
                  <Share2 size={24} />
                  Share Victory
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

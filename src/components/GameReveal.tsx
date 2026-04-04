import { Sparkles, RotateCcw, Share2 } from 'lucide-react';
import type { Game } from '../types/game';

interface GameRevealProps {
  game: Game;
  questionCount: number;
  onPlayAgain: () => void;
}

export function GameReveal({ game, questionCount, onPlayAgain }: GameRevealProps) {
  const handleShare = () => {
    const text = `I tried the Game Mind Reader and it guessed my game "${game.name}" in just ${questionCount} questions! Can you beat that? 🎮🔮`;
    if (navigator.share) {
      navigator.share({
        title: 'Game Mind Reader',
        text,
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-scale-in">
      <div className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900 rounded-3xl p-12 shadow-2xl border-2 border-yellow-400/50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

        <div className="relative">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Sparkles className="text-yellow-400 animate-bounce" size={40} fill="currentColor" />
            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 text-center">
              I READ YOUR MIND!
            </h2>
            <Sparkles className="text-yellow-400 animate-bounce delay-100" size={40} fill="currentColor" />
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/10">
            <p className="text-white/70 text-center text-lg mb-4">
              You were thinking of...
            </p>
            <h1 className="text-6xl font-black text-white text-center mb-4 drop-shadow-lg">
              {game.name}
            </h1>
            <div className="flex items-center justify-center gap-6 text-white/60 text-sm">
              <span>{game.year}</span>
              <span>•</span>
              <span>{game.developer}</span>
              <span>•</span>
              <span>{game.primary_genre}</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl p-6 mb-8 backdrop-blur-sm border border-white/10">
            <p className="text-white text-center text-xl">
              <span className="font-bold text-yellow-400">{questionCount}</span> questions answered
            </p>
            <p className="text-white/60 text-center mt-2">
              I never fail! 🎯
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={onPlayAgain}
              className="group relative overflow-hidden bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-2xl py-4 px-6 font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center gap-2">
                <RotateCcw size={24} />
                <span>Play Again</span>
              </div>
            </button>

            <button
              onClick={handleShare}
              className="group relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white rounded-2xl py-4 px-6 font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center gap-2">
                <Share2 size={24} />
                <span>Share</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

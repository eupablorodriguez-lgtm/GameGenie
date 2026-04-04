import { Brain, Sparkles, Zap } from 'lucide-react';

interface GenieProps {
  state: 'idle' | 'thinking' | 'guessing' | 'victory';
  message?: string;
}

export function Genie({ state, message }: GenieProps) {
  return (
    <div className="flex flex-col items-center gap-6 mb-8">
      <div className="relative">
        <div
          className={`w-40 h-40 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center shadow-2xl ${
            state === 'thinking' ? 'animate-pulse' : ''
          } ${state === 'victory' ? 'animate-bounce' : ''} transition-all duration-300`}
        >
          {state === 'thinking' && (
            <div className="absolute inset-0 rounded-full bg-white opacity-30 animate-ping"></div>
          )}

          {state === 'victory' && (
            <>
              <div className="absolute -top-4 -left-4 text-yellow-400 animate-bounce">
                <Sparkles size={32} fill="currentColor" />
              </div>
              <div className="absolute -top-4 -right-4 text-yellow-400 animate-bounce delay-100">
                <Sparkles size={32} fill="currentColor" />
              </div>
            </>
          )}

          {state === 'thinking' ? (
            <Brain size={80} className="text-white animate-spin-slow" />
          ) : state === 'guessing' ? (
            <Zap size={80} className="text-yellow-300" />
          ) : (
            <Brain size={80} className="text-white" />
          )}
        </div>

        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-12 bg-gradient-to-b from-purple-600/50 to-transparent blur-xl rounded-full"></div>
      </div>

      <div className="relative bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl px-8 py-6 shadow-2xl border border-cyan-500/30 max-w-2xl">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-slate-800 to-slate-900 rotate-45 border-l border-t border-cyan-500/30"></div>

        <p className="text-white text-center text-lg font-medium leading-relaxed">
          {message || getDefaultMessage(state)}
        </p>
      </div>
    </div>
  );
}

function getDefaultMessage(state: string): string {
  switch (state) {
    case 'idle':
      return "Think of any game... I will read your mind and guess it! 🎮";
    case 'thinking':
      return "Let me dive deep into your thoughts...";
    case 'guessing':
      return "I'm about to reveal the game in your mind!";
    case 'victory':
      return "I KNEW IT! I can read minds! 🎯";
    default:
      return "Ready to play?";
  }
}

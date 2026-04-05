import { Brain, Sparkles, Zap, Eye } from 'lucide-react';

interface GenieProps {
  state: 'idle' | 'thinking' | 'guessing' | 'victory';
  message?: string;
}

export function Genie({ state, message }: GenieProps) {
  return (
    <div className="flex flex-col items-center gap-8 mb-12">
      <div className="relative">
        <div className="relative w-52 h-52">
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-br from-amber-300 via-orange-400 to-red-500 flex items-center justify-center shadow-2xl transition-all duration-500 ${
              state === 'thinking' ? 'animate-[pulse_2s_ease-in-out_infinite] scale-110' : ''
            } ${state === 'victory' ? 'animate-bounce scale-105' : ''}`}
          >
            {state === 'thinking' && (
              <>
                <div className="absolute inset-2 rounded-full border-4 border-white/20 animate-spin-slow"></div>
                <div className="absolute inset-4 rounded-full border-2 border-white/10 animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
              </>
            )}

            {state === 'victory' && (
              <>
                <div className="absolute -top-6 -left-6 text-yellow-300 animate-bounce" style={{ animationDelay: '0s' }}>
                  <Sparkles size={40} fill="currentColor" />
                </div>
                <div className="absolute -top-6 -right-6 text-yellow-300 animate-bounce" style={{ animationDelay: '0.2s' }}>
                  <Sparkles size={40} fill="currentColor" />
                </div>
                <div className="absolute -bottom-6 -left-6 text-yellow-300 animate-bounce" style={{ animationDelay: '0.4s' }}>
                  <Sparkles size={40} fill="currentColor" />
                </div>
                <div className="absolute -bottom-6 -right-6 text-yellow-300 animate-bounce" style={{ animationDelay: '0.6s' }}>
                  <Sparkles size={40} fill="currentColor" />
                </div>
              </>
            )}

            <div className="flex flex-col items-center justify-center gap-2">
              {state === 'thinking' && (
                <>
                  <Brain size={100} className="text-white drop-shadow-lg animate-spin-slow" />
                  <div className="text-white text-sm font-bold tracking-widest animate-pulse">READING...</div>
                </>
              )}
              {state === 'guessing' && (
                <>
                  <Eye size={100} className="text-yellow-100 drop-shadow-lg animate-pulse" />
                  <div className="text-white text-sm font-bold tracking-widest">LOCKED...</div>
                </>
              )}
              {state === 'victory' && (
                <>
                  <Zap size={100} className="text-yellow-100 drop-shadow-lg animate-bounce" />
                  <div className="text-white text-sm font-bold tracking-widest">FOUND!</div>
                </>
              )}
              {state === 'idle' && (
                <>
                  <Brain size={100} className="text-white drop-shadow-lg" />
                  <div className="text-white text-xs font-bold tracking-widest opacity-60">GENIE MODE</div>
                </>
              )}
            </div>
          </div>

          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-40 h-16 bg-gradient-to-t from-orange-500/40 via-orange-500/20 to-transparent blur-2xl rounded-full"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent"></div>
        </div>
      </div>

      <div className="relative max-w-3xl w-full px-4">
        <div className="relative bg-gradient-to-br from-slate-900/95 via-blue-900/50 to-slate-900/95 rounded-3xl px-8 py-6 shadow-2xl border-2 border-orange-400/40 backdrop-blur-xl">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full border-2 border-slate-900"></div>
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/10 via-transparent to-transparent pointer-events-none"></div>

          <p className="relative text-white text-center text-xl font-semibold leading-relaxed">
            {message || getDefaultMessage(state)}
          </p>
        </div>
      </div>
    </div>
  );
}

function getDefaultMessage(state: string): string {
  switch (state) {
    case 'idle':
      return "I am GENIE... Think of any game in the universe. I will penetrate your mind and divine your choice.";
    case 'thinking':
      return "Your thoughts are becoming clear... I see the patterns... the genres... the mechanics...";
    case 'guessing':
      return "The visions crystallize... I see it now... The game reveals itself to me!";
    case 'victory':
      return "YES! I HAVE READ YOUR MIND PERFECTLY! THE GENIE IS INFALLIBLE!";
    default:
      return "Ready to challenge the Genie?";
  }
}

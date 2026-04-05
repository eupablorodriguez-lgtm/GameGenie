import { Brain, Sparkles, Zap, Eye, Star as Stars } from 'lucide-react';

interface GenieProps {
  state: 'idle' | 'thinking' | 'guessing' | 'victory';
  message?: string;
}

export function Genie({ state, message }: GenieProps) {
  return (
    <div className="flex flex-col items-center gap-10 mb-14">
      <div className="relative">
        <div className="absolute inset-0 animate-pulse">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-violet-400"
              style={{
                transform: `rotate(${i * 30}deg) translateY(-140px)`,
                animation: `orbit ${15 + i}s linear infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        <div className="relative w-64 h-64">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-violet-500 to-fuchsia-500 opacity-30 blur-3xl animate-pulse"></div>

          <div
            className={`relative w-64 h-64 rounded-full bg-gradient-to-br from-blue-600 via-violet-600 to-fuchsia-600 flex items-center justify-center shadow-2xl transform transition-all duration-700 ${
              state === 'thinking' ? 'scale-110 animate-glow-pulse' : ''
            } ${state === 'victory' ? 'scale-105 animate-bounce' : ''} ${
              state === 'guessing' ? 'scale-110' : ''
            }`}
          >
            <div className="absolute inset-2 rounded-full border-2 border-white/10"></div>
            <div className="absolute inset-4 rounded-full border border-white/5"></div>

            {state === 'thinking' && (
              <>
                <div className="absolute inset-6 rounded-full border-2 border-white/20 animate-spin-slow"></div>
                <div
                  className="absolute inset-8 rounded-full border-2 border-white/15 animate-spin-slow"
                  style={{ animationDirection: 'reverse', animationDuration: '6s' }}
                ></div>
              </>
            )}

            {state === 'victory' && (
              <>
                {[...Array(8)].map((_, i) => (
                  <Sparkles
                    key={i}
                    className="absolute text-yellow-300 animate-bounce"
                    size={36}
                    fill="currentColor"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${i * 45}deg) translateY(-110px)`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </>
            )}

            <div className="relative z-10 flex flex-col items-center justify-center gap-3">
              {state === 'thinking' && (
                <>
                  <Brain size={100} className="text-white drop-shadow-2xl animate-pulse" />
                  <div className="text-white text-sm font-black tracking-widest bg-black/30 px-4 py-1 rounded-full">
                    ANALYZING...
                  </div>
                </>
              )}
              {state === 'guessing' && (
                <>
                  <Eye size={100} className="text-cyan-100 drop-shadow-2xl animate-pulse" />
                  <div className="text-white text-sm font-black tracking-widest bg-black/30 px-4 py-1 rounded-full">
                    REVEALING...
                  </div>
                </>
              )}
              {state === 'victory' && (
                <>
                  <Zap size={110} className="text-yellow-200 drop-shadow-2xl animate-bounce" fill="currentColor" />
                  <div className="text-white text-sm font-black tracking-widest bg-black/30 px-4 py-1 rounded-full">
                    PREDICTED!
                  </div>
                </>
              )}
              {state === 'idle' && (
                <>
                  <Stars size={100} className="text-white drop-shadow-2xl" />
                  <div className="text-white/60 text-xs font-black tracking-widest">READY</div>
                </>
              )}
            </div>

            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-white/10 to-transparent pointer-events-none"></div>
          </div>

          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-20 bg-gradient-to-t from-violet-500/50 via-violet-500/25 to-transparent blur-3xl rounded-full"></div>
        </div>
      </div>

      <div className="relative max-w-4xl w-full px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-fuchsia-500/20 blur-xl rounded-3xl"></div>

        <div className="relative glass-effect rounded-3xl px-10 py-8 shadow-2xl border border-white/20">
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-blue-400 to-violet-500 rounded-full border-4 border-slate-900 shadow-lg"></div>

          <p className="relative text-white text-center text-2xl font-bold leading-relaxed">
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
      return 'I am the GENIE. Think of ANY game across all of existence. I will read your mind with absolute precision.';
    case 'thinking':
      return 'Your thoughts become clear to me... The patterns emerge... Genre, mechanics, setting... I see it all...';
    case 'guessing':
      return 'The answer crystallizes before me... Your mind reveals the truth... The game is known!';
    case 'victory':
      return 'PERFECTION! I have read your thoughts with flawless accuracy! The Genie NEVER fails!';
    default:
      return 'Prepare to witness true mind reading...';
  }
}

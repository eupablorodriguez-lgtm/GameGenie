import { Brain, Sparkles, Zap, Eye, Star as Stars } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface GenieProps {
  state: 'idle' | 'thinking' | 'guessing' | 'victory';
  message?: string;
}

export function Genie({ state, message }: GenieProps) {
  const { t } = useLanguage();

  const getMessage = (): string => {
    if (message) return message;

    switch (state) {
      case 'idle':
        return t.genie.idle;
      case 'thinking':
        return t.genie.thinking;
      case 'guessing':
        return t.genie.guessing;
      case 'victory':
        return t.genie.victory;
      default:
        return t.genie.idle;
    }
  };

  const getStatus = (): string => {
    switch (state) {
      case 'thinking':
        return t.genie.analyzing;
      case 'guessing':
        return t.genie.revealing;
      case 'victory':
        return t.genie.predicted;
      default:
        return t.genie.ready;
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 md:gap-8 mb-6 md:mb-10">
      <div className="relative">
        <div className="absolute inset-0 animate-pulse">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-blue-400 to-violet-400"
              style={{
                transform: `rotate(${i * 30}deg) translateY(-100px)`,
                animation: `orbit ${15 + i}s linear infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        <div className="relative w-48 h-48 md:w-56 md:h-56">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-violet-500 to-fuchsia-500 opacity-30 blur-3xl animate-pulse"></div>

          <div
            className={`relative w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-blue-600 via-violet-600 to-fuchsia-600 flex items-center justify-center shadow-2xl transform transition-all duration-700 ${
              state === 'thinking' ? 'scale-110 animate-glow-pulse' : ''
            } ${state === 'victory' ? 'scale-105 animate-bounce' : ''} ${
              state === 'guessing' ? 'scale-110' : ''
            }`}
          >
            <div className="absolute inset-2 rounded-full border-2 border-white/10"></div>
            <div className="absolute inset-3 md:inset-4 rounded-full border border-white/5"></div>

            {state === 'thinking' && (
              <>
                <div className="absolute inset-4 md:inset-6 rounded-full border-2 border-white/20 animate-spin-slow"></div>
                <div
                  className="absolute inset-6 md:inset-8 rounded-full border-2 border-white/15 animate-spin-slow"
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
                    size={window.innerWidth < 768 ? 24 : 32}
                    fill="currentColor"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${i * 45}deg) translateY(-95px)`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </>
            )}

            <div className="relative z-10 flex flex-col items-center justify-center gap-2">
              {state === 'thinking' && (
                <>
                  <Brain size={window.innerWidth < 768 ? 70 : 90} className="text-white drop-shadow-2xl animate-pulse" />
                  <div className="text-white text-xs md:text-sm font-black tracking-widest bg-black/30 px-3 py-1 rounded-full">
                    {getStatus()}
                  </div>
                </>
              )}
              {state === 'guessing' && (
                <>
                  <Eye size={window.innerWidth < 768 ? 70 : 90} className="text-cyan-100 drop-shadow-2xl animate-pulse" />
                  <div className="text-white text-xs md:text-sm font-black tracking-widest bg-black/30 px-3 py-1 rounded-full">
                    {getStatus()}
                  </div>
                </>
              )}
              {state === 'victory' && (
                <>
                  <Zap size={window.innerWidth < 768 ? 75 : 95} className="text-yellow-200 drop-shadow-2xl animate-bounce" fill="currentColor" />
                  <div className="text-white text-xs md:text-sm font-black tracking-widest bg-black/30 px-3 py-1 rounded-full">
                    {getStatus()}
                  </div>
                </>
              )}
              {state === 'idle' && (
                <>
                  <Stars size={window.innerWidth < 768 ? 70 : 90} className="text-white drop-shadow-2xl" />
                  <div className="text-white/60 text-xs font-black tracking-widest">{getStatus()}</div>
                </>
              )}
            </div>

            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-white/10 to-transparent pointer-events-none"></div>
          </div>

          <div className="absolute -bottom-6 md:-bottom-8 left-1/2 -translate-x-1/2 w-36 h-16 md:w-48 md:h-20 bg-gradient-to-t from-violet-500/50 via-violet-500/25 to-transparent blur-3xl rounded-full"></div>
        </div>
      </div>

      <div className="relative max-w-4xl w-full px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-fuchsia-500/20 blur-xl rounded-2xl md:rounded-3xl"></div>

        <div className="relative glass-effect rounded-2xl md:rounded-3xl px-6 md:px-8 py-5 md:py-6 shadow-2xl border border-white/20">
          <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-400 to-violet-500 rounded-full border-4 border-slate-900 shadow-lg"></div>

          <p className="relative text-white text-center text-base md:text-xl font-bold leading-relaxed">
            {getMessage()}
          </p>
        </div>
      </div>
    </div>
  );
}

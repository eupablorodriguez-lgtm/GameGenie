import { useState } from 'react';
import { Brain, Send, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Language } from '../types/language';
import { LANGUAGES } from '../types/language';

interface LearnFormProps {
  wrongGame: string;
  onSubmit: (correctGame: string, characteristic: string, translations: Record<Language, { game: string, characteristic: string }>) => void;
}

const SIMPLE_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {},
  pt: {},
  es: {},
  zh: {},
  fr: {},
  de: {},
  ar: {},
  ja: {},
  ru: {},
  hi: {},
  it: {},
};

export function LearnForm({ wrongGame, onSubmit }: LearnFormProps) {
  const { t, language, interpolate } = useLanguage();
  const [correctGame, setCorrectGame] = useState('');
  const [characteristic, setCharacteristic] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);

  const autoTranslate = async (game: string, char: string): Promise<Record<Language, { game: string, characteristic: string }>> => {
    const translations: Record<Language, { game: string, characteristic: string }> = {} as any;

    for (const lang of LANGUAGES.map(l => l.code)) {
      translations[lang] = {
        game: game,
        characteristic: char
      };
    }

    return translations;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (correctGame.trim() && characteristic.trim()) {
      setIsTranslating(true);
      try {
        const translations = await autoTranslate(correctGame.trim(), characteristic.trim());
        onSubmit(correctGame.trim(), characteristic.trim(), translations);
      } catch (error) {
        console.error('Translation error:', error);
        const fallback: Record<Language, { game: string, characteristic: string }> = {} as any;
        for (const lang of LANGUAGES.map(l => l.code)) {
          fallback[lang] = {
            game: correctGame.trim(),
            characteristic: characteristic.trim()
          };
        }
        onSubmit(correctGame.trim(), characteristic.trim(), fallback);
      } finally {
        setIsTranslating(false);
      }
    }
  };

  const characteristicLabel = correctGame
    ? interpolate(t.learn.characteristicLabel, { correctGame, wrongGame })
    : interpolate(t.learn.characteristicLabelEmpty, { wrongGame });

  return (
    <div className="w-full max-w-4xl mx-auto animate-fadeInUp">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-violet-500/30 to-fuchsia-500/30 rounded-2xl md:rounded-3xl blur-xl md:blur-2xl animate-pulse"></div>

        <div className="relative glass-effect rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-2xl border-2 border-white/20">
          <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 justify-center">
            <Brain className="text-violet-400" size={40} />
            <h2 className="text-2xl md:text-3xl font-black gradient-text text-center">
              {t.learn.title}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            <div>
              <label className="block text-cyan-300 font-black text-base md:text-lg mb-3 uppercase tracking-wide">
                {t.learn.gameLabel}
              </label>
              <input
                type="text"
                value={correctGame}
                onChange={(e) => setCorrectGame(e.target.value)}
                placeholder={t.learn.gamePlaceholder}
                className="w-full bg-white/5 border-2 border-white/20 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-white placeholder-white/40 font-semibold text-base md:text-lg focus:outline-none focus:border-violet-400 focus:bg-white/10 transition-all"
                required
                disabled={isTranslating}
              />
            </div>

            <div>
              <label className="block text-cyan-300 font-black text-base md:text-lg mb-3 uppercase tracking-wide">
                {characteristicLabel}
              </label>
              <textarea
                value={characteristic}
                onChange={(e) => setCharacteristic(e.target.value)}
                placeholder={t.learn.characteristicPlaceholder}
                rows={4}
                className="w-full bg-white/5 border-2 border-white/20 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-white placeholder-white/40 font-semibold text-base md:text-lg focus:outline-none focus:border-violet-400 focus:bg-white/10 transition-all resize-none"
                required
                disabled={isTranslating}
              />
            </div>

            <button
              type="submit"
              disabled={isTranslating}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 hover:from-blue-400 hover:via-violet-400 hover:to-fuchsia-400 text-white rounded-xl md:rounded-2xl py-5 md:py-6 px-8 font-black text-lg md:text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 uppercase tracking-wider shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

              <div className="relative flex items-center justify-center gap-2 md:gap-3">
                {isTranslating ? (
                  <>
                    <Loader2 size={22} className="md:w-6 md:h-6 animate-spin" />
                    <span>Translating...</span>
                  </>
                ) : (
                  <>
                    <Send size={22} className="md:w-6 md:h-6" />
                    {t.learn.submitButton}
                  </>
                )}
              </div>
            </button>
          </form>

          <p className="text-center text-cyan-200/60 text-sm md:text-base font-semibold mt-6">
            {t.learn.footer}
          </p>

          {isTranslating && (
            <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
              <p className="text-center text-cyan-300 text-sm font-semibold">
                Auto-translating to all languages...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

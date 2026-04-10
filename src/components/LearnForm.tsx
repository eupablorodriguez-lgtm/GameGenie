import { useState } from 'react';
import { Brain, Send, Loader2, Check, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Language } from '../types/language';
import { LANGUAGES } from '../types/language';

interface LearnFormProps {
  wrongGame: string;
  onSubmit: (correctGame: string, characteristic: string, translations: Record<Language, { game: string, characteristic: string }>) => void;
}

const LANG_CODE_MAP: Record<Language, string> = {
  en: 'en',
  pt: 'pt',
  es: 'es',
  zh: 'zh-CN',
  fr: 'fr',
  de: 'de',
  ar: 'ar',
  ja: 'ja',
  ru: 'ru',
  hi: 'hi',
  it: 'it',
};

export function LearnForm({ wrongGame, onSubmit }: LearnFormProps) {
  const { t, language, interpolate } = useLanguage();
  const [correctGame, setCorrectGame] = useState('');
  const [characteristic, setCharacteristic] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);

  const autoTranslate = async (game: string, char: string): Promise<Record<Language, { game: string, characteristic: string }>> => {
    const translations: Record<Language, { game: string, characteristic: string }> = {} as any;

    const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/translate`;
    const headers = {
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    };

    try {
      const [gameResponse, charResponse] = await Promise.all([
        fetch(apiUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            text: game,
            sourceLang: LANG_CODE_MAP[language],
            targetLangs: Object.values(LANG_CODE_MAP),
          }),
        }),
        fetch(apiUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            text: char,
            sourceLang: LANG_CODE_MAP[language],
            targetLangs: Object.values(LANG_CODE_MAP),
          }),
        }),
      ]);

      const gameData = await gameResponse.json();
      const charData = await charResponse.json();

      for (const lang of LANGUAGES.map(l => l.code)) {
        const googleLangCode = LANG_CODE_MAP[lang];
        translations[lang] = {
          game: gameData.translations?.[googleLangCode] || game,
          characteristic: charData.translations?.[googleLangCode] || char,
        };
      }

      return translations;
    } catch (error) {
      console.error('Translation error:', error);

      for (const lang of LANGUAGES.map(l => l.code)) {
        translations[lang] = {
          game: game,
          characteristic: char,
        };
      }

      return translations;
    }
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
            characteristic: characteristic.trim(),
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

  const showPreview = characteristic.trim().length > 0;

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
              <label className="block text-cyan-300 font-black text-base md:text-lg mb-1 uppercase tracking-wide">
                {characteristicLabel}
              </label>
              <p className="text-white/40 text-xs md:text-sm font-semibold mb-3">
                {t.learn.characteristicHint}
              </p>

              <textarea
                value={characteristic}
                onChange={(e) => setCharacteristic(e.target.value)}
                placeholder={t.learn.characteristicPlaceholder}
                rows={3}
                className="w-full bg-white/5 border-2 border-white/20 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-white placeholder-white/40 font-semibold text-base md:text-lg focus:outline-none focus:border-violet-400 focus:bg-white/10 transition-all resize-none"
                required
                disabled={isTranslating}
              />

              {showPreview && (
                <div className="mt-3 p-4 md:p-5 bg-white/5 border border-white/15 rounded-xl animate-fadeInUp">
                  <p className="text-white/50 text-xs uppercase tracking-widest font-black mb-3">
                    {t.learn.previewLabel}
                  </p>

                  <p className="text-white font-black text-base md:text-lg mb-4 leading-snug">
                    {characteristic.trim()}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex items-center gap-2 flex-1 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-3 py-2">
                      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex-shrink-0">
                        <Check size={14} className="text-emerald-300 stroke-[3]" />
                      </div>
                      <span className="text-emerald-300 font-black text-xs uppercase tracking-wider mr-1">
                        {t.question.yes}
                      </span>
                      <span className="text-white/80 font-bold text-sm truncate">
                        {correctGame || '?'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 flex-1 bg-rose-500/10 border border-rose-500/30 rounded-lg px-3 py-2">
                      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 border border-rose-500/40 flex-shrink-0">
                        <X size={14} className="text-rose-300 stroke-[3]" />
                      </div>
                      <span className="text-rose-300 font-black text-xs uppercase tracking-wider mr-1">
                        {t.question.no}
                      </span>
                      <span className="text-white/80 font-bold text-sm truncate">
                        {wrongGame}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isTranslating}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 hover:from-blue-400 hover:via-violet-400 hover:to-fuchsia-400 text-white rounded-xl md:rounded-2xl py-5 md:py-6 px-8 font-black text-lg md:text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 uppercase tracking-wider shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <div className="relative flex items-center justify-center gap-2 md:gap-3">
                {isTranslating ? (
                  <>
                    <Loader2 size={22} className="animate-spin" />
                    <span>{t.learn.translating}</span>
                  </>
                ) : (
                  <>
                    <Send size={22} />
                    {t.learn.submitButton}
                  </>
                )}
              </div>
            </button>
          </form>

          <p className="text-center text-cyan-200/60 text-sm md:text-base font-semibold mt-6">
            {t.learn.footer}
          </p>
        </div>
      </div>
    </div>
  );
}

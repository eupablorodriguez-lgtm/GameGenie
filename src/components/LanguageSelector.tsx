import { useState } from 'react';
import { Languages, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LANGUAGES } from '../types/language';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = LANGUAGES.find(l => l.code === language);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 px-4 py-2 rounded-xl glass-effect border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105"
      >
        <Languages size={20} className="text-cyan-300" />
        <span className="text-white font-bold text-sm hidden sm:inline">
          {currentLanguage?.nativeName}
        </span>
        <span className="text-2xl">{currentLanguage?.flag}</span>
        <ChevronDown
          size={16}
          className={`text-cyan-300 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 mt-2 w-64 glass-effect rounded-xl border-2 border-white/20 shadow-2xl z-50 overflow-hidden animate-scale-in">
            <div className="max-h-96 overflow-y-auto">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors duration-200 ${
                    language === lang.code ? 'bg-white/20' : ''
                  }`}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <div className="flex-1 text-left">
                    <div className="text-white font-bold text-sm">{lang.nativeName}</div>
                    <div className="text-cyan-300/60 text-xs">{lang.name}</div>
                  </div>
                  {language === lang.code && (
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-violet-400"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Language } from '../types/language';
import { translations } from '../translations';
import type { TranslationKeys } from '../translations/en';
import { detectBrowserLanguage, saveLanguagePreference, loadLanguagePreference, interpolate } from '../lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
  interpolate: (text: string, params: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = loadLanguagePreference();
    return saved || detectBrowserLanguage();
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    saveLanguagePreference(lang);
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
    interpolate,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

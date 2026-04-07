import type { Language } from '../types/language';

export function detectBrowserLanguage(): Language {
  const browserLang = navigator.language.toLowerCase();

  if (browserLang.startsWith('pt')) return 'pt';
  if (browserLang.startsWith('es')) return 'es';
  if (browserLang.startsWith('zh')) return 'zh';
  if (browserLang.startsWith('fr')) return 'fr';
  if (browserLang.startsWith('de')) return 'de';
  if (browserLang.startsWith('ar')) return 'ar';
  if (browserLang.startsWith('ja')) return 'ja';
  if (browserLang.startsWith('ru')) return 'ru';
  if (browserLang.startsWith('hi')) return 'hi';
  if (browserLang.startsWith('it')) return 'it';

  return 'en';
}

export function interpolate(text: string, params: Record<string, string | number>): string {
  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => String(params[key] ?? ''));
}

const STORAGE_KEY = 'genie-game-language';

export function saveLanguagePreference(language: Language): void {
  localStorage.setItem(STORAGE_KEY, language);
}

export function loadLanguagePreference(): Language | null {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved as Language | null;
}

import { en } from './en';
import { pt } from './pt';
import { es } from './es';
import { zh } from './zh';
import { fr } from './fr';
import { de } from './de';
import { ar } from './ar';
import { ja } from './ja';
import { ru } from './ru';
import { hi } from './hi';
import { it } from './it';
import type { Language } from '../types/language';
import type { TranslationKeys } from './en';

export const translations: Record<Language, TranslationKeys> = {
  en,
  pt,
  es,
  zh,
  fr,
  de,
  ar,
  ja,
  ru,
  hi,
  it,
};

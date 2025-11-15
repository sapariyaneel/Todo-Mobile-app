// src/i18n.ts
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import hi from './locales/hi.json';

const resources = {
  en: { translation: en },
  hi: { translation: hi },
};

const fallbackLng = 'en';

function getDeviceLanguageTag(): string {
  try {
    const locales = RNLocalize.getLocales?.();
    if (Array.isArray(locales) && locales.length > 0) {
      // locales[0].languageTag is something like "hi-IN" or "en-US"
      return locales[0].languageTag.split('-')[0]; // take only "hi" or "en"
    }
  } catch (e) {
    // ignore and fallback
    console.warn('RNLocalize.getLocales failed, falling back to', fallbackLng, e);
  }
  return fallbackLng;
}

const languageTag = getDeviceLanguageTag();

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: languageTag,
    fallbackLng,
    compatibilityJSON: 'v3',
    interpolation: { escapeValue: false },
  })
  .catch(err => {
    console.warn('i18n init failed', err);
  });

export default i18n;

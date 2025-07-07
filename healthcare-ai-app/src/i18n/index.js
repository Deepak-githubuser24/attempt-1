import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import taTranslations from './locales/ta.json';
import hiTranslations from './locales/hi.json';

const resources = {
  ta: {
    translation: taTranslations
  },
  hi: {
    translation: hiTranslations
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ta', // Tamil as default language
    fallbackLng: 'ta',
    debug: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
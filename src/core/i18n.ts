import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import { EnTranslations } from './translations/en';
import { DeTranslations } from './translations/de';

const resources = {
  en: {
    translation: EnTranslations,
  },
  de: {
    translation: DeTranslations,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

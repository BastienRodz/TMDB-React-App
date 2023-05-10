import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from '../translations/en/MovieDetails.json';
import frTranslation from '../translations/fr/MovieDetails.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    fr: { translation: frTranslation },
  },
  lng: 'en',
  fallbackLng: 'fr',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

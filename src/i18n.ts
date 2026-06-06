import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English translations
import commonEn from './locales/en/common.json';
import registryEn from './locales/en/registry.json';
import docsEn from './locales/en/docs.json';
import propDocsEn from './locales/en/propDocs.json';

// French translations
import commonFr from './locales/fr/common.json';
import registryFr from './locales/fr/registry.json';
import docsFr from './locales/fr/docs.json';
import propDocsFr from './locales/fr/propDocs.json';

// Arabic translations
import commonAr from './locales/ar/common.json';
import registryAr from './locales/ar/registry.json';
import docsAr from './locales/ar/docs.json';
import propDocsAr from './locales/ar/propDocs.json';

// Kannada translations
import commonKn from './locales/kn/common.json';
import registryKn from './locales/kn/registry.json';
import docsKn from './locales/kn/docs.json';
import propDocsKn from './locales/kn/propDocs.json';

const resources = {
  en: {
    common: commonEn,
    registry: registryEn,
    docs: docsEn,
    propDocs: propDocsEn,
  },
  fr: {
    common: commonFr,
    registry: registryFr,
    docs: docsFr,
    propDocs: propDocsFr,
  },
  ar: {
    common: commonAr,
    registry: registryAr,
    docs: docsAr,
    propDocs: propDocsAr,
  },
  kn: {
    common: commonKn,
    registry: registryKn,
    docs: docsKn,
    propDocs: propDocsKn,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;

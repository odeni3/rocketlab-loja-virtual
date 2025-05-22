import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Importando as traduções dos produtos
import productsPT from './locales/pt/products.json';
import productsEN from './locales/en/products.json';
import translationPT from './locales/pt/translation.json';
import translationEN from './locales/en/translation.json';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      pt: {
        translation: translationPT,
        products: productsPT
      },
      en: {
        translation: translationEN,
        products: productsEN
      }
    },
    fallbackLng: 'pt',
    debug: true,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import uz from './locales/uz.json';
import ru from './locales/ru.json';
import en from './locales/en.json';

// localStorage dan tilni olish yoki default 'uz' qo'yish
const savedLanguage = localStorage.getItem('language') || 'uz';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      uz: { translation: uz },
      ru: { translation: ru },
      en: { translation: en },
    },
    lng: savedLanguage, // localStorage dan olingan til
    fallbackLng: 'uz',
    interpolation: {
      escapeValue: false,
    },
  });

// Til o'zgarganda localStorage ga saqlash
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;

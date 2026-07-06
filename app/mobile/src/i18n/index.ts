import { getLocales } from 'expo-localization'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import it from './locales/it.json'

export const SUPPORTED_LANGUAGES = ['en', 'it'] as const
export const DEFAULT_LANGUAGE = 'en'

const deviceLanguage = getLocales()[0]?.languageCode
const initialLanguage = SUPPORTED_LANGUAGES.find((lang) => lang === deviceLanguage) ?? DEFAULT_LANGUAGE

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    it: { translation: it },
  },
  lng: initialLanguage,
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: { escapeValue: false },
})

export default i18n

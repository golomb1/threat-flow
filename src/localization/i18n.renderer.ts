import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from 'i18next-resources-to-backend';
import langs from "@/localization/langs";
import path from "path";

i18n.use(initReactI18next).use(
  resourcesToBackend((language: string, namespace: string) => {
    console.log('language', path);
    return import(`../locales/${language}/${namespace}.json`)
  })
).init({
  fallbackLng: "en",
  debug: true,
  interpolation: {
    escapeValue: false
  },
  saveMissing: true,
  supportedLngs: langs.map(lang => lang.key),
});

export default i18n;
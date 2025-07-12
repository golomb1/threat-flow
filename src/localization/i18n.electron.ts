import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-fs-backend/cjs';
import path from "path";
import whitelist from "@/localization/whitelist";

const isMac = process.platform === 'darwin';
const isDev = process.env.NODE_ENV === 'development';
const prependPath = isMac && !isDev ? path.join(process.resourcesPath, '..') : '.';
console.log('prependPath', prependPath);
i18n.use(initReactI18next).use(Backend).init({
  fallbackLng: "en",
  backend: {
    loadPath: prependPath + '/locales/{{lng}}/{{ns}}.json',
    addPath: prependPath + '/locales/{{lng}}/{{ns}}.missing.json'
  },
  debug: true,
  interpolation: {
    escapeValue: false
  },
  saveMissing: true,
  supportedLngs: whitelist.langs,
  /*resources: {
  en: {
    translation: {
      appName: "electron-shadcn",
      titleHomePage: "Home Page",
      titleSecondPage: "Second Page",
    },
  },
  "pt-BR": {
    translation: {
      appName: "electron-shadcn",
      titleHomePage: "Página Inicial",
      titleSecondPage: "Segunda Página",
    },
  },
},*/
});

export default i18n;
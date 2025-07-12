import type { i18n } from "i18next";
import logger from "@/logger/logger";

const languageLocalStorageKey = "lang";

export function getAppLanguage(): Promise<string> {
  return window.language.current();
}

export function setAppLanguage(lang: string): Promise<string> {
  return window.language.update(lang)
}

export function updateAppLanguage(): Promise<string | null> {
  const localLang : string | null = localStorage.getItem(languageLocalStorageKey);
  if (!localLang) {
    return Promise.reject("No language found in local storage.");
  }
  return setAppLanguage(localLang);
}

export function listenOnLanguageChange(i18n: i18n): void {
  window.language.onUpdate(async (updatedLang: string) => {
    logger.info('listenOnLanguageChange', 'onUpdate', updatedLang)
    localStorage.setItem(languageLocalStorageKey, updatedLang);
    await i18n.changeLanguage(updatedLang);
    document.documentElement.lang = updatedLang;
  })
}
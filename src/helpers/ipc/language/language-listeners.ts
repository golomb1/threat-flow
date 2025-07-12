import { ipcMain, IpcMainInvokeEvent } from "electron";
import {
  LANGUAGE_CURRENT_CHANNEL,
  LANGUAGE_UPDATE_CHANNEL,
} from "./language-channels";
import i18n from "../../../localization/i18n.electron";

export function addLanguageEventListeners() {
  ipcMain.handle(LANGUAGE_CURRENT_CHANNEL, () => i18n.language);
  ipcMain.handle(LANGUAGE_UPDATE_CHANNEL, (event: IpcMainInvokeEvent, lang: string) => {
    console.log('update language was called at the backend', lang, 'value')
    i18n.changeLanguage(lang);
    return lang;
  });
}

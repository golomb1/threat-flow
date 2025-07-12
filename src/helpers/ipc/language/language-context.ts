import {
  LANGUAGE_CURRENT_CHANNEL, LANGUAGE_ON_UPDATE_CHANNEL,
  LANGUAGE_UPDATE_CHANNEL,
} from "./language-channels";
import { IpcMainInvokeEvent } from "electron";

export type LanguageUpdate = (lang: string) => void;

export function exposeLanguageContext() {
  const { contextBridge, ipcRenderer } = window.require("electron");
  contextBridge.exposeInMainWorld("language", {
    current: () => ipcRenderer.invoke(LANGUAGE_CURRENT_CHANNEL),
    update: (lang: string) => ipcRenderer.invoke(LANGUAGE_UPDATE_CHANNEL, lang),
    onUpdate: (callback: LanguageUpdate) => ipcRenderer.on(LANGUAGE_ON_UPDATE_CHANNEL, (_event: IpcMainInvokeEvent, value: string) => {
      console.log('on update was called from!!! the backend', value, 'value')
      callback(value)
    })
  });
}

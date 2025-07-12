import { Menu } from "electron";
import darwinMenu from "@/menu/darwinMenu";
import otherMenu from "@/menu/otherMenu";
import type { i18n } from 'i18next';



function buildMenu(app: Electron.App, mainWindow: Electron.BaseWindow, i18next: i18n): void {
  console.log('buildMenu', process.platform);
    if (process.platform === "darwin") {
      const menu = Menu.buildFromTemplate(darwinMenu(app, mainWindow, i18next));
      Menu.setApplicationMenu(menu);
    } else {
      const menu = Menu.buildFromTemplate(otherMenu(app, mainWindow, i18next));
      mainWindow.setMenu(menu);
    }
}

export default buildMenu;
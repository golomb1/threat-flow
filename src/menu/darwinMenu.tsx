import { BaseWindow, MenuItemConstructorOptions } from "electron";
import MenuItem = Electron.MenuItem;
import {type i18n} from 'i18next'
import whitelist from "@/localization/whitelist";

function darwinMenu(
  app: Electron.App,
  _mainWindows: BaseWindow,
  i18next: i18n
): MenuItemConstructorOptions[] {
  return [
    {
      label: app.name,
      submenu: [
        {
          label: i18next.t("about"),
          role: "about",
        },
        {
          type: "separator",
        },
        {
          label: i18next.t("Hide App"),
          accelerator: "Command+H",
          role: "hide",
        },
        {
          label: i18next.t("Hide Others"),
          accelerator: "Command+Shift+H",
          role: "hideOthers",
        },
        {
          label: i18next.t("Show All"),
          role: "unhide",
        },
        {
          type: "separator",
        },
        {
          label: i18next.t("Quit"),
          accelerator: "Command+Q",
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: i18next.t("View"),
      submenu: [
        {
          accelerator: "Command+R",
          click: (item: MenuItem, focusedWindow: BaseWindow | undefined) => {
            if (focusedWindow) {
              if (Object.hasOwn(focusedWindow, "reload")) {
                // @ts-expect-error A check was made
                focusedWindow.reload();
              }
            }
          },
          label: i18next.t("Reload"),
        },
        {
          label: i18next.t("Full Screen"),
          accelerator: "Ctrl+Command+F",
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
            }
          },
        },
        {
          label: i18next.t("Minimize"),
          accelerator: "Command+M",
          role: "minimize",
        },
        {
          type: "separator",
        },
        {
          label: i18next.t("Toggle Developer Tools"),
          accelerator: "Alt+Command+I",
          click: (item: MenuItem, focusedWindow: BaseWindow | undefined) => {
            if (focusedWindow) {
              if (Object.hasOwn(focusedWindow, "webContents")) {
                // @ts-expect-error A check was made
                focusedWindow?.webContents.toggleDevTools();
              }
            }
          },
        },
      ],
    },
    {
      label: i18next.t("Language"),
      submenu: whitelist.buildSubmenu(i18next)
    },
    {
      label: i18next.t("Help"),
      submenu: [
        {
          label: i18next.t("About App"),
          role: "about",
        },
      ],
    },
  ];
}
export default darwinMenu;

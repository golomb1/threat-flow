import { BaseWindow, MenuItemConstructorOptions } from "electron";
import MenuItem = Electron.MenuItem;
import type { i18n } from "i18next";
import whitelist from "@/localization/whitelist";

function otherMenu(
  app: Electron.App,
  _mainWindows: BaseWindow,
  i18next: i18n
): MenuItemConstructorOptions[] {
  return [
    {
      label: i18next.t('File'),
      submenu: [
        {
          label: i18next.t('Quit'),
          accelerator: 'Ctrl+Q',
          click: function() {
            app.quit();
          }
        }
      ]
    },
    {
      label: i18next.t('View'),
      submenu: [
        {
          label: i18next.t('Reload'),
          accelerator: 'Command+R',
          click: function(item: MenuItem, focusedWindow: BaseWindow | undefined) {
            if (focusedWindow) {
              if (Object.hasOwn(focusedWindow, "reload")) {
                // @ts-expect-error A check was made
                focusedWindow.reload();
              }
            }
          }
        },
        {
          label: i18next.t('Full Screen'),
          accelerator: 'Ctrl+Command+F',
          click: function(item: MenuItem, focusedWindow: BaseWindow | undefined) {
            if (focusedWindow) {
              focusedWindow?.setFullScreen(!focusedWindow.isFullScreen());
            }
          }
        },
        {
          label: i18next.t('Minimize'),
          accelerator: 'Command+M',
          role: 'minimize'
        },
        {
          type: 'separator'
        },
        {
          label: i18next.t('Toggle Developer Tools'),
          accelerator: 'Alt+Command+I',
          click: function(item: MenuItem, focusedWindow: BaseWindow | undefined) {
            if (focusedWindow) {
              if (Object.hasOwn(focusedWindow, "webContents")) {
                // @ts-expect-error A check was made
                focusedWindow.webContents.toggleDevTools();
              }
            }
          }
        }
      ]
    },
    {
      label: i18next.t("Language"),
      submenu: whitelist.buildSubmenu(i18next)
    },
    {
      label: i18next.t('Help'),
      submenu: [
        {
          label: i18next.t('About App'),
          role: 'about'
        }
      ]
    }
  ];
}

export default otherMenu;
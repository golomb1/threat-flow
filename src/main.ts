import { app, BaseWindow, BrowserWindow } from "electron";
import registerListeners from "./helpers/ipc/listeners-register";
// "electron-squirrel-startup" seems broken when packaging with vite
//import started from "electron-squirrel-startup";
import path from "path";
import {
  installExtension,
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import buildMenu from "@/services/MenuFactory";
import i18n from './localization/i18n.electron';

const inDevelopment = process.env.NODE_ENV === "development";

async function createWindow(): Promise<BaseWindow> {
  const preload = path.join(__dirname, "preload.js");
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      devTools: inDevelopment,
      contextIsolation: true,
      nodeIntegration: true,
      nodeIntegrationInSubFrames: false,

      preload: preload,
    },
    titleBarStyle: 'hidden',
  });
  mainWindow.setWindowButtonVisibility(false)
  registerListeners(mainWindow);

  if (inDevelopment) {
    mainWindow.webContents.openDevTools()
  }
  // Set up necessary bindings to update the menu items
  // based on the current language selected
  i18n.on("loaded", (loaded: boolean) => {
    console.log("i18n loaded", loaded);
    i18n.changeLanguage("en");
    i18n.off("loaded");
  });

  // When the i18n framework starts up, this event is called
  // (presumably when the default language is initialized)
  // BEFORE the "initialized" event is fired - this causes an
  // error in the logs. To prevent said error, we only call the
  // below code until AFTER the i18n framework has finished its
  // "initialized" event.
  i18n.on("languageChanged", (lng: string) => {
    if (i18n.isInitialized) {
      buildMenu(app, mainWindow, i18n);
      mainWindow.webContents.send("language:languageSignal", lng);
    } else {
      console.warn("i18nextMainBackend is not initialized yet.");
    }
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    await mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    await mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }
  return mainWindow;
}

async function installExtensions() {
  try {
    const result = await installExtension(REACT_DEVELOPER_TOOLS);
    console.log(`Extensions installed successfully: ${result.name}`);
  } catch {
    console.error("Failed to install extensions");
  }
}

app.whenReady().then(createWindow).then(installExtensions);

//osX only
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  } else {
    app.quit();
  }
});



app.on("activate", async () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    await createWindow();
  }
});
//osX only ends

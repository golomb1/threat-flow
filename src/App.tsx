import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { syncThemeWithLocal } from "./helpers/theme_helpers";
import { useTranslation } from "react-i18next";
import "./localization/i18n.renderer";
import { listenOnLanguageChange, updateAppLanguage } from "./helpers/language_helpers";
import { router } from "./routes/router";
import { RouterProvider } from "@tanstack/react-router";
import { I18nextProvider } from 'react-i18next';
import logger from "@/logger/logger";

export default function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    syncThemeWithLocal().then(() => logger.info('syncThemeWithLocal', 'finish'));
    updateAppLanguage().then(() => logger.info('updateAppLanguage', 'finish'));
  }, [i18n]);

  listenOnLanguageChange(i18n)

  return (
    <I18nextProvider i18n={i18n}>
      <RouterProvider router={router} />
    </I18nextProvider>
  );
}

const root = createRoot(document.getElementById("app")!);
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
);

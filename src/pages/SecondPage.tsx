import React from "react";
import Footer from "@/components/template/Footer";
import { useTranslation } from "react-i18next";
import { useLocation } from "@tanstack/react-router";

export default function SecondPage() {
  const { t } = useTranslation();
  const location = useLocation()
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <h1 className="text-4xl font-bold">{t("titleSecondPage")}</h1>
        <h1 className="text-4xl font-bold">{location.pathname}</h1>
      </div>
      <Footer />
    </div>
  );
}

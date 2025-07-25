import React from "react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import langs from "@/localization/langs";
import { useTranslation } from "react-i18next";
import { setAppLanguage } from "@/helpers/language_helpers";

export default function LangToggle() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  console.log('LANG', currentLang)

  function onValueChange(value: string) {
    setAppLanguage(value);
  }

  return (
    <ToggleGroup
      type="single"
      value={currentLang}
    >
      {langs.map((lang) => (
        <ToggleGroupItem key={lang.key} value={lang.key} onClick={() => onValueChange(lang.key)}>
          {`${lang.prefix} ${lang.nativeName}`}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

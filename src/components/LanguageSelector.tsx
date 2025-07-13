/**
 * v0 by Vercel.
 * @see https://v0.dev/t/IasA7fhkREA
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDownIcon } from "lucide-react";
import langs from "@/localization/langs";
import { setAppLanguage } from "@/helpers/language_helpers";
import { useTranslation } from "react-i18next";
import { CircleFlagLanguage } from 'react-circle-flags'

export interface LanguageItem {
  lang: string,
  title: string,
  countryCode: string,
}

export default function LanguageSelector() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const currentLangItem = langs.find((item) => item.key === currentLang);
  function onValueChange(value: string) {
    setAppLanguage(value);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          {currentLangItem?.key && <CircleFlagLanguage languageCode={currentLangItem?.key} className="h-4 w-4"/> }
          <span className="font-medium">{currentLangItem?.nativeName}</span>
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>{t('selectLanguage')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {langs.map((item) => (
            <DropdownMenuItem key={item.key} onClick={() => onValueChange(item.key)}>
              <div className="flex items-center gap-2">
                <CircleFlagLanguage languageCode={item.key} className="h-4 w-4"/>
                <span>{item.nativeName}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
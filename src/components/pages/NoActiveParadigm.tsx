import React from "react"
import { Shield, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useTranslation } from "react-i18next";

export interface NoActiveParadigmProps {
  onBrowse: () => void;
}

export default function NoActiveParadigm(props: NoActiveParadigmProps) {
  const {t} = useTranslation("no_paradigm_selected");
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <div className="rounded-full bg-blue-50 p-4 mb-4 border border-blue-100">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">{t('title')}</h2>
          <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
            {t('details')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              {t('create')}
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent" onClick={props.onBrowse}>
              <Search className="h-4 w-4 mr-2" />
              {t('browse')}
            </Button>
          </div>
          <div className="mt-4 pt-4 border-t border-muted w-full">
            <p className="text-xs text-muted-foreground">
              {t('footnote')}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

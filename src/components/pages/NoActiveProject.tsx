import React from "react"
import { FolderOpen, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useTranslation } from "react-i18next";


export interface NoActiveProjectProps {
  onBrowse: () => void;
}

export default function NoActiveProject(props: NoActiveProjectProps) {
  const {t} = useTranslation("no_project_selected");
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <div className="rounded-full bg-muted p-4 mb-4">
            <FolderOpen className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">{t("title")}</h2>
          <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
            {t("details")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button className="flex-1">
              <Plus className="h-4 w-4 mr-2" />
              {t("create")}
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent" onClick={props.onBrowse}>
              {t("browse")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

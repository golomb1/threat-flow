import React, { JSX, useEffect } from "react";
import { AppSidebar, NavMainActiveItem, SubItem } from "@/components/AppSideBar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import NavMenuData, { DEFAULT_ACTIVE } from "@/nav/NavMenuData";
import NoActiveParadigm from "@/components/pages/NoActiveParadigm";
import NoActiveProject from "@/components/pages/NoActiveProject";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import ToggleTheme from "@/components/ToggleTheme";
import LanguageSelector from "@/components/LanguageSelector";

export interface AppShellProps {
  subItems: SubItem[]
  children: React.ReactNode;
}

interface iEmptyView {
  [index: string]: (browse: BrowseFunction) => JSX.Element;
}

type BrowseFunction = () => void;

const EmptyView: iEmptyView = {
  'project': (browse: BrowseFunction) => <NoActiveProject onBrowse={browse}/>,
  'paradigm': (browse: BrowseFunction) => <NoActiveParadigm onBrowse={browse}/>,
}

function getEmptyView(key: string, browse: BrowseFunction): JSX.Element {
  if (key in EmptyView) {
    return EmptyView[key](browse)
  } else {
    return <>Empty Default</>
  }
}

export default function AppShell({ subItems, children }: AppShellProps) {
  const {t} = useTranslation('navbar')
  const navigation = useNavigate()
  const [activeItem, setActiveItem] = React.useState<NavMainActiveItem>(DEFAULT_ACTIVE)
  const [lastActiveBySection, setLastActiveBySection] = React.useState<Record<string, SubItem | null>>({  })

  const location = useLocation()
  console.log('location', location)
  console.log('activeItem', activeItem)

  useEffect(() => {
    setLastActiveBySection((o) => {
      return { ...o, [activeItem.key]: activeItem.item }
    })
  }, [activeItem]);

  const browse = () => {
    console.log('browse')
  }

  const resetActiveItem = async () => {
    setActiveItem((o) => { return { ...o, item: null }})
    await navigation({
      to: activeItem.navItem.url
    })
  }
  const defaultOpen = activeItem.navItem.hasSubItems && activeItem.item === null;

  return (
    <SidebarProvider       style={
      {
        "--sidebar-width": "350px",
      } as React.CSSProperties
    }
                           defaultOpen={defaultOpen}
    >
      <AppSidebar
        data={NavMenuData}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        loadLastActiveSubItem={(key) => lastActiveBySection[key] ?? null}
        getActiveItemSubItems={(_: string) => subItems}
      />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex shrink-0 items-center justify-between gap-2 border-b p-4">
          <div className="flex shrink-0">
            <SidebarTrigger className="-ms-1" disabled={!activeItem.navItem.hasSubItems} />
            <Separator
              orientation="vertical"
              className="me-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block" onClick={resetActiveItem}>
                  <BreadcrumbLink href="#">{t(activeItem?.navItem?.title)}</BreadcrumbLink>
                </BreadcrumbItem>
                {activeItem?.navItem?.hasSubItems && activeItem?.item !== null &&
                  <BreadcrumbSeparator>|</BreadcrumbSeparator>
                }
                {/*<BreadcrumbSeparator>{i18n.dir() === 'rtl' ? ">" : "<" }</BreadcrumbSeparator>*/}
                <BreadcrumbItem>
                  <BreadcrumbPage>{activeItem?.item?.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex shrink-0 gap-2">
             <LanguageSelector />
            <ToggleTheme />
          </div>
        </header>
        <main className="h-screen pb-20">
          {activeItem.item === null && activeItem.navItem.hasSubItems ? getEmptyView(activeItem.key, browse) : children }
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

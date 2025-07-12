import React, { useEffect } from "react";
import NavigationMenu from "@/components/template/NavigationMenu";
import { SPAAppSidebar as AppSidebar, NavMainActiveItem, SubItem } from "@/components/AppSideBar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
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

export interface AppShellProps {
  subItems: SubItem[]
  children: React.ReactNode;
}

export default function AppShell({ subItems, children }: AppShellProps) {
  const [activeItem, setActiveItem] = React.useState<NavMainActiveItem>(DEFAULT_ACTIVE)
  const [lastActiveBySection, setLastActiveBySection] = React.useState<Record<string, SubItem | null>>({  })


  useEffect(() => {
    console.log('activeItem', activeItem)
  }, [activeItem]);

  useEffect(() => {
    //localStorage.setItem(localStorageKeyGetLastState, JSON.stringify(activeItem))
    //if (activeItem.item) {
    //  saveSubMenuState(activeItem.key, activeItem.item)
    //}
    setLastActiveBySection((o) => {
      return { ...o, [activeItem.key]: activeItem.item }
    })
  }, [activeItem]);
  return (
    <SidebarProvider       style={
      {
        "--sidebar-width": "350px",
      } as React.CSSProperties
    }
    >
      <AppSidebar
        data={NavMenuData}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        loadLastActiveSubItem={(key) => lastActiveBySection[key] ?? null}
        getActiveItemSubItems={(_: string) => subItems}
      />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
          <SidebarTrigger className="-ml-1" disabled={!activeItem.navItem.hasSubItems} />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">{activeItem?.navItem?.title}</BreadcrumbLink>
              </BreadcrumbItem>
              {activeItem?.navItem?.hasSubItems && <BreadcrumbSeparator className="hidden md:block" />}
              <BreadcrumbItem>
                <BreadcrumbPage>{activeItem?.item?.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <NavigationMenu />
        <main className="h-screen pb-20 p-2">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

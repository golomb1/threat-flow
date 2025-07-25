"use client"

import * as React from "react"
import {
  Command
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button";
import { flattenWithSeparator } from "@/utils/flatlist";
import { Separator } from "@/components/ui/separator";
import { useEffect, useMemo } from "react";
import { ToPathOption, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export interface NavMainItem {
  title: string
  icon: React.ComponentType<React.ComponentProps<"svg">>
  url: ToPathOption
  isActive: boolean
  hasSubItems: boolean
}

export interface SubItem {
  name: string
  email: string
  subject: string
  date: string
  teaser: string
}

export interface NavMainSection {
  key: string
  items: NavMainItem[]
}

export interface NavMainActiveItem {
  key: string
  navItem: NavMainItem
  item: SubItem | null
}

export interface MenuData {
  navMain: NavMainSection[]
}

export interface AppSidebarProps extends React.ComponentProps<typeof Sidebar>{
  data: MenuData
  activeItem?: NavMainActiveItem
  setActiveItem?: React.Dispatch<React.SetStateAction<NavMainActiveItem>>

  loadLastActiveSubItem?: (key: string) => SubItem | null
  getActiveItemSubItems: (key: string) => SubItem[]
}

export function AppSidebar({
                                data,
                                activeItem: controlledActiveItem ,
                                setActiveItem: controlledSetActiveItem,
                                loadLastActiveSubItem,
                                getActiveItemSubItems,
                                ...props }: AppSidebarProps)
{
  // Note: I'm using state to show an active item.
  // IRL you should use the url/router.
  const [internalActiveItem, setInternalActiveItem] = React.useState<NavMainActiveItem>({
    key: data.navMain[0].key,
    navItem: data.navMain[0].items[0],
    item: loadLastActiveSubItem ? loadLastActiveSubItem(data.navMain[0].key) : null
  })
  const { state, setOpen, toggleSidebar } = useSidebar()
  const { t, i18n } = useTranslation('navbar')
  const [query, setQuery] = React.useState<string>("")
  const activeItem: NavMainActiveItem = controlledActiveItem ?? internalActiveItem;
  const setActiveItem = controlledSetActiveItem ?? setInternalActiveItem;

  useEffect(() => {
    if (activeItem.navItem.hasSubItems && activeItem.item === null){
      if (state === 'collapsed'){
        toggleSidebar()
      }
    }
  }, [activeItem])

  const subItems: SubItem[] = useMemo(() => {
    return getActiveItemSubItems(activeItem.key)
  }, [activeItem])
  const filteredSubItems = useMemo(() => {
    if (!query) {
      return subItems;
    }
    return subItems.filter((item) => JSON.stringify(item).toLowerCase().includes(query.toLowerCase()))
  }, [query, subItems]);

  const setActiveSubItem = (item: SubItem | null) => {
    return setActiveItem((o) => { return {...o, item: item }})
  }

  const navigate = useNavigate();

  const onSelectNavItem = async (section: NavMainSection, item: NavMainItem) => {
    setActiveItem((o) => {
      if (loadLastActiveSubItem) {
        const last = loadLastActiveSubItem(section.key)
        return { ...o, key: section.key, navItem: item, item: last }
      } else {
        return { ...o, key: section.key, navItem: item, item: null }
      }
    });
    await navigate({
      to: item.url,
      params: { projectId: activeItem.item?.name ?? ''}
    });

  };

  useEffect(() => {
    if (!activeItem.navItem.hasSubItems){
      setOpen(false)
    }
  }, [activeItem]);

  return (
    <Sidebar
      side={i18n.dir() === "ltr" ? "left": "right"}
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      {/* This is the first sidebar */}
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}
      <Sidebar
        side={i18n.dir() === "ltr" ? "left": "right"}
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! border-e"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="#">
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Acme Inc</span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {flattenWithSeparator(data.navMain.map((navSection) => {
                  return navSection.items.map((item: NavMainItem, idx: number) => (
                    <SidebarMenuItem key={`${item.title}:${idx}`}>
                      <SidebarMenuButton
                        tooltip={{
                          children: t(item.title),
                          hidden: false,
                        }}
                        onClick={async () => {
                          await onSelectNavItem(navSection, item)
                        }}
                        isActive={activeItem?.navItem.title === item.title}
                        className="px-2.5 md:px-2"
                      >
                        <item.icon />
                        <span>{t(item.title)}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}), ((idx: number) => <Separator key={idx}/>))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
        </SidebarFooter>
      </Sidebar>

      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill the remaining space */}
      {activeItem.navItem.hasSubItems &&
        <Sidebar
          side={i18n.dir() === "ltr" ? "left": "right"}
          collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-foreground text-base font-medium">
              {t(activeItem?.navItem.title)}
            </div>
          </div>
          <SidebarInput
            value={query}
            placeholder={t("searchPlaceholder")}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Button>{t("addButtonText")}</Button>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {filteredSubItems.map((mail: SubItem) => (
                <div
                  key={mail.email}
                  onClick={() => {
                    toggleSidebar()
                    setActiveSubItem(mail)
                  }}
                  className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0"
                >
                  <div className="flex w-full items-center gap-2">
                    <span>{mail.name}</span>{" "}
                    <span className="ml-auto text-xs">{mail.date}</span>
                  </div>
                  <span className="font-medium">{mail.subject}</span>
                  <span className="line-clamp-2 w-[260px] text-xs whitespace-break-spaces">
                    {mail.teaser}
                  </span>
                </div>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>}
    </Sidebar>
  )
}

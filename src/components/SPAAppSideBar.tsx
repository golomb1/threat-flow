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
import { ToPathOption,  } from "@tanstack/react-router";

export interface NavMainItem {
  title: string
  url: ToPathOption
  icon: React.ComponentType<React.ComponentProps<"svg">>
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

export function SPAAppSidebar({
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
  const { setOpen } = useSidebar()

  const [query, setQuery] = React.useState<string>("")
  const activeItem: NavMainActiveItem = controlledActiveItem ?? internalActiveItem;
  const setActiveItem = controlledSetActiveItem ?? setInternalActiveItem;

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

  const onSelectNavItem = (key: string, item: NavMainItem) => {
      setActiveItem((o) => {
      console.log(o)
      if (o.key === key){
        return {...o, navItem: item}
      } else {
        if (!item.hasSubItems){
          return {...o, key: key, navItem: item, item: null}
        }
        if (loadLastActiveSubItem) {
          const activeSubItem = loadLastActiveSubItem(key)
          if (activeSubItem === null) {
            setOpen(true)
          }
          return {...o, key: key, navItem: item, item: activeSubItem}
        } else {
          setOpen(true)
          return {...o, key: key, navItem: item, item: null}
        }
      }
    })
  }

  useEffect(() => {
    if (!activeItem.navItem.hasSubItems){
      setOpen(false)
    }
  }, [activeItem]);

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      {/* This is the first sidebar */}
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
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
                  return navSection.items.map((item: NavMainItem) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        tooltip={{
                          children: item.title,
                          hidden: false,
                        }}
                        onClick={() => {
                          onSelectNavItem(navSection.key, item)
                        }}
                        isActive={activeItem?.navItem.title === item.title}
                        className="px-2.5 md:px-2"
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}), (<Separator />))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
        </SidebarFooter>
      </Sidebar>

      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill the remaining space */}
      {activeItem.navItem.hasSubItems && <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-foreground text-base font-medium">
              {activeItem?.navItem.title}
            </div>
          </div>
          <SidebarInput
            value={query}
            placeholder="Type to search..."
            onChange={(event) => setQuery(event.target.value)}
          />
          <Button>Add new Project</Button>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {filteredSubItems.map((mail: SubItem) => (
                <div
                  key={mail.email}
                  onClick={() => setActiveSubItem(mail)}
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

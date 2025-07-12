import React, { useEffect } from "react";
import DragWindowRegion from "@/components/DragWindowRegion";
import NavigationMenu from "@/components/template/NavigationMenu";
import App_manifest from "@/config/app.config";
import { AppSidebar, NavMainActiveItem, NavMainSection, SubItem } from "@/components/AppSideBar";
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
import { useLocation } from "@tanstack/react-router";

const mails: SubItem[] = [
  {
    name: "William Smith",
    email: "williamsmith@example.com",
    subject: "Meeting Tomorrow",
    date: "09:34 AM",
    teaser:
      "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
  },
  {
    name: "Alice Smith",
    email: "alicesmith@example.com",
    subject: "Re: Project Update",
    date: "Yesterday",
    teaser:
      "Thanks for the update. The progress looks great so far.\nLet's schedule a call to discuss the next steps.",
  },
  {
    name: "Bob Johnson",
    email: "bobjohnson@example.com",
    subject: "Weekend Plans",
    date: "2 days ago",
    teaser:
      "Hey everyone! I'm thinking of organizing a team outing this weekend.\nWould you be interested in a hiking trip or a beach day?",
  },
  {
    name: "Emily Davis",
    email: "emilydavis@example.com",
    subject: "Re: Question about Budget",
    date: "2 days ago",
    teaser:
      "I've reviewed the budget numbers you sent over.\nCan we set up a quick call to discuss some potential adjustments?",
  },
  {
    name: "Michael Wilson",
    email: "michaelwilson@example.com",
    subject: "Important Announcement",
    date: "1 week ago",
    teaser:
      "Please join us for an all-hands meeting this Friday at 3 PM.\nWe have some exciting news to share about the company's future.",
  },
  {
    name: "Sarah Brown",
    email: "sarahbrown@example.com",
    subject: "Re: Feedback on Proposal",
    date: "1 week ago",
    teaser:
      "Thank you for sending over the proposal. I've reviewed it and have some thoughts.\nCould we schedule a meeting to discuss my feedback in detail?",
  },
  {
    name: "David Lee",
    email: "davidlee@example.com",
    subject: "New Project Idea",
    date: "1 week ago",
    teaser:
      "I've been brainstorming and came up with an interesting project concept.\nDo you have time this week to discuss its potential impact and feasibility?",
  },
  {
    name: "Olivia Wilson",
    email: "oliviawilson@example.com",
    subject: "Vacation Plans",
    date: "1 week ago",
    teaser:
      "Just a heads up that I'll be taking a two-week vacation next month.\nI'll make sure all my projects are up to date before I leave.",
  },
  {
    name: "James Martin",
    email: "jamesmartin@example.com",
    subject: "Re: Conference Registration",
    date: "1 week ago",
    teaser:
      "I've completed the registration for the upcoming tech conference.\nLet me know if you need any additional information from my end.",
  },
  {
    name: "Sophia White",
    email: "sophiawhite@example.com",
    subject: "Team Dinner",
    date: "1 week ago",
    teaser:
      "To celebrate our recent project success, I'd like to organize a team dinner.\nAre you available next Friday evening? Please let me know your preferences.",
  },
]

const localStorageKeyGetLastState = "menu:last:active"

export function retrieveMenuState(): NavMainActiveItem {
  const menuSectionKey : string | null = localStorage.getItem(localStorageKeyGetLastState);
  if (menuSectionKey){
    return JSON.parse(menuSectionKey) as NavMainActiveItem;
  } else {
    return DEFAULT_ACTIVE;
  }
}


export function retrieveSubMenuState(key: string): SubItem | null {
  const localStorageKeyGetLastSubItem = `menu:last:${key}:active`
  const result : string | null = localStorage.getItem(localStorageKeyGetLastSubItem);
  if (!result){
    return null;
  } else {
    return JSON.parse(result) as SubItem;
  }
}

export function saveSubMenuState(key: string, item: SubItem): void {
  const localStorageKeyGetLastSubItem = `menu:last:${key}:active`
  localStorage.setItem(localStorageKeyGetLastSubItem, JSON.stringify(item));
}

export default function SPABaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [activeItem, setActiveItem] = React.useState<NavMainActiveItem>(retrieveMenuState())

  useEffect(() => {
    localStorage.setItem(localStorageKeyGetLastState, JSON.stringify(activeItem))
    if (activeItem.item) {
      saveSubMenuState(activeItem.key, activeItem.item)
    }
  }, [activeItem]);
  return (
    <>
      <DragWindowRegion title={App_manifest.name} />
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
          loadLastActiveSubItem={retrieveSubMenuState}
          getActiveItemSubItems={(_: string) => mails}
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
    </>
  );
}

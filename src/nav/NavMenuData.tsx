// This is sample data
import { MenuData, NavMainActiveItem } from "@/components/AppSideBar";
import {
  BookText,
  Compass,
  DraftingCompass,
  LayoutDashboard,
  Settings,
  TriangleAlert,
} from "lucide-react";

const NavMenuData: MenuData = {
  navMain: [{
    key: 'dashboard',
    url: "/",
    items : [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        isActive: true,
        hasSubItems: false
      }
    ]},
    {
      key: "project",
      url: "/project",
      items: [
        {
          title: "Status",
          icon: LayoutDashboard,
          isActive: true,
          hasSubItems: true
        },
        {
          title: "Projects overview",
          icon: BookText,
          isActive: true,
          hasSubItems: true
        },
        {
          title: "Architecture",
          icon: DraftingCompass,
          isActive: false,
          hasSubItems: true
        },
        {
          title: "Threat Landscape",
          icon: TriangleAlert,
          isActive: false,
          hasSubItems: true
        },
        {
          title: "Control Center",
          icon: Settings,
          isActive: false,
          hasSubItems: true
        }]},
    {
      key: "paradigm",
      url: '/paradigm',
      items: [
        {
          title: "Security Paradigm",
          icon: Compass,
          isActive: false,
          hasSubItems: true
        }]
    }
  ]
}

export const DEFAULT_ACTIVE: NavMainActiveItem = {
  key: NavMenuData.navMain[0].key,
  navItem: NavMenuData.navMain[0].items[0],
  item: null,
}
export default NavMenuData;
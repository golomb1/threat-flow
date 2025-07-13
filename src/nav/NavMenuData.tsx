// This is sample data
import { MenuData, NavMainActiveItem } from "@/components/AppSideBar";
import {
  BookText,
  Compass,
  DraftingCompass, Gauge,
  LayoutDashboard,
  Settings,
  TriangleAlert,
} from "lucide-react";

const NavMenuData: MenuData = {
  navMain: [{
    key: 'dashboard',
    items : [
      {
        title: "Dashboard",
        url: "/",
        icon: Gauge,
        isActive: true,
        hasSubItems: false
      }
    ]},
    {
      key: "project",
      items: [
        {
          title: "Status",
          url: "/project/status/$projectId",
          icon: LayoutDashboard,
          isActive: true,
          hasSubItems: true
        },
        {
          title: "Projects overview",
          url: "/project/projects_overview/$projectId",
          icon: BookText,
          isActive: true,
          hasSubItems: true
        },
        {
          title: "Architecture",
          url: "/project/architecture/$projectId",
          icon: DraftingCompass,
          isActive: false,
          hasSubItems: true
        },
        {
          title: "Threat Landscape",
          url: "/project/landscape/$projectId",
          icon: TriangleAlert,
          isActive: false,
          hasSubItems: true
        },
        {
          title: "Control Center",
          url: "/project/control_center/$projectId",
          icon: Settings,
          isActive: false,
          hasSubItems: true
        }]},
    {
      key: "paradigm",
      items: [
        {
          title: "Security Paradigm",
          url: '/security_paradigm',
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
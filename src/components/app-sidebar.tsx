"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { navData } from "@/components/nav-data";
import { NavUser } from "./nav-user";
import { NavMain } from "./nav-main";

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" variant="sidebar" {...props}>
      <SidebarHeader>
        <Button variant="ghost" size="icon">
          <Logo className="w-6 h-6" />
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <NavMain data={navData} />
      </SidebarContent>
      <SidebarFooter className="border-t">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}

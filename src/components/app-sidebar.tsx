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
import Link from "next/link";

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" variant="sidebar" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Link href="/">
              <Logo className="w-6 h-6" />
            </Link>
          </Button>
          <h1 className="font-bold text-lg">Vault Hub</h1>
        </div>
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

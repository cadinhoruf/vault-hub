"use client";

import { type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function NavMain({
  data,
}: {
  data: {
    title: string;
    items?: {
      title: string;
      url: string;
      icon?: LucideIcon;
      isActive?: boolean;
    }[];
  }[];
}) {
  const pathname = usePathname();
  return (
    <>
      {data.map((item) => (
        <SidebarGroup key={item.title}>
          <SidebarGroupLabel className="font-semibold">
            {item.title}
          </SidebarGroupLabel>
          <SidebarMenu>
            {item.items?.map((subItem) => {
              const isActive = pathname.startsWith(subItem.url);
              return (
                <SidebarMenuItem key={subItem.title}>
                  <Link href={subItem.url}>
                    <SidebarMenuButton
                      tooltip={subItem.title}
                      className={cn(
                        isActive &&
                          "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                      )}
                    >
                      {subItem.icon && <subItem.icon />}
                      {subItem.title}
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}

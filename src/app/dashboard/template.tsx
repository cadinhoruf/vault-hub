import "../globals.css";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { ThemeProvider } from "next-themes";
import { BreadcrumbPathname } from "@/components/breadcrumb-pathname";
import { api } from "@/igniter.client";
import { redirect } from "next/navigation";

export default async function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  const { data } = await api.auth.getSession.query();
  if (!data) {
    redirect("/");
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <SidebarInset>
          <header className="top-0 z-10 isolate sticky inset-x-0 flex items-center gap-2 bg-background border-b shrink-0">
            <div className="flex items-center gap-2 px-4 w-full h-14">
              <SidebarTrigger className="-ml-1.5 size-7" />
              <Separator orientation="vertical" className="mr-2 !h-4" />
              <BreadcrumbPathname />
            </div>
          </header>
          <main className="p-4 h-full">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}

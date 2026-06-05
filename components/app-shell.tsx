"use client";

import {
  BotIcon,
  BrainIcon,
  LayoutDashboardIcon,
  ListTodoIcon,
  SparklesIcon,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navItems = [
  {
    href: "/",
    icon: LayoutDashboardIcon,
    label: "Dashboard",
    active: true,
  },
  {
    href: "#tasks",
    icon: ListTodoIcon,
    label: "Tasks",
    active: false,
  },
  {
    href: "#memory",
    icon: BrainIcon,
    label: "Memory",
    active: false,
  },
  {
    href: "#studio",
    icon: SparklesIcon,
    label: "Content Studio",
    active: false,
  },
  {
    href: "#startup-lab",
    icon: BotIcon,
    label: "Startup Lab",
    active: false,
  },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="gap-2 p-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <BotIcon className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="truncate font-medium text-sm">admin-agent-GUI</p>
              <p className="truncate text-muted-foreground text-xs">
                Agentic business OS
              </p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      isActive={item.active}
                      tooltip={item.label}
                      render={
                        <Link href={item.href}>
                          <item.icon />
                          <span>{item.label}</span>
                        </Link>
                      }
                    />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <Badge variant="secondary">Phase 1 · Foundation</Badge>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator className="h-4" orientation="vertical" />
          <div className="min-w-0">
            <p className="truncate font-medium text-sm">Human–Agent Workspace</p>
            <p className="truncate text-muted-foreground text-xs">
              Shared Prisma database with proto-2 (coming soon)
            </p>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

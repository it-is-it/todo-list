"use client";

import * as React from "react";
import { CheckCircle, Home, Inbox, Trash2 } from "lucide-react";

import { NavTasks } from "@/app/(dashboard)/tasks/components/nav-Tasks";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

export interface task {
  uuid: string;
  user: number;
  title: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  description: string;
  created_at?: string;
  updated_at?: string;
}

const data = {
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
      isActive: true,
    },
    {
      title: "Inbox",
      url: "/inbox",
      icon: Inbox,
      badge: "10",
    },
  ],
  navSecondary: [
    {
      title: "Completed",
      url: "/tasks/completed",
      icon: CheckCircle,
    },
    {
      title: "Trash",
      url: "/tasks/trash",
      icon: Trash2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavTasks />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

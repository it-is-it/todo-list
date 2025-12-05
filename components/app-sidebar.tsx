"use client";

import * as React from "react";
import { CheckCircle, Home, Inbox, Trash2 } from "lucide-react";

import { NavFavorites } from "@/components/nav-favorites";
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
  status: "TODO" | "IN_PROGRESS" | "DONE"; // optional: strict enum
  description: string;
  created_at?: string;
  updated_at?: string;
  // add any other fields your API returns
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
  // tasks: [
  //   {
  //     name: "Project Management & Task Tracking",
  //     url: "#",
  //     emoji: "📊",
  //   },
  //   {
  //     name: "Family Recipe Collection & Meal Planning",
  //     url: "#",
  //     emoji: "🍳",
  //   },
  //   {
  //     name: "Fitness Tracker & Workout Routines",
  //     url: "#",
  //     emoji: "💪",
  //   },
  //   {
  //     name: "Book Notes & Reading List",
  //     url: "#",
  //     emoji: "📚",
  //   },
  //   {
  //     name: "Sustainable Gardening Tips & Plant Care",
  //     url: "#",
  //     emoji: "🌱",
  //   },
  //   {
  //     name: "Language Learning Progress & Resources",
  //     url: "#",
  //     emoji: "🗣️",
  //   },
  //   {
  //     name: "Home Renovation Ideas & Budget Tracker",
  //     url: "#",
  //     emoji: "🏠",
  //   },
  //   {
  //     name: "Personal Finance & Investment Portfolio",
  //     url: "#",
  //     emoji: "💰",
  //   },
  //   {
  //     name: "Movie & TV Show Watchlist with Reviews",
  //     url: "#",
  //     emoji: "🎬",
  //   },
  //   {
  //     name: "Daily Habit Tracker & Goal Setting",
  //     url: "#",
  //     emoji: "✅",
  //   },
  // ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

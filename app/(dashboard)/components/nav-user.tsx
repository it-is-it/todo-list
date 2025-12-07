"use client";

import * as React from "react";
import { UserCircle, UserIcon, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useMutation } from "@tanstack/react-query";
import { logoutAction } from "@/app/(auth)/action";
import { useRouter } from "next/navigation";

export function NavUser() {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();

  const logout = useMutation({
    mutationFn: async () => {
      return await logoutAction();
    },
    onSuccess: () => {
      setIsOpen(false);
      router.push("/login");
      router.refresh();
    },
  });

  const data = [
    [
      {
        label: "User Name",
        icon: UserCircle,
        onClick: () => {},
      },
      {
        label: "Logout",
        icon: LogOut,
        onClick: () => {
          logout.mutate();
        },
      },
    ],
  ];

  return (
    <div className="flex items-center gap-2 text-sm">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="data-[state=open]:bg-accent h-7 w-7 rounded-full"
          >
            <UserIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-56 overflow-hidden rounded-lg p-0"
          align="end"
        >
          <Sidebar collapsible="none" className="bg-transparent">
            <SidebarContent>
              {data.map((group, index) => (
                <SidebarGroup key={index} className="border-b last:border-none">
                  <SidebarGroupContent className="gap-0">
                    <SidebarMenu>
                      {group.map((item, index) => (
                        <SidebarMenuItem key={index}>
                          <SidebarMenuButton onClick={item.onClick}>
                            <item.icon /> <span>{item.label}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </SidebarContent>
          </Sidebar>
        </PopoverContent>
      </Popover>
    </div>
  );
}

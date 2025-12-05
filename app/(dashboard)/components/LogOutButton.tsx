"use client";

import { LogOut } from "lucide-react";
import { useLogout } from "../../(auth)/useLogout";

export default function LogOutButton() {
  const logout = useLogout();

  return (
    <div
      className="flex items-center gap-2 p-4 text-gray-600 hover:bg-gray-100 rounded-b-md cursor-pointer"
      onClick={() => logout.mutate()}
    >
      <LogOut className="h-5 w-5" />
      <button className="text-left w-full">Logout</button>
    </div>
  );
}

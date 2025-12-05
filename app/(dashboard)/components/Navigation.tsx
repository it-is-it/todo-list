"use client";

import { usePathname } from "next/navigation";

// import CreateList from "@/app/components/CreateList";

export default function Navigation() {
  const pathname = usePathname();

  function formatTitle(path: string) {
    if (path === "/") return "Home";
    return path
      .replace("/", "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  return (
    <div className="flex min-h-screen w-full">
      <span>{formatTitle(pathname)}</span>
      {/* {pathname === "/" && <span>({homeCount})</span>}
            {pathname === "/inbox" && <span>({inboxCount})</span>} */}
    </div>
  );
}

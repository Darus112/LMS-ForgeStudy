"use client";

import React from "react";
import { cn } from "@/lib/utils";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "px-4 py-2 text-lightgray font-semibold hover:text-darkblue transition duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-darkblue after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100",
        isActive &&
          "text-lightblue bg-lightblue/5  hover:text-darkblue border-r-2 border-darkblue"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon size={22} />
        {label}
      </div>
    </button>
  );
};

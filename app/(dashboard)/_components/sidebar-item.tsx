"use client";

import React from "react";
import { cn } from "@/lib/utils";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  onClick?: () => void;
}

export const SidebarItem = ({
  icon: Icon,
  label,
  href,
  onClick,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    router.push(href);
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={cn(
        "px-4 py-2 text-lightgray dark:text-gray-500 font-semibold hover:text-darkblue dark:hover:text-white transition duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-darkblue/40 dark:after:bg-white/90 after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100",
        isActive &&
          "text-lightblue dark:text-white/80 bg-lightblue/5 dark:bg-white/20 hover:text-darkblue dark:hover:text-white"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon size={22} />
        {label}
      </div>
    </button>
  );
};

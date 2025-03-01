"use client";

import { BarChart, Compass, Layout, List } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

interface SidebarRoutesProps {
  closeSidebar?: () => void;
}

export const SidebarRoutes = ({ closeSidebar }: SidebarRoutesProps) => {
  const pathname = usePathname();
  const { userId } = useAuth();

  const isTeacherPage = pathname?.includes("/teacher");

  const guestRoutes = [
    {
      icon: Compass,
      label: "Browse",
      href: "/search",
    },
  ];

  if (userId) {
    guestRoutes.unshift({
      icon: Layout,
      label: "Dashboard",
      href: "/",
    });
  }

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
          onClick={closeSidebar}
        />
      ))}
    </div>
  );
};

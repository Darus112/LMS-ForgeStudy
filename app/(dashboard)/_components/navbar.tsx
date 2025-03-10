import React from "react";
import { MobileSidebar } from "./mobile-sidebar";
import NavbarRoutes from "@/components/navbar-routes";

export const Navbar = () => {
  return (
    <div className="p-4 h-full flex items-center bg-white dark:bg-dark border-b-[1px] border-darkblue/20 dark:border-white/20">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};

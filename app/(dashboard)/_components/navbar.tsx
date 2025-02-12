import React from "react";
import { MobileSidebar } from "./mobile-sidebar";
import NavbarRoutes from "@/components/navbar-routes";

export const Navbar = () => {
  return (
    <div className="p-4 h-full flex items-center bg-white ">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};

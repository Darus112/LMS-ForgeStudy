import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = () => {
  return (
    <div className="h-full  border-darkblue flex flex-col overflow-y-auto bg-white shadow-[3px_0px_6px_0px_rgba(0,_0,_0,_0.1)]">
      <div className=" p-6 flex justify-end md:justify-start bg-[#4556FB] shadow-md">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};

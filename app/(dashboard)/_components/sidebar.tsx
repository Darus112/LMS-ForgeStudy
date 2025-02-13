import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

interface SidebarProps {
  onClick?: () => void;
}

export const Sidebar = ({ onClick }: SidebarProps) => {
  return (
    <div className="h-full flex flex-col overflow-y-auto bg-white shadow-[28px_4px_29px_-3px_rgba(71,_85,_105,_0.08)]">
      <div className=" p-6 flex justify-end md:justify-start bg-[#4556FB] ">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes closeSidebar={onClick} />
      </div>
    </div>
  );
};

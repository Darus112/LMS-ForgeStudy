import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

interface SidebarProps {
  onClick?: () => void;
}

export const Sidebar = ({ onClick }: SidebarProps) => {
  return (
    <div className="h-full flex flex-col overflow-y-auto bg-white border-r-[1px] border-darkblue/40">
      <div className=" p-6 flex justify-end md:justify-start">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes closeSidebar={onClick} />
      </div>
    </div>
  );
};

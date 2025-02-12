import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-full bg-white">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="md:flex h-full w-56 flex-col fixed inset-y-0 z-50 hidden">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] h-full ">{children}</main>
    </div>
  );
};

export default DashboardLayout;

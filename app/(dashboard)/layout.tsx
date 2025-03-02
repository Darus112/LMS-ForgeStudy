"use client";

import Image from "next/image";

import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

import { useTheme } from "next-themes";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  const backgroundImage = theme === "dark" ? "/bg1-dark.png" : "/bg1-light.png";
  return (
    <div className="min-h-full relative">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-40">
        <Navbar />
      </div>
      <div className="md:flex h-full w-56 flex-col fixed inset-y-0 z-40 hidden">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] h-screen relative ">
        <div className=" inset-0 w-full h-full z-0 fixed bg-white dark:bg-dark">
          <Image
            src={backgroundImage}
            alt="Background Image"
            layout="fill"
            objectFit="cover"
            quality={100}
            unoptimized={true}
            priority={true}
          />
        </div>
        <div className="relative z-10">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;

"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { isTeacher } from "@/lib/teacher";

import { SearchInput } from "./search-input";
import ButtonMotion from "./ui/button-motion";
import { ArrowRight } from "lucide-react";

const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.startsWith("/courses");
  const isSearchPage = pathname === "/search";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <ButtonMotion icon={ArrowRight}>Exit</ButtonMotion>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <ButtonMotion icon={ArrowRight}>Teacher Mode</ButtonMotion>
          </Link>
        ) : null}
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: "w-12 h-12",
              userButtonPopoverFooter: "hidden",
              userButtonPopoverCard:
                "rounded-3xl  border-2 border-lightblue/40",
              userButtonPopoverMain: "bg-white",
              userPreviewTextContainer: "text-lightblue font-medium",
            },
          }}
        />
      </div>
    </>
  );
};

export default NavbarRoutes;

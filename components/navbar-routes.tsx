"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { isTeacher } from "@/lib/teacher";

import { SearchInput } from "./search-input";
import ButtonMotion from "./ui/button-motion";
import { ArrowRight, LogIn } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

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

        {!userId ? (
          <Link href="/sign-in">
            <ButtonMotion icon={LogIn}>Sign In</ButtonMotion>
          </Link>
        ) : (
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "w-10 h-10",
                userButtonPopoverFooter: "hidden",
                userButtonPopoverCard:
                  "rounded-3xl  border-2 border-lightblue/40",
                userButtonPopoverMain: "bg-white",
                userPreviewTextContainer: "text-lightblue font-medium",
              },
            }}
          />
        )}
        <ThemeToggle />
      </div>
    </>
  );
};

export default NavbarRoutes;

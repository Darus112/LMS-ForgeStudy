import { AlignJustify } from "lucide-react";
import { Chapter, Course, UserProgress } from "@prisma/client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { CourseSidebar } from "./course-sidebar";

interface CourseMobileSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export const CourseMobileSidebar = ({
  course,
  progressCount,
}: CourseMobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <AlignJustify className="text-lightblue h-8 w-8 stroke-1" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white w-2/3 border-none">
        <CourseSidebar course={course} progressCount={progressCount} />
      </SheetContent>
    </Sheet>
  );
};

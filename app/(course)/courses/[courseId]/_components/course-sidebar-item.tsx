"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface CourseSidebarItemProps {
  id: string;
  label: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
}

export const CourseSidebarItem = ({
  id,
  label,
  isCompleted,
  courseId,
  isLocked,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const getIcon = () => {
    if (isLocked) return Lock;
    if (isCompleted) return CheckCircle;
    return PlayCircle;
  };

  const Icon = getIcon();

  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "px-4 py-2 text-lightgray font-semibold transition duration-300 relative",
        "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right",
        "after:scale-x-0 after:bg-darkblue after:transition-transform after:duration-300",
        "hover:after:origin-bottom-left hover:after:scale-x-100",
        isActive &&
          isCompleted &&
          "text-[#50c878] bg-[#50c878]/10 hover:text-[#50c878] border-r-2 border-darkblue",
        isActive &&
          !isCompleted &&
          "text-darkblue bg-darkblue/10 hover:text-darkblue border-r-2 border-darkblue",
        isCompleted && "hover:text-[#50c878]",
        !isCompleted && "hover:text-darkblue"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "text-slate-400",
            isActive && "text-darkblue",
            isCompleted && "text-[#50c878]"
          )}
        />
        {label}
      </div>
    </button>
  );
};

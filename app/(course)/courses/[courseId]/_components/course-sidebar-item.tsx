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
        "after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right",
        "after:scale-x-0 after:bg-darkblue/40 dark:after:bg-white/40 after:transition-transform after:duration-300",
        "hover:after:origin-bottom-left hover:after:scale-x-100",
        isActive &&
          isCompleted &&
          "text-[#50c878] dark:text-emerald-400/30 bg-[#50c878]/10 hover:text-[#50c878] ",
        isActive &&
          !isCompleted &&
          "text-darkblue dark:text-white/80 bg-darkblue/10 dark:bg-white/20  hover:text-darkblue dark:hover:text-gray-200",
        isCompleted && "hover:text-[#50c878] dark:hover:text-emerald-400/60",
        !isCompleted && "hover:text-darkblue dark:hover:text-gray-200"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "text-slate-400",
            isActive && "text-darkblue dark:text-white/80",
            isCompleted && "text-[#50c878] dark:text-emerald-400/60"
          )}
        />
        {label}
      </div>
    </button>
  );
};

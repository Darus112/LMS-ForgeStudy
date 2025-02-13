import { IconBadge } from "@/components/icon-badge";
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  icon: LucideIcon;
  label: string;
  numberOfItems: number;
  variant?: "default" | "success";
}

export const InfoCard = ({
  variant,
  icon: Icon,
  numberOfItems,
  label,
}: InfoCardProps) => {
  return (
    <div className=" rounded-full flex items-center gap-x-2 p-3 pl-7 ">
      <IconBadge variant={variant} icon={Icon} size="xl" />
      <div>
        <p className="font-semibold text-5xl sm:text-6xl text-darkblue">
          {label}
        </p>
        <p className="text-gray-500 text-xl font-medium">
          {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
        </p>
      </div>
    </div>
  );
};

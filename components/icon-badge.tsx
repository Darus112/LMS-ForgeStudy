import { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const iconVariants = cva("", {
  variants: {
    variant: {
      default: "text-lightblue dark:text-slate-400",
      success: "text-[#50c878] dark:text-slate-100",
    },
    size: {
      default: "h-8 w-8",
      xl: "h-12 w-12",
      lg: "h-10 w-10",
      md: "h-5 w-5",
      sm: "h-4 w-4",
    },
    stroke: {
      default: "stroke-2",
      thin: "stroke-1",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    stroke: "default",
  },
});

type IconVariantsProps = VariantProps<typeof iconVariants>;

interface IconBadgeProps extends IconVariantsProps {
  icon: LucideIcon;
}

export const IconBadge = ({
  icon: Icon,
  variant,
  size,
  stroke,
}: IconBadgeProps) => {
  return <Icon className={cn(iconVariants({ variant, size, stroke }))} />;
};

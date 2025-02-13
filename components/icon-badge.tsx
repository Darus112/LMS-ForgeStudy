import { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const iconVariants = cva("", {
  variants: {
    variant: {
      default: "text-lightblue",
      success: "text-[#50c878]",
    },
    size: {
      default: "h-8 w-8",
      xl: "h-12 w-12",
      lg: "h-10 w-10",
      md: "h-5 w-5",
      sm: "h-4 w-4",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type IconVariantsProps = VariantProps<typeof iconVariants>;

interface IconBadgeProps extends IconVariantsProps {
  icon: LucideIcon;
}

export const IconBadge = ({ icon: Icon, variant, size }: IconBadgeProps) => {
  return <Icon className={cn(iconVariants({ variant, size }))} />;
};

import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted bg-gray-300 dark:bg-gray-800",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };

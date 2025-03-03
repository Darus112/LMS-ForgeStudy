import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="p-6 space-y-4">
      <div className="flex space-x-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full rounded-sm" />
        ))}
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 pt-5">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className=" rounded-md aspect-video" />
            <Skeleton className="h-5 w-2/4 rounded-md" />
            <Skeleton className="h-7 w-3/4 rounded-md" />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-5 w-1/3 rounded-md" />
            </div>
            <Skeleton className="h-5 w-1/2 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;

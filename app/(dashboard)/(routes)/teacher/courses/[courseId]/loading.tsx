import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <Skeleton className="h-8 w-48 rounded-md" />
          <Skeleton className="h-5 w-40 rounded-md" />
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <Skeleton className="h-10 w-32 rounded-md" />
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-48 rounded-md" />
          </div>
          <div className="space-y-4 mt-4">
            <Skeleton className="h-28 w-full rounded-md" />
            <Skeleton className="h-28 w-full rounded-md" />
            <Skeleton className=" aspect-video rounded-md" />
            <Skeleton className="h-28 w-full rounded-md" />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-48 rounded-md" />
            </div>
            <Skeleton className="h-52 w-full rounded-md mt-4" />
          </div>

          <div>
            <div className="flex items-center gap-x-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-48 rounded-md" />
            </div>
            <Skeleton className="h-28 w-full rounded-md mt-4" />
          </div>

          <div>
            <div className="flex items-center gap-x-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-48 rounded-md" />
            </div>
            <Skeleton className="h-32 w-full rounded-md mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;

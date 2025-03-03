import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 rounded-md">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
      </div>
      <div className="w-full h-full space-y-9">
        <Skeleton className="w-full h-[400px]" />
        <Skeleton className="w-full h-[400px]" />
      </div>
    </div>
  );
};

export default Loading;

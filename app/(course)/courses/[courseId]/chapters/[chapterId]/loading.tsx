import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex flex-col max-w-4xl mx-auto mt-20 space-y-10 px-4">
      <Skeleton className="aspect-video" />
      <Skeleton className="w-full h-52" />
      <Skeleton className="w-full h-44" />
    </div>
  );
};

export default Loading;

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="p-6 space-y-4 pt-10">
      <div className="flex space-x-4 mb-4">
        <Skeleton className="h-10 w-1/3 rounded-md" />
      </div>
      <div className="overflow-x-auto border-[1px] rounded-sm">
        <table className="min-w-full  ">
          <thead>
            <tr className="border-b">
              <th className="py-3 px-4 text-left">
                <Skeleton className="h-6 w-20 rounded-md" />
              </th>
              <th className="py-3 px-4 text-left">
                <Skeleton className="h-6 w-20 rounded-md" />
              </th>
              <th className="py-3 px-4 text-left">
                <Skeleton className="h-6 w-20 rounded-md" />
              </th>
              <th className="py-3 px-4 text-left">
                <Skeleton className="h-6 w-20 rounded-md" />
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 8 }).map((_, i) => (
              <tr key={i} className="border-b">
                <td className="py-3 px-4">
                  <Skeleton className="h-6 w-20 rounded-md" />
                </td>
                <td className="py-3 px-4">
                  <Skeleton className="h-6 w-20 rounded-md" />
                </td>
                <td className="py-3 px-4">
                  <Skeleton className="h-6 w-20 rounded-md" />
                </td>
                <td className="py-3 px-4">
                  <Skeleton className="h-6 w-20 rounded-md" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex space-x-2 items-center justify-end">
        <Skeleton className="h-10 w-20 rounded-md" />
        <Skeleton className="h-10 w-12 rounded-md" />
      </div>
    </div>
  );
};

export default Loading;

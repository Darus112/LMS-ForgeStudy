"use client";

import { cn } from "@/lib/utils";

import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons/lib";

interface CategoryItemProps {
  label: string;
  value?: string;
  icon?: IconType;
}

export const CategoryItem = ({
  label,
  value,
  icon: Icon,
}: CategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "py-2 px-3 text-sm bg-[#ffffff] rounded-sm flex items-center gap-x-1 hover:border-lightblue border-[1px] border-darkblue/20 text-lightblack font-medium transition ",
        isSelected && "border-lightblue bg-lightblue/5 text-lightblue"
      )}
      type="button"
    >
      {Icon && <Icon size={20} />}
      <div className="truncate">{label}</div>
    </button>
  );
};

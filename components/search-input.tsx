"use client";

import qs from "query-string";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/use-debounce";
import { motion } from "framer-motion";

export const SearchInput = () => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false); // Adăugăm stare pentru focus
  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: currentCategoryId,
          title: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [debouncedValue, currentCategoryId, router, pathname]);

  return (
    <div className="relative">
      <motion.div
        className="absolute top-3 left-3 text-lightblack"
        animate={{
          scale: isFocused ? 1.5 : 1,
          color: isFocused ? "#0a21c0" : "#6B7280",
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
      >
        <Search className="h-4 w-4" />
      </motion.div>
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full md:w-[300px] pl-9 rounded-full bg-[#ffffff] focus-visible:ring-lightblue shadow-[0px_10px_40px_-6px_rgba(71,_85,_105,_0.08)] font-medium"
        placeholder="Search for a course"
      />
    </div>
  );
};

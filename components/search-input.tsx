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
    <div className="relative ml-2">
      <motion.div
        className="absolute top-2 left-2 text-lightblack"
        animate={{
          scale: isFocused ? 1.2 : 1,
          color: isFocused ? "#0a21c0" : "#6B7280",
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
      >
        <Search className="h-6 w-6" />
      </motion.div>
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full lg:w-[400px] pl-10 font-light dark:bg-white/10 bg-dark/5 focus-visible:ring-0 text-lg"
        placeholder="Search for a course"
      />
    </div>
  );
};

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
        className="absolute top-1  text-lightblack"
        animate={{
          scale: isFocused ? 1.5 : 1,
          color: isFocused ? "#0a21c0" : "#6B7280",
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
      >
        <Search className="h-8 w-8" />
      </motion.div>
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full md:w-[400px] pl-10 rounded-full bg-transparent focus-visible:ring-0 font-medium text-2xl"
        placeholder="Search for a course..."
      />
    </div>
  );
};

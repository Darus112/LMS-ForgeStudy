"use client";

import React from "react";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full focus-visible:ring-0"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="absolute rotate-0 scale-125 dark:-rotate-90 dark:scale-0 transition-all" />
      <Moon className="absolute rotate-90 scale-0 dark:-rotate-0 dark:scale-125 transition-all" />
    </Button>
  );
}

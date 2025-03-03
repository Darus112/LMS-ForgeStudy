"use client";

import Image from "next/image";

import { useTheme } from "next-themes";

import React, { useEffect, useState } from "react";

export const ImageToggle = () => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  const currentTheme = theme === "system" ? systemTheme : theme;

  const backgroundImage =
    currentTheme === "dark" ? "/bg2-dark.png" : "/bg2-light.png";
  return (
    <Image
      src={backgroundImage}
      alt="Background Image"
      layout="fill"
      objectFit="cover"
      quality={100}
      unoptimized={true}
      priority={true}
    />
  );
};

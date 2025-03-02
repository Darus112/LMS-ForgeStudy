"use client";

import Image from "next/image";

import { useTheme } from "next-themes";

import React from "react";

export const ImageToggle = () => {
  const { theme } = useTheme();

  const backgroundImage = theme === "dark" ? "/bg2-dark.png" : "/bg2-light.png";
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

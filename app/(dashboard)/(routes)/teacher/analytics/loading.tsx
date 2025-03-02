"use client";

import React from "react";
import { ScaleLoader } from "react-spinners";

import { useTheme } from "next-themes";

const Loading = () => {
  const { theme } = useTheme();

  const color = theme === "dark" ? "#D0CECA" : "#1A2FFB";
  return (
    <div className="flex items-center justify-center h-96">
      <ScaleLoader margin={3} height={50} color={color} />
    </div>
  );
};

export default Loading;

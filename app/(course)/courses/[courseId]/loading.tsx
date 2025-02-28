"use client";

import React from "react";
import { ScaleLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-96">
      <ScaleLoader margin={3} height={50} color="#1A2FFB" />
    </div>
  );
};

export default Loading;

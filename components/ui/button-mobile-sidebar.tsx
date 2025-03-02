import React from "react";

import { motion } from "framer-motion";

interface ButtonMobileSidebarProps {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ButtonMobileSidebar({
  isActive,
  setIsActive,
}: ButtonMobileSidebarProps) {
  return (
    <div
      className="h-[40px] w-[80px] rounded-sm  cursor-pointer relative overflow-hidden text-sm font-medium z-30"
      onClick={() => {
        setIsActive(!isActive);
      }}
    >
      <motion.div
        className="relative h-full w-full text-white"
        animate={{ top: isActive ? "-100%" : "0" }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="w-full h-full  bg-[#cfd4ff] dark:bg-[#2B2E31] text-gray-500 dark:text-[#898989] flex items-center justify-center uppercase">
          <p>Menu</p>
        </div>
        <div className="w-full h-full bg-white dark:bg-dark text-lightblack dark:text-white flex items-center justify-center uppercase">
          <p>Close</p>
        </div>
      </motion.div>
    </div>
  );
}

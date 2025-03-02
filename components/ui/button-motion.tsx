"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

interface ButtonProps {
  children: ReactNode;
  icon: LucideIcon;
  onClick?: () => void;
  size?: "small" | "default";
  iconSize?: "small" | "default";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const sizeClasses = {
  small: "px-8 py-1 text-medium",
  default: "px-9 py-2 text-base",
};

const iconSizeClasses = {
  small: "h-4 w-4",
  default: "h-6 w-6",
};

const Button: React.FC<ButtonProps> = ({
  children,
  icon: Icon,
  onClick,
  size = "default",
  iconSize = "default",
  type = "button",
  disabled = false,
}) => {
  const [isHover, setIsHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { theme } = useTheme();

  const isDarkMode = theme === "dark";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={cn(
        "flex items-center justify-center relative overflow-clip cursor-pointer rounded-sm bg-[#ffffff] dark:bg-[#2B2E31] border-[1px] dark:border-white/5 transition-all",
        sizeClasses[size],
        disabled ? "opacity-30 cursor-not-allowed" : ""
      )}
      onClick={onClick}
      onMouseEnter={() => !isMobile && setIsHover(true)}
      onMouseLeave={() => !isMobile && setIsHover(false)}
      whileTap={{ scale: isMobile ? 1 : 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {!isMobile && (
        <motion.div
          className={cn(
            "w-2 h-2 rounded-full absolute left-4 bg-[#cfd4ff] dark:bg-[#898989]"
          )}
          animate={{
            scale: isHover ? 50 : 1,
          }}
          transition={{
            ease: "easeIn",
            duration: 0.18,
          }}
        />
      )}
      <motion.div
        className={cn("tracking-tight font-medium z-10")}
        animate={{
          x: isMobile ? -10 : isHover ? -5 : 5,
          color: isHover ? "#FFFFFF" : isDarkMode ? "#898989" : "#15171B",
        }}
        transition={{
          duration: 0.22,
        }}
      >
        <p>{children}</p>
      </motion.div>
      <motion.div
        className="absolute flex items-center justify-center right-2"
        animate={{
          x: isMobile ? 0 : isHover ? 0 : 35,
          color: isHover
            ? "#FFFFFF"
            : isMobile
            ? isDarkMode
              ? "#898989"
              : "#15171B"
            : isDarkMode
            ? "#2B2E31"
            : "#FFFFFF",
        }}
        transition={{
          duration: 0.2,
        }}
      >
        <div className="absolute flex items-center justify-center right-1">
          <Icon className={cn("", iconSizeClasses[iconSize])} />
        </div>
      </motion.div>
    </motion.button>
  );
};

export default Button;

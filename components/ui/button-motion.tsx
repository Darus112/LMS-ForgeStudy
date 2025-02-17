"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

interface ButtonProps {
  children: ReactNode;
  icon: LucideIcon;
  onClick?: () => void;
  size?: "small" | "default";
  iconSize?: "small" | "default";
  color?: "darkblue" | "default" | "emerald" | "grey";
  text?: "darkblue" | "default" | "emerald" | "grey";
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

const colorClasses = {
  darkblue: "bg-[#050a44] ",
  default: "bg-[#1A2FFB] ",
  emerald: "bg-[#50c878] ",
  grey: "bg-[#898989] ",
};

const textClasses = {
  darkblue: "text-[#050a44]",
  default: "text-[#1A2FFB]",
  emerald: "text-[#50c878]",
  grey: "text-[#898989]",
};

const Button: React.FC<ButtonProps> = ({
  children,
  icon: Icon,
  onClick,
  size = "default",
  iconSize = "default",
  color = "default",
  text = "default",
  type = "button",
  disabled = false,
}) => {
  const [isHover, setIsHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const iconColor = isMobile
    ? text === "darkblue"
      ? "#050a44"
      : text === "emerald"
      ? "#50c878"
      : text === "grey"
      ? "#898989"
      : "#1A2FFB"
    : "#ffffff";

  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={cn(
        "flex items-center justify-center relative overflow-clip cursor-pointer rounded-sm bg-[#ffffff] border-[1px] transition-all",
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
            "w-2 h-2 rounded-full absolute left-4",
            colorClasses[color]
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
        className={cn("tracking-tight font-medium z-10", textClasses[text])}
        animate={{
          x: isMobile ? -10 : isHover ? -5 : 5,
          color: isHover
            ? "#F0F1FA"
            : text === "darkblue"
            ? "#050a44"
            : text === "emerald"
            ? "#50c878"
            : text === "grey"
            ? "#898989"
            : "#1A2FFB",
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
          x: isMobile ? 0 : isHover ? 0 : 24,
        }}
        transition={{
          duration: 0.2,
        }}
      >
        <div className="absolute flex items-center justify-center right-1">
          <Icon
            className={cn("", iconSizeClasses[iconSize])}
            style={{ color: iconColor }}
          />
        </div>
      </motion.div>
    </motion.button>
  );
};

export default Button;

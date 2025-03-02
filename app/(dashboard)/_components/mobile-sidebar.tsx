"use client";

import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { Sidebar } from "./sidebar";
import ButtonMobileSidebar from "../../../components/ui/button-mobile-sidebar";

const variants = {
  open: {
    width: "100vw",
    height: "100vh",
    top: "0px",
    left: "0px",
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    width: "0vw",
    height: "0vh",
    top: "35px",
    left: "45px",
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
  },
};

export const MobileSidebar = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isActive]);

  return (
    <div className="md:hidden h-full">
      <motion.div
        className="absolute z-20 overflow-hidden"
        variants={variants}
        animate={isActive ? "open" : "closed"}
        initial="closed"
      >
        <Sidebar onClick={() => setIsActive(false)} />
      </motion.div>

      <div className="absolute top-5 left-7 ">
        <ButtonMobileSidebar isActive={isActive} setIsActive={setIsActive} />
      </div>
    </div>
  );
};

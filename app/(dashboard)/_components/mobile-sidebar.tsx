"use client";

import React, { useState } from "react";

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
    left: "35px",
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
  },
};

export const MobileSidebar = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="md:hidden h-full w-full  absolute left-0 ">
      <motion.div
        className=" relative bg-lightblue/80 z-20 "
        variants={variants}
        animate={isActive ? "open" : "closed"}
        initial="closed"
      >
        <Sidebar />
      </motion.div>
      <div className="absolute top-6 left-6 ">
        <ButtonMobileSidebar isActive={isActive} setIsActive={setIsActive} />
      </div>
    </div>
  );
};

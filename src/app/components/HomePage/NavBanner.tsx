"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const NavBanner: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true);
  
  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    open && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, delay: 0.5 }}
        className="bg-blue-500 text-sm text-center font-semibold p-3 hidden lg:block relative text-white"
      >
        Are you a university or school student looking for an online tutoring
        partnership?
        <a href="/submission" className=" text-white ml-2 underline">
          Talk to us
        </a>
        <div
          onClick={handleClose}
          className="absolute top-1/2 right-10 cursor-pointer -translate-y-1/2"
        >
          X
        </div>
      </motion.div>
    )
  );
};

export default NavBanner;

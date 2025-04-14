"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface ResponsiveMenuProps {
  open: boolean;
}

const ResponsiveMenu: React.FC<ResponsiveMenuProps> = ({ open }) => {
  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          className="absolute top-20 left-0 w-full h-screen z-20 lg:hidden"
        >
          <div className="text-xl font-semibold uppercase text-black py-10 m-6 rounded-3xl bg-blue-500">
            <ul className="flex flex-col justify-center items-center gap-10">
             <Link href={"/"}> <button className="cursor-pointer">Home</button> </Link>
             <Link href={"/"}> <button className="cursor-pointer">About us</button> </Link>
              <Link href={"/sign-in"}> <button className="cursor-pointer">Login</button> </Link>
              <Link href={"/submission"}> <button className="cursor-pointer">Book A Session</button> </Link>
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;
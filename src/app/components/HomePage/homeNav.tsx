"use client";
import React, {useState} from "react";

import { MdMenu } from "react-icons/md";
import ResponsiveMenu from "./ResponsiveMenu";

import { motion } from "framer-motion";
import Link from "next/link";


export interface NavbarMenu {
  id: number;
  title: string;
  link: string;
}

export const NavbarItem: NavbarMenu[] = [
  {
    id: 1,
    title: "Home",
    link: "/",
  },
  {
    id: 2,
    title: "For Students",
    link: "",
  },
  {
    id: 3,
    title: "For Tutors",
    link: "#",
  },
  {
    id: 4,
    title: "About us",
    link: "#",
  },
  {
    id: 5,
    title: "Contact us",
    link: "/submission",
  },
];





interface NavbarItem {
  id: number;
  title: string;
  link: string;
}



const HomeNav: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setOpen(!open);
  };

  return (
    <>
      <nav>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="min-w-full max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-20 2xl:px-24 flex justify-between items-center py-5"
        >
          {/* Logo section */}
          <div className="text-2xl flex items-center gap-2 font-bold">
            
            <p className="font-sans text-gray-600">ijtahed Academic Center</p>
          </div>
          {/* Menu section */}
          <div className="hidden lg:block">
            <ul className="flex items-center gap-6 text-gray-600">
              {NavbarItem.map((item: NavbarItem) => {
                return (
                  <li key={item.id}>
                    <Link
                      href={item.link}
                      className="
                    inline-block text-sm xl:text-base py-1 px-2 xl:px-3 hover:t font-semibold"
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* Icons section */}
          <div className="flex items-center gap-6">
            
            <Link href={"/submission"}><button className="text-white font-semibold rounded-full px-6 py-2 hidden lg:block bg-blue-500 cursor-pointer">
              Book A Session
            </button>
            </Link>
            <Link href={"/sign-in"}><button className=" font-semibold hidden lg:block rounded-full px-1 py-1 cursor-pointer">Login</button>
            </Link>
          </div>
          
          {/* Mobile hamburger Menu section */}
          <div className="lg:hidden" onClick={toggleMenu}>
            <MdMenu className="text-4xl" />
          </div>
        </motion.div>
      </nav>

      {/* Mobile Sidebar section */}
      <ResponsiveMenu open={open} />
    </>
  );
};

export default HomeNav;
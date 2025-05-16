"use client"; 

import React from "react";
import { FaPlay } from "react-icons/fa";

import { motion } from "framer-motion";
import { SlideRight } from "@/utility/animation";
import Link from "next/link";

const Hero: React.FC = () => {
  return (
    <section>
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-20 2xl:px-24 grid grid-cols-1 md:grid-cols-2 min-h-[650px] relative">
        {/* Brand Info */}
        <div className="flex flex-col justify-center py-14 md:pr-16 xl:pr-40 md:py-0 font-playfair">
          <div className="text-center md:text-left space-y-6">
            <motion.p
              variants={SlideRight(0.4)}
              initial="hidden"
              animate="visible"
              className=" uppercase font-semibold text-blue-500"
            >
              100% Satisfaction Guarantee
            </motion.p>
            <motion.h1
              variants={SlideRight(0.6)}
              initial="hidden"
              animate="visible"
              className="text-4xl lg:text-4xl font-semibold !leading-tight"
            >
              Bringing Quality Education to Every Corner of
              <span className="text-black"> Lebanon</span>{" "}
            </motion.h1>
            <motion.p
              variants={SlideRight(0.8)}
              initial="hidden"
              animate="visible"
              className="text-gray-600 xl:max-w-[500px]"
            >
              We deliver the full academic center experience to your home by connecting you with expert tutors in your city.
              
            </motion.p>
            <motion.p
              variants={SlideRight(0.8)}
              initial="hidden"
              animate="visible"
              className="text-gray-600 xl:max-w-[500px] font-extrabold text-xl"
            >
              Boost Grades & Build Confidence.
            </motion.p>
            <motion.p
              variants={SlideRight(0.8)}
              initial="hidden"
              animate="visible"
              className="text-gray-600 xl:max-w-[500px] font-extrabold text-xl"
            >
              Anytime, Anywhere.
            </motion.p>

            
            {/* button section */}
            <motion.div
              variants={SlideRight(1.0)}
              initial="hidden"
              animate="visible"
              className="flex justify-center items-center gap-8 md:justify-start !mt-8"
            >
              <Link href={"/sign-in"}>
              <button className="cursor-pointer rounded-full p-2 bg-blue-500 flex items-center gap-2 font-semibold text-white">
                Get Started
              </button>
              </Link>
              <Link href={"https://www.instagram.com/ijtahed.lb?igsh=b2UzaWt5MjNpYzU3&utm_source=qr"}>
              <button className="flex justify-center items-center gap-2 font-semibold">
                <span className="w-10 h-10 bg-secondary/15 rounded-full flex justify-center items-center">
                  <FaPlay className="text-blue-500 cursor-pointer" />
                </span>
                See how it works
              </button>
              </Link>
            </motion.div>
          </div>
        </div>
        {/* Hero Image */}
        <div className="flex justify-center items-center">
          <motion.img
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            src="/hero.png"
            alt="Hero illustration"
            className="w-[350px] md:w-[550px] xl:w-[700px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
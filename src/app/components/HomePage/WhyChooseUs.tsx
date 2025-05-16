"use client";
import React from "react";
import { GrYoga } from "react-icons/gr";
import { FaDumbbell, FaMoneyBills } from "react-icons/fa6";
import { GiGymBag, GiQuickSlash } from "react-icons/gi";
import { motion } from "framer-motion";
import { SlideLeft } from "@/utility/animation";
import { MdSchool } from "react-icons/md";
import { FaBookOpen, FaCity, FaCreditCard, FaMoneyBill, FaMoneyCheck } from "react-icons/fa";

const EquipmentData = [
  {
    id: 1,
    title: "Hybrid Tutoring Experience",
    desc: "Students can attend sessions physically at our center or enjoy the same high-quality, structured tutoring from the comfort of their home. We deliver personalized learning wherever you are.",
    icon: <MdSchool />,
    bgColor: "#0063ff",
    delay: 0.3,
  },
  {
    id: 2,
    title: "City-Based Tutor Matching System",
    desc: "Our platform connects students with expert tutors from their own city for at-home sessions. This ensures reliable, timely service and builds stronger learning relationships.",
    link: "/",
    icon: <FaCity />,
    bgColor: "#73bc00",
    delay: 0.6,
  },
  {
    id: 3,
    title: "Quality Teaching",
    desc: "At Ijtahed Center, we apply proven educational strategies guided by expert tutors who follow structured teaching plans. Whether sessions are online or on-campus, ensuring real academic progress, not just participation.",
    link: "/",
    icon: <FaBookOpen />,
    bgColor: "#fa6400",
    delay: 0.9,
  },
  {
    id: 4,
    title: "Affordable & Flexible Pricing",
    desc: "We make high-quality tutoring accessible to every family. With flexible payment options, pay per session or choose a monthly plan. Professional education at a price that fits your needs.",
    link: "/",
    icon: <FaCreditCard/>,
    bgColor: "#fe6baa",
    delay: 0.9,
  },
];
const WhyChooseUs = () => {
  return (
    <div className="bg-[#f9fafc]">
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-20 2xl:px-24 py-24">
        {/* header section*/}
        <div className="space-y-4 p-6 text-center max-w-[500px] mx-auto mb-5">
          <h1 className="uppercase font-semibold text-blue-500">
            Why Choose us
          </h1>
          <p className="font-semibold text-3xl ">
            Empowering Students with Personalized Tutoring
          </p>
        </div>

        {/* cards section*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 font-playfair">
          {EquipmentData.map((item) => {
            return (
              <motion.div
                variants={SlideLeft(item.delay)}
                initial="hidden"
                whileInView="visible"
                key={item.id}
                className="space-y-4 p-6 rounded-xl shadow-[0_0_22px_0_rgba(0,0,0,0.15)] "
              >
                <div
                  style={{ backgroundColor: item.bgColor }}
                  className="w-10 h-10 rounded-lg flex justify-center items-center text-white"
                >
                  <div className="text-2xl">{item.icon}</div>
                </div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
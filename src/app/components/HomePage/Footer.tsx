"use client"; // Required for client-side interactivity


import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { MdAccessTime, MdComputer, MdPhone } from "react-icons/md";

const Footer = () => {

  const FooterBg = {
    backgroundImage: `url("/footer.png")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "bottom center",
  }
  

  return (
    <div style={FooterBg} className=" bg-blue-500 rounded-t-1xl">
      <div className="bg-blue-200/5">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-20 2xl:px-24r">
          <div className="grid md:grid-cols-4 md:gap-4 py-5 border-t-2 border-gray-300/10 text-black">
            {/* brand info section */}
            <div className="py-8 px-4 space-y-4">
              <div className="text-2xl flex items-center gap-2 font-bold uppercase">
                
                <p className="flex text-white">ijtahed Academic Center</p>
              </div>
              <div className="flex flex-col gap-6">
      {/* Phone Number */}
      <div className="flex items-start gap-4">
        <MdPhone className=" text-2xl text-white" />
        <div className="font-bold tracking-tight leading-snug">
          <p className="block text-white">+961 71 627 853</p>
          
        </div>
      </div>

      {/* Working Hours */}
      <div className="flex items-start gap-4">
        <MdAccessTime className="mt-1 text-2xl text-white" />
        <div className="font-bold leading-snug">
          <p className="font-xl text-white">Working Hours</p>
          <p className="text-sm text-white">Monday - Friday</p>
          <p className="text-sm text-white">8:00 AM - 8:00 PM</p>
        </div>
      </div>
    </div>
              <div className="flex items-center justify-start gap-5 !mt-6">
                <a href="https://goo.gl/maps/QmgddwBps1YxJhB97" className="hover:text-white duration-200">
                  <HiLocationMarker className="text-3xl text-white" />
                </a>
                <a href="https://www.instagram.com/ijtahed.lb?igsh=b2UzaWt5MjNpYzU3&utm_source=qr" className="hover:text-white duration-200">
                  <FaInstagram className="text-3xl text-white" />
                </a>
                <a href="https://www.facebook.com/share/1HyoHc6mzK/?mibextid=LQQJ4d" className="hover:text-white duration-200">
                  <FaFacebook className="text-3xl text-white" />
                </a>
                <a href="https://www.tiktok.com/@ijtahed?_t=ZS-8vGMutCMGVL&_r=1" className="hover:text-white duration-200">
                  <FaTiktok className="text-3xl text-white " />
                </a>
              </div>
            </div>

            {/* Footer Links  */}
            <div className="grid grid-cols-2 md:grid-cols-3 md:col-span-3 md:ml-14">
              <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-5 text-white">
                  Important Links
                </h1>
                <ul className="flex flex-col gap-3">
                  <li>
                    <a href="#" className="hover:text-white duration-200 font-semibold">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white duration-200 font-semibold">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white duration-200 font-semibold">
                      Services
                    </a>
                  </li>
                  <li>
                    <Link href="/sign-in" className="hover:text-white duration-200 font-semibold">
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-5 text-white">
                  Company Links
                </h1>
                <ul className="flex flex-col gap-3">
                  <li>
                    <a href="#" className="hover:text-white duration-20 font-semibold">
                      Our Services
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white duration-200 font-semibold">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white duration-200 font-semibold">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
              <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-5 text-white">
                  Resources
                </h1>
                <ul className="flex flex-col gap-3">
                  <li>
                    <a href="#" className="hover:text-white duration-200 font-semibold">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white duration-200 font-semibold">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white duration-200 font-semibold">
                      Services
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white duration-200 font-semibold">
                      Login
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* copyright section */}
          <div className="mt-8">
            <div className="text-center py-6 border-t-2 ">
              <span className=" font-bold text-m text-black opacity-70">
                @Copyrights ijtahed Academic Center All Rights Reserved 
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
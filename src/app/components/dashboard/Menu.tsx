"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
      },
      {
        icon: "/teacher.png",
        label: "Tutors",
        href: "/list/tutors",
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/list/students",
      },
      {
        icon: "/parent.png",
        label: "Parents",
        href: "/list/parents",
      },
      {
        icon: "/result.png",
        label: "Sessions",
        href: "/list/sessions",
      },
      {
        icon: "/class.png",
        label: "Courses",
        href: "/list/courses",
      },
      {
        icon: "/attendance.png",
        label: "Payments",
        href: "/list/payments",
      },
      {
        icon: "/message.png",
        label: "Application",
        href: "/list/application",
      },
      {
        icon: "/exam.png",
        label: "Book a session",
        href: "/list/booking",
      },
      
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
      },
    ],
  },
];

const Menu = () => {
  const { data: session, status } = useSession();
  const role = session?.user?.role;

  if (status === "loading") return null;

  return (
    <div className="mt-4 text-sm">
      {menuItems.map((section) => (
        <div className="flex flex-col gap-2" key={section.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {section.title}
          </span>

          {section.items.map((item) => {
            const isLogout = item.label === "Logout";
            const isProfile = item.label === "Profile";
            const isBookASession = item.label == "Book a session";
            if (
              role === "admin" ||
              role !== "admin" && (isLogout || isProfile ||isBookASession)
            ) {
              return isLogout ? (
                <button
                  key={item.label}
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className=" cursor-pointer flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-sky-100 w-full"
                >
                  
                  <Image src={item.icon} alt="" width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>
                </button>
                
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-sky-100"
                >
                  <Image src={item.icon} alt="" width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }

            return null;
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;

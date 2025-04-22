import { role } from "../../lib/data";
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
        visible: ["admin", "tutor", "student", "parent"],
      },
      {
        icon: "/teacher.png",
        label: "tutors",
        href: "/list/tutors",
        visible: ["admin", "tutor"],
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/list/students",
        visible: ["admin", "tutor"],
      },
      {
        icon: "/parent.png",
        label: "Parents",
        href: "/list/parents",
        visible: ["admin", "tutor"],
      },
      {
        icon: "/result.png",
        label: "Sessions",
        href: "/list/sessions",
        visible: ["admin", "tutor"],
      },
      {
        icon: "/class.png",
        label: "Courses",
        href: "/list/courses",
        visible: ["admin", "tutor"],
      },
      
      {
        icon: "/attendance.png",
        label: "Payments",
        href: "/list/payments",
        visible: ["admin", "tutor", "student", "parent"],
      },
      
      {
        icon: "/message.png",
        label: "Application",
        href: "/list/application",
        visible: ["admin"],
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
        visible: ["admin", "tutor", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "tutor", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "tutor", "student", "parent"],
      },
    ],
  },
];

const Menu = () => {
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-sky-100"
                >
                  <Image src={item.icon} alt="" width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
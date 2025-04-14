"use client"; 

import React from "react";
import { motion } from "framer-motion";
import { FaBook } from "react-icons/fa";
import Link from "next/link";


interface SubjectItem {
  
  id: number;
  name: string;
  icon: React.ReactNode;
  color: string;
  delay: number;
  
  
}

const subjectList: SubjectItem[] = [
  {
    id: 1,
    name: "French",
    icon: <FaBook />,
    color: "#0063ff",
    delay: 0.2,
    
    
  },
  {
    id: 2,
    name: "English",
    icon: <FaBook />,
    color: "#00c986",
    delay: 0.3,
    
  },
  {
    id: 3,
    name: "Programming",
    icon: <FaBook />,
    color: "#922aee",
    delay: 0.4,
    
  },
  {
    id: 4,
    name: "Chemistry",
    icon: <FaBook />,
    color: "#ea7516",
    delay: 0.5,
    
  },
  {
    id: 5,
    name: "Physics",
    icon: <FaBook />,
    color: "#075267",
    delay: 0.6,
    
  },
  {
    id: 6,
    name: "Biology",
    icon: <FaBook />,
    color: "#986d1d",
    delay: 0.7,
    
  },
  {
    id: 7,
    name: "Math",
    icon: <FaBook />,
    color: "#b93838",
    delay: 0.8,
    
  },
  {
    id: 8,
    name: "See all",
    icon: <FaBook />,
    color: "#464646",
    delay: 0.9,
    
  },
];

const Subjects: React.FC = () => {
  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-20 2xl:px-24">
      <div className="py-14 md:py-24">
        {/* header (unchanged) */}
        <div className="space-y-4 p-6 text-center max-w-[600px] mx-auto mb-5">
          <h2 className="uppercase font-semibold text-blue-500">
            SERVICES
          </h2>
          <h3 className="font-semibold text-3xl">
            Find Online Tutor in Any Subject
          </h3>
        </div>
        
        {/* cards - now wrapped with Link */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 font-playfair">
          {subjectList.map(({ id, name, icon, color, delay }) => (
            <Link 
              href={`/submission?subject=${encodeURIComponent(name)}`} 
              key={id}
              passHref
              legacyBehavior
            >
              <motion.div
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 100, delay }}
                viewport={{ once: true }}
                className="border rounded-lg border-secondary/20 p-4 flex justify-start items-center gap-4 hover:!scale-105 hover:!shadow-xl duration-200 cursor-pointer"
              >
                <div
                  className="w-10 h-10 rounded-md flex justify-center items-center"
                  style={{ 
                    color: color, 
                    backgroundColor: `${color}20`
                  }}
                >
                  {icon}
                </div>
                <p className="font-medium">{name}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};


export default Subjects;






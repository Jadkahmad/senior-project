"use client";

import React, { useEffect, useState } from "react";
import TutorCard from "../components/ui/TutorCard";
import HomeNav from "../components/HomePage/homeNav";
import Footer from "../components/HomePage/Footer";
import ApplicationCards from "../components/ui/AppCards";

const hardcodedTutors = [
  {
    name: "Jad Ahmad",
    subject: "Full Agenda Tutor",
    experience: "5 years",
    imageUrl: "/jad.png",
    address: "Beirut",
  },
  {
    name: "Nour Al Jurdy",
    subject: "Arabic Tutor",
    experience: "3 years",
    imageUrl: "/nour.png",
    address: "Bekaa",
  },
  {
    name: "Aline",
    subject: "Agenda and Scientific Tutor",
    experience: "2 years",
    imageUrl: "/aline.png",
    address: "Jnoub",
  },
  {
    name: "Salem",
    subject: "Agenda Tutor",
    experience: "3 years",
    imageUrl: "/avatar.png",
    address: "Jnoub",
  },
];

const TutorsGrid = () => {
  const [allTutors, setAllTutors] = useState(hardcodedTutors);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await fetch("/api/tutors");
        const data = await res.json();

        const formatted = data.map((tutor: any) => ({
          name: tutor.Full_name || "Unknown",
          subject: tutor.Subject_specification || "General Tutor",
          experience: tutor.Experience_years
            ? `${tutor.Experience_years} years`
            : "N/A",
          imageUrl: "/avatar.png", // fallback image
          address: tutor.Address || "Unknown",
        }));

        setAllTutors((prev) => [...prev, ...formatted]);
      } catch (err) {
        console.error("Failed to fetch tutors:", err);
      }
    };

    fetchTutors();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <HomeNav />

      {/* Content Section */}
      <main className="flex-grow">
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-25 p-10">
            {allTutors.map((tutor, index) => (
              <TutorCard
                key={index}
                name={tutor.name}
                subject={tutor.subject}
                experience={tutor.experience}
                imageUrl={tutor.imageUrl}
                address={tutor.address}
              />
            ))}
          </div>
        </div>
      </main>

      <ApplicationCards />
      <Footer />
    </div>
  );
};

export default TutorsGrid;

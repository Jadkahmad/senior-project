import React from "react";
import TutorCard from "../components/ui/TutorCard";
import HomeNav from "../components/HomePage/homeNav";
import Footer from "../components/HomePage/Footer";
import ApplicationCards from "../components/ui/AppCards";

const tutors = [
  {
    name: "Jad Ahmad",
    subject: "Full Agenda Tutor",
    experience: "5 years",
    imageUrl: "/jad.png",
  },
  {
    name: "Nour Al Jurdy",
    subject: "Arabic Tutor",
    experience: "3 years",
    imageUrl: "/nour.png",
  },
  {
    name: "Aline",
    subject: "Agenda and Scientific Tutor",
    experience: "2 years",
    imageUrl: "/aline.png",
  },

  {
    name: "Salem",
    subject: "Agend Tutor",
    experience: "3 years",
    imageUrl: "/avatar.png",
  },
];

const TutorsGrid = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      <HomeNav />

      {/* Content Section */}
      <main className="flex-grow">
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-25 p-10">
            {tutors.map((tutor, index) => (
              <TutorCard
                key={index}
                name={tutor.name}
                subject={tutor.subject}
                experience={tutor.experience}
                imageUrl={tutor.imageUrl}
              />
            ))}
          </div>
        </div>
      </main>

      <ApplicationCards/>

      
      <Footer />
    </div>
  );
};

export default TutorsGrid;


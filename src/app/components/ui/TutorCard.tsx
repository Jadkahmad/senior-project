"use client";

import React from "react";

// Define props for the TutorCard component
interface TutorCardProps {
  name: string; // Tutor's name
  subject: string; // Tutor's subject specialization
  experience: string; // Years of experience
  imageUrl: string; // Image URL for the tutor
  address: string;
}

const TutorCard: React.FC<TutorCardProps> = ({ name, subject, experience, imageUrl, address }) => {
  return (
    <div className="group relative w-64 h-80 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Tutor Image */}
      <img
        src={imageUrl}
        alt={`${name} - Tutor`}
        className=" justify-center inset-0 w-full h-full object-cover transform group-hover:rotate-12 group-hover:scale-105 transition-transform duration-500"
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-blue-600 bg-opacity-70 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <h2 className="text-lg font-bold mb-2">{name}</h2>
        <p className="text-sm mb-1">Experience: {experience}</p>
        <p className="text-sm text-center">Specialization: {subject}</p>
        <p className="text-sm text-center">Address: {address}</p>
      </div>

      {/* Name Display */}
      <h3 className="absolute text-center bg-white bottom-4 left-1/2 transform -translate-x-1/2 text-black bg-opacity-70 px-4 py-2 rounded-md font-semibold group-hover:opacity-0 transition-opacity duration-300">
        {name}
      </h3>
    </div>
  );
};

export default TutorCard;








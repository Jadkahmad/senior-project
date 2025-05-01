"use client";

import Link from "next/link";
import React from "react";

const ApplicationCards: React.FC = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Apply as a Student Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center">
            <h3 className="text-2xl font-bold text-blue-500 mb-4">Apply as a Student</h3>
            <p className="text-gray-600 mb-6">
              <span className="font-semibold">One-on-One Learning That Works!</span> <br />
              With ijtahed, personalized education is just a step away. <br />
              Tell us your needs, and we'll match you with the perfect tutor to help you succeed!
            </p>
            <Link href={"/submission"}>
            <button className="bg-blue-500 cursor-pointer text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300">
              Start your Learning Journey
            </button>
            </Link>
          </div>

          {/* Apply as a Tutor Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center">
            <h3 className="text-2xl font-bold text-blue-500 mb-4">Apply as a Tutor</h3>
            <p className="text-gray-600 mb-6">
              <span className="font-semibold">Share Your Knowledge, Shape the Future!</span> <br />
              Join ijtahe Academic Center team and make a difference in students' lives. <br />
              Register now, and start your journey as a trusted tutor with us!
            </p>
            <Link href={"/submission"}>
            <button className="bg-blue-500 cursor-pointer text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300">
              Join our Tutoring Team
            </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationCards;

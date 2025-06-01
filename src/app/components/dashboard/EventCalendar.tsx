"use client";

import Image from "next/image";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

// TEMPORARY
const events = [
 {
    id: 1,
    title: "Math Tutoring Session - Grade 8",
    time: "10:00 AM - 11:30 AM",
    description: "Private in-home tutoring session assigned to Mr. Ahmad for student Maya in Tripoli.",
  },
  {
    id: 3,
    title: "Session Feedback Review",
    time: "3:30 PM - 4:00 PM",
    description: "Parent feedback submitted for Ali's private English session. Admin review required for follow-up.",
  },
   {
    id: 5,
    title: "Weekly Progress Meeting",
    time: "5:00 PM - 6:00 PM",
    description: "Management team sync to review session reports, tutor performance, and upcoming registrations.",
  },
];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="bg-white p-4 rounded-md">
      <Calendar onChange={onChange} value={value} />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Events</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <div
            className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple"
            key={event.id}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{event.title}</h1>
              <span className="text-gray-300 text-xs">{event.time}</span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
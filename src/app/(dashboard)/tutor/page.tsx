"use client";

import { useEffect, useState } from "react";
import BigCalendar from "@/app/components/dashboard/BigCalendar";
import Announcements from "@/app/components/dashboard/Announcemens";
import EventCalendar from "@/app/components/dashboard/EventCalendar";

const TeacherPage = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const sessionRes = await fetch("/api/auth/session");
        const sessionData = await sessionRes.json();
        const teacherId = sessionData?.user?.id;
        if (!teacherId) return;

        const res = await fetch(`/api/tutorSession/${teacherId}`);
        const sessions = await res.json();
        console.log(sessions);
        const formatted = sessions.map((s: any) => {
          const [sh, sm] = s.Start_time.split(":");
          const [eh, em] = s.End_time.split(":");
          const date = new Date(s.Date);
          const start = new Date(date);
          const end = new Date(date);
          start.setHours(sh, sm);
          end.setHours(eh, em);
          return {
            id: s.id,
            title: `${s.courseName} (${s.studentFirstName} ${s.studentLastName})`,
            start,
            end,
          };
        });

        setEvents(formatted);
      } catch (err) {
        console.error("Error loading teacher schedule:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule</h1>
          {loading ? (
            <p className="text-sm text-gray-400 mt-4">Loading schedule...</p>
          ) : (
            <BigCalendar events={events} />
          )}
        </div>
      </div>
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default TeacherPage;

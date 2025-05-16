"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import FormModal from "@/app/components/FormModel";
import BigCalendar from "@/app/components/dashboard/BigCalendar";
import Announcements from "@/app/components/dashboard/Announcemens";
import Link from "next/link";
import { role } from "@/app/lib/data";

const SingleTeacherPage = () => {
  const { id } = useParams();
  const [tutor, setTutor] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const tutorRes = await fetch(`/api/tutors/${id}`);
        if (!tutorRes.ok) throw new Error("Failed to fetch tutor");
        const tutorData = await tutorRes.json();
        console.log(tutorData);
        setTutor(tutorData);

        const sessionsRes = await fetch(`${window.location.origin}/api/tutorSession/${id}`);
        if (!sessionsRes.ok) throw new Error("Failed to fetch sessions");
        const sessionsData = await sessionsRes.json();
        console.log(sessionsData);
        const formattedEvents = sessionsData.map((session: any) => {
  const date = new Date(session.Date);
  const [startHour, startMinute] = session.Start_time.split(":");
  const [endHour, endMinute] = session.End_time.split(":");

  const start = new Date(date);
  start.setHours(parseInt(startHour), parseInt(startMinute));

  const end = new Date(date);
  end.setHours(parseInt(endHour), parseInt(endMinute));

  return {
    id: session.id,
    title: `${session.courseName} (${session.studentFirstName} ${session.studentLastName})`,
    start,
    end,
  };
});

        console.log(formattedEvents);
        setEvents(formattedEvents);
      } catch (err) {
        console.error("Error loading tutor or sessions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p className="p-4">Loading tutor info...</p>;
  if (!tutor) return <p className="p-4 text-red-500">Tutor not found.</p>;

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT SIDE */}
      <div className="w-full xl:w-2/3">
        {/* TOP INFO */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src="/avatar.png"
                alt="Profile"
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">{tutor.fullName}</h1>
                {role === "admin" && (
                  <FormModal table="teacher" type="update" data={tutor} />
                )}
              </div>
              <p className="text-sm text-gray-500">
                {tutor.subjectspecs || "No subject specified."}
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="flex items-center gap-2 w-full md:w-1/2">
                  <Image src="/mail.png" alt="" width={25} height={20} />
                  <span>{tutor.email}</span>
                </div>
                <div className="flex items-center gap-2 w-full md:w-1/2">
                  <Image src="/phone.png" alt="" width={25} height={20} />
                  <span>{tutor.phone}</span>
                </div>
                <div className="flex items-center gap-2 w-full md:w-1/2">
                  <Image src="/location.png" alt="" width={25} height={20} />
                  <span>{tutor.address}</span>
                </div>
                <div className="flex items-center gap-2 w-full md:w-1/2">
                  <Image src="/maleFemale.png" alt="" width={25} height={20} />
                  <span className="capitalize">{tutor.gender}</span>
                </div>
              </div>
            </div>
          </div>

          {/* STATS CARDS */}
          <div className="flex-1 flex flex-wrap gap-4">
            <div className="bg-white p-4 rounded-md w-full md:w-[48%]">
              <h2 className="text-lg font-semibold">Experience</h2>
              <p className="text-sm text-gray-600">
                {tutor.experienceYears} years
              </p>
            </div>
            <div className="bg-white p-4 rounded-md w-full md:w-[48%]">
              <h2 className="text-lg font-semibold">Subjects</h2>
              <p className="text-sm text-gray-600">{tutor.subjectspecs}</p>
            </div>
          </div>
        </div>

        {/* CALENDAR */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>Teacher&apos;s Schedule</h1>
          <BigCalendar events={events} />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link className="p-3 rounded-md bg-lamaSkyLight" href="/">
              Classes
            </Link>
            <Link className="p-3 rounded-md bg-lamaPurpleLight" href="/">
              Students
            </Link>
            <Link className="p-3 rounded-md bg-lamaYellowLight" href="/">
              Lessons
            </Link>
          </div>
        </div>
        <Announcements />
      </div>
    </div>
  );
};

export default SingleTeacherPage;

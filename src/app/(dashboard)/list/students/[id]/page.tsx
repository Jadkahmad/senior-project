"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Announcements from "@/app/components/dashboard/Announcemens";
import BigCalendar from "@/app/components/dashboard/BigCalendar";
import FormModal from "@/app/components/FormModel";
import { role } from "@/app/lib/data";

const SingleStudentPage = () => {
  const { id } = useParams();
  const [student, setStudent] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentRes = await fetch(`/api/students/${id}`);
        if (!studentRes.ok) throw new Error("Failed to fetch student");
        const studentData = await studentRes.json();
        setStudent(studentData);

        const sessionRes = await fetch(`/api/studentSession?studentId=${id}`);
        if (!sessionRes.ok) throw new Error("Failed to fetch sessions");
        const sessions = await sessionRes.json();

        const formatted = sessions.map((s: any) => {
          const [sh, sm] = s.startTime.split(":");
          const [eh, em] = s.endTime.split(":");
          const date = new Date(s.date);
          const start = new Date(date);
          start.setHours(sh, sm);
          const end = new Date(date);
          end.setHours(eh, em);
          return {
            id: s.id,
            title: `${s.courseName} (${s.tutorName})`,
            start,
            end,
          };
        });

        setEvents(formatted);
      } catch (err) {
        console.error("Error loading student or schedule:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (loading) return <p className="p-4">Loading student info...</p>;
  if (!student) return <p className="p-4 text-red-500">Student not found.</p>;

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      <div className="w-full xl:w-2/3">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src="/avatar.png"
                alt="Student"
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <h1 className="text-xl font-semibold">
                {student.firstName} {student.lastName}
                {role === "admin" && (
                                  <FormModal table="student" type="update" data={student} />
                                )}
              </h1>
              <p className="text-sm text-gray-500">
                {student.regtype.replace("_", " ")}
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-medium">
                <div className="flex items-center gap-2">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  <span>{new Date(student.dob).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>{student.userId}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span>{student.parentUserId || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>

           {/* SMALL CARDS */}
            <div className="flex-1 flex gap-4 justify-between flex-wrap">
              {/* CARD */}
              <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                <Image
                  src="/singleAttendance.png"
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <div className="">
                  <h1 className="text-xl font-semibold">90%</h1>
                  <span className="text-sm text-gray-400">Attendance</span>
                </div>
              </div>
              {/* CARD */}
              <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                <Image
                  src="/singleBranch.png"
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <div className="">
                  <h1 className="text-xl font-semibold">6th</h1>
                  <span className="text-sm text-gray-400">Grade</span>
                </div>
              </div>
              {/* CARD */}
              <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                <Image
                  src="/singleLesson.png"
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <div className="">
                  <h1 className="text-xl font-semibold">18</h1>
                  <span className="text-sm text-gray-400">Lessons</span>
                </div>
              </div>
              {/* CARD */}
              <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                <Image
                  src="/singleClass.png"
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <div className="">
                  <h1 className="text-xl font-semibold">6A</h1>
                  <span className="text-sm text-gray-400">Class</span>
                </div>
              </div>
            </div>
          </div>

        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>Student&apos;s Schedule</h1>
          <BigCalendar events={events} />
        </div>
      </div>

      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
          
          </div>
        </div>

        <Announcements />
      </div>
    </div>
  );
};

export default SingleStudentPage;

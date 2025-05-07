"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import InputField from "./InputField";

const schema = z.object({
  studentName: z.string().min(1, { message: "Student name is required!" }),
  tutorName: z.string().min(1, { message: "Tutor name is required!" }),
  course: z.string().min(1, { message: "Course is required!" }),
  date: z.string().min(1, { message: "Date is required!" }),
  startTime: z.string().min(1, { message: "Start time is required!" }),
  endTime: z.string().min(1, { message: "End time is required!" }),
  sessionType: z.string().min(1, { message: "Session Type is required!" }),
});

type SessionInputs = z.infer<typeof schema>;

const SessionForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SessionInputs>({
    resolver: zodResolver(schema),
  });

  const [students, setStudents] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [courses, setCourses] = useState([]);

  // Fetch dropdown data
  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [studentsRes, tutorsRes, coursesRes] = await Promise.all([
          fetch("/api/students"),
          fetch("/api/tutors"),
          fetch("/api/courses"),
        ]);

        const [studentsData, tutorsData, coursesData] = await Promise.all([
          studentsRes.json(),
          tutorsRes.json(),
          coursesRes.json(),
        ]);

        setStudents(studentsData);
        setTutors(tutorsData);
        setCourses(coursesData);
        
      } catch (err) {
        console.error("Failed to fetch dropdown data", err);
      }
    };

    fetchDropdowns();
  }, []);

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [studentsRes, tutorsRes, coursesRes] = await Promise.all([
          fetch("/api/students"),
          fetch("/api/tutors"),
          fetch("/api/courses"),
        ]);
        const [studentsData, tutorsData, coursesData] = await Promise.all([
          studentsRes.json(),
          tutorsRes.json(),
          coursesRes.json(),
        ]);
        setStudents(studentsData);
        setTutors(tutorsData);
        setCourses(coursesData);
  
        if (type === "update" && data) {
          reset({
            studentName: data.Student_id.toString(),
            tutorName:   data.Tutor_id.toString(),
            course:      data.Course_id.toString(),
            date:        data.date,
            startTime:   data.startTime,
            endTime:     data.endTime,
            sessionType: data.Session_type,
          });
        }
      } catch (err) {
        console.error("Failed to fetch dropdown data", err);
      }
    };
  
    fetchDropdowns();
  }, [type, data, reset]);
  
  
  

  const onSubmit = handleSubmit(async (formData) => {
    const payload = {
      Student_id: parseInt(formData.studentName),
      Tutor_id: parseInt(formData.tutorName),
      Course_id: parseInt(formData.course),
      Session_type: formData.sessionType,
      Start_time: formData.startTime,
      End_time: formData.endTime,
      Date: `${formData.date} 00:00:00`,
      Status: "Scheduled",
    };

    try {
      const res = await fetch("/api/session", {
        method: type === "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...payload,
          id: data?.id, 
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      window.location.reload(); 
    } catch (error) {
      console.error("Error saving session:", error);
      alert("Failed to save session.");
    }
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new session" : "Update the session"}
      </h1>
      <span className="text-xs text-gray-400 font-medium">
        Session Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        {/* Student Dropdown */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Student Name</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("studentName")}
          >
            <option value="">Select a student</option>
            {students.map((student: any) => (
              <option key={student.id} value={student.id}>
                {student.First_name} {student.Last_name}
              </option>
            ))}
          </select>
          {errors.studentName?.message && (
            <p className="text-xs text-red-400">{errors.studentName.message}</p>
          )}
        </div>

        {/* Tutor Dropdown */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Tutor Name</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("tutorName")}
          >
            <option value="">Select a tutor</option>
            {tutors.map((tutor: any) => (
              <option key={tutor.id} value={tutor.id}>
                {tutor.Full_name}
              </option>
            ))}
          </select>
          {errors.tutorName?.message && (
            <p className="text-xs text-red-400">{errors.tutorName.message}</p>
          )}
        </div>

        {/* Course Dropdown */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Course</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("course")}
          >
            <option value="">Select a course</option>
            {courses.map((course: any) => (
              <option key={course.id} value={course.id}>
                {course.Title}
              </option>
            ))}
          </select>
          {errors.course?.message && (
            <p className="text-xs text-red-400">{errors.course.message}</p>
          )}
        </div>

        {/* Session Type Dropdown */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Session Type</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("sessionType")}
          >
            <option value="">Select session type</option>
            <option value="Group">Group</option>
            <option value="Private">Private</option>
          </select>
          {errors.sessionType?.message && (
            <p className="text-xs text-red-400">{errors.sessionType.message}</p>
          )}
        </div>

        {/* Date/Time Inputs */}
        <InputField
          label="Date"
          name="date"
          type="date"
          register={register}
          error={errors.date}
        />
        <InputField
          label="Start Time"
          name="startTime"
          type="time"
          register={register}
          error={errors.startTime}
        />
        <InputField
          label="End Time"
          name="endTime"
          type="time"
          register={register}
          error={errors.endTime}
        />
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md cursor-pointer">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default SessionForm;

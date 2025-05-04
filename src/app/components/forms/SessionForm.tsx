"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "./InputField";

const schema = z.object({
  studentName: z.string().min(1, { message: "Student name is required!" }),
  tutorName: z.string().min(1, { message: "Tutor name is required!" }),
  course: z.string().min(1, { message: "Course is required!" }),
  date: z.string().min(1, { message: "Date is required!" }),
  startTime: z.string().min(1, { message: "Start time is required!" }),
  endTime: z.string().min(1, { message: "End time is required!" }),
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
    formState: { errors },
  } = useForm<SessionInputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
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
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Student Name</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("studentName")}
            defaultValue={data?.studentName}
          >
            <option value="">Select a student</option>
            <option value="John Doe">John Doe</option>
            <option value="Jane Smith">Jane Smith</option>
          </select>
          {errors.studentName?.message && (
            <p className="text-xs text-red-400">
              {errors.studentName.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Tutor Name</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("tutorName")}
            defaultValue={data?.tutorName}
          >
            <option value="">Select a tutor</option>
            <option value="Mr. Brown">Mr. Brown</option>
            <option value="Ms. Green">Ms. Green</option>
          </select>
          {errors.tutorName?.message && (
            <p className="text-xs text-red-400">
              {errors.tutorName.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Course</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("course")}
            defaultValue={data?.course}
          >
            <option value="">Select a course</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
          </select>
          {errors.course?.message && (
            <p className="text-xs text-red-400">
              {errors.course.message.toString()}
            </p>
          )}
        </div>
        <InputField
          label="Date"
          name="date"
          type="date"
          defaultValue={data?.date}
          register={register}
          error={errors.date}
        />
        <InputField
          label="Start Time"
          type="time"
          name="startTime"
          defaultValue={data?.startTime}
          register={register}
          error={errors.startTime}
        />
        <InputField
          label="End Time"
          type="time"
          name="endTime"
          defaultValue={data?.endTime}
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






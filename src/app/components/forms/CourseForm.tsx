"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import { useEffect } from "react";
const schema = z.object({
  subjectTitle: z.string().min(1, { message: "Subject title is required!" }),
  subjectDescription: z.string().min(1, { message: "Subject description is required!" }),
});

type CourseInputs = z.infer<typeof schema>;

const CourseForm = ({
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
  } = useForm<CourseInputs>({
    resolver: zodResolver(schema),
  });
  useEffect(() => {
    if (type === "update" && data) {
      reset({
        subjectTitle: data.subjectTitle || data.Title || "",
        subjectDescription: data.subjectDescription || data.Description || "",
      });
    }
  }, [type, data, reset]);
  const onSubmit = handleSubmit(async (formData) => {
    try {
      const res = await fetch("/api/courses", {
        method: type === "create" ? "POST" : "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          id: data?.id || undefined, 
        }),
      });
  
      const result = await res.json();
  
      if (!res.ok) {
        throw new Error(result.error || "Something went wrong");
      }
  
      toast.success("Course submitted successfully!");
    } catch (error) {
      console.error("Failed to submit course:", error);
      toast.error("Failed to submit course.");
    }
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new subject" : "Update the subject"}
      </h1>
      <span className="text-xs text-gray-400 font-medium">
        Subject Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        {/* Subject Title */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Subject Title</label>
          <input
            type="text"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("subjectTitle")}
            defaultValue={data?.subjectTitle}
            placeholder="Enter the subject title..."
          />
          {errors.subjectTitle?.message && (
            <p className="text-xs text-red-400">
              {errors.subjectTitle.message.toString()}
            </p>
          )}
        </div>

        {/* Subject Description */}
        <div className="flex flex-col gap-2 w-full md:w-1/2">
          <label className="text-xs text-gray-500">Subject Description</label>
          <textarea
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full resize-none"
            {...register("subjectDescription")}
            defaultValue={data?.subjectDescription}
            placeholder="Provide a brief description of the subject..."
            rows={3}
          />
          {errors.subjectDescription?.message && (
            <p className="text-xs text-red-400">
              {errors.subjectDescription.message.toString()}
            </p>
          )}
        </div>
      </div>
      <button className="bg-blue-400 text-white p-2 cursor-pointer rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default CourseForm;


"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  subjectName: z.string().min(1, { message: "Subject name is required!" }),
  tutorName: z.string().min(1, { message: "Tutor name is required!" }),
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
    formState: { errors },
  } = useForm<CourseInputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
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
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Subject Name</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("subjectName")}
            defaultValue={data?.subjectName}
          >
            <option value="">Select a subject</option>
            <option value="Math">Math</option>
            <option value="English">English</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
            <option value="History">History</option>
            <option value="Geography">Geography</option>
            <option value="Art">Art</option>
          </select>
          {errors.subjectName?.message && (
            <p className="text-xs text-red-400">
              {errors.subjectName.message.toString()}
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
            <option value="Alice Phelps">Alice Phelps</option>
            <option value="Russell Davidson">Russell Davidson</option>
            <option value="Manuel Becker">Manuel Becker</option>
            <option value="Eddie Chavez">Eddie Chavez</option>
            <option value="Lola Newman">Lola Newman</option>
            <option value="Darrell Delgado">Darrell Delgado</option>
            <option value="Nathan Kelly">Nathan Kelly</option>
            <option value="Benjamin Snyder">Benjamin Snyder</option>
          </select>
          {errors.tutorName?.message && (
            <p className="text-xs text-red-400">
              {errors.tutorName.message.toString()}
            </p>
          )}
        </div>
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default CourseForm;

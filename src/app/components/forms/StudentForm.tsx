"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "./InputField";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Base schema
const baseSchema = z.object({
  id: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  gender: z.preprocess(
    (val) => (typeof val === "string" ? val.toLowerCase() : val),
    z.enum(["male", "female"], { message: "Gender is required!" })
  ),
  regtype: z.enum(
    ["Monthly-Center", "Monthly-Private", "PerSession-Center", "PerSession-Private"],
    { message: "Registration Type is required!" }
  ),
  level: z.string().min(1, { message: "Level is Required" }),
  parentId: z.string().min(1, { message: "Parent is required" }),
});

// Extended schema for create (adds password)
const createSchema = baseSchema.extend({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
});

const StudentForm = ({
  type,
  data,
  applicationId,
}: {
  type: "create" | "update";
  data?: any;
  applicationId?: number;
}) => {
  const pathname = usePathname();
  const [parents, setParents] = useState<{ id: number; name: string }[]>([]);

  const schema = type === "create" ? createSchema : baseSchema;
  type Inputs = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (type === "update" && data) {
      reset({
        id: data?.studentId || "",
        firstName: data?.firstName || "",
        lastName: data?.lastName || "",
        birthday: data?.dob ? data.dob.split("T")[0] : "",
        gender: data?.gender?.toLowerCase() || "male",
        regtype: data?.regtype?.replace("_", "-") || "Monthly-Center",
        level: data?.class || "",
        parentId: data?.parentId?.toString() || "",
      });
    }
  }, [data, reset, type]);

  useEffect(() => {
    const fetchParents = async () => {
      try {
        const res = await fetch("/api/parents");
        if (!res.ok) throw new Error("Failed to fetch parents");
        const parentsData = await res.json();

        const formatted = parentsData.map((parent: any) => ({
          id: parent.id,
          name: `${parent.First_name} ${parent.Last_name}`,
        }));

        setParents(formatted);
      } catch (error) {
        console.error("Error fetching parents:", error);
      }
    };

    fetchParents();
  }, []);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const form = new FormData();
      if (pathname.includes("/application")) {
        form.append("status", "Approved");
      } else {
        form.append("status", "Pending");
      }

      form.append("id", formData.id);
      if (type === "create") {
        form.append("password", (formData as any).password);
      }
      form.append("firstName", formData.firstName);
      form.append("lastName", formData.lastName);
      form.append("birthday", formData.birthday.toISOString().split("T")[0]);
      form.append("gender", formData.gender);
      form.append("regtype", formData.regtype);
      form.append("level", formData.level);
      form.append("parentId", formData.parentId);
      if (applicationId !== undefined) {
        form.append("applicationId", applicationId.toString());
      }
      if (type === "update" && data?.id) {
        form.append("dbId", data.id.toString());
      }

      const res = await fetch("/api/students", {
        method: type === "create" ? "POST" : "PUT",
        body: form,
      });

      if (!res.ok) throw new Error("Failed to submit student");

      const result = await res.json();
      console.log("Success:", result.message);
      window.location.reload();
    } catch (error) {
      console.error("Error submitting student:", error);
      alert("Error submitting student");
    }
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new student" : "Update student"}
      </h1>

      <span className="text-xs text-gray-400 font-medium">Authentication Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField label="ID" name="id" register={register} error={errors.id} />
        {type === "create" && (
          <InputField
            label="Password"
            name="password"
            type="password"
            register={register}
            error={(errors as any)?.password}
          />
        )}
      </div>

      <span className="text-xs text-gray-400 font-medium">Personal Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField label="First Name" name="firstName" register={register} error={errors.firstName} />
        <InputField label="Last Name" name="lastName" register={register} error={errors.lastName} />
        <InputField label="Level" name="level" register={register} error={errors.level} />
        <InputField label="Birthday" name="birthday" type="date" register={register} error={errors.birthday} />

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Gender</label>
          <select {...register("gender")} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p className="text-xs text-red-400">{errors.gender.message}</p>}
        </div>

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Registration Type</label>
          <select {...register("regtype")} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full">
            <option value="Monthly-Center">Monthly-Center</option>
            <option value="Monthly-Private">Monthly-Private</option>
            <option value="PerSession-Center">PerSession-Center</option>
            <option value="PerSession-Private">PerSession-Private</option>
          </select>
          {errors.regtype && <p className="text-xs text-red-400">{errors.regtype.message}</p>}
        </div>

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Parent</label>
          {type === "create" ? (
            <select
              {...register("parentId")}
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            >
              <option value="">Select Parent</option>
              {parents.map((parent) => (
                <option key={parent.id} value={parent.id}>
                  {parent.name}
                </option>
              ))}
            </select>
          ) : (
            <div className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm bg-gray-100 h-[38px] flex items-center">
              {parents.find((p) => p.id.toString() === data?.parentId?.toString())?.name || "Unknown"}
            </div>
          )}
          {errors.parentId && (
            <p className="text-xs text-red-400">{errors.parentId.message}</p>
          )}
        </div>
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md cursor-pointer">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default StudentForm;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "./InputField";
import Image from "next/image";

// Base schema (used for both create & update)
const baseSchema = z.object({
  id: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  experienceYears: z.string().min(1, { message: "Experience is required!" }),
  subjectspecs: z.string().min(1, { message: "Subject is required!" }),
  gender: z.enum(["male", "female"], { message: "Sex is required!" }),
  availability: z.string().min(1, { message: "Availability is required!" }),
});

// Schema that includes password for "create" mode
const createSchema = baseSchema.extend({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
});

const TeacherForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  // Dynamically select schema & infer matching type
  const schema = type === "create" ? createSchema : baseSchema;
  type Inputs = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const form = new FormData();
      form.append("id", formData.id);
      form.append("email", formData.email);
      if (type === "create") {
        form.append("password", (formData as any).password); // Type cast since update mode won't have password
      }
      form.append("firstName", formData.firstName);
      form.append("lastName", formData.lastName);
      form.append("phone", formData.phone);
      form.append("subjectspecs", formData.subjectspecs);
      form.append("gender", formData.gender);
      form.append("experienceYears", formData.experienceYears);
      form.append("address", formData.address);
      form.append("availability", formData.availability);
      if (type === "update" && data?.id) {
        form.append("dbId", data.id.toString());
      }

      const res = await fetch("/api/tutors", {
        method: type === "create" ? "POST" : "PUT",
        body: form,
      });

      if (!res.ok)
        throw new Error(
          `Failed to ${type === "create" ? "create" : "update"} tutor`
        );

      window.location.reload();
    } catch (error) {
      console.error(
        `Error ${type === "create" ? "creating" : "updating"} tutor:`,
        error
      );
      alert(
        `Error ${type === "create" ? "adding" : "updating"} tutor`
      );
    }
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new teacher" : "Update teacher"}
      </h1>

      <span className="text-xs text-gray-400 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="ID"
          name="id"
          defaultValue={data?.userId}
          register={register}
          error={errors?.id}
        />
        <InputField
          label="Email"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />
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

      <span className="text-xs text-gray-400 font-medium">
        Personal Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="First Name"
          name="firstName"
          defaultValue={data?.fullName?.split(" ")[0] || ""}
          register={register}
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          name="lastName"
          defaultValue={data?.fullName?.split(" ").slice(1).join(" ") || ""}
          register={register}
          error={errors.lastName}
        />
        <InputField
          label="Phone"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />
        <InputField
          label="Address"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
        <InputField
          label="Experience Years"
          name="experienceYears"
          defaultValue={data?.experienceYears}
          register={register}
          error={errors.experienceYears}
        />
        <InputField
          label="Subject Specification"
          name="subjectspecs"
          defaultValue={data?.subjectspecs}
          register={register}
          error={errors.subjectspecs}
        />
        <InputField
          label="Availability"
          name="availability"
          defaultValue={data?.availability}
          register={register}
          error={errors.availability}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Gender</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("gender")}
            defaultValue={data?.gender}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender?.message && (
            <p className="text-xs text-red-400">{errors.gender.message}</p>
          )}
        </div>
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md cursor-pointer">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default TeacherForm;

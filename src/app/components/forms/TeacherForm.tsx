"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "./InputField";
import Image from "next/image";
import { useRouter } from "next/navigation";

const schema = z.object({
  id: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  experienceYears: z.string().min(1, { message: "Address is required!" }),
  subjectspecs: z.string().min(1,{ message: "subject is required!" }),
  gender: z.enum(["male", "female"], { message: "Sex is required!" }),
  // img: z.instanceof(File).optional(),

});

type Inputs = z.infer<typeof schema>;

const TeacherForm = ({
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
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

const onSubmit = handleSubmit(async (formData) => {
  try {
    const form = new FormData();
    form.append("id", formData.id);
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("firstName", formData.firstName);
    form.append("lastName", formData.lastName);
    form.append("phone", formData.phone);
    form.append("subjectspecs", formData.subjectspecs);
    form.append("gender", formData.gender);
    form.append("experienceYears", formData.experienceYears);
    form.append("address", formData.address);
     if (type === "update" && data?.id) {
      form.append("dbId", data.id.toString()); 
    }
    const res = await fetch("/api/tutors", {
      method: type === "create" ? "POST" : "PUT",
      body: form,
    });

    if (!res.ok) throw new Error(`Failed to ${type === "create" ? "create" : "update"} tutor`);

    window.location.reload();
  } catch (error) {
    console.error(`Error ${type === "create" ? "creating" : "updating"} tutor:`, error);
    alert(`Error ${type === "create" ? "adding" : "updating"} tutor`);
  }
});


  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create a new teacher</h1>
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
        <InputField
          label="Password"
          name="password"
          type="password"
          defaultValue={data?.password}
          register={register}
          error={errors?.password}
        />
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
          type="text"
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
            <p className="text-xs text-red-400">
              {errors.gender.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          {/* <label
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="img"
          > */}
            {/* <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Upload a photo</span>
          </label>
          <input type="file" id="img" {...register("img")} className="hidden" /> */}
          
        </div>
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md cursor-pointer">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default TeacherForm;
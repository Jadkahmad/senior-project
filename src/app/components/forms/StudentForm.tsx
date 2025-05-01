"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "./InputField";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Router } from "lucide-react";
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
  
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  gender: z.preprocess(
    (val) => (typeof val === "string" ? val.toLowerCase() : val),
    z.enum(["male", "female"], { message: "Gender is required!" })
  )
  ,
  regtype: z.enum(["Monthly-Center", "Monthly-Private", "PerSession-Center","PerSession-Private"], { message: "Registration Type is required!" }),
  level: z.string().min(1, { message: "Level is Required" }),
  
  parentId: z.string().min(1, { message: "Parent is required" }),
});

type Inputs = z.infer<typeof schema>;

const StudentForm = ({
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
  const [parents, setParents] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchParents = async () => {
      try {
        const res = await fetch("/api/parents");
        if (!res.ok) throw new Error("Failed to fetch parents");
        const data = await res.json();
  
        const formatted = data.map((parent: any) => ({
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
        const data = new FormData();
        data.append("id", formData.id);
        data.append("email", formData.email);
        data.append("password", formData.password);
        data.append("firstName", formData.firstName);
        data.append("lastName", formData.lastName);
        data.append("phone", formData.phone);
        data.append("address", formData.address);
        data.append("birthday", formData.birthday.toISOString().split("T")[0]); // format date
        data.append("gender", formData.gender);
        data.append("regtype", formData.regtype);
        data.append("level", formData.level);
        data.append("parentId", formData.parentId);
    
        const res = await fetch("/api/students", {
          method: "POST",
          body: data,
        });
    
        if (!res.ok) throw new Error("Failed to create student");
    
        const result = await res.json();
        console.log("Success:", result.message);
       
      } catch (error) {
        console.error("Error submitting student:", error);
        alert("Error adding student");
      }
    });
    

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create a new student</h1>
      <span className="text-xs text-gray-400 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="ID"
          name="id"
          defaultValue={data?.id}
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
          defaultValue={data?.firstName}
          register={register}
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          name="lastName"
          defaultValue={data?.lastName}
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
          label="Level"
          name="level"
          defaultValue={data?.level}
          register={register}
          error={errors.level}
        />
       
        <InputField
          label="Birthday"
          name="birthday"
          defaultValue={data?.birthday}
          register={register}
          error={errors.birthday}
          type="date"
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
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Registartion Type</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("regtype")}
            defaultValue={data?.regtype}
          >
            <option value="Monthly-Center">Monthly-Center</option>
<option value="Monthly-Private">Monthly-Private</option>
<option value="PerSession-Center">PerSession-Center</option>
<option value="PerSession-Private">PerSession-Private</option>

          </select>
          {errors.regtype?.message && (
            <p className="text-xs text-red-400">
              {errors.regtype.message.toString()}
            </p>
          )}

        </div>

        <div className="flex flex-col gap-2 w-full md:w-1/4">
  <label className="text-xs text-gray-500">Parent</label>
  <select
    className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
    {...register("parentId")}
    defaultValue={data?.parentId}
  >
    <option value="">Select Parent</option>
    {parents.map((parent) => (
      <option key={parent.id} value={parent.id}>
        {parent.name}
      </option>
    ))}
  </select>
  {errors.parentId?.message && (
    <p className="text-xs text-red-400">{errors.parentId.message}</p>
  )}
</div>
        
          
          
        
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md cursor-pointer">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
}


export default StudentForm;
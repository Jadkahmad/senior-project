"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "./InputField";

const schema = z.object({
  id: z.string().min(3, { message: "ID must be at least 3 characters long!" }).max(20, { message: "ID must be at most 20 characters long!" }),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  phone: z.string().min(1, { message: "Phone number is required!" }),
});

type Inputs = z.infer<typeof schema>;

const ParentForm = ({ type, data }: { type: "create" | "update"; data?: any }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const data = new FormData();
      data.append("id", formData.id);
      data.append("firstName", formData.firstName);
      data.append("lastName", formData.lastName);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("address", formData.address);
      data.append("phone", formData.phone);

      const res = await fetch("/api/parents", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Failed to create parent");

      const result = await res.json();
      console.log("Success:", result.message);

      // Show success toast
      toast.success("Successfully Added");

    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Error adding parent");
    }
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">{type === "create" ? "Create a new parent" : "Update parent"}</h1>
      <span className="text-xs text-gray-400 font-medium">Parent Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField label="ID" name="id" defaultValue={data?.id} register={register} error={errors?.id} />
        <InputField label="First Name" name="firstName" defaultValue={data?.firstName} register={register} error={errors?.firstName} />
        <InputField label="Last Name" name="lastName" defaultValue={data?.lastName} register={register} error={errors?.lastName} />
        <InputField label="Email" name="email" defaultValue={data?.email} register={register} error={errors?.email} />
        <InputField label="Password" name="password" type="password" defaultValue={data?.password} register={register} error={errors?.password} />
        <InputField label="Address" name="address" defaultValue={data?.address} register={register} error={errors?.address} />
        <InputField label="Phone Number" name="phone" defaultValue={data?.phone} register={register} />
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md cursor-pointer">{type === "create" ? "Create" : "Update"}</button>
    </form>
  );
};

export default ParentForm;


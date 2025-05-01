"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  studentName: z.string().min(1, { message: "Student name is required!" }),
  session: z.string().min(1, { message: "Session is required!" }),
  paymentType: z.string().min(1, { message: "Payment type is required!" }),
  amount: z.string().min(1, { message: "Amount is required!" }),
  date: z.string().min(1, { message: "Date is required!" }),
});

type PaymentInputs = z.infer<typeof schema>;

const PaymentForm = ({
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
  } = useForm<PaymentInputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new payment" : "Update the payment"}
      </h1>
      <span className="text-xs text-gray-400 font-medium">
        Payment Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        {/* Student Name */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Student Name</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("studentName")}
            defaultValue={data?.studentName}
          >
            <option value="">Select a student</option>
            <option value="Ali Ahmad">Ali Ahmad</option>
            <option value="Maya Nasser">Maya Nasser</option>
            <option value="Hassan Youssef">Hassan Youssef</option>
          </select>
          {errors.studentName?.message && (
            <p className="text-xs text-red-400">
              {errors.studentName.message.toString()}
            </p>
          )}
        </div>
        {/* Session */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Session</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("session")}
            defaultValue={data?.session}
          >
            <option value="">Select a session</option>
            <option value="Monthly">Monthly</option>
            <option value="Math - Grade 10">Math </option>
            <option value="Physics - Grade 11">Physics</option>
            <option value="Chemistry - Grade 12">Chemistry</option>
          </select>
          {errors.session?.message && (
            <p className="text-xs text-red-400">
              {errors.session.message.toString()}
            </p>
          )}
        </div>
        {/* Payment Type */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Payment Type</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("paymentType")}
            defaultValue={data?.paymentType}
          >
            <option value="">Select payment type</option>
            <option value="cash">Cash</option>
            <option value="omt">OMT</option>
            <option value="whish">Whish</option>
          </select>
          {errors.paymentType?.message && (
            <p className="text-xs text-red-400">
              {errors.paymentType.message.toString()}
            </p>
          )}
        </div>
        {/* Amount */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Amount</label>
          <input
            type="text"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("amount")}
            defaultValue={data?.amount}
          />
          {errors.amount?.message && (
            <p className="text-xs text-red-400">
              {errors.amount.message.toString()}
            </p>
          )}
        </div>
        {/* Date */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Date</label>
          <input
            type="date"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("date")}
            defaultValue={data?.date}
          />
          {errors.date?.message && (
            <p className="text-xs text-red-400">
              {errors.date.message.toString()}
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

export default PaymentForm;

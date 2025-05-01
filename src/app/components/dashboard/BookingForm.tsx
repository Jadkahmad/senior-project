"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = z.object({
  location: z.string().min(1, { message: "Location/Address is required!" }),
  tutorName: z.string().min(1, { message: "Tutor name is required!" }),
  date: z.string().min(1, { message: "Date is required!" }),
  time: z.string().min(1, { message: "Time is required!" }),
});

type BookingInputs = z.infer<typeof schema>;

const BookingForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingInputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    toast.success("Booking submitted successfully!");
  });

  return (
    <form
      className="flex flex-col gap-8 p-4 md:p-8 bg-white shadow-md rounded-lg"
      onSubmit={onSubmit}
    >
      <h1 className="text-xl font-semibold">Book a Session</h1>
      <div className="flex flex-wrap gap-4">
        {/* Location/Address */}
        <div className="flex flex-col gap-2 w-full md:w-1/2">
          <label className="text-sm text-gray-500">Location/Address</label>
          <input
            type="text"
            placeholder="Enter your location"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("location")}
          />
          {errors.location?.message && (
            <p className="text-xs text-red-400">
              {errors.location.message.toString()}
            </p>
          )}
        </div>
        {/* Tutor Selection */}
        <div className="flex flex-col gap-2 w-full md:w-1/2">
          <label className="text-sm text-gray-500">Tutor Name</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("tutorName")}
          >
            <option value="">Select a tutor</option>
            <option value="John Doe">John Doe</option>
            <option value="Jane Smith">Jane Smith</option>
            <option value="Sarah Lee">Sarah Lee</option>
            <option value="Michael Brown">Michael Brown</option>
          </select>
          {errors.tutorName?.message && (
            <p className="text-xs text-red-400">
              {errors.tutorName.message.toString()}
            </p>
          )}
        </div>
        {/* Date Picker */}
        <div className="flex flex-col gap-2 w-full md:w-1/2">
          <label className="text-sm text-gray-500">Date</label>
          <input
            type="date"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("date")}
          />
          {errors.date?.message && (
            <p className="text-xs text-red-400">
              {errors.date.message.toString()}
            </p>
          )}
        </div>
        {/* Time Picker */}
        <div className="flex flex-col gap-2 w-full md:w-1/2">
          <label className="text-sm text-gray-500">Time</label>
          <input
            type="time"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("time")}
          />
          {errors.time?.message && (
            <p className="text-xs text-red-400">
              {errors.time.message.toString()}
            </p>
          )}
        </div>
      </div>
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default BookingForm;

"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import TextInput from "@/app/components/FormInputs/TextInput";
import SubmitButton from "@/app/components/FormInputs/SubmitButton";
import { Calendar, Clock, Send } from "lucide-react";
import { FaLocationArrow } from "react-icons/fa";
import { toast } from "react-toastify";

export type BookingFormInputs = {
  address: string;
  course: string;  // will hold course ID
  tutor: string;   // will hold tutor ID
  date: string;
  time: string;
};

const BookingForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState<{ id: number; Title: string }[]>([]);
  const [tutors, setTutors]   = useState<{ id: number; Full_name: string }[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormInputs>();

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const [coursesRes, tutorsRes] = await Promise.all([
          fetch("/api/courses"),
          fetch("/api/tutors"),
        ]);
        if (!coursesRes.ok || !tutorsRes.ok) {
          throw new Error("Failed to load dropdown data");
        }
        const [coursesData, tutorsData] = await Promise.all([
          coursesRes.json(),
          tutorsRes.json(),
        ]);
        setCourses(coursesData);
        setTutors(tutorsData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLists();
  }, []);

  const onSubmit = async (data: BookingFormInputs) => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to submit booking");
        
      toast.success("Booking submitted successfully!");
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Error submitting the booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="col-span-1 space-y-4">
            <h4 className="font-extrabold text-center">Booking FAQ</h4>
            <div className="bg-blue-500 text-white p-6 rounded-2xl">
              <h3 className="font-semibold text-xl mb-2">Why book with us?</h3>
              <p className="text-sm mb-4 py-4">
                We offer personalized tutoring sessions tailored to each student's
                specific needs and goals. Choose from a variety of experienced tutors
                and courses!
              </p>
            </div>
            <div className="bg-blue-500 text-white p-6 rounded-2xl">
              <h3 className="font-semibold mb-2 text-xl">How do I book a session?</h3>
              <p className="text-sm mb-4 py-4">
                Fill out the form, select your course, preferred tutor, session date,
                and time, and we’ll take care of the rest. It's easy and quick!
              </p>
            </div>
          </div>

          {/* Booking Form */}
          <div className="col-span-2 bg-white p-6 rounded-2xl shadow">
            <h3 className="text-xl text-center font-semibold mb-4 text-blue-500">
              Book Your Session
            </h3>
            <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
              {/* Home Address */}
              <TextInput
                icon={FaLocationArrow}
                label="Home Address"
                register={register}
                name="address"
                type="text"
                errors={errors}
                placeholder="Enter your home address..."
              />

              {/* Course Selection */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Preferred Course *
                </label>
                <select
                  {...register("course", { required: "Please select a course!" })}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="">Select a course</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.Title}>
                      {c.Title}
                    </option>
                  ))}
                </select>
                {errors.course && (
                  <p className="text-xs text-red-400 mt-1">
                    {errors.course.message}
                  </p>
                )}
              </div>

              {/* Tutor Selection */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Preferred Tutor *
                </label>
                <select
                  {...register("tutor", { required: "Please select a tutor!" })}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="">Select a tutor</option>
                  {tutors.map((t) => (
                    <option key={t.id} value={t.Full_name}>
                      {t.Full_name}
                    </option>
                  ))}
                </select>
                {errors.tutor && (
                  <p className="text-xs text-red-400 mt-1">
                    {errors.tutor.message}
                  </p>
                )}
              </div>

              {/* Session Date */}
              <TextInput
                icon={Calendar}
                label="Session Date"
                register={register}
                name="date"
                type="date"
                errors={errors}
              />

              {/* Preferred Time */}
              <TextInput
                icon={Clock}
                label="Preferred Time"
                register={register}
                name="time"
                type="time"
                errors={errors}
              />

              {/* Submit Button */}
              <SubmitButton
                buttonIcon={Send}
                className="cursor-pointer"
                title="Submit Booking"
                loading={isLoading}
                loadingTitle="Submitting..." disabled={false}              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;

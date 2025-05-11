"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";

const schema = z.object({
  studentId: z.string().min(1, { message: "Student is required!" }),
  sessionId: z.string().min(1, { message: "Session is required!" }),
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
    reset,
    watch,
    formState: { errors },
  } = useForm<PaymentInputs>({
    resolver: zodResolver(schema),
  });
const selectedStudentId = watch("studentId");

  const [students, setStudents] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);


useEffect(() => {
  const loadDropdowns = async () => {
    try {
      const studentsRes = await fetch("/api/students");
      const studentsData = await studentsRes.json();
      setStudents(studentsData);

      let selectedStudentId = "";
      if (type === "update" && data?.studentName) {
  
        const matchStudent = studentsData.find(
          (s: any) => `${s.First_name} ${s.Last_name}` === data.studentName
        );
        if (matchStudent) {
          selectedStudentId = matchStudent.id.toString();
          const sessionsRes = await fetch(`/api/studentSession?studentId=${selectedStudentId}`);
          const sessionsData = await sessionsRes.json();
          setSessions(sessionsData);

          const matchSession = sessionsData.find(
            (s: any) =>
              `${s.courseName} - ${s.tutorName} (${s.date})` === data.sessionName
          );

          reset({
            studentId: selectedStudentId,
            sessionId: matchSession?.id.toString() || "",
            paymentType: data.method || "",
            amount: data.Amount || "",
            date: data.date || "",
          });
        }
      }
    } catch (err) {
      console.error("Dropdown loading failed:", err);
    }
  };

  loadDropdowns();
}, [type, data, reset]);

useEffect(() => {
  
  if (!selectedStudentId) return;
  fetch(`/api/studentSession?studentId=${selectedStudentId}`)
    .then((res) => res.json())
    .then(setSessions)
    .catch(console.error);
}, [selectedStudentId]);


  const onSubmit = handleSubmit(async (formData) => {
  const payload = {
    id: data?.id, // include ID for update
    studentId: parseInt(formData.studentId),
    sessionId: parseInt(formData.sessionId),
    paymentType: formData.paymentType,
    amount: formData.amount,
    date: formData.date,
  };

  try {
    const res = await fetch("/api/payment", {
      method: type === "create" ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const result = await res.json();
      throw new Error(result.error || "Failed to save payment");
    }

    window.location.reload();
  } catch (err) {
    console.error("Save payment failed:", err);
    alert("Failed to save payment.");
  }
});

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new payment" : "Update the payment"}
      </h1>
      <span className="text-xs text-gray-400 font-medium">Payment Information</span>
      <div className="flex flex-wrap gap-4">
        {/* Student Dropdown */}
        <div className="flex flex-col w-full md:w-1/4">
          <label className="text-xs text-gray-500">Student</label>
          <select {...register("studentId")} className="p-2 rounded-md text-sm ring-[1.5px] ring-gray-300">
            <option value="">Select a student</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.First_name} {s.Last_name}
              </option>
            ))}
          </select>
          {errors.studentId && <p className="text-xs text-red-400">{errors.studentId.message}</p>}
        </div>

        {/* Session Dropdown */}
        <div className="flex flex-col w-full md:w-1/4">
          <label className="text-xs text-gray-500">Session</label>
          <select {...register("sessionId")} className="p-2 rounded-md text-sm ring-[1.5px] ring-gray-300">
            <option value="">Select a session</option>
            {sessions.map((s) => (
              <option key={s.id} value={s.id}>
                {`${s.courseName} - ${s.tutorName} (${s.date})`}
              </option>
            ))}
          </select>
          {errors.sessionId && <p className="text-xs text-red-400">{errors.sessionId.message}</p>}
        </div>

        {/* Payment Type */}
        <div className="flex flex-col w-full md:w-1/4">
          <label className="text-xs text-gray-500">Payment Type</label>
          <select {...register("paymentType")} className="p-2 rounded-md text-sm ring-[1.5px] ring-gray-300">
            <option value="">Select payment type</option>
            <option value="cash">Cash</option>
            <option value="omt">OMT</option>
            <option value="whish">Whish</option>
          </select>
          {errors.paymentType && <p className="text-xs text-red-400">{errors.paymentType.message}</p>}
        </div>

        {/* Amount */}
        <div className="flex flex-col w-full md:w-1/4">
          <label className="text-xs text-gray-500">Amount</label>
          <input
            type="text"
            {...register("amount")}
            className="p-2 rounded-md text-sm ring-[1.5px] ring-gray-300"
          />
          {errors.amount && <p className="text-xs text-red-400">{errors.amount.message}</p>}
        </div>

        {/* Date */}
        <div className="flex flex-col w-full md:w-1/4">
          <label className="text-xs text-gray-500">Date</label>
          <input
            type="date"
            {...register("date")}
            className="p-2 rounded-md text-sm ring-[1.5px] ring-gray-300"
          />
          {errors.date && <p className="text-xs text-red-400">{errors.date.message}</p>}
        </div>
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md">{type === "create" ? "Create" : "Update"}</button>
    </form>
  );
};

export default PaymentForm;

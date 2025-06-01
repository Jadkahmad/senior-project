"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";

const schema = z.object({
  rejectionReason: z.string().min(1, { message: "Rejection reason is required!" }),
});

type RejectInputs = z.infer<typeof schema>;

const RejectForm = ({
  onClose,
  email,
  applicationId,
}: {
  onClose: () => void;
  email: string;
  applicationId: number;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RejectInputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formData: RejectInputs) => {
    try {
      const res = await fetch("/api/rejectAccount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          reason: formData.rejectionReason,
          applicationId: applicationId
        }),
      });

      if (!res.ok) throw new Error("Failed to send rejection email");

     
      toast.success("Rejection email sent and status updated.");
      onClose();
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Failed to process rejection.");
    }
  };

  return (
    <form
      className="flex flex-col gap-6 p-6 bg-white rounded-md w-[90%] md:w-[60%] lg:w-[50%]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-xl font-semibold">Rejection Reason</h2>
      <span className="text-lg text-gray-500 font-medium">
        Please enter the reason for rejection below.
      </span>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-md text-gray-500">Reason for Rejection</label>
        <textarea
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full resize-none"
          {...register("rejectionReason")}
          placeholder="Enter the rejection reason..."
          rows={3}
        />
        {errors.rejectionReason?.message && (
          <p className="text-xs text-red-400">
            {errors.rejectionReason.message.toString()}
          </p>
        )}
      </div>

      <div className="flex gap-4 mt-4">
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer">
          Submit
        </button>
        <button onClick={onClose} type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md cursor-pointer">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default RejectForm;

"use client";
import React, { useState } from "react";
import AuthButton from "./AuthButton";
import Link from "next/link";
import { Icon } from "lucide-react";

const ForgotPassword = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    setLoading(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div>
          <label className="block text-m font-bold text-gray-400">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter Your Email"
            id="Email"
            name="email"
            className="mt-1 w-full px-4 p-2 h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
          />
        </div>

        <div className="mt-4">
          <Link href={"/reset-pass"}>
            <AuthButton type="Send Reset Link" loading={loading} />
          </Link>
        </div>

        {/* Password Reset Guidance Section */}
        <div className="mt-4 text-sm text-gray-500">
          <p>Please enter the email address associated with your account. You will receive an email with a link to reset your password.</p>
          <p className="mt-2">If you don’t see the email in your inbox, please check your spam or junk folder.</p>
          <p className="mt-2">For further assistance, contact our support team at <span className="font-medium text-gray-700">71-627 853</span>.</p>
        </div>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;

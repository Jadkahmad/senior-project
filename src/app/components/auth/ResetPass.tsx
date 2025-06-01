"use client";
import React, { useState, useEffect } from "react";
import AuthButton from "./AuthButton";

const ResetPassword = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);

  // Get token from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");
    setToken(tokenFromUrl);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const url = token ? `/api/reset-pass?token=${token}` : "/api/reset-pass";

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword: password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
      } else {
        setSuccess("Password changed successfully.");
        setPassword("");
      }
    } catch (err) {
      console.error("Password change error:", err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div>
          <label htmlFor="password" className="block text-m font-bold text-gray-400">
            New Password
          </label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full px-4 p-2 h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
            required
          />
        </div>

        <div className="mt-4">
          <AuthButton type="Reset Password" loading={loading} />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;

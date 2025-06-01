"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const SettingsPage = () => {
  const { data: session } = useSession();
  const [isDark, setIsDark] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      setIsDark(storedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", isDark);
      localStorage.setItem("theme", isDark ? "dark" : "light");
    }
  }, [isDark]);

  const userRole = session?.user?.role;

  const handleFeedbackSubmit = async () => {
    if (!feedback.trim()) return;

    setIsSubmitting(true);
    setResponseMessage("");

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback }),
      });

      const result = await res.json();

      if (res.ok) {
        setResponseMessage("Feedback sent successfully.");
        setFeedback("");
      } else {
        setResponseMessage(result.error || "Failed to send feedback.");
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setResponseMessage("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-lg w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center mb-4">
          Settings
        </h1>

        {/* Theme Toggle */}
        <div className="border-t pt-4">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100">Theme Mode</h2>
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => setIsDark(false)}
              className="cursor-pointer flex-1 bg-gray-200 text-gray-700 font-medium py-2 rounded hover:bg-gray-300 transition dark:bg-gray-600 dark:text-gray-200"
            >
              Light Mode
            </button>
            <button
              onClick={() => setIsDark(true)}
              className="cursor-pointer flex-1 bg-gray-800 text-white font-medium py-2 rounded hover:bg-black transition"
            >
              Dark Mode
            </button>
          </div>
        </div>

        {/* Language Selection */}
        <div className="border-t pt-4 mt-4">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100">Language Preferences</h2>
          <select className="mt-2 w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white">
            <option>English</option>
            <option>French</option>
            <option>Spanish</option>
          </select>
        </div>

        {/* Privacy & Security – hidden for admins */}
        {userRole !== "admin" && (
          <div className="border-t pt-4 mt-4">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100">Privacy & Security</h2>
            <div className="flex items-center gap-2 mt-2">
              <Link href="/reset-pass" className="text-blue-500 hover:underline dark:text-blue-400">
                Change Your Password
              </Link>
            </div>
          </div>
        )}

        {/* Support & Feedback */}
        <div className="border-t pt-4 mt-4">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100">Support & Feedback</h2>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your feedback..."
            className="mt-2 w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
          ></textarea>
          <button
            onClick={handleFeedbackSubmit}
            disabled={isSubmitting}
            className="mt-2 w-full bg-blue-500 text-white font-medium py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </button>
          {responseMessage && (
            <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">{responseMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

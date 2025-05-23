import React from "react";

const AuthButton = ({
  type,
  loading,
}: {
  type:  "Send Reset Link" | "Reset Password";
  loading: boolean;
}) => {
  return (
    <button
      disabled={loading}
      type="submit"
      className={`${
        loading ? "bg-gray-600" : "bg-blue-600"
      } rounded-md w-full px-12 py-3 text-sm font-medium text-white cursor-pointer`}
    >
      {loading ? "Loading..." : type}
    </button>
  );
};

export default AuthButton;
"use client";

import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");

  const [phone, setPhone] = useState("");
  const [phoneInput, setPhoneInput] = useState("");

  const [address, setAddress] = useState("");
  const [addressInput, setAddressInput] = useState("");

  const role = session?.user?.role;
  const id = session?.user?.id;

  useEffect(() => {
    const fetchProfile = async () => {
      if (!role || !id) return;

      let endpoint = "";
      if (role === "student") endpoint = `/api/students/${id}`;
      else if (role === "tutor") endpoint = `/api/tutors/${id}`;
      else if (role === "parent") endpoint = `/api/parents/${id}`;
      else return;

      try {
        const res = await fetch(endpoint);
        const data = await res.json();
        setProfile(data);

        let fullName = "";
        if (role === "tutor") {
          fullName = data.fullName || "";
        } else {
          fullName = `${data.firstName || ""} ${data.lastName || ""}`.trim();
        }

        setDisplayName(fullName);
        setName(fullName);

        if (role !== "student") {
          setPhone(data.phone || "");
          setPhoneInput(data.phone || "");
          setAddress(data.address || "");
          setAddressInput(data.address || "");
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [session]);

  const handleUpdateName = async () => {
    try {
      const res = await fetch("/api/update-name", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: name }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to update name");
      } else {
        toast.success("Name updated successfully");
        setDisplayName(name);
      }
    } catch (error) {
      console.error("Error updating name:", error);
      toast.error("An error occurred while updating name.");
    }
  };

  const handleUpdateAddress = async () => {
    try {
      const res = await fetch("/api/update-address", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: addressInput }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to update address");
      } else {
        toast.success("Address updated successfully");
        setAddress(addressInput);
      }
    } catch (error) {
      console.error("Error updating address:", error);
      toast.error("An error occurred while updating address.");
    }
  };

  const handleUpdatePhone = async () => {
    try {
      const res = await fetch("/api/update-phone", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneInput }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to update phone");
      } else {
        toast.success("Phone number updated successfully");
        setPhone(phoneInput);
      }
    } catch (error) {
      console.error("Error updating phone:", error);
      toast.error("An error occurred while updating phone.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-[500px] w-full p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">Profile Page</h1>
        <p className="text-gray-600 text-center">
          Welcome, <b className="text-blue-500">{displayName || "User"}</b>
        </p>

        {/* Profile Information */}
        <div className="border-t pt-4 mt-4">
          <h2 className="text-lg font-semibold text-gray-700">Personal Details</h2>
          <ul className="text-gray-600 mt-2 space-y-2">
            <li><b>Email:</b> {profile?.email}</li>
            {role !== "student" && (
              <>
                <li><b>Phone:</b> {phone}</li>
                <li><b>Address:</b> {address}</li>
              </>
            )}
          </ul>
        </div>

        {/* Username Update */}
        <div className="border-t pt-4 mt-4">
          <h2 className="text-lg font-semibold text-gray-700">Update Username</h2>
          <div className="flex items-center gap-2 mt-2">
            <input
              type="text"
              name="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-grow p-2 border rounded focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleUpdateName}
              className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Update
            </button>
          </div>
        </div>

        {/* Address Update */}
        {role !== "student" && (
          <div className="border-t pt-4 mt-4">
            <h2 className="text-lg font-semibold text-gray-700">Update Address</h2>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                name="address"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                className="flex-grow p-2 border rounded focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={handleUpdateAddress}
                className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 transition"
              >
                Update
              </button>
            </div>
          </div>
        )}

        {/* Phone Number Update */}
        {role !== "student" && (
          <div className="border-t pt-4 mt-4">
            <h2 className="text-lg font-semibold text-gray-700">Update Phone Number</h2>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                name="phone"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                className="flex-grow p-2 border rounded focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={handleUpdatePhone}
                className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 transition"
              >
                Update
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

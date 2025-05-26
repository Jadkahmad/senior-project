
"use client";

const ProfilePage = () => {
  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-[500px] w-full p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">Profile Page</h1>
        <p className="text-gray-600 text-center">
          Welcome, <b className="text-blue-500">John Doe</b>
        </p>

        {/* Profile Information */}
        <div className="border-t pt-4 mt-4">
          <h2 className="text-lg font-semibold text-gray-700">Personal Details</h2>
          <ul className="text-gray-600 mt-2 space-y-2">
            <li><b>Email:</b> johndoe@example.com</li>
            <li><b>Phone:</b> +123456789</li>
            <li><b>Address:</b> 123 Main St, City</li>
          </ul>
        </div>

        {/* Username Update */}
        <div className="border-t pt-4 mt-4">
          <h2 className="text-lg font-semibold text-gray-700">Update Username</h2>
          <div className="flex items-center gap-2 mt-2">
            <input type="text" name="username" placeholder="John Doe"
              className="flex-grow p-2 border rounded focus:ring-2 focus:ring-blue-400" />
            <button className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 transition">
              Update
            </button>
          </div>
        </div>

        {/* Address Update */}
        <div className="border-t pt-4 mt-4">
          <h2 className="text-lg font-semibold text-gray-700">Update Address</h2>
          <div className="flex items-center gap-2 mt-2">
            <input type="text" name="address" placeholder="123 Main St, City"
              className="flex-grow p-2 border rounded focus:ring-2 focus:ring-blue-400" />
            <button className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 transition">
              Update
            </button>
          </div>
        </div>

        {/* Phone Number Update */}
        <div className="border-t pt-4 mt-4">
          <h2 className="text-lg font-semibold text-gray-700">Update Phone Number</h2>
          <div className="flex items-center gap-2 mt-2">
            <input type="text" name="phone" placeholder="+123456789"
              className="flex-grow p-2 border rounded focus:ring-2 focus:ring-blue-400" />
            <button className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 transition">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;


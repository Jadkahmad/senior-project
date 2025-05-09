"use client";

import Pagination from "@/app/components/dashboard/Pagiantion";
import Table from "@/app/components/dashboard/Table";
import TableSearch from "@/app/components/dashboard/TableSearch";
import FormModal from "@/app/components/FormModel";

import Image from "next/image";
import { useEffect, useState } from "react";

type Application = {
  id: number;
  userType: "parent" | "student" | "tutor"; // Restrict user types
  fullname: string;
  email: string;
  phone: string;
  status: string;
  address: string;
};

const columns = [
  { header: "ID", accessor: "id" },
  { header: "UserType", accessor: "user_type" },
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  { header: "Phone", accessor: "phone" },
  { header: "Address", accessor: "address" },
  { header: "Status", accessor: "status" },
  { header: "Actions", accessor: "action" },
];

const ApplicationListPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch("/api/application"); 
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        const formatted = data.map((item: any) => ({
          id: item.id,
          userType: item.User_type,
          fullname: item.Full_name,
          email: item.Email,
          phone: item.Phone,
          address: item.Address,
          status: item.Status || "pending",
        }));

        setApplications(formatted);
      } catch (error) {
        console.error("Error loading applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleStatusChange = (id: number, newStatus: "approved" | "rejected") => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );

    // Open modal if approved
    if (newStatus === "approved") {
      const selectedApp = applications.find((app) => app.id === id);
      if (selectedApp) {
        setSelectedApplication(selectedApp);
        setIsModalOpen(true);
      }
    }
  };

  const renderRow = (item: Application) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-sky-100"
    >
      <td>{item.id}</td>
      <td>{item.userType}</td>
      <td>{item.fullname}</td>
      <td>{item.email}</td>
      <td>{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td className={`capitalize font-medium 
        ${item.status === "approved" ? "text-green-600" : ""}
        ${item.status === "rejected" ? "text-red-600" : ""}
        ${item.status !== "approved" && item.status !== "rejected" ? "text-yellow-600" : ""}
      `}>
        {item.status}
      </td>
      <td>
        <div className="flex items-center gap-2">
          <button
            className="w-7 h-7 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 transition cursor-pointer"
            onClick={() => handleStatusChange(item.id, "rejected")}
            disabled={item.status === "rejected"}
            title="Reject"
          >
            <Image src="/reject.png" alt="Reject" width={16} height={16} />
          </button>
          <button
            className="w-7 h-7 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 transition cursor-pointer"
            onClick={() => handleStatusChange(item.id, "approved")}
            disabled={item.status === "approved"}
            title="Approve"
          >
            <Image src="/accept3.png" alt="Approve" width={16} height={16} />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Applications</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={applications} />
      <Pagination />

      {/* Open FormModal when an application is approved */}
      {isModalOpen && selectedApplication?.userType && (
        <FormModal table={selectedApplication.userType} type="create" data={selectedApplication} />
      )}
    </div>
  );
};

export default ApplicationListPage;


"use client";

import Pagination from "@/app/components/dashboard/Pagiantion";
import Table from "@/app/components/dashboard/Table";
import TableSearch from "@/app/components/dashboard/TableSearch";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import TeacherForm from "@/app/components/forms/TeacherForm";
import ParentForm from "@/app/components/forms/ParentForm";
import StudentForm from "@/app/components/forms/StudentForm";
import RejectForm from "@/app/components/forms/RejectForm";

type Application = {
  id: number;
  userType: "parent" | "student" | "tutor";
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
  const [isApprovalFormOpen, setIsApprovalFormOpen] = useState(false);
  const [isRejectFormOpen, setIsRejectFormOpen] = useState(false);
  const searchParams = useSearchParams(); 
  const searchQuery = searchParams.get("search")?.toLowerCase() || ""; 

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
  const filteredApplications = applications.filter((app) =>
    app.fullname.toLowerCase().includes(searchQuery) ||
    app.userType.toLowerCase().includes(searchQuery)


  );

  const handleStatusChange = (item: Application, newStatus: "approved" | "rejected" | "pending") => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === item.id ? { ...app, status: newStatus } : app
      )
    );

    if (newStatus === "approved") {
      setSelectedApplication(item);
      setIsApprovalFormOpen(true);
    }
    if (newStatus === "rejected") {
      setSelectedApplication(item);
      setIsRejectFormOpen(true);
    }
  };

  const renderRow = (item: Application) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-sky-100">
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
            onClick={() => handleStatusChange(item, "rejected")}
            disabled={item.status === "rejected"}
            title="Reject"
          >
            <Image src="/reject.png" alt="Reject" width={16} height={16} />
          </button>

          <button
            className="w-7 h-7 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 transition cursor-pointer"
            onClick={() => handleStatusChange(item, "approved")}
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
      { loading ? (
        <p className="p-4 text-gray-400">Loading applications...</p>
      ) : (
      <Table columns={columns} renderRow={renderRow} data={filteredApplications} />
      
    )}

    <Pagination />

      {/* Open the correct form based on userType when an application is approved */}
      {isApprovalFormOpen && selectedApplication?.userType && (
        <div className="bg-black opacity-90 w-screen h-screen absolute left-0 top-0 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            
            <p className="text-gray-500 ">Fill in the credentials to activate the user's account.</p>

            {/* Dynamically render the correct form */}
            {selectedApplication.userType === "tutor" && <TeacherForm type="create" data={selectedApplication} />}
            {selectedApplication.userType === "student" && <StudentForm type="create" data={selectedApplication} />}
            {selectedApplication.userType === "parent" && <ParentForm type="create" data={selectedApplication} />}

            <button
              onClick={() => {
                setIsApprovalFormOpen(false);
                if (selectedApplication) {
                  setApplications((prev) =>
                    prev.map((app) =>
                      app.id === selectedApplication.id && app.status === "approved" ? { ...app, status: "Pending" } : app
                    )
                  );
                }
              }}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Open RejectForm when an application is rejected */}
      {isRejectFormOpen && selectedApplication && (
       <div className="bg-black opacity-90 w-screen h-screen absolute left-0 top-0 z-50 flex items-center justify-center">
          
          <RejectForm onClose={() => setIsRejectFormOpen(false)} />
        </div>
        
      )}
    </div>
  );
};

export default ApplicationListPage;




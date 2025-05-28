"use client";

import { useEffect, useState } from "react";
import FormModal from "@/app/components/FormModel";
import Pagination from "@/app/components/dashboard/Pagiantion";
import Table from "@/app/components/dashboard/Table";
import TableSearch from "@/app/components/dashboard/TableSearch";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
type Session = {
  id: number;
  studentName: string;
  tutorName: string;
  courseName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
};

const columns = [
  { header: "Student", accessor: "studentName" },
  { header: "Tutor", accessor: "tutorName" },
  { header: "Course", accessor: "courseName", className: "hidden md:table-cell" },
  { header: "Date", accessor: "date", className: "hidden md:table-cell" },
  { header: "StartTime", accessor: "startTime", className: "hidden md:table-cell" },
  { header: "EndTime", accessor: "Endtime", className: "hidden md:table-cell" },
  { header: "Status", accessor: "status" },
  { header: "Actions", accessor: "action" },
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "text-green-600 font-semibold";
    case "pending":
    case "scheduled":
      return "text-orange-500 font-semibold";
    case "cancelled":
    case "canceled":
    case "incomplete":
      return "text-red-600 font-semibold";
    default:
      return "text-gray-600";
  }
};

const SessionListPage = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || ""; 
  const role = "admin";

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await fetch("/api/session");
        const data = await res.json();
        setSessions(data);
      } catch (err) {
        console.error("Failed to load sessions", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);
  const filteredSessions = sessions.filter((session) =>
    session.studentName.toLowerCase().includes(searchQuery) ||
    session.courseName.toLowerCase().includes(searchQuery) ||
    session.tutorName.toLowerCase().includes(searchQuery)
  );

  const handleStatusChange = (id: number, newStatus: string) => {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === id ? { ...session, status: newStatus } : session
      )
    );
  };

  const renderRow = (session: Session) => (
    <tr
      key={session.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="p-4">{session.studentName}</td>
      <td>{session.tutorName}</td>
      <td className="hidden md:table-cell">{session.courseName}</td>
      <td className="hidden md:table-cell">{session.date}</td>
      <td className="hidden md:table-cell">{session.startTime}</td>
      <td className="hidden md:table-cell">{session.endTime}</td>
      <td className={getStatusColor(session.status)}>{session.status}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="session" type="update" data={session} />
              <FormModal table="session" type="delete" id={session.id} />

              {/* Approve button to change status to "Completed" */}
              <button
                              className="w-7 h-7 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 transition cursor-pointer"
                              onClick={() => handleStatusChange(session.id, "Canceled")}
                              disabled={session.status=== "Canceled"}
                              title="Reject"
                            >
                             <Image src="/reject.png" alt="Reject" width={16} height={16} />
                             </button>
              <button
                className="w-7 h-7 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 transition cursor-pointer"
                onClick={() => handleStatusChange(session.id, "Completed")}
                disabled={session.status === "Completed"}
                title="Approve"
              >
                <Image src="/accept3.png" alt="Approve" width={16} height={16} />
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Top */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Sessions</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-300">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-300">
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="session" type="create" />}
          </div>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-gray-400 p-4">Loading sessions...</p>
      ) : (
        <Table columns={columns} renderRow={renderRow} data={filteredSessions} />
      )}

      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default SessionListPage;


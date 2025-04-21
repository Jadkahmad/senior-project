"use client";

import FormModal from "@/app/components/FormModel";
import Pagination from "@/app/components/dashboard/Pagiantion";
import Table from "@/app/components/dashboard/Table";
import TableSearch from "@/app/components/dashboard/TableSearch";
import { role, classesData } from "@/app/lib/data";
import Image from "next/image";

// Dummy data for testing
type Session = {
  id: number;
  studentName: string;
  tutorName: string;
  courseName: string;
  date: string;
  time: string;
  status: string;
};

const sessionsData: Session[] = [
  {
    id: 1,
    studentName: "Ali Ahmad",
    tutorName: "Sara Khaled",
    courseName: "Mathematics",
    date: "2025-03-25",
    time: "10:00 AM",
    status: "Completed",
  },
  {
    id: 2,
    studentName: "Maya Nasser",
    tutorName: "Omar Hussein",
    courseName: "Physics",
    date: "2025-03-27",
    time: "2:00 PM",
    status: "Pending",
  },
  {
    id: 3,
    studentName: "Hassan Youssef",
    tutorName: "Lina Tarek",
    courseName: "Chemistry",
    date: "2025-03-30",
    time: "4:30 PM",
    status: "Cancelled",
  },
];

// Map status to color
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

const columns = [
  { header: "Student", accessor: "studentName" },
  { header: "Tutor", accessor: "tutorName" },
  { header: "Course", accessor: "courseName", className: "hidden md:table-cell" },
  { header: "Date", accessor: "date", className: "hidden md:table-cell" },
  { header: "Time", accessor: "time", className: "hidden md:table-cell" },
  { header: "Status", accessor: "status" },
  { header: "Actions", accessor: "action" },
];

const SessionListPage = () => {
  const role = "admin"; 

  const renderRow = (session: Session) => (
    <tr
      key={session.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="p-4">{session.studentName}</td>
      <td>{session.tutorName}</td>
      <td className="hidden md:table-cell">{session.courseName}</td>
      <td className="hidden md:table-cell">{session.date}</td>
      <td className="hidden md:table-cell">{session.time}</td>
      <td className={getStatusColor(session.status)}>{session.status}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="session" type="update" data={session} />
              <FormModal table="session" type="delete" id={session.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Sessions</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-300">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-300">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="session" type="create" />}
          </div>
        </div>
      </div>

      {/* Table */}
      <Table columns={columns} renderRow={renderRow} data={sessionsData} />

      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default SessionListPage;
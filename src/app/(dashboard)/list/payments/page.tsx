"use client";

import FormModal from "@/app/components/FormModel";
import Pagination from "@/app/components/dashboard/Pagiantion";
import Table from "@/app/components/dashboard/Table";
import TableSearch from "@/app/components/dashboard/TableSearch";
import { role, } from "@/app/lib/data";
import Image from "next/image";

// Dummy data
type Payment = {
  id: number;
  studentName: string;
  sessionName: string;
  amount: number;
  method: string;
  date: string;
  status: string;
};

const paymentsData: Payment[] = [
  {
    id: 1,
    studentName: "Ali Ahmad",
    sessionName: "Math - Grade 10",
    amount: 40,
    method: "Cash",
    date: "2025-03-26",
    status: "Paid",
  },
  {
    id: 2,
    studentName: "Maya Nasser",
    sessionName: "Physics - Grade 11",
    amount: 50,
    method: "Card",
    date: "2025-03-25",
    status: "Pending",
  },
  {
    id: 3,
    studentName: "Hassan Youssef",
    sessionName: "Chemistry - Grade 12",
    amount: 45,
    method: "Cash",
    date: "2025-03-24",
    status: "Failed",
  },
];

// Map status to color
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "paid":
      return "text-green-600 font-semibold";
    case "pending":
      return "text-orange-500 font-semibold";
    case "failed":
    case "cancelled":
      return "text-red-600 font-semibold";
    default:
      return "text-gray-600";
  }
};

const columns = [
  { header: "Student", accessor: "studentName" },
  { header: "Session", accessor: "sessionName", className: "hidden md:table-cell" },
  { header: "Amount ($)", accessor: "amount", className: "hidden md:table-cell" },
  { header: "Method", accessor: "method", className: "hidden md:table-cell" },
  { header: "Date", accessor: "date", className: "hidden md:table-cell" },
  { header: "Status", accessor: "status" },
  { header: "Actions", accessor: "action" },
];

const PaymentListPage = () => {
  const role = "admin"; 

  const renderRow = (payment: Payment) => (
    <tr
      key={payment.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="p-4">{payment.studentName}</td>
      <td className="hidden md:table-cell">{payment.sessionName}</td>
      <td className="hidden md:table-cell">${payment.amount}</td>
      <td className="hidden md:table-cell">{payment.method}</td>
      <td className="hidden md:table-cell">{payment.date}</td>
      <td className={getStatusColor(payment.status)}>{payment.status}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="payment" type="update" data={payment} />
              <FormModal table="payment" type="delete" id={payment.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Top Section */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Payments</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-300">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-300">
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="payment" type="create" />}
          </div>
        </div>
      </div>

      {/* Table */}
      <Table columns={columns} renderRow={renderRow} data={paymentsData} />

      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default PaymentListPage;
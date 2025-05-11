"use client";

import { useEffect, useState } from "react";
import FormModal from "@/app/components/FormModel";
import Pagination from "@/app/components/dashboard/Pagiantion";
import Table from "@/app/components/dashboard/Table";
import TableSearch from "@/app/components/dashboard/TableSearch";
import Image from "next/image";

type Payment = {
  id: number;
  studentName: string;
  sessionName: string;  
  Amount: number;
  method: string;
  date: string;
  Status: string;
};

const columns = [
  { header: "Student", accessor: "studentName" },
  { header: "Session", accessor: "sessionName", className: "hidden md:table-cell" },
  { header: "Amount ($)", accessor: "Amount", className: "hidden md:table-cell" },
  { header: "Method", accessor: "method", className: "hidden md:table-cell" },
  { header: "Date", accessor: "date", className: "hidden md:table-cell" },
  { header: "Status", accessor: "Status" },
  { header: "Actions", accessor: "action" },
];

export default function PaymentListPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const role = "admin";

  useEffect(() => {
    fetch("/api/payment")
      .then((res) => res.json())
      .then((data: Payment[]) => setPayments(data))
      .catch(console.error);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
      case "completed":
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

  const renderRow = (p: Payment) => (
    <tr
      key={p.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="p-4">{p.studentName}</td>
      <td className="hidden md:table-cell">{p.sessionName}</td>
      <td className="hidden md:table-cell">${p.Amount}</td>
      <td className="hidden md:table-cell">{p.method}</td>
      <td className="hidden md:table-cell">{p.date}</td>
      <td className={getStatusColor(p.Status)}>{p.Status}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="payment" type="update" data={p} />
              <FormModal table="payment" type="delete" id={p.id} />
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
      <Table columns={columns} renderRow={renderRow} data={payments} />

      {/* Pagination */}
      <Pagination />
    </div>
  );
}

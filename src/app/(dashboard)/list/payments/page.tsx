"use client";

import { useEffect, useState } from "react";
import FormModal from "@/app/components/FormModel";
import Pagination from "@/app/components/dashboard/Pagiantion";
import Table from "@/app/components/dashboard/Table";
import TableSearch from "@/app/components/dashboard/TableSearch";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

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
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    fetch("/api/payment")
      .then((res) => res.json())
      .then((data: Payment[]) => setPayments(data))
      .catch(console.error);
  }, []);
  const filteredPayments = payments.filter((payment) =>
    payment.studentName.toLowerCase().includes(searchQuery) ||
    payment.Status.toLowerCase().includes(searchQuery) ||
    payment.sessionName.toLowerCase().includes(searchQuery)
  );

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
        case "unpaid":
        return "text-red-600 font-semibold";
      default:
        return "text-gray-600";
    }
  };

const handleStatusChange = async (id: number, newStatus: string) => {
  try {
    console.log(id);
    console.log(newStatus);
    const res = await fetch("/api/payment/status", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus }),
    });

    if (!res.ok) throw new Error("Status update failed");

    setPayments((prev) =>
      prev.map((payment) =>
        payment.id === id ? { ...payment, Status: newStatus } : payment
      )
    );
  } catch (err) {
    console.error(err);
    alert("Could not update payment status");
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

              {/* Approve button to change status to "Completed" */}
              <button
                className="w-7 h-7 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 transition cursor-pointer"
                onClick={() => handleStatusChange(p.id, "Unpaid")}
                disabled={p.Status === "Unapaid"}
                title="Reject"
              >
               <Image src="/reject.png" alt="Reject" width={16} height={16} />
              </button>
              <button
                className="w-7 h-7 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 transition cursor-pointer"
                onClick={() => handleStatusChange(p.id, "Paid")}
                disabled={p.Status === "Paid"}
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

      
      <Table columns={columns} renderRow={renderRow} data={filteredPayments} />
      

      {/* Pagination */}
      <Pagination />
    </div>
  );
}


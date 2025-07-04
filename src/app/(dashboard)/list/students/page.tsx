"use client";
import FormModal from "@/app/components/FormModel";
import Pagination from "@/app/components/dashboard/Pagiantion";
import Table from "@/app/components/dashboard/Table";
import TableSearch from "@/app/components/dashboard/TableSearch";
import { role } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
type Student = {
  id: number;
  studentId: string;
  name: string;
  email?: string;
  photo: string;
  phone?: string;
  regtype?: string;
  class: string;
  address: string;
  dateOfAdmission: string;
  parentId: string;
};

const columns = [
  { header: "Info", accessor: "info" },
  { header: "Student ID", accessor: "studentId", className: "hidden md:table-cell" },
  { header: "RegType", accessor: "regtype", className: "hidden lg:table-cell" },
  { header: "Parent ID", accessor: "parentId", className: "hidden md:table-cell" }, 
  { header: "Date of Admission", accessor: "dateOfAdmission", className: "hidden lg:table-cell" },
  { header: "Actions", accessor: "action" },
];

const StudentListPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";



  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("/api/students");
        if (!res.ok) throw new Error("Failed to fetch students");
        const data = await res.json();

        const formatted = data.map((s: any) => ({
          id: s.id,
          studentId: s.User_id,
          name: `${s.First_name} ${s.Last_name}`,
          email: s.Email,
          photo: "/student-avatar.png",
          phone: s.Phone_number,
          regtype: s.Registration_type,
          class: s.Level,
          address: s.Address,
          dateOfAdmission: s.Admission_Date,
          parentId: s.parentUserId ?? "N/A",
        }));

        setStudents(formatted);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery) ||
    student.address.toLowerCase().includes(searchQuery) ||
    student.dateOfAdmission.toLowerCase().includes(searchQuery)
  );

  const renderRow = (item: Student) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-sky-100"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src="/avatar.png"
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.class}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.studentId}</td>
      <td className="hidden md:table-cell">{item.regtype}</td>
      <td className="hidden md:table-cell">{item.parentId}</td>
      <td className="hidden md:table-cell">{item.dateOfAdmission.split("T")[0]}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/students/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-sky-100 cursor-pointer">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <FormModal table="student" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Students</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-400">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-400">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="student" type="create" />}
          </div>
        </div>
      </div>

      {loading ? (
        <p className="p-4 text-gray-400">Loading Students...</p>
      ) : (
      <Table columns={columns} renderRow={renderRow} data={filteredStudents} />
      )}

      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default StudentListPage;

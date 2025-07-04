"use client";
import FormModal from "@/app/components/FormModel";
import Pagination from "@/app/components/dashboard/Pagiantion";
import Table from "@/app/components/dashboard/Table";
import TableSearch from "@/app/components/dashboard/TableSearch";
import { role , teachersData } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";
import { availableMemory } from "process";

type Tutor = {
  id: number;
  teacherId: string;
  name: string;
  email?: string;
  photo: string;
  phone: string;
  subjects: string[];
  classes: string[];
  address: string;
  availability:string; 
};

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Availability",
    accessor: "availability",
    className: "hidden md:table-cell",
  },
  {
    header: "Teacher ID",
    accessor: "teacherId",
    className: "hidden md:table-cell",
  },
  {
    header: "Subjects",
    accessor: "subjects",
    className: "hidden md:table-cell",
  },
  {
    header: "Experience Years",
    accessor: "experience years",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const TeacherListPage = () => {
  const [tutors, setTutors] = useState<Tutor[]>([]);
const [loading, setLoading] = useState(true);
const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
useEffect(() => {
  const fetchTutors = async () => {
    try {
      const res = await fetch("/api/tutors"); 
      if (!res.ok) throw new Error("Failed to fetch tutors");

      const data = await res.json();

      const formatted = data.map((t: any) => ({
        id: t.id,
        teacherId: t.User_id,
        name: t.Full_name,
        email: t.Email,
        photo: "/teacher-avatar.png", 
        phone: t.Phone_number,
        subjects: t.Subject_specification ? t.Subject_specification.split(",") : [],
        classes: t.Experience_years ? [`${t.Experience_years} years`] : [],
        address: t.Address || "N/A",
        availability: t.Availability
      }));

      setTutors(formatted);
    } catch (err) {
      console.error("Error loading tutors:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchTutors();
}, []);

 const filteredTutors = tutors.filter((tutor) =>
    tutor.name.toLowerCase().includes(searchQuery)
  );

  const renderRow = (item: Tutor) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-sky-100"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={"/avatar.png"}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.availability}</td>
      <td className="hidden md:table-cell">{item.teacherId}</td>
      <td className="hidden md:table-cell">{item.subjects.join(",")}</td>
      <td className="hidden md:table-cell">{item.classes.join(",")}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/tutors/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full cursor-pointer">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-yellow">
            //   <Image src="/delete.png" alt="" width={16} height={16} />
            // </button>
            <FormModal table="teacher" type="delete" id={item.id}/>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-400 cursor-pointer">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-300 cursor-pointer">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
              // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              //   <Image src="/plus.png" alt="" width={14} height={14} />
              // </button>
              <FormModal table="teacher" type="create"/>
            )}
          </div>
        </div>
      </div>
      {loading ? (
        <p className="p-4 text-gray-400">Loading Tutors...</p>
      ) : (
      <Table columns={columns} renderRow={renderRow} data={filteredTutors} />
      )}
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default TeacherListPage;
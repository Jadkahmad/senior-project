"use client";
import FormModal from "@/app/components/FormModel";
import Pagination from "@/app/components/dashboard/Pagiantion";
import Table from "@/app/components/dashboard/Table";
import TableSearch from "@/app/components/dashboard/TableSearch";
import { parentsData, role } from "@/app/lib/data";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Parent = {
  id: number;
  name: string;
  email?: string;
  students: string[];
  phone: string;
  address: string;
};

const columns = [
  {
    header: "Info",
    accessor: "info",
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

const ParentListPage = () => {
  const [parents, setParents] = useState<Parent[]>([]);
const [loading, setLoading] = useState(true);
const searchParams = useSearchParams();
const searchQuery = searchParams.get("search")?.toLowerCase() || "";

useEffect(() => {
  const fetchParents = async () => {
    try {
      const res = await fetch("/api/parents");
      if (!res.ok) throw new Error("Failed to fetch parents");
      const data = await res.json();

      const formatted = data.map((item: any) => ({
        id: item.id,
        name: `${item.First_name} ${item.Last_name}`,
        email: item.Email,
        phone: item.Phone_number,
        address: item.Address,
        userId :item.User_id
      }));

      setParents(formatted);
    } catch (error) {
      console.error("Error fetching parents:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchParents();
}, []);
const filteredParents = parents.filter((parent) =>
    parent.name.toLowerCase().includes(searchQuery)
  );
  const renderRow = (item: Parent) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="parent" type="update" data={item} />
              <FormModal table="parent" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Parents</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-300">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-300">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
              <FormModal table="parent" type="create"/>
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={filteredParents} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default ParentListPage;
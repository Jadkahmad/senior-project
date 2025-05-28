"use client";
import FormModal from "@/app/components/FormModel";
import Pagination from "@/app/components/dashboard/Pagiantion";
import Table from "@/app/components/dashboard/Table";
import TableSearch from "@/app/components/dashboard/TableSearch";
import { role, subjectsData } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Course = {
  id: number;
  Title: string;
  Description: string;
};

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Description",
    accessor: "description",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];
const CourseListPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/courses");
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.Title.toLowerCase().includes(searchQuery)
  );
  const renderRow = (item: Course) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.Title}</td>
      <td className="hidden md:table-cell">{item.Description}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="course" type="update" data={item} />
              <FormModal table="course" type="delete" id={item.id} />
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
        <h1 className="hidden md:block text-lg font-semibold">All Courses</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-300">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-300">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="course" type="create" />}
          </div>
        </div>
      </div>

      {/* LIST */}
      {loading ? (
        <p className="p-4 text-gray-400">Loading courses...</p>
      ) : (
        <Table columns={columns} renderRow={renderRow} data={filteredCourses} />
      )}

      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default CourseListPage;
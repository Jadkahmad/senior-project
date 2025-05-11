"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { JSX, useState } from "react";
import SessionForm from "./forms/SessionForm";
import CourseForm from "./forms/CourseForm";
import PaymentForm from "./forms/PaymentForm";

const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ParentForm = dynamic(() => import("./forms/ParentForm"), {
  loading: () => <h1>Loading...</h1>,
});

const forms: {
  [key: string]: (type: "create" | "update", data?: any) => JSX.Element;
} = {
  teacher: (type, data) => <TeacherForm type={type} data={data} />,
  student: (type, data) => <StudentForm type={type} data={data} />,
  parent: (type, data) => <ParentForm type={type} data={data} />,
  session: (type, data) => <SessionForm type={type} data={data} />,
  course: (type, data) => <CourseForm type={type} data={data} />,
  payment: (type, data) => <PaymentForm type={type} data={data} />,
};

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "session"
    | "course"
    | "payment"
    | "applications"
    | "announcement";
  type: "create" | "update" | "delete" | "approve" | "reject";
  data?: any;
  id?: number;
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-yellow"
      : type === "update"
      ? "bg-sky-300"
      : "bg-purple";

  const [open, setOpen] = useState(false);

  const Form = () => {
    if (type === "delete" && id) {
      const handleDelete = async () => {
        try {
          let endpoint = "";
          switch (table) {
            case "session":
              endpoint = "/api/session";
              break;
            case "course":
              endpoint = "/api/courses";
              break;
            case "payment":
              endpoint = "/api/payment";
              break;
            default:
              return alert("Unknown delete target.");
          }

          const res = await fetch(endpoint, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
          });

          const result = await res.json();

          if (!res.ok) {
            alert(result.error || "Deletion failed");
            return;
          }

          setOpen(false);
          window.location.reload();
        } catch (error) {
          console.error("Delete error:", error);
          alert("An error occurred while deleting.");
        }
      };

      return (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleDelete();
          }}
          className="p-4 flex flex-col gap-4"
        >
          <span className="text-center font-medium">
            All data will be lost. Are you sure you want to delete this {table}?
          </span>
          <button
            type="submit"
            className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center"
          >
            Delete
          </button>
        </form>
      );
    }

    if (type === "create" || type === "update") {
      return forms[table]?.(type, data) || <p>Form not found!</p>;
    }

    return <p>Form not found!</p>;
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
      </button>
      {open && (
        <div className="bg-black opacity-90 w-screen h-screen absolute left-0 top-0 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="close" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;

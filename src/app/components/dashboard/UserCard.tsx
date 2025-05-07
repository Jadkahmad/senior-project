"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const UserCard = ({ type }: { type: string }) => {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        let endpoint = "";

        switch (type.toLowerCase()) {
          case "student":
            endpoint = "/api/students";
            break;
          case "tutor":
            endpoint = "/api/tutors"; 
            break;
          case "parent":
            endpoint = "/api/parents"; 
            break;
          default:
            return;
        }
        if(endpoint !== ""){
            const res = await fetch(endpoint);
            if (!res.ok) throw new Error("Fetch failed");
    
            const data = await res.json();
            setCount(data.length || 0);
        }else{
            setCount(0);
        }
       
      } catch (error) {
        console.error(`Failed to fetch ${type} data:`, error);
        setCount(0); 
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, [type]);

  const currentDate = new Date().toLocaleDateString("en-GB");

  return (
    <div className="rounded-2xl odd:bg-blue-700 even:bg-yellow-300 p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-black">
          {currentDate}
        </span>
        <Image src="/more.png" alt="more" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4 text-black">
        {loading ? "Loading..." : count?.toLocaleString()}
      </h1>
      <h2 className="capitalize text-sm font-semibold text-black">
        {type}s
      </h2>
    </div>
  );
};

export default UserCard;

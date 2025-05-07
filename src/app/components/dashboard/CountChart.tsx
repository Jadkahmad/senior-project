"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";

const CountChart = () => {
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/students");
        const students = await res.json();

        const males = students.filter(
          (student: any) => student.Gender?.toLowerCase() === "male"
        ).length;
        const females = students.filter(
          (student: any) => student.Gender?.toLowerCase() === "female"
        ).length;

        setMaleCount(males);
        setFemaleCount(females);
        setTotalCount(males + females);
      } catch (error) {
        console.error("Failed to fetch student data:", error);
      }
    };

    fetchData();
  }, []);

  const getPercentage = (count: number) =>
    totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;

  const chartData = [
    {
      name: "Total",
      count: totalCount,
      fill: "white",
    },
    {
      name: "Girls",
      count: femaleCount,
      fill: "#FAE27C",
    },
    {
      name: "Boys",
      count: maleCount,
      fill: "#C3EBFA",
    },
  ];

  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold text-black">Students</h1>
        <Image src="/moreDark.png" alt="more options" width={20} height={20} />
      </div>

      {/* CHART */}
      <div className="relative w-full h-[70%]">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={chartData}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src="/maleFemale.png"
          alt="gender icon"
          width={50}
          height={50}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* BOTTOM */}
      <div className="flex justify-center gap-16 -mt-8 pl-4">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 rounded-sm bg-sky-200" />
          <h1 className="font-bold text-black">{maleCount.toLocaleString()}</h1>
          <h2 className="font-medium text-black">Boys ({getPercentage(maleCount)}%)</h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 rounded-sm bg-yellow-200" />
          <h1 className="font-bold text-black">{femaleCount.toLocaleString()}</h1>
          <h2 className="font-medium text-black">Girls ({getPercentage(femaleCount)}%)</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;

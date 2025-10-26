"use client";

import { AdminCard } from "@/components/elements/AdminCard";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap, Users } from "lucide-react";
import { useState } from "react";
import AverageAccuracyChart from "./AverageAccuracyChart";
import SubjectPerformance from "./SubjectPerformance";

export const dashboardStats = [
  {
    title: "Total Students",
    value: 12762,
    icon: <Users className="size-6 text-primary" />,
  },
  {
    title: "New Students",
    value: 324,
    icon: <Users className="size-6 text-primary" />,
  },
  {
    title: "Active Students",
    value: 12564,
    icon: <Users className="size-6 text-primary" />,
  },
  {
    title: "Inactive Students",
    value: 12564,
    icon: <Users className="size-6 text-primary" />,
  },
  {
    title: "Total Subject",
    value: 10,
    icon: <BookOpen className="size-6 text-primary" />,
  },
  {
    title: "Quiz Participants (Daily)",
    value: 146,
    icon: <GraduationCap className="size-6 text-primary" />,
  },
];

function AdminDashboard() {
  const [range, setRange] = useState<"day" | "month" | "year">("day");
  
  const handleRange = async (value: "day" | "month" | "year") => {
    setRange(value);
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Date Range Selector */}
      <div className="flex items-center justify-end">
        <div className="w-fit py-2 px-2 sm:py-2.5 sm:px-4 rounded-xl sm:rounded-2xl border-2 border-black bg-white">
          <Button
            className={`${
              range === "day"
                ? "bg-[#A8D8FF] text-black"
                : "bg-white text-gray-400"
            } px-3 sm:px-5 text-sm sm:text-base hover:bg-blue-100`}
            onClick={() => handleRange("day")}
          >
            Day
          </Button>
          <Button
            className={`${
              range === "month"
                ? "bg-[#A8D8FF] text-black"
                : "bg-white text-gray-400"
            } px-3 sm:px-5 text-sm sm:text-base hover:bg-blue-100`}
            onClick={() => handleRange("month")}
          >
            Month
          </Button>
          <Button
            className={`${
              range === "year"
                ? "bg-[#A8D8FF] text-black"
                : "bg-white text-gray-400"
            } px-3 sm:px-5 text-sm sm:text-base hover:bg-blue-100`}
            onClick={() => handleRange("year")}
          >
            Year
          </Button>
        </div>
      </div>

      {/* Top 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {dashboardStats.slice(0, 4).map((item, index) => (
          <AdminCard key={index} {...item} />
        ))}
      </div>

      {/* Second Row: Left (2 Cards + Chart) and Right (Subject Performance) */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Left Side: 2 Small Cards + Average Accuracy Chart */}
        <div className="space-y-4">
          {/* Two Small Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dashboardStats.slice(4, 6).map((item, index) => (
              <AdminCard key={index} {...item} />
            ))}
          </div>
          
          {/* Average Accuracy Chart */}
          <div className="h-auto">
            <AverageAccuracyChart />
          </div>
        </div>

        {/* Right Side: Subject Performance - Same Height as Left Side */}
        <div className="h-full">
          <SubjectPerformance />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
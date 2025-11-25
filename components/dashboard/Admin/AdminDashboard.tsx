"use client";

import { AdminCard } from "@/components/elements/AdminCard";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap, Users } from "lucide-react";
import { useState } from "react";
import AverageAccuracyChart from "./AverageAccuracyChart";
import SubjectPerformance from "./SubjectPerformance";
import { useGetDashboardStatsQuery } from "@/store/slice/apiSlice";

function AdminDashboard() {
  const [range, setRange] = useState<"day" | "month" | "year">("day");

  const {
    data: stats,
    isLoading,
    isFetching,
  } = useGetDashboardStatsQuery({ period: range });

  const studentStats = stats?.student_stats;
  const quizStats = stats?.quiz_stats;
  const accuracyData = stats?.average_accuracy || [];
  const subjectPerformance = stats?.subject_performance || [];

  const cards = [
    {
      title: "Total Students",
      value: studentStats?.total_students ?? 0,
      icon: <Users className="size-6 text-primary" />,
    },
    {
      title: "New Students",
      value: studentStats?.new_students ?? 0,
      icon: <Users className="size-6 text-primary" />,
    },
    {
      title: "Active Students",
      value: studentStats?.active_students ?? 0,
      icon: <Users className="size-6 text-primary" />,
    },
    {
      title: "Inactive Students",
      value: studentStats?.inactive_students ?? 0,
      icon: <Users className="size-6 text-primary" />,
    },
    {
      title: "Total Subject",
      value: quizStats?.total_subjects ?? 0,
      icon: <BookOpen className="size-6 text-primary" />,
    },
    {
      title: `Quiz Participants (${range === "day" ? "Daily" : range === "month" ? "Monthly" : "Yearly"})`,
      value: quizStats?.quiz_participants ?? 0,
      icon: <GraduationCap className="size-6 text-primary" />,
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 p-4 lg:p-0">
      {/* Date Range Selector */}
      <div className="flex items-center justify-end">
        <div className="w-fit py-2 px-2 sm:py-2.5 sm:px-4 rounded-xl sm:rounded-2xl border-2 border-black bg-white">
          <Button
            className={`${
              range === "day"
                ? "bg-[#A8D8FF] text-black"
                : "bg-white text-gray-400"
            } px-3 sm:px-5 text-sm sm:text-base hover:bg-blue-100`}
            onClick={() => setRange("day")}
            disabled={isFetching}
          >
            Day
          </Button>
          <Button
            className={`${
              range === "month"
                ? "bg-[#A8D8FF] text-black"
                : "bg-white text-gray-400"
            } px-3 sm:px-5 text-sm sm:text-base hover:bg-blue-100`}
            onClick={() => setRange("month")}
            disabled={isFetching}
          >
            Month
          </Button>
          <Button
            className={`${
              range === "year"
                ? "bg-[#A8D8FF] text-black"
                : "bg-white text-gray-400"
            } px-3 sm:px-5 text-sm sm:text-base hover:bg-blue-100`}
            onClick={() => setRange("year")}
            disabled={isFetching}
          >
            Year
          </Button>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 border-2 border-dashed rounded-xl h-32 animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          {/* Top 4 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {cards.slice(0, 4).map((item, index) => (
              <AdminCard key={index} {...item} />
            ))}
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {/* Left Side */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cards.slice(4, 6).map((item, index) => (
                  <AdminCard key={index} {...item} />
                ))}
              </div>
              <AverageAccuracyChart data={accuracyData} />
            </div>

            {/* Right Side */}
            <div className="h-full">
              <SubjectPerformance data={subjectPerformance} isDashboard={true} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminDashboard;
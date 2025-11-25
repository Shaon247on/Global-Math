"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NoDataFound from "@/components/elements/NoDataFound";
import AverageAccuracyChart from "../Admin/AverageAccuracyChart";
import SubjectPerformance from "../Admin/SubjectPerformance";
import StudentCard from "@/components/elements/StudentCard";
import { useGetStudentDetailQuery } from "@/store/slice/apiSlice";

interface StudentDetailsProps {
  id: string;
}

export default function StudentDetails({ id }: StudentDetailsProps) {
  const {
    data: studentData,
    isLoading,
    isError,
  } = useGetStudentDetailQuery({ user_id: id });
  console.log("Receiving ID:", id)

  if (isLoading) {
    return (
      <div className="bg-white p-7 flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading student details...</div>
      </div>
    );
  }

  if (isError || !studentData) {
    return <NoDataFound />;
  }

  const { profile, monthly_accuracy, subject_performance, quiz_statistics } = studentData;

  const initials = profile.full_name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="bg-white p-7">
      <div className="flex items-center gap-3 flex-col">
        <Avatar className="size-40">
          <AvatarImage src={profile.profile_pic || ""} alt="student profile" />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-medium">{profile.full_name}</h1>
        <div className="flex items-center justify-center gap-4">
          <h3 className="text-[#F88400] text-2xl font-semibold">
            XP: {profile.xp}
          </h3>
          <h3 className="text-[#5CA1FE] text-2xl font-semibold">
            Rank: #{profile.rank}
          </h3>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 items-stretch w-full gap-6 mt-8">
          <div className="xl:max-w-2xl col-span-2">
            <AverageAccuracyChart data={monthly_accuracy} />
          </div>
          <div className="xl:min-w-lg col-span-2">
            <SubjectPerformance data={subject_performance.slice(0,8)} isDashboard={false} />
          </div>
          <div className="col-span-1 w-full flex flex-col md:flex-row xl:flex-col items-start justify-between xl:items-stretch gap-6 h-auto">
            <StudentCard
              title="Quiz Attempted"
              value={quiz_statistics.quiz_attempted}
            />
            <StudentCard
              title="Average Score"
              value={`${quiz_statistics.average_score}%`}
            />
            <StudentCard
              title="Subject Covered"
              value={quiz_statistics.subject_covered}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
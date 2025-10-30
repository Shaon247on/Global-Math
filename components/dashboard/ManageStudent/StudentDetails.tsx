"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NoDataFound from "@/components/elements/NoDataFound";
import AverageAccuracyChart from "../Admin/AverageAccuracyChart";
import SubjectPerformance from "../Admin/SubjectPerformance";
import StudentCard from "@/components/elements/StudentCard";
import { dummyData } from "@/data/studentData";

interface StudentDetailsProps {
  id: string;
}

function StudentDetails({ id }: StudentDetailsProps) {
  const studentData = dummyData.find((student) => student.id === id);
  const initials = studentData?.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
  console.log("Student Details:", studentData);

  if (!studentData) {
    <NoDataFound />;
  }

  return (
    <div className="bg-white p-7">
      <div className="flex items-center gap-3 flex-col">
        <Avatar className="size-40">
          <AvatarImage src={studentData?.avatar} alt="student profile image" />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-medium">{studentData?.name}</h1>
        <div className="flex items-center justify-center gap-4">
          <h3 className="text-[#F88400] text-2xl font-semibold">
            XP: {studentData?.xp}
          </h3>
          <h3 className="text-[#5CA1FE] text-2xl font-semibold">
            Rank: #{studentData?.rank}
          </h3>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-5 items-stretch w-full xl:flex-row gap-6 mt-8">
          <div className="xl:max-w-2xl col-span-2">
            <AverageAccuracyChart />
          </div>
          <div className="xl:min-w-lg col-span-2">
            <SubjectPerformance isDashboard={false} />
          </div>
          <div className="col-span-1 w-full flex flex-col md:flex-row xl:flex-col items-start justify-between xl:items-stretch gap-6 h-auto">
            <StudentCard
              title="Quiz Attempted"
              value={studentData?.attempted}
            />
            <StudentCard
              title="Average Score"
              value={`${studentData?.averageScore}`}
            />
            <StudentCard
              title="Subject Covered"
              value={studentData?.activeSubject}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;

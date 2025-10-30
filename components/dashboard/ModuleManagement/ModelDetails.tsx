"use client";
import NoDataFound from "@/components/elements/NoDataFound";
import { moduleData } from "@/data/moduleData";
import AverageAccuracyChart from "../Admin/AverageAccuracyChart";
import StudentCard from "@/components/elements/StudentCard";

interface ModelDetailsProps {
  id: string;
}

function ModelDetails({ id }: ModelDetailsProps) {
  const moduleDetails = moduleData.find((item) => item.id === id);
  if (!moduleDetails?.id) return <NoDataFound />;
  return (
    <div className="bg-white min-h-[calc(100vh-100px)] p-6">
      <h1 className="text-center font-medium text-4xl">{moduleDetails?.moduleName}</h1>
      <div className="flex flex-col xl:flex-row items-center justify-center max-w-5xl mx-auto md:mt-14 gap-6 xl:gap-14">
        <div className="max-w-[300px] md:max-w-2xl lg:max-w-4xl">
          <AverageAccuracyChart/>
        </div>
        <div className="flex flex-col md:flex-row xl:flex-col items-stretch gap-6 w-full md:w-2xl lg:w-full">
          <StudentCard
          title="Quiz Attempted"
          value={moduleDetails.quizAttended}
          />
          <StudentCard
          title="Average Score"
          value={`${moduleDetails.average}%`}
          />
          <StudentCard
          title="Top Score"
          value={moduleDetails.topScore}
          />
        </div>
      </div>

    </div>
  );
}

export default ModelDetails;

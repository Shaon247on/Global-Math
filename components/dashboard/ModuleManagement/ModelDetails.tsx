"use client";
import AverageAccuracyChart from "../Admin/AverageAccuracyChart";
import StudentCard from "@/components/elements/StudentCard";
import { useGetModuleByIdQuery } from "@/store/slice/apiSlice";
import { useParams } from "next/navigation";
function ModelDetails() {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetModuleByIdQuery({ id: id });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
  return (
    <div className="bg-white min-h-[calc(100vh-100px)] p-6">
      <h1 className="text-center font-medium text-4xl">{data?.module_name}</h1>
      <div className="flex flex-col xl:flex-row items-center justify-center max-w-5xl mx-auto md:mt-14 gap-6 xl:gap-14">
        <div className="max-w-[300px] md:max-w-2xl lg:max-w-4xl">
          <AverageAccuracyChart data={data?.monthly_accuracy} />
        </div>
        <div className="flex flex-col md:flex-row xl:flex-col items-stretch gap-6 w-full md:w-2xl lg:w-full">
          <StudentCard title="Quiz Attempted" value={data?.quiz_attempted} />
          <StudentCard
            title="Average Score"
            value={`${data?.average_score}%`}
          />
          <StudentCard title="Top Score" value={data?.top_score} />
        </div>
      </div>
    </div>
  );
}

export default ModelDetails;

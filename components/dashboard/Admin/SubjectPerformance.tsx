"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SubjectPerformanceData {
  subject: string;
  accuracy: number;
}

interface SubjectPerformanceProps {
  data: SubjectPerformanceData[];
  isDashboard?: boolean;
}

export default function SubjectPerformance({ data, isDashboard = false }: SubjectPerformanceProps) {
  if (!data || data.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg sm:text-xl font-semibold">
            Subject Performance{" "}
            <span className="text-gray-500 font-normal text-base">
              (Overall student)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64 text-gray-500">
          No subject performance data
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg sm:text-xl font-semibold">
          Subject Performance{" "}
          <span className="text-gray-500 font-normal text-base">
            (Overall student)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className={`space-y-2 ${isDashboard ? "sm:space-y-8" : "sm:space-y-2.5"}`}>
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm sm:text-base font-medium">
                {item.subject}
              </span>
              <span className="text-sm sm:text-base font-semibold">
                {item.accuracy}%
              </span>
            </div>
            <Progress value={item.accuracy} className="h-2 sm:h-2.5" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
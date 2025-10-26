"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SubjectData {
  name: string;
  percentage: number;
}

const subjectPerformanceData: SubjectData[] = [
  { name: "Tectonics", percentage: 48 },
  { name: "Water Cycle", percentage: 74 },
  { name: "Carbon Cycle", percentage: 54 },
  { name: "Globalisation", percentage: 88 },
  { name: "Migration", percentage: 65 },
  { name: "Coasts", percentage: 76 },
  { name: "Glaciers", percentage: 35 },
  { name: "Regenerating Places", percentage: 52 },
];

export default function SubjectPerformance() {
  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg sm:text-xl font-semibold">
          Subject Performance{" "}
          <span className="text-gray-500 font-normal text-base">
            (Overall student)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-5">
        {subjectPerformanceData.map((subject, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm sm:text-base font-medium">
                {subject.name}
              </span>
              <span className="text-sm sm:text-base font-semibold">
                {subject.percentage}%
              </span>
            </div>
            <Progress 
              value={subject.percentage} 
              className="h-2 sm:h-2.5"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
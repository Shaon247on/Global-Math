"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

interface MonthlyPerformance {
  month: string;
  value: number;
}

interface AverageAccuracyChartProps {
  data: MonthlyPerformance[];
}

const chartConfig = {
  value: {
    label: "Accuracy",
    color: "hsl(210, 100%, 60%)",
  },
};

export default function AverageAccuracyChart({ data }: AverageAccuracyChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold">
            Average Accuracy
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[400px] text-gray-500">
          No performance data available
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold">
          Average Accuracy
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <ChartContainer config={chartConfig} className="h-[300px] sm:h-[350px] md:h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fontSize: 12 }}
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                labelFormatter={(value) => `Month: ${value}`}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(210, 100%, 60%)"
                strokeWidth={3}
                dot={{ r: 4, fill: "hsl(210, 100%, 60%)", strokeWidth: 2, stroke: "white" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
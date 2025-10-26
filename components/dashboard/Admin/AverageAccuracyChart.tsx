"use client";

import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

// Generate daily data (30 days)
const generateDailyData = () => {
  const data = [];
  for (let i = 1; i <= 30; i++) {
    data.push({
      label: i,
      accuracy: Math.floor(Math.random() * 600) + 700,
    });
  }
  return data;
};

// Generate weekly data (12 weeks)
const generateWeeklyData = () => {
  const data = [];
  for (let i = 1; i <= 12; i++) {
    data.push({
      label: `W${i}`,
      accuracy: Math.floor(Math.random() * 600) + 700,
    });
  }
  return data;
};

// Generate monthly data (12 months)
const generateMonthlyData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months.map((month) => ({
    label: month,
    accuracy: Math.floor(Math.random() * 600) + 700,
  }));
};

// Generate yearly data (5 years)
const generateYearlyData = () => {
  const currentYear = new Date().getFullYear();
  const data = [];
  for (let i = 4; i >= 0; i--) {
    data.push({
      label: currentYear - i,
      accuracy: Math.floor(Math.random() * 600) + 700,
    });
  }
  return data;
};

const timeRanges = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

const chartConfig = {
  accuracy: {
    label: "Accuracy",
    color: "hsl(210, 100%, 60%)",
  },
};

export default function AverageAccuracyChart() {
  const [selectedRange, setSelectedRange] = useState<"daily" | "weekly" | "monthly" | "yearly">("monthly");

  // Get data based on selected range
  const getData = () => {
    switch (selectedRange) {
      case "daily":
        return generateDailyData();
      case "weekly":
        return generateWeeklyData();
      case "monthly":
        return generateMonthlyData();
      case "yearly":
        return generateYearlyData();
      default:
        return generateMonthlyData();
    }
  };

  // Get label formatter based on selected range
  const getLabelFormatter = () => {
    switch (selectedRange) {
      case "daily":
        return (value: string) => `Day ${value}`;
      case "weekly":
        return (value: string) => `Week ${value}`;
      case "monthly":
        return (value: string) => value;
      case "yearly":
        return (value: string) => `Year ${value}`;
      default:
        return (value: string) => value;
    }
  };

  const currentData = getData();

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 pb-4">
        <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold">
          Average Accuracy
        </CardTitle>
        <Select value={selectedRange} onValueChange={(value: any) => setSelectedRange(value)}>
          <SelectTrigger className="w-full sm:w-[140px] md:w-40 bg-blue-50 border-blue-200">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            {timeRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <ChartContainer config={chartConfig} className="h-[300px] sm:h-[350px] md:h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={currentData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                vertical={true}
                horizontal={true}
              />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
                className="text-xs sm:text-sm"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fontSize: 12 }}
                domain={[0, 2000]}
                ticks={[0, 500, 1000, 1500, 2000]}
                className="text-xs sm:text-sm"
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[140px] sm:w-[160px]"
                    labelFormatter={getLabelFormatter()}
                  />
                }
              />
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="hsl(210, 100%, 60%)"
                strokeWidth={2}
                dot={{
                  r: 3,
                  fill: "hsl(210, 100%, 60%)",
                  strokeWidth: 2,
                  stroke: "white",
                }}
                activeDot={{
                  r: 5,
                  fill: "hsl(210, 100%, 60%)",
                  strokeWidth: 2,
                  stroke: "white",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
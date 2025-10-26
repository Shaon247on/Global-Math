"use client";

import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AdminCardProps {
  icon: ReactNode; // Lucide icon component (e.g., <Users />, <DollarSign />)
  title?: string;
  value: number | string;
  className?: string;
}

export const AdminCard: React.FC<AdminCardProps> = ({
  icon,
  title,
  value,
  className,
}) => {
  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <CardTitle className="text-xl font-medium">{title}</CardTitle>
        <div className="p-4 bg-[#A8D8FF] rounded-lg">{icon}</div>
      </CardHeader>
      <CardContent className="-mt-4">
        <div className="text-2xl md:text-3xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
};

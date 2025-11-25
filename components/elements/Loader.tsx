import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface LoaderProps {
  title?: string;
  message?: string;
  size?: "sm" | "md" | "lg";
  fullHeight?: boolean;
}

export default function Loader({
  title = "Loading",
  message = "Please wait...",
  size = "lg",
  fullHeight = true,
}: LoaderProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-20 h-20",
  };

  return (
    <div
      className="w-full flex items-center justify-center bg-gray-50 p-4"
      style={fullHeight ? { height: "calc(100vh - 100px)" } : {}}
    >
      <Card className="max-w-md w-full shadow-lg">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <div className="mb-4 text-[#5CA1FE]">
            <Loader2 className={`${sizeClasses[size]} animate-spin`} />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>

          <p className="text-gray-600">{message}</p>

          <div className="mt-6 flex gap-2">
            <div className="w-2 h-2 bg-[#5CA1FE] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-[#5CA1FE] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-[#5CA1FE] rounded-full animate-bounce"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
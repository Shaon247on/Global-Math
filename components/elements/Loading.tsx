interface LoadingProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

export default function Loading({ 
  message = "Loading...", 
  size = "md" 
}: LoadingProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div 
      className="w-full flex items-center justify-center bg-gray-50" 
      style={{ height: "calc(100vh - 100px)" }}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div
            className={`${sizeClasses[size]} border-4 border-gray-200 border-t-[#5CA1FE] rounded-full animate-spin`}
          />
        </div>
        <p className="text-gray-600 font-medium text-lg">{message}</p>
      </div>
    </div>
  );
}
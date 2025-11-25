import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorProps {
  title?: string;
  message?: string;
  errorCode?: string | number;
  showRefreshButton?: boolean;
  onRefresh?: () => void;
  icon?: React.ReactNode;
  fullHeight?: boolean;
}

export default function Error({
  title = "Something Went Wrong",
  message = "We encountered an error while processing your request. Please try refreshing the page.",
  errorCode,
  showRefreshButton = true,
  onRefresh,
  icon,
  fullHeight = true,
}: ErrorProps) {
  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    } else {
      window.location.reload();
    }
  };

  return (
    <div
      className="w-full flex items-center justify-center bg-gray-50 p-4"
      style={fullHeight ? { height: "calc(100vh - 100px)" } : {}}
    >
      <Card className="max-w-md w-full shadow-lg border-red-200">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <div className="mb-4 text-red-500">
            {icon || <AlertCircle className="w-20 h-20" />}
          </div>

          {errorCode && (
            <div className="mb-2 text-sm font-mono text-gray-500 bg-gray-100 px-3 py-1 rounded">
              Error Code: {errorCode}
            </div>
          )}

          <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>

          <p className="text-gray-600 mb-6">{message}</p>

          {showRefreshButton && (
            <Button
              onClick={handleRefresh}
              className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Page
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorOnFetchProps {
  title?: string;
  message?: string;
  error?: Error | string | null;
  showReloadButton?: boolean;
  onReload?: () => void;
  showErrorDetails?: boolean;
  icon?: React.ReactNode;
}

export default function ErrorOnFetch({
  title = "Something Went Wrong",
  message = "We encountered an error while fetching the data. Please try again.",
  error = null,
  showReloadButton = true,
  onReload,
  showErrorDetails = false,
  icon,
}: ErrorOnFetchProps) {
  const handleReload = () => {
    if (onReload) {
      onReload();
    } else {
      window.location.reload();
    }
  };

  const getErrorMessage = () => {
    if (!error) return null;
    if (typeof error === "string") return error;
    if (error instanceof Error) return error.message;
    return "Unknown error occurred";
  };

  const errorMessage = getErrorMessage();

  return (
    <div
      className="w-full flex items-center justify-center bg-gray-50 p-4"
      style={{ height: "calc(100vh - 100px)" }}
    >
      <Card className="max-w-md w-full shadow-lg border-red-200">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <div className="mb-4 text-red-500">
            {icon || <AlertCircle className="w-20 h-20" />}
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>

          <p className="text-gray-600 mb-4">{message}</p>

          {showErrorDetails && errorMessage && (
            <div className="w-full bg-red-50 border border-red-200 rounded-md p-3 mb-6">
              <p className="text-sm text-red-800 font-mono wrap-break-words">
                {errorMessage}
              </p>
            </div>
          )}

          {showReloadButton && (
            <Button
              onClick={handleReload}
              className="bg-[#5CA1FE] hover:bg-[#5CA1FE]/90 text-white font-medium px-6 py-2"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
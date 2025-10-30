import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileX, RefreshCw } from "lucide-react";

interface NoDataFoundProps {
  title?: string;
  message?: string;
  showReloadButton?: boolean;
  onReload?: () => void;
  icon?: React.ReactNode;
}

export default function NoDataFound({
  title = "No Data Found",
  message = "We couldn't find any data to display. Please try again or adjust your filters.",
  showReloadButton = true,
  onReload,
  icon,
}: NoDataFoundProps) {
  const handleReload = () => {
    if (onReload) {
      onReload();
    } else {
      window.location.reload();
    }
  };

  return (
    <div
      className="w-full flex items-center justify-center bg-gray-50 p-4"
      style={{ height: "calc(100vh - 100px)" }}
    >
      <Card className="max-w-md w-full shadow-lg">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <div className="mb-4 text-[#5CA1FE]">
            {icon || <FileX className="w-20 h-20" />}
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>

          <p className="text-gray-600 mb-6">{message}</p>

          {showReloadButton && (
            <Button
              onClick={handleReload}
              className="bg-[#5CA1FE] hover:bg-[#5CA1FE]/90 text-white font-medium px-6 py-2"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reload Page
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
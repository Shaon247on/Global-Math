"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useUploadCsvQuestionsMutation } from "@/store/slice/apiSlice";
import { X } from "lucide-react";

interface UploadCsvDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  moduleId: string;
}

export default function UploadCsvDialog({
  open,
  setOpen,
  moduleId,
}: UploadCsvDialogProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [uploadCsv, { isLoading }] = useUploadCsvQuestionsMutation();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type === "text/csv") {
      setSelectedFile(file);
    } else {
      toast.error("Please upload a valid CSV file");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "text/csv") {
      setSelectedFile(file);
    } else {
      toast.error("Please select a valid CSV file");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a CSV file");
      return;
    }

    try {
      const response = await uploadCsv({
        moduleId,
        file: selectedFile,
      }).unwrap();
      if (response.message) {
        toast.success("CSV uploaded successfully!");
        setOpen(false);
        setSelectedFile(null);
      }else{
        toast.error(response.error || "Failed to upload CSV");
      }
    } catch (error) {
      const err = error as { data?: { message?: string, error?: string } };
      toast.error(err?.data?.error|| "Failed to upload CSV");
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-medium">
            Upload your CSV file
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6">
          <div
            className={`relative border-2 border-dashed rounded-2xl p-8 md:p-12 text-center transition-all
    ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}
    ${selectedFile ? "border-green-500 bg-green-50" : ""}
  `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {/* Hidden file input — only on the upload area, NOT over Remove button */}
            {!selectedFile && (
              <input
                type="file"
                accept=".csv,text/csv"
                onChange={handleChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
            )}

            {/* Upload Icon */}
            <svg
              width="101"
              height="74"
              viewBox="0 0 101 74"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto mb-6"
            >
              {/* ... your SVG path */}
            </svg>

            {selectedFile ? (
              <div className="space-y-3">
                <p className="text-lg font-medium text-green-600">
                  {selectedFile.name}
                </p>
                <p className="text-sm text-gray-500">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation(); // ← Critical!
                    setSelectedFile(null);
                  }}
                  className="text-red-600 hover:bg-red-50"
                >
                  <X className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-medium">
                  Drag and drop or{" "}
                  <span className="text-blue-600 underline">browse</span> your
                  CSV file
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Only .csv files are supported
                </p>
              </>
            )}
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-3 mt-6">
          <Button
            variant="outline"
            size="lg"
            onClick={handleCancel}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            size="lg"
            disabled={!selectedFile || isLoading}
            className="w-full sm:w-auto bg-[#5CA1FE] hover:bg-[#5CA1FE]/90"
          >
            {isLoading ? "Uploading..." : "Upload CSV"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

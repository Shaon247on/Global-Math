import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface UploadCsvDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function UploadCsvDialog({ open, setOpen }: UploadCsvDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogHeader></DialogHeader>
      <DialogContent className="sm:max-w-4xl">
        <DialogTitle className="text-center text-2xl font-medium">
          Upload your file here
        </DialogTitle>
        <div className="max-w-2xl mx-auto border-2 border-dashed border-black rounded-2xl md:px-28 md:py-8 mt-4">
          <div className="flex items-center flex-col justify-center md:mb-10">
            <svg
              width="101"
              height="74"
              viewBox="0 0 101 74"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M45.8333 73.3333H25.2083C18.2569 73.3333 12.3185 70.9271 7.39292 66.1146C2.46736 61.3021 0.00305556 55.4201 0 48.4687C0 42.5104 1.79514 37.2014 5.38542 32.5417C8.97569 27.8819 13.6736 24.9028 19.4792 23.6042C21.3889 16.5764 25.2083 10.8854 30.9375 6.53125C36.6667 2.17708 43.1597 0 50.4167 0C59.3542 0 66.9365 3.11361 73.1637 9.34083C79.391 15.5681 82.5031 23.1489 82.5 32.0833C87.7708 32.6944 92.1449 34.9678 95.6221 38.9033C99.0993 42.8389 100.836 47.4406 100.833 52.7083C100.833 58.4375 98.8289 63.308 94.82 67.32C90.8111 71.3319 85.9406 73.3364 80.2083 73.3333H55V40.5625L62.3333 47.6667L68.75 41.25L50.4167 22.9167L32.0833 41.25L38.5 47.6667L45.8333 40.5625V73.3333Z"
                fill="#5CA1FE"
              />
            </svg>
          </div>
          <h3>Drag and drop or browse your CSV File</h3>
        </div>
        <DialogFooter>
          <div className="flex items-center justify-center gap-4 w-full mt-7">
            <Button variant={"outline"} size={"lg"} className="px-10" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              size={"lg"} className="px-10" onClick={() => {
                toast.success("CVS file uploaded successfully.");
                setOpen(false);
              }}
            >
              Upload
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UploadCsvDialog;

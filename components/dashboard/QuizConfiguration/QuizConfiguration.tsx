"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Plus, X } from "lucide-react";
import { toast } from "sonner";
import {
  useGetQuizDurationsQuery,
  useCreateQuizDurationMutation,
  useDeleteQuizDurationMutation,
} from "@/store/slice/apiSlice";

export default function QuizConfiguration() {
  const [durationDialogOpen, setDurationDialogOpen] = useState(false);
  const [customDuration, setCustomDuration] = useState("");
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);

  // RTK Query hooks
  const {
    data: durationsData,
    isLoading,
    isFetching,
  } = useGetQuizDurationsQuery();

  const [createDuration, { isLoading: isCreating }] = useCreateQuizDurationMutation();
  const [deleteDuration] = useDeleteQuizDurationMutation();

  const durations = durationsData?.results || [];

  // Add new duration
  const handleAddDuration = async () => {
    const duration = parseInt(customDuration);
    if (isNaN(duration) || duration <= 0) {
      toast.error("Please enter a valid duration in minutes");
      return;
    }

    try {
      await createDuration({ duration }).unwrap();
      toast.success(`${duration} min duration added`);
      setCustomDuration("");
      setDurationDialogOpen(false);
    } catch {
      toast.error("Failed to add duration");
    }
  };

  // Delete duration
  const handleDeleteDuration = async (id: string) => {
    if (durations.length === 1) {
      toast.error("At least one duration option is required");
      return;
    }

    try {
      await deleteDuration({ id }).unwrap();
      toast.success("Duration removed");
      if (selectedDuration && durations.find(d => d.id === id)?.duration === selectedDuration) {
        setSelectedDuration(null);
      }
    } catch {
      toast.error("Failed to delete duration");
    }
  };


  return (
    <div className="w-full space-y-8 p-4 sm:p-6 lg:p-8 bg-white min-h-[calc(100vh-100px)]">
      {/* Set Quiz Duration Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-[#5CA1FE]" />
          <h2 className="text-xl font-semibold">Set Quiz Duration</h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {isLoading || isFetching ? (
            <div className="text-gray-500">Loading durations...</div>
          ) : durations.length === 0 ? (
            <div className="text-gray-500">No durations available</div>
          ) : (
            durations.map((item) => (
              <div key={item.id} className="relative group">
                <Button
                  variant="outline"
                  onClick={() => setSelectedDuration(item.duration)}
                  className={`min-w-[100px] h-12 text-base border-2 ${
                    selectedDuration === item.duration
                      ? "border-[#5CA1FE] bg-[#5CA1FE]/10 text-[#5CA1FE] font-semibold"
                      : "border-gray-300 hover:border-[#5CA1FE]/50"
                  }`}
                >
                  {item.duration} min
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteDuration(item.id)}
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 hover:bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  disabled={isFetching}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
          <Button
            onClick={() => setDurationDialogOpen(true)}
            className="min-w-[130px] h-12 bg-[#5CA1FE] hover:bg-[#5CA1FE]/90 text-white"
            disabled={isFetching}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Time
          </Button>
        </div>
      </div>

      {/* Add Duration Dialog */}
      <Dialog open={durationDialogOpen} onOpenChange={setDurationDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              Add Custom Duration
            </DialogTitle>
            <DialogDescription className="text-center">
              Enter a custom quiz duration in minutes
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="duration" className="text-base font-medium">
                Minutes
              </Label>
              <Input
                id="duration"
                type="number"
                placeholder="Enter minutes"
                value={customDuration}
                onChange={(e) => setCustomDuration(e.target.value)}
                className="flex-1"
                min="1"
                disabled={isCreating}
              />
            </div>
          </div>
          <DialogFooter className="flex-row gap-3 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setDurationDialogOpen(false);
                setCustomDuration("");
              }}
              className="flex-1 sm:flex-none border-2 border-[#5CA1FE] text-[#5CA1FE] hover:bg-[#5CA1FE]/10"
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAddDuration}
              className="flex-1 sm:flex-none bg-[#5CA1FE] hover:bg-[#5CA1FE]/90 text-white"
              disabled={isCreating}
            >
              {isCreating ? "Adding..." : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
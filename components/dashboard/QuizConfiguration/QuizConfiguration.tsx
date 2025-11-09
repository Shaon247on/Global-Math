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

export default function QuizConfiguration() {
  // Duration state
  const [durations, setDurations] = useState<number[]>([]);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [durationDialogOpen, setDurationDialogOpen] = useState(false);
  const [customDuration, setCustomDuration] = useState("");

  // Quantity state
  const [quantities, setQuantities] = useState<number[]>([]);
  // const [selectedQuantity, setSelectedQuantity] = useState<number | null>(null);
  const [quantityDialogOpen, setQuantityDialogOpen] = useState(false);
  const [customQuantity, setCustomQuantity] = useState("");

  // Handle duration selection
  const handleDurationClick = (duration: number) => {
    setSelectedDuration(duration);
  };

  // Handle quantity selection
  // const handleQuantityClick = (quantity: number) => {
  //   setSelectedQuantity(quantity);
  // };

  // Delete duration
  const handleDeleteDuration = (index: number) => {
    if (durations.length === 1) {
      toast.error("At least one duration option is required");
      return;
    }
    const deletedDuration = durations[index];
    setDurations(durations.filter((_, i) => i !== index));
    if (selectedDuration === deletedDuration) {
      setSelectedDuration(null);
    }
    toast.success("Duration option removed");
  };

  // Delete quantity
  // const handleDeleteQuantity = (index: number) => {
  //   if (quantities.length === 1) {
  //     toast.error("At least one quantity option is required");
  //     return;
  //   }
  //   const deletedQuantity = quantities[index];
  //   setQuantities(quantities.filter((_, i) => i !== index));
  //   if (selectedQuantity === deletedQuantity) {
  //     setSelectedQuantity(null);
  //   }
  //   toast.success("Quantity option removed");
  // };

  // Add custom duration
  const handleAddDuration = () => {
    const duration = parseInt(customDuration);
    if (isNaN(duration) || duration <= 0) {
      toast.error("Please enter a valid duration in minutes");
      return;
    }
    setDurations([...durations, duration]);
    setCustomDuration("");
    setDurationDialogOpen(false);
    toast.success(`${duration} min duration added`);
  };

  // Add custom quantity
  const handleAddQuantity = () => {
    const quantity = parseInt(customQuantity);
    if (isNaN(quantity) || quantity <= 0) {
      toast.error("Please enter a valid number of questions");
      return;
    }
    setQuantities([...quantities, quantity]);
    setCustomQuantity("");
    setQuantityDialogOpen(false);
    toast.success(`${quantity} questions option added`);
  };

  // Reset configuration
  // const handleReset = () => {
  //   setSelectedDuration(null);
  //   setSelectedQuantity(null);
  //   setDurations([5, 5, 5, 5]);
  //   setQuantities([20, 30, 40, 50]);
  //   toast.info("Configuration reset");
  // };

  // Save configuration
  const handleSave = () => {
    // if (selectedDuration === null || selectedQuantity === null) {
    if (selectedDuration === null) {
      toast.error("Please select both duration and quantity");
      return;
    }
    console.log({
      duration: selectedDuration,
      // quantity: selectedQuantity,
    });
    toast.success("Configuration saved successfully");
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
          {durations.map((duration, index) => (
            <div key={`duration-${index}`} className="relative group">
              <Button
                variant="outline"
                onClick={() => handleDurationClick(duration)}
                className={`min-w-[100px] h-12 text-base border-2 ${
                  selectedDuration === duration
                    ? "border-[#5CA1FE] bg-[#5CA1FE]/10 text-[#5CA1FE] font-semibold"
                    : "border-gray-300 hover:border-[#5CA1FE]/50"
                }`}
              >
                {duration} min
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteDuration(index)}
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 hover:bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            onClick={() => setDurationDialogOpen(true)}
            className="min-w-[130px] h-12 bg-[#5CA1FE] hover:bg-[#5CA1FE]/90 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Time
          </Button>
        </div>
      </div>

      {/* Set Question Quantity Section */}
      {/* <div className="space-y-4">
        <div className="flex items-center gap-2">
          <List className="h-5 w-5 text-[#5CA1FE]" />
          <h2 className="text-xl font-semibold">Set Question Quantity</h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {quantities.map((quantity, index) => (
            <div key={`quantity-${index}`} className="relative group">
              <Button
                variant="outline"
                onClick={() => handleQuantityClick(quantity)}
                className={`min-w-[130px] h-12 text-base border-2 ${
                  selectedQuantity === quantity
                    ? "border-[#5CA1FE] bg-[#5CA1FE]/10 text-[#5CA1FE] font-semibold"
                    : "border-gray-300 hover:border-[#5CA1FE]/50"
                }`}
              >
                {quantity} Question
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteQuantity(index)}
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 hover:bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            onClick={() => setQuantityDialogOpen(true)}
            className="min-w-[150px] h-12 bg-[#5CA1FE] hover:bg-[#5CA1FE]/90 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Quantity
          </Button>
        </div>
      </div> */}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8 lg:pt-32">
        {/* <Button
          onClick={handleReset}
          variant="outline"
          className="min-w-[200px] h-12 text-base border-2 border-[#5CA1FE] text-[#5CA1FE] hover:bg-[#5CA1FE]/10"
        >
          Reset
        </Button> */}
        <Button
          onClick={handleSave}
          className="min-w-[200px] h-12 text-base bg-[#5CA1FE] hover:bg-[#5CA1FE]/90 text-white"
        >
          Save Configuration
        </Button>
      </div>

      {/* Add Duration Dialog */}
      <Dialog open={durationDialogOpen} onOpenChange={setDurationDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              Add Custom duration
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
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAddDuration}
              className="flex-1 sm:flex-none bg-[#5CA1FE] hover:bg-[#5CA1FE]/90 text-white"
            >
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Quantity Dialog */}
      <Dialog open={quantityDialogOpen} onOpenChange={setQuantityDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              Add Custom quantity
            </DialogTitle>
            <DialogDescription className="text-center">
              Enter a custom number of questions
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="quantity" className="text-base font-medium">
                Questions
              </Label>
              <Input
                id="quantity"
                type="number"
                placeholder="Enter number"
                value={customQuantity}
                onChange={(e) => setCustomQuantity(e.target.value)}
                className="flex-1"
                min="1"
              />
            </div>
          </div>
          <DialogFooter className="flex-row gap-3 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setQuantityDialogOpen(false);
                setCustomQuantity("");
              }}
              className="flex-1 sm:flex-none border-2 border-[#5CA1FE] text-[#5CA1FE] hover:bg-[#5CA1FE]/10"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAddQuantity}
              className="flex-1 sm:flex-none bg-[#5CA1FE] hover:bg-[#5CA1FE]/90 text-white"
            >
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
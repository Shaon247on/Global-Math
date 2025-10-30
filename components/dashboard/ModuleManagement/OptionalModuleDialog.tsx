"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

interface OptionalPair {
  id: string;
  module1: string;
  module2: string;
}

interface OptionalModuleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableModules: string[];
}

export default function OptionalModuleDialog({
  open,
  onOpenChange,
  availableModules,
}: OptionalModuleDialogProps) {
  const [optionalPairs, setOptionalPairs] = useState<OptionalPair[]>([
    { id: `pair-${crypto.randomUUID()}`, module1: "", module2: "" },
  ]);

  const addOptionalPair = () => {
    const newId = `pair-${Date.now()}-${Math.random()}`;
    setOptionalPairs([
      ...optionalPairs,
      { id: newId, module1: "", module2: "" },
    ]);
  };

  const removeOptionalPair = (id: string) => {
    if (optionalPairs.length === 1) {
      toast.error("At least one optional pair is required");
      return;
    }
    setOptionalPairs(optionalPairs.filter((pair) => pair.id !== id));
  };

  const updatePair = (
    id: string,
    field: "module1" | "module2",
    value: string
  ) => {
    setOptionalPairs(
      optionalPairs.map((pair) =>
        pair.id === id ? { ...pair, [field]: value } : pair
      )
    );
  };

  const handleSave = () => {
    // Validate all pairs are filled
    const allFilled = optionalPairs.every(
      (pair) => pair.module1 && pair.module2
    );

    if (!allFilled) {
      toast.error("Please select modules for all pairs");
      return;
    }

    // Check if same module is selected on both sides in any pair
    const hasSameModule = optionalPairs.some(
      (pair) => pair.module1 === pair.module2
    );

    if (hasSameModule) {
      toast.error("Cannot select the same module on both sides");
      return;
    }

    // Just show success message, no saving
    console.log("Optional modules validated:", optionalPairs);
    toast.success("Optional modules configuration is valid");
    onOpenChange(false);
  };

  const handleCancel = () => {
    setOptionalPairs([{ id: `pair-${Date.now()}`, module1: "", module2: "" }]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[95vh] overflow-scroll bg-gray-50">
        <DialogTitle className="text-2xl font-bold text-center mb-6">
          Choose Optional Module
        </DialogTitle>

        <div className="space-y-4">
          {optionalPairs.map((pair) => (
            <div
              key={pair.id}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 p-4 rounded-lg "
            >
              <div className="flex items-center gap-4 w-full">
                <span className="font-semibold text-lg whitespace-nowrap">
                  Optional{" "}
                  {optionalPairs.findIndex((p) => p.id === pair.id) + 1}:
                </span>

                <div className="flex flex-col sm:flex-row items-center gap-4 flex-1">
                  <Select
                    value={pair.module1}
                    onValueChange={(value) =>
                      updatePair(pair.id, "module1", value)
                    }
                  >
                    <SelectTrigger className="w-full sm:w-64 bg-white">
                      <SelectValue placeholder="Select module" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableModules.map((module, idx) => (
                        <SelectItem key={`m1-${idx}-${module}`} value={module}>
                          {module}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <span className="font-semibold text-lg">vs</span>

                  <Select
                    value={pair.module2}
                    onValueChange={(value) =>
                      updatePair(pair.id, "module2", value)
                    }
                  >
                    <SelectTrigger className="w-full sm:w-64 bg-white">
                      <SelectValue placeholder="Select module" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableModules.map((module, idx) => (
                        <SelectItem key={`m2-${idx}-${module}`} value={module}>
                          {module}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {optionalPairs.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeOptionalPair(pair.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 shrink-0"
                >
                  <X className="h-5 w-5" />
                </Button>
              )}
            </div>
          ))}

          <Button
            onClick={addOptionalPair}
            variant="outline"
            className="w-full border-dashed border-2 border-[#5CA1FE] text-[#5CA1FE] hover:bg-[#5CA1FE]/10"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Optional Pair
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
          <Button
            onClick={handleCancel}
            variant="outline"
            size={"lg"}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            size={"lg"}
            className="px-8"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

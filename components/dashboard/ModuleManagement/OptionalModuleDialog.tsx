"use client";

import { useLayoutEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
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
import {
  useGetOptionalPairsQuery,
  useCreateOptionalPairMutation,
  useDeleteOptionalPairMutation,
} from "@/store/slice/apiSlice";

interface ModuleOption {
  id: string;
  name: string;
}

interface OptionalModuleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableModules: ModuleOption[];
}

interface Pair {
  id: string;
  module1: string; // module ID
  module2: string; // module ID
}

export default function OptionalModuleDialog({
  open,
  onOpenChange,
  availableModules,
}: OptionalModuleDialogProps) {
  const { data: serverData, isLoading } = useGetOptionalPairsQuery(undefined, {
    skip: !open,
  });

  const [createPair, { isLoading: isCreating }] =
    useCreateOptionalPairMutation();
  const [deletePair] = useDeleteOptionalPairMutation();

  const [pairs, setPairs] = useState<Pair[]>([]);

  // Map module ID → name for display
  const moduleIdToName = useMemo(() => {
    const map = new Map<string, string>();
    availableModules.forEach((m) => map.set(m.id, m.name));
    return map;
  }, [availableModules]);

  // Sync from server when dialog opens
  useLayoutEffect(() => {
    const initialPairs = async () => {
      if (!open) {
        setPairs([]); // Reset on close
        return;
      }

      if (serverData?.results && serverData.results.length > 0) {
        setPairs(
          serverData.results.map((p) => ({
            id: p.id,
            module1: p.module_a,
            module2: p.module_b,
          }))
        );
      } else {
        // No server data → start with one empty pair
        setPairs([{ id: `local-${Date.now()}`, module1: "", module2: "" }]);
      }
    };
    initialPairs();
  }, [open, serverData?.results]);

  const addPair = () => {
    if (pairs.length >= 3) {
      toast.error("Maximum 3 optional pairs allowed");
      return;
    }
    setPairs([
      ...pairs,
      { id: `local-${Date.now()}`, module1: "", module2: "" },
    ]);
  };

  const removePair = async (id: string) => {
    if (pairs.length === 1) {
      toast.error("At least one pair is required");
      return;
    }

    if (!id.startsWith("local-")) {
      try {
        await deletePair(id).unwrap();
        toast.success("Pair removed");
      } catch {
        toast.error("Failed to delete pair");
        return;
      }
    }

    setPairs(pairs.filter((p) => p.id !== id));
  };

  const updatePair = (
    id: string,
    field: "module1" | "module2",
    value: string
  ) => {
    setPairs(pairs.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleSave = async () => {
    const allFilled = pairs.every((p) => p.module1 && p.module2);
    const hasSame = pairs.some((p) => p.module1 === p.module2);

    if (!allFilled) {
      toast.error("Please select modules for all pairs");
      return;
    }
    if (hasSame) {
      toast.error("Cannot select the same module on both sides");
      return;
    }

    const localPairs = pairs.filter((p) => p.id.startsWith("local-"));
    if (localPairs.length === 0) {
      toast.success("No changes to save");
      onOpenChange(false);
      return;
    }

    try {
      await Promise.all(
        localPairs.map((pair) =>
          createPair({
            module_a: pair.module1,
            module_b: pair.module2,
          }).unwrap()
        )
      );
      toast.success("All optional pairs saved successfully");
      onOpenChange(false);
    } catch {
      toast.error("Failed to save one or more pairs");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[95vh] overflow-y-auto bg-gray-50">
        <DialogTitle className="text-2xl font-bold text-center mb-6">
          Choose Optional Module
        </DialogTitle>

        {isLoading ? (
          <div className="text-center py-12 text-gray-500">
            Loading pairs...
          </div>
        ) : (
          <div className="space-y-4">
            {pairs.map((pair, pairIndex) => (
              <div
                key={pair.id}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 p-4 rounded-lg bg-white"
              >
                <div className="flex items-center gap-4 w-full">
                  <span className="font-semibold text-lg whitespace-nowrap">
                    Optional {pairIndex + 1}:
                  </span>

                  <div className="flex flex-col sm:flex-row items-center gap-4 flex-1">
                    {/* Left Module */}
                    <Select
                      value={pair.module1}
                      onValueChange={(v) => updatePair(pair.id, "module1", v)}
                    >
                      <SelectTrigger className="w-full sm:w-64 bg-white">
                        <SelectValue placeholder="Select module">
                          {pair.module1 && moduleIdToName.get(pair.module1)}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {availableModules.map((module) => (
                          <SelectItem
                            key={`left-${pair.id}-${module.id}`}
                            value={module.id}
                          >
                            {module.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <span className="font-semibold text-lg">vs</span>

                    {/* Right Module */}
                    <Select
                      value={pair.module2}
                      onValueChange={(v) => updatePair(pair.id, "module2", v)}
                    >
                      <SelectTrigger className="w-full sm:w-64 bg-white">
                        <SelectValue placeholder="Select module">
                          {pair.module2 && moduleIdToName.get(pair.module2)}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {availableModules.map((module) => (
                          <SelectItem
                            key={`right-${pair.id}-${module.id}`}
                            value={module.id}
                          >
                            {module.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {pairs.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removePair(pair.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 shrink-0"
                    disabled={isCreating}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                )}
              </div>
            ))}

            {pairs.length < 3 && (
              <Button
                onClick={addPair}
                variant="outline"
                className="w-full border-dashed border-2 border-[#5CA1FE] text-[#5CA1FE] hover:bg-[#5CA1FE]/10"
                disabled={isCreating}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Optional Pair
              </Button>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
          <Button
            onClick={() => onOpenChange(false)}
            variant="outline"
            size="lg"
            disabled={isCreating}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            size="lg"
            className="px-8"
            disabled={isCreating}
          >
            {isCreating ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

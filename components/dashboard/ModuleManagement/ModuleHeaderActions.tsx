"use client";
import { Button } from "@/components/ui/button";
import { Settings, Plus } from "lucide-react";

interface ModuleHeaderActionsProps {
  onSetOptional: () => void;
  onAddModule: () => void;
}

export default function ModuleHeaderActions({
  onSetOptional,
  onAddModule,
}: ModuleHeaderActionsProps) {
  return (
    <div className="flex bg-white p-4 justify-end flex-col md:flex-row gap-3 pb-6 lg:pb-0 lg:mb-6">
      <Button
        onClick={onSetOptional}
        variant="outline"
        className="flex-1 sm:flex-none border-[#5CA1FE] text-[#5CA1FE] hover:bg-[#5CA1FE]/10"
      >
        <Settings className="h-4 w-4 mr-2" />
        Set optional module
      </Button>
      <Button
        onClick={onAddModule}
        className="flex-1 sm:flex-none bg-[#5CA1FE] hover:bg-[#5CA1FE]/90 text-white"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add New Module
      </Button>
    </div>
  );
}
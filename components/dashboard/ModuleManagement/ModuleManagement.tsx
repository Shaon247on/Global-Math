"use client";
import { useState } from "react";
import ModuleHeaderActions from "./ModuleHeaderActions";
import OptionalModuleDialog from "./OptionalModuleDialog";
import AddModuleDialog from "./AddModuleDialog";
import { moduleData, type Module } from "@/data/moduleData";
import ModuleTable from "./ModuleTable";


export default function ModuleManagement() {
  const [modules, setModules] = useState<Module[]>(moduleData);
  const [optionalDialogOpen, setOptionalDialogOpen] = useState(false);
  const [open, setOpen] = useState<boolean>(false)
  const availableModules = modules.map((m) => m.moduleName);

  const handleSetOptional = () => {
    setOptionalDialogOpen(true);
  };

  const handleAddModule = () => {
    console.log("Add new module");
    setOpen(true)
    // Add your logic here
  };

  const handleDeleteModule = (moduleId: string) => {
    setModules(modules.filter((m) => m.id !== moduleId));
  };

  return (
    <div className="w-full min-h-[calc(100vh-100px)]">
      <div>

        <ModuleHeaderActions
          onSetOptional={handleSetOptional}
          onAddModule={handleAddModule}
        />

        <ModuleTable
          modules={modules}
          onDelete={handleDeleteModule}
        />

        <OptionalModuleDialog
          open={optionalDialogOpen}
          onOpenChange={setOptionalDialogOpen}
          availableModules={availableModules}
        />

        <AddModuleDialog
        onOpenChange={setOpen}
        open={open}
        />
        
      </div>
    </div>
  );
}
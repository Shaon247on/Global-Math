"use client";
import { useState } from "react";
import ModuleHeaderActions from "./ModuleHeaderActions";
import OptionalModuleDialog from "./OptionalModuleDialog";
import AddModuleDialog from "./AddModuleDialog";
import ModuleTable from "./ModuleTable";
import { useDeleteModuleMutation, useGetModulesQuery } from "@/store/slice/apiSlice";
import { toast } from "sonner";


export default function ModuleManagement() {
  // const [modules, setModules] = useState<Module[]>(moduleData);
  const [optionalDialogOpen, setOptionalDialogOpen] = useState(false);
  const [open, setOpen] = useState<boolean>(false)
  const [page,setPage] = useState<number>(1)
  const {data: module, isLoading, isError} = useGetModulesQuery({page:page})
  const [deleteModule, {isLoading: deleteLoading} ] = useDeleteModuleMutation()

  const availableModules = module?.results.map((m) => m.module_name);

  const handleSetOptional = () => {
    setOptionalDialogOpen(true);
  };

  const handleAddModule = () => {
    console.log("Add new module");
    setOpen(true)
    // Add your logic here
  };

  const handleDeleteModule = async (moduleId: string) => {
    const response = await deleteModule({id: moduleId}).unwrap()
    if(response.msg){
      toast.success( response.msg || "Module Deleted Successfully")
    }else{
      toast.error('Module delete failed.')
    }
  };

  if(isLoading) return <div>Loading...</div>

  return (
    <div className="w-full min-h-[calc(100vh-100px)]">
      <div>

        <ModuleHeaderActions
          onSetOptional={handleSetOptional}
          onAddModule={handleAddModule}
        />

        <ModuleTable
          modules={module?.results || []}
          onDelete={handleDeleteModule}
        />

        <OptionalModuleDialog
          open={optionalDialogOpen}
          onOpenChange={setOptionalDialogOpen}
          availableModules={availableModules || []}
        />

        <AddModuleDialog
        onOpenChange={setOpen}
        open={open}
        />
        
      </div>
    </div>
  );
}
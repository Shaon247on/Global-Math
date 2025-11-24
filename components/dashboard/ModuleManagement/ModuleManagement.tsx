"use client";

import { useState } from "react";
import ModuleHeaderActions from "./ModuleHeaderActions";
import OptionalModuleDialog from "./OptionalModuleDialog";
import AddModuleDialog from "./AddModuleDialog";
import ModuleTable from "./ModuleTable";
import { useDeleteModuleMutation, useGetModulesQuery } from "@/store/slice/apiSlice";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function ModuleManagement() {
  const [page, setPage] = useState(1);
  const [optionalDialogOpen, setOptionalDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const {
    data: modulesData,
    isLoading,
    isFetching,
  } = useGetModulesQuery({ page });

  const [deleteModule] = useDeleteModuleMutation();

  const totalPages = modulesData?.count
    ? Math.ceil(modulesData.count / 10)
    : 1;

  const handleDeleteModule = async (moduleId: string) => {
    try {
      await deleteModule({ id: moduleId }).unwrap();
      toast.success("Module deleted successfully");
    } catch {
      toast.error("Failed to delete module");
    }
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink onClick={() => setPage(i)} isActive={page === i}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      if (page > 3) items.push(<PaginationEllipsis key="start" />);
      for (let i = Math.max(1, page - 2); i <= Math.min(totalPages, page + 2); i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink onClick={() => setPage(i)} isActive={page === i}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      if (page < totalPages - 2) items.push(<PaginationEllipsis key="end" />);
    }
    return items;
  };

  if (isLoading) return <div className="p-8 text-center">Loading modules...</div>;

  return (
    <div className="w-full min-h-[calc(100vh-100px)] p-4">
      <div className="space-y-6">
        <ModuleHeaderActions
          onSetOptional={() => setOptionalDialogOpen(true)}
          onAddModule={() => setAddDialogOpen(true)}
        />

        <ModuleTable
          modules={modulesData!}
          onDelete={handleDeleteModule}
          isFetching={isFetching}
        />

        {/* shadcn/ui Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-end float-end mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage(Math.max(1, page - 1))}
                    className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>

                {renderPaginationItems()}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        <OptionalModuleDialog
          open={optionalDialogOpen}
          onOpenChange={setOptionalDialogOpen}
          availableModules={modulesData?.results.map(m => m.module_name) || []}
        />

        <AddModuleDialog
          open={addDialogOpen}
          onOpenChange={setAddDialogOpen}
        />
      </div>
    </div>
  );
}
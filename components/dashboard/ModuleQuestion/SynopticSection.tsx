"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  useGetModulesQuery,
  useGetSynopticModulesQuery,
  useCreateSynopticModuleMutation,
} from "@/store/slice/apiSlice";
import { toast } from "sonner";
import Link from "next/link";

export default function SynopticSection() {
  const [page, setPage] = useState(1);

  // All modules (for display)
  const { data: modulesData, isLoading: modulesLoading } = useGetModulesQuery({ page });
  const modules = modulesData?.results || [];

  // Synoptic modules (selected ones)
  const { data: synopticData, isLoading: synopticLoading } = useGetSynopticModulesQuery({ page: 1 });
  const synopticModuleIds = useMemo(() => {
    const sets = synopticData?.results || [];
    return new Set(sets.flatMap(set => set.modules.map(m => m.id)));
  }, [synopticData]);

  // Local selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Sync server selection when data loads
  useEffect(() => {
    if (synopticData) {
      setSelectedIds(new Set(synopticModuleIds));
    }
  }, [synopticData, synopticModuleIds]);

  const [createSynoptic] = useCreateSynopticModuleMutation();

  // Check if selection changed
  const hasChanges = useMemo(() => {
    if (synopticModuleIds.size !== selectedIds.size) return true;
    for (const id of selectedIds) {
      if (!synopticModuleIds.has(id)) return true;
    }
    for (const id of synopticModuleIds) {
      if (!selectedIds.has(id)) return true;
    }
    return false;
  }, [selectedIds, synopticModuleIds]);

  const handleToggle = (moduleId: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(moduleId)) {
      newSelected.delete(moduleId);
    } else {
      newSelected.add(moduleId);
    }
    setSelectedIds(newSelected);
  };

  const handleSave = async () => {
    try {
      const ids = Array.from(selectedIds);
      await createSynoptic(ids).unwrap();
      toast.success("Synoptic modules saved successfully!");
    } catch (error) {
      const err = error as {data?:{detail?:string}}
      toast.error(err?.data?.detail || "Failed to save");
    }
  };

  const totalPages = modulesData?.count ? Math.ceil(modulesData.count / 10) : 1;

  const renderPagination = () => {
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

  if (modulesLoading || synopticLoading) {
    return <div className="p-12 text-center">Loading modules...</div>;
  }

  return (
    <div className="bg-white p-6 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Synoptic</h1>

      <div className="bg-white lg:px-12 rounded-lg">
        <h2 className="text-center text-lg py-6 font-medium">
          Select Which Module you want to mix up
        </h2>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
          {modules.map((module) => (
            <div
              key={module.id}
              className="p-6 bg-[#EDF7FF] flex gap-4 items-center border-2 border-black/80 text-lg font-semibold rounded-lg"
            >
              <Checkbox
                className="border-2 size-6 text-black"
                checked={selectedIds.has(module.id)}
                onCheckedChange={() => handleToggle(module.id)}
              />
              {module.module_name}
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    className={page === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                {renderPagination()}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {/* Save Button */}
        <div className="text-center my-12">
          <Button
            size="lg"
            onClick={handleSave}
            disabled={!hasChanges}
            className="bg-[#81C6FF] text-lg text-black px-12 py-6 hover:bg-[#81C6FF]/90 disabled:opacity-50"
          >
            {hasChanges ? "Save Changes" : "No Changes to Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}
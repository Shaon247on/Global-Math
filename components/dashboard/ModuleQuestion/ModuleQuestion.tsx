"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGetModulesQuery } from "@/store/slice/apiSlice";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function ModuleQuestion() {
  const [page, setPage] = useState(1);
  const router = useRouter();

  const {
    data: moduleData,
    isLoading,
  } = useGetModulesQuery({ page });

  const modules = moduleData?.results || [];
  const totalPages = moduleData?.count
    ? Math.ceil(moduleData.count / 10)
    : 1;

  const handleRouting = (id: string) => {
    router.push(`/dashboard/manage-question/${id}`);
  };

  const handleRoutingNew = () => {
    router.push("/dashboard/manage-question/synoptic");
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

  return (
    <div className="bg-white p-6 min-h-[calc(100vh-10 0px)]">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-center">Modules</h1>
        <Button
          onClick={handleRoutingNew}
          className="relative border-2 border-blue-400 p-6 bg-blue-400 text-black font-medium text-lg hover:bg-blue-500"
        >
          SYNOPTIC
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 border-2 border-dashed rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-6">
            {modules.map((item) => (
              <Button
                onClick={() => handleRouting(item.id)}
                key={item.id}
                className="relative border-2 border-blue-400 py-10 bg-blue-400/80 text-black font-semibold text-lg hover:bg-blue-400 transition-all"
              >
                {item.module_name}
                <span
                  className={`absolute top-0 right-0 rounded-bl-full p-2 pb-3 pl-3 bg-emerald-500 ${
                    item.is_optional ? "block" : "hidden"
                  }`}
                >
                  <Star stroke="white" fill="white" className="h-5 w-5" />
                </span>
              </Button>
            ))}
          </div>

          {/* shadcn/ui Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-end float-end mt-12">
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
        </>
      )}
    </div>
  );
}
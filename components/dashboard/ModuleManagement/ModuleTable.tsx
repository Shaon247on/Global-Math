"use client";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Pencil,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import Link from "next/link";
import type { Module } from "@/data/moduleData";
import AddModuleDialog from "./AddModuleDialog";

interface ModuleTableProps {
  modules: Module[];
  onDelete: (moduleId: string) => void;
}

const ITEMS_PER_PAGE = 10;

export default function ModuleTable({ modules, onDelete }: ModuleTableProps) {
  const [moduleToDelete, setModuleToDelete] = useState<Module | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [editedId, setEditedId] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const totalPages = Math.ceil(modules.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentModules = modules.slice(startIndex, endIndex);

  const handleDelete = () => {
    if (moduleToDelete) {
      onDelete(moduleToDelete.id);
      toast.success("Module deleted successfully");
      setModuleToDelete(null);
    }
  };

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(1, prev - 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  const goToPage = (page: number) => setCurrentPage(page);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <>
      <div className="w-full overflow-hidden border rounded-lg bg-white shadow-sm">
        {/* Desktop Table */}
        <AddModuleDialog open={open} onOpenChange={setOpen} id={editedId} />
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Serial</TableHead>
                <TableHead className="font-semibold">Module Name</TableHead>
                <TableHead className="font-semibold">
                  Number of Question
                </TableHead>
                <TableHead className="font-semibold">Top Score</TableHead>
                <TableHead className="font-semibold">Quiz Attended</TableHead>
                <TableHead className="font-semibold">View</TableHead>
                <TableHead className="font-semibold">Edit</TableHead>
                <TableHead className="font-semibold">Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentModules.map((module) => (
                <TableRow key={module.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{module.serial}</TableCell>
                  <TableCell className="font-medium">
                    {module.moduleName}
                  </TableCell>
                  <TableCell className="lg:pl-12">
                    {module.numberOfQuestions}
                  </TableCell>
                  <TableCell className="lg:pl-8">{module.topScore}</TableCell>
                  <TableCell className="lg:pl-8">
                    {module.quizAttended}
                  </TableCell>
                  <TableCell>
                    <Link href={`/dashboard/manage-module/${module.id}`}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-green-600 hover:text-green-700 hover:bg-green-50"
                      >
                        <Eye className="h-5 w-5" />
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setEditedId(module.id);
                        setOpen(true);
                      }}
                      variant={"ghost"}
                      size={"icon"}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Pencil />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setModuleToDelete(module)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3 p-4">
          {currentModules.map((module) => (
            <div
              key={module.id}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-sm text-gray-500">
                    Serial: {module.serial}
                  </p>
                  <h3 className="font-semibold text-lg">{module.moduleName}</h3>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                <div>
                  <span className="text-gray-500">Questions:</span>
                  <span className="ml-2 font-medium">
                    {module.numberOfQuestions}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Top Score:</span>
                  <span className="ml-2 font-medium">
                    {module.topScore}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Attended:</span>
                  <span className="ml-2 font-medium">
                    {module.quizAttended}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Average:</span>
                  <span className="ml-2 font-medium">
                    {module.average}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link href={`/dashboard/manage-module/${module.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-green-600 border-green-600 hover:bg-green-50"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </Link>
                <Button
                  onClick={() => {
                    setEditedId(module.id);
                    setOpen(true);
                  }}
                  variant={"outline"}
                  size={"sm"}
                  className="flex-1 text-blue-600 border-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  <Pencil className="h-4 w-4 mr-1"/>
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setModuleToDelete(module)}
                  className="flex-1 text-red-600 border-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {modules.length > 0 && (
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 px-4 py-4 border-t bg-gray-50">
            <div className="text-sm text-gray-500">
              Showing {startIndex + 1} to {Math.min(endIndex, modules.length)}{" "}
              of {modules.length} modules
            </div>

            <nav className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={goToFirstPage}
                disabled={currentPage === 1}
                className="h-8 w-8"
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="hidden sm:flex items-center gap-1">
                {getPageNumbers().map((page, idx) =>
                  page === "..." ? (
                    <span
                      key={`ellipsis-${idx}`}
                      className="px-2 text-gray-400"
                    >
                      ...
                    </span>
                  ) : (
                    <Button
                      key={`page-${page}`}
                      variant="outline"
                      size="sm"
                      onClick={() => goToPage(page as number)}
                      className={`h-8 min-w-8 px-3 ${
                        currentPage === page
                          ? "bg-[#5CA1FE] text-white hover:bg-[#5CA1FE]/90 border-[#5CA1FE]"
                          : ""
                      }`}
                    >
                      {page}
                    </Button>
                  )
                )}
              </div>

              <div className="sm:hidden">
                <span className="text-sm text-gray-600 px-2">
                  {currentPage} / {totalPages}
                </span>
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={goToLastPage}
                disabled={currentPage === totalPages}
                className="h-8 w-8"
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </nav>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!moduleToDelete}
        onOpenChange={() => setModuleToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              module{" "}
              <span className="font-semibold">
                {moduleToDelete?.moduleName}
              </span>{" "}
              and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row gap-3 sm:gap-2">
            <AlertDialogCancel className="mt-0 flex-1 sm:flex-none">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 text-white hover:bg-red-700 flex-1 sm:flex-none"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

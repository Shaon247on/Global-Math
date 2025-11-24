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
import { Eye, Trash2, Pencil } from "lucide-react";
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
import Link from "next/link";
import AddModuleDialog from "./AddModuleDialog";
import { Module, ModuleListResponse } from "@/types/module.type";

interface ModuleTableProps {
  modules: ModuleListResponse;
  onDelete: (moduleId: string) => void;
  isFetching: boolean;
  currentPage?: number; // ← optional + default below
}

export default function ModuleTable({
  modules,
  onDelete,
  isFetching,
  currentPage = 1, // ← This fixes NaN forever!
}: ModuleTableProps) {
  const [moduleToDelete, setModuleToDelete] = useState<Module | null>(null);
  const [editedId, setEditedId] = useState<string>("");
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    if (moduleToDelete) {
      onDelete(moduleToDelete.id);
      setModuleToDelete(null);
    }
  };

  const getSerialNumber = (index: number) => {
    return (currentPage - 1) * 10 + index + 1;
  };

  return (
    <>
      <AddModuleDialog open={open} onOpenChange={setOpen} id={editedId} />

      <div className="w-full overflow-hidden border rounded-lg bg-white shadow-sm">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Serial</TableHead>
                <TableHead className="font-semibold">Module Name</TableHead>
                <TableHead className="font-semibold text-center">Questions</TableHead>
                <TableHead className="font-semibold text-center">Top Score</TableHead>
                <TableHead className="font-semibold text-center">Attended</TableHead>
                <TableHead className="font-semibold text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isFetching ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-16 text-gray-500">
                    Loading modules...
                  </TableCell>
                </TableRow>
              ) : modules.results.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-16 text-gray-500">
                    No modules found.
                  </TableCell>
                </TableRow>
              ) : (
                modules.results.map((module, index) => (
                  <TableRow key={module.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      {getSerialNumber(index)}
                    </TableCell>
                    <TableCell className="font-medium">
                      {module.module_name}
                    </TableCell>
                    <TableCell className="text-center">
                      {module.numberOfQuestions ?? "--"}
                    </TableCell>
                    <TableCell className="text-center">
                      {module.topScore ?? "--"}
                    </TableCell>
                    <TableCell className="text-center">
                      {module.quizAttended ?? "--"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Link href={`/dashboard/manage-module/${module.id}`}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          >
                            <Eye className="h-5 w-5" />
                          </Button>
                        </Link>

                        <Button
                          onClick={() => {
                            setEditedId(module.id);
                            setOpen(true);
                          }}
                          variant="ghost"
                          size="icon"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Pencil className="h-5 w-5" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setModuleToDelete(module)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4 p-4">
          {isFetching ? (
            <div className="text-center py-16 text-gray-500">Loading...</div>
          ) : modules.results.length === 0 ? (
            <div className="text-center py-16 text-gray-500">No modules found.</div>
          ) : (
            modules.results.map((module, index) => (
              <div
                key={module.id}
                className="border rounded-lg p-5 bg-white shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      #{getSerialNumber(index)}
                    </p>
                    <h3 className="font-bold text-lg mt-1">{module.module_name}</h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm mb-5">
                  <div>
                    <span className="text-gray-500">Questions:</span>
                    <span className="ml-2 font-medium">
                      {module.numberOfQuestions ?? "--"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Top Score:</span>
                    <span className="ml-2 font-medium">
                      {module.topScore ?? "--"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Attended:</span>
                    <span className="ml-2 font-medium">
                      {module.quizAttended ?? "--"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link href={`/dashboard/manage-module/${module.id}`} className="flex-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-green-600 border-green-600 hover:bg-green-50"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </Link>

                  <Button
                    onClick={() => {
                      setEditedId(module.id);
                      setOpen(true);
                    }}
                    variant="outline"
                    size="sm"
                    className="flex-1 text-blue-600 border-blue-600 hover:bg-blue-50"
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setModuleToDelete(module)}
                    className="flex-1 text-red-600 border-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={!!moduleToDelete} onOpenChange={() => setModuleToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Module?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the module
              <span className="font-bold text-red-600"> "{moduleToDelete?.module_name}"</span>
              and all its questions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-3">
            <AlertDialogCancel className="w-full sm:w-auto">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700"
            >
              Delete Module
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
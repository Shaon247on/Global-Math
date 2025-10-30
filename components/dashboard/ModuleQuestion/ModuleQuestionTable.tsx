"use client";
import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Search,
  Upload,
  Trash2,
  Edit,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { moduleSets, ModuleQuestion } from "@/data/ModuleSetData";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ModuleQuestionTableProps {
  id: string;
}

const ITEMS_PER_PAGE = 10;

export default function ModuleQuestionTable({ id }: ModuleQuestionTableProps) {
  const moduleTable = moduleSets.find((item) => item.id === id);

  const [questions, setQuestions] = useState<ModuleQuestion[]>(
    moduleTable?.questions || []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState<Set<string>>(
    new Set()
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const router = useRouter();
  // Filter questions based on search
  const filteredQuestions = useMemo(() => {
    if (!searchQuery) return questions;

    const query = searchQuery.toLowerCase();
    return questions.filter((q) => q.question.toLowerCase().includes(query));
  }, [questions, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentQuestions = filteredQuestions.slice(startIndex, endIndex);

  // Check if all current page questions are selected
  const isAllSelected =
    currentQuestions.length > 0 &&
    currentQuestions.every((q) => selectedQuestions.has(q.id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      const newSelected = new Set(selectedQuestions);
      currentQuestions.forEach((q) => newSelected.delete(q.id));
      setSelectedQuestions(newSelected);
    } else {
      const newSelected = new Set(selectedQuestions);
      currentQuestions.forEach((q) => newSelected.add(q.id));
      setSelectedQuestions(newSelected);
    }
  };

  const handleSelectQuestion = (questionId: string) => {
    const newSelected = new Set(selectedQuestions);
    if (newSelected.has(questionId)) {
      newSelected.delete(questionId);
    } else {
      newSelected.add(questionId);
    }
    setSelectedQuestions(newSelected);
  };

  const handleDeleteClick = (questionId: string) => {
    setQuestionToDelete(questionId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (questionToDelete) {
      setQuestions(questions.filter((q) => q.id !== questionToDelete));
      toast.success("Question deleted successfully");
      setDeleteDialogOpen(false);
      setQuestionToDelete(null);
    }
  };

  const handleBulkDeleteClick = () => {
    setBulkDeleteDialogOpen(true);
  };

  const handleConfirmBulkDelete = () => {
    const idsToDelete = Array.from(selectedQuestions);
    setQuestions(questions.filter((q) => !selectedQuestions.has(q.id)));
    toast.success(`${idsToDelete.length} question(s) deleted successfully`);
    setSelectedQuestions(new Set());
    setBulkDeleteDialogOpen(false);
  };

  const handleEdit = (questionId: string) => {
    console.log("Edit question:", questionId);
    // Add your edit logic here
  };

  const handleUpload = (id: string) => {
    console.log("Upload question");
    router.push(`/dashboard/manage-question/add-question/${id}`);
    // Add your upload logic here
  };

  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(1, prev - 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  const goToPage = (page: number) => setCurrentPage(page);

  // Generate page numbers to display
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

  // If module not found, show error
  if (!moduleTable) {
    return (
      <div className="w-full p-8 text-center">
        <p className="text-red-600 font-semibold">Module not found</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start md:items-end justify-between gap-4 bg-white p-4 rounded-lg">
        <div className="flex flex-col xl:flex-row items-start justify-start lg:justify-between gap-4 xl:gap-8">
          <h1 className="text-2xl font-bold">
            {moduleTable.name.toUpperCase()}{" "}
            <span className="text-gray-500">({filteredQuestions.length})</span>
          </h1>
          <div className="relative flex-1 sm:flex-initial sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search by keyword"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-5"
            />
          </div>
        </div>

        <div className="flex flex-row gap-3 w-full sm:w-auto">
          {selectedQuestions.size > 0 && (
            <Button
              onClick={handleBulkDeleteClick}
              variant="destructive"
              className="bg-red-600 hover:bg-red-700 hidden md:flex"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected
            </Button>
          )}
          <Button
            onClick={() => handleUpload(moduleTable.id)}
            className="bg-[#5CA1FE] hover:bg-[#5CA1FE]/90 text-white"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Question
          </Button>
          {selectedQuestions.size > 0 && (
            <Button
              onClick={handleBulkDeleteClick}
              variant="destructive"
              className="bg-red-600 flex hover:bg-red-700 md:hidden"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected
            </Button>
          )}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-12">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="font-semibold">No</TableHead>
              <TableHead className="font-semibold">Question</TableHead>
              <TableHead className="font-semibold">Answer</TableHead>
              <TableHead className="font-semibold text-center">Edit</TableHead>
              <TableHead className="font-semibold text-center">
                Delete
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentQuestions.map((question, index) => (
              <TableRow key={question.id} className="hover:bg-gray-50">
                <TableCell>
                  <Checkbox
                    checked={selectedQuestions.has(question.id)}
                    onCheckedChange={() => handleSelectQuestion(question.id)}
                  />
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <span className="font-medium">{question.question}</span>
                </TableCell>
                <TableCell>
                  <span className="font-medium">
                    {question[question.correctAnswer]}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <Link href={`/dashboard/manage-question/edit-question/${moduleTable.id}/${question.id}`}>
                  <Button
                    variant="ghost"
                    size="icon"
                    // onClick={() => handleEdit(question.id)}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    <Edit className="h-5 w-5" />
                  </Button>
                  </Link>
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteClick(question.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        {filteredQuestions.length > ITEMS_PER_PAGE && (
          <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-0 items-center justify-between px-4 py-4 border-t">
            <div className="text-sm text-gray-500">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, filteredQuestions.length)} of{" "}
              {filteredQuestions.length} questions
            </div>

            <nav className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex items-center gap-1">
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

              <Button
                variant="outline"
                size="icon"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </nav>
          </div>
        )}
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-3">
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={isAllSelected}
              onCheckedChange={handleSelectAll}
            />
            <span className="font-semibold">Select All</span>
          </div>
        </div>

        {currentQuestions.map((question, index) => (
          <div
            key={question.id}
            className="bg-white p-4 rounded-lg shadow-sm space-y-3"
          >
            <div className="flex items-start gap-3">
              <Checkbox
                checked={selectedQuestions.has(question.id)}
                onCheckedChange={() => handleSelectQuestion(question.id)}
                className="mt-1"
              />
              <div className="flex-1">
                <p className="font-medium">
                  {startIndex + index + 1}. {question.question}
                </p>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(question.id)}
                className="flex-1 text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDeleteClick(question.id)}
                className="flex-1 text-red-600 border-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        ))}

        {/* Mobile Pagination */}
        {filteredQuestions.length > ITEMS_PER_PAGE && (
          <div className="flex items-center justify-center gap-2 bg-white p-3 rounded-lg">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="h-9 w-9"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <span className="text-sm text-gray-600 px-2">
              {currentPage} / {totalPages}
            </span>

            <Button
              variant="outline"
              size="icon"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="h-9 w-9"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Single Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Question</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this question? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row gap-3 sm:gap-2">
            <AlertDialogCancel className="mt-0 flex-1 sm:flex-none">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 text-white hover:bg-red-700 flex-1 sm:flex-none"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Delete Dialog */}
      <AlertDialog
        open={bulkDeleteDialogOpen}
        onOpenChange={setBulkDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Selected Questions</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedQuestions.size} selected
              question(s)? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row gap-3 sm:gap-2">
            <AlertDialogCancel className="mt-0 flex-1 sm:flex-none">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmBulkDelete}
              className="bg-red-600 text-white hover:bg-red-700 flex-1 sm:flex-none"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

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
import { Search, Upload, Trash2, Edit, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  useGetQuestionsQuery,
  useDeleteQuestionMutation,
} from "@/store/slice/apiSlice";

interface ModuleQuestionTableProps {
  id: string;
}

const ITEMS_PER_PAGE = 10;

export default function ModuleQuestionTable({ id }: ModuleQuestionTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedQuestions, setSelectedQuestions] = useState<Set<string>>(new Set());
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);

  const router = useRouter();
console.log("The Id:",id)
  const {
    data: questionsData,
    isLoading,
    isFetching,
  } = useGetQuestionsQuery({
    module: id,
    page: currentPage,
    search: searchQuery || undefined,
  });

  const [deleteQuestion] = useDeleteQuestionMutation();

  const questions = questionsData?.results || [];
  const totalPages = questionsData?.count
    ? Math.ceil(questionsData.count / ITEMS_PER_PAGE)
    : 1;

  const isAllSelected = questions.length > 0 && questions.every(q => selectedQuestions.has(q.id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedQuestions(new Set());
    } else {
      setSelectedQuestions(new Set(questions.map(q => q.id)));
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

  const handleConfirmDelete = async () => {
    if (!questionToDelete) return;
    try {
      await deleteQuestion(questionToDelete).unwrap();
      toast.success("Question deleted successfully");
    } catch {
      toast.error("Failed to delete question");
    }
    setDeleteDialogOpen(false);
    setQuestionToDelete(null);
  };

  const handleBulkDeleteClick = () => {
    setBulkDeleteDialogOpen(true);
  };

  const handleConfirmBulkDelete = async () => {
    try {
      await Promise.all(
        Array.from(selectedQuestions).map(id => deleteQuestion(id).unwrap())
      );
      toast.success(`${selectedQuestions.size} question(s) deleted`);
      setSelectedQuestions(new Set());
    } catch {
      toast.error("Failed to delete some questions");
    }
    setBulkDeleteDialogOpen(false);
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`px-4 py-2 rounded ${i === currentPage ? "bg-blue-500 text=white" : "bg-gray-200"}`}
          >
            {i}
          </button>
        );
      }
    } else {
      if (currentPage > 3) items.push(<span key="start">...</span>);
      for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
        items.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`px-4 py-2 rounded ${i === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            {i}
          </button>
        );
      }
      if (currentPage < totalPages - 2) items.push(<span key="end">...</span>);
    }
    return items;
  };

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start md:items-end justify-between gap-4 bg-white p-4 rounded-lg">
        <div className="flex flex-col xl:flex-row items-start justify-start lg:justify-between gap-4 xl:gap-8">
          <h1 className="text-2xl font-bold">
            QUESTIONS <span className="text-gray-500">({questionsData?.count || 0})</span>
          </h1>
          <div className="relative flex-1 sm:flex-initial sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search by keyword"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 py-5"
            />
          </div>
        </div>

        <div className="flex flex-row gap-3 w-full sm:w-auto">
          {selectedQuestions.size > 0 && (
            <Button
              onClick={handleBulkDeleteClick}
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected
            </Button>
          )}
          <Button
            onClick={() => router.push(`/dashboard/manage-question/add-question/${id}`)}
            className="bg-[#5CA1FE] hover:bg-[#5CA1FE]/90 text-white"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Question
          </Button>
        </div>
      </div>

      {/* Loading */}
      {isLoading || isFetching ? (
        <div className="bg-white rounded-lg p-8 text-center text-gray-500">
          Loading questions...
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-lg shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-12">
                    <Checkbox checked={isAllSelected} onCheckedChange={handleSelectAll} />
                  </TableHead>
                  <TableHead className="font-semibold">No</TableHead>
                  <TableHead className="font-semibold">Question</TableHead>
                  <TableHead className="font-semibold">Answer</TableHead>
                  <TableHead className="font-semibold text-center">Edit</TableHead>
                  <TableHead className="font-semibold text-center">Delete</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {questions.map((q, index) => (
                  <TableRow key={q.id} className="hover:bg-gray-50">
                    <TableCell>
                      <Checkbox
                        checked={selectedQuestions.has(q.id)}
                        onCheckedChange={() => handleSelectQuestion(q.id)}
                      />
                    </TableCell>
                    <TableCell>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</TableCell>
                    <TableCell>
                      <span className="font-medium">{q.question_text}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        {q.correct_answer === "option1" ? q.option1 :
                         q.correct_answer === "option2" ? q.option2 :
                         q.correct_answer === "option3" ? q.option3 : q.option4}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Link href={`/dashboard/manage-question/edit-question/${id}/${q.id}`}>
                        <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                          <Edit className="h-5 w-5" />
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(q.id)}
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
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-4 border-t">
                <div className="text-sm text-gray-500">
                  Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                  {Math.min(currentPage * ITEMS_PER_PAGE, questionsData?.count || 0)} of {questionsData?.count} questions
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {renderPaginationItems()}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile View */}
          <div className="md:hidden space-y-3">
            {questions.map((q, index) => (
              <div key={q.id} className="bg-white p-4 rounded-lg shadow-sm space-y-3">
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={selectedQuestions.has(q.id)}
                    onCheckedChange={() => handleSelectQuestion(q.id)}
                  />
                  <div className="flex-1">
                    <p className="font-medium">
                      {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}. {q.question_text}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 pt-2 border-t">
                  <Link href={`/dashboard/manage-question/edit-question/${id}/${q.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full text-blue-600 border-blue-600 hover:bg-blue-50">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteClick(q.id)}
                    className="flex-1 text-red-600 border-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Delete Dialogs */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Question</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={bulkDeleteDialogOpen} onOpenChange={setBulkDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Selected Questions</AlertDialogTitle>
            <AlertDialogDescription>
              Delete {selectedQuestions.size} questions permanently?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmBulkDelete} className="bg-red-600">
              Delete All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
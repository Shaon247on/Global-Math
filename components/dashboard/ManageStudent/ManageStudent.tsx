"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Eye,
  Ban,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { Student } from "@/types/student.type";
import { useGetStudentsQuery } from "@/store/slice/apiSlice";
import { useDebounce } from "@/hooks/useDebounce";

type TimeFrame = "daily" | "weekly" | "monthly" | "yearly";
type FilterBy = "quiz_attempts" | "xp" | "active_subjects";

export default function ManageStudent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("monthly");
  const [filterBy, setFilterBy] = useState<FilterBy>("xp");
  const [studentToBlock, setStudentToBlock] = useState<Student | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Debounce search query to avoid too many API calls
  const debouncedSearch = useDebounce(searchQuery, 500);

  // Fetch students from API
  const { data, isLoading, isFetching } = useGetStudentsQuery({
    page: currentPage,
    order_by: filterBy,
    duration: timeFrame,
    search: debouncedSearch || undefined,
  });

  const students = data?.results || [];
  const totalCount = data?.count || 0;
  const totalPages = Math.ceil(totalCount / 10); // Assuming 10 items per page from backend

  const handleBlockStudent = (student: Student) => {
    setStudentToBlock(student);
  };

  const confirmBlock = () => {
    if (studentToBlock) {
      console.log("Blocking student:", studentToBlock);
      // TODO: Call block API endpoint here
      setStudentToBlock(null);
    }
  };

  const handleViewStudent = (student: Student) => {
    console.log("Viewing student:", student);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const startIndex = (currentPage - 1) * 10 + 1;
  const endIndex = Math.min(currentPage * 10, totalCount);

  return (
    <div className="w-full">
      <div className="flex flex-col pt-4 lg:pt-0 bg-white lg:bg-transparent px-4 lg:px-0 pb-4 lg:pb-0 sm:flex-row gap-3 items-stretch justify-between sm:items-center">
        <div className="relative flex-1 bg-white max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search by name or ID"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Select
              value={filterBy}
              onValueChange={(value: FilterBy) => {
                setFilterBy(value);
                setCurrentPage(1); // Reset to first page on filter change
              }}
            >
              <SelectTrigger className="w-[180px] bg-white">
                <SlidersHorizontal className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="quiz_attempts">Attended Quiz</SelectItem>
                <SelectItem value="xp">Total XP</SelectItem>
                <SelectItem value="active_subjects">Active Subjects</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Select
            value={timeFrame}
            onValueChange={(value: TimeFrame) => {
              setTimeFrame(value);
              setCurrentPage(1); // Reset to first page on timeframe change
            }}
          >
            <SelectTrigger className="w-full bg-white sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="w-full shadow-lg rounded-none lg:mt-4">
        <CardContent className="p-0">
          {/* Loading State */}
          {(isLoading || isFetching) && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <span className="ml-2 text-gray-500">Loading students...</span>
            </div>
          )}

          {/* Desktop Table */}
          {!isLoading && !isFetching && students.length > 0 && (
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Rank</TableHead>
                    <TableHead className="font-semibold">Profile</TableHead>
                    <TableHead className="font-semibold md:pl-8">Name</TableHead>
                    <TableHead className="font-semibold">Quiz Attempts</TableHead>
                    <TableHead className="font-semibold">XP</TableHead>
                    <TableHead className="font-semibold pl-10 xl:w-52">
                      Active Subjects
                    </TableHead>
                    <TableHead className="font-semibold">View</TableHead>
                    <TableHead className="font-semibold">Block</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student, index) => (
                    <TableRow
                      key={student.id}
                      className="hover:bg-gray-50"
                    >
                      <TableCell>{startIndex + index}</TableCell>
                      <TableCell>
                        <Avatar className="h-10 w-10">
                          <AvatarImage 
                            src={student.profile_pic || undefined} 
                            alt={student.full_name} 
                          />
                          <AvatarFallback>
                            {getInitials(student.full_name)}
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">
                        {student.full_name}
                      </TableCell>
                      <TableCell className="md:pl-10 font-medium">
                        {student.quiz_attempts}
                      </TableCell>
                      <TableCell>{student.xp}</TableCell>
                      <TableCell className="md:pl-20">
                        {student.active_subjects}
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/dashboard/student-management/${student.id}`}
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewStudent(student)}
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          >
                            <Eye className="h-5 w-5" />
                          </Button>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleBlockStudent(student)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Ban className="h-5 w-5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Mobile Cards */}
          {!isLoading && !isFetching && students.length > 0 && (
            <div className="md:hidden space-y-3 p-4">
              {students.map((student, index) => (
                <Card key={student.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0">
                      <Avatar className="h-12 w-12">
                        <AvatarImage 
                          src={student.profile_pic || undefined} 
                          alt={student.full_name} 
                        />
                        <AvatarFallback>
                          {getInitials(student.full_name)}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-base truncate">
                          {student.full_name}
                        </h3>
                        <span className="text-sm text-gray-500 ml-2">
                          #{startIndex + index}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 mb-2">
                        {student.email}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span>XP: {student.xp}</span>
                        <span>Attempts: {student.quiz_attempts}</span>
                        <span>Subjects: {student.active_subjects}</span>
                      </div>

                      <div className="flex gap-2">
                        <Link
                          href={`/dashboard/student-management/${student.id}`}
                          className="flex-1"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewStudent(student)}
                            className="w-full text-green-600 border-green-600 hover:bg-green-50"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleBlockStudent(student)}
                          className="flex-1 text-red-600 border-red-600 hover:bg-red-50"
                        >
                          <Ban className="h-4 w-4 mr-1" />
                          Block
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !isFetching && students.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p>No students found matching your criteria.</p>
            </div>
          )}

          {/* Pagination */}
          {!isLoading && !isFetching && students.length > 0 && (
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between px-4 py-4 border-t">
              <div className="text-sm text-gray-500 order-2 md:order-1">
                Showing {startIndex} to {endIndex} of {totalCount} students
              </div>

              <div className="order-1 md:order-2">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) setCurrentPage(currentPage - 1);
                        }}
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>

                    {getPageNumbers().map((page, idx) => (
                      <PaginationItem key={`page-${idx}`}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(page);
                          }}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages)
                            setCurrentPage(currentPage + 1);
                        }}
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog
        open={!!studentToBlock}
        onOpenChange={() => setStudentToBlock(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure to Block the student?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action will block {studentToBlock?.full_name} from accessing the
              platform.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row gap-3 sm:gap-2">
            <AlertDialogCancel className="bg-green-600 text-white hover:bg-green-700 mt-0 flex-1 sm:flex-none">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmBlock}
              className="bg-red-600 text-white hover:bg-red-700 flex-1 sm:flex-none"
            >
              Block
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}